// Load environment variables from .env file
require('dotenv').config();
console.log("Environment variables loaded...");

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

console.log("Dependencies loaded...");

// Initialize Express app
const app = express();
const PORT = 3000;

// Twilio configuration using environment variables
const twilioSid = process.env.TWILIO_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;

console.log("Twilio configuration set:", { twilioSid, twilioPhone });

// Check if required environment variables are missing
if (!twilioSid || !twilioAuthToken || !twilioPhone) {
  console.error("Missing Twilio environment variables. Check your .env file.");
  process.exit(1); // Exit the process if critical variables are missing
}

// Initialize Twilio client
const client = twilio(twilioSid, twilioAuthToken);

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
console.log("Middleware added...");

// POST endpoint to send alerts
app.post('/send-alert', (req, res) => {
  console.log("Received request on /send-alert...");
  const { message, location, contacts } = req.body;

  if (!message || !location || !contacts || !Array.isArray(contacts)) {
    console.error("Invalid request format:", req.body);
    return res.status(400).send({ error: 'Invalid request format' });
  }

  contacts.forEach((contact) => {
    client.messages
      .create({
        body: `${message}\nLocation: ${location}`,
        from: twilioPhone,
        to: contact,
      })
      .then(() => console.log(`Alert sent to ${contact}`))
      .catch((error) => console.error(`Failed to send alert to ${contact}:`, error));
  });

  res.send({ success: true, message: 'Alerts are being sent' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
