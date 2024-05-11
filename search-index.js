const fs = require("fs");
const path = require("path");
const lunr = require("lunr");

const directoryPath = process.argv[2];

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
  const excludedDirs = ["target", ".", ".ipynb_checkpoints", ".out"];
  const excludedFiles = [".DS_Store", "index.md"];
  const excludedExts = [".png", ".jpg", ".gif", ".lock"];

  let items;

  try {
    if (fs.lstatSync(dirPath).isDirectory()) {
      items = fs.readdirSync(dirPath);
      var idx = lunr(function () {
        this.ref('id');
        this.field('itemPath');
        this.field('item');
        this.field('content');

        items.forEach(async (item) => {
          const itemPath = path.join(dirPath, item);
          const itemStats = fs.lstatSync(itemPath);
          const id = generateUniqueId();
          if (itemStats.isDirectory()) {
            if (!excludedDirs.includes(item)) {
              createSearchIndex(itemPath);
              this.add({ id, itemPath, item, content: '' });

            }
          } else {
            if (!excludedFiles.includes(item)) {
              if (!excludedExts.includes(path.extname(item))) {
                const content = await readFileAsString(itemPath);
                this.add({ id, itemPath, item, content });
              }
            }
          }
        });
      }, this);

      await fs.appendFileSync(`search.json`, JSON.stringify(idx), function (err) {
        if (err) throw err;
      });
      console.log(JSON.stringify(idx));

    }
  } catch (err) {
    console.error(`Error processing ${dirPath}:`, err);
    process.exitCode = 1;
  }
}
createSearchIndex(directoryPath);