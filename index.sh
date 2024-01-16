#!/bin/bash

# Run node files.js src

find . -name "index.md" -type f -delete  
node files.js archives && node files.js src
echo src and archives indexed
# Add all changed files to git
#git add .

# Commit the changes with a message in the format "dd.mm.yy"
#git commit -m "$(date +"%d.%m.%y")"

# Push the changes to the remote repository
#git push
