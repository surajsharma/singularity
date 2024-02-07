const fs = require("fs");
const path = require("path");

const directoryPath = process.argv[2];

if (!directoryPath) {
  console.log("Please specify the directory path as a command line parameter.");
  process.exit(1);
}

function createIndexes(dirPath) {
  const excludedDirs = ["target", ".", ".ipynb_checkpoints", ".out"];

  const excludedFiles = [".DS_Store", "index.md"];

  const excludedExts = [".png", ".jpg", ".gif"];

  const results = {};
  let items;

  try {
    if (fs.lstatSync(dirPath).isDirectory()) {
      items = fs.readdirSync(dirPath);

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
            createIndexes(itemPath);
            Object.keys(results).forEach((subDir) => {
              createIndexes(itemPath);
            });
          }
        } else {
          const fileName = item.split("/")[item.split("/").length - 1];

          if (!excludedFiles.includes(fileName)) {
            const fileStr = `* 📄 [${item}](${fileName})\n`;

            if (!excludedExts.includes(path.extname(fileName))) {
              fs.appendFileSync(`${dirPath}/index.md`, fileStr, function (err) {
                if (err) throw err;
              });
            }
          }
        }
      });
      return results;
    }
  } catch (err) {
    console.error(`Error processing ${dirPath}:`, err);
    process.exitCode = 1;
  }
}

createIndexes(directoryPath);
