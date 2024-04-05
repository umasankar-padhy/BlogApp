// Import the Mongoose library for MongoDB connection
const mongoose = require("mongoose");

// Load environment variables from a .env file (if present)
require("dotenv").config();

// Define a function called "dbConnect" that establishes a database connection
const dbConnect = async () => {
    try {
        // Attempt to connect to the MongoDB database using the URL specified in the environment variables
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,        // Use new URL parser (required)
            useUnifiedTopology: true      // Use new server discovery and monitoring engine (required)
        });

        // If the connection is successful, log a success message
        console.log("Database connected successfully");
    } catch (error) {
        // If there's an error during the connection attempt, log an error message and exit the process
        console.error("Error in DB connection");
        console.error(error.message);
        process.exit(1); // Exit the Node.js process with an error code
    }
};

// Export the "dbConnect" function so it can be used in other parts of the application
module.exports = dbConnect;
