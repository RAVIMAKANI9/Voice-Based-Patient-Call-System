import warnings
import os
import sys
import whisper
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from bson import ObjectId
from speech_to_text import process_audio
from translation import translate_text
from intent_classifier import classify_intent
import asyncio
import json

# Suppress warnings
warnings.filterwarnings("ignore")

# Load the Whisper model
model = whisper.load_model("base")

MONGO_URI = "mongodb://localhost:27017"

def check_mongo_connection():
    """Check if MongoDB is running."""
    try:
        with MongoClient(MONGO_URI) as client:
            client.admin.command('ping')
    except ConnectionFailure:
        sys.exit(1)

def process_audio_file(audio_path, language="hi"):
    """Process an audio file: transcribe, translate, classify, and store in DB."""
    try:
        if not os.path.isfile(audio_path):
            raise FileNotFoundError(f"Audio file '{audio_path}' not found")

        # 🔹 Remove 'await' if process_audio is not async
        text = process_audio(audio_path)  

        if not text:
            raise Exception("Failed to transcribe audio")

        loop = asyncio.get_event_loop()
        translated_text = loop.run_until_complete(translate_text(text, "en")).text
        intent, urgency = classify_intent(translated_text)  

        request_data = {
            "original_text": text,
            "translated_text": translated_text,
            "intent": intent,
            "urgency": urgency,
            "language": language
        }

        with MongoClient(MONGO_URI) as client:  # 🔹 Auto-closes connection
            db = client["VoiceBasedPatientCare"]
            requests_collection = db["VoiceRequests"]
            request_id = requests_collection.insert_one(request_data).inserted_id  

        result = {"text": "Request sent"}  
        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": f"Error processing audio: {e}"}))

if __name__ == "__main__":
    check_mongo_connection()

    if len(sys.argv) < 2:
        sys.exit(1)

    audio_path = sys.argv[1]
    process_audio_file(audio_path)
