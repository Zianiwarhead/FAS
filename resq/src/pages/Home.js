import React, { useState, useEffect } from 'react';
import './Home.css';

function Home({ isDarkMode }) {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleAddContact = (event) => {
    event.preventDefault();

    const newContact = { name, phone };

    fetch('http://localhost:8000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then((data) => {
        setContacts((prevContacts) => [...prevContacts, data]);
        setName('');
        setPhone('');
      })
      .catch((error) => console.error('Error adding contact:', error));
  };

  const handleSendAlert = () => {
    if (!location) {
      alert('Location not available');
      return;
    }

    const alertData = {
      message: 'Emergency Alert! Please assist.',
      location: `Latitude: ${location.latitude}, Longitude: ${location.longitude}`,
    };

    fetch('http://localhost:8000/alerts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(alertData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Emergency alert sent:', data);
        alert('Emergency alert sent with your location!');
      })
      .catch((error) => {
        console.error('Error sending emergency alert:', error);
      });
  };

  // Define styles for light and dark modes
  const containerStyles = {
    backgroundColor: isDarkMode ? '#333' : '#fff',
    color: isDarkMode ? '#fff' : '#000',
    padding: '20px',
  };

  const buttonStyles = {
    backgroundColor: '#f1faee',
    color: isDarkMode ? '#fff' : '#333',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '20px',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyles = {
    backgroundColor: '#a8dadc',
  };

  const instructionTextStyles = {
    color: isDarkMode ? '#fff' : '#000',
  };

  return (
    <div style={containerStyles} className="home-container">
      <h1 className="home-heading">Emergency Contacts</h1>

      {/* Instruction text */}
      <p style={instructionTextStyles} className="instruction-text">
        Add your emergency contacts below. They will be notified in case of an emergency.
      </p>

      {/* Form to add new contact */}
      <form className="home-form" onSubmit={handleAddContact}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter contact's name"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone:</label>
          <input
            className="form-input"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter contact's phone number"
            required
          />
        </div>
        <button
          style={buttonStyles}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = buttonStyles.backgroundColor)
          }
          className="btn btn-add"
          type="submit"
        >
          Add Contact
        </button>
      </form>

      {/* Instruction text */}
      <p style={instructionTextStyles} className="instruction-text">
        Below are your saved emergency contacts. Click "Send Emergency Alert" to notify them.
      </p>

      {/* List of contacts */}
      <ul className="contact-list">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              {contact.name} - {contact.phone}
            </li>
          ))
        ) : (
          <p className="no-contacts">No contacts available</p>
        )}
      </ul>

      {/* Button to send emergency alert */}
      <button
        style={buttonStyles}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = buttonStyles.backgroundColor)
        }
        className="btn btn-alert"
        onClick={handleSendAlert}
      >
        Send Emergency Alert
      </button>

      {/* Display the user's location */}
      {location && (
        <div className="location-info">
          <p>
            <strong>Your Location:</strong> Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
