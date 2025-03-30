import spacy
import re

nlp = spacy.load("en_core_web_sm")

def classify_intent(text):
    text_lower = text.lower()
    # Define emergency keywords
    emergency_keywords = [
        "help", "emergency", "urgent", "assistance", "doctor", "nurse",
        "accident", "fire", "injured", "injury", "ambulance"
    ]
    for keyword in emergency_keywords:
        # Use regex to match whole words only
        if re.search(r'\b' + re.escape(keyword) + r'\b', text_lower):
            return "request_assistance", "high"
    
    # You can define additional keywords for other intents if needed
    general_keywords = [
        "information", "query", "question", "appointment", "schedule", "advice"
    ]
    for keyword in general_keywords:
        if re.search(r'\b' + re.escape(keyword) + r'\b', text_lower):
            return "general_request", "medium"
    
    # Default: non-urgent request
    return "general_request", "low"
