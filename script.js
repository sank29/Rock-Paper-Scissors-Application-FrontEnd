let scoreboard = JSON.parse(window.localStorage.getItem("scoreBoard")) || null;
let runButton = document.getElementById("run");

let getPlayerChoice = () => {
  let allDivs = document.getElementsByClassName("carousel-item");

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
  console.log(data);

  if (scoreboard == null) {
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

  if (data.finalResult == "Player wins") {
    playerScore += 1;
  } else if (data.finalResult == "Computer wins") {
    computerScore += 1;
  } else {
    tiescore += 1;
  }

  let updatedScore = new ScoreBoard(playerScore, computerScore, tiescore);

  window.localStorage.setItem("scoreBoard", JSON.stringify(updatedScore));

  // display this result on page

  displayScoreBoard();
};

let displayScoreBoard = () => {
  scoreboard = JSON.parse(window.localStorage.getItem("scoreBoard"));

  if (scoreboard == null) {
    return 0;
  }

  let playerScore = document.getElementById("playerScore");
  let computerScore = document.getElementById("ComputerScore");
  let tieScore = document.getElementById("tieScore");

  playerScore.innerText = scoreboard.playerScore;
  computerScore.innerText = scoreboard.computerScore;
  tieScore.innerText = scoreboard.tieScore;
};

runButton.addEventListener("click", async (event) => {
  let imgNumber = getPlayerChoice();

  let playerChoice = 0;

  if (imgNumber == 1) {
    playerChoice = "rock";
  } else if (imgNumber == 2) {
    playerChoice = "paper";
  } else {
    playerChoice = "scissors";
  }

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

  let returnData = await fetch(url);

  let data = await returnData.json();

  return data;
};

// after reloading scoreboard will show up

displayScoreBoard();
