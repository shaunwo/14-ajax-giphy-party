// defining the two areas using jQuery syntax
const $gifs = $("#gifs");
const $searchFor = $("#search");
const $searchForm = $("#giphy-form");

// adding new giphy to the table
function addGif(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "w-100"
    });
    $newCol.append($newGif);
    $gifs.append($newCol);
  } else {
      alert("Sorry - no giphys for that search");
  }
}

// handle the form submisssion and trying to add the new gif
$searchForm.on("submit", async function(evt) {
  evt.preventDefault();
  
  let searchTerm = $searchFor.val();
  $searchFor.val("");

  const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
    }
  });

  addGif(response.data);
});

// clear the gifs area
$("#clear").on("click", function() {
  $gifs.empty();
});