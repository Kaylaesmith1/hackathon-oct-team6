$(document).ready(function() {
    function displayResults(searchData){
        console.log('searching');
        let searchQuery = $("#search-query").val();
        let searchResult = [];
        for (let event in searchData.events) {
            if (searchData.events[event].title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            searchData.events[event].description.toLowerCase().includes(searchQuery.toLowerCase())){
                searchResult.push(searchData.events[event]);
            }
        };
        $("#events-container").html(`
        `);
        for (result in searchResult){
            if (result % 2 !== 0 ){
                textAlign="left";
                imageAlign="right";
            }else{
                textAlign="right";
                imageAlign="left";
            };
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

    function displayEventData(eventData){
        let eventCounter = 1;
        for (let event in eventData.events) {
            if (eventData.events.hasOwnProperty(event)) {
                let eventDetails = eventData.events[event];
                if (eventCounter % 2 !== 0 ){
                    textAlign="left";
                    imageAlign="right";
                }else{
                    textAlign="right";
                    imageAlign="left";
                };
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
        eventCounter++;
        }
    }
    
    function search(){
        event.preventDefault();
        //if ($("#search-query").val() == ""){
        //    location.reload();
        //}
        fetch('assets/events-db/events-db.json')
        .then((response) => response.json())
        .then((jsonData) => {
            displayResults(jsonData);
        })
    .catch(function(error) {
        console.log('Error:', error);
    });
    }

    fetch('assets/events-db/events-db.json')
        .then((response) => response.json())
        .then((jsonData) => {
            displayEventData(jsonData);
        })
    .catch(function(error) {
        console.log('Error:', error);
    });
    $("#search-submit").click(search);
});
