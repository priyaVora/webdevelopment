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
        this.checkCount = 0; 
        this.size = size;
        this.grid = [];
        this.isStart = undefined;
        this.isEnd = undefined;
        this.allCells = new Array();
        this.init(size);
        this._selectStart();
        this._selectEnd();
        this.pattern = this._selectAdjacentCellPattern();
        this.gen(this.isStart);
        this.draw(this.size);
    }

    gen(cell) { 
        console.log("Maze Generation...");
        cell.visited = true;
        console.log(cell);
        let count =0;
        let queue = new Array();
        let non_visited_neighbors = new Array();
        queue.push(cell);
         
        console.log("Queue: ");
        console.log(queue);

        while(count < 4) {
           if(this.pattern[count] === "L") { 
               if(cell.left !== undefined) { 
                if(cell.left.visited !== true) { 
                    console.log("Left Neighbor is not visited");
                    console.log(cell.left[0]);
                    non_visited_neighbors.push({cell: cell.left[0], direction: "L"});
                }
               }
           } else if(this.pattern[count] === "R") {
               if(cell.right !== undefined) { 
                if(cell.right.visited !== true) { 
                    console.log("Right Neighbor is not visited");
                    non_visited_neighbors.push({
                        cell: cell.right[0], 
                        direction: "R"
                    });   
                }
               }
           } else if(this.pattern[count] === "B") { 
               if(cell.bottom !== undefined) { 
                if(cell.bottom.visited !== true) { 
                    console.log("Bottom Neighbor is not visited");
                    console.log(cell.bottom[0]);
                    non_visited_neighbors.push({
                        cell: cell.bottom[0], 
                        direction: "B"
                    });
                }
            }
           } else if(this.pattern[count] === "T") {  
               if(cell.top !== undefined) { 
                if(cell.top.visited !== true) { 
                    console.log("Top Neighbor is not visited");
                    non_visited_neighbors.push({
                        cell: cell.top[0], 
                        direction: "T"
                    });
                }
               }   
           }
         count++;   
        }
        
        
        
        let A = non_visited_neighbors[Math.floor((Math.random()*non_visited_neighbors.length))];
        if(non_visited_neighbors === []) { 
            console.log("Stop...Check if queue is empty or not do the continue part.");
            return;
        }
        cell = this.breakWall(A, cell);
        if(this.checkCount !== (this.size*this.size)) { 
            this.checkCount++;
            this.gen(A.cell);
        } else { 
            return;
        }
        
    }

    breakWall(A, cell) { 
        if(A.direction === "L") { 
            cell.leftWall = false;
            A.cell.rightWall = false;
        } else if(A.direction === "B") { 
            cell.bottomWall = false;
            A.cell.topWall = false;
        } else if(A.direction === "T") { 
            cell.topWall = false;
            A.cell.bottomWall = false;
        } else if(A.direction === "R") { 
            cell.rightWall = false;
            A.cell.leftWall = false;
        }  
        return A.cell;
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

    _getNeighborCount(cell) { 
        let count = 0;
        if(cell.left != null && cell.right != undefined) { 
            if(cell.left.visited !== true) { 
                count++;
            }
        }

        if(cell.right != null && cell.right != undefined) { 
            if(cell.right.visited !== true) { 

                count++;
            }
        }

        if(cell.top != null && cell.top != null) {
            if(cell.top.visited !== true) { 
                count++;
            }   
        }

        if(cell.bottom != null && cell.bottom != null) {
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
        //  console.log("Start Node: ");
        //  console.log(selectedNode); 
    }

    _selectEnd() { 
        // let endCell = Math.floor(Math.random() * (this.size*this.size));
        let endNode = this.allCells[Object.keys(this.allCells)[2]]; 
        if(endNode.x === this.isStart.x && endNode.y === this.isStart.y) { 
            this._selectEnd();
        } else { 
            this.isEnd = endNode;
            // console.log("End Node: ");
            // console.log(endNode);
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

    draw_grid(rows, cols){
        var i=0;
        let count = 0;
        var grid = document.createElement('table');
        grid.className = 'grid';

        for (var r=0;r<rows;r++){
            var tr = grid.appendChild(document.createElement('tr'));

            for (var c=0;c<cols;c++){
                var cell = tr.appendChild(document.createElement('td'));
                cell.innerHTML = ++i;
                let currentCell = this.grid[r][c][0];
                cell.style.leftWall = "#383838";
                this.buildWalls(currentCell, cell);
                
            }
        }

        return grid;
     }

    draw(size) {
        let grid = this.draw_grid(size,size);
        document.body.appendChild(grid);
    }

    buildWalls(currentCell ,cell) { 
        if(currentCell.left !== undefined) { 
            if(currentCell.leftWall === true) {             
                cell.style.borderLeftColor = "red";
            } 
        }
        
        if(currentCell.right !== undefined) { 
            if(currentCell.rightWall === true) { 
                cell.style.borderRightColor = "red"; 
            }
        }
        
        if(currentCell.topWall !== undefined) { 
            if(currentCell.topWall === true) { 
                cell.style.borderTopColor = "red"; 
            }
        }
       
        if(currentCell.bottomWall !== undefined) { 
            if(currentCell.bottomWall === true) { 
                cell.style.borderBottomColor = "red"; 
            }
        }
    }

    
       
}


let myMaze = new Maze(10);
