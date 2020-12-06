const passport = require('passport');
const express = require('express')
const Router = express.Router();

app.post('/',strategy.authenticate('local',{session:true}),(req,res)=>{
    console.log(req.user);
    if(req.user != undefined || req.user != null){
        res.send(req.user);
    }else{
        res.send("not able to generate the token.username or password incorrect.");
    }
});
module.exports = Router;