console.log('loading search indices...');

const baseUrl = 'https://raw.githubusercontent.com/surajsharma/singularity/master/assets/search/';

const SRC = baseUrl + 'src-search.json';
const ARCHIVES = baseUrl + 'archives-search.json';

let index = null;
let srcIndexData = null;
let archIndexData = null;

// search modifiers
let archives = false;
let fuzzy = false;
let titles = false;
let exact = false;

const searchInput = document.getElementById('search-input');
const searchArchives = document.getElementById('search-archives');
const searchTitles = document.getElementById('search-titles');
const searchFuzzy = document.getElementById('search-fuzzy');
const searchExact = document.getElementById('search-exact');
const searchStatus = document.getElementById('search-status');
const searchResults = document.getElementById('search-results-container');

function debouncedSearch(searchTerm) {
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
        console.log("🚀 ~ debouncedSearch ~ error:", error.message)
        searchStatus.innerText = '❌' + error.message;
    }
}

function displaySearch(search, searchTerm) {
    searchStatus.innerText = `Found ${search.length} results for ${searchTerm}`;

    search.forEach(item => {
        const searchResultDiv = document.createElement('div');
        searchResultDiv.id = `${archives ? 'search-result-arch' : 'search-result'}`;

        const searchResultTitleTop = document.createElement('div');
        searchResultTitleTop.id = 'search-result-title-top';

        const searchTitleLink = document.createElement('a');
        searchTitleLink.id = "search-result-title";
        searchTitleLink.href = `/singularity/${item.ref.replace('.md', '.html')}`;

        const title = item.ref.match(/\/([^/]*)$/)[0]
            .replace('/', '')
            .replace('.md', '');

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

        const searchResultLoc = document.createElement('pre');
        searchResultLoc.id = "search-result-loc";
        searchResultLoc.textContent = item.ref;

        searchResultTitleTop.appendChild(searchTitleLink);
        searchResultTitleTop.appendChild(searchResultScore);


        searchResultDiv.appendChild(searchResultTitleTop);
        searchResultDiv.appendChild(searchResultLoc);

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
            }
            break;
        case 'search-fuzzy':
            fuzzy = target.checked;
            break;
        case 'search-exact':
            exact = target.checked;
            searchInput.value = '';
            searchResults.innerHTML = '';
            break
        case 'search-titles':
            titles = target.checked;
            break;
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
        searchFuzzy.addEventListener('change', handleToggle);
        searchExact.addEventListener('change', handleToggle);

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