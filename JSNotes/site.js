window.onload = function () { 
    //Document Elements
    var element = document.getElementById("theH1");
    console.log(element);

    element.innerText = "Mazes";
}

//Arrays
var myArray = [10, 100, {name:'Paul'}, [1,2,3]];

for(key in myArray) { 
    console.log(myArray[key]);
}

//Stack?
var stack = [];

stack.push("Plate1");
stack.push("Plate2");
stack.push("Place3");

console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());

//Multidimensional Array
//Build a 4x4 Grid/Maze
var mazeSize = 4;
var myMaze = [];

for(var i=0; i <  mazeSize; i++ ) { 
    myMaze[i] = [];

    //add 4 "columns" to innerArray
    for(var j =0; j < mazeSize; j++) { 
        myMaze[i][j] = new Cell(i, j);
    }
}

console.log(myMaze);
;

function Cell(x,y) { 
    this.x  = x; 
    this.y = y; 
    this.visited = false;
}

//Cells 
//ForEach
//For Review! 

//Interacting with a Canvas
//Javascript Modules
