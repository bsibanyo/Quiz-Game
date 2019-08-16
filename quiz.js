// selecting elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions [THE questions are here!!]
let questions = [
    {
        question : "Nelson Mandela spent 27 years imprisoned on this infamous island.?",
        imgSrc : "img/robben_island.jpeg",                                            //image related to the question
        choiceA : "Ibiza island",
        choiceB : "Robben island",
        choiceC : "Tidal Island",
        choiceD : "Zanzibar",
        correct : "B"
    },{
        question : "Johannesburg's population boomed after what was found there?",
        imgSrc : "img/jozi.jpg",
        choiceA : "Oil", 
        choiceB : "Bronze",
        choiceC : "Gold",
        choiceD : "Diamond",
        correct : "C"
    },{
        question : "How many languages are recognized in South Africa?",
        imgSrc : "img/languages.png",
        choiceA : "12",
        choiceB : "15",
        choiceC : "1",
        choiceD : "11",
        correct : "D"
    }, {
        question : "Who was the last apartheid president of south africa?",
        imgSrc : "img/FW-de-Klerk.jpg",
        choiceA : "Pieter Willem Botha",
        choiceB : "Eugène Terre'Blanche",
        choiceC : "Frederik Willem de Klerk",
        choiceD : "Marais Viljoen",
        correct : "C"
    },{
        question : "Who is the gentleman in this picture?",
        imgSrc : "img/IMG-20180314-WA0040.jpg",
        choiceA : "Entrepreneur",
        choiceB : "Software Engineer",
        choiceC : "ALL OF THE ABOVE",
        choiceD : "Mr Bruce Lindokuhle Sibanyoni",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;                                                // time: 10 seconds
const gaugeWidth = 150;                                                 // 150 pixels
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz then next page
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++;
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnswer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render/display  
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.gif" :
              (scorePerCent >= 60) ? "img/4.gif" :
              (scorePerCent >= 40) ? "img/3.gif" :
              (scorePerCent >= 20) ? "img/2.gif" :
              "img/1.gif";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}




//<meta name="viewport" content="width=device-width, initial-scale=1">                  //helps the program to be viewed in different screen sizes





















