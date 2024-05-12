console.log('loading search indices...');

const baseUrl = 'https://github.com/surajsharma/singularity/tree/master/assets/search/';

const SRC = baseUrl + 'src-search.json';
const ARCHIVES = baseUrl + 'archives-search.json';

let index = null;

const searchInput = document.getElementById('search-input');
const searchStatus = document.getElementById('search-status');
const searchResults = document.getElementById('search-results-container');

function debouncedSearch(searchTerm) {
    if (searchResults) searchResults.innerHTML = '';
    searchStatus.innerText = 'Searching...'

    if (searchTerm == "") {
        searchStatus.innerText = ``;
        return;
    }

    const search = index.search(searchTerm);
    console.log('Debounced search:', searchTerm, search);

    searchStatus.innerText = `Found ${search.length} results for ${searchTerm}`;

    search.forEach(item => {
        const searchResultDiv = document.createElement('div');
        searchResultDiv.textContent = item.ref;
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

async function initSearch() {
    if (typeof lunr == 'undefined') {
        return;
    } else {
        // TODO: check local storage, otherwise fetch remote and update local

        let srcIndexData = await getSearchIndexRemote(SRC);
        let archIndexData = await getSearchIndexRemote(ARCHIVES);

        // load main index
        loadSearchIndex(srcIndexData);

        // Debounce implementation with timeout
        let timeout;
        if (searchInput) {
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