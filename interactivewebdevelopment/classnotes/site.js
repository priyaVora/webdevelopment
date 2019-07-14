console.log("Running!");

function maze(size) { 
 this.size = size;
 this.grid = [];
 this.allCells = [];

 this.init = function() { 
    for(y=0; y < size; y++) { 
        this.grid[y] =[];
        for(x =0;  x < size; x++) { 
             var newCell = new cell(y,x);
             this.grid[y][x] = newCell;
             this.allCells.push(newCell);  
        }
    }
 }
}

function cell(y,x) { 
    this.y = y;
    this.x = x;
    this.isStart = false;
    this.isEnd = false;

    this.visited = false;

    // My Neighbors?
     
    this.left = null;
    this.top = null; 
    this.right = null;
    this.bottom = null;

    this.leftWall = true;
    // and more...
}