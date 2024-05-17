let srcVersion = 1;
let archVersion = 1;
let dbVersion = 1;

let dbName = "singularity";
const db_json_url = "";

const baseUrl = 'https://raw.githubusercontent.com/surajsharma/singularity/master/assets/search/';

const SRC = baseUrl + 'src-search.json';
const ARCHIVES = baseUrl + 'archives-search.json';


function fetchRemoteSearchIndex(loc) {
}

function createCheckSum(data) {
}

function setVersionedDataIddb(indexData, version) {
}

function createVersionedIddb(db) {
    const store = db.createObjectStore("release", {
        keyPath: "id", autoIncrement: true
    });

    console.log("🚀 ~ createVersionedIddb ~ store:", store)
    store.put({ id: "release", value: dbVersion + 1 });

}

function setVersionedIddb(db) {
    try {
        let tx = db.transaction("release", "readwrite");
        let store = tx.objectStore("release");

        //fetch db.json for latest
        //  maintain a copy in ls as session (update if needed)

        //if ls checksum matches iddb and values !"", return

        //--src checksum mismatch--
        //fetch SRC
        //write fetched to store

        //--arc checksum mismatch--
        //fetch ARCHIVES
        //write fetched to store

        //--ver mismatch--
        //fetch SRC
        //write fetched to store

        //--locals don't exist--
        //write fetched to store

        //no need to worry about db.json as it will always be > local,
        //on the next load checksum will match, iddb is untouched

        store.put({ id: "src", data: {}, checksum: 42 });
        store.put({ id: "arc", data: {}, checksum: 35 });
        store.put({ id: "ver", value: dbVersion });
    } catch (error) {
        console.log("~ setVersionedIddb ~ error:", error)

    }
}

function checkDBexists() {
    let request = self.indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function (event) {
        console.log("Database didn't exist, creating now.");
        createVersionedIddb(event.target.result);
    };

    request.onsuccess = function (event) {
        console.log("Database opened successfully.");
        // setVersionedIddb(event.target.result);
    };

    request.onerror = function (event) {
        console.error("Error opening database:", event.target.error);
        return false;
    };

    return request;
}

onmessage = ev => {
    if (ev.data == 'iddb-check') {
        checkDBexists();
        postMessage('iddb check')
    }
    if (ev.data == 'sync-src') {
        console.log('worker got msg: ', ev.data);
        postMessage('src data');
    }
    if (ev.data == 'sync-archives') {
        console.log('worker got msg: ', ev.data);
        postMessage('archive data');
    }
}