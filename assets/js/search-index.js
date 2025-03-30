import { readdirSync, statSync, writeFileSync } from "fs";
import { basename, extname, join } from "path";
import { clearLine, cursorTo } from 'readline';
import { excludedDirs, excludedExts, excludedFiles } from './constants.js';
import { buildDirectoryTree, getEmojis, readFileAsStringSync, removeDuplicates, getTags } from './utils.js';

import lunr from "lunr";

const directoryPath = process.argv[2];

if (!directoryPath) {
  console.log("Please specify the directory path as a command line parameter.");
  process.exit(1);
}

function createSearchIndexDirs(dirPath) {
  try {
    const stack = [dirPath];

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
              process.stdout.write(`🔍 Indexing: ${item}`);
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
                process.stdout.write(`🔍 Indexing: ${item}`);
              }
            }
          }
        });
      }
    }, this);

    const filePath = join('assets', 'search', `${directoryPath}-search.json`);
    writeFileSync(filePath, JSON.stringify(idx), function (err) {
      if (err) throw err;
    });
  } catch (err) {
    console.error(`Error processing ${dirPath}:`, err);
    process.exitCode = 1;
  }
}

function createEmojiSearchIndex(tree) {
  try {
    if (tree.type === 'dir') {
      tree.children.forEach(childTree => {
        if (childTree.type === 'dir') {
          const currentDirPath = childTree.path;
          const children = childTree.children;

          children.forEach(async (child) => {
            //process dir name
            if (child.type === 'dir') {
              const emojisInDirName = getEmojis(child.name);
              emojisInDirName.forEach(async (emoji) => {
                const filePath = join(currentDirPath, "index.md");
                await addEmojiToIndex(emoji, filePath);
              })
            }

            //process file name            
            if (child.type === 'file') {
              const emojisInFileName = getEmojis(child.name);
              const ext = extname(child.name);

              emojisInFileName.forEach(async (emoji) => {
                const filePath = join(currentDirPath, child.name);
                await addEmojiToIndex(emoji, filePath);
              });

              //process file contents
              if (!excludedExts.includes(ext)) {
                const content = readFileAsStringSync(join(childTree.path, child.name));
                const emojisInFile = removeDuplicates(getEmojis(content));
                const filePath = join(childTree.path, child.name);
                emojisInFile.forEach(async (emoji) => {
                  await addEmojiToIndex(emoji, filePath)
                })

              }
            }
          })
          createEmojiSearchIndex(childTree);
        }
      });
    }
  } catch (err) {
    console.log("~ createEmojiSearchIndex ~ err:", err)
    process.exitCode = 1;
  }
}

function createTagsSearchIndex(tree) {
  try {
    if (tree.type === 'dir') {
      tree.children.forEach(childTree => {
        if (childTree.type === 'dir') {
          const children = childTree.children;

          children.forEach(async (child) => {
            if (child.type === 'file') {
              //process file contents
              const ext = extname(child.name);
              if (!excludedExts.includes(ext)) {
                const content = readFileAsStringSync(join(childTree.path, child.name));
                const tagssInFile = removeDuplicates(getTags(content));
                const filePath = join(childTree.path, child.name);
                tagssInFile.forEach(async (tag) => {
                  await addTagToIndex(tag, filePath)
                })

              }
            }
          })
          createTagsSearchIndex(childTree);
        }
      });
    }
  } catch (err) {
    console.log("~ createEmojiSearchIndex ~ err:", err)
    process.exitCode = 1;
  }
}



async function addTagToIndex(unicode, filePath) {
  return new Promise(async (resolve, reject) => {
    const indexPath = join('assets', 'search', `tags-search.json`);
    try {
      let jsonObject = readFileAsStringSync(indexPath);
      jsonObject = JSON.parse(JSON.parse(jsonObject));

      if (jsonObject.hasOwnProperty(unicode)) {
        if (!jsonObject[unicode].includes(filePath)) {
          jsonObject = {
            ...jsonObject,
            [unicode]: [...jsonObject[unicode], filePath]
          }
        }
      } else {
        jsonObject = {
          ...jsonObject,
          [unicode]: [...(jsonObject[unicode] || []), filePath]
        }
      }

      writeFileSync(indexPath, JSON.stringify(jsonObject), function (err) {
        if (err) reject(err);
      });

      resolve(0);
    } catch (error) {
      if (error.code === 'ENOENT') {
        const jsonObject = {}
        jsonObject[unicode] = [filePath];
        writeFileSync(indexPath, JSON.stringify(jsonObject), function (err) {
          if (err) reject(err);
        });
        resolve(0);
      } else {
        console.error('Error updating tags index:', error);
        reject(error);
      }
    }
  });
}


async function addEmojiToIndex(unicode, filePath) {
  return new Promise(async (resolve, reject) => {
    const indexPath = join('assets', 'search', `emoji-search.json`);
    try {
      let jsonObject = readFileAsStringSync(indexPath);
      jsonObject = JSON.parse(JSON.parse(jsonObject));

      if (jsonObject.hasOwnProperty(unicode)) {
        if (!jsonObject[unicode].includes(filePath)) {
          jsonObject = {
            ...jsonObject,
            [unicode]: [...jsonObject[unicode], filePath]
          }
        }
      } else {
        jsonObject = {
          ...jsonObject,
          [unicode]: [...(jsonObject[unicode] || []), filePath]
        }
      }

      writeFileSync(indexPath, JSON.stringify(jsonObject), function (err) {
        if (err) reject(err);
      });

      resolve(0);
    } catch (error) {
      if (error.code === 'ENOENT') {
        const jsonObject = {}
        jsonObject[unicode] = [filePath];
        writeFileSync(indexPath, JSON.stringify(jsonObject), function (err) {
          if (err) reject(err);
        });
        resolve(0);
      } else {
        console.error('Error updating emoji index:', error);
        reject(error);
      }
    }
  });
}

// createSearchIndexDirs(directoryPath);
// createEmojiSearchIndex(buildDirectoryTree(directoryPath));
createTagsSearchIndex(buildDirectoryTree(directoryPath));