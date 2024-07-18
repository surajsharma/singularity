const dbName = "singularity-search";

const SRC = "../search/src-search.json";
const ARCHIVES = "../search/archives-search.json";
const DB = "../search/db.json";

async function fetchRemoteJson(loc, t = false) {
    try {
        const resp = await fetch(loc + `?v=${Date.now()}`, { cache: "reload" });
        return t ? resp.text() : resp.json();
    } catch (error) {
        console.log("~ fetchRemoteJson ~ error:", error);
        postMessage({ thread: { msg: "offline", count: -1 } });
    }
}

async function createVersionedIddb(db) {
    // creates the ver object store because it didn't exist
    if (!db) return;
    try {
        if (!db.objectStoreNames.contains("release")) {
            db.createObjectStore("release", {
                keyPath: "id"
            });
        }
    } catch (error) {
        console.log("createVersionedIddb ~ error:", error)
    }
}

async function setVersionedIddb(db, version, schecksum, achecksum, shouldReload) {
    try {
        let tx = db.transaction("release", "readwrite")
        let store = tx.objectStore("release");

        const ver = await store.get("ver");
        const src = await store.get("src");
        const arc = await store.get("arc");

        arc.onsuccess = async (evt) => {
            if (!evt.target.result) { //init
                const arcdata = await fetchRemoteJson(ARCHIVES);
                store = db.transaction("release", "readwrite")
                    .objectStore("release");
                store.put({ id: "arc", value: arcdata, checksum: achecksum });
            }
        }

        src.onsuccess = async (evt) => {
            if (!evt.target.result) { //init
                const srcdata = await fetchRemoteJson(SRC);
                store = db.transaction("release", "readwrite")
                    .objectStore("release");
                store.put({ id: "src", value: srcdata, checksum: schecksum });
            }
        }

        ver.onsuccess = async (evt) => {
            if (!evt.target.result) { //failsafe
                store.put({
                    id: "ver", value: {
                        version, schecksum, achecksum
                    }
                });

                postMessage({
                    thread: {
                        msg: "src/arc",
                        count: 4,
                        data: { reload: shouldReload }
                    }
                });

                return;
            }

            //--ver mismatch--
            if (evt.target.result.value.version != version) {
                const newVersion = version;
                store.put({
                    id: "ver", value: {
                        version: newVersion, schecksum, achecksum
                    }
                });
            };

            //--arc checksum mismatch--
            if (evt.target.result.value.achecksum != achecksum) {
                const arcdata = await fetchRemoteJson(ARCHIVES);
                store = db.transaction("release", "readwrite")
                    .objectStore("release");

                store.put({ id: "arc", value: arcdata, checksum: achecksum });

                const newAchecksum = achecksum;

                store.put({
                    id: "ver", value: {
                        version, schecksum, achecksum: newAchecksum
                    }
                });

                shouldReload = true;
            }

            //--src checksum mismatch--
            if (evt.target.result.value.schecksum != schecksum) {
                const srcdata = await fetchRemoteJson(SRC);

                store = db.transaction("release", "readwrite").objectStore("release");

                store.put({ id: "src", value: srcdata, checksum: schecksum });

                const newSchecksum = schecksum;

                store.put({ id: "ver", value: { version, schecksum: newSchecksum, achecksum } });

                shouldReload = true;
            }

            postMessage({
                thread: {
                    msg: "src/arc",
                    count: 4,
                    data: { reload: shouldReload }
                }
            });
        }

        arc.onerror = async (evt) => {
            console.log("~ arc.onerror= ~ evt:", evt)
        }

        src.onerror = async (evt) => {
            console.log("~ arc.onerror= ~ evt:", evt)
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

        let shouldReload = false;

        request.onupgradeneeded = (event) => {
            // called when the db version changes
            console.log("🔔 Database upgrade needed.");
            createVersionedIddb(request.result);
            postMessage({ thread: { msg: 'release', count: 1 } });
            shouldReload = true;
        };

        request.onsuccess = async (event) => {
            if (request.result.objectStoreNames.contains("release")) {

                const ver = request.result.version;

                postMessage({
                    thread: {
                        msg: "version",
                        count: 1,
                        data: { version: ver }
                    }
                });

                await setVersionedIddb(request.result, version, schecksum, achecksum, shouldReload);

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
    if (ev.data == "iddb-sync") {
        syncIddb();
    }
}