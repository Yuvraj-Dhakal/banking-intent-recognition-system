# Intent NLP – Banking Intent Recognition using Logistic Regression

A full-stack Natural Language Processing (NLP) application that classifies customer banking queries into predefined banking intents using **Logistic Regression** and **TF-IDF Vectorization**. The application provides a RESTful API built with Flask, a React-based user interface, and stores prediction history in MongoDB Atlas.

---

# Project Overview

Intent NLP is a machine learning-based banking intent recognition system developed to automatically identify the intent behind customer queries. The system accepts natural language text as input, predicts the most relevant banking intent, and returns a confidence score indicating the reliability of the prediction.

The project demonstrates the integration of machine learning, backend development, frontend development, and cloud database technologies into a complete end-to-end application.

---

# Features

* Banking intent classification using Natural Language Processing (NLP)
* Logistic Regression machine learning model
* TF-IDF text vectorization
* Confidence score for every prediction
* Configurable confidence threshold
* Flask REST API
* React frontend dashboard
* MongoDB Atlas integration for prediction history
* Model serialization using Pickle
* Clean and modular project structure

---

# Technology Stack

## Frontend

* React
* JavaScript (ES6)
* HTML5
* CSS3
* Axios

## Backend

* Flask
* Flask-CORS
* Python

## Machine Learning

* Scikit-learn
* Logistic Regression
* TF-IDF Vectorizer
* Pickle

## Database

* MongoDB Atlas

---

# Project Structure

```text
TML-NLP/
│
├── backend/
│   ├── app.py
│   └── history.json
│
├── dataset/
│   ├── train.csv
│   ├── test.csv
│   └── trainingyuv12_clean.csv
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── model/
│   ├── logistic_model.pkl
│   └── vectorizer.pkl
│
├── notebooks/
│
├── train_model.py
│
└── README.md
```

---

# Machine Learning Pipeline

```text
Dataset
   │
   ▼
Data Cleaning
   │
   ▼
TF-IDF Vectorization
   │
   ▼
Logistic Regression Training
   │
   ▼
Model Serialization (.pkl)
   │
   ▼
Flask REST API
   │
   ▼
React Frontend
```

---

# Dataset

The project contains multiple datasets used during development.

* **train.csv** – Original training dataset
* **test.csv** – Testing dataset
* **trainingyuv12_clean.csv** – Cleaned and enhanced dataset used for training the latest Logistic Regression model

---

# Model Information

| Attribute            | Value               |
| -------------------- | ------------------- |
| Algorithm            | Logistic Regression |
| Feature Extraction   | TF-IDF Vectorizer   |
| Language             | English             |
| Model Format         | Pickle (.pkl)       |
| Confidence Threshold | 70%                |

The model predicts the most probable banking intent and returns a confidence score for each prediction. Predictions below the configured threshold should be interpreted with additional caution.

---

# API Endpoints

## Home

**GET /**

Returns API status.

Example Response

```json
{
  "message": "Banking Intent API is running"
}
```

---

## Predict Intent

**POST /predict**

Request

```json
{
  "text": "I received my salary today"
}
```

Example Response

```json
{
  "intent": "receiving_money",
  "confidence": 84.68,
  "threshold": 60
}
```

---

## Prediction History

**GET /history**

Returns all stored prediction history from MongoDB Atlas.

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/Yuvraj-Dhakal/banking-intent-recognition-system.git
```

```bash
cd banking-intent-recognition-system
```

---

# Backend Setup

Create a virtual environment

```bash
python -m venv .venv
```

Activate the virtual environment

### Windows

```bash
.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the Flask server

```bash
cd backend
python app.py
```

The backend will start on:

```text
http://localhost:5000
```

---

# Frontend Setup

Navigate to the frontend directory

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run the React application

```bash
npm start
```

The frontend will start on:

```text
http://localhost:3000
```

---

# Model Training

To retrain the Logistic Regression model after updating the dataset:

```bash
python train_model.py
```

This generates:

* logistic_model.pkl
* vectorizer.pkl

inside the **model/** directory.

---

# Example Prediction

Input

```text
I want to transfer money to my friend.
```

Output

```json
{
    "intent": "money_transfer",
    "confidence": 91.42,
    "threshold": 60
}
```

---

# Future Improvements

* Implement DistilBERT for intent classification
* Compare Logistic Regression with transformer-based models
* JWT-based user authentication
* Docker containerization
* CI/CD pipeline
* Improved confidence calibration
* Real-time deployment on Hugging Face Spaces or cloud platforms

---

# Author

**Yuv Raj Dhakal**

Bachelor of Computer Science and Information Technology (BSc CSIT)

---

# License

This project is intended for educational, academic, and research purposes.

---

# Acknowledgements

This project was developed as part of a Natural Language Processing (NLP) learning initiative to explore machine learning techniques for banking intent recognition using a full-stack application architecture.
