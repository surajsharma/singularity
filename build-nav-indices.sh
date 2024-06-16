echo ⚙️ rebuilding file indices...
find . -name "index.md" -type f -delete
node assets/js/files-index.js archives
node assets/js/files-index.js src
echo ✅ nav indices created!
echo