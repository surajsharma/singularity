import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { str } from "crc-32/crc32c";

function readFileAsStringSync(filePath, encoding = 'utf8') {
    //using async throws lunr off
    try {
        const data = readFileSync(filePath, encoding);
        return JSON.stringify(data);
    } catch (err) {
        throw err;
    }
}

function upgradeDbChecksums() {
    try {
        const src = readFileAsStringSync("assets/search/src-search.json");
        const arc = readFileAsStringSync("assets/search/archives-search.json");

        const new_schecksum = str(src, 0);
        const new_achecksum = str(arc, 0);

        let dbfile = readFileSync("assets/search/db.json", "utf-8");

        let { db, version, achecksum, schecksum } = JSON.parse(dbfile);

        if (new_achecksum != achecksum || new_schecksum != schecksum) {
            version = version + 1;
            achecksum = new_achecksum;
            schecksum = new_schecksum;
            const filePath = join('assets', 'search', `db.json`);

            writeFileSync(filePath, JSON.stringify({ db, version, achecksum, schecksum }), function (err) {
                if (err) throw err;
            });
        } else return;


    } catch (error) {
        console.log("~ upgradeDbChecksums ~ error:", error)
    }
}

upgradeDbChecksums();