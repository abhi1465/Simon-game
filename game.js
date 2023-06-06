var userClickedPattern=[];
var gamePattern=[];

var buttonColours=["red", "blue", "green", "yellow"];

var started=false;
var level=0;

//starting by pressing
$(document).keypress(function(){
    if (!started){
        started=true;
        $("#level-title").text("Level "+level);
        nextSequence();
    }
})


function nextSequence(){
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+level);
    

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);

}

// Button clicked
$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    var last_index=userClickedPattern.length-1;
    checkAnswer(last_index);

})

function checkAnswer(currentLevel){
    //
    if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("wrong");
    }
}

//sound
function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

//Resetting the game
function startOver(){
    started=false;
    level=0;    
    gamePattern=[];
}










