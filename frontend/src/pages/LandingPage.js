import React from "react";
import "./LandingPage.css";

export default function LandingPage({ onStart }) {
  return (
    <div className="landing-container">

      <div className="hero">

        <div className="hero-text">
          <h1>🏦 Banking Intent Recognition System</h1>

          <p>
            An AI-powered NLP system that understands banking queries and
            classifies them into intents using Machine Learning.
          </p>

          <button onClick={onStart} className="btn">
            🚀 Launch Chatbot
          </button>
        </div>

        <div className="hero-img">
          <img
            src="https://wenyueh.github.io/en/project/LLM-NLP/featured_hu4d9952460139f50438094216d527c2af_1098213_d9f717e3fc2aafccc79e74aa4089e1c6.webp"
            alt="AI Banking"
          />
          {/* <img
            src="https://www.andplus.com/hubfs/shutterstock_1464504269.jpg"
            alt="AI Banking"
          /> */}
        </div>

      </div>

      <div className="cards">

        <div className="card">
          <h3>🧠 NLP Engine</h3>
          <p>TF-IDF + Logistic Regression model for intent classification.</p>
        </div>

        <div className="card">
          <h3>⚙️ Tech Stack</h3>
          <p>Python, Flask, React, Scikit-learn, Axios</p>
        </div>

        <div className="card">
          <h3>📊 Features</h3>
          <p>Real-time prediction, confidence score, JSON output, history</p>
        </div>

      </div>

    </div>
  );
}