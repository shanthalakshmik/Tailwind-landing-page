const cards = document.querySelectorAll('.card');
const restartBtn = document.getElementById('restartBtn');
const winMessage = document.getElementById('winMessage');
const totalMovesElement = document.getElementById('totalMoves');
const totalTimeElement = document.getElementById('totalTime');
const retryBtn = document.getElementById('retryBtn');
const nextBtn = document.getElementById('nextBtn');
const movesElement = document.getElementById('moves');
const timeElement = document.getElementById('time');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matchedPairs = 0;
let timer;
let startTime;

function startTimer() {
    startTime = new Date().getTime();
    timer = setInterval(() => {
        const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
        timeElement.textContent = `Time: ${elapsedTime}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    if (!moves) {
        startTimer();
    }

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
    updateMoves();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();

    matchedPairs++;
    if (matchedPairs === cards.length / 2) {
        endGame();
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function updateMoves() {
    moves++;
    movesElement.textContent = `Moves: ${moves}`;
}

function endGame() {
    stopTimer();
    const totalTime = Math.floor((new Date().getTime() - startTime) / 1000);
    totalMovesElement.textContent = moves;
    totalTimeElement.textContent = totalTime;
    winMessage.style.display = 'flex';
}

function restartGame() {
    cards.forEach(card => {
        card.classList.remove('flip', 'matched');
    });
    winMessage.style.display = 'none';
    moves = 0;
    matchedPairs = 0;
    movesElement.textContent = 'Moves: 0';
    timeElement.textContent = 'Time: 0s';
    resetBoard();
    shuffle();
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

function playNext() {
    restartGame();
    
}

restartBtn.addEventListener('click', restartGame);
retryBtn.addEventListener('click', restartGame);
nextBtn.addEventListener('click', playNext);
cards.forEach(card => card.addEventListener('click', flipCard));

shuffle();


