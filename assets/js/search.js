document.addEventListener("DOMContentLoaded", function () {
    // Fetch the JSON file and store it in a variable
    let jsonData = [];
    fetch('events.json')
        .then(response => response.json())
        .then(data => jsonData = data);
    console.log(jsonData);
    // Add an event listener to the form
    document.getElementById("search-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const query = document.getElementById("search-query").value.toLowerCase();

        // Perform the search
        const results = jsonData.events.filter(event => {
            return event.name.toLowerCase().includes(query) ||
                event.location.toLowerCase().includes(query) ||
                event.description.toLowerCase().includes(query);
        });

        // Do something with the results (display them, etc.)
        console.log(results);

        const resultsDiv = document.getElementById("search-results");
        resultsDiv.innerHTML = ''; // Clear any previous results
        results.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.innerHTML = `Name: ${event.name} <br> Location: ${event.location} <br> About: ${event.description} <br> Time: ${event.time} <br> Age Group: ${event.ageGroup} <br> Images: ${event.pictures} <br> Coordinates - <br> Latitude: ${event.coordinates.latitude} <br> Longitude: ${event.coordinates.longitude}`;

            resultsDiv.appendChild(eventDiv);
        });
    });
});