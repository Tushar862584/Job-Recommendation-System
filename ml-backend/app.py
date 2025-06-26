from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import os

app = Flask(__name__)
CORS(app)

# Load recommendation data (DataFrame)
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.pkl')
with open(MODEL_PATH, 'rb') as f:
    data = pickle.load(f)
   
    data = pd.DataFrame(data)  
    print("Columns:", data.columns.tolist())

@app.route("/predict", methods=["POST"])
def predict():
    content = request.get_json()
    text = content.get("combined_text", "").lower()

    # Filter jobs by some text matching logic
    filtered = data[data['job_title'].str.lower().str.contains(text)]

    # Return top 5 results
    recommended = filtered.head(100).to_dict(orient="records")
    return jsonify(recommended_jobs=recommended)

if __name__ == "__main__":
    app.run(port=5000)

