const db = require("./db"); // Import the database connection setup
const User = require("./models/usertest"); // Import the User model

async function main() {
  try {
    // Create a new user
    const newUser = new User({
      username: "testuser",
      email: "test123@gmail.com",
      password: "hashedPassword",
    });
    const savedUser = await newUser.save();
    console.log("User saved:", savedUser);

    // Find a user by email
    const foundUser = await User.findOne({ email: "test123@gmail.com" });
    console.log("Found user:", foundUser);

    // Update a user
    if (foundUser) {
      foundUser.username = "updatedusername";
      const updatedUser = await foundUser.save();
      console.log("Updated user:", updatedUser);
    }

    // Delete a user
    if (foundUser) {
      await foundUser.remove();
      console.log("User deleted");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the database connection
    db.close();
  }
}

main();
