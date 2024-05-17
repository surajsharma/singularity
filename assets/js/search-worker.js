let srcVersion = 1;
let archVersion = 1;
let dbVersion = 1;

let dbName = "singularity-search";

const SRC = '/assets/search/src-search.json';
const ARCHIVES = '/assets/search/archives-search.json';
const DB = '/assets/search/db.json';


async function fetchRemoteJson(loc, t = false) {
    const resp = await fetch(loc);
    return t ? resp.text() : resp.json();
}

async function createVersionedIddb(db, version, schecksum, achecksum) {
    if (!db) return;
    try {
        let store = db.createObjectStore("release", {
            keyPath: "id"
        });
        store.put({ id: "ver", value: { version, schecksum, achecksum } });
    } catch (error) {
        console.log("~ createVersionedIddb ~ error:", error)
    }
}

async function setVersionedIddb(db, version, schecksum, achecksum) {
    try {

        let tx = db.transaction("release", "readwrite")
        let store = tx.objectStore("release");

        const ver = await store.get("ver");
        const src = await store.get("src");
        const arc = await store.get("arc");

        arc.onsuccess = async (evt) => {
            if (!evt.target.result) { //init
                const arcdata = await fetchRemoteJson(ARCHIVES);
                store = db.transaction("release", "readwrite").objectStore("release");
                store.put({ id: "arc", value: arcdata });
            }
        }

        arc.onerror = async (evt) => {
            console.log("🚀 ~ arc.onerror= ~ evt:", evt)

        }

        src.onsuccess = async (evt) => {
            if (!evt.target.result) { //init
                const srcdata = await fetchRemoteJson(ARCHIVES);
                store = db.transaction("release", "readwrite").objectStore("release");
                store.put({ id: "src", value: srcdata });
            }
        }

        src.onerror = async (evt) => {
            console.log("🚀 ~ arc.onerror= ~ evt:", evt)

        }

        ver.onsuccess = async (event) => {
            if (!event.target.result) { //failsafe
                store.put({ id: "ver", value: { version, schecksum, achecksum } });
                return;
            }

            //--ver mismatch--
            if (event.target.result.value.version != version) {
                //write fetched to store 
                const newVersion = version
                store.put({ id: "ver", value: { version: newVersion, schecksum, achecksum } })
                return;

            };

            //--arc checksum mismatch--
            if (event.target.result.value.achecksum != achecksum) {
                const arcdata = await fetchRemoteJson(ARCHIVES);
                store = db.transaction("release", "readwrite").objectStore("release");
                store.put({ id: "arc", value: arcdata });

                const newAchecksum = achecksum
                store.put({ id: "ver", value: { version, schecksum, achecksum: newAchecksum } })

            }

            //--src checksum mismatch--
            if (event.target.result.value.schecksum != schecksum) {
                const srcdata = await fetchRemoteJson(SRC);
                store = db.transaction("release", "readwrite").objectStore("release");
                store.put({ id: "src", value: srcdata });

                const newSchecksum = schecksum
                store.put({ id: "ver", value: { version, schecksum: newSchecksum, achecksum } })
            }
        }

        ver.onerror = async (evt) => {
            console.log("~ arc.onerror= ~ evt:", evt)
        }

    } catch (error) {
        console.log("~ setVersionedIddb ~ error:", error)
    }
}

async function checkDBexists() {
    const { version, schecksum, achecksum } = await fetchRemoteJson(DB);
    const request = self.indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function (event) {
        console.log("Database didn't exist, creating now.");
        createVersionedIddb(request.result, version, schecksum, achecksum);
    };

    request.onsuccess = function (event) {
        const db = event.target.result;
        const release = "release";
        if (db.objectStoreNames.contains(release)) {
            // Object store exists
            setVersionedIddb(db, version, schecksum, achecksum);
        } else {
            // TODO: somehow object store is lost, drop db and refresh
        }
    };

    request.onerror = function (event) {
        console.error("Error opening database:", event.target.error);
        return false;
    };
}

onmessage = async (ev) => {
    if (ev.data == 'iddb-sync') {
        await checkDBexists();
        sendFromIDDB("ver");
    }

    if (ev.data == 'sync-src') {
        sendFromIDDB("src");
    }

    if (ev.data == 'sync-archives') {
        sendFromIDDB("arc");
    }
}

async function sendFromIDDB(key) {
    const request = self.indexedDB.open(dbName, dbVersion);

    request.onsuccess = (event) => {
        const db = event.target.result;
        const store = db.transaction("release", "readonly").objectStore("release");
        const query = store.get(key);

        query.onsuccess = e => {
            postMessage(e.target.result);
        }

        query.onerror = e => {
            postMessage(e.target.error);
        }
    };

    request.onerror = function (event) {
        postMessage(event.target.error);
    };
}