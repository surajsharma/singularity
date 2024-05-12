console.log('loading search index...');


// TODO: check local storage

// TODO: get latest index
fetch('https://raw.githubusercontent.com/surajsharma/singularity/master/src-search.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        var idx = lunr.Index.load(data);
        const search = idx.search("content:cult");
        console.log(search);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// TODO: update local