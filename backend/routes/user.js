const middlewareControllers = require("../controllers/middlewareController");
const userControllers = require("../controllers/userControllers");
const router = require("express").Router();
//GET ALL User
router.get("/", middlewareControllers.verifyToken, userControllers.getAllUser);

//DELETE USER
router.delete(
  "/:id",
  middlewareControllers.verifyTokenAndAdmin,
  userControllers.deleteUser
);
module.exports = router;
