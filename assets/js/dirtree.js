const fs = require('fs'); // File system module
const path = require("path");
const directoryPath = process.argv[2];

function buildDirectoryTree(dirPath) {
    // Check if the path exists and is a directory
    if (!fs.existsSync(dirPath) || !fs.lstatSync(dirPath).isDirectory()) {
        return null;
    }

    const files = fs.readdirSync(dirPath);
    const subdirs = files.filter(file => fs.lstatSync(`${dirPath}/${file}`).isDirectory());
    const allFiles = files.map(file => ({ name: file, type: 'file' })); // Add info for files

    const tree = {
        name: dirPath.split('/').pop(), // Get the directory name
        children: [],
    };

    for (const subdir of subdirs) {
        const child = buildDirectoryTree(`${dirPath}/${subdir}`);
        if (child) {
            tree.children.push(child);
        }
    }

    tree.children.push(...allFiles); // Add files to children

    return tree;
}

// Example usage
const directoryTree = buildDirectoryTree(directoryPath);

if (directoryTree) {
    console.log(JSON.stringify(directoryTree, null, 2)); // Pretty print the JSON tree
} else {
    console.error(`Error: Directory '${directoryPath}' not found or not a directory.`);
}