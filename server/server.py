from flask import Flask, request, jsonify

# Initialize Flask app
app = Flask(__name__)

# Define the route for handling chatbot prompts
@app.route("/chat", methods=["POST"])
def chat():
    try:
        # Get the user's input from the request
        data = request.json
        user_input = data.get("message")

        if not user_input:
            return jsonify({"error": "No message provided"}), 400

        # Print the user's query to the terminal
        print(f"User Query: {user_input}")

        # Return a simple response (for now)
        return jsonify({"response": "Query received and printed to terminal!"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)