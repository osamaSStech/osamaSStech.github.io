<<<<<<< HEAD
fetch('ahmedabad/ahmedabad_data/amd_february.json')
    .then(response => response.json())
    .then(data => {
        // Process JSON data here
        console.log(data);
    })
    .catch(error => console.error('Error fetching JSON file:', error));
=======

$(document).ready(function () {
    var date = new Date;
    $("#date").html(date);
})
>>>>>>> db4cde8e89f82c61265cef933844204a68982cc7
