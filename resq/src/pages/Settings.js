import React, { useState } from 'react';
import ContactList from '../components/ContactList';

const Settings = () => {
  const [contacts, setContacts] = useState([]);

  return (
    <div>
      <h1>Manage Your Emergency Contacts</h1>
      <ContactList contacts={contacts} setContacts={setContacts} />
    </div>
  );
};

export default Settings;
