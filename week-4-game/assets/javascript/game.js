$(document).ready(function() {

	crystals = ['assets/images/red.png','assets/images/blue.png','assets/images/yellow.png','assets/images/green.png'];

	var counter = 0;
	var wins = 0;
	var losses = 0;

function createCrystal {
  var crystalsNumber = []
  var randomNumber = Math.floor(Math.random()*12) {
  for (var i=0; i < crystalsNumber.length; i++){
  if (crystalsNumber[i] == randomNumber){
  }
  }

}
for (i = 0; i < crystalsNumber.length; i++) {
  var imgCrystal = $('<img>');
  imageCrystal.attr('data-num', crystalsNumber[i]);
  imageCrystal.attr('src', crystals[i]);
  imageCrystal.attr('alt', 'crystals');
  imageCrystal.addClass('crystalImage');
  $('#crystals').append(imgCrystal);
}
});
