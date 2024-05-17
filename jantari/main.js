fetch('ahmedabad/ahmedabad_data/amd_february.json')
    .then(response => response.json())
    .then(data => {
        // Process JSON data here
        console.log(data);
    })
    .catch(error => console.error('Error fetching JSON file:', error));
