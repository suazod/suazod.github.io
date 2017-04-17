// Initial array of movies
var topics = ["Shark", "Octopus", "Whale", "Sea Lion", "Giant Squid", "Jellyfish", "King Crab"];

function displayAnimals() {

  var animal = $(this).attr("data-animal");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .done(function(response) {

    // storing the data from the AJAX request in the results variable
    var results = response.data;

    $("#gifs-appear-here").empty();
    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

      // Creating and storing a div tag
      var animalDiv = $("<div>");

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);

      // Creating and storing an image tag
      var animalImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-state", "still");
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
      animalImage.addClass("gif-action");
      animalDiv.addClass("large-3 columns");



      // Appending the paragraph and image tag to the animalDiv
      animalDiv.append(animalImage);
      animalDiv.append(p);


      // Prepending the animalDiv to the HTML page in the "#gifs-appear-here" div
      $("#gifs-appear-here").prepend(animalDiv);


      $(".gif-action").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

    }
    renderButtons();
  });
}


// Function for displaying animals data
function renderButtons() {

  // Deleting the buttons prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each animal in the array
    var a = $("<button>");
    // Adding a class of gif to our button
    a.addClass("gif");
    // Adding a data-attribute
    a.attr("data-animal", topics[i]);

    a.addClass("small-12 columns button warning");

    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);

  }
}



// This function handles events where one button is clicked
$("#add-animals").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding the aninal from the textbox to our array
  topics.push(animal);
  console.log(topics)

  // Calling renderButtons which handles the processing of topics array
  renderButtons();
});

// Function for displaying the animal info
// Using $(document).on instead of $(".gif").on to add event listeners to dynamically generated elements
$(document).on("click", ".gif", displayAnimals);

// Calling the renderButtons function to display the intial buttons
renderButtons();
