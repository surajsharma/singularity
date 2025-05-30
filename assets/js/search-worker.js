const dbName = "singularity-search";

const SRC = "../search/src-search.json";
const ARC = "../search/archives-search.json";
const EMO = "../search/emoji-search.json";
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

async function setVersionedIddb(db, version, schecksum, achecksum, echecksum, shouldReload) {
    try {
        let store = db.transaction("release", "readwrite").objectStore("release");

        const ver = await store.get("ver");
        const src = await store.get("src");
        const arc = await store.get("arc");
        const emo = await store.get("emo");

        emo.onsuccess = async (evt) => {
            if (!evt.target.result) { //init
                const emodata = await fetchRemoteJson(EMO);
                store = db.transaction("release", "readwrite").objectStore("release");
                store.put({ id: "emo", value: emodata, checksum: echecksum });
            }

            //--arc checksum mismatch--
            if (evt.target.result?.checksum != achecksum) {
                const emodata = await fetchRemoteJson(EMO);
                store = db.transaction("release", "readwrite").objectStore("release");
                const updateData = store.put({ id: "emo", value: emodata, checksum: echecksum });
                updateData.onsuccess = () => {
                    shouldReload = true;
                    postMessage({
                        thread: {
                            msg: "emo",
                            count: 3,
                            data: { reload: shouldReload, version, schecksum, achecksum, echecksum }
                        }
                    });
                };

                const updateVer = store.put({
                    id: "ver", value: {
                        version: version, schecksum, achecksum, echecksum
                    }
                });
            } else {
                postMessage({
                    thread: {
                        msg: "emo",
                        count: 3,
                        data: { reload: shouldReload, version, schecksum, achecksum, echecksum }
                    }
                });
            }
        }

        emo.onerror = async (evt) => {
            console.log("~ emo.onerror= ~ evt:", evt)
        }


        arc.onsuccess = async (evt) => {
            if (!evt.target.result) { //init
                const arcdata = await fetchRemoteJson(ARC);
                store = db.transaction("release", "readwrite").objectStore("release");
                store.put({ id: "arc", value: arcdata, checksum: achecksum });
            }

            //--arc checksum mismatch--
            if (evt.target.result?.checksum != achecksum) {
                const arcdata = await fetchRemoteJson(ARC);
                store = db.transaction("release", "readwrite").objectStore("release");
                const updateData = store.put({ id: "arc", value: arcdata, checksum: achecksum });
                updateData.onsuccess = () => {
                    shouldReload = true;
                    postMessage({
                        thread: {
                            msg: "arc",
                            count: 1,
                            data: { reload: shouldReload, version, schecksum, achecksum }
                        }
                    });
                };

                const updateVer = store.put({
                    id: "ver", value: {
                        version: version, schecksum, achecksum
                    }
                });
            } else {
                postMessage({
                    thread: {
                        msg: "arc",
                        count: 1,
                        data: { reload: shouldReload, version, schecksum, achecksum }
                    }
                });
            }
        }

        arc.onerror = async (evt) => {
            console.log("~ arc.onerror= ~ evt:", evt)
        }

        src.onsuccess = async (evt) => {
            if (!evt.target.result) { //init
                const srcdata = await fetchRemoteJson(SRC);
                store = db.transaction("release", "readwrite").objectStore("release");
                store.put({ id: "src", value: srcdata, checksum: schecksum });
            }

            //--src checksum mismatch--
            if (evt.target.result?.checksum != schecksum) {
                const srcdata = await fetchRemoteJson(SRC);
                store = db.transaction("release", "readwrite").objectStore("release");
                const updateData = store.put({ id: "src", value: srcdata, checksum: schecksum });

                updateData.onsuccess = () => {
                    shouldReload = true;
                    postMessage({
                        thread: {
                            msg: "src",
                            count: 2,
                            data: { reload: shouldReload, version, schecksum, achecksum }
                        }
                    });
                }

                const updateVer = store.put({
                    id: "ver", value: {
                        version: version, schecksum, achecksum
                    }
                });
            } else {
                postMessage({
                    thread: {
                        msg: "src",
                        count: 2,
                        data: { reload: shouldReload, version, schecksum, achecksum }
                    }
                });
            }
        }

        src.onerror = async (evt) => {
            console.log("~ src.onerror= ~ evt:", evt)
        }

        ver.onsuccess = async (evt) => {
            if (!evt.target.result) { //failsafe
                store.put({
                    id: "ver", value: {
                        version, schecksum, achecksum
                    }
                });
            }

            //--ver mismatch--
            if (evt.target.result?.value.version != version) {
                const updateVer = store.put({
                    id: "ver", value: {
                        version: version, schecksum, achecksum
                    }
                });
                updateVer.onsuccess = () => {
                    postMessage({
                        thread: {
                            msg: "ver",
                            count: 4,
                            data: { reload: shouldReload, version, schecksum, achecksum }
                        }
                    });
                }
            } else {
                postMessage({
                    thread: {
                        msg: "ver",
                        count: 4,
                        data: { reload: shouldReload, version, schecksum, achecksum }
                    }
                });
            }
        }

        ver.onerror = async (evt) => {
            console.log("~ ver.onerror= ~ evt:", evt)
        }

    } catch (error) {
        console.log("~ setVersionedIddb ~ error:", error)
    }
}

async function syncIddb() {
    try {
        ({ version, achecksum, schecksum, echecksum } = await fetchRemoteJson(DB));

        if (!version) return new Error("Could not load database metadata");

        const request = self.indexedDB.open(dbName, version);

        let shouldReload = false;

        request.onupgradeneeded = (event) => {
            // called when the db version changes
            console.log("🔔 Database upgrade needed.");
            createVersionedIddb(request.result);
            postMessage({ thread: { msg: 'release', count: 0 } });
            shouldReload = true;
        };

        request.onsuccess = async (event) => {
            if (request.result.objectStoreNames.contains("release")) {
                const ver = request.result.version;
                postMessage({
                    thread: {
                        msg: "version",
                        count: 1,
                        data: { ver }
                    }
                });
                await setVersionedIddb(request.result, version, schecksum, achecksum, echecksum, shouldReload);
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