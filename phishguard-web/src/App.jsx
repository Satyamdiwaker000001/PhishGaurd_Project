import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import './App.css';

function App() {
  return (
    <Router>
      {/* Wrapper with no-scrollbar class for professional clean look */}
      <div className="no-scrollbar">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Props pass ho rahe hain authentication logic handle karne ke liye */}
          <Route path="/login" element={<Authentication isLoginMode={true} />} />
          <Route path="/signup" element={<Authentication isLoginMode={false} />} />
        </Routes>
      </div>
    </Router>
  );
}

// FIXED: Semicolon added at the end for standard ES6 syntax
export default App;