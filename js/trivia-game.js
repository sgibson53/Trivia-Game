
var data = [
    {
        question: "Which planet in our solar system has the most oxygen?",
        answers: [
            "Earth",
            "Venus",
            "Neptune",
            "Mars"
        ],
        correct: "Earth"
    },
    {
        question: "How many planets in our solar system have moons?",
        answers: [
            "Six",
            "Four",
            "One",
            "All of them"
        ],
        correct: "Six"
    },
    {
        question: "Which planet is farthest from the Sun?",
        answers: [
            "Neptune",
            "Jupiter",
            "Uranus",
            "Venus"
        ],
        correct: "Neptune"
    },
    {
        question: "Which Planet in our solar system has the most gravity?",
        answers: [
            "Neptune",
            "Jupiter",
            "Earth",
            "Saturn"
        ],
        correct: "Jupiter"
    },
    {
        question: "What is the hottest planet in our solar system?",
        answers: [
            "Mars",
            "Venus",
            "Mercury",
            "Trick question, atmospheric temperature and planetary temperature differ. Which do you want??"
        ],
        correct: "Venus"
    },
    {
        question: "Which is the largest of Mars' two moons?",
        answers: [
            "Phobos",
            "Deimos"
        ],
        correct: "Phobos"
    },
    {
        question: "In 1781, what was the first planet to be discovered using the telescope?",
        answers: [
            "Uranus",
            "Mars",
            "Jupiter",
            "It was actually the moon, but they thought it was a planet"
        ],
        correct: "Uranus"
    },
    {
        question: "Of the four rocky planets in our solar system, which is the largest and most dense?",
        answers: [
            "Earth",
            "Venus",
            "Mercury",
            "Mars"
        ],
        correct: "Earth"
    },
    {
        question: "Which planet in our solar system spins the fastest?",
        answers: [
            "Jupiter",
            "Saturn",
            "Venus",
            "Earth"
        ],
        correct: "Jupiter"
    },
    {
        question: "Which planet in our solar system has the longest day?",
        answers: [
            "Venus",
            "Neptune",
            "Earth",
            "Mars"
        ],
        correct: "Venus"
    },
]

var game = {
    questions: data,
    timer: 20,
    questionCount: data.length,
    currentQuestion: 0,
    numCorrect: 0,
    timerInterval: null,
    reset: function() {
        var final = document.getElementsByClassName('end-block')[0];
        document.getElementsByClassName('answer-container')[0].innerHTML = "";
        if (final != null) {
            final.style.opacity = '0';
            final.style.zIndex = '-999';
        }
        this.questionCount = this.questions.length;
        this.currentQuestion = 0;
        this.numCorrect = 0;
        this.nextQuestion();
    },
    showAnswer: function(answer) {
        // Bring down the answer block
        document.getElementsByClassName('answer-block')[0].style.top = "250px";

        // Stop the timer
        clearInterval(this.timerInterval);

        var gameObj = this;

        var result = document.getElementsByClassName('result')[0];
        var correctAnswer = this.questions[this.currentQuestion].correct;
        if (answer == null) {
            result.innerHTML = "Time's up!";
        } else if (answer == correctAnswer) {
            result.innerHTML = "Right!";
            gameObj.numCorrect++;
        } else {
            result.innerHTML = "You're wrong, you dumbass!";
        }

        document.getElementById('answer-target').innerHTML = correctAnswer;

        setTimeout(function() {
            gameObj.currentQuestion++;
            if (gameObj.currentQuestion == gameObj.questionCount) {
                gameObj.showFinalScreen();
            } else {
                document.getElementsByClassName('answer-container')[0].innerHTML = "";
                gameObj.nextQuestion();
            }
        }, 3500);
    },
    nextQuestion: function() {
        // Bring down the answer block
        document.getElementsByClassName('answer-block')[0].style.top = "-1000px";

        var gameObj = this;
        var question = this.questions[this.currentQuestion];
        document.getElementsByClassName('question-title')[0].innerHTML = question.question;
        this.startTimer();
        var answerContainer = document.getElementsByClassName('answer-container')[0];
        var alph = 'ABCD';
        shuffle(question.answers);
        question.answers.forEach(function(a, i) {
            var block = document.createElement('div');
            block.className = "answer-option";
            console.log(block)
            block.value = a;
            block.innerHTML = "<span class='answer-letter'>"+alph.charAt(i) + "</span>" + a;
            answerContainer.appendChild(block);
        });

        var answerOptions = document.getElementsByClassName('answer-option');
        for (var i = 0; i < answerOptions.length; i++) {
            answerOptions[i].addEventListener('click', function() {
                gameObj.showAnswer(this.value)
            });
        }
    },
    showFinalScreen: function() {
        var smart = "";
        if (this.numCorrect > 8) {
            smart = "a genius";
        } else if (this.numCorrect > 5) {
            smart = "kind of smart";
        } else {
            smart = "the supidest person I've ever met";
        }

        document.getElementById('num-right-target').innerHTML = this.numCorrect + "/" + this.questionCount;
        document.getElementById('smart-target').innerHTML = smart;

        document.getElementsByClassName('end-block')[0].style.zIndex = '1';
        document.getElementsByClassName('end-block')[0].style.opacity = '1';
    },
    startTimer: function() {
        var timer = this.timer;
        var gameObj = this;
        document.getElementsByClassName('timer')[0].innerHTML = timer;
        this.timerInterval = setInterval(function() {
            timer--;
            if (timer == 0) {
                clearInterval(gameObj.timerInterval);
                gameObj.showAnswer(null);
                document.getElementsByClassName('timer')[0].innerHTML = timer;
            }
            document.getElementsByClassName('timer')[0].innerHTML = timer;
        }, 1000);
    }
}

// Welcome screen start the game
document.getElementsByClassName('ok-button')[0].addEventListener('click', function() {
    document.getElementsByClassName('welcome-screen')[0].style.display = 'none';
    document.getElementsByClassName('question-block')[0].style.display = 'block';
    game.reset();
});

document.getElementsByClassName('play-again')[0].addEventListener('click', function() {
    game.reset();
});

function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

