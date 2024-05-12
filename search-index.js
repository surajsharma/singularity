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

function readFileAsStringSync(filePath, encoding = 'utf8') {
  //using async throws lunr off
  try {
    const data = fs.readFileSync(filePath, encoding);
    return JSON.stringify(data);
  } catch (err) {
    throw err;
  }
}

function createSearchIndexDirs(dirPath) {
  try {
    const stack = [dirPath];
    items = fs.readdirSync(dirPath);

    var idx = lunr(function () {
      this.ref('id');
      this.field('item');
      this.field('content');

      while (stack.length > 0) {
        const currentPath = stack.pop();
        const d_id = generateUniqueId();
        const contents = fs.readdirSync(currentPath);

        contents.forEach(async itemName => {
          const itemPath = path.join(currentPath, itemName);
          const stats = fs.statSync(itemPath);

          if (stats.isDirectory()) {
            const item = path.basename(currentPath);
            if (!excludedDirs.includes(item)) {
              stack.push(itemPath);
              const entry = { id: itemPath, item, content: 'dir' };
              this.add(entry);
              console.log(`Search index for directory: ${item}`);
            }
          } else {
            const item = path.basename(itemPath);
            if (!excludedFiles.includes(item)) {
              if (!excludedExts.includes(path.extname(item))) {
                let content = readFileAsStringSync(itemPath);
                const id = generateUniqueId();
                const entry = { id: itemPath, item, content };
                this.add(entry);
                console.log(`Search index created for file: ${item}`);
              }
            }
          }
        });
      }

    }, this);

    fs.appendFileSync(`${directoryPath}-search.json`, JSON.stringify(idx), function (err) {
      if (err) throw err;
    });

  } catch (err) {
    console.error(`Error processing ${dirPath}:`, err);
    process.exitCode = 1;
  }
}

createSearchIndexDirs(directoryPath);