const cards = [
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "H",
  "H",
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let pairsFound = 0;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = ""; // Clear previous board
  shuffle(cards);
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.value = card;
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");
  this.textContent = this.dataset.value;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.value === secondCard.dataset.value;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  pairsFound += 1;
  if (pairsFound === cards.length / 2) {
    setTimeout(() => alert("Congratulations! You found all pairs!"), 500);
  }
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.textContent = "";
    secondCard.textContent = "";
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

document.getElementById("restart").addEventListener("click", () => {
  pairsFound = 0;
  createBoard();
});

document.addEventListener("DOMContentLoaded", createBoard);
