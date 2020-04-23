var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColour
var randomNumber
var userClickedPattern = [];
var level = 0;

$(document).keypress(function() {
  if (gamePattern.length === 0) {
    $("h1").text("Level " + level);
    nextSequence();

  }

});

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour)
  playSound(userChosenColour);

  var gameOver = checkAns();
  if (!gameOver && userClickedPattern.length === level) {
    userClickedPattern = [];
    setTimeout(nextSequence, 1000);
  }

});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).fadeOut(100).fadeIn(100);
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAns() {
  var gameOver = false;
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      $("h1").text("Game Over, Press Any Key to Restart");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
      gameOver= true;
    }
  }
  return gameOver;
}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
