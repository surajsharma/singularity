let version, achecksum, schecksum;
const thread_sync = { msg: null, count: 0, data: {} };
const threadSyncEvent = new CustomEvent('thread_sync', {
    detail: { ...thread_sync },
    bubbles: true,
    cancelable: false
});

const support = typeof (Worker) !== "undefined" &&
    (window.indexedDB
        || window.mozIndexedDB
        || window.webkitIndexedDB
        || window.msIndexedDB
        || window.shimIndexedDB);

document.addEventListener("DOMContentLoaded", function (event) {
    if (support && search_worker) {
        search_worker.postMessage("iddb-sync");
        search_worker.onmessage = ev => {
            if (ev.data.thread.count) {
                thread_sync.msg = ev.data.thread.msg;
                thread_sync.count = ev.data.thread.count;
                thread_sync.data = ev.data.thread.data;
                document.dispatchEvent(threadSyncEvent);
            }
        }
    }
});