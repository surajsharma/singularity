import { readdirSync, statSync, writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { basename, extname, join, dirname } from "path";
import { clearLine, cursorTo } from 'readline';
import { excludedDirs, excludedExts, excludedFiles } from './constants.js';
import { buildDirectoryTree, getEmojis, readFileAsStringSync, removeDuplicates } from './utils.js';

import lunr from "lunr";

const directoryPath = process.argv[2];

if (!directoryPath) {
  console.log("Please specify the directory path as a command line parameter.");
  process.exit(1);
}

// Ensure search directory exists
const searchDir = join('assets', 'search');
if (!existsSync(searchDir)) {
  mkdirSync(searchDir, { recursive: true });
}

function createSearchIndexDirs(dirPath) {
  try {
    const documents = [];
    const stack = [dirPath];
    let processedCount = 0;

    // Collect all documents first
    while (stack.length > 0) {
      const currentPath = stack.pop();
      
      try {
        const contents = readdirSync(currentPath);
        
        for (const itemName of contents) {
          const itemPath = join(currentPath, itemName);
          const stats = statSync(itemPath);

          if (stats.isDirectory()) {
            const item = basename(itemPath);
            if (!excludedDirs.includes(item)) {
              stack.push(itemPath);
              documents.push({ 
                id: itemPath, 
                item, 
                content: 'directory',
                type: 'dir'
              });
            }
          } else {
            const item = basename(itemPath);
            const itemWithoutExt = item.replace(/\.[^/.]+$/, ''); // Remove any extension
            const ext = extname(item);
            
            if (!excludedFiles.includes(itemWithoutExt) && !excludedExts.includes(ext)) {
              try {
                let content = readFileAsStringSync(itemPath);
                
                // Truncate very long content to prevent bloat
                if (content.length > 10000) {
                  content = content.substring(0, 10000) + '...';
                }
                
                // Remove excessive whitespace
                content = content.replace(/\s+/g, ' ').trim();
                
                documents.push({ 
                  id: itemPath, 
                  item: itemWithoutExt, 
                  content,
                  type: 'file'
                });
              } catch (readError) {
                console.warn(`⚠️  Could not read file: ${itemPath}`);
              }
            }
          }
          
          processedCount++;
          if (processedCount % 50 === 0) {
            clearLine(process.stdout, 0);
            cursorTo(process.stdout, 0, null);
            process.stdout.write(`🔍 Processed ${processedCount} items...`);
          }
        }
      } catch (dirError) {
        console.warn(`⚠️  Could not read directory: ${currentPath}`);
      }
    }

    // Build index with all documents
    const idx = lunr(function () {
      this.ref('id');
      this.field('item', { boost: 10 }); // Boost item names for better search
      this.field('content');

      documents.forEach(doc => {
        this.add(doc);
      });
    });

    const filePath = join(searchDir, `${basename(directoryPath)}-search.json`);
    writeFileSync(filePath, JSON.stringify(idx.toJSON())); // Use toJSON() for smaller size
    
    clearLine(process.stdout, 0);
    cursorTo(process.stdout, 0, null);
    console.log(`✅ Search index created: ${filePath} (${documents.length} documents)`);
    
  } catch (err) {
    console.error(`Error processing ${dirPath}:`, err);
    process.exitCode = 1;
  }
}

function createEmojiSearchIndex(tree) {
  try {
    const emojiIndex = {};
    const processedPaths = new Set(); // Prevent duplicate processing
    
    function processTree(node) {
      if (node.type === 'dir' && node.children) {
        node.children.forEach(child => {
          const childPath = child.path;
          
          // Skip if already processed
          if (processedPaths.has(childPath)) {
            return;
          }
          processedPaths.add(childPath);
          
          // Process directory name
          if (child.type === 'dir') {
            const emojisInDirName = getEmojis(child.name);
            const indexPath = join(childPath, "index.md");
            
            emojisInDirName.forEach(emoji => {
              const unicode = emoji.codePointAt(0).toString(16);
              if (!emojiIndex[unicode]) {
                emojiIndex[unicode] = new Set();
              }
              emojiIndex[unicode].add(indexPath);
            });
            
            // Recursively process subdirectories
            processTree(child);
          }
          
          // Process file
          if (child.type === 'file') {
            const ext = extname(child.name);
            const filePath = join(child.path || dirname(childPath), child.name);
            
            // Process emojis in filename
            const emojisInFileName = getEmojis(child.name);
            emojisInFileName.forEach(emoji => {
              const unicode = emoji.codePointAt(0).toString(16);
              if (!emojiIndex[unicode]) {
                emojiIndex[unicode] = new Set();
              }
              emojiIndex[unicode].add(filePath);
            });
            
            // Process emojis in file content
            if (!excludedExts.includes(ext)) {
              try {
                let content = readFileAsStringSync(filePath);
                
                // Limit content size for emoji processing
                if (content.length > 50000) {
                  content = content.substring(0, 50000);
                }
                
                const emojisInFile = removeDuplicates(getEmojis(content));
                emojisInFile.forEach(emoji => {
                  const unicode = emoji.codePointAt(0).toString(16);
                  if (!emojiIndex[unicode]) {
                    emojiIndex[unicode] = new Set();
                  }
                  emojiIndex[unicode].add(filePath);
                });
              } catch (readError) {
                console.warn(`⚠️  Could not read file for emoji processing: ${filePath}`);
              }
            }
          }
        });
      }
    }
    
    processTree(tree);
    
    // Convert Sets to Arrays for JSON serialization
    const finalIndex = {};
    Object.keys(emojiIndex).forEach(unicode => {
      finalIndex[unicode] = Array.from(emojiIndex[unicode]);
    });
    
    const indexPath = join(searchDir, 'emoji-search.json');
    writeFileSync(indexPath, JSON.stringify(finalIndex));
    
    console.log(`✅ Emoji search index created: ${indexPath} (${Object.keys(finalIndex).length} emojis)`);
    
  } catch (err) {
    console.error("Error creating emoji search index:", err);
    process.exitCode = 1;
  }
}

// Performance timing
const startTime = Date.now();

createSearchIndexDirs(directoryPath);
createEmojiSearchIndex(buildDirectoryTree(directoryPath));

const endTime = Date.now();
console.log(`🚀 Indexing completed in ${(endTime - startTime) / 1000}s`);
