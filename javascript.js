var playing = false;
var score;
var timer;
var timeremaining;
var correctAnswer;
var wrongAnswer;

//if we click on the start/reset
document.getElementById("startreset").onclick = function() {
    
    //if we are playing
    if(playing==true){
        location.reload(); //reload page //returns to initial state //means that all the contents will become empty
    }else{ //if we are not playing // means the content is ALREADY IN the initial state
        
        //change mode to playing
        playing = true;
        
        //hide game over box
        hide("gameover");
        
        //set score to 1
        score=0;
document.getElementById("scorevalue").innerHTML = score;
        
        //show countdown box
        show("timeremaining");
        
        //set timeremaining to 60
        timeremaining = 60;
        
        generateQuestion();

        //reduce time by 1 sec in loops
        startCountdown();
            //time left?
                //yes?=> continue
                //no?=? gameover
        
        //change button to reset
document.getElementById("startreset").innerHTML = "Reset Game";
        //generate new Q&A
        
    }

    
}

/*in this function, for every 1s/1000ms, the time remaining will decrease by 1*/
function startCountdown(){
    
    action = setInterval(function(){
        timeremaining -= 1;
        
 document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
    if(timeremaining==0){
        
        stopCountdown();
        
        show("gameover");
        
        document.getElementById("gameover").innerHTML = "<p>Game Over! Your score is " + score + ".</p>";
        
        hide("timeremaining");
        hide("correct");
        hide("wrong");
        playing = false;
    }
        
        
    }, 1000);
    
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}

//hide element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

//show element
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generate questions and multiple answers
function generateQuestion(){
    var x = Math.floor(Math.random() * 10) + 1;
    var y = Math.floor(Math.random() * 10) + 1;
    
    correctAnswer = x*y;
    
document.getElementById("question").innerHTML = x + " x " + y;
    
    var correctPosition = Math.floor(Math.random() * 4) + 1;
    
 document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    
    //store answers in array 
    var answers = [correctAnswer];
    
    //loop for 4 boxes. 
    //as long as the wrong ans generated IS included in the ans array (>-1 which is 0,1,2....), then execute do. if wrong ans is negative, then stop loop.
    for(i=1;i<5;i++){
        do{
           wrongAnswer = (Math.floor(Math.random() * 10) + 1)*(Math.floor(Math.random() * 10) + 1);
            
        }while(answers.indexOf(wrongAnswer)>-1)
     
        //however, for occupied box with right answer, it wont push the wrong answers to the answers array.
        if(i != correctPosition) {
         document.getElementById("box"+i).innerHTML = wrongAnswer;
            
        answers.push(wrongAnswer);
        } 
    }
       
}

//user interaction to pick the right answer
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
        //run this code only if you are playing. if game over, the code won't run
        if(playing==true){
                  if(this.innerHTML == correctAnswer){
            score++;
       
                document.getElementById("scorevalue").innerHTML = score;
        
                //show correct box for 1 sec
                show("correct");
                hide("wrong");
                //settimeoout: takes 2 parameters. 1st is code execution. 2nd is time out delay
                setTimeout(function(){
                    hide("correct");
                },1000)
                
                generateQuestion();


            ``} else {

                show("wrong");
                hide("correct");
                setTimeout(function(){
                    hide("wrong");
                },1000)
                }
        }
      

     }

}

