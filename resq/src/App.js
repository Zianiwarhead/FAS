import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// Import your components/pages
import Home from "./pages/Home";
import About from "./pages/About";
import Settings from "./pages/Settings";
import EmergencyAlert from "./components/EmergencyAlert";

// Styles for light and dark modes
const lightModeStyles = {
  backgroundColor: "#fff",
  color: "#000",
};

const darkModeStyles = {
  backgroundColor: "#333",
  color: "#fff",
};

const navBarStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#e63946",
  padding: "10px 0",
  borderRadius: "5px",
  marginBottom: "20px",
  position: "sticky",
  top: "0",
  zIndex: "100",
};

const navItemStyles = {
  listStyleType: "none",
  margin: "0 20px",
};

const linkStyles = {
  textDecoration: "none",
  color: "white",
  fontSize: "1.2rem",
  padding: "10px 20px",
  borderRadius: "5px",
  transition: "background-color 0.3s",
};

const linkHoverStyles = {
  backgroundColor: "#d62828",
};

const buttonStyles = {
  backgroundColor: "#f1faee",
  color: "#333",
  padding: "8px 15px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginLeft: "20px",
  transition: "background-color 0.3s",
};

const buttonHoverStyles = {
  backgroundColor: "#a8dadc",
};

function App() {
  // State to toggle between light and dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle mode function
  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div style={isDarkMode ? darkModeStyles : lightModeStyles}>
        {/* Navigation bar */}
        <nav style={navBarStyles}>
          <ul style={{ display: "flex", padding: "0", margin: "0" }}>
            <li style={navItemStyles}>
              <Link to="/" style={linkStyles} onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)} onMouseOut={(e) => (e.target.style.backgroundColor = "")}>
                Home
              </Link>
            </li>
            <li style={navItemStyles}>
              <Link to="/about" style={linkStyles} onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)} onMouseOut={(e) => (e.target.style.backgroundColor = "")}>
                About
              </Link>
            </li>
            <li style={navItemStyles}>
              <Link to="/settings" style={linkStyles} onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)} onMouseOut={(e) => (e.target.style.backgroundColor = "")}>
                Settings
              </Link>
            </li>
            <li style={navItemStyles}>
              <Link to="/emergency-alert" style={linkStyles} onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)} onMouseOut={(e) => (e.target.style.backgroundColor = "")}>
                Emergency Alert
              </Link>
            </li>
            <li style={navItemStyles}>
              {/* Toggle button to switch between light and dark mode */}
              <button
                onClick={toggleMode}
                style={buttonStyles}
                onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyles.backgroundColor)}
              >
                {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </button>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/emergency-alert" element={<EmergencyAlert />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
