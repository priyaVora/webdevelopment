const express = require('express');
const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
    // res.sendFile(__dirname + "/views/index.html");
    res.render("index");
});

app.get('/bookdetail', function(req, res){
    var model = {
        title: "Book Detail Page Comming Soon!",
        currentUser: {
            name: "Paul",
            role: ["Admin", "DataEntry"]
        }
    }
    res.render("bookdetail", model);
});

app.get('/books', function(req, res){
    var booksFromJson = require(__dirname + "/data/books.json").books;
    var model = {
        title: "Books!",
        currentUser: {
            name: "Paul",
            role: ["Admin", "DataEntry"]
        },
        rawr: booksFromJson
    };

    res.render("books", model);
});
app.get('/books/:bookId', function(req, res) {
    const {bookId} = req.params;
    var booksFromJson = require(__dirname + "/data/books.json").books;
    var model = {
        title: "Books!",
        currentUser: {
            name: "Paul",
            role: ["Admin", "DataEntry"]
        },
        rawr: [booksFromJson[bookId-1]]
    };

    res.render("books", model);
});

app.get('/orders', function(req, res) { 
    console.log('My Orders...');
    var booksFromJson = require(__dirname + "/data/books.json").books;
    var model = {
        title: "Books!",
        currentUser: {
            name: "Paul",
            role: ["Admin", "DataEntry"]
        },
        rawr: booksFromJson
    };

    res.render("orders", model);
});

app.get('/food', function(req, res) { 
    var foodFromJson = require(__dirname + "/data/food.json").food;
    var model = {
        title: "Food",
        currentUser: {
            name: "Paul",
            role: ["Admin", "DataEntry"]
        },
        rawr: foodFromJson
    };

    res.render("food", model);
});

app.get('/accessories', function(req, res) { 
    var accesoriesFromJson = require(__dirname + "/data/accesories.json").accesories;
    var model = {
        title: "Accesories",
        currentUser: {
            name: "Paul",
            role: ["Admin", "DataEntry"]
        },
        rawr: accesoriesFromJson
    };

    res.render("accesories", model);
});
app.listen(port, function(){
    console.log("Express listening on port " + port);
});