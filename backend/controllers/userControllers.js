const User = require("../models/User");
const userControllers = {
  //GET ALL User
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE User
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.status(200).json("Delete Successfully");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = userControllers;
