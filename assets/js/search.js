//TODO: for jupyter notebooks https://nbviewer.org/urls/evenzero.in/singularity/src/dev/web3/data%20for%20web3/01%20-%20Basic%20Metrics/web3_metrics.ipynb

let index = null;
let srcIndexData = null;
let archIndexData = null;

let indices = { "src": null, "arc": null, "ver": null }

// search modifiers
let archives = false;
let titles = false;

const searchInput = document.getElementById('search-input');
const searchArchives = document.getElementById('search-archives');
const searchTitles = document.getElementById('search-titles');
const searchStatus = document.getElementById('search-status');
const searchResults = document.getElementById('search-results-container');

function debouncedSearch(searchTerm) {
    searchInput.style.backgroundColor = "rgb(227, 255, 255)";
    searchStatus.style.color = "black";

    if (searchResults) searchResults.innerHTML = '';
    searchStatus.innerText = 'Searching...'

    if (searchTerm == "") {
        searchStatus.innerText = ``;
        return;
    }

    try {
        const search = titles ? index.search(`item:` + searchTerm) : index.search(searchTerm);
        displaySearch(search, searchTerm);
    } catch (error) {
        searchStatus.innerText = "search error: " + error.message;
        searchStatus.style.color = "red";
        searchInput.style.backgroundColor = "rgba(255, 227, 227, 0.5)";
    }
}

function displaySearch(search, searchTerm) {
    searchStatus.innerText = `Found ${search.length} results for ${searchTerm}`;
    search.forEach((item, idx) => {
        const searchResultDiv = document.createElement('div');
        searchResultDiv.id = `${archives ? 'search-result-arch' : 'search-result'}`;

        const searchResultDivItems = document.createElement('div');
        searchResultDivItems.id = "search-result-div-items";

        const titleidx = idx < 9 ? "0" + (idx + 1) : (idx + 1);
        const searchTitleIndex = document.createElement('div');
        searchTitleIndex.id = 'index';
        const searchTitleIndexText = document.createElement('div');
        searchTitleIndexText.id = "text";
        searchTitleIndexText.innerText = titleidx;
        searchTitleIndex.appendChild(searchTitleIndexText);
        searchResultDiv.appendChild(searchTitleIndex);

        const searchResultTitleTop = document.createElement('div');
        searchResultTitleTop.id = 'search-result-title-top';

        const title = item.ref.match(/\/([^/]*)$/)[0].replace('/', '').replace('.md', '');

        const searchTitleLink = document.createElement('a');
        searchTitleLink.id = "search-result-title";
        searchTitleLink.href = urlprefix == "" ?
            `/${item.ref.replace('.md', '.html')}` : `/singularity/${item.ref.replace('.md', '.html')}`;
        searchTitleLink.textContent = title.length > 40 ?
            title.substring(0, 40 - '...'.length) + '...' :
            title;

        const searchTitleLinks = document.createElement('div');
        searchTitleLinks.id = 'search-title-links';

        const searchTitleLinkNewTab = document.createElement('a');
        searchTitleLinkNewTab.id = "search-result-title-newtab";
        searchTitleLinkNewTab.href = urlprefix == "" ?
            `/${item.ref.replace('.md', '.html')}` : `/singularity/${item.ref.replace('.md', '.html')}`;

        searchTitleLinkNewTab.textContent = "↗️";
        searchTitleLinkNewTab.target = '_blank';

        const searchTitleLinkRaw = document.createElement('a');
        searchTitleLinkRaw.id = "search-result-title-newtab";
        searchTitleLinkRaw.href = `/singularity/${item.ref}`
        searchTitleLinkRaw.textContent = "📄";
        searchTitleLinkRaw.target = '_blank';


        const searchResultLoc = document.createElement('pre');
        searchResultLoc.id = "search-result-loc";
        searchResultLoc.textContent = item.ref;

        searchTitleLinks.appendChild(searchTitleLinkRaw);
        searchTitleLinks.appendChild(searchTitleLinkNewTab);

        searchResultTitleTop.appendChild(searchTitleLink);
        searchResultTitleTop.appendChild(searchTitleLinks);

        searchResultDivItems.appendChild(searchResultTitleTop);
        searchResultDivItems.appendChild(searchResultLoc);

        searchResultDiv.appendChild(searchResultDivItems);

        searchResults.appendChild(searchResultDiv);
    });
}

