const fs = require("fs");
const path = require("path");
const lunr = require("lunr");
const readline = require('readline');
const CRC32C = require("crc-32/crc32c");

const directoryPath = process.argv[2];
const excludedDirs = ["target", ".", ".ipynb_checkpoints", ".out"];
const excludedFiles = [".DS_Store", "index.md", "search.md"];
const excludedExts = [".png", ".jpg", ".gif", ".lock"];


if (!directoryPath) {
  console.log("Please specify the directory path as a command line parameter.");
  process.exit(1);
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

    const idx = lunr(function () {
      this.ref('id');
      this.field('item');
      this.field('content');

      while (stack.length > 0) {
        const currentPath = stack.pop();
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
              readline.clearLine(process.stdout, 0);
              readline.cursorTo(process.stdout, 0, null);
              process.stdout.write(`Search index for directory: ${item}`);
            }
          } else {
            const item = path.basename(itemPath).replace('.md', '');
            if (!excludedFiles.includes(item)) {
              if (!excludedExts.includes(path.extname(item))) {
                let content = readFileAsStringSync(itemPath);
                const entry = { id: itemPath, item, content };
                this.add(entry);
                readline.clearLine(process.stdout, 0);
                readline.cursorTo(process.stdout, 0, null);
                process.stdout.write(`Search index created for file: ${item}`);
              }
            }
          }
        });
      }

    }, this);

    const filePath = path.join('assets', 'search', `${directoryPath}-search.json`);
    fs.appendFileSync(filePath, JSON.stringify(idx), function (err) {
      if (err) throw err;
    });

  } catch (err) {
    console.error(`Error processing ${dirPath}:`, err);
    process.exitCode = 1;
  }
}

function upgradeDbChecksums() {

  try {
    const src = readFileAsStringSync("assets/search/src-search.json");
    const arc = readFileAsStringSync("assets/search/archives-search.json");

    const schecksum = CRC32C.str(src, "seed");
    const achecksum = CRC32C.str(src, "seed");

    let db = fs.readFileSync("assets/search/db.json", "utf-8");
    let db_json = JSON.parse(db);

    db_json.version = db_json.version + 1;
    db_json.achecksum = achecksum;
    db_json.schecksum = schecksum;

    const filePath = path.join('assets', 'search', `db.json`);
    fs.appendFileSync(filePath, JSON.stringify(db_json), function (err) {
      if (err) throw err;
    });

  } catch (error) {
    console.log("~ upgradeDbChecksums ~ error:", error)
  }
}

createSearchIndexDirs(directoryPath);
upgradeDbChecksums();