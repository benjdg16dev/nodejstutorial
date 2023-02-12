const jwt = require("jsonwebtoken");

// Note: Middlewares should have a next parameter
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // Note: 403 because at this point we know we received a token but something about it isn't right
    if (err) return res.sendStatus(403); // Forbidden; Invalid Token

    // Note: We passed username in JWT inside authController
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
