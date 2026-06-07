import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os

app = Flask(__name__)
CORS(app)

# ----------------------------
# PATH SETUP
# ----------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model_path = os.path.join(BASE_DIR, "model", "logistic_model.pkl")
vectorizer_path = os.path.join(BASE_DIR, "model", "vectorizer.pkl")

history_file = os.path.join(BASE_DIR, "history.json")

# ----------------------------
# LOAD MODEL
# ----------------------------
with open(model_path, "rb") as f:
    model = pickle.load(f)

with open(vectorizer_path, "rb") as f:
    vectorizer = pickle.load(f)

# ----------------------------
# HOME ROUTE
# ----------------------------
@app.route("/")
def home():
    return "Banking Intent Recognition API is running"

# ----------------------------
# PREDICT ROUTE
# ----------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data or "text" not in data:
            return jsonify({"error": "Please provide 'text' in JSON body"}), 400

        text = data["text"]

        # Vectorize input
        X = vectorizer.transform([text])

        # Predict
        prediction = model.predict(X)[0]

        # Confidence
        confidence = None
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(X)[0]
            confidence = round(float(max(probs)) * 100, 2)

        result = {
            "text": text,
            "intent": prediction,
            "confidence": confidence
        }

        # ----------------------------
        # SAVE TO HISTORY (JSON FILE)
        # ----------------------------
        if os.path.exists(history_file):
            with open(history_file, "r") as f:
                history = json.load(f)
        else:
            history = []

        history.append(result)

        with open(history_file, "w") as f:
            json.dump(history, f, indent=4)

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----------------------------
# HISTORY ROUTE
# ----------------------------
@app.route("/history", methods=["GET"])
def history():
    try:
        if os.path.exists(history_file):
            with open(history_file, "r") as f:
                data = json.load(f)
        else:
            data = []

        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----------------------------
# RUN APP
# ----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)