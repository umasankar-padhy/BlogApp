
const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const dbConnect = require("./config/database");

// Load environment variables from a .env file
dotenv.config();

// Define the port for the server to listen on
const PORT = process.env.PORT || 4000;

// Set up middleware
app.use(cors()); // Enable CORS
app.use(express.urlencoded({ extended: true }));// Parse URL-encoded request bodies
app.use(express.json()); // Parse JSON request bodies


const fileupload = require("express-fileupload");
app.use(fileupload());



// Define a route for the homepage
app.get("/", (req, res) => {
    res.send("<h2>Welcome to the homepage</h2>");
});

const blogRoutes = require("./routes/blog");
app.use("/api/v1/blog", blogRoutes);

const user = require("./routes/user");
app.use("/api/v1/auth", user);

// Connect to the database
dbConnect();

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
