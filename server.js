const mysql = require('mysql');
const express = require('express');
var bodyParser = require('body-parser')

const BooksRoutes = require("./routes/books")
const mysqlConnection = require("./connection")


const app = express();
app.use(bodyParser.json());

app.use("/books",BooksRoutes);


app.listen(3000);