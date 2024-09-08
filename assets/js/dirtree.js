import fs from 'fs';

export default function buildDirectoryTree(dirPath) {
    if (!fs.existsSync(dirPath) || !fs.lstatSync(dirPath).isDirectory()) {
        return null;
    }

    const files = fs.readdirSync(dirPath);

    const subdirs = files.filter(file => fs.lstatSync(`${dirPath}/${file}`).isDirectory());

    const allFiles = files.filter(file => !fs.lstatSync(`${dirPath}/${file}`).isDirectory())
        .map(file => ({ name: file, type: 'file' }));

    const tree = {
        name: dirPath.split('/').pop(),
        type: fs.lstatSync(`${dirPath}`).isDirectory() ? "dir" : "file",
        children: [],
    };

    for (const subdir of subdirs) {
        const child = buildDirectoryTree(`${dirPath}/${subdir}`);
        if (child) {
            tree.children.push(child);
        }
    }

    tree.children.push(...allFiles);
    return tree;
}

/* Example usage
const directoryTree = buildDirectoryTree(directoryPath);

if (directoryTree) {
    console.log(JSON.stringify(directoryTree, null, 2)); // Pretty print the JSON tree
} else {
    console.error(`Error: Directory '${directoryPath}' not found or not a directory.`);
}*/