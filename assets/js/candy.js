var candies = ["blue", "orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currentTile;
var otherTile;

window.onload = function () {
  startGame();

  // 0.1 second
  window.setInterval(function () {
    crush();
    slideCandy();
    generateCandy();
  }, 100);
};

function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      // Create 9 * 9 original board
      let tile = document.createElement("img");
      tile.class = r.toString() + "-" + c.toString();
      tile.id = r.toString() + "-" + c.toString();
      tile.src = "./assets/images/" + randomCandy() + ".png";

      // DRAG FUNCTIONALITY: multi-step process
      //click on a candy, initialize drag process
      tile.addEventListener("dragstart", dragStart);
      //click on candy, move mouse to drag the candy
      tile.addEventListener("dragover", dragOver);
      //drag candy onto another candy
      tile.addEventListener("dragenter", dragEnter);
      //leave candy over another candy
      tile.addEventListener("dragleave", dragLeave);
      //drop onto a candy
      tile.addEventListener("drop", dragDrop);
      //after draging process completed, we actually swap candies
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }

  console.log(board);
}

function dragStart() {
  currentTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this;
}

function dragEnd() {
  // Make sure neither are blank while drag ends
  if (currentTile.src.includes("blank") || otherTile.src.includes("blank")) {
    return;
  }

  // Ajustment: only cross coord allowed
  let currentCoords = currentTile.id.split("-");
  let r = parseInt(currentCoords[0]);
  let c = parseInt(currentCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r1 = parseInt(otherCoords[0]);
  let c1 = parseInt(otherCoords[1]);

  let moveLeft = c1 == c - 1 && r1 == r;
  let moveRight = c1 == c + 1 && r1 == r;
  let moveUp = c1 == c && r1 == r - 1;
  let moveDown = c1 == c && r1 == r + 1;
  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currentImg = currentTile.src;
    let otherImg = otherTile.src;
    currentTile.src = otherImg;
    otherTile.src = currentImg;

    let validMove = checkValid();
    if (!validMove) {
      // Swap back
      let currentImg = currentTile.src;
      let otherImg = otherTile.src;
      currentTile.src = otherImg;
      otherTile.src = currentImg;
    }
  }
}

function crush() {
  crushThree();
  document.getElementById("score").innerText = score;
}

function crushThree() {
  //check rows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./assets/images/blank.png";
        candy2.src = "./assets/images/blank.png";
        candy3.src = "./assets/images/blank.png";
        score += 30;
      }
    }
  }

  //check columns
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./assets/images/blank.png";
        candy2.src = "./assets/images/blank.png";
        candy3.src = "./assets/images/blank.png";
        score += 30;
      }
    }
  }
}

function checkValid() {
  //check rows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        return true;
      }
    }
  }

  //check columns
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        return true;
      }
    }
  }

  return false;
}

function slideCandy() {
  for (let c = 0; c < columns; c++) {
    let ind = rows - 1;
    for (let r = rows - 1; r >= 0; r--) {
      if (!board[r][c].src.includes("blank")) {
        board[ind][c].src = board[r][c].src;
        ind--;
      }
    }

    for (let r = ind; r >= 0; r--) {
      board[r][c].src = "./assets/images/blank.png";
    }
  }
}

function generateCandy() {
  for (let c = 0; c < columns; c++) {
    if (board[0][c].src.includes("blank")) {
      board[0][c].src = "./assets/images/" + randomCandy() + ".png";
    }
  }
}
