
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user:"sql12381479",
    password:"gStaFqupK4",
    database: "sql12381479",
    multipleStatements : true
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("connected")
    }
    else{
        console.log("connection failed")
    }

});

module.exports = mysqlConnection;