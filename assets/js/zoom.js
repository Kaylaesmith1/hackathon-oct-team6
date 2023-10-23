// database of pictures
pictures = [
  { url: "assets/images/thumbnail_large-1 (1).jpg", desc: "Lit Pumpkins" },
  {
    url: "assets/images/tl (2).jpg",
    desc: "Children Dressed as a Witch and Devil",
  },
  { url: "assets/images/tl (1).jpg", desc: "Decorated Front Door" },
  { url: "assets/images/tl (4).jpg", desc: "Decorated House" },
  { url: "assets/images/tl (8).jpg", desc: "Children Trick or Treating" },
  { url: "assets/images/tl (9).jpg", desc: "Halloween Drinks" },
  { url: "assets/images/tl (5).jpg", desc: "Garden Decoration" },
  { url: "assets/images/tl (12).jpg", desc: "Children trick or Treating" },
  { url: "assets/images/tl (7).jpg", desc: "Decorated Food" },
  { url: "assets/images/tl (3).jpg", desc: "Decorated Churchyard" },
  {
    url: "assets/images/thumbnail_large-1.jpg",
    desc: "Child Trick or Treating",
  },
  { url: "assets/images/tl (10).jpg", desc: "halloween Garden" },
  { url: "assets/images/tl (11).jpg", desc: "Costumed Children" },
  { url: "assets/images/tl (6).jpg", desc: "Decorated Doorway" },
  { url: "assets/images/tl (13).jpg", desc: "Day of the dead Parade" },
];

$(document).ready(function () {
  /**
   * Function displays picture based on number
   */
  function displayPicture() {
    // inject data from database to html
    $("#desc-container").html(
      `<h2 class="error-text">${pictures[picNumber].desc}</h2>`
    );
    $("#photo-container").html(
      `<img src="${pictures[picNumber].url}" alt="${pictures[picNumber].desc}" class="add-shadow smooth-edges">`
    );
  }

  //read variable passed from gallery.html
  let urlParams = new URLSearchParams(window.location.search);
  let picNumber = urlParams.get("picNumber");
  // if no variable passed picNumber = 0
  picNumber == null ? (picNumber = 0) : (picNumber = picNumber);
  //call displayPicture function
  displayPicture();
  $("#pic-start").click(function () {
    picNumber = 0;
    displayPicture();
  });
  $("#pic-end").click(function () {
    picNumber = 14;
    displayPicture();
  });
  $("#pic-minus").click(function () {
    picNumber == 0 ? (picNumber = 0) : picNumber--;
    displayPicture();
  });
  $("#pic-plus").click(function () {
    picNumber == 14 ? (picNumber = 14) : picNumber++;
    displayPicture();
  });
  $("#zoom-close").click(function () {
    window.open("gallery.html", "_self");
  });
});
