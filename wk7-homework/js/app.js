var options = ["rock", "paper", "scissors"];
var wins = 0;
var loses = 0;
var ties = 0;
var firstPlayer = [];
var computerGuess = [];

function renderChoice() {
  document.querySelector("#rock").innerHTML = options[0];
  document.querySelector("#paper").innerHTML = options[1];
  document.querySelector("#scissors").innerHTML = options[2];
}

renderChoice();


$('button').click(function (firstPlayer, computerGuess) {
  var firstPlayer = $(this).text();
    console.log("your guess" + firstPlayer);

  var computerGuess = $(this).text();
    console.log("computer guess is " + computerGuess);

    if (firstPlayer == 'rock' || firstPlayer == 'paper' || firstPlayer=='scissors') {

      if ((options.indexOf(firstPlayer) =='rock') && (options.indexOf(computerGuess) =='scissors')) {
        alert('you win');
      }
      if ((firstPlayer=='rock') && (computerGuess=='paper')) {
        alert('you win');
      }
      if ((firstPlayer=='scissors') && (computerGuess=='paper')) {
        alert('you win');
      }
      if ((firstPlayer=='scissors') && (computerGuess=='rock')) {
        alert('you lose');
      }
      if ((firstPlayer=='paper') && (computerGuess=='scissors')) {
        alert('you lose');
      }
      if ((firstPlayer=='paper') && (computerGuess=='rock')) {
        alert('you lose');
      }
      if ((firstPlayer == computerGuess)) {
        alert('you tie');
      }
    } else {
      alert("please choose rock, paper, or scissors");
    }
});
