var buttonColours = ["red", "green", "blue", "yellow"];
var randomChosenColour;
var gamePattern = [];
var started = false;
var userClickedPattern = [];
var level = 0;
function nextSequece() {

    if (started === true) {
        userClickedPattern = [];
        var randomNumber = Math.floor(Math.random() * 4);
        randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

        $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

        playSound(randomChosenColour);

        level++;
        $("h1").text("Level " + level);
    }
}

function playSound(colour){
    var audio = new Audio("./sounds/" + colour + ".mp3");
    audio.play();
}

$(".btn").click(function(event) {
    var userChosenColour = event.target.id;
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length - 1);
})

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100); // Delay in milliseconds

}

$(document).keydown(function () {
    if (started ===  false) {
        started = true;
        $("h1").text("Level " + level);
    }
        nextSequece();



})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200); // Delay in milliseconds
        $("h1").text("Game Over, Press Any Key to Restart");
        started = false;
    }

    if (userClickedPattern.length == gamePattern.length) {
        setTimeout(function () {
            nextSequece();
        }, 1000);
    }
}