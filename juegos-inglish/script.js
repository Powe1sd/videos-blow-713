const words = [
  "hangman",
  "javascript",
  "programming",
  "computer",
  "internet",
  "book",
  "movie",
  "music",
  "game",
  "friend",
];
const maxGuesses = 8;
const hints = {
  hangman: "It's a word game.",
  javascript: "It's a programming language.",
  programming: "It involves writing code.",
  computer: "It's an electronic device.",
  internet: "It connects computers worldwide.",
  book: "It contains written or printed pages.",
  movie: "It's a motion picture.",
  music: "It's a form of art.",
  game: "It's an activity for entertainment.",
  friend: "It's a person you like and trust.",
};

let chosenWord = "";
let guessedWord = "";
let guessesLeft = 0;
let lettersGuessed = [];

const wordDisplay = document.getElementById("word-display");
const hangman = document.getElementById("hangman");
const guessesLeftDisplay = document.getElementById("guesses-left");
const lettersGuessedDisplay = document.getElementById("letters-guessed");
const messageDisplay = document.getElementById("message");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const resetButton = document.getElementById("reset-button");

function initGame() {
  chosenWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
  guessedWord = "_".repeat(chosenWord.length);
  guessesLeft = maxGuesses;
  lettersGuessed = [];
  render();
}

function render() {
  wordDisplay.textContent = guessedWord;
  hangman.textContent = "HANGMAN".substring(0, maxGuesses - guessesLeft);
  guessesLeftDisplay.textContent = `Guesses left: ${guessesLeft}`;
  lettersGuessedDisplay.textContent = `Letters guessed: ${lettersGuessed.join(
    ", "
  )}`;
  if (guessedWord === chosenWord) {
    messageDisplay.textContent = "Congratulations! You won!";
    disableInput();
  } else if (guessesLeft === 0) {
    messageDisplay.textContent = "Game over! The word was: " + chosenWord;
    disableInput();
  } else {
    messageDisplay.textContent = "";
  }
}

function disableInput() {
  guessInput.disabled = true;
  guessButton.disabled = true;
}

function handleGuess() {
  const guess = guessInput.value.trim().toUpperCase();
  guessInput.value = "";
  if (guess && guess.length === 1 && /^[A-Z]$/.test(guess)) {
    if (!lettersGuessed.includes(guess)) {
      lettersGuessed.push(guess);
      if (chosenWord.includes(guess)) {
        for (let i = 0; i < chosenWord.length; i++) {
          if (chosenWord[i] === guess) {
            guessedWord =
              guessedWord.substring(0, i) +
              guess +
              guessedWord.substring(i + 1);
          }
        }
      } else {
        guessesLeft--;
      }
      render();
    } else {
      alert("You already guessed that letter!");
    }
  } else {
    alert("Please enter a single letter from A to Z.");
  }
}

initGame();

guessButton.addEventListener("click", handleGuess);
resetButton.addEventListener("click", initGame);

// Show hint
document.addEventListener("DOMContentLoaded", () => {
  const hint = hints[chosenWord.toLowerCase()];
  messageDisplay.textContent = `Hint: ${hint}`;
});
