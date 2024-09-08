import { readFileSync, readdirSync, statSync, appendFileSync } from "fs";
import { join, basename, extname } from "path";
import lunr from "lunr";
import { clearLine, cursorTo } from 'readline';


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
    const data = readFileSync(filePath, encoding);
    return JSON.stringify(data);
  } catch (err) {
    throw err;
  }
}

function createSearchIndexDirs(dirPath) {
  try {
    const stack = [dirPath];
    // const items = readdirSync(dirPath);

    const idx = lunr(function () {
      this.ref('id');
      this.field('item');
      this.field('content');

      while (stack.length > 0) {
        const currentPath = stack.pop();
        const contents = readdirSync(currentPath);

        contents.forEach(async itemName => {
          const itemPath = join(currentPath, itemName);
          const stats = statSync(itemPath);

          if (stats.isDirectory()) {
            const item = basename(currentPath);
            if (!excludedDirs.includes(item)) {
              stack.push(itemPath);
              const entry = { id: itemPath, item, content: 'dir' };
              this.add(entry);
              clearLine(process.stdout, 0);
              cursorTo(process.stdout, 0, null);
              process.stdout.write(`Search index for directory: ${item}`);
            }
          } else {
            const item = basename(itemPath).replace('.md', '');
            if (!excludedFiles.includes(item)) {
              if (!excludedExts.includes(extname(item))) {
                let content = readFileAsStringSync(itemPath);
                const entry = { id: itemPath, item, content };
                this.add(entry);
                clearLine(process.stdout, 0);
                cursorTo(process.stdout, 0, null);
                process.stdout.write(`Search index created for file: ${item}`);
              }
            }
          }
        });
      }

    }, this);

    const filePath = join('assets', 'search', `${directoryPath}-search.json`);
    appendFileSync(filePath, JSON.stringify(idx), function (err) {
      if (err) throw err;
    });

  } catch (err) {
    console.error(`Error processing ${dirPath}:`, err);
    process.exitCode = 1;
  }
}

createSearchIndexDirs(directoryPath);