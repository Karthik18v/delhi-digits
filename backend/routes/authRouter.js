const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/signup", authController.signup); // Signup 
router.post("/login", authController.login);  // Login

module.exports = router;
