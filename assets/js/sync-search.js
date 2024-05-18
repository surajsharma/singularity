const worker = new Worker('search-worker.js');

let srcSIJson, arcSIJson;

const support = typeof (Worker) !== "undefined" &&
    (window.indexedDB
        || window.mozIndexedDB
        || window.webkitIndexedDB
        || window.msIndexedDB
        || window.shimIndexedDB);

if (support) {
    worker.postMessage("iddb-sync");
    worker.onmessage = ev => {
        if (ev.data) {
            switch (ev.data.id) {
                case "ver":
                    if (ev.data.value.version) {
                        worker.postMessage("sync-src");
                        worker.postMessage("sync-archives");
                    };
                    break;
                case "src":
                    srcSIJson = ev.data.value;
                    console.log("🚀 ~ srcSIJson:", srcSIJson)
                    break;
                case "arc":
                    arcSIJson = ev.data.value;
                    console.log("🚀 ~ arcSIJson:", arcSIJson)
                    break;
                default: break;
            };

        }
    }
}