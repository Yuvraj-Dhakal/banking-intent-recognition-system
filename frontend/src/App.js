import React, { useState } from "react";
import LandingPage from "./pages/LandingPage";
import ChatDashboard from "./pages/ChatDashboard";

function App() {
  const [started, setStarted] = useState(false);

  return started ? (
    <ChatDashboard />
  ) : (
    <LandingPage onStart={() => setStarted(true)} />
  );
}

export default App;