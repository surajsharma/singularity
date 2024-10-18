import { existsSync, lstatSync, readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';

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
    const items = readdirSync(path).sort((a, b) => {
        const isFileA = statSync(join(path, a)).isFile();
        const isFileB = statSync(join(path, b)).isFile();
        // Folders first
        if (isFileA && !isFileB) {
            return 1;
        } else if (!isFileA && isFileB) {
            return -1;
        }
        // Then sort alphabetically
        return a.localeCompare(b);
    });
    return items;
}

export function getEmojis(str) {
    const regex = /<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu;
    return str.match(regex) || [];
}


export function getTags(str) {
    const tokens = marked.lexer(str);
    console.log("🚀 ~ getTags ~ tokens:", tokens)

    const nonCodeTokens = tokens.filter(token => token.type !== 'Code' && token.type !== 'Codespan');
    // console.log("🚀 ~ getTags ~ nonCodeTokens:", nonCodeTokens)

    const mdstr = marked.parser(nonCodeTokens);
    // console.log("🚀 ~ getTags ~ mdstr:", mdstr)

    const regex = /#(?!\d)\w+/g;
    return mdstr.match(regex) || [];
}

export function removeDuplicates(arr) {
    return [...new Set(arr)];
}