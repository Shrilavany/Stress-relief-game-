const mongoose = require("mongoose");

// Connect to the MongoDB database
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.error("Database cannot be Connected:", err);
  });

// Create a Schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for password
  },
});
//collection part
const collection = new mongoose.model("users", LoginSchema);
module.exports = collection;
