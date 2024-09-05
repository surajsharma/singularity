let index = null;

// search modifiers
let archives = false;
let titles = false;

const searchInput = gel('search-input');
const searchArchives = gel('search-archives');
const searchTitles = gel('search-titles');
const searchStatus = gel('search-status');
const searchResults = gel('search-results-container');
const searchVersion = gel('search-version');


function debouncedSearch(searchTerm) {
    searchInput.style.backgroundColor = "rgb(250, 250, 250)";
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
    const colab_blob_url = "https://colab.research.google.com/github/surajsharma/singularity/blob/master/";

    if (item.ref.endsWith("ipynb")) {
        return `${colab_blob_url}${item.ref}`;
    }

    if (item.ref.endsWith("md")) {
        return !production ?
            `/${item.ref.replace('.md', '.html')}` : `/singularity/${item.ref.replace('.md', '.html')}`;
    }

    return !production ? `/${item.ref}` : `/singularity/${item.ref}`;
}

function createSearchResultItem(item, idx) {
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

    let title = item.ref.match(/\/([^/]*)$/)[0].replace('/', '').replace('.md', '');
    const isNotebook = title.endsWith(".ipynb");

    const searchTitleLink = document.createElement('a');

    const link = getLink(item, title);

    searchTitleLink.id = "search-result-title";
    !isNotebook && (searchTitleLink.href = link);

    searchTitleLink.textContent = title.length > 40 ?
        title.substring(0, 40 - '...'.length) + '...' :
        title.replace('.ipynb', '');

    const searchTitleLinks = document.createElement('div');
    searchTitleLinks.id = 'search-title-links';

    let searchTitleLinkNewTab;

    if (isNotebook) {
        searchTitleIndex.style.backgroundColor = "#ffa10a";
        searchTitleLinkNewTab = document.createElement('a');
        const img = document.createElement('img');
        img.src = !production ? "/assets/img/colab-badge.svg" : "/singularity/assets/img/colab-badge.svg";
        img.alt = "Google Colab";

        img.style.marginTop = "2px";
        img.style.scale = "0.85";

        searchTitleLinkNewTab.id = "search-result-title-newtab";
        searchTitleLinkNewTab.href = link;
        searchTitleLinkNewTab.target = '_blank';
        searchTitleLinkNewTab.appendChild(img);
    } else {
        searchTitleLinkNewTab = document.createElement('a');
        searchTitleLinkNewTab.id = "search-result-title-newtab";
        searchTitleLinkNewTab.href = link;
        searchTitleLinkNewTab.textContent = "↗️";
        searchTitleLinkNewTab.target = '_blank';
    }

    const searchTitleLinkRaw = document.createElement('a');
    searchTitleLinkRaw.id = "search-result-title-newtab";
    searchTitleLinkRaw.href = !production ? `/${item.ref}` : `/singularity/${item.ref}`;
    searchTitleLinkRaw.textContent = "⬇️";
    searchTitleLinkRaw.target = '_blank';

    const searchResultLoc = document.createElement('pre');
    searchResultLoc.id = "search-result-loc";
    searchResultLoc.textContent = item.ref;

    searchTitleLinks.appendChild(searchTitleLinkNewTab);
    searchTitleLinks.appendChild(searchTitleLinkRaw);

    searchResultTitleTop.appendChild(searchTitleLink);
    searchResultTitleTop.appendChild(searchTitleLinks);

    searchResultDivItems.appendChild(searchResultTitleTop);
    searchResultDivItems.appendChild(searchResultLoc);

    searchResultDiv.appendChild(searchResultDivItems);

    searchResults.appendChild(searchResultDiv);
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
        createSearchResultItem(item, idx);
    });
}

function loadSearchIndex(data) {
    index = lunr.Index.load(data);
    console.log('search index loaded!');
}

async function handleToggle(event) {
    const target = event.target;
    switch (`${target.id}`) {
        case 'search-archives':
            archives = target.checked;
            searchInput.value = '';
            searchResults.innerHTML = '';
            if (archives) {
                const data = await getIddb("arc", version);
                data.length && data[0].value && loadSearchIndex(data[0].value);
                searchInput.focus();
            }
            if (!archives) {
                const data = await getIddb("src", version);
                data.length && data[0].value && loadSearchIndex(data[0].value);
                searchInput.focus();
            }
            says(searchStatus, '');
            break;
        case 'search-titles':
            titles = target.checked;
            searchInput.value = '';
            searchResults.innerHTML = '';
            says(searchStatus, '');
            searchInput.focus();
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

async function loadSearchIndices(reload = false) {
    console.log("🚀 ~ loadSearchIndices ~ reload:", reload)


    await new Promise(async (resolve, reject) => {
        if (typeof lunr == 'undefined') reject("Lunr not found!");
        try {
            reload ?
                says(searchStatus, 'Reloading search database...') :
                says(searchStatus, 'Loading...');

            const data = await getIddb("src", version);
            data.length && data[0].value && loadSearchIndex(data[0].value);

            setupEventListeners();
            says(searchStatus, '');
            resolve(0);
        } catch (error) {
            console.log("~ loadSearchIndices ~ error:", error);
            reject(error);
        }
    });

    if (reload) {
        window.location.reload(true);
    }
}

async function initSearchWorkerless() {
    if (typeof lunr == 'undefined') {
        return;
    } else {
        try {
            says(searchStatus, 'Loading...');
            srcIndexData = await fetchRemoteJson(SRC);
            archIndexData = await fetchRemoteJson(ARC);
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
        const resp = await fetch(loc + `?v=${Date.now()}`, { cache: "no-store" });
        return t ? resp.text() : resp.json();
    } catch (error) {
        console.error('Error fetching search index:', error);
    }
}

async function getIddb(key, ver) {
    return new Promise((resolve, reject) => {
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
                        resolve(e.target.result);
                    }
                }

                query.onerror = e => {
                    reject(e.target.error);
                }
            }
        } catch (error) {
            reject(error);
        }
    });
}

function says(el, txt) {
    el.innerText = txt;
}

function gel(el) {
    return document.getElementById(el);
}

if (support) {
    document.addEventListener('thread_sync', async (event) => {
        switch (thread_sync.count) {
            case 1:
                if (!thread_sync.data) return;
                const { version } = thread_sync.data;
                says(searchVersion, `search db version: ${parseInt(version) / 100}`);
                break;
            case 4:
                if (!thread_sync.data) return;
                const { reload } = thread_sync.data;
                await loadSearchIndices(reload);
                break;
            case -1:
                await loadSearchIndices(false);
                break;
            default: break;
        }
    });
} else {
    console.log("This browser does not support Web Workers and/or IndexedDB");
    initSearchWorkerless();
}