const fs = require("fs");
const path = require("path");
const directoryPath = process.argv[2];

if (!directoryPath) {
  console.log("Please specify the directory path as a command line parameter.");
  process.exit(1);
}

function createFileIndices(dirPath) {
  const excludedDirs = ["target", ".", ".ipynb_checkpoints", ".out"];
  const excludedFiles = [".DS_Store", "index.md", "search.md", "search-worker.js"];
  const excludedExts = [".png", ".jpg", ".gif", ".lock"];
  const splExts = [".ipynb"]


  const colab_blob_url = "https://colab.research.google.com/github/surajsharma/singularity/blob/master/"

  let items;

  try {
    if (fs.lstatSync(dirPath).isDirectory()) {
      items = fs.readdirSync(dirPath).sort((a, b) => {
        const isFileA = fs.statSync(path.join(dirPath, a)).isFile();
        const isFileB = fs.statSync(path.join(dirPath, b)).isFile();

        // Folders first
        if (isFileA && !isFileB) {
          return 1;
        } else if (!isFileA && isFileB) {
          return -1;
        }

        // Then sort alphabetically
        return a.localeCompare(b);
      });;

      items.forEach((item) => {
        const itemPath = path.join(dirPath, item);
        const itemStats = fs.lstatSync(itemPath);
        if (itemStats.isDirectory()) {
          const dirName = item.split("/")[item.split("/").length - 1];
          if (!excludedDirs.includes(dirName)) {
            const dirStr = `* 📂 [${item}](${dirName})\n`;
            fs.appendFileSync(`${dirPath}/index.md`, dirStr, function (err) {
              if (err) throw err;
            });
            createFileIndices(itemPath);
          }
        } else {
          let fileStr = "";
          const fileName = item.split("/")[item.split("/").length - 1];
          if (!excludedFiles.includes(fileName)) {
            //special file?
            if (splExts.includes(path.extname(fileName))) {
              let matchingExt = splExts.find(ext => fileName.includes(ext));
              switch (matchingExt) {
                case ".ipynb":
                  const colabLink = colab_blob_url + itemPath;
                  const nbName = item.replace(".ipynb", "");
                  fileStr = `* 📒 ${getExternalLink(colabLink, nbName)}`;
                  break;
                default:
                  fileStr = `* 📄 [fileName](${fileName})\n`;
                  break;
              }
            } else {
              fileStr = `* 📄 [${item.replace(".md", "")}](${fileName})\n`;
            }
            if (!excludedExts.includes(path.extname(fileName))) {
              fs.appendFileSync(`${dirPath}/index.md`, fileStr, function (err) {
                if (err) throw err;
              });
            }
          }
        }
      });
      return;
    }
  } catch (err) {
    console.error(`Error processing ${dirPath}:`, err);
    process.exitCode = 1;
  }
}

function getExternalLink(link, text) {
  return `<a href="${link}" target="_blank">${text}</a> ↗️\n`
}

createFileIndices(directoryPath);