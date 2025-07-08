import { lstatSync, writeFileSync } from 'fs';
import { extname, join } from 'path';
import { excludedDirs, excludedExts, excludedFiles, splExts, colab_blob_url } from './constants.js';
import { buildDirectoryTree, getExternalLink, getSortedItems } from "./utils.js";

const directoryPath = process.argv[2];

if (!directoryPath) {
  console.log("Please specify the directory path as a command line parameter.");
  process.exit(1);
}

function createFileIndices(tree) {
  try {
    if (tree.type === 'dir') {
      tree.children.forEach(childTree => {
        if (childTree.type === 'dir') {

          let folders = getSortedItems(childTree.path).filter(f => lstatSync(join(childTree.path, f)).isDirectory());
          let files = getSortedItems(childTree.path).filter(f => !lstatSync(join(childTree.path, f)).isDirectory());

          let mdStr = '';

          folders.sort((a, b) => {
            const aMatch = a.match(/^(\d+)/);
            const bMatch = b.match(/^(\d+)/);
            if (aMatch && bMatch) {
              return parseInt(aMatch[1], 10) - parseInt(bMatch[1], 10);
            }
            return a.localeCompare(b);
          });
          
          folders.forEach(folder => {
            const dirName = childTree.path.split("/")[childTree.path.split("/").length - 1];
            if (!excludedDirs.includes(dirName)) {
              mdStr += `* 📂 [${folder}](${folder})\n`;
            }
          });

          files.forEach(fnWithExt => {
            const ext = extname(fnWithExt);
            const fnWithoutExt = fnWithExt.replace(extname(fnWithExt), "");
            const itemPath = join(childTree.path, fnWithExt);

            if (!excludedFiles.includes(fnWithExt) && !excludedExts.includes(ext)) {
              if (splExts.includes(ext)) {
                switch (ext) {
                  case ".ipynb":
                    const colabLink = colab_blob_url + itemPath;
                    mdStr += `* 📒 ${getExternalLink(colabLink, fnWithoutExt)}`;
                    break;
                  default:
                    mdStr += `* 📄 [${fnWithExt}](${fnWithExt})\n`;
                    break;
                }
              } else {
                mdStr += `* 📄 [${fnWithoutExt}](${fnWithExt})\n`;
              }
            }
          })

          if (mdStr.length) {
            writeFileSync(`${childTree.path}/index.md`, mdStr, function (err) {
              if (err) throw err;
            });
          }

          createFileIndices(childTree);
        }
      });

    }
  } catch (err) {
    console.log("~ createFileIndices ~ err:", err)
    process.exitCode = 1;
  }
}

createFileIndices(buildDirectoryTree(directoryPath));
