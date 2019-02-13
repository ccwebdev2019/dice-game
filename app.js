/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Declare variables
var playUntil, scores, roundScore, activePlayer, gamePlaying, lastDice;

  init();


document.querySelector('.btn-roll').addEventListener('click', function(){

  if(gamePlaying){

    //Random Number
     var dice = Math.floor(Math.random() * 6) + 1;

    //Display Result
     var diceDom = document.querySelector('.dice');
     diceDom.style.display = 'block';

    //Show correct dice image
    diceDom.src = 'dice-' + dice + '.png';

    // Update round score IF rolled number is 1

    if( dice === 6 && lastDice === 6){

      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      nextPlayer();

    } else if( dice > 1){
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
      nextPlayer();
    }

    lastDice = dice;
  }

});

document.querySelector('.btn-hold').addEventListener('click', function(){

  if(gamePlaying){
    //Store roundScore in Players Score
    scores[activePlayer] += roundScore;

    //Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //Play Until Store Number
    playUntil = document.querySelector('.play-until').value;
    var winningScore;
    //Undefined, 0, null or "" are coerced to false
    //anything else is coerced to true

    if(playUntil){
      winningScore = playUntil;
    } else {
      winningScore = 20;
    }

    if(scores[activePlayer] >= winningScore){
      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {

      nextPlayer();

    }

  }

});

//Next player function
function nextPlayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.querySelector('#current-0').textContent = roundScore;
    document.querySelector('#current-1').textContent = roundScore;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

//Init function
function init(){
  scores = [0,0,];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  dice = Math.floor(Math.random() * 6) + 1;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
