var questionsArr = [
    {
        question: 'What is the mascot of University of Florida?',
        answer: 'Gator',
        options: [
            'Dinosaur',
            'Gator',
        ]
    },
    {
        question: 'What is the mascot of Miami Dade College?',
        answer: 'Shark',
        options: [
            'Shark',
            'Dolphin',
        ]
    },
    {
        question: 'What is the mascot of University of Miami?',
        answer: 'White Ibis',
        options: [
            'White Ibis',
            'Flamingo',
        ]
    },
    {
        question: 'What is the mascot of Florida International University?',
        answer: 'Panther',
        options: [
            'Jaguar',
            'Panther',
        ]
    },
    {
        question: 'What is the mascot of Barry University?',
        answer: 'Parrot',
        options: [
            'Parrot',
            'Owl',
        ]
    }
];

var div = document.createElement('div');
var p = document.createElement('p');
var timeEl = document.createElement('p');
var time = 30;
var scores = document.createElement('p');
var previousScore = localStorage.getItem('previous-score');

//Start Quiz Game
quizGame();
function quizGame(){
    var startQuiz = document.createTextNode("Start Quiz!");
    button = document.createElement("button");
    button.appendChild(startQuiz);
    button.setAttribute('id', 'start-quiz');
    quiz.appendChild(button);
};

function removeBtn(){
    quiz.removeChild(button);
};

//Selections
function loadQuiz(selection){
    if (selection >= questionsArr.length){
        quiz.removeChild(div);
        quiz.removeChild(p);
        quiz.removeChild(timeEl);
        clearInterval(interval);
        quizGame();
        score = Math.round((score / questionsArr.length) * 100);
        localStorage.setItem('previous-score', score);
        quiz.appendChild(scores);
        scores.textContent = 'Previous Score: ' + score + '%';
    } else {
        div.textContent = '';
        question = questionsArr[selection].question;
        select = questionsArr[selection].options;
        correct = questionsArr[selection].answer;
        p.textContent = question;
        for (let j = 0; j < select.length; j++) {
            var selected = document.createTextNode(select[j]);
            var selectBtn = document.createElement('button');
            div.appendChild(selectBtn);
            selectBtn.appendChild(selected);
        }
    }}
    quiz.addEventListener('click', function(e){
        e.stopPropagation();
        if (e.target.id == 'start-quiz') {
            removeBtn();
            selection = 0;
            score = 0;
            questions = document.createTextNode(prompt);
            p.appendChild(questions);
            quiz.appendChild(p);
            quiz.appendChild(div);
            coutdown(time);
            loadQuiz(selection);
        } else if (e.target.textContent == correct){
            selection ++;
            score ++;
            clearInterval(interval);
            coutdown(time);
            loadQuiz(selection);
        } else if (e.target.tagName == 'BUTTON' || !(e.target.id == 'start-quiz')){
            selection ++;
            clearInterval(interval);
            coutdown(time);
            loadQuiz(selection);
        }
    }
);

//Countdown
function coutdown(time){
    var seconds = time;
    timeEl.textContent = seconds;
    quiz.appendChild(timeEl);
    interval = setInterval(() => {
        if (seconds == 0){
            clearInterval(interval);
            selection ++;
            loadQuiz(selection);
            coutdown(time);
        } else {
            seconds --;
            timeEl.textContent = seconds;
        }
    }, 1000);
}

//Score
if (scores){
    scores.textContent = 'Previous Score: ' + previousScore + '%';
    quiz.appendChild(scores);
};