const key = "3YrCjSs4Ta3gGeIOWGBuwtTxn7DydXVd";
let tag = ""

function newButton() {
    let newButton = $("<button>").text(tag);
    newButton.attr("class", "search-tag");

    //Prepends new search tag to beginning of search tag area
    $("#search-terms").prepend(newButton);
}

$("#search").on("click", function (event) {
    void preventDefault();
    event.preventDefault();

    if ($("#search-query").val().trim() != "") {
        tag = $("#search-query").val().trim();
        $("#search-query").val("");
        newButton();
    }
    else {
        $("#search-query").val("");
        alert("Please enter a proper query!");
    }
})

//Begins function upon clicking a search tag
$("#search-terms").on("click", ".search-tag", function () {
    
    let button = $(this)
    const query = $(this).text();

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
                const imageStill = response.data[i].images.original_still.url;
                const imgRating = response.data[i].rating;

                //Create new img element for cat images
                const searchResultImg = $("<img>");
                const searchResultRating = $("<p>");

                //Add image url to src link and description to new cat img element
                searchResultImg.attr("src", imageStill);
                searchResultImg.attr("data-alternate-link", imageUrl)
                searchResultImg.attr("alt", query + " image");
                searchResultImg.attr("class", "gif");

                searchResultRating.text("This image above is rated: " + imgRating);

                //Prepends new gif to beginning of page before all others
                $("#results").prepend(searchResultImg);
                $("#results").prepend(searchResultRating);

            }

            //Removes button if the query returned no results
            if (response.data == '') {
                alert("No results found - please try a different query")
                $(button).remove();
            }
        });
});

$("#results").on("click", ".gif", function () {
    let tempA = $(this).attr("src");
    let tempB = $(this).attr("data-alternate-link");

    $(this).attr("src", tempB);
    $(this).attr("data-alternate-link", tempA);
})