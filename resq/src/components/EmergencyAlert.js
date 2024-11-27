import React, { useState, useEffect } from "react";
import ContactList from "./ContactList";
import "../styles.css";

const EmergencyAlert = () => {
  const [contacts, setContacts] = useState([]);
  const [emergencyType, setEmergencyType] = useState("Medical Emergency");
  const [customMessage, setCustomMessage] = useState("");
  const [isSilent, setIsSilent] = useState(false);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(savedContacts);

    // Get the current location of the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Failed to get location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("isDarkMode");
    if (savedTheme === "true") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("isDarkMode", newMode);
      if (newMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      return newMode;
    });
  };

  const handleContactsChange = (newContacts) => {
    setContacts(newContacts);
  };

  const sendAlert = async () => {
    const alertData = {
      message: customMessage || `Emergency Type: ${emergencyType}`,
      location: location
        ? `https://maps.google.com/?q=${location.latitude},${location.longitude}`
        : "Location not available",
      contacts,
    };

    if (isSilent) {
      alertData.message = "Silent emergency alert! Please help.";
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alertData),
      });

      setIsLoading(false);

      if (response.ok) {
        alert("Emergency alert sent successfully!");
      } else {
        alert("Failed to send the alert.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending alert:", error);
      alert("Failed to send the alert.");
    }
  };

  const contactAuthorities = (service) => {
    let phoneNumber = "";

    if (service === "police") {
      phoneNumber = "999";
    } else if (service === "ambulance") {
      phoneNumber = "112";
    }

    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="alert-container">
      <h1 className="alert-title">Emergency Alert System</h1>
      <button className="theme-toggle" onClick={handleThemeToggle}>
        Toggle {isDarkMode ? "Light" : "Dark"} Mode
      </button>

      <div className="section-container">
        <div className="section">
          <h3>Select Emergency Type:</h3>
          <select
            className="emergency-select"
            value={emergencyType}
            onChange={(e) => setEmergencyType(e.target.value)}
          >
            <option value="Medical Emergency">Medical Emergency</option>
            <option value="Robbery">Robbery</option>
            <option value="Fire">Fire</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        <div className="section">
          {emergencyType === "Custom" && (
            <div className="custom-message">
              <h3>Custom Message:</h3>
              <textarea
                className="custom-textarea"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Describe your emergency..."
              ></textarea>
            </div>
          )}

          <div className="silent-alert">
            <label>
              Silent Alert
              <input
                type="checkbox"
                checked={isSilent}
                onChange={() => setIsSilent(!isSilent)}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="alert-button-container">
        <button
          onClick={sendAlert}
          className="alert-button"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Emergency Alert"}
        </button>
      </div>

      <div className="quick-access">
        <button
          onClick={() => contactAuthorities("police")}
          className="quick-access-button blue"
        >
          Quick Access to Police
        </button>
        <button
          onClick={() => contactAuthorities("ambulance")}
          className="quick-access-button green"
        >
          Quick Access to Ambulance
        </button>
      </div>

      {location && (
        <div className="location-display">
          <h4>Your Location:</h4>
          <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
          <a
            href={`https://maps.google.com/?q=${location.latitude},${location.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Google Maps
          </a>
        </div>
      )}
    </div>
  );
};

export default EmergencyAlert;
