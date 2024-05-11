#!/bin/bash
echo ⚙️ rebuilding indexes...
find . -name "index.md" -type f -delete  
node files-index.js archives && node files-index.js src
echo ✅ src/ and archives/ indexed
echo 🔎 building search index...
node search-index.js archives && node search-index.js src
echo ✅ search index ready