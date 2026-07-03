import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatDashboard.css";
const API_URL = "https://banking-intent-recognition-system.onrender.com";

export default function ChatDashboard() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [history, setHistory] = useState([]);

  // =========================
  // LOAD HISTORY
  // =========================
  useEffect(() => {
    axios.get(`${API_URL}/history`)
      .then((res) => {
        console.log("HISTORY RESPONSE:", res.data);

        if (Array.isArray(res.data)) {
          setHistory(res.data);
        } else {
          setHistory([]);
        }
      })
      .catch((err) => {
        console.error("History Error:", err);
        setHistory([]);
      });
  }, []);

  // =========================
  // SEND MESSAGE
  // =========================
  const sendMessage = async () => {
    if (!message.trim()) return;

    const currentMessage = message;

    // Show user message
    setChat((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");

    try {
      console.log("Sending:", currentMessage);

     const res = await axios.post(
  `${API_URL}/predict`,
  {
    text: currentMessage,
  }
);

      console.log("BACKEND RESPONSE:", res.data);

      // Show bot response
      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          intent: res.data.intent,
          confidence: res.data.confidence,
          json: res.data,
        },
      ]);

      // Update history
      setHistory((prev) => [
        {
          text: currentMessage,
          intent: res.data.intent,
          confidence: res.data.confidence,
        },
        ...prev,
      ]);
    } catch (error) {
      console.error("AXIOS ERROR:", error);

      let errorData = {
        error: "Unknown Error",
      };

      if (error.response) {
        errorData = error.response.data;
      } else if (error.request) {
        errorData = {
          error: "No response received from backend",
        };
      } else {
        errorData = {
          error: error.message,
        };
      }

      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          intent: "Error",
          confidence: 0,
          json: errorData,
        },
      ]);
    }
  };

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h3>📜 Intent History</h3>

        {history.length === 0 ? (
          <p>No history yet</p>
        ) : (
          history.map((h, i) => (
            <div key={i} className="history">
              <p>
                <b>Text:</b> {h.text}
              </p>

              <p>
                <b>Intent:</b> {h.intent}
              </p>

              <p>
                <b>Confidence:</b> {h.confidence}%
              </p>
            </div>
          ))
        )}
      </div>

      {/* CHAT AREA */}
      <div className="chat-area">
        <h2>🏦 Banking Intent Chatbot</h2>

        <div className="chat-box">
          {chat.map((c, i) => (
            <div
              key={i}
              className={c.sender === "user" ? "user" : "bot"}
            >
              {c.sender === "user" ? (
                c.text
              ) : (
                <>
                  <div>
                    <b>Intent:</b> {c.intent}
                  </div>

                  <div>
                    <b>Confidence:</b> {c.confidence}%
                  </div>

                  <pre className="json-box">
                    {JSON.stringify(c.json, null, 2)}
                  </pre>
                </>
              )}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="input-box">
          <input
            type="text"
            value={message}
            placeholder="Type banking message..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}