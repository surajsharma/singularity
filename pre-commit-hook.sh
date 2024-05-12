#!/bin/bash
echo 🔎 building search index...
rm assets/search/src-search.json
rm assets/search/archives-search.json
node assets/js/search-index.js src
node assets/js/search-index.js archives
echo ✅ search indices created

echo ⚙️ rebuilding file indexes...
find . -name "index.md" -type f -delete
node assets/js/files-index.js archives
node assets/js/files-index.js src
echo ✅ nav indices created!