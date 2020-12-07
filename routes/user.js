// to fetch .env variables
require('dotenv').config()

const auth = require("../auth/auth")
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// const passport = require('passport');
// const passportJWT = require('passport-jwt');
// const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;
// const User = require('../models/user')
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.use(express.json());

// passport.use(new JWTStrategy({
//     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//     secretOrKey: 'SECRET'
// },
//     function (jwtPayload, cb) {
//         if (!jwtPayload) {
//             return cb(err)
//         }
//         return cb(null, jwtPayload);
//     }
// ))

Router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;
    const user = {name:username}
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    mysqlConnection.query(
      "INSERT INTO users (username,password) VALUES (?,?)",
      [username, hashedPassword],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.send({message:"Successfully Registered", token:accessToken});
        }
      }
    );
  } catch {
    res.send("Something went wrong")
  }
});
// Router.post("/register", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     mysqlConnection.query(
//       "INSERT INTO users (username,password) VALUES (?,?)",
//       [username, password],
//       (err, result) => {
//         if (err) {
//           res.send({err : err})
//         } else {
//           res.send("Successfully Registered");
//         }
//       }
//     );
//   });

Router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = {name:username}
  const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
  console.log(accessToken)
  mysqlConnection.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send({ status: "Success", message: "Successfully Login" });
      } else {
        res.send({ message: "Wrong username/password combination!!" });
      }
    }
  );
});


module.exports = Router;
