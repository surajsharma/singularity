
let dbName = "singularity-search";

const SRC = '/assets/search/src-search.json';
const ARCHIVES = '/assets/search/archives-search.json';
const DB = '/assets/search/db.json';

let iddbVersionsPresent = false;

let index = null;
let srcIndexData = null;
let archIndexData = null;

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
        console.log('Debounced search:', searchTerm, search);
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
        searchTitleLink.href = `/singularity/${item.ref.replace('.md', '.html')}`;
        searchTitleLink.textContent = title.length > 40 ?
            title.substring(0, 40 - '...'.length) + '...' :
            title;

        const searchResultScore = document.createElement('div');
        searchResultScore.id = "search-result-score";
        searchResultScore.textContent = `⭐ ${item.score.toFixed(2)}`;

        const searchTitleLinkNewTab = document.createElement('a');
        searchTitleLinkNewTab.id = "search-result-title-newtab";
        searchTitleLinkNewTab.href = `/singularity/${item.ref.replace('.md', '.html')}`
        searchTitleLinkNewTab.textContent = "↗️";
        searchTitleLinkNewTab.target = '_blank';

        const searchTitleLinkRaw = document.createElement('a');
        searchTitleLinkRaw.id = "search-result-title-newtab";
        searchTitleLinkRaw.href = `/singularity/${item.ref}`
        searchTitleLinkRaw.textContent = "📄";
        searchTitleLinkRaw.target = '_blank';

        searchResultScore.appendChild(searchTitleLinkNewTab);
        searchResultScore.appendChild(searchTitleLinkRaw);

        const searchResultLoc = document.createElement('p');
        searchResultLoc.id = "search-result-loc";
        searchResultLoc.textContent = item.ref;

        searchResultTitleTop.appendChild(searchTitleLink);
        searchResultTitleTop.appendChild(searchResultScore);

        searchResultDivItems.appendChild(searchResultTitleTop);
        searchResultDivItems.appendChild(searchResultLoc);

        searchResultDiv.appendChild(searchResultDivItems);

        searchResults.appendChild(searchResultDiv);
    });
}

async function fetchRemoteJson(loc, t = false) {
    searchStatus.innerText = 'Loading...'
    try {
        const resp = await fetch(loc);
        return t ? resp.text() : resp.json();
    } catch (error) {
        console.error('Error fetching search index:', error);
    }
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

async function initSearchWorkerless() {
    if (typeof lunr == 'undefined') {
        return;
    } else {
        srcIndexData = await fetchRemoteJson(SRC);
        archIndexData = await fetchRemoteJson(ARCHIVES);
        searchStatus.innerText = '';

        // load main index
        loadSearchIndex(srcIndexData);
        setupEventListeners();
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
            }, 500); // Adjust delay as needed (in milliseconds)
        });

    }

}

async function initSearchWorker() {
    if (typeof lunr == 'undefined') {
        return;
    } else {
        searchStatus.innerText = 'Loading...';

        while (!srcSIJson && !arcSIJson) {
            await wait(1);
        }

        srcIndexData = srcSIJson;
        archIndexData = arcSIJson;

        // load main index
        loadSearchIndex(srcIndexData);
        setupEventListeners();
        searchStatus.innerText = '';
    }
    return;
}

if (support) {
    initSearchWorker();
} else {
    console.log("This browser does not support Web Workers and/or IndexedDB");
    initSearchWorkerless();
}


async function wait(ms) {
    const delay = ms;
    await new Promise(resolve => setTimeout(resolve, delay));
}