function loadSearchIndex(data) {
    index = lunr.Index.load(data);
    console.log('search index loaded!');
}

function handleToggle(event) {
    const target = event.target;
    switch (`${target.id}`) {
        case 'search-archives':
            archives = target.checked;
            searchInput.value = '';
            searchResults.innerHTML = '';
            if (archives) {
                archIndexData && loadSearchIndex(archIndexData);
            }
            if (!archives) {
                srcIndexData && loadSearchIndex(srcIndexData);
            }
            searchStatus.innerText = '';
            break;
        case 'search-titles':
            titles = target.checked;
            searchInput.value = '';
            searchResults.innerHTML = '';
            searchStatus.innerText = '';
            break;
        default:
            break;
    }
}

function setupEventListeners() {
    //event-listeners
    searchArchives.addEventListener('change', handleToggle);
    searchTitles.addEventListener('change', handleToggle);
    searchTitles.checked = false;
    searchArchives.checked = false;

    // Debounce implementation with timeout
    let timeout;
    if (searchInput) {
        searchInput.focus();
        searchInput.value = '';
        searchInput.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                debouncedSearch(searchInput.value);
            }, 500);
        });

    }
}

async function initSearchWorker(corrupt = false) {
    await new Promise(async (resolve, reject) => {
        if (typeof lunr == 'undefined') reject("Lunr not found!");
        try {
            searchStatus.innerText = corrupt ?
                'Search database damaged, healing...' : 'Loading...';

            await getIddb("src", indices, version);
            await getIddb("arc", indices, version);

            indices.src.length && (srcIndexData = indices.src[0].value);
            indices.arc.length && (archIndexData = indices.arc[0].value);

            // load main index
            indices.src && loadSearchIndex(srcIndexData);

            setupEventListeners();
            searchStatus.innerText = '';

            resolve(0);
        } catch (error) {
            console.log("~ initSearchWorker ~ error:", error);
            reject(error);
        }

    });
}

async function initSearchWorkerless() {
    if (typeof lunr == 'undefined') {
        return;
    } else {
        try {
            searchStatus.innerText = 'Loading...';

            srcIndexData = await fetchRemoteJson(SRC);
            archIndexData = await fetchRemoteJson(ARCHIVES);
            searchStatus.innerText = '';

            // load main index
            loadSearchIndex(srcIndexData);
            setupEventListeners();
        } catch (error) {
            console.log("~ initSearchWorkerless ~ error:", error)
        }
    }
}

async function fetchRemoteJson(loc, t = false) {
    try {
        const resp = await fetch(loc);
        return t ? resp.text() : resp.json();
    } catch (error) {
        console.error('Error fetching search index:', error);
    }
}

async function getIddb(key, ref, ver) {
    await new Promise((resolve, reject) => {
        try {
            const request = self.indexedDB.open(dbName, ver);
            request.onsuccess = async (event) => {
                const db = event.target.result;
                const tx = db.transaction("release", "readonly")
                const store = tx.objectStore("release");
                const query = await store.getAll(key);

                query.onsuccess = async (e) => {
                    if (e.target.result.length < 1) {
                        // fault-tolerance: we're here because somehow 
                        // the local db wasn't there, the sync script has 
                        // recreated it, but page needs to register
                        await initSearchWorker(true);
                    } else {
                        ref[key] = e.target.result;
                        resolve(ref);
                    }
                }

                query.onerror = e => {
                    reject(e.target.error);
                }
            }
        } catch (error) {
            console.log("~ awaitnewPromise ~ error:", error)
        }
    });
}

if (support) {
    document.addEventListener('thread_sync', async (event) => {
        // thread_sync legend: 
        // 0) no db 1) db/os created 2) release -> ver created 3) arc 4) src
        if (thread_sync.count == 4) {
            await initSearchWorker();
        }
    });
} else {
    console.log("This browser does not support Web Workers and/or IndexedDB");
    initSearchWorkerless();
}