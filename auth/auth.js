const jwt = require("jsonwebtoken");

require("dotenv").config();

function authenticateToken(req, res, next) {
  const autheHeader = req.headers["authorization"];
  const token = authHeader && autheHeader.split(" ")[1];
  if (token == null) return res.sentStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
