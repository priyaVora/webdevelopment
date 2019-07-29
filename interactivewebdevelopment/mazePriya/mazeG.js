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
    this.distance = 0;
  } 
}

class Maze { 
  constructor(size) { 
    this.size = size;
    this.grid = [];    
    this.allCells = [];
    this.endCell = null;
    this.farthestCell = new Cell(0,0);
    this.startCell = null;
    this.addToPath = true;
    this.pathway = [];
    this.pathcopy = [];
    this.init();
    this.drawMaze(this,20);
    
    
  }

  generateRandomMaze(cell, direction, distance) { 
      cell.visited = true;
      //add a distance field --> cell
      cell.distance = distance;
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
              distance++;
              this.generateRandomMaze(cell.left, "L", distance);
              distance--;
              this.pathway.pop();
              cell.leftWall = false;
            }
        }
        if(ifArray[i] == "T"){
          if(cell.top && !cell.top.visited){
              distance++;
              this.generateRandomMaze(cell.top, "T", distance);
              distance--;
              this.pathway.pop();
              cell.topWall = false;
            }
        }
        if(ifArray[i] == "R"){
          if(cell.right && !cell.right.visited){
              distance++;
              this.generateRandomMaze(cell.right, "R", distance);
              distance--;
              this.pathway.pop();
              cell.rightWall = false;
            }
        }
        if(ifArray[i] == "B"){
          if(cell.bottom && !cell.bottom.visited){
              distance++;
              this.generateRandomMaze(cell.bottom, "B", distance);
              distance--;
              this.pathway.pop();
              cell.bottomWall = false;
            }
        }
        i++;
        
      }while(i < 4);
    
     if(cell.distance >= this.farthestCell.distance) { 
        this.farthestCell = cell;
        this.pathcopy = this.pathway.slice(0);
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
    this.startCell = this.grid[0][Math.floor(Math.random()*(this.size))];
    this.startCell.isStart = true;
    this.setAllNeighbors();
    this.generateRandomMaze(this.startCell, "z",0);
    this.endCell = this.farthestCell;
    this.endCell.isEnd = true;
    console.log('end celll', this.endCell);
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
    ctx.fillStyle = "#555";
    ctx.fillRect(0, 0, this.cellSize*this.size, this.cellSize*this.size);

    for(let j = 0; j < this.size; j++){
      for(let i = 0; i < this.size; i++){
        if(this.grid[i][j].isStart){
          ctx.beginPath();
          
          for(let path = 0; path < this.pathcopy.length; path++) { 
            let current = this.pathcopy[path];
            ctx.fillStyle = "yellow";
            ctx.fillRect((current.x*this.cellSize)+4,(current.y*this.cellSize)+4,this.cellSize-8,this.cellSize-8);
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

  moveCellDraw(blockSize, current) {
    this.cellSize = blockSize;
    let canvas = document.getElementById("grid");
    let ctx = canvas.getContext("2d");
      ctx.fillStyle = "yellow";
      ctx.fillRect((current.x*this.cellSize)+4,(current.y*this.cellSize)+4,this.cellSize-8,this.cellSize-8);
  }
}

let startPlayerMode = false;
let theMaze = new Maze(20);
let currentCell;
if(currentCell == undefined) { 
  currentCell = theMaze.startCell;
}

function solve() { 
  theMaze.botDraw(theMaze,20);
  alert("Awesome, you just made the bot solve the maze for you!! And you are just about to see it! Isn't it cool that I know?!");
}

function start(direction, currentCell) { 
  console.log("Start...");
  console.log("Direction", currentCell);
  theMaze.moveCellDraw(20, currentCell);
  if(currentCell === theMaze.endCell) { 
    alert("Awesome, you solved the maze!");
  }
  return currentCell;
}

function timer() { 
  startPlayerMode = true;
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
  if(startPlayerMode) { 
    switch (event.keyCode) {
      case 38:
          console.log("Up key is pressed");
          if(currentCell.top !== undefined) {
            if(currentCell.topWall !== true) { 
              currentCell = start("up",currentCell.top);
            } else { 
              //alert("You hit the wall!");
            }
          }
          break;
      case 40:
          console.log("Down key is pressed");
          if(currentCell.bottom !== undefined) {
            if(currentCell.bottomWall !== true) { 
              currentCell = start("down", currentCell.bottom);
            } else { 
              //alert("You hit the wall!");
            }
          }
          break;
      case 37:
          console.log("left key is pressed");
          if(currentCell.left !== undefined) {
            if(currentCell.leftWall !== true) { 
              currentCell = start("left",currentCell.left);
            } else { 
             // alert("You hit the wall!");
            }
          }
          break;
      case 39:
        console.log("Right key is pressed");
        if(currentCell.right !== undefined) {
          if(currentCell.rightWall !== true) { 
            currentCell = start("right", currentCell.right);
          } else { 
            //alert("You hit the wall!");
          }
        }
          break;
      }
    }
  }
  