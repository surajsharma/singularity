console.log('loading search index...');


// TODO: check local storage

// TODO: get latest index
fetch('https://raw.githubusercontent.com/surajsharma/singularity/master/search.json')
    .then(response => {
        return JSON.parse(response.text())
    })
    .then(data => {
        // var idx = lunr.Index.load(data);
        //const res = idx.search("hell");
        //console.log(res);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// TODO: update local