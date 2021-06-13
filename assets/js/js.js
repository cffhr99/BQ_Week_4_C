// page objects
var highscoreDiv = document.querySelector('#high-score');
var TimerEl = document.querySelector('#clock');
var mainEl = document.querySelector('#details');
var timerTab = document.querySelector('#timer');
var view = document.getElementById('view-score');
 
//global variable
var test = false;
var score = 0;
var quiz = {};

var gameDuration = 0;
var gameSecElapsed = 0;
var gameInterval;



//begining page
init();

//function to display begining page
function init(){
    clearDetials();
    reset();
    //Rules and introduction
    var RuleEl = document.createElement("h2");
    RuleEl.setAttribute("id","rules");
    RuleEl.textContent = "Quiz Rules";

    var IntroEl1 = document.createElement("p");
    IntroEl1.setAttribute("id","introduction");
    IntroEl1.textContent = "If you answer correctly, you will score points. ";
    


    var IntroEl2 = document.createElement("p");
    IntroEl2.setAttribute("id","introduction");
    IntroEl2.textContent = "If your answers is incorrectly, you will not lose points but you will be penalized time.";

    //create button to start quiz
    var startQuiz = document.createElement("button");
    startQuiz.setAttribute("id","startquiz");
    startQuiz.setAttribute("class","btn");
    startQuiz.textContent = "Start Quiz";

    mainEl.appendChild(RuleEl);
    mainEl.appendChild(IntroEl1);
    mainEl.appendChild(IntroEl2);
    mainEl.appendChild(startQuiz);

    startQuiz.addEventListener("click",function(){
        playQuiz(questions);
    });
}

//function to clear Quesiton Box
function clearDetials(){
    mainEl.innerHTML = "";
}

function reset(){
    score = 0;

    gameDuration = 0;
    gameSecElapsed = 0;
    gameInterval;
}
 
//start quiz
function playQuiz(questionSet) {
   quiz = JSON.parse(JSON.stringify(questionSet));
    // quiz = questionSet;

    TimerEl.setAttribute("style", "visibility: visible;");

    gameDuration = quiz.length *10;


    startGameTimer();
    renderTimer();

    presentQuestion();
}



//show the questions
function presentQuestion(){


    if (quiz.length === 0) {
        endOfQuiz();
        return;
    }


var curQuestion = quiz.shift();

clearDetials();


// add question
var question = document.createElement("h1");
question.setAttribute("question",curQuestion.title);
question.textContent = curQuestion.title;
mainEl.appendChild(question);

var choiceBox = document.createElement("ol");
choiceBox.setAttribute("id","choiceBox");
choiceBox.setAttribute("style","list-style-type:lower-alpha");
mainEl.appendChild(choiceBox);

//add answers
for (let i=0; i<curQuestion.choices.length; i++){
    var listChoice = document.createElement("li");
    listChoice.setAttribute("choice-value",curQuestion.choices[i]);
    listChoice.setAttribute("id","questionNum-"+i);
    listChoice.setAttribute("class","Choice-item");
    listChoice.textContent = curQuestion.choices[i];

    choiceBox.appendChild(listChoice);
}


choiceBox.addEventListener("click",function(){
    scoreAnswer(curQuestion);
});
}

function scoreAnswer(cur){

    var e = event.target;
    if (e.matches("li")) {
        var selectedItem = e.textContent;
        if (selectedItem === cur.answer) {
            score+= 5;
        }
        else {
            gameDuration -= 10;
        }
        showAnswer(cur);
    }
}



//condition statements for Answers
function showAnswer(cur){


    for (let i=0; i<cur.choices.length; i++) {
    
        let questid = "#questionNum-" + i;
        let questrow = document.querySelector(questid);
    
        if ( cur.choices[i] !== cur.answer ) {
          questrow.setAttribute("style","background-color: red");
        } else {
          questrow.setAttribute("style","background-color: green");
        }
    }
    setTimeout(presentQuestion,300);
}


function setGameTime(){
    clearInterval(gameInterval);
}


//Timeout will end quiz 
function renderTimer(){


    TimerEl.textContent = gameDuration;
    
    if (gameDuration < 1) {
        endOfQuiz();
    }
}


function startGameTimer(){
    setGameTime();

    gameInterval = setInterval(function() {
        gameDuration--;
        renderTimer();
    },1000);
}


function stopTime(){
    clearInterval(gameInterval);
}


//Ending quiz with Initial entering.

function endOfQuiz(){
    stopTime();
    clearDetials();

    TimerEl.setAttribute("style","visibility:hidden");

    var gameover = document.createElement("h2");
    gameover.setAttribute("id", "gameover");
    gameover.textContent = "GAME OVER ^_^ ";

    var results = document.createElement("p");
    results.setAttribute("id", "results");
    results.textContent = " Your score is " + score; 

    var playAgain = document.createElement("button");
    playAgain.setAttribute("id", "playAgain");
    playAgain.setAttribute("class", "btn");
    playAgain.textContent = "Play again";

    var br = document.createElement("p");

    var initialsLabel = document.createElement("label");
    initialsLabel.setAttribute("for","userInitials");
    initialsLabel.textContent = "Enter Initials: ";
  
    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("id","userInitials");
    initialsInput.setAttribute("minlength","3");


    var initialsEnter = document.createElement("button");
    initialsEnter.setAttribute("ID","enter-initials");
    initialsEnter.setAttribute("class","btn1");
    initialsEnter.textContent = "Enter Initials";

    var btnbar = document.createElement("div");
    btnbar.setAttribute("class","btn-bar");


    mainEl.appendChild(gameover);
    mainEl.appendChild(results);
    btnbar.appendChild(initialsLabel);
    btnbar.appendChild(initialsInput);
    btnbar.appendChild(initialsEnter);
    mainEl.appendChild(br);
    mainEl.appendChild(btnbar);
    mainEl.appendChild(br);
    mainEl.appendChild(playAgain);




    playAgain.addEventListener("click", init);



    initialsEnter.addEventListener('click',enterinitial);

    function enterinitial(event){
      event.preventDefault();

      var initial = initialsInput.value.toUpperCase();
      localStorage.setItem('initials',initial);
      localStorage.setItem('score', score);
    }
}

//localstorage for viewscore.

view.addEventListener('click',viewsocre);
function viewsocre(){
    stopTime();
    clearDetials();

   var scorebox = document.createElement('div');
   var scoret = document.createElement('h1');
   scoret.textContent = "The Last Score";
   var scored = document.createElement('p');
   scored.textContent = "Your Score: " + localStorage.getItem("score");
   var initiald = document.createElement('p');
   initiald.textContent = "Your Initials " + localStorage.getItem("initials") 
   var comeback = document.createElement('button');
   comeback.setAttribute("class","btn");
   comeback.textContent = "Return Homepage";

   mainEl.appendChild(scorebox);
   scorebox.appendChild(scoret);
   scorebox.appendChild(scored);
   scorebox.appendChild(initiald);
   scorebox.appendChild(comeback);

   comeback.addEventListener('click',function(){
       init()
   })
}