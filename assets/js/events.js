$(document).ready(function() {


     /**
     * Function is called after clicking search button
     */
    function displayResults(searchData){
        // read the search string
        let searchQuery = $("#search-query").val();
        // set variable of results to empty array
        let searchResult = [];
        // filter through title and description of event with search query
        for (let event in searchData.events) {
            if (searchData.events[event].title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            searchData.events[event].description.toLowerCase().includes(searchQuery.toLowerCase())){
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
            // append entry of event to #events-container as card
            $("#events-container").append(`
                    <div class="card">
                        <div class="card-body text-${textAlign}">
                        <img src="${searchResult[result].image}" class="float-${imageAlign}" alt="${searchResult[result].imagedesc}" style="height: 50%; width: 50%;">
                            <h5 class="card-title">${searchResult[result].title}</h5> 
                            <p class="card-text">
                                <strong>Event date : </strong> ${searchResult[result].date}
                                <br>
                                <strong>Event time : </strong> ${searchResult[result].time}
                                <br>
                                <strong>Event description : </strong> ${searchResult[result].description}
                                <br>
                                <strong>Age group : </strong> ${searchResult[result].age}
                                <br>
                                <strong>Location : </strong> ${searchResult[result].location[0]} & ${searchResult[result].location[1]}
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

    }

    
    /**
     * Function is called initially to display all data in JSON file of events
     */
    function displayEventData(eventData){
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
                // append entry of event to #events-container as card
                $("#events-container").append(`
                    <div class="card">
                        <div class="card-body text-${textAlign}">
                        <img src="${eventDetails.image}" class="float-${imageAlign}" alt="${eventDetails.imagedesc}" style="height: 50%; width: 50%;">
                            <h5 class="card-title">${eventDetails.title}</h5> 
                            <p class="card-text">
                                <strong>Event date : </strong> ${eventDetails.date}
                                <br>
                                <strong>Event time : </strong> ${eventDetails.time}
                                <br>
                                <strong>Event description : </strong> ${eventDetails.description}
                                <br>
                                <strong>Age group : </strong> ${eventDetails.age}
                                <br>
                                <strong>Location : </strong> ${eventDetails.location[0]} & ${eventDetails.location[1]}
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
