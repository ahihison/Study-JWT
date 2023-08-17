const bycrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
let refreshTokens = [];
const authControllers = {
  // Register
  registerUser: async (req, res) => {
    try {
      const salt = await bycrypt.genSalt(10);
      const hashedPassword = await bycrypt.hash(req.body.password, salt);

      //   create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      console.log(newUser);
      //save to db
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30s" }
    );
  },
  // GENERATE REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESS_TOKEN,
      { expiresIn: "365d" }
    );
  },
  // Login
  loginUser: async (req, res) => {
    try {
      const userName = await User.findOne({ username: req.body.username });
      if (!userName) {
        return res.status(400).json("Wrong User name!");
      }
      const validPassword = await bycrypt.compare(
        req.body.password,
        userName.password
      );
      if (!validPassword) {
        return res.status(400).json("Wrong Password!");
      }
      if (userName && validPassword) {
        const accessToken = authControllers.generateAccessToken(userName);
        const reFreshToken = authControllers.generateRefreshToken(userName);
        refreshTokens.push(reFreshToken);
        res.cookie("refreshToken", reFreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = userName._doc;
        return res.status(200).json({ ...others, accessToken });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  refreshToken: async (req, res) => {
    //Take refesh token from user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json("You are not authenticated!");
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid!");
    }
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESS_TOKEN,
      async (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        //create new access token and refresh token
        const newAccessToken = authControllers.generateAccessToken(user);
        const newRefreshToken = authControllers.generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        //update refresh token
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({ accessToken: newAccessToken });
      }
    );
  },
  // LOG OUT
  logout: async (req, res) => {
    res.clearCookie();
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("You logged out successfully!");
  },
};
//  Login

module.exports = authControllers;
