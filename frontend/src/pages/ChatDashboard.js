import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatDashboard.css";

export default function ChatDashboard() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [history, setHistory] = useState([]);

  // ✅ LOAD HISTORY FROM BACKEND (JSON FILE)
  useEffect(() => {
    fetch("http://127.0.0.1:5000/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.log("History load error:", err));
  }, []);

  // ✅ SEND MESSAGE TO BACKEND
  const sendMessage = async () => {
    if (!message.trim()) return;

    // User message
    const userMsg = { sender: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", {
        text: message,
      });

      // Bot response
      const botMsg = {
        sender: "bot",
        intent: res.data.intent,
        confidence: res.data.confidence,
        json: res.data,
      };

      setChat((prev) => [...prev, botMsg]);

      // Update sidebar history live
      setHistory((prev) => [
        {
          text: message,
          intent: res.data.intent,
          confidence: res.data.confidence,
        },
        ...prev,
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          intent: "Error",
          confidence: 0,
          json: { error: "Backend not reachable" },
        },
      ]);
    }

    setMessage("");
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h3>📜 Intent History</h3>

        {history.length === 0 && <p>No history yet</p>}

        {history.map((h, i) => (
          <div key={i} className="history">
            <p><b>Text:</b> {h.text}</p>
            <p><b>Intent:</b> {h.intent}</p>
            <p><b>Confidence:</b> {h.confidence}%</p>
          </div>
        ))}
      </div>

      {/* CHAT AREA */}
      <div className="chat-area">
        <h2>🏦 Banking Intent Chatbot</h2>

        {/* CHAT BOX */}
        <div className="chat-box">
          {chat.map((c, i) => (
            <div key={i} className={c.sender === "user" ? "user" : "bot"}>
              {c.sender === "user" ? (
                c.text
              ) : (
                <>
                  <div><b>Intent:</b> {c.intent}</div>
                  <div><b>Confidence:</b> {c.confidence}%</div>

                  {/* JSON OUTPUT */}
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type banking message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}