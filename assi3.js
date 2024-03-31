const quizData = [
    {
        question: 'When was the first NBA All-Star Game played?',
        options: ['1972', '1948', '1951', '1961'],
        correctAnswer: '1951'
    },
    {
        question: 'How many NBA All-Star Games was Kareem Abdul-Jabbar selected for?',
        options: ['9', '12', '16', '19'],
        correctAnswer: '19'
    },
    {
        question: 'How tall was Manute Bol, the tallest player in the NBA?',
        options: ['6"8', '7"1', '7"4', '7"7'],
        correctAnswer: '7"7'
    },
    {
        question: 'Who is the best NBA scorer of all time?',
        options: ['Kareem Abdul-Jabbar', 'kobe bryan', 'steph curry', 'michael jordan'],
        correctAnswer: 'Kareem Abdul-Jabbar'
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timePerQuestion = 30;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const scoreValueElement = document.getElementById('score-value');
const progressBar = document.getElementById('progress-bar');
const timeElement = document.getElementById('time');
const submitButton = document.getElementById('submit-btn');

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement('button');
        optionElement.textContent = option;
        optionElement.classList.add('option');
        optionElement.addEventListener('click', function() {
            selectAnswer(option);
        });
        optionsContainer.appendChild(optionElement);
    });
}

function selectAnswer(answer) {
    clearInterval(timer);
    const currentQuestion = quizData[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
        feedbackElement.textContent = 'Correct!';
        score++;
    } else {
        feedbackElement.textContent = 'Incorrect. The correct answer is: ' + currentQuestion.correctAnswer;
    }
    scoreValueElement.textContent = score;
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        setTimeout(loadNextQuestion, 1000);
    } else {
        endQuiz();
    }
}

function loadNextQuestion() {
    loadQuestion();
    startTimer();
}

function startTimer() {
    let timeLeft = timePerQuestion;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeElement.textContent = timeLeft;
            updateProgressBar((timePerQuestion - timeLeft) / timePerQuestion * 100);
        } else {
            clearInterval(timer);
            timeElement.textContent = '0';
            selectAnswer('');
        }
    }, 1000);
}

function updateProgressBar(percentage) {
    progressBar.style.width = percentage + '%';
}

function endQuiz() {
    clearInterval(timer);
    questionElement.textContent = 'Quiz Completed!';
    optionsContainer.innerHTML = '';
    feedbackElement.textContent = '';
    submitButton.style.display = 'none';
}

loadQuestion();
startTimer();