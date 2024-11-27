import React, { useState } from 'react';

const ContactList = ({ contacts, onContactsChange }) => {
  const [newContact, setNewContact] = useState('');

  const handleAddContact = () => {
    if (newContact.trim() === '') {
      alert('Contact cannot be empty!');
      return;
    }

    if (contacts.includes(newContact)) {
      alert('This contact is already in the list!');
      return;
    }

    const updatedContacts = [...contacts, newContact];
    onContactsChange(updatedContacts);
    setNewContact(''); // Clear the input field
  };

  const handleRemoveContact = (contactToRemove) => {
    const updatedContacts = contacts.filter((contact) => contact !== contactToRemove);
    onContactsChange(updatedContacts);
  };

  return (
    <div>
      <h2>Emergency Contacts</h2>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            {contact}{' '}
            <button onClick={() => handleRemoveContact(contact)} style={{ color: 'red' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newContact}
        onChange={(e) => setNewContact(e.target.value)}
        placeholder="Enter new contact"
      />
      <button onClick={handleAddContact}>Add Contact</button>
    </div>
  );
};

export default ContactList;
