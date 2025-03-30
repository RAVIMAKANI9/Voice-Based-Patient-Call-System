from googletrans import Translator

translator = Translator()

def translate_text(text, target_language="en"):
    return translator.translate(text, dest=target_language)
