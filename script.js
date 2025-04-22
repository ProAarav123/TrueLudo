// Simple Ludo basics for 2-4 players
// Tokens move on a single track path (not full board paths yet)
// Dice rolls, turns, and winner detection
// Futuristic neon style logic

const playerCount = parseInt(sessionStorage.getItem('playerCount')) || 4;
const playerName = sessionStorage.getItem('playerName') || 'Player';

const colors = ['red', 'green', 'yellow', 'blue'];
const players = colors.slice(0, playerCount);

const board = document.getElementById('board');
const diceEl = document.getElementById('dice');
const rollBtn = document.getElementById('rollBtn');
const info = document.getElementById('info');
const winnerScreen = document.getElementById('winnerScreen');
const winnerText = document.getElementById('winnerText');

let currentPlayerIndex = 0;
let diceValue = 1;

// Each player has 4 tokens; tokens start at -1 (base)
const tokens = {};
players.forEach(color => {
  tokens[color] = [-1, -1, -1, -1];
});

// Linear track length (simplified)
const trackLength = 28;

// Positions for tokens on the board grid (will position later)
const tokenPositions = [];

// Create board cells
function createBoard() {
  for(let i=0; i<225; i++){ // 15x15 grid
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
}

// Roll dice function
function rollDice() {
  diceValue = Math.floor(Math.random() * 6) + 1;
  diceEl.textContent = `🎲 ${diceValue}`;
  info.textContent = `${players[currentPlayerIndex].toUpperCase()}'s turn: Roll is ${diceValue}`;

  // Player moves token after rolling dice
  moveToken(players[currentPlayerIndex], diceValue);
}

// Move token logic (simplified: moves first token it can)
function moveToken(player, roll) {
  // Find a token that can move
  let moved = false;
  for(let i=0; i<4; i++) {
    let pos = tokens[player][i];
    if(pos === -1 && roll === 6) {
      tokens[player][i] = 0; // Enter track
      moved = true;
      info.textContent = `${player.toUpperCase()} token ${i+1} entered the board!`;
      break;
    } else if(pos >= 0 && pos + roll < trackLength) {
      tokens[player][i] += roll;
      moved = true;
      info.textContent = `${player.toUpperCase()} token ${i+1} moved to position ${tokens[player][i]}`;
      break;
    }
  }
  if(!moved) {
    info.textContent = `${player
