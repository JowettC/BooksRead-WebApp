const mysql = require("mysql");
const express = require("express");
var bodyParser = require("body-parser");

const BooksRoutes = require("./routes/books");
const mysqlConnection = require("./connection");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use("/api/books", BooksRoutes);

app.post("/api/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  mysqlConnection.query(
    "INSERT INTO users (username,password) VALUES (?,?)",
    [username, password],
    (err, result) => {
      if (err){
        console.log(err);
      }
      else{
        res.send("successfully registered")
      }
    }
  );
});

// app.post(
//   "/login",
//   strategy.authenticate("local", { session: true }),
//   (req, res) => {
//     console.log(req.user);
//     if (req.user != undefined || req.user != null) {
//       res.send(req.user);
//     } else {
//       res.send(
//         "not able to generate the token.username or password incorrect."
//       );
//     }
//   }
// );

app.listen(3000);
