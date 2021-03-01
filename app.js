const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js");

const app = express ();

// Enables app to utilize bodyparser
app.use(bodyParser.urlencoded({extended:true}));

// Enables app to use static css 
app.use(express.static("public"));

// Allows app to utilize ejs
app.set("view engine", "ejs");

//Allows variables to be global and stay inscope
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems =[];

//creates route to server
app.get("/", (req, res) => {

    let day = date.getDate();

    res.render('list', {listTitle: day, NewListItems: items});
});

app.get("/work", function(req,res) {
    res.render("list", {listTitle: "Work List", NewListItems: workItems});
});

// receives data sent from website
app.post("/", (req, res) => {
    
    if (req.body.list === "Work") {
        let item = req.body.newItem;
        workItems.push(item);
        res.redirect("/work");
    }else {
        items.push(item);
    
        res.redirect("/");
    }
    
});

app.post("/work", (req, res) => {
    
    let item = req.body.newItem;

    items.push(item);
    
    res.redirect("/work");
    
});



app.listen(3000, () => {
    console.log("Listening on port 3000");
});