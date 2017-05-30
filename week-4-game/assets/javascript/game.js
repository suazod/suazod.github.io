//global variables
var currentScore = 0;
var mainScore = 0;
var wins = 0;
var losses = 0;


//create crystal object with sub objects
var crystal = {
	blue:
  {
		name: "Blue",
		value:0
  },
	green:
	{
		name: "Green",
		value:0
	},
	red:
	{
		name: "Red",
		value:0
	},
	yellow:
	{
		name: "Yellow",
		value:0
	}
};

//generic to get random number
var getRandomNumber = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//adding values of the crystals to update the score
var currentScoreValue = function(crystal) {
	currentScore = currentScore + crystal.value;
	//console.log("score: " + currentScore);
	$("#currentNumber").html(currentScore);
	winLoss();

}

//let me know if i win or lose and reset the game
var winLoss = function() {
	if (currentScore > mainScore) {
		alert("Sorry. You lost!");
		losses++
		$("#loss").html(losses);
		startGame(); //good way to reset the game

	}
	else if (currentScore == mainScore) {
		alert("Congrats! You won")
		wins++
		$("#win").html(wins);
		startGame(); //good way to reset the game

	}
}


var startGame = function() {

 currentScore = 0;//resetting

 //setting the main score to be random
	mainScore = getRandomNumber(19, 120);

	//set different values for all the crystals
	crystal.blue.value = getRandomNumber(1, 12);
	crystal.green.value = getRandomNumber(1, 12);
	crystal.red.value = getRandomNumber(1, 12);
	crystal.yellow.value = getRandomNumber(1, 12);

	console.log("blue: " + crystal.blue.value + "green: " + crystal.green.value + "red: " +  crystal.red.value + "yellow: " + crystal.yellow.value);

$('#currentNumber').html(currentScore);
$('#mainNumber').html(mainScore);

}



$("#blue").click(function() {
currentScoreValue(crystal.blue);
});

$("#red").click(function() {
currentScoreValue(crystal.red);
});

$("#green").click(function() {
currentScoreValue(crystal.green);
});

$("#yellow").click(function() {
currentScoreValue(crystal.yellow);
});

//starting the game
startGame();
