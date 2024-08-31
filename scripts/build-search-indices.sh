#!/usr/bin/env bash
echo ⚙️ building search indices...
rm assets/search/src-search.json
rm assets/search/archives-search.json
node assets/js/search-index.js src
node assets/js/search-index.js archives
echo
echo ✅ search indices created
echo