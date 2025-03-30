const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET user profile
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming user ID is available in req.user
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profile" });
  }
});

// PUT update user profile
router.put("/", async (req, res) => {
  const { name, dob } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { name, dob }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

module.exports = router;
