const fs = require("fs");
const path = require("path");
const lunr = require("lunr");

const directoryPath = process.argv[2];
const excludedDirs = ["target", ".", ".ipynb_checkpoints", ".out"];
const excludedFiles = [".DS_Store", "index.md"];
const excludedExts = [".png", ".jpg", ".gif", ".lock"];


if (!directoryPath) {
  console.log("Please specify the directory path as a command line parameter.");
  process.exit(1);
}

function generateUniqueId() {
  return Math.floor(Math.random() * 1000000000) + Date.now().toString(36);
}

function readFileAsString(filePath, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const content = JSON.stringify(data);
        resolve(content);
      }
    });
  });
}

async function createSearchIndex(dirPath) {

  try {
    const stack = [dirPath];
    items = fs.readdirSync(dirPath);

    var idx = lunr(function () {
      this.ref('id');
      this.field('itemPath');
      this.field('item');
      this.field('content');

      while (stack.length > 0) {
        const currentPath = stack.pop();
        const id = generateUniqueId();
        const contents = fs.readdirSync(currentPath);
        const item = path.basename(currentPath);
        console.log({ id, itemPath: currentPath, item, content: '' });
        this.add({ id, itemPath: currentPath, item, content: '' });

        contents.forEach(async itemName => {
          const itemPath = path.join(currentPath, itemName);
          const stats = fs.statSync(itemPath);
          const id = generateUniqueId();

          if (stats.isDirectory()) {
            if (!excludedDirs.includes(item)) {
              stack.push(itemPath);
            }
          } else {
            const item = path.basename(itemPath);
            if (!excludedFiles.includes(item)) {
              if (!excludedExts.includes(path.extname(item))) {
                const content = await readFileAsString(itemPath);
                this.add({ id, itemPath, item, content });
                console.log({ id, itemPath, item, content });
              }
            }
          }
        });
      }
    }, this);

    fs.appendFileSync(`search.json`, JSON.stringify(idx), function (err) {
      if (err) throw err;
    });
  } catch (err) {
    console.error(`Error processing ${dirPath}:`, err);
    process.exitCode = 1;
  }
}


createSearchIndex(directoryPath);