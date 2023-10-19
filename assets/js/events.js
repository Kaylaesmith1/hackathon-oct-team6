let eventCounter = 1;

$(document).ready(function() {
    fetch('assets/events-db/events-db.json')
    .then((response) => response.json())
    .then((jsonData) => {
        displayEventData(jsonData);
    })
    .catch(function(error) {
        console.log('Error:', error);
    });
});

function displayEventData(eventData){
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
