const jwt = require("jsonwebtoken");
const middlewareControllers = {
  // Verify Token
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  },
  verifyTokenAndAdmin: (req, res, next) => {
    middlewareControllers.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        return res.status(403).json("You are not allowed to do that!");
      }
    });
  },
};
module.exports = middlewareControllers;
