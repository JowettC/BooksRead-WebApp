const express = require('express')
const bcrypt = require('bcrypt');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../models/user')
const Router = express.Router();
const mysqlConnection = require("../connection")

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'SECRET'
},
    function (jwtPayload, cb) {
        if (!jwtPayload) {
            return cb(err)
        }
        return cb(null, jwtPayload);
    }
))

Router.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    mysqlConnection.query(
      "INSERT INTO users (username,password) VALUES (?,?)",
      [username, password],
      (err, result) => {
        if (err) {
          res.send({err : err})
        } else {
          res.send("Successfully Registered");
        }
      }
    );
  });
  
  Router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    mysqlConnection.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      (err, result) => {
        if (err) {
          res.send({err : err})
        } 
        if (result.length >0){
          res.send({result:result,message:"Successfully Registered"});
        }
        else{
          res.send({message: "Wrong username/password combination!!"})
        }
      }
    );
  });
module.exports = Router;