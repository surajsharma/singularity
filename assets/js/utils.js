import { existsSync, lstatSync, readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

export function readFileAsStringSync(filePath, encoding = 'utf8') {
    //using async throws lunr off
    try {
        const data = readFileSync(filePath, encoding);
        return JSON.stringify(data);
    } catch (err) {
        throw err;
    }
}

export function buildDirectoryTree(dirPath) {
    try {
        if (!existsSync(dirPath) || !lstatSync(dirPath).isDirectory()) {
            return null;
        }

        const files = readdirSync(dirPath);
        const subdirs = files.filter(file => lstatSync(`${dirPath}/${file}`).isDirectory());
        const allFiles = files.filter(file => !lstatSync(`${dirPath}/${file}`).isDirectory())
            .map(file => ({ name: file, type: 'file', path: `${dirPath}/${file}` }));

        const tree = {
            name: dirPath.split('/').pop(),
            type: lstatSync(`${dirPath}`).isDirectory() ? "dir" : "file",
            children: [],
            path: dirPath
        };

        for (const subdir of subdirs) {
            const child = buildDirectoryTree(`${dirPath}/${subdir}`);
            if (child) {
                tree.children.push(child);
            }
        }

        tree.children.push(...allFiles);
        return tree;
    } catch (error) {
        console.log("~ buildDirectoryTree ~ error:", error);
        return -1;
    }
}

export function getExternalLink(link, text) {
    return `<a href="${link}" target="_blank">${text}</a> ↗️\n`
}


export function getSortedItems(path) {
    const items = readdirSync(path);

    const withMeta = items.map(name => {
        const fullPath = join(path, name);
        const isFile = statSync(fullPath).isFile();

        const match = name.match(/^(\d+)[^\d]?/); // leading number
        const hasNumericPrefix = !!match;
        const numericPrefix = hasNumericPrefix ? parseInt(match[1], 10) : null;

        return { name, isFile, hasNumericPrefix, numericPrefix };
    });

    const folders = withMeta.filter(i => !i.isFile);
    const allFoldersHaveNumericPrefix = folders.length > 0 && folders.every(f => f.hasNumericPrefix);

    withMeta.sort((a, b) => {
        // folders before files
        if (!a.isFile && b.isFile) return -1;
        if (a.isFile && !b.isFile) return 1;

        // numeric prefix sort for folders
        if (
            allFoldersHaveNumericPrefix &&
            !a.isFile && !b.isFile &&
            a.hasNumericPrefix && b.hasNumericPrefix
        ) {
            return a.numericPrefix - b.numericPrefix;
        }

        // fallback: alphabetical
        return a.name.localeCompare(b.name);
    });

    return withMeta.map(i => i.name);
}


export function getEmojis(str) {
    const regex = /<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu;
    return str.match(regex) || [];
}

export function removeDuplicates(arr) {
    return [...new Set(arr)];
}
