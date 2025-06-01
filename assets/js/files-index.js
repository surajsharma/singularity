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
    if (tree.type !== 'dir') return;

    let folders = getSortedItems(tree.path).filter(f => lstatSync(join(tree.path, f)).isDirectory());
    let files = getSortedItems(tree.path).filter(f => !lstatSync(join(tree.path, f)).isDirectory());
    let mdStr = '';

    folders.forEach(folder => {
      const dirName = tree.path.split("/").pop();
      if (!excludedDirs.includes(dirName)) {
        mdStr += `* 📂 [${folder}](${folder})\n`;
      }
    });

    files.forEach(fnWithExt => {
      const ext = extname(fnWithExt);
      const fnWithoutExt = fnWithExt.replace(ext, "");
      const itemPath = join(tree.path, fnWithExt);

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
    });

    if (mdStr.length) {
      writeFileSync(`${tree.path}/index.md`, mdStr);
    }

    // recurse into subdirectories
    tree.children.forEach(childTree => {
      if (childTree.type === 'dir') {
        createFileIndices(childTree);
      }
    });

  } catch (err) {
    console.log("~ createFileIndices ~ err:", err);
    process.exitCode = 1;
  }
}


createFileIndices(buildDirectoryTree(directoryPath));
