const cards = document.querySelectorAll(".memoryCard");
clickCounter = 0;
const timeH = document.querySelector("h1");
let timeSecond = 5;

displayTime(timeSecond);

const countDown = setInterval(() => {
  timeSecond--;
  displayTime(timeSecond);
  if (timeSecond <= 0 || timeSecond < 1) {
    clearInterval(countDown);
  }
}, 1000);

function displayTime(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerHTML = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function increaseClickAndShow() {
  clickCounter += 1;
  document.getElementById("clickCount").innerHTML = clickCounter;
}

function flipCard() {
  if (lockBoard) return;
  increaseClickAndShow();
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 800);
}
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
}

cards.forEach((card) => card.addEventListener("click", flipCard));

function resetButton() {
  location.reload();
}

function alertpopup() {
  if (countDown > 0) {
    alert("you won");
  } else {
    alert("you lost");
  }
}
