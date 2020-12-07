const jwt = require("jsonwebtoken");

require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(404).send({status:'error', message:'Not Logged in'})

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send({status:'error', message:'User is is not Atuhorized'}) 
    req.user = user;
    next();
  });
}
module.exports = { authenticateToken };