from flask import Flask, request, jsonify

app = Flask(__name__)

# Default route for the root URL
@app.route('/')
def index():
    return "Welcome to the Emergency Alert Backend!"

# Route to handle sending alerts
@app.route('/send-alert', methods=['POST'])
def send_alert():
    data = request.get_json()
    message = data.get('message', '')
    location = data.get('location', '')
    contacts = data.get('contacts', [])
    
    # Simulate sending alerts
    for contact in contacts:
        print(f"Sending alert to {contact}: {message} at {location}")
    
    return jsonify({"success": True, "message": "Alerts sent!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
