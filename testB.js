const cardsContainer = document.querySelector(".memory-game");
const numCardsSelect = document.querySelector("#num-cards");
const difficultySelect = document.querySelector("#difficulty");
const playBtn = document.querySelector("#play-btn");
const gameContainer = document.querySelector("#game-container");
const timerDisplay = document.querySelector("#timer");

let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let countdownTimer;
let countdownTime;

function createCardElement(imagePath, altText) {
  const card = document.createElement("div");
  card.classList.add("memory-card");

  const frontFace = document.createElement("img");
  frontFace.classList.add("front-face");
  frontFace.src = imagePath;
  frontFace.alt = altText;

  const backFace = document.createElement("img");
  backFace.classList.add("back-face");
  backFace.src = "img/back.jpg";
  backFace.alt = "back_card";

  card.appendChild(frontFace);
  card.appendChild(backFace);

  card.addEventListener("click", flipCard);

  return card;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

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
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffleCards() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

function hideCards() {
  cards.forEach((card) => {
    card.classList.remove("flip");
  });
}

function startCountdown() {
  clearInterval(countdownTimer);
  countdownTime = parseInt(difficultySelect.value);
  timerDisplay.textContent = countdownTime;

  countdownTimer = setInterval(() => {
    countdownTime--;
    timerDisplay.textContent = countdownTime;

    if (countdownTime <= 0) {
      clearInterval(countdownTimer);
      hideCards();
    }
  }, 1000);
}

function revealCards(durationInSeconds) {
  cardsContainer.classList.add("no-click"); // Disable clicking during card reveal
  cards.forEach((card) => card.classList.add("flip")); // Show all cards

  setTimeout(() => {
    cardsContainer.classList.remove("no-click"); // Enable clicking after card reveal
    hideCards(); // Flip the cards back

    // After hiding the cards, you can add your game logic here
    // For example, you can call a function to handle card matching
    // or any other game-related functionality
  }, durationInSeconds * 1000);
}

function createGame() {
  const numCards = parseInt(numCardsSelect.value);
  if (numCards % 2 !== 0) {
    alert("Please select an even number of cards.");
    return;
  }

  gameContainer.classList.add("hide");
  cardsContainer.innerHTML = "";
  cards = [];

  for (let i = 0; i < numCards; i++) {
    const card = createCardElement(
      `img/${i % (numCards / 2)}.jpg`,
      `image${i % (numCards / 2)}`
    );
    card.dataset.framework = `image${i % (numCards / 2)}`;
    cards.push(card);
  }

  shuffleCards();
  cards.forEach((card) => cardsContainer.appendChild(card));

  startCountdown();

  let revealDuration;
  switch (difficultySelect.value) {
    case "180":
      revealDuration = 3; // 3 seconds for easy difficulty
      break;
    case "150":
      revealDuration = 5; // 5 seconds for normal difficulty
      break;
    case "120":
      revealDuration = 8; // 8 seconds for hard difficulty
      break;
    default:
      revealDuration = 3; // Default to 3 seconds if no difficulty is selected
      break;
  }

  setTimeout(() => {
    revealCards(revealDuration);
  }, 1000); // Delay the reveal to ensure the cards are fully loaded

  // Additional game logic or event handlers can be added here
}

playBtn.addEventListener("click", createGame);
