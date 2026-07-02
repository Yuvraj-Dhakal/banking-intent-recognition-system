import os
import pickle
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
# LOAD DATASET
print("Loading dataset...")

train_df = pd.read_csv("dataset/trainingyuv12_clean.csv")

print(f"Dataset Shape : {train_df.shape}")
print(f"Number of Intents : {train_df['category'].nunique()}")
# FEATURES & LABELS
X = train_df["text"]
y = train_df["category"]
# TRAIN / TEST SPLIT
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print(f"Training Samples : {len(X_train)}")
print(f"Testing Samples  : {len(X_test)}")
# TF-IDF VECTORIZER
print("\nTraining TF-IDF Vectorizer...")

vectorizer = TfidfVectorizer(
    max_features=5000,
    ngram_range=(1, 2)
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)
# TRAIN MODEL
print("Training Logistic Regression Model...")

model = LogisticRegression(
    max_iter=1000,
    random_state=42
)

model.fit(X_train_vec, y_train)
# EVALUATE MODEL
predictions = model.predict(X_test_vec)

accuracy = accuracy_score(y_test, predictions)

print("\n==============================")
print(f"Accuracy : {accuracy * 100:.2f}%")
print("==============================\n")

print("Classification Report:\n")
print(classification_report(y_test, predictions))
# SAVE MODEL
os.makedirs("model", exist_ok=True)

with open("model/logistic_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("model/vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("\nModel saved successfully!")
print("Location : model/logistic_model.pkl")

print("Vectorizer saved successfully!")
print("Location : model/vectorizer.pkl")