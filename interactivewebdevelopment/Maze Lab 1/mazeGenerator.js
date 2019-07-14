class Cell { 
    constructor(y,x) { 
        this.x = x;
        this.y = y;
        
        this.visited = false;
        this.left = null;
        this.top = null; 
        this.right = null;
        this.bottom = null;
        
        this.leftWall = true;
        this.rightWall = true;
        this.bottomWall = true;
        this.topWall = true;
    }
}

class Maze { 
    constructor(size) { 
        this.size = size;
        this.grid = [];
        this.isStart = undefined;
        this.isEnd = undefined;
        this.allCells = new Array();
        this.init(size);
        this._selectStart();
        this._selectEnd();
        this.pattern = this._selectAdjacentCellPattern();
        this.dfs(this.isStart);
        // console.log(this.grid);
    }
    setAllNeighbors(cellNumber, size) { 
        if((cellNumber+1) > (size * size)) { 
                    return;
        } 
        let selectedNode = this.allCells[Object.keys(this.allCells)[cellNumber]];
        selectedNode.left = this.leftNeighborExist(selectedNode,this.grid);
        selectedNode.right = this.rightNeighborExist(selectedNode, size, this.grid);
        selectedNode.top = this.topNeighborExist(selectedNode, this.grid);
        selectedNode.bottom = this.bottomNeighborExist(selectedNode, size, this.grid);
        this.setAllNeighbors(cellNumber+1, size);
    }

    dfs(cell) { 
       //Randomly select a node onto a queue Q
       console.log("\nStart is already selected: " + this.isStart.x + "," + this.isStart.y);
       
       //Push the node N onto a queue Q 
        let N = cell;
       let queue = new Array();
       queue.push(N);
       console.log("Cell pushed to queue.\n\n");
       
       //mark the cell N as visited
       N.visited = true;

       //randomly select an adjacent cell
      let count = 0;
      let A = undefined;
      let neighborCount = this._getNeighborCount(N);
      let neighborsFound = 0;
      console.log("Get unvisited neighbor count: " + neighborCount);
      while(count < this.pattern.length) { 
        if(this.pattern[count] === "L" && (N.left !== undefined && N.left !== null)) { 
            //check for side neighbor
            //make sure this one has not been visited
            if(N.left.visited !== true) { 
                console.log("Left Neighbor is here.");
                A = N.left;
                //break the wall between N and A
                N.leftWall = false;
                A.rightWall = false;
                neighborsFound++;
            }
        } else if(this.pattern[count] === "B" && (N.bottom !== undefined && N.bottom !== null)) { 
            if(N.bottom.visited !== true) { 
                console.log("Bottom Neighbor is here.");
                A = N.bottom;
                //break the wall between N and A
                N.bottomWall = false;
                A.topWall = false;
                console.log("Bottom: A");
                console.log(A);
                neighborsFound++;
            }
        } else if(this.pattern[count] === "T" && (N.top !== undefined && N.top !== null)) { 
            if(N.top.visited !== true) { 
                console.log("Top Neighbor is here.");
                A = N.top;
                //break the wall between N and A
                N.topWall = false;
                A.bottomWall = false;
                neighborsFound++;
            }          
        } else if(this.pattern[count] === "R" && (N.right !== undefined && N.right !== null)) { 
            if(cell.right.visited !== true) { 
                console.log("Right Neighbor is here.");
                A = N.right;
                //break the wall between N and A
                N.rightWall = false;
                N.leftWall = false;
                neighborsFound++;
            }
        }
        count+= 1;
        if(neighborsFound === neighborCount) { 
            queue.pop();
            console.log("Queue popped.");
            //assign the value A to N
            N = A;
            //Push the node N onto a queue Q
            queue.push();
            console.log("Queue pushed");
        }
      }

      console.log("Grid: ");
      console.log(this.grid);
    }



    _getNeighborCount(cell) { 
        let count = 0;
        if(cell.left != null || cell.right != undefined) { 
            if(cell.left.visited !== true) { 
                count++;
            }
        }

        if(cell.right != null || cell.right != undefined) { 
            if(cell.left.visited !== true) { 
                count++;
            }
        }

        if(cell.top != null || cell.top != null) {
            if(cell.top.visited !== true) { 
                count++;
            }   
        }

        if(cell.bottom != null || cell.bottom != null) {
            if(cell.bottom.visited !== true) { 
                count++;
            } 
        }
        return count;
    }

    _shuffle(array) { 
        return array.sort(() => Math.random() -0.5);
    }

    _selectAdjacentCellPattern(cell) { 
        let neighbors = ["L" , "B", "T", "R"];
        return this._shuffle(neighbors);
    }

    _selectAdjacentCell() { 

    }

    _selectStart() {
        // let startCell = Math.floor(Math.random() * (this.size*this.size));
         let selectedNode = this.allCells[Object.keys(this.allCells)[1]]; 
         this.isStart = selectedNode;
         console.log("Start Node: ");
         console.log(selectedNode); 
    }

    _selectEnd() { 
        // let endCell = Math.floor(Math.random() * (this.size*this.size));
        let endNode = this.allCells[Object.keys(this.allCells)[2]]; 
        if(endNode.x === this.isStart.x && endNode.y === this.isStart.y) { 
            this._selectEnd();
        } else { 
            this.isEnd = endNode;
            console.log("End Node: ");
            console.log(endNode);
        }
    }

    init(size) { 
        for(let y=0; y < size; y++) { 
                this.grid[y] =[];
                for(let x =0;  x < size; x++) { 
                    let list = new Array();
                    let  newCell = new Cell(y,x);
                    list.push(newCell);
                    this.grid[y][x] = list;
                    this.allCells.push(newCell);  
                    }
                }
                this.setAllNeighbors(0, size); 
                console.log(this.grid);     
    }
   
    leftNeighborExist(cell, cells) {
        if(cell.x > 0) {
                return cells[cell.y][cell.x-1];
        }
    }
    rightNeighborExist(cell, size, cells) { 
        if((cell.x + 1) < size) { 
            return cells[cell.y][cell.x+1];        
        } 
    }
    bottomNeighborExist(cell, size, cells) { 
        if((cell.y +1)< size) { 
            return cells[cell.y+1][cell.x];
        }
    }
    topNeighborExist(cell, cells) { 
        if(cell.y > 0) { 
            return cells[cell.y-1][cell.x];
        }
    }
}


let myMaze = new Maze(2);