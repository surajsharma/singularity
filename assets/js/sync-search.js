let version, achecksum, schecksum;

const thread_sync = { msg: null, count: 0 };
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
    if (support && worker) {
        worker.postMessage("iddb-sync");
        worker.onmessage = ev => {
            if (ev.data.thread.count) {
                thread_sync.msg = ev.data.thread.msg;
                thread_sync.count = ev.data.thread.count;
                document.dispatchEvent(threadSyncEvent);
            }
        }
    }
});
