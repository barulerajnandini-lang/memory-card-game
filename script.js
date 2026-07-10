// Welcome Player
const player = localStorage.getItem("playerName") || "Player";
document.getElementById("welcome").innerHTML = "Welcome, " + player + " 👋";

// Cards
let emojis = [
    "🍎","🍎",
    "🚗","🚗",
    "🐶","🐶",
    "⚽","⚽",
    "🎈","🎈",
    "🍕","🍕",
    "🎮","🎮",
    "🌸","🌸"
];

// Shuffle Cards
emojis.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("gameBoard");
const movesText = document.getElementById("moves");
const matchedText = document.getElementById("matched");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matchedPairs = 0;

// Create Cards
function createBoard() {

    gameBoard.innerHTML = "";

    emojis.forEach((emoji) => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.dataset.emoji = emoji;

        card.innerHTML = "?";

        card.addEventListener("click", flipCard);

        gameBoard.appendChild(card);

    });

}

createBoard();

// Flip Card
function flipCard() {

    if (lockBoard) return;

    if (this === firstCard) return;

    if (this.classList.contains("matched")) return;

    this.innerHTML = this.dataset.emoji;

    this.classList.add("flip");

    if (!firstCard) {

        firstCard = this;
        return;

    }

    secondCard = this;

    moves++;

    movesText.innerHTML = moves;

    checkMatch();

}

// Check Match
function checkMatch() {

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;

        matchedText.innerHTML = matchedPairs + " / 8";

        resetTurn();

        if (matchedPairs === 8) {

            setTimeout(() => {

                document.getElementById("finalMoves").innerHTML = moves;

                document.getElementById("winPopup").style.display = "flex";

            }, 400);

        }

    } else {

        lockBoard = true;

        setTimeout(() => {

            firstCard.innerHTML = "?";
            secondCard.innerHTML = "?";

            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");

            resetTurn();

        }, 800);

    }

}

// Reset Turn
function resetTurn() {

    firstCard = null;
    secondCard = null;
    lockBoard = false;

}

// Restart Button
document.getElementById("restart").addEventListener("click", () => {

    emojis.sort(() => Math.random() - 0.5);

    moves = 0;
    matchedPairs = 0;

    movesText.innerHTML = "0";
    matchedText.innerHTML = "0 / 8";

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    createBoard();

});

// Logout Button
document.getElementById("logout").addEventListener("click", () => {

    localStorage.removeItem("playerName");

    window.location.href = "index.html";

});

// Close Popup
function closePopup() {

    document.getElementById("winPopup").style.display = "none";

    emojis.sort(() => Math.random() - 0.5);

    moves = 0;
    matchedPairs = 0;

    movesText.innerHTML = "0";
    matchedText.innerHTML = "0 / 8";

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    createBoard();

}