

//генерируем случайное число от 1 до 100, вычисленное с использованием математического алгоритма
var randomNumber = Math.floor(Math.random() * 100) + 1;

//три переменные для хранения ссылок на абзацы результатов в нашем HTML и используются для вставки значений в абзацы
var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi  = document.querySelector('.lowOrHi');

//две переменных хранят ссылки на форму ввода текста и кнопку отправки а позже используются для управления подачи догадки
var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

//сохраняет кол-во догадок
var guessCount = 1;
//кнопка сброса игры
var resetButton;

guessField.focus();

function checkGuess() {
    //передается значение введенное в инпут
    //метод Number() проверяет что точно введено число
    var userGuess = Number(guessField.value);

    if (guessCount === 1) {
        guesses.textContent = 'Предыдущие догадки: ';
    }
    guesses.textContent += userGuess + '  ';

    //если угадал число
    if (userGuess === randomNumber) {
        lastResult.textContent = 'Поздравляем! ' + userGuess + ' - правильное число!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    }
    //если закончиличь ходы
    else if (guessCount === 10) {
        lastResult.textContent = '!!! ИГРА ОКОНЧЕНА !!!';
        setGameOver();
    }
    //в процессе угадывания пока есть ходы
    else {
        lastResult.textContent = 'Неправильно!';
        lastResult.style.backgroundColor = '#ec2e2e';
        if(userGuess < randomNumber) {
            lowOrHi.textContent = 'Твое число меньше загаданного!';
        }
        else if(userGuess > randomNumber) {
            lowOrHi.textContent = 'Твое число больше загаданного!';
        }
    }

    guessCount++;
    //очищаем инпут
    guessField.value = '';
    //фокусируемся на нем снова
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Начать новую игру';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;

    var resetParagraphs = document.querySelectorAll('.resultParagraphs p');
    for (var i = 0; i < resetParagraphs.length; i++){
        resetParagraphs[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 100) + 1;
}
