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
    function displayResults(searchData){
        markers = [];
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
        // clear the container to display results
        $("#events-container").html(`
        `);
        // iterate through results
        for (result in searchResult){
            // set alignment of text and image depends on odd or even number of entry
            if (result % 2 !== 0 ){
                textAlign="left";
                imageAlign="right";
            }else{
                textAlign="right";
                imageAlign="left";
            };
            // display icon of cross or tick depends on entry
            if (searchResult[result].alergy == "true"){
                alergyPic = `<i class="bi bi-patch-check"></i>`;
            }
            else{
                alergyPic = `<i class="bi bi-x-square"></i>`;  
            }
            if (searchResult[result].accesibility == "true"){
                accesibilityPic = `<i class="bi bi-patch-check"></i>`;
            }
            else{
                accesibilityPic = `<i class="bi bi-x-square"></i>`;  
            };
            // switch color of icons
            switch (searchResult[result].category.toLowerCase()){
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
                lat: searchResult[result].location[0],
                lng: searchResult[result].location[1],
                title: searchResult[result].title,
                icon: runningIcon
            };
            // add current marker into array of markers
            markers.push(runningMarker);
            // append entry of event to #events-container as card
            console.log(cardColor)
            $("#events-container").append(`
                    <div class="card  ${cardColor}">
                        <div class="card-body text-${textAlign}">
                        <img src="${searchResult[result].image}" class="float-${imageAlign}" alt="${searchResult[result].imagedesc}" style="height: 50%; width: 50%;">
                            <h5 class="card-title">${searchResult[result].title}</h5> 
                            <p class="card-text">
                                <strong>Category : </strong> ${searchResult[result].category}
                                <br>
                                <strong>Event date : </strong> ${searchResult[result].date}
                                <br>
                                <strong>Event time : </strong> ${searchResult[result].time}
                                <br>
                                <strong>Event description : </strong> ${searchResult[result].description}
                                <br>
                                <strong>Age group : </strong> ${searchResult[result].age}
                                <br>
                                <strong>Location : </strong> ${searchResult[result].location[2]}
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
        initMap();
    }

    
    /**
     * Function is called initially to display all data in JSON file of events
     */
    function displayEventData(eventData){
        markers = [];
        // set counter of results
        let eventCounter = 1;
        // iterate through results
        for (let event in eventData.events) {
            if (eventData.events.hasOwnProperty(event)) {
                let eventDetails = eventData.events[event];
                // set alignment of text and image depends on odd or even number of entry 
                if (eventCounter % 2 !== 0 ){
                    textAlign="left";
                    imageAlign="right";
                }else{
                    textAlign="right";
                    imageAlign="left";
                };
                // display icon of cross or tick depends on entry
                if (eventDetails.alergy == "true"){
                    alergyPic = `<i class="bi bi-patch-check"></i>`;
                }
                else{
                    alergyPic = `<i class="bi bi-x-square"></i>`;  
                }
                if (eventDetails.accesibility == "true"){
                    accesibilityPic = `<i class="bi bi-patch-check"></i>`;
                }
                else{
                    accesibilityPic = `<i class="bi bi-x-square"></i>`;  
                }
                // switch color of icons
                switch (eventDetails.category.toLowerCase()){
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
                    lat: eventDetails.location[0],
                    lng: eventDetails.location[1],
                    title: eventDetails.title,
                    icon: runningIcon
                };
                // add current marker into array of markers
                markers.push(runningMarker);
                // append entry of event to #events-container as card
                $("#events-container").append(`
                    <div class="card ${cardColor}">
                        <div class="card-body text-${textAlign}">
                        <img src="${eventDetails.image}" class="float-${imageAlign}" alt="${eventDetails.imagedesc}" style="height: 50%; width: 50%;">
                            <h5 class="card-title">${eventDetails.title}</h5> 
                            <p class="card-text">
                                <strong>Category : </strong> ${eventDetails.category}
                                <br>
                                <strong>Event date : </strong> ${eventDetails.date}
                                <br>
                                <strong>Event time : </strong> ${eventDetails.time}
                                <br>
                                <strong>Event description : </strong> ${eventDetails.description}
                                <br>
                                <strong>Age group : </strong> ${eventDetails.age}
                                <br>
                                <strong>Location : </strong> ${eventDetails.location[2]}
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
        // increase eventCounter
        eventCounter++;
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
            displayResults(jsonData);
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
            displayEventData(jsonData);
        })
    .catch(function(error) {
        console.log('Error:', error);
    });
    // call function search after Search button clicked
    $("#search-submit").click(search);
});
