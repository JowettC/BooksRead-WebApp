const mysql = require('mysql');
const express = require('express');
var bodyParser = require('body-parser')

const BooksRoutes = require("./routes/books")
const mysqlConnection = require("./connection")


const app = express();
app.use(bodyParser.json());

app.use("/books",BooksRoutes);

app.post('/login',strategy.authenticate('local',{session:true}),(req,res)=>{
    console.log(req.user);
    if(req.user != undefined || req.user != null){
        res.send(req.user);
    }else{
        res.send("not able to generate the token.username or password incorrect.");
    }
});


app.listen(3000);