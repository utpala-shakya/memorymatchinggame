const cards = document.querySelectorAll(".memoryCard");
let clickCounter = 0;

let isCardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

let isTimerStarted = false;

let totalPairMatched = 0;
let toBeMatchedPairToEndGame = 6;

let timerInterVal;

let isGameOver = false;

function increaseClickCounterAndShow() {
  clickCounter += 1;
  document.getElementById("click-count-value").innerHTML = clickCounter;
}

function flipCard() {
  if (!isTimerStarted) {
    startTimer();
    isTimerStarted = true;
  }
  if (lockBoard) return;
  increaseClickCounterAndShow();
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!isCardFlipped) {
    isCardFlipped = true;
    firstCard = this;
    return;
  } else {
    isCardFlipped = false;
    secondCard = this;
    checkForMatch();
    if (firstCard.dataset.name === secondCard.dataset.name) {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      totalPairMatched += 1;
      if (
        !checkIfGameIsOver(timerMin) &&
        totalPairMatched === toBeMatchedPairToEndGame
      ) {
        document.getElementById("game-over").style.display = "block";
        stopTimer();
        const totalSecToCompleteGame =
          initTimerSec + initTimerMin * 60 - (timerSec + timerMin * 60);
        const timeTaken = formatSeconds(totalSecToCompleteGame);
        document.getElementById(
          "game-over-message"
        ).innerHTML = `Congratulations! You win. You have obtained`;
        document.getElementById(
          "game-over-time"
        ).innerHTML = `Time Taken: ${timeTaken}`;
        return;
      }
      showMessage("Card Matched");
      resetBoard();
    } else {
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
      }, 1500);
    }
  }
}
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
function resetBoard() {
  [isFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });

  cards.forEach((card) => card.addEventListener("click", flipCard));

  function resetButton() {
    location.reload();
  }

  function showMessage(message) {
    document.getElementById("message").innerHTML = message;
    document.getElementById("message").style.display = "block";
    setTimeout(() => {
      document.getElementById("message").innerHTML = "";
      document.getElementById("message").style.display = "none";
    }, 800);
  }
}
