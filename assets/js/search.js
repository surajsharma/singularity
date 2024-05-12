console.log('loading search indices...');

const baseUrl = 'https://raw.githubusercontent.com/surajsharma/singularity/master/';

const SRC = baseUrl + 'src-search.json';
const ARCHIVES = baseUrl + 'archives-search.json';

let fileindex = null;
let archindex = null;

const searchInput = document.getElementById('search-input');
const searchStatus = document.getElementById('search-status');
const searchResults = document.getElementById('search-results-container');

function debouncedSearch(searchTerm) {
    if (searchTerm == "") {
        searchStatus.innerText = ``;
        searchResults.innerHTML = '';
        return;
    }

    const fsearch = fileindex.search(searchTerm);

    console.log('Debounced search:', searchTerm, fsearch);

    searchStatus.innerText = `Found ${fsearch.length} results for ${searchTerm}`;

    fsearch.forEach(item => {
        const searchResultDiv = document.createElement('div');
        searchResultDiv.textContent = item.ref; // Assuming 'content' property holds the data
        searchResults.appendChild(searchResultDiv);
    });
}

async function getSearchIndex(loc) {
    try {
        const response = await fetch(loc);
        const data = await response.json();
        fileindex = lunr.Index.load(data);
        console.log('search index ready!');
        // TODO: update local (assuming you have logic here to update local storage or a local variable)
    } catch (error) {
        console.error('Error fetching search index:', error);
    }
}

async function initSearch() {
    if (typeof lunr == 'undefined') {
        return;
    } else {
        // TODO: check local storage
        await getSearchIndex(SRC);
        await getSearchIndex(ARCHIVES);
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
