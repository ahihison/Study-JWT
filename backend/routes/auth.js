const authControllers = require("../controllers/authControllers");
const middlewareControllers = require("../controllers/middlewareController");

const router = require("express").Router();
//Register
router.post("/register", authControllers.registerUser);

// Login
router.post("/login", authControllers.loginUser);

// Refresh Token
router.post("/refresh", authControllers.refreshToken);
// LOG OUT
router.post(
  "/logout",
  middlewareControllers.verifyToken,
  authControllers.logout
);
module.exports = router;
