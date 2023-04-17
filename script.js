// getting data from localStorage
let scoreboard = JSON.parse(window.localStorage.getItem("scoreBoard")) || null;

let runButton = document.getElementById("runApplication");

let resetButton = document.getElementById("resetButton");

let getPlayerChoice = () => {
  let allDivs = document.getElementsByClassName("carousel-item");

  // what this loop does it's cheak what user choose it's choose and then this loop will going to find out active
  // class property to it according to get the user choice.

  for (i = 0; i <= allDivs.length - 1; i++) {
    let className = allDivs[i].className.split(" ");

    if (className.includes("active")) {
      return i + 1;
    }
  }
};

// class for showing the result of plyaer and computer

class ScoreBoard {
  constructor(playerScore, computerScore, tieScore) {
    this.playerScore = playerScore;
    this.computerScore = computerScore;
    this.tieScore = tieScore;
  }
}

let setScoreBoard = (data) => {
  if (scoreboard == null) {
    // if scoreboad is null then set scoreboard object in localStorage

    window.localStorage.setItem(
      "scoreBoard",
      JSON.stringify(new ScoreBoard(0, 0, 0))
    );
  }

  let databasescoreBoard = JSON.parse(
    window.localStorage.getItem("scoreBoard")
  );

  let playerScore = databasescoreBoard.playerScore;
  let computerScore = databasescoreBoard.computerScore;
  let tiescore = databasescoreBoard.tieScore;

  // checking who is winning or not and updating the value

  if (data.finalResult == "Player wins") {
    playerScore += 1;
  } else if (data.finalResult == "Computer wins") {
    computerScore += 1;
  } else {
    tiescore += 1;
  }

  let updatedScore = new ScoreBoard(playerScore, computerScore, tiescore);

  // set the updated score in localStorage

  window.localStorage.setItem("scoreBoard", JSON.stringify(updatedScore));

  // display this result on page

  displayScoreBoard();
};

// this funcation will display the scores on top on the application
let displayScoreBoard = () => {
  scoreboard = JSON.parse(window.localStorage.getItem("scoreBoard"));

  // if scoreboard is null then don't go further
  if (scoreboard == null) {
    return 0;
  }

  let playerScore = document.getElementById("playerScore");
  let computerScore = document.getElementById("ComputerScore");
  let tieScore = document.getElementById("tieScore");

  // setting up the value in inner text of that tags

  playerScore.innerText = scoreboard.playerScore;
  computerScore.innerText = scoreboard.computerScore;
  tieScore.innerText = scoreboard.tieScore;
};

runButton.addEventListener("click", async (event) => {
  // it will going to get player choice in number 1,2 or 3
  let imgNumber = getPlayerChoice();

  let playerChoice = 0;

  // it will going to set playerchoice with given number

  if (imgNumber == 1) {
    playerChoice = "rock";
  } else if (imgNumber == 2) {
    playerChoice = "paper";
  } else {
    playerChoice = "scissors";
  }

  // it is getting data from backend

  let data = await getData(playerChoice);

  // change computer choice img

  let compuerImg = document.getElementById("questionMark");

  if (data.computerChoice == "rock") {
    compuerImg.src = "./img/rock.png";
  } else if (data.computerChoice == "paper") {
    compuerImg.src = "./img/paper.webp";
  } else {
    compuerImg.src = "./img/scissors.webp";
  }

  let winHeading = document.getElementById("vs");

  winHeading.innerText = data.finalResult;
  winHeading.className = "display-4";

  setScoreBoard(data);
});

let getData = async (playerChoice) => {
  let url = `http://localhost:8888/play/${playerChoice}`;

  // It is making request in backend to calculate the final result and get the data from backend
  // containing final result in it.

  let returnData = await fetch(url);

  let data = await returnData.json();

  return data;
};

// after reloading scoreboard will show up

displayScoreBoard();

// reset the score board

resetButton.addEventListener("click", (event) => {
  console.log("hIII");
  let updatedScore = new ScoreBoard(0, 0, 0);

  // set the updated score in localStorage

  window.localStorage.setItem("scoreBoard", JSON.stringify(updatedScore));

  displayScoreBoard();
});
