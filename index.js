const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const app = express();

// Connect to the MongoDB database
mongoose
  .connect("mongodb://localhost:27017/Login-tut", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log("Database Connection Error:", err));

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  state: { type: String, required: true },
  country: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  mobile: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs"); // Set EJS as the template engine
app.use(express.static("public")); // Serve static files from "public" directory

// Routes
app.get("/", (req, res) => {
  res.render("login"); // Render the login page
});

app.get("/signup", (req, res) => {
  res.render("signup"); // Render the signup page
});

// Register user (signup)
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password, state, country, gender, dob, mobile } =
      req.body;

    // Check if all required fields are provided
    if (
      !username ||
      !email ||
      !password ||
      !state ||
      !country ||
      !gender ||
      !dob ||
      !mobile
    ) {
      return res.status(400).send("All fields are required.");
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      name: username,
      email: email,
      password: hashedPassword,
      state: state,
      country: country,
      gender: gender,
      dob: new Date(dob),
      mobile: mobile,
    });

    // Save the user to the database
    await newUser.save();

    console.log("User registered successfully");
    res.status(201).redirect("/"); // Redirect to the login page after successful signup
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("An error occurred during registration.");
  }
});

// Login user (login)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and compare passwords
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log("User logged in successfully");
      res.status(200).send("Login successful"); // Redirect or send success message
    } else {
      res.status(401).send("Invalid email or password.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred during login.");
  }
});

// Route for bulk insertion of users
app.post("/bulk-insert", async (req, res) => {
  try {
    const users = req.body; // Expecting an array of user objects

    // Validate that users is an array
    if (!Array.isArray(users) || users.length === 0) {
      return res
        .status(400)
        .send("Invalid data format. Expected an array of user objects.");
    }

    // Hash passwords and prepare user objects
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          name: user.username,
          email: user.email,
          password: hashedPassword,
          state: user.state,
          country: user.country,
          gender: user.gender,
          dob: new Date(user.dob),
          mobile: user.mobile,
        };
      })
    );

    // Insert multiple users
    await User.insertMany(hashedUsers);

    console.log("Users inserted successfully");
    res.status(201).send("Users inserted successfully");
  } catch (error) {
    console.error("Error during bulk insertion:", error);
    res.status(500).send("An error occurred during bulk insertion.");
  }
});

// Start the server
const port = 5000; // Or another available port
app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
