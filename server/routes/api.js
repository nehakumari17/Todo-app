const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password);
    const user = new User({ name, username, email, password: hashPassword });
    await user.save();
    res.status(201).json({ message: "Sign up successful." }); // Changed status code to 201 for successful creation
  } catch (error) {
    res.status(400).json({ message: "User Already Exists" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Log user object before sending the response
    console.log("User object:", user);

    if (!user) {
      return res.status(400).json({ message: "Please register yourself first" });
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
      return res.status(400).json({ message: "Password is not correct" });
    }

    // Include _id field in the response
    const { password: _, ...others } = user._doc;
    res.status(200).json({ user: { _id: user._id, ...others } });
  } catch (error) {
    res.status(400).json({ message: "An error occurred while processing the request" });
  }
});



module.exports = router;
