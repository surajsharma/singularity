const worker = new Worker('/assets/js/search-worker.js');

const support = typeof (Worker) !== "undefined" && (window.indexedDB);

if (support) {
    worker.postMessage("iddb-check");
    // returns version number or null

    //worker.postMessage("sync-src");
    //worker.postMessage("sync-archives");

    worker.onmessage = ev => {
        console.log('msg from worker: ', ev.data);
    }
}

