//TODO: android chrome cache invalidation

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
const searchVersion = document.getElementById('search-version');

function debouncedSearch(searchTerm) {
    searchInput.style.backgroundColor = "rgb(227, 255, 255)";
    searchStatus.style.color = "black";

    if (searchResults) searchResults.innerHTML = '';
    says(searchStatus, 'Searching...');

    if (searchTerm == "") {
        says(searchStatus, '');
        return;
    }

    try {
        const search = titles ? index.search(`item:` + searchTerm) : index.search(searchTerm);
        displaySearch(search, searchTerm);
    } catch (error) {
        says(searchStatus, "search error: " + error.message);
        searchStatus.style.color = "red";
        searchInput.style.backgroundColor = "rgba(255, 227, 227, 0.5)";
    }
}

function getLink(item) {
    if (item.ref.endsWith("ipynb")) {
        return `https://nbviewer.org/urls/evenzero.in/singularity/${item.ref}`;
    }

    if (item.ref.endsWith("md")) {
        return urlprefix == "" ?
            `/${item.ref.replace('.md', '.html')}` : `/singularity/${item.ref.replace('.md', '.html')}`;
    }

    return urlprefix == "" ? `/${item.ref}` : `/singularity/${item.ref}`;
}

function displaySearch(search, searchTerm) {
    const sortedSearch = search.sort((a, b) => {
        const hasIndexMD_a = a.ref.toLowerCase().endsWith("/index.md");
        const hasIndexMD_b = b.ref.toLowerCase().endsWith("/index.md");

        if (!hasIndexMD_a && hasIndexMD_b) return -1;
        if (hasIndexMD_a && !hasIndexMD_b) return 1;

        return a.ref.localeCompare(b.ref);
    });

    says(searchStatus, `Found ${search.length} results for ${searchTerm}`);
    sortedSearch.forEach((item, idx) => {
        const searchResultDiv = document.createElement('div');
        searchResultDiv.id = `${archives ? 'search-result-arch' : 'search-result'}`;

        const searchResultDivItems = document.createElement('div');
        searchResultDivItems.id = "search-result-div-items";

        const titleidx = idx < 9 ? "0" + (idx + 1) : (idx + 1);

        const searchTitleIndex = document.createElement('div');
        searchTitleIndex.id = 'index';

        const searchTitleIndexText = document.createElement('div');
        searchTitleIndexText.id = "text";
        says(searchTitleIndexText, titleidx);
        searchTitleIndex.appendChild(searchTitleIndexText);
        searchResultDiv.appendChild(searchTitleIndex);

        const searchResultTitleTop = document.createElement('div');
        searchResultTitleTop.id = 'search-result-title-top';

        const title = item.ref.match(/\/([^/]*)$/)[0].replace('/', '').replace('.md', '');

        const searchTitleLink = document.createElement('a');

        const link = getLink(item, title);

        searchTitleLink.id = "search-result-title";
        searchTitleLink.href = link;
        searchTitleLink.textContent = title.length > 40 ?
            title.substring(0, 40 - '...'.length) + '...' :
            title;

        const searchTitleLinks = document.createElement('div');
        searchTitleLinks.id = 'search-title-links';

        const searchTitleLinkNewTab = document.createElement('a');
        searchTitleLinkNewTab.id = "search-result-title-newtab";
        searchTitleLinkNewTab.href = link;
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
            says(searchStatus, '');
            break;
        case 'search-titles':
            titles = target.checked;
            searchInput.value = '';
            searchResults.innerHTML = '';
            says(searchStatus, '');
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

async function loadSearchIndices(corrupt = false, offline = false) {
    await new Promise(async (resolve, reject) => {
        if (typeof lunr == 'undefined') reject("Lunr not found!");
        try {
            corrupt ?
                says(searchStatus, 'Search database damaged, healing...') :
                says(searchStatus, 'Loading...');

            await getIddb("src", indices, version);

            indices.src.length && (srcIndexData = indices.src[0].value);

            // load main index
            indices.src && loadSearchIndex(srcIndexData);

            setupEventListeners();
            says(searchStatus, '');

            await getIddb("arc", indices, version);
            indices.arc.length && (archIndexData = indices.arc[0].value);

            resolve(0);
        } catch (error) {
            console.log("~ loadSearchIndices ~ error:", error);
            reject(error);
        }

    });
}

async function initSearchWorkerless() {
    if (typeof lunr == 'undefined') {
        return;
    } else {
        try {
            says(searchStatus, 'Loading...');
            srcIndexData = await fetchRemoteJson(SRC + `?v=${Date.now()}`);
            archIndexData = await fetchRemoteJson(ARCHIVES + `?v=${Date.now()}`);
            says(searchStatus, '');

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
        const resp = await fetch(loc, { cache: "no-store" });
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
                const query = store.getAll(key);

                query.onsuccess = async (e) => {
                    if (e.target.result.length < 1) {
                        // fault-tolerance: we're here because somehow 
                        // the local db wasn't there, the sync script has 
                        // recreated it, but page needs to register
                        await loadSearchIndices(true);
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

function says(el, txt) {
    el.innerText = txt;
}

if (support) {
    document.addEventListener('thread_sync', async (event) => {
        switch (thread_sync.count) {
            case 1:
                says(searchVersion, `search db version: 0.0.${thread_sync.data.version}`);
                break;
            case 4:
                await loadSearchIndices();
                break;
            case -1:
                await loadSearchIndices(false, true);
                break;
            default: break;
        }
    });
} else {
    console.log("This browser does not support Web Workers and/or IndexedDB");
    initSearchWorkerless();
}