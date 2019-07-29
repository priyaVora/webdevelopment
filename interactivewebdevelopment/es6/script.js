window.onload = function() { 


    //let scope
    var x = 60;

    { //block
        var x = 100;
        console.log(x);
    }

    console.log(x);

    //=>
    function Add(l,r) { 
        return 1 + r;
    } 

    var result = Add(10,10);
    console.log(result);

    function Mather() { 

    }


    class Animal { 
        constructor(type="unknown") { 
            this._type = type;
        }
    }


    // class Bulldog extends Animal
    //super();
    //objects 
    //prototyps

    function Dog(name,bark) { 
     this.name = name;
     this.bark = bark;   
    }

    var stout = new Dog("Stout", "Arf!");
    console.log(stout)



    //default param values
    function Rect(height=0, width=0) { 
        this.height = height;
        this.width = width;
    }
}