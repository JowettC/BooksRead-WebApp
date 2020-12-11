const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
require("dotenv").config();

const auth = require("../auth/auth");
const { reset } = require("nodemon");

Router.get("/", auth.authenticateToken, (req, res) => {
  mysqlConnection.query(
    'SELECT books_id,book_name,book_author, DATE_FORMAT(created,"%M %d %Y") as "date_created" from books,users where books.username = users.username and users.username = ?',
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
Router.get("/monthly", auth.authenticateToken, (req, res) => {
  mysqlConnection.query(
    'select count(*) as "books_read", year(created) as "year", month(created) as "month" from books where username = ? group by year(created) desc, month(created) desc',
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
Router.get("/yearly", auth.authenticateToken, (req, res) => {
  mysqlConnection.query(
    'select count(*) as "books_read", year(created) as "year" from books where username = ? group by year(created) desc',
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
Router.get("/:id", auth.authenticateToken, (req, res) => {
  mysqlConnection.query(
    'SELECT books_id,book_name,book_author, DATE_FORMAT(created,"%M %d %Y") as "date_created" from books,users where books.username = users.username and users.username = ? and books_id = ?',
    [req.user.name,req.params.id],
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
  const created = new Date().toISOString().substring(0, 10);
  mysqlConnection.query(
    "insert into books(book_name,book_author,username,created) values (?,?,?,?)",
    [req.body.bookName,req.body.bookAuthor,req.user.name,created],
    (err, rows, fields) => {
      if (!err) {
        res.send({rows,message:"Successfully Added! Keep Reading!"});
      } else {
        console.log(err);
        res.send(err)
      }
    }
  );
});
Router.delete("/:id", auth.authenticateToken, (req, res) => {
  mysqlConnection.query(
    "delete from books where books_id =?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send({rows,message:"Successfully Deleted :("});
      } else {
        console.log(err);
      }
    }
  );
});
Router.post("/edit", auth.authenticateToken, (req, res) => {
  mysqlConnection.query(
    "UPDATE books SET book_name = ?, book_author = ? WHERE books_id = ?;",
    [req.body.bookName,req.body.bookAuthor,req.body.books_id],
    (err, rows, fields) => {
      if (!err) {
        res.send({rows,message:"Successfully Updated!"});
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = Router;
