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

        const new_schecksum = CRC32C.str(src, 0);
        const new_achecksum = CRC32C.str(arc, 0);

        let dbfile = fs.readFileSync("assets/search/db.json", "utf-8");

        let { db, version, achecksum, schecksum } = JSON.parse(dbfile);

        if (new_achecksum != achecksum || new_schecksum != schecksum) {
            version = version + 1;
            achecksum = new_achecksum;
            schecksum = new_schecksum;
            const filePath = path.join('assets', 'search', `db.json`);

            fs.writeFileSync(filePath, JSON.stringify({ db, version, achecksum, schecksum }), function (err) {
                if (err) throw err;
            });
        } else return;


    } catch (error) {
        console.log("~ upgradeDbChecksums ~ error:", error)
    }
}

upgradeDbChecksums();