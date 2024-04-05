// Import required libraries and modules
const User = require("../models/User"); // Import the User model
const jwt = require("jsonwebtoken"); // JSON Web Token library
const bcrypt = require("bcrypt"); // Library for password hashing
require("dotenv").config(); // Load environment variables

// User registration endpoint
exports.signup = async (req, res) => {
    try {
        // Destructure user data from the request body
        const { email, username, password, address, mobile } = req.body;
        if (!email || !username || !password || !address || !mobile) {

            return res.status(200).json({
                success: false,
                message: "Please fill in all the details carefully",
            });
        }

        // Check if a user with the same email already exists in the database
        const existingUser = await User.findOne({ email });

        // If a user with the same email exists, return an error response
        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: "User already exists",
            });
        }

        let hashPassword;

        try {
            // Hash the user's password with bcrypt (with a salt factor of 10)
            hashPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            });
        }

        // Create a new user with hashed password and other details
        const user = await User.create({

            email,
            username,
            password: hashPassword,
            address,
            mobile
        });

        // Return a success response with the created user data
        return res.status(200).json({
            success: true,
            data: user,
            message: "User created successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User couldn't be registered. Please try again later.",
        });
    }
};




exports.signupcheck = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({
                success: true,
                message: "User already exists",
            });

        } else {
            return res.status(200).json({
                success: false,
                message: "User not found",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while checking user ID",
        });
    }
};




// User login endpoint
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided in the request
        if (!email || !password) {

            return res.status(200).json({
                success: false,
                message: "Please fill in all the details carefully",
            });
        }

        // Find a user in the database by email
        let user = await User.findOne({ email });

        // If no user with the provided email is found, return an error response
        if (!user) {
            return res.status(201).json({
                success: false,
                message: "User is not registered",
            });
        }

        // Create a JWT payload with user details
        const payload = {
            email: user.email,
            id: user._id,
        };

        // Compare the provided password with the hashed password stored in the database
        if (await bcrypt.compare(password, user.password)) {
            // If passwords match, generate a JWT token with a 2-hour expiration
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2d",
            });


            // // Attach the token to the user object (for response) and set a cookie with the token
            // user = user.toObject();
            // user.token = token;
            // user.password = password;

            // // Configure cookie options
            // const options = {
            //     expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Cookie expiration time (3 days)
            //     httpOnly: true, // Cookie is only accessible via HTTP
            // };

            // // Set the "token" cookie and return a success response with the token and user data
            // res.cookie("token", token, options).status(200).json({
            //     success: true,
            //     token,
            //     user,
            //     message: "User logged in successfully",
            // });



            return res.status(200).json({
                success: true,
                token: token,
                email: user.email,
                message: "User logged in successfully",
            });
        } else {
            // If passwords don't match, return an error response
            return res.status(203).json({
                success: false,
                message: "Password incorrect",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User couldn't be logged in. Please try again later.",
        });
    }
};
