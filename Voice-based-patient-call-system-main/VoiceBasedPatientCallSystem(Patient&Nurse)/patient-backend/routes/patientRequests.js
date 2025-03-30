const express = require("express");
const Request = require("../models/Request");

const router = express.Router();

// 1️⃣ Submit a new request
router.post("/submit", async (req, res) => {
  try {
    const { patientName, requestText } = req.body;
    if (!patientName || !requestText) {
      return res.status(400).json({ error: "Missing patient name or request text" });
    }

    const newRequest = new Request({ patientName, requestText });
    await newRequest.save();

    res.status(201).json({ message: "Request submitted successfully", request: newRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// 2️⃣ Fetch all past requests for a patient
router.get("/history/:patientName", async (req, res) => {
  try {
    const { patientName } = req.params;
    const requests = await Request.find({ patientName }).sort({ timestamp: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
