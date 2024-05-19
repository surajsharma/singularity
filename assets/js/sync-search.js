let version, achecksum, schecksum, thread_sync = false;


const threadSyncEvent = new CustomEvent('thread_sync', {
    detail: { thread_sync: true } // Include new value in the event details
});


const worker = new Worker('search-worker.js');
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
            console.log(ev.data.sync);
            thread_sync = ev.data.sync;
            document.dispatchEvent(threadSyncEvent);
        }
    }
}