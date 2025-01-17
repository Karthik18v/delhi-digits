const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config(); 

const signup = async ({ username, email, password }) => {
  console.log("User Model:", User);

  const existingUser = await User.findOne({ email }); // await here

  if (existingUser) {
    throw new Error("User Already Exists");
  }

  // Hash the password
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  console.log(hashedPassword);

  // Create a new user
  const newUser = await User.create({
    username,
    password: hashedPassword,
    email,
  });

  // Return the new user details (avoid sending the password)
  return {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  };
};

const login = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });
  console.log(existingUser);
  if (!existingUser) {
    throw new Error("Invalid User");
  }

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid Password");
  }

  const payload = {
    id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
  };

  const secreat_key = process.env.Karthik.SECREAT_KEY;

  const token = jwt.sign(payload, secreat_key, { expiresIn: "12h" });
  return { token, username: existingUser.username };
};

module.exports = { signup, login };
