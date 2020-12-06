const mysql = require("mysql");
const express = require("express");
var bodyParser = require("body-parser");

const BooksRoutes = require("./routes/books");
const UserRoutes = require("./routes/user");
const mysqlConnection = require("./connection");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/books", BooksRoutes);
app.use("/api/user", UserRoutes);

// app.post("/api/register", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   mysqlConnection.query(
//     "INSERT INTO users (username,password) VALUES (?,?)",
//     [username, password],
//     (err, result) => {
//       if (err) {
//         res.send({err : err})
//       } else {
//         res.send("Successfully Registered");
//       }
//     }
//   );
// });

// app.post("/api/login", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   mysqlConnection.query(
//     "SELECT * FROM users WHERE username = ? AND password = ?",
//     [username, password],
//     (err, result) => {
//       if (err) {
//         res.send({err : err})
//       } 
//       if (result.length >0){
//         res.send(result);
//       }
//       else{
//         res.send({message: "Wrong username/password combination!!"})
//       }
//     }
//   );
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("started server"));
