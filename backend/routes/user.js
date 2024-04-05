const express = require("express");
const router = express.Router();

const { login, signup, signupcheck } = require("../controllers/Auth");


router.post("/login", login);
router.post("/signup", signup);
router.post("/signupcheck", signupcheck);


module.exports = router; 
