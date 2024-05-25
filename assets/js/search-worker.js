//TODO: fetch and write stream

let dbName = "singularity-search";

const baseUrl = "https://raw.githubusercontent.com/surajsharma/singularity/master";

const SRC = `${baseUrl}/assets/search/src-search.json`;
const ARCHIVES = `${baseUrl}/assets/search/archives-search.json`;
const DB = `${baseUrl}/assets/search/db.json`;

async function fetchRemoteJson(loc, t = false) {
    try {
        const resp = await fetch(loc, { cache: "no-cache" });
        return t ? resp.text() : resp.json();
    } catch (error) {
        console.log("~ fetchRemoteJson ~ error:", error);
    }
}

async function createVersionedIddb(db) {
    // creates the ver object store because it didn't exist
    if (!db) return;
    try {
        let store;
        if (!db.objectStoreNames.contains("release")) {
            store = db.createObjectStore("release", {
                keyPath: "id"
            });
        }

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
                const tx = db.transaction("release", "readwrite");
                const store = tx.objectStore("release");
                store.put({ id: "arc", value: arcdata });
            }
        }

        arc.onerror = async (evt) => {
            console.log("~ arc.onerror= ~ evt:", evt)
        }

        src.onsuccess = async (evt) => {
            if (!evt.target.result) { //init
                const srcdata = await fetchRemoteJson(SRC);
                store = db.transaction("release", "readwrite").objectStore("release");
                store.put({ id: "src", value: srcdata });
            }
        }

        src.onerror = async (evt) => {
            console.log("~ arc.onerror= ~ evt:", evt)
        }

        ver.onsuccess = async (event) => {
            if (!event.target.result) { //failsafe
                store.put({
                    id: "ver", value: {
                        version, schecksum, achecksum
                    }
                });

                return;
            }

            //--ver mismatch--
            if (event.target.result.value.version != version) {

                //write fetched to store 
                const newVersion = version;

                store.put({
                    id: "ver", value: {
                        version: newVersion, schecksum, achecksum
                    }
                });
            };

            //--arc checksum mismatch--
            if (event.target.result.value.achecksum != achecksum) {
                const arcdata = await fetchRemoteJson(ARCHIVES);
                store = db.transaction("release", "readwrite").objectStore("release");
                store.put({ id: "arc", value: arcdata });

                const newAchecksum = achecksum;

                store.put({
                    id: "ver", value: {
                        version, schecksum, achecksum: newAchecksum
                    }
                });
            }

            //--src checksum mismatch--
            if (event.target.result.value.schecksum != schecksum) {
                const srcdata = await fetchRemoteJson(SRC);
                store = db.transaction("release", "readwrite").objectStore("release");

                store.put({ id: "src", value: srcdata });

                const newSchecksum = schecksum;

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

async function syncIddb() {
    try {
        ({ version, achecksum, schecksum } = await fetchRemoteJson(DB));

        if (!version) return new Error("Could not load database metadata");

        const request = self.indexedDB.open(dbName, version);

        request.onupgradeneeded = (event) => {
            console.log("Database didn't exist, creating now.");
            createVersionedIddb(request.result);
            postMessage({ thread: { msg: 'release', count: 1 } });
        };

        request.onsuccess = (event) => {
            if (request.result.objectStoreNames.contains("release")) {
                setVersionedIddb(request.result, version, schecksum, achecksum);
                postMessage({ thread: { msg: 'src', count: 4 } });
            }
        }

        request.onerror = (event) => {
            console.error("Error opening database:", event.target.error);
            return false;
        };
    } catch (error) {
        console.log("~ syncIddb ~ error:", error);
    }
}

onmessage = async (ev) => {
    if (ev.data == 'iddb-sync') {
        syncIddb();
    }
}