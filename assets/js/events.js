$(document).ready(function() {
    /**
    * Function initializes map and pins
    */
    let map;
    let markers;
    let cardColor = "";
    
    async function initMap() {
       const position = { lat: 52.88, lng: -7.91 };
       const { Map } = await google.maps.importLibrary("maps");
       const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
     
       // Map center
       map = new Map(document.getElementById("map"), {
         zoom: 7,
         center: { lat: 52.88, lng: -7.91 },
         mapId: "DEMO_MAP_ID",
       });
     
       // Iterate through markers
       for (var i = 0; i < markers.length; i++) {
        var marker = new google.maps.Marker({
            position: { lat: markers[i].lat, lng: markers[i].lng },
            map: map,
            title: markers[i].title,
            icon: markers[i].icon
        });
    }
     }

     /**
     * Function is called after clicking search button
     */
    function filterResults(searchData){
        // read the search string
        let searchQuery = $("#search-query").val();
        // set variable of results to empty array
        let searchResult = [];
        // filter through title, location and description of event with search query
        for (let event in searchData.events) {
            if (searchData.events[event].title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            searchData.events[event].description.toLowerCase().includes(searchQuery.toLowerCase())|| 
            searchData.events[event].location[2].toLowerCase().includes(searchQuery.toLowerCase())){
                searchResult.push(searchData.events[event]);
            }
        };
    //send results to display function
    displayEventData(searchResult);
    }

    
    /**
     * Function is called to display data received
     */
    function displayEventData(eventData){
        // reset map markers
        markers = [];
        // empty display container
        $("#events-container").empty();
        // iterate through results
        for(let i=0; i < eventData.length; i++) {
            // set alignment of text and image depends on odd or even number of entry 
            if (i % 2 == 0 || i == 0){
                textAlign="left";
                imageAlign="right";
            }else{
                textAlign="right";
                imageAlign="left";
            };
            // display icon of cross or tick depends on entry
            if (eventData[i].alergy == "true"){
                alergyPic = `<i class="bi bi-patch-check"></i>`;
            }
            else{
                alergyPic = `<i class="bi bi-x-square"></i>`;  
            }
            if (eventData[i].accesibility == "true"){
                accesibilityPic = `<i class="bi bi-patch-check"></i>`;
            }
            else{
                accesibilityPic = `<i class="bi bi-x-square"></i>`;  
            }
            // switch color of icons
            switch (eventData[i].category.toLowerCase()){
                case "fun":
                    runningIcon = "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
                    cardColor = "bg-warning";
                    break;
                case "food":
                    runningIcon ="https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
                    cardColor = "bg-primary";
                    break;
                case "scary":
                    runningIcon ="https://maps.google.com/mapfiles/ms/icons/red-dot.png";
                    cardColor = "bg-danger";
                    break;
                case "adult":
                    runningIcon ="https://maps.google.com/mapfiles/ms/icons/green-dot.png";
                    cardColor = "bg-success";
                    break;
                default:
                    runningIcon = "";
            }
            // create object of running marker
            runningMarker = {
                lat: eventData[i].location[0],
                lng: eventData[i].location[1],
                title: eventData[i].title,
                icon: runningIcon
            };
            // add current marker into array of markers
            markers.push(runningMarker);
            // append entry of event to #events-container as card
            $("#events-container").append(`
                <div class="card ${cardColor} add-shadow">
                    <div class="card-body text-${textAlign}">
                    <img src="${eventData[i].image}" class="float-${imageAlign}" alt="${eventData[i].imagedesc}" style="height: 50%; width: 50%;">
                        <h5 class="card-title">${eventData[i].title}</h5> 
                        <p class="card-text">
                            <strong>Category : </strong> ${eventData[i].category}
                            <br>
                            <strong>Event date : </strong> ${eventData[i].date}
                            <br>
                            <strong>Event time : </strong> ${eventData[i].time}
                            <br>
                            <strong>Event description : </strong> ${eventData[i].description}
                            <br>
                            <strong>Age group : </strong> ${eventData[i].age}
                            <br>
                            <strong>Location : </strong> ${eventData[i].location[2]}
                            <br>
                            <strong>Alergens : </strong> ${alergyPic}                            
                            <br>
                            <strong>Accesibility : </strong> ${accesibilityPic}
                            <br>
                        </p>
                    </div>
                </div>
                <br>
                `);
        }
        // call function of map initialization
        initMap();
        }


    // fetch JSON file for search purposes
    function search(){
        event.preventDefault();
        fetch('assets/events-db/events-db.json')
        .then((response) => response.json())
        .then((jsonData) => {
            // if fetching succesfull call displaResults function
            filterResults(jsonData);
        })
    .catch(function(error) {
        console.log('Error:', error);
    });
    }

    /**
     * Start of program
     */
    // fetch JSON file for initial display of events
    fetch('assets/events-db/events-db.json')
        .then((response) => response.json())
        .then((jsonData) => {
            // if fetching succesfull call displayEventData function
            displayEventData(jsonData.events);
        })
    .catch(function(error) {
        console.log('Error:', error);
    });
    // call function search after Search button clicked
    $("#search-submit").click(search);
});
