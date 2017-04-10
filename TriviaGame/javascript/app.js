
// The object questions for my trivia game
var randomQuestion = {
  questionOne: ["What is Buzz Lightyear's famous catchphrase from the 1995 film Toy Story?", ["To infinity, and beyond!", "Great Caesar's ghost!", "Let's get'er done!", "Time for some planetary action!"], "To infinity, and beyond!"],
  questionTwo: ["What exactly is Monsters, Inc. in the 2001 Pixar film Monsters, Inc.?", ["Factory that makes monster-sized shoes", "Chain of Hair Salons", "Factory that processes screams", "Restaurant that caters to monsters"], "Factory that processes screams"],
  questionThree: ["Who voiced Sally the Porsche in the Pixar films Cars and Cars 2?", ["Penny Marshall", "Bonnie Hunt", "Tina Fey", "Julia Louis-Dreyfus"], "Bonnie Hunt"],
  questionFour: ["In the 2012 Pixar film Brave, eating magic cake turns Merida's mom into what?", ["A mule deer", "A bear", "A goat", "A spider"], "A bear"],

};


var countdown = 120; // Countdown for each question
var counter = 0; // Counts and tracks each CORRECT question
var questionIndex = 0; // Counts each question
var questionsArray = [randomQuestion.questionOne, randomQuestion.questionTwo, randomQuestion.questionThree, randomQuestion.questionFour];

function run() {
  intervalId = setInterval(decrement, 1000);
}

function decrement() {
  //  Decrease number by one.
  countdown--;
  //  Show the number in the #count tag.
  $("#count").html("<h2> Oh no, hurry! Time remaining " + "<span>" + countdown + "</span>" + " </h2>");
  //  Once number hits zero...
  if (countdown <= 0) {
    //  ...run the stop function.
    stop();
    //  Alert the user that time is up.
    alert("Time is Up!");
  }
}
//  The stop function
function stop() {
  // Clears our intervalId
  //  We just pass the name of the interval
  //  to the clearInterval function.
  clearInterval(intervalId);
}

function showQuiz() {
  $("#quiz").removeClass("no-show");
}



//render each question
function renderQuestion() {

  // If there are still more questions, render the next one.
  if (questionIndex <= (questionsArray.length - 1)) {
    document.querySelector("#question").innerHTML = questionsArray[questionIndex][0];// fill in the question
    document.querySelector("#choice0").innerHTML = questionsArray[questionIndex][1][0];// fill in the answer
    document.querySelector("#choice1").innerHTML = questionsArray[questionIndex][1][1];// fill in the answer
    document.querySelector("#choice2").innerHTML = questionsArray[questionIndex][1][2];// fill in the answer
    document.querySelector("#choice3").innerHTML = questionsArray[questionIndex][1][3];// fill in the answer

  }
  // If there aren't, render the end game screen.
  else {
    document.querySelector("#gameover").innerHTML = "<h1>Game Over!</h1>";
    document.querySelector("#progress").innerHTML = "You Score: " + counter + " out of " + questionsArray.length;
    $(".buttons").hide();
    $("#quiz").hide();
    stop();
    resetGame();

  }
}



$('button').click(function () {
  //setup
  if (questionIndex === questionsArray.length) {

    return;

  }

  if (this.innerText == questionsArray[questionIndex][2]) {

       console.log("Correct answer")
       counter++;//increment correct question
       questionIndex++;//move on to the next question by incrementing the index
       renderQuestion();//generate question and answer choices


  } else {
      console.log("Wrong answer! move on to the next question");
      questionIndex++;
      renderQuestion();

}

});

//$("#startGame").on("click", run);
//renderQuestion();

$(function() {
$('a.startGame').click(function() {
    run();
    showQuiz();
    renderQuestion();
    $(".startGame").hide();
    $(".pixar").hide();
});
});
