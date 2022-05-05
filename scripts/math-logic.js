const timesTableMaxNum = 12;

let score;
let timeLeft;
let action;
let product;

let playing = false;

let startButton = document.getElementById("start-button");
let resetButton = document.getElementById("reset-button");

let scoreDisplay = document.getElementsByClassName("score-value")[0];
let timeDisplay = document.getElementById("time-left-in-seconds");
let gameOverScore = document.getElementsByClassName("score-value")[1];

let timeLeftBox = document.getElementById("time-left");
let correctBox = document.getElementById("correct");
let wrongBox = document.getElementById("wrong");
let gameOverBox = document.getElementById("game-over");
let questionBox = document.getElementById("question");

// if we click on the start
startButton.onclick = function() {
  if(playing == false){
    playing = true;
    score = 0;
    timeLeft = 60;

    document.getElementById("question").focus();

    timeLeftBox.style.visibility = "visible";
    timeLeftBox.ariaHidden="false";

    scoreDisplay.innerHTML = score;
    timeDisplay.innerHTML = timeLeft;

    gameOverBox.style.visibility = "hidden";

    startCountdown();

    generateQA();
  }
}

resetButton.onclick = function () {
  if(playing == true){
    playing = false;
    score = 0;
    timeLeft = 60;
    location.reload();
  }
}

for(i = 0; i < document.getElementsByClassName("answers").length; i++){
  document.getElementsByClassName("answers")[i].onclick = function () {
    if( playing == true ){
      if(this.innerHTML == product){
        score++;
        scoreDisplay.innerHTML = score;

        wrongBox.style.display="none";
        correctBox.style.display="block";
        correctBox.focus();
        setTimeout(function (){
          correctBox.style.display="none";
        }, 1000);

        generateQA();
      }
      else {
        correctBox.style.display="none";
        wrongBox.style.display="block";
        wrongBox.focus();
        setTimeout(function (){
          wrongBox.style.display="none";
        }, 1000);
      }
    }
  }
}

function startCountdown() {
  action = setInterval(function(){
    timeLeft -= 1;
    timeDisplay.innerHTML = timeLeft;

    if(timeLeft == 0){
      stopCountdown();
      gameOverBox.style.visibility = "visible";
      gameOverScore.innerHTML = score;
      gameOverBox.focus();
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(action);
}

function generateQA (){
  let firstNum = Math.round(Math.random()*(timesTableMaxNum-1))+1;
  let secondNum = Math.round(Math.random()*(timesTableMaxNum-1))+1;

  let randomPosition = Math.round(Math.random()*3);

  let wrongAnswer;
  let answers;

  product = firstNum * secondNum;

  questionBox.innerHTML = firstNum + " x " + secondNum;

  document.getElementsByClassName("answers")[randomPosition].innerHTML = product;

  answers = [product];

  for(i = 0; i < document.getElementsByClassName("answers").length; i++)
  {
    if( i != randomPosition){
      do {
        wrongAnswer = (Math.round(Math.random()*(timesTableMaxNum-1))+1) * (Math.round(Math.random()*(timesTableMaxNum-1))+1);
      } while( answers.indexOf(wrongAnswer) > -1 );

      document.getElementsByClassName("answers")[i].innerHTML = wrongAnswer;

      answers.push(wrongAnswer);
    }
  }

  document.getElementById("question").focus();
}