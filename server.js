const mysql = require('mysql');
const express = require('express');
var bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database: "Edureka",
    multipleStatements : true
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("connected")
    }
    else{
        console.log("connection failed")
    }

})
app.listen(3000);