// Import the Mongoose library
const mongoose = require("mongoose");

// Define a Mongoose schema for the "User" model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
});

// Export the Mongoose model based on the schema, named "User"
module.exports = mongoose.model("User", userSchema);
