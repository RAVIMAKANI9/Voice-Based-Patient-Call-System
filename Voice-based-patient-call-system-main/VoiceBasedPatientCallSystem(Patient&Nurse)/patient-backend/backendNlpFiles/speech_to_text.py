import warnings
import os
import sys
import whisper

# Suppress warnings
warnings.filterwarnings("ignore")

# Load the Whisper model
model = whisper.load_model("base")

def process_audio(audio_path):
    """Convert speech to text using Whisper."""
    try:
        # Ensure the audio file exists
        if not os.path.isfile(audio_path):
            raise FileNotFoundError(f"Audio file '{audio_path}' not found")

        # Transcribe the audio
        result = model.transcribe(audio_path)

        return result["text"]  # Return transcribed text
    
    except Exception as e:
        print("Error transcribing audio:", e)
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py <audio_path>")
        sys.exit(1)
    
    audio_path = sys.argv[1]
    transcription = process_audio(audio_path)
    print(transcription)