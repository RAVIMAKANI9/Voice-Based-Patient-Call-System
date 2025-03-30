from pymongo import MongoClient

try:
    # Connect to MongoDB Compass locally
    client = MongoClient("mongodb://localhost:27017/")  
    db = client["patient_call_system"]
    requests_collection = db["requests"]
    
    # Test connection
    print("✅ MongoDB Connection Successful!")
except Exception as e:
    print("❌ MongoDB Connection Failed!", e)
    