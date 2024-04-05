// Import the required libraries
const jwt = require("jsonwebtoken"); // JSON Web Token library
require("dotenv").config(); // Load environment variables

// Middleware for user authentication
exports.requireSignIn = (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "") || req.headers.authorization;

        // If the token is missing, return a 401 (Unauthorized) response
        if (!token || token === undefined) {
            return res.status(401).json({
                success: false,
                Message: "Token missing",
            });
        }

        // Verify the token's validity using the JWT secret from environment variables
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(payload);
            req.user = payload.email; // Attach the decoded payload to the request object

        } catch (error) {
            // Handle invalid tokens with a 401 (Unauthorized) response
            return res.status(401).json({
                success: false,
                Message: "Token is invalid",
            });
        }

        // Proceed to the next middleware or route handler

        next();
    } catch (error) {
        // Handle errors during token verification
        return res.status(401).json({
            success: false,
            Message: "Something went wrong while verifying the token",
            error: error.message,
        });
    }
};