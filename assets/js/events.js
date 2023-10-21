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
            // display icon of cross or tick depends on entry
            if (eventData[i].alergy == "true"){
                alergyPic = `<i class="bi bi-bag-check-fill green-symbol"></i>`;
            }
            else{
                alergyPic = `<i class="bi bi-bag-x-fill red-symbol"></i>`;  
            }
            if (eventData[i].accesibility == "true"){
                accesibilityPic = `<i class="bi bi-bag-check-fill green-symbol"></i>`;
            }
            else{
                accesibilityPic = `<i class="bi bi-bag-x-fill red-symbol"></i>`;  
            }
            // switch color of icons
            switch (eventData[i].category.toLowerCase()){
                case "fun":
                    runningIcon = "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
                    ribbonColor = "#e7da27";
                    break;
                case "food":
                    runningIcon ="https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
                    ribbonColor = "#279ae7";
                    break;
                case "scary":
                    runningIcon ="https://maps.google.com/mapfiles/ms/icons/red-dot.png";
                    ribbonColor = "#d83744";
                    break;
                case "adult":
                    runningIcon ="https://maps.google.com/mapfiles/ms/icons/green-dot.png";
                    ribbonColor = "#37d852";
                    break;
                default:
                    ribbonColor = "#000000";
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
            // append entry of event to #events-container as card align per entry number
            if (i % 2 == 0 || i == 0){
            $("#events-container").append(`
                <div class="card darker-card add-shadow p-3">
                    <div class="card-body}">
                        <div class="row">
                            <div class="col-md-6 pos-relative">
                                <img src="${eventData[i].image}" alt="${eventData[i].imagedesc}" class="event-image">
                            </div>
                            <div class="col-md-6">
                                <h5 class="card-title">${eventData[i].title}</h5>
                                <p class="card-text">
                                    <span class="card-text-heading">Category :</span> ${eventData[i].category}
                                    <i class="bi bi-bookmark-fill" style="color:${ribbonColor};"></i>
                                    <br>
                                    <span class="card-text-heading">Event date :</span> ${eventData[i].date}
                                    <br>
                                    <span class="card-text-heading">Event time :</span> ${eventData[i].time}
                                    <br>
                                    <span class="card-text-heading">Location :</span> ${eventData[i].location[2]}
                                    <br>
                                    <span class="card-text-heading">Age group :</span> ${eventData[i].age}
                                    <br>
                                    <span class="card-text-heading">Alergens :</span> ${alergyPic}                            
                                    <span class="card-text-heading">Accesibility :</span> ${accesibilityPic}
                                    <br>
                                    <span class="card-text-heading">Event description :</span>
                                    <br>
                                    ${eventData[i].description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                `);
            }else{
                $("#events-container").append(`
                <div class="card lighter-card add-shadow p-3">
                    <div class="card-body}">
                        <div class="row">
                            <div class="col-md-6">
                                <h5 class="card-title">${eventData[i].title}</h5>
                                <p class="card-text">
                                    <span class="card-text-heading">Category :</span> ${eventData[i].category}
                                    <i class="bi bi-bookmark-fill" style="color:${ribbonColor};"></i>
                                    <br>
                                    <span class="card-text-heading">Event date :</span> ${eventData[i].date}
                                    <br>
                                    <span class="card-text-heading">Event time :</span> ${eventData[i].time}
                                    <br>
                                    <span class="card-text-heading">Location :</span> ${eventData[i].location[2]}
                                    <br>
                                    <span class="card-text-heading">Age group :</span> ${eventData[i].age}
                                    <br>
                                    <span class="card-text-heading">Alergens :</span> ${alergyPic}                            
                                    <span class="card-text-heading">Accesibility :</span> ${accesibilityPic}
                                    <br>
                                    <span class="card-text-heading">Event description :</span>
                                    <br>
                                    ${eventData[i].description}
                                </p>
                            </div>
                            <div class="col-md-6 pos-relative">
                                <img src="${eventData[i].image}" alt="${eventData[i].imagedesc}" class="event-image">
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                `);
            }
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
    
    let container = document.querySelector('#map-outer-container');
    let vhHeight = window.innerHeight;
    let initialOffset = vhHeight * 0.5;
    window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    if (scrollY >= initialOffset) {
        container.classList.add('fixed-map');
        console.log('class added');
    } else {
        container.classList.remove('fixed-map');
        console.log('class removed');
    }
});
});
