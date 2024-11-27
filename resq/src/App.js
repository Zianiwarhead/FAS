import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";

// Import your components/pages
import Home from "./pages/Home";
import About from "./pages/About";
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
  padding: "10px 0",
  borderRadius: "5px",
  marginBottom: "20px",
  position: "sticky",
  top: "0",
  zIndex: "100",
  backgroundColor: "#f5f5f5", // Neutral light gray background for the navbar
};

const navItemStyles = {
  listStyleType: "none",
  margin: "0 20px",
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
              <NavLink
                to="/"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? { backgroundColor: "#2790f1", ...navItemStyles }
                    : {}
                }
              >
                Home
              </NavLink>
            </li>
            <li style={navItemStyles}>
              <NavLink
                to="/about"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? { backgroundColor: "#2790f1", ...navItemStyles }
                    : {}
                }
              >
                About
              </NavLink>
            </li>
            <li style={navItemStyles}>
              <NavLink
                to="/emergency-alert"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? { backgroundColor: "#2790f1", ...navItemStyles }
                    : {}
                }
              >
                Emergency Alert
              </NavLink>
            </li>
            <li style={navItemStyles}>
              {/* Toggle button */}
              <button
                onClick={toggleMode}
                style={buttonStyles}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = buttonStyles.backgroundColor)
                }
              >
                {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </button>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
          <Route path="/emergency-alert" element={<EmergencyAlert isDarkMode={isDarkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
