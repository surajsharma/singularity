const baseUrl = 'https://raw.githubusercontent.com/surajsharma/singularity/master/assets/search/';

const SRC = baseUrl + 'src-search.json';
const ARCHIVES = baseUrl + 'archives-search.json';

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

        const titleidx = idx < 10 ? "0" + idx : idx;
        const searchTitleIndex = document.createElement('div');
        searchTitleIndex.id = 'index';
        searchTitleIndex.innerText = titleidx;
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
        searchResultScore.textContent = `⭐ ${item.score}`;

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

async function getSearchIndexRemote(loc) {
    searchStatus.innerText = 'Loading...'
    try {
        const response = await fetch(loc);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching search index:', error);
    }
}

function loadSearchIndex(data) {
    index = lunr.Index.load(data);
    console.log('search index loaded!');
    searchStatus.innerText = '';
}

function handleToggle(event) {
    const target = event.target;
    console.log(`${target.id} was toggled (checked: ${target.checked})`);

    switch (`${target.id}`) {
        case 'search-archives':
            archives = target.checked;
            searchInput.value = '';
            searchResults.innerHTML = '';
            if (archives) {
                loadSearchIndex(archIndexData);
            }
            if (!archives) {
                loadSearchIndex(srcIndexData);
            } break;
        case 'search-titles':
            titles = target.checked;
            searchInput.value = '';
            searchResults.innerHTML = ''; break;
        default:
            break;
    }
}

async function initSearch() {
    if (typeof lunr == 'undefined') {
        return;
    } else {
        // TODO: check local storage, otherwise fetch remote and update local

        srcIndexData = await getSearchIndexRemote(SRC);
        archIndexData = await getSearchIndexRemote(ARCHIVES);

        // load main index
        loadSearchIndex(srcIndexData);

        //event-listeners
        searchArchives.addEventListener('change', handleToggle);
        searchTitles.addEventListener('change', handleToggle);

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
}

initSearch();