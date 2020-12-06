const mysql = require('mysql');
const express = require('express');
var bodyParser = require('body-parser')

const PeopleRoutes = require("./routes/people")
const mysqlConnection = require("./connection")


const app = express();
app.use(bodyParser.json());

app.use("/people",PeopleRoutes);


app.listen(3000);