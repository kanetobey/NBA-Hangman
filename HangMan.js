const words = ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls",
    "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors", 
    "Houston Rockets", "Indiana Pacers", "Los Angeles Clippers", "Los Angeles Lakers", "Memphis Grizzlies", 
    "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "Oklahoma City Thunder", 
    "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings", 
    "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"];

let nbaTeamToGuess = "";
let guessedTeam = [];
let wins = 0;
let losses = 0;
let chances = 5;
let guessedTeams = [];
let remainingTeams = [...words]; // Initially, all teams are available

const wordContainer = document.getElementById('word-container');
const chancesSpan = document.getElementById('chances');
const winsSpan = document.getElementById('wins');
const lossesSpan = document.getElementById('losses');
const resetBtn = document.getElementById('resetBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');
const keyboardContainer = document.getElementById('keyboard-container');
const teamsGuessedList = document.getElementById('teams-guessed');

// Fisher-Yates Shuffle to randomize the teams
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Start a new game
function startGame() {
    // Check if all teams have been guessed, then reshuffle if necessary
    if (remainingTeams.length === 0) {
        remainingTeams = [...words]; // Reset the remaining teams
        shuffle(remainingTeams); // Reshuffle teams
        alert("All teams have been guessed! Reshuffling teams.");
    }

    // Pick the next team to guess
    nbaTeamToGuess = remainingTeams.pop().toLowerCase(); // Remove a team from the list
    guessedTeam = nbaTeamToGuess.split('').map(char => (char === ' ' ? ' ' : '_'));
    chances = 5; // Reset chances for each game
    updateDisplay();
    createKeyboard();
}

// Update the word display and score
function updateDisplay() {
    wordContainer.innerHTML = guessedTeam.join('');
    chancesSpan.textContent = chances;
    winsSpan.textContent = wins;
    lossesSpan.textContent = losses;
}

// Create on-screen keyboard
function createKeyboard() {
    keyboardContainer.innerHTML = '';

    // Create number row (0-9)
    const numberRow = document.createElement('div');
    numberRow.classList.add('number-row');
    const numbers = '0123456789';
    numbers.split('').forEach(number => {
        const button = document.createElement('button');
        button.textContent = number;
        button.addEventListener('click', () => handleGuess(number, button));
        numberRow.appendChild(button);
    });
    keyboardContainer.appendChild(numberRow);

    // Create letter row (a-z)
    const letterRow = document.createElement('div');
    letterRow.classList.add('letter-row');
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    alphabet.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter, button));
        letterRow.appendChild(button);
    });
    keyboardContainer.appendChild(letterRow);
}

// Handle letter guesses
function handleGuess(letter, button) {
    button.disabled = true;

    if (nbaTeamToGuess.includes(letter)) {
        button.classList.add('correct'); // Green for correct guess
        nbaTeamToGuess.split('').forEach((char, index) => {
            if (char === letter) {
                guessedTeam[index] = letter;
            }
        });
    } else {
        button.classList.add('wrong'); // Red for wrong guess
        chances--;
    }

    updateDisplay();
    checkWinOrLose();
}

// Check if the player has won or lost
function checkWinOrLose() {
    if (guessedTeam.join('') === nbaTeamToGuess) {
        wins++;
        alert('You guessed the team correctly!');
        updateGuessedTeams(nbaTeamToGuess, true); // Pass true for correct guess
        startGame();
    } else if (chances === 0) {
        losses++;
        alert(`You lost! The team was ${nbaTeamToGuess}`);
        updateGuessedTeams(nbaTeamToGuess, false); // Pass false for incorrect guess
        startGame();
    }
}

// Update the side panel with guessed teams
function updateGuessedTeams(team, isCorrect) {
    guessedTeams.push(team);
    const teamListItem = document.createElement('li');
    teamListItem.textContent = team;

    // Apply green color if correct, red if wrong
    if (isCorrect) {
        teamListItem.classList.add('correct-team'); // Green for correct guess
    } else {
        teamListItem.classList.add('wrong-team'); // Red for incorrect guess
    }

    // Append to the guessed teams list
    teamsGuessedList.appendChild(teamListItem);
}

// Reset the game
resetBtn.addEventListener('click', startGame);

// Reset score and clear guessed teams
function resetScore() {
    wins = 0;
    losses = 0;
    guessedTeams = [];
    teamsGuessedList.innerHTML = ""; // Clear the list of guessed teams
    updateDisplay();
}

// Reset score event listener
resetScoreBtn.addEventListener('click', resetScore);

// Shuffle the teams at the beginning
shuffle(remainingTeams);

// Initialize the game
startGame();
