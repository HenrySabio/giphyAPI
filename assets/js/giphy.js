const key = "3YrCjSs4Ta3gGeIOWGBuwtTxn7DydXVd";
let tag = ""

function newButton() {
    let newButton = $("<button>").text(tag);
    newButton.attr("class", "search-tag");

    //Prepends new search tag to beginning of search tag area
    $("#search-terms").prepend(newButton);
}

$("#search").on("click", function (event) {
    event.preventDefault()

    if ($("#search-query").val().trim() != "") {
        tag = $("#search-query").val().trim();
        console.log(tag);
        $("#search-query").val("");
        newButton();
    }
    else {
        $("#search-query").val("");
        alert("Please enter a proper query!");
    }
})

//Begins function upon clicking a search tag
$("div").on("click", ".search-tag", function () {
    console.log($(this).text());

    const query = $(this).text();
    console.log(query);

    // API query URL + API key & search variables
    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + key + "&limit=10";

    //Ajax get request to query URL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        //After data from ajax get comes back
        .then(function (response) {

            console.log(response);

            for (let i = 0; i < response.data.length; i++) {
                //defines variable to hold image url
            const imageUrl = response.data[i].images.original.url;

            //Create new img element for cat images
            const searchResultImg = $("<img>");

            //Add image url to src link and description to new cat img element
            searchResultImg.attr("src", imageUrl);
            searchResultImg.attr("alt", query + " image");

            //Prepends new gif to beginning of page before all others
            $("#results").prepend(searchResultImg);
            }

        });
});