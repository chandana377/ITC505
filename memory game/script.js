// 🎯 MEMORY MATCHING GAME
// Developed by: Venkata Chandana Narayanam
// Course: ITC-505 Web Technologies | Module 6 Activity 3
// Description: Simple JS-based game to match card pairs. Demonstrates DOM manipulation, event listeners, and logic control flow.

// ---------- GLOBAL VARIABLES ----------
const gameBoard = document.getElementById("game-board");
const resetBtn = document.getElementById("reset-btn");
const scoreDisplay = document.getElementById("score");
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;

// ---------- CARD DATA ----------
// Simple emoji pairs
const emojis = ["🍎", "🍇", "🍋", "🍉", "🍓", "🍒"];
let cardArray = [...emojis, ...emojis]; // duplicate for pairs

// ---------- SHUFFLE FUNCTION ----------
function shuffleCards() {
  for (let i = cardArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
  }
}

// ---------- DISPLAY CARDS ----------
function displayCards() {
  gameBoard.innerHTML = "";
  cardArray.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-emoji", emoji);
    card.setAttribute("data-index", index);
    card.innerText = ""; // Hidden at start
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

// ---------- FLIP CARD FUNCTION ----------
function flipCard() {
  const selectedCard = this;

  // Ignore clicks on already matched or flipped cards
  if (flippedCards.length === 2 || selectedCard.classList.contains("flipped")) {
    return;
  }

  selectedCard.classList.add("flipped");
  selectedCard.innerText = selectedCard.dataset.emoji;
  flippedCards.push(selectedCard);

  // Check if two cards are flipped
  if (flippedCards.length === 2) {
    setTimeout(checkForMatch, 800);
  }
}

// ---------- CHECK FOR MATCH FUNCTION ----------
function checkForMatch() {
  const [cardOne, cardTwo] = flippedCards;
  if (cardOne.dataset.emoji === cardTwo.dataset.emoji) {
    matchedPairs++;
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
    flippedCards = [];

    // WIN CONDITION
    if (matchedPairs === emojis.length) {
      setTimeout(() => alert(`🎉 You won! Final Score: ${score}`), 300);
    }
  } else {
    // Not a match → flip back
    setTimeout(() => {
      cardOne.classList.remove("flipped");
      cardTwo.classList.remove("flipped");
      cardOne.innerText = "";
      cardTwo.innerText = "";
      flippedCards = [];
    }, 600);
  }
}

// ---------- RESET GAME FUNCTION ----------
function resetGame() {
  matchedPairs = 0;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  flippedCards = [];
  shuffleCards();
  displayCards();
}

// ---------- INITIALIZE GAME ----------
shuffleCards();
displayCards();

// ---------- EVENT LISTENERS ----------
resetBtn.addEventListener("click", resetGame);
