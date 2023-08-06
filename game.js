// Variables
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

$(document).keydown(function(event){
    if (event.key=== "a"){
        if (level === 0) {
            nextSequence();
        }
    };
});

$(".btn").click(function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        };
    }else{
        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press 'A' to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
          startOver();
    }
};

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(150).fadeIn(150);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("level "+level);
};

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
};
