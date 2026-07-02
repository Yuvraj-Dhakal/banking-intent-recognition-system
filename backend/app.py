from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pickle
from pymongo import MongoClient
# APP INIT
app = Flask(__name__)
CORS(app)
# BASE DIRECTORY
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# MODEL PATHS
model_path = os.path.join(BASE_DIR, "model", "logistic_model.pkl")
vectorizer_path = os.path.join(BASE_DIR, "model", "vectorizer.pkl")
# LOAD MODEL
try:
    with open(model_path, "rb") as f:
        model = pickle.load(f)
    with open(vectorizer_path, "rb") as f:
        vectorizer = pickle.load(f)
    print("Model and Vectorizer Loaded")
except Exception as e:
    print(" X MODEL LOAD ERROR:", e)
# MONGODB
MONGO_URI = "mongodb+srv://Yuvrajdb:Yuv%401010@cluster0.6okc379.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

try:
    client = MongoClient(MONGO_URI)
    client.admin.command("ping")
    print("MongoDB Connected Successfully")
    db = client["banking_chatbot"]
    collection = db["history"]

except Exception as e:
    print(" X  MongoDB Connection Error:", e)
# CONFIDENCE THRESHOLD
CONFIDENCE_THRESHOLD = 70
# HOME ROUTE
@app.route("/")
def home():
    return jsonify({"message": "Banking Intent API is running"})
# PREDICT ROUTE
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        if not data or "text" not in data: 
            return jsonify({"error": "Please provide text"}), 400
        text = data["text"]
        print(" Received:", text)
        X = vectorizer.transform([text])
        prediction = model.predict(X)[0]
        confidence = None
        final_intent = prediction
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(X)[0]
            confidence = round(float(max(probs)) * 100, 2)

            if confidence < CONFIDENCE_THRESHOLD:
                final_intent = "uncertain"
        result = {
            "text": text,
            "intent": final_intent,
            "confidence": confidence,
            "threshold": CONFIDENCE_THRESHOLD
        }

        print(" Result:", result)

        # Save a COPY to MongoDB
        collection.insert_one(result.copy())

        # Return original dictionary
        return jsonify(result)

    except Exception as e:
        print(" ..... PREDICT ERROR:", e)
        return jsonify({"error": str(e)}), 500
# HISTORY ROUTE
# ----------------------------
@app.route("/history", methods=["GET"])
def history():
    try:
        data = list(collection.find({}, {"_id": 0}))
        return jsonify(data)

    except Exception as e:
        print("HISTORY ERROR:", e)
        return jsonify({"error": str(e)}), 500
# RUN SERVER
# ----------------------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)