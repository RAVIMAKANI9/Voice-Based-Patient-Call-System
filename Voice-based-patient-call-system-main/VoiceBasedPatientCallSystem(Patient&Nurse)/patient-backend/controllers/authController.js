const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        let { name, dob } = req.body;

        name = name.trim().toLowerCase();
        dob = dob.trim();

        // Fetch and print all users in the terminal
        const allUsers = await User.find(); // Using Mongoose model

        // Find user with case-insensitive name and exact DOB match
        const user = await User.findOne({
            name: { $regex: new RegExp(`^${name}$`, "i") }, // Case-insensitive search
            dob: dob
        });

        if (!user) {
            console.log(`❌ Login failed: User with name "${name}" and DOB "${dob}" not found.\n`);
            return res.status(400).json({ message: "User not found or incorrect details" });
        }

        console.log(`✅ User found: ${user.name}, DOB: ${user.dob}\n`);

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });

        res.json({ message: "Login successful", token, user });
    } catch (error) {
        console.error("❌ Error in loginUser:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { loginUser };
