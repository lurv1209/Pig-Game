'use strict';

// Set the score to win
const scoreToWin = 20;
// Selecting elements
const player0_element = document.querySelector('.player--0');
const player1_element = document.querySelector('.player--1');
const score0_element = document.querySelector('#score--0');
const score1_element = document.getElementById('score--1');
const current0_element = document.getElementById('current--0');
const current1_element = document.getElementById('current--1');
const dice_element = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playing = true;
let scores = [0, 0];
let active_player = 0;
let current_score = 0;

function switch_player() {
  // Set current score of previous player to 0
  current_score = 0;
  document.getElementById(`current--${active_player}`).textContent = 0;

  // Switch player
  active_player = 1 - active_player;
  player0_element.classList.toggle('player--active');
  player1_element.classList.toggle('player--active');
}

function playerWins() {
  playing = false;
  dice_element.classList.add('hidden');
  document
    .querySelector(`.player--${active_player}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${active_player}`)
    .classList.remove('player--active');
  document.querySelector(`#score--${active_player}`).textContent =
    scores[active_player] + current_score;
  document.querySelector(`#current--${active_player}`).textContent = 0;
}

function new_game() {
  score0_element.textContent = 0;
  score1_element.textContent = 0;
  current0_element.textContent = 0;
  current1_element.textContent = 0;
  current_score = 0;
  playing = true;

  document
    .querySelector(`.player--${active_player}`)
    .classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');

  active_player = 0;
  scores = [0, 0];
  dice_element.classList.add('hidden');
}

function rollDice() {
  if (playing) {
    // Generate random dice roll
    const random_dice = Math.trunc(6 * Math.random() + 1);

    // Display dice
    dice_element.classList.remove('hidden');
    dice_element.src = `dice-${random_dice}.png`;

    // Check if 1 was rolled; if yes, switch player
    if (random_dice !== 1) {
      // Add dice score to current score
      current_score += random_dice;
      // Get active player and set the current score
      document.getElementById(`current--${active_player}`).textContent =
        current_score;

      if (current_score + scores[active_player] >= scoreToWin) {
        playerWins();
      }
    } else {
      switch_player();
    }
  }
}

function holdFunc() {
  if (playing) {
    // Add current score to active player's score
    scores[active_player] += current_score;
    document.getElementById(`score--${active_player}`).textContent =
      scores[active_player];
    current_score = 0;

    // Check if score if >= scoreToWin
    if (scores[active_player] >= scoreToWin) {
      // Finish game
      playerWins();
    } else {
      // Switch player
      switch_player();
    }
  }
}

new_game();

// New game functionality
btnNew.addEventListener('click', new_game);

// Rolling dice functionality
btnRoll.addEventListener('click', rollDice);

// Holding score functionality
btnHold.addEventListener('click', holdFunc);

// 'r' key to roll dice and 'h' key to hold score
document.addEventListener('keydown', function (event) {
  if (event.key == 'r') {
    rollDice();
  } else if (event.key == 'h') {
    holdFunc();
  }
});
