import React, { useState, useEffect } from 'react';

function Home() {
  const [contacts, setContacts] = useState([]); // State to store contacts
  const [name, setName] = useState('');         // State to store name input
  const [phone, setPhone] = useState('');       // State to store phone input
  const [location, setLocation] = useState(null); // State to store location

  // Fetch contacts when the component mounts
  useEffect(() => {
    fetch('http://localhost:8000/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));

    // Get user's location when the component mounts
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

  // Handle form submission to add a new contact
  const handleAddContact = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const newContact = { name, phone }; // Create a new contact object

    // Send the new contact to the backend (json-server)
    fetch('http://localhost:8000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact), // Convert contact to JSON
    })
      .then((response) => response.json()) // Parse the response to JSON
      .then((data) => {
        // Update the contacts state with the new contact
        setContacts((prevContacts) => [...prevContacts, data]);
        setName('');  // Clear the name input field
        setPhone(''); // Clear the phone input field
      })
      .catch((error) => console.error('Error adding contact:', error));
  };

  // Function to send emergency alert with location
  const handleSendAlert = () => {
    if (!location) {
      alert('Location not available');
      return;
    }

    const alertData = {
      message: 'Emergency Alert! Please assist.',
      location: `Latitude: ${location.latitude}, Longitude: ${location.longitude}`,
    };

    // Send the alert data to the backend (json-server)
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

  return (
    <div>
      <h1>Emergency Contacts</h1>

      {/* Form to add new contact */}
      <form onSubmit={handleAddContact}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state on change
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} // Update phone state on change
            required
          />
        </div>
        <button type="submit">Add Contact</button>
      </form>

      {/* List of contacts */}
      <ul>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} - {contact.phone}
            </li>
          ))
        ) : (
          <p>No contacts available</p>
        )}
      </ul>

      {/* Button to send emergency alert */}
      <div>
        <button onClick={handleSendAlert}>
          Send Emergency Alert
        </button>
      </div>

      {/* Display the user's location */}
      {location && (
        <p>Your Location: Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      )}
    </div>
  );
}

export default Home;
