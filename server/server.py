from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    # Process the message and generate a response
    response = {"response": f"Received: {message}"}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)