const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const axios = require("axios");

const { process_audio_file } = require("./backendNlpFiles/speech_to_text.js");
const objVariables = require("./common/variables");
const objMessages = require("./common/messages");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

//#region DB Connection
const MONGO_URI = "mongodb://localhost:27017/VoiceBasedPatientCare"; // Ensure 127.0.0.1 instead of 'localhost'

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

mongoose
  .connect(objVariables.BackEndURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(objMessages.MongoDbConnectedSuccessfully))
  .catch((err) => console.error(objMessages.MongoDbConnectionError, err));
//#endregion

//#region API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/patientRequests", require("./routes/patientRequests"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api", require("./routes/nurseRoutes"));
//#endregion

// Debugging middleware to check incoming requests
app.use((req, res, next) => {
  console.log(`📢 Incoming request: ${req.method} ${req.url}`);
  next();
});

//#region Configure multer to handle audio uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, "voice_input.wav"); // Overwrites previous file
  },
});
const upload = multer({ storage });
//#endregion

//#region Voice Processing Endpoints
app.post("/api/voice-request", upload.single("audio"), async (req, res) => {
  console.log("🎤 Received voice request...");
  if (!req.file) {
    return res.status(400).json({ error: "No audio file uploaded" });
  }
  
  const audioFilePath = path.join(__dirname, "uploads", "voice_input.wav");
  console.log("📁 Audio file path:", audioFilePath);
  
  try {
    const recognizedText = await process_audio_file(audioFilePath);
    
    // Save to MongoDB
    const AudioRequest = mongoose.model("AudioRequest", new mongoose.Schema({
      audioFile: String,
      recognizedText: String,
    }));
    
    const audioRequest = new AudioRequest({
      audioFile: audioFilePath,
      recognizedText: recognizedText,
    });
    await audioRequest.save();
    
    res.json({ message: recognizedText });
  } catch (error) {
    console.error("❌ Error processing audio:", error);
    res.status(500).json({ error: "Error processing audio" });
  }
});

app.post("/api/voice-request/transcribe", upload.single("audio"), async (req, res) => {
  console.log("🎤 Received voice request for transcription...");
  if (!req.file) {
    return res.status(400).json({ error: "No audio file uploaded" });
  }
  
  const audioFilePath = path.join(__dirname, "uploads", "voice_input.wav");
  console.log("📁 Audio file path:", audioFilePath);
  
  try {
    const recognizedText = await process_audio_file(audioFilePath);
    res.json({ text: recognizedText });
  } catch (error) {
    console.error("❌ Error transcribing audio:", error);
    res.status(500).json({ error: "Error transcribing audio" });
  }
});
//#endregion

const PORT = process.env.PORT || objVariables.MongoPort || 5000;
app.listen(PORT, () => console.log(objMessages.ServerIsRunningAndConnectedToDbHospital || `🚀 Server running on port ${PORT}`));
