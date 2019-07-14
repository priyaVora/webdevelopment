class Cell{
  constructor(y,x) { 
    this.y = y;
    this.x = x;
    this.isStart = false;
    this.isEnd = false;
  
    this.visited = false;
    this.left = null;
    this.top = null;
    this.right = null;
    this.bottom = null;
    this.leftWall = true;
    this.topWall = true;
    this.rightWall = true;
    this.bottomWall = true;
  } 
}

class Maze { 
  constructor(size) { 
    this.size = size;
    this.grid = [];    
    this.allCells = [];
    this.endCell = null;
    this.startCell = null;
    this.addToPath = true;
    this.pathway = [];
    this.pathcopy = [];
    this.init();
    this.drawMaze(this,20);
  }

  generateRandomMaze(cell, direction) { 
      cell.visited = true;
      this.pathway.push(cell);

      if(direction == "L"){
        cell.rightWall = false;
      }
      
      else if(direction == "T"){
        cell.bottomWall = false;
      }
     
      else if(direction == "R"){
        cell.leftWall = false;
      }
    
      else if(direction == "B"){
        cell.topWall = false;
      }
      
      let ifArray =["L", "T", "R", "B"];
      ifArray = this.shuffle(ifArray);
  
      let i = 0
      do{
        if(ifArray[i] == "L"){
          if(cell.left && !cell.left.visited){
              this.generateRandomMaze(cell.left, "L");
              this.pathway.pop();
              cell.leftWall = false;
            }
        }
        if(ifArray[i] == "T"){
          if(cell.top && !cell.top.visited){
              this.generateRandomMaze(cell.top, "T");
              this.pathway.pop();
              cell.topWall = false;
            }
        }
        if(ifArray[i] == "R"){
          if(cell.right && !cell.right.visited){
              this.generateRandomMaze(cell.right, "R");
              this.pathway.pop();
              cell.rightWall = false;
            }
        }
        if(ifArray[i] == "B"){
          if(cell.bottom && !cell.bottom.visited){
              this.generateRandomMaze(cell.bottom, "B");
              this.pathway.pop();
              cell.bottomWall = false;
            }
        }
        i++;
        
      }while(i < 4);
      if(cell.isEnd === true) { 
        console.log(cell.x, cell.y);
        this.pathcopy = this.pathway.slice(0);
        console.log(this.pathcopy);
      }
      return;
  }

  shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
      let j = Math.floor(Math.random()*(i+1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  setAllNeighbors() {
    for(let y = 0;y < this.size;y++){
      for(let x = 0;x < this.size;x++){
        let cell = this.grid[y][x];
        //left
        if(x > 0){
          cell.left = this.grid[y][x-1];
        }
        //top
        if(y > 0){
          cell.top = this.grid[y-1][x];
        }
        //right
        if(x < this.size - 1){
          cell.right = this.grid[y][x+1];
        }
        //bottom
        if(y < this.size - 1){
          cell.bottom = this.grid[y+1][x];
        }

      }
    }
  }
  
  init() {
    for(let y = 0; y < this.size; y++){
      this.grid[y] = [];
      for(let x = 0; x < this.size; x++){
        let newCell = new Cell(y,x);
        this.grid[y][x] = newCell;
        this.allCells.push(newCell);
      }
    }

    this.endCell = this.grid[this.size-1][Math.floor(Math.random()*(this.size))];
    this.endCell.isEnd = true;

    this.startCell = this.grid[0][Math.floor(Math.random()*(this.size))];
    
    
    this.startCell.isStart = true;
    this.setAllNeighbors();
    this.generateRandomMaze(this.startCell, "z");
  }

  drawMaze (maze, blockSize){
    this.cellSize = blockSize;
    this.grid = maze.grid;
    this.size = maze.size;
    let canvas = document.getElementById("grid");
    let ctx = canvas.getContext("2d");
    canvas.width = this.size * this.cellSize;
    canvas.height =  this.size * this.cellSize;
    ctx.fillStyle = "#555";
    ctx.fillRect(0, 0, this.cellSize*this.size, this.cellSize*this.size);

    for(let i = 0; i < this.size; i++){
      for(let j = 0; j < this.size; j++){
        if(this.grid[i][j].isStart){
          ctx.beginPath();
          ctx.fillStyle = "green";
          ctx.fillRect((j*this.cellSize),(i*this.cellSize),this.cellSize,this.cellSize);
          ctx.closePath();
        }
        if(this.grid[i][j].isEnd){
          ctx.beginPath();
          ctx.fillStyle = "red";
          ctx.fillRect((j*this.cellSize),(i*this.cellSize),this.cellSize,this.cellSize);
          ctx.closePath();
        }
        
        if(this.grid[i][j].topWall){
          ctx.beginPath();
          ctx.moveTo((j*this.cellSize),(i*this.cellSize));
          ctx.lineTo((j*this.cellSize)+this.cellSize,(i*this.cellSize));
          ctx.closePath();
          ctx.stroke();
        }
        if(this.grid[i][j].leftWall){
          ctx.beginPath();
          ctx.moveTo((j*this.cellSize),(i*this.cellSize));
          ctx.lineTo((j*this.cellSize),(i*this.cellSize)+this.cellSize);
          ctx.closePath();
          ctx.stroke();
        }
      
        if(this.grid[i][j].bottomWall){
          ctx.beginPath();
          ctx.moveTo((j*this.cellSize),(i*this.cellSize)+this.cellSize);
          ctx.lineTo((j*this.cellSize)+this.cellSize,(i*this.cellSize)+this.cellSize);
          ctx.closePath();
          ctx.stroke();
        }
        if(this.grid[i][j].rightWall){
          ctx.beginPath();
          ctx.moveTo((j*this.cellSize)+this.cellSize,(i*this.cellSize));
          ctx.lineTo((j*this.cellSize)+this.cellSize,(i*this.cellSize)+this.cellSize);
          ctx.closePath();
          ctx.stroke();
        }
      }
  }
  }

  fill(ctx, color) { 
    ctx.fillStyle = color;
  } 

  botDraw(maze, blockSize) {
    this.cellSize = blockSize;
    this.grid = maze.grid;
    this.size = maze.size;
    let canvas = document.getElementById("grid");
    let ctx = canvas.getContext("2d");
   
    canvas.width = this.size * this.cellSize;
    canvas.height = this.size * this.cellSize;
    ctx.fillStyle = "#fab";
    ctx.fillRect(0, 0, this.cellSize*this.size, this.cellSize*this.size);

    for(let j = 0; j < this.size; j++){
      for(let i = 0; i < this.size; i++){
        if(this.grid[i][j].isStart){
          ctx.beginPath();
          
          for(let path = 0; path < this.pathcopy.length; path++) { 
            let current = this.pathcopy[path];
            ctx.fillStyle = "blue";
            ctx.fillRect((current.x*this.cellSize)+4,(current.y*this.cellSize)+4,this.cellSize-4,this.cellSize-4);
          }
          ctx.fillStyle = "green";
          ctx.fillRect((j*this.cellSize),(i*this.cellSize),this.cellSize,this.cellSize);
          ctx.closePath();
        }
        if(this.grid[i][j].isEnd){
          ctx.beginPath();
          ctx.fillStyle = "red";
          ctx.fillRect((j*this.cellSize),(i*this.cellSize),this.cellSize,this.cellSize);
          ctx.closePath();
        }
        if(this.grid[i][j].leftWall){
          ctx.beginPath();
          ctx.moveTo((j*this.cellSize),(i*this.cellSize));
          ctx.lineTo((j*this.cellSize),(i*this.cellSize)+this.cellSize);
          ctx.closePath();
          ctx.stroke();
        }
        if(this.grid[i][j].topWall){
          ctx.beginPath();
          ctx.moveTo((j*this.cellSize),(i*this.cellSize));
          ctx.lineTo((j*this.cellSize)+this.cellSize,(i*this.cellSize));
          ctx.closePath();
          ctx.stroke();
        }
        if(this.grid[i][j].rightWall){
          ctx.beginPath();
          ctx.moveTo((j*this.cellSize)+this.cellSize,(i*this.cellSize));
          ctx.lineTo((j*this.cellSize)+this.cellSize,(i*this.cellSize)+this.cellSize);
          ctx.closePath();
          ctx.stroke();
        }
        if(this.grid[i][j].bottomWall){
          ctx.beginPath();
          ctx.moveTo((j*this.cellSize),(i*this.cellSize)+this.cellSize);
          ctx.lineTo((j*this.cellSize)+this.cellSize,(i*this.cellSize)+this.cellSize);
          ctx.closePath();
          ctx.stroke();
        }
      }
  }
  }

  moveCellDraw(maze, blockSize, cell) {
    this.cellSize = blockSize;
    this.grid = maze.grid;
    this.size = maze.size;
    let canvas = document.getElementById("grid");
    let ctx = canvas.getContext("2d");
    
    canvas.width = this.size * this.cellSize;
    canvas.height = this.size * this.cellSize;
    ctx.fillStyle = "#555";
    ctx.fillRect(0, 0, this.cellSize*this.size, this.cellSize*this.size);

    for(let j = 0; j < this.size; j++){
      for(let i = 0; i < this.size; i++){
        if(this.grid[i][j].isStart){
          ctx.beginPath();
          
          for(let path = 0; path < this.pathcopy.length; path++) {
            let current = this.pathcopy[path];
            if(cell == current) { 
              ctx.fillStyle = "blue";
              ctx.fillRect((current.x*this.cellSize)+4,(current.y*this.cellSize)+4,this.cellSize-4,this.cellSize-4);
              console.log(path, this.pathcopy[path]);
            }
          }
          ctx.fillStyle = "green";
          ctx.fillRect((j*this.cellSize),(i*this.cellSize),this.cellSize,this.cellSize);
          ctx.closePath();
        }
        if(this.grid[i][j].isEnd){
          ctx.beginPath();
          ctx.fillStyle = "red";
          ctx.fillRect((j*this.cellSize),(i*this.cellSize),this.cellSize,this.cellSize);
          ctx.closePath();
        }
        if(this.grid[i][j].leftWall){
          ctx.beginPath();
          ctx.moveTo((j*this.cellSize),(i*this.cellSize));
          ctx.lineTo((j*this.cellSize),(i*this.cellSize)+this.cellSize);
          ctx.closePath();
          ctx.stroke();
        }
        if(this.grid[i][j].topWall){
          ctx.beginPath();
          ctx.moveTo((j*this.cellSize),(i*this.cellSize));
          ctx.lineTo((j*this.cellSize)+this.cellSize,(i*this.cellSize));
          ctx.closePath();
          ctx.stroke();
        }
        if(this.grid[i][j].rightWall){
          ctx.beginPath();
          ctx.moveTo((j*this.cellSize)+this.cellSize,(i*this.cellSize));
          ctx.lineTo((j*this.cellSize)+this.cellSize,(i*this.cellSize)+this.cellSize);
          ctx.closePath();
          ctx.stroke();
        }
        if(this.grid[i][j].bottomWall){
          ctx.beginPath();
          ctx.moveTo((j*this.cellSize),(i*this.cellSize)+this.cellSize);
          ctx.lineTo((j*this.cellSize)+this.cellSize,(i*this.cellSize)+this.cellSize);
          ctx.closePath();
          ctx.stroke();
        }
      }
  }
  }
}

let theMaze = new Maze(40);
let currentCell;
if(currentCell == undefined) { 
  currentCell = theMaze.startCell;
}

function solve() { 
  theMaze.botDraw(theMaze,20);
}

function start(direction, currentCell) { 
  if(currentCell.x >= theMaze.size) {
    alert("You hit the wall!");
  }
  console.log("Start...");
  console.log("Direction", currentCell);
  theMaze.moveCellDraw(theMaze, 20, currentCell);
  if(currentCell === theMaze.endCell) { 
    alert("Awesome, you solved the maze!");
  }
  return currentCell;
}

function timer() { 
  let minutesLabel = document.getElementById("m");
  let secondsLabel = document.getElementById("s");
  let totalSecs = 0;
  setInterval(setTime, 1000);
  
  function setTime() {
    ++totalSecs;
    secondsLabel.innerHTML = time_second(totalSecs % 60);
    minutesLabel.innerHTML = time_second(parseInt(totalSecs / 60));
  }
  
  function time_second(val) {
    let valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }  
}

document.onkeydown = function myFunction() {

  console.log("Current Start", currentCell);
  switch (event.keyCode) {
  case 38:
      console.log("Up key is pressed");
     

      if(currentCell.top !== undefined) {
        console.log(currentCell.top);
        console.log(currentCell.topWall);
        if(currentCell.topWall !== true) { 
          currentCell = start("up",currentCell.top);
        } else { 
          alert("You hit the wall!");
        }
      }
      break;
  case 40:
      console.log("Down key is pressed");
      if(currentCell.bottom !== undefined) {
        console.log(currentCell.bottom);
        console.log(currentCell.bottomWall);
        if(currentCell.bottomWall !== true) { 
          currentCell = start("down", currentCell.bottom);
        } else { 
          alert("You hit the wall!");
        }
      }
      break;
  case 37:
      console.log("left key is pressed");
      if(currentCell.left !== undefined) {
        console.log(currentCell.left);
        console.log(currentCell.leftWall);
        if(currentCell.leftWall !== true) { 
          currentCell = start("left",currentCell.left);
        } else { 
          alert("You hit the wall!");
        }
      }
      break;
  case 39:
    console.log("Right key is pressed");
    if(currentCell.right !== undefined) {
      console.log(currentCell.right);
      console.log(currentCell.rightWall);
      if(currentCell.rightWall !== true) { 
        currentCell = start("right", currentCell.right);
      } else { 
        alert("You hit the wall!");
      }
    }
      break;
  }
}