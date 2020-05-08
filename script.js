var currentQuestion = 0;
var score = 0;
var timer = 60;

var playerInitials = "";
var container = document.getElementById('quizContainer');
var questionEl = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var opt4 = document.getElementById('opt4');
var totQuestions = questions.length;
var nextButton = document.getElementById('nextBtn');
var resultCont = document.getElementById('result');
var startBtn = document.querySelector('#startBtn');
var confirmAns = document.querySelector('#confirmAns');
var highScores = document.querySelector('.highScores');

function timerStart() {
    loadQuestion(currentQuestion);

    var interval = setInterval(function () {
        document.getElementById('timer').innerHTML = 'Time Remaining: ' + timer + ' seconds';
        timer--;
        // used -1 to fix timer lag
        if (timer < -1) {
            clearInterval(interval);
            document.getElementById('timer').innerHTML = 'Reload Page to try again.';
            return;
        }
    }, 1000);
}

function loadQuestion(questionIndex) {
    var q = questions[questionIndex];
    questionEl.textContent = (questionIndex + 1) + '. ' + q.question;
    opt1.textContent = q.option1;
    opt2.textContent = q.option2;
    opt3.textContent = q.option3;
    opt4.textContent = q.option4;
};

function loadNextQuestion() {
    var selectedOption = document.querySelector('input[type=radio]:checked')
    if (!selectedOption) {
        alert('!');
        return;
    }

    var answer = selectedOption.value;
    if (questions[currentQuestion].answer == answer) {
        score += 5
        confirmAns.textContent = 'Correct'
    } else {
        (questions[currentQuestion].answer != answer)
        confirmAns.textContent = 'Incorrect'
        timer = timer - 5
    }

    selectedOption.checked = false;
    currentQuestion++;

    if (currentQuestion == totQuestions - 1) {
        nextButton.textContent = 'Finish';
    }

    if (currentQuestion == totQuestions) {
        container.style.display = 'none';
        resultCont.style.display = '';
        resultCont.textContent = 'Total Score: ' + score;
        playerInitials = prompt('Enter your initials')
        window.localStorage.setItem('highscorer', playerInitials);
        window.localStorage.setItem('scores', score);
        return;
    }

    loadQuestion(currentQuestion);
}

function leaderBoard () {
    container.style.display = 'none';
    resultCont.style.display = '';

    var playerHigh = localStorage.getItem('highscorer')
    var scores = localStorage.getItem('scores')

    highScores.textContent = ("High Scoring Player: "+ playerHigh + "  Score: " + scores);
}

startBtn.addEventListener('click', timerStart)
highScores.addEventListener('click', leaderBoard)