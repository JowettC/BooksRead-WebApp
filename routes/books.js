const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
require("dotenv").config();

const auth = require("../auth/auth");
const { reset } = require("nodemon");

Router.get("/", auth.authenticateToken, (req, res) => {
  mysqlConnection.query(
    "SELECT books_id,book_name,book_author from books,users where books.username = users.username and users.username = ?",
    [req.user.name],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});
Router.post("/create", auth.authenticateToken, (req, res) => {
  mysqlConnection.query(
    "insert into books(book_name,book_author,username) values (?,?,?)",
    [req.body.bookName,req.body.bookName,req.user.name],
    (err, rows, fields) => {
      if (!err) {
        res.send({rows,message:"Successfully Added! Keep Reading!"});
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = Router;
