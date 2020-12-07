const express = require('express')
const Router = express.Router();
const mysqlConnection = require("../connection")
require('dotenv').config()

const auth = require("../auth/auth")

Router.get("/", auth.authenticateToken ,(req,res)=>{
    mysqlConnection.query("SELECT * from books", (err,rows,fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err)
        }
    })

})
module.exports = Router;