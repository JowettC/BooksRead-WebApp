// const mysql = require("mysql");
const express = require("express");
var bodyParser = require("body-parser");
// const passport = require('passport');
const BooksRoutes = require("./routes/books");
const UserRoutes = require("./routes/user");
// const mysqlConnection = require("./connection");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

require('./auth/auth');
app.use("/api/books", BooksRoutes);
app.use("/api/user", UserRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("started server"));
