#!/bin/bash
echo ⚙️ rebuilding file indices...
find . -name "index.md" -type f -delete
node assets/js/files-index.js archives
node assets/js/files-index.js src
echo ✅ nav indices created!
echo
echo ⚙️ building search indices...
rm assets/search/src-search.json
rm assets/search/archives-search.json
node assets/js/search-index.js src
node assets/js/search-index.js archives
echo ✅ search indices created
echo 
node assets/js/checksum.js
echo ✅ checksums/db version updated
echo