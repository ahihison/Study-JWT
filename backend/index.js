const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"], // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(cookieParser());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
