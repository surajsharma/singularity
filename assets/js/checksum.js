const fs = require("fs");
const path = require("path"); 0
const CRC32C = require("crc-32/crc32c");

function readFileAsStringSync(filePath, encoding = 'utf8') {
    //using async throws lunr off
    try {
        const data = fs.readFileSync(filePath, encoding);
        return JSON.stringify(data);
    } catch (err) {
        throw err;
    }
}

function upgradeDbChecksums() {
    try {
        const src = readFileAsStringSync("assets/search/src-search.json");
        const arc = readFileAsStringSync("assets/search/archives-search.json");

        const schecksum = CRC32C.str(src, 0);
        const achecksum = CRC32C.str(arc, 0);

        let db = fs.readFileSync("assets/search/db.json", "utf-8");

        let db_json = JSON.parse(db);

        db_json.db = db_json.db;
        db_json.version = db_json.version + 1;
        db_json.achecksum = achecksum;
        db_json.schecksum = schecksum;

        const filePath = path.join('assets', 'search', `db.json`);

        fs.writeFileSync(filePath, JSON.stringify(db_json), function (err) {
            if (err) throw err;
        });

    } catch (error) {
        console.log("~ upgradeDbChecksums ~ error:", error)
    }
}

upgradeDbChecksums();