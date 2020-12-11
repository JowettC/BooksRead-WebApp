// to fetch .env variables
require("dotenv").config();

const auth = require("../auth/auth");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('./cryptoFunction.js');

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
    // console.log(req.body.password)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    
    mysqlConnection.query(
      "INSERT INTO users (username,password) VALUES (?,?)",
      [username, hashedPassword],
      (err, result) => {
        if (err) {
          console.log(err)
          // if (err.error.code ==="ER_DUP_ENTRY"){
          //   res.send({error : "Username already exist"})
          // }
          res.send({ error: err });
        } else {
          res.send({ message: "Successfully Registered", token: accessToken });
        }
      }
    );
  } catch {
    res.send("Something went wrong");
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

Router.post("/login", async (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM users WHERE username = ?",
    [req.body.username],
    async (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        const user = result[0].password
        try{
          const result = await bcrypt.compare(req.body.password, user)
          if (result){
            const username = req.body.username
            const user = { name: username };
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.send({ status: "Success", message: "Successfully Login", accessToken:accessToken });
          }
          else{
            res.send({ status: "Error", message: "Inccorrect Password" });
          }

        }catch{
          res.status(500).send("Something went wrong")
        }
        
      } else {
        res.send({ message: "Wrong username/password combination!!" });
      }
    }
  );
    

  
});

module.exports = Router;
