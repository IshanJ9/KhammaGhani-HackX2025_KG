import streamlit as st
import snowflake.connector
from flask import Flask, request, jsonify
from snowflake.snowpark import Session
from snowflake.cortex import Complete
from snowflake.core import Root
import json
import pandas as pd

# Initialize Flask app
app = Flask(__name__)

# Snowflake Connection Parameters
SNOWFLAKE_CONFIG = {
    "account": st.secrets["account"],  # Replace with your Snowflake account identifier
    "user": st.secrets["user"],  # Replace with your Snowflake username
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

# Access Cortex Search Service
svc = root.databases["CARDIO"].schemas["DATA"].cortex_search_services["HEART_SEARCH_SERVICE_CS"]

def generate_medical_prompt(conversation_history):
    """Create a structured prompt for conversational metabolic risk assessment."""
    prompt = f"""
        You are an AI medical assistant conducting a conversational metabolic risk assessment. Engage naturally with the user and gather missing details.
        If the user asks about medical terms, provide clear explanations.
        
        Required Information:
        - Age
        - Sex (M/F)
        - BMI (Body Mass Index)
        - Blood Pressure (Systolic/Diastolic in mmHg)
        - Fasting Blood Sugar (mg/dL)
        - Triglycerides Level (mg/dL)
        - HDL Cholesterol Level (mg/dL)
        - Waist Circumference (cm)
        - Physical Activity Level (Low, Moderate, High)
        - Smoking Status (Yes/No)
        - Family History of Metabolic Syndrome (Yes/No)
        
        Maintain a friendly, conversational tone. Once all information is gathered, analyze the metabolic risk factors and suggest recommendations.
        
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

@app.route("/search_health_data", methods=["POST"])
def search_health_data():
    data = request.json
    query = data.get("query", "")
    limit = data.get("limit", 5)

    # Perform AI-powered search in Cortex
    search_results = Search(svc, query, limit=limit)

    return jsonify({"results": search_results})

@app.route("/upload_metabolic_data", methods=["POST"])
def upload_metabolic_data():
    file_path = "/mnt/data/Metabolic Syndrome.csv"  # Path to uploaded dataset
    df = pd.read_csv(file_path)
    session.write_pandas(df, "METABOLIC_SYNDROME", overwrite=True)
    return jsonify({"message": "Metabolic Syndrome dataset uploaded successfully"})

@app.route("/search_metabolic_risk", methods=["POST"])
def search_metabolic_risk():
    data = request.json
    query = data.get("query", "")
    limit = data.get("limit", 5)

    # Perform AI-powered search in Cortex for metabolic risk
    search_results = Search(svc, query, limit=limit)

    return jsonify({"results": search_results})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
