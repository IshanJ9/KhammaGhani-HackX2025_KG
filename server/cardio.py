import streamlit as st
import snowflake.connector
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from snowflake.snowpark import Session
from snowflake.cortex import Complete
from snowflake.core import Root
import json

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Snowflake Connection Parameters
SNOWFLAKE_CONFIG = {
    "account": st.secrets["account"],
    "user": st.secrets["user"],
    "password": st.secrets["password"],
    "role": st.secrets["role"],
    "database": st.secrets["database"],
    "schema": st.secrets["schema"],
    "warehouse": st.secrets["warehouse"]
}

# Function to establish Snowflake connection
def init_snowflake_session():
    conn = snowflake.connector.connect(**SNOWFLAKE_CONFIG)
    return conn

# Initialize Snowflake session
conn = init_snowflake_session()
session = Session.builder.configs(SNOWFLAKE_CONFIG).create()
root = Root(session)
svc = root.databases["CARDIO"].schemas["DATA"].cortex_search_services["HEART_SEARCH_SERVICE_CS"]

def generate_medical_prompt(conversation_history):
    """Create a structured prompt for natural conversation-based data collection."""
    prompt = f"""
        You are an AI medical assistant conducting a conversational health assessment. Engage naturally with the user and gather the following health information:
        
        - Age
        - Sex (M/F)
        - Type of chest pain (ATA, NAP, ASY)
        - Resting blood pressure (mmHg)
        - Cholesterol level (mg/dL)
        - Fasting blood sugar (>120 mg/dL, Yes/No)
        - Resting ECG result (Normal, ST, LVH)
        - Exercise-induced angina (Yes/No)
        - Slope of peak ST segment (Up, Flat, Down)
        
        Maintain a friendly, conversational tone and collect missing details naturally. Avoid asking multiple questions at once. Once all information is gathered, provide an assessment focusing on HeartDisease and Risk factors. 
        
        Conversation History:
        {json.dumps(conversation_history, indent=2)}
        
        Respond accordingly.
    """
    return prompt

@app.route("/get_response", methods=["POST"])
def get_response():
    data = request.json
    conversation_history = data.get("conversation_history", [])

    # Generate medical prompt
    medical_prompt = generate_medical_prompt(conversation_history)

    # Get response from Snowflake Cortex LLM
    response = Complete("mistral-large", medical_prompt)

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
