from gtts import gTTS

def generate_speech(text, language="hi"):
    tts = gTTS(text=text, lang=language)
    tts.save("response.mp3")
    return "response.mp3"
