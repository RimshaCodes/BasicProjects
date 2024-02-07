let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();



/*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
  }
  */

  let isAutoPlaying = false;
  let intervalId;

  // const autoPlay=() => {
    
  // }

  function autoPlay() {
    if(!isAutoPlaying) {
      intervalId=setInterval(() => {
        const playerMove=pickComputerMove();
        playGame(playerMove);
        document.querySelector('.js-auto-play-button').innerHTML='Stop Playing';
        //document.querySelector('.js-auto-play-button').classList.add("js-autoPlaying");
      }, 1000);
      isAutoPlaying = true;
    }
    else{
      document.querySelector('.js-auto-play-button').innerHTML='Auto Play';
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }

  document.body
  .addEventListener('keydown', (event)=>{
    if(event.key==='a')
    {
      autoPlay();
    }
    
  })

  document.querySelector('.js-rock-button')
  .addEventListener('click', ()=>{
    playGame('rock');
  })

  document.querySelector('.js-paper-button')
  .addEventListener('click', ()=>{
    playGame('paper');
  })

  document.querySelector('.js-scissor-button')
  .addEventListener('click', ()=>{
    playGame('scissors');
  })

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }
  else if(event.key === 'p'){
    playGame('paper');
  }
  else if(event.key === 's'){
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-move").innerHTML = `You
  <img src="images/${playerMove}-emoji.png" alt="rock" class="move-icon">
  <img src="images/${computerMove}-emoji.png" alt="scissors" class="move-icon"> Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

document.querySelector('.js-reset-score-button')
.addEventListener('click', ()=>{
  let displayMessage='';
  let html= ` 
  <div class="confirmation">
  <p class="message">Are you sure you want to reset the score?</p>
  <button class="js-op1">Yes</button>
  <button class="js-op2">No</button>
  </div> `
  displayMessage += html;
  
 document.querySelector('.js-displayMessage').innerHTML= displayMessage ;

  document.querySelector('.js-op1').addEventListener('click',()=>{
    document.querySelector('.js-displayMessage').innerHTML='';
    resetScore();
  })
  document.querySelector('.js-op2').addEventListener('click',()=>{
    document.querySelector('.js-displayMessage').innerHTML='';
  })
  
})

document.body
.addEventListener('keydown', (event)=>{
  if(event.key==='Backspace')
  {
    resetScore();
  }
})

document.querySelector('.js-auto-play-button')
.addEventListener('click', ()=>{
  autoPlay();
})





