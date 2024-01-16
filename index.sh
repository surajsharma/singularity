#!/bin/bash
echo ⚙️ rebuilding indexes...
find . -name "index.md" -type f -delete  
node files.js archives && node files.js src
echo ✅ src/ and archives/ indexed