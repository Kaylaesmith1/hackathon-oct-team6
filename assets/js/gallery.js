// starts when document ready
$(document).ready(function() {
    //click function for all gallery pictures
    $(".for-zoom").click(function(){
        //determine picture number from array of all pictures
        let picNumber = $(".for-zoom").index(this);
        // open zoom page and send over the number of picture to open first
        window.open("zoom.html?picNumber=" + encodeURIComponent(picNumber),"_self");
        });
    });