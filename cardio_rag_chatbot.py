import streamlit as st  
from snowflake.snowpark.context import get_active_session
from snowflake.cortex import Complete
from snowflake.core import Root
import pandas as pd
import json
import random

pd.set_option("max_colwidth", None)

# Define dataset-related questions
FIELD_QUESTIONS = {
    "Age": "What is your age?",
    "Sex": "What is your biological sex (M/F)?",
    "ChestPainType": "What type of chest pain do you experience (ATA, NAP, ASY)?",
    "RestingBP": "What is your resting blood pressure (mmHg)?",
    "Cholesterol": "What is your cholesterol level (mg/dL)?",
    "FastingBS": "Is your fasting blood sugar >120 mg/dL? (Yes/No)",
    "RestingECG": "What is your resting ECG result? (Normal, ST, LVH)",
    "MaxHR": "What is your maximum heart rate achieved?",
    "ExerciseAngina": "Do you experience angina during exercise? (Yes/No)",
    "Oldpeak": "What is your ST depression induced by exercise?",
    "ST_Slope": "What is the slope of your peak ST segment? (Up, Flat, Down)"
}

session = get_active_session()
root = Root(session)                         
svc = root.databases["CARDIO"].schemas["DATA"].cortex_search_services["HEART_SEARCH_SERVICE_CS"]

def initialize_questions():
    if "questions" not in st.session_state:
        st.session_state.questions = list(FIELD_QUESTIONS.keys())  # Get field names
        random.shuffle(st.session_state.questions)  # Shuffle them
        st.session_state.q_index = 0  # Track progress
        st.session_state.user_inputs = {}  # Reset user inputs
        st.session_state.messages = []  # Reset messages

def get_next_question():
    if st.session_state.q_index < len(st.session_state.questions):
        field = st.session_state.questions[st.session_state.q_index]
        return field, FIELD_QUESTIONS[field]
    return None, None  # No more questions

def generate_medical_prompt(user_data):
    """Create a structured prompt using gathered inputs"""
    prompt = f"""
        You are an AI medical assistant analyzing a patient's heart disease risk based on their provided details.
        Below is the collected information:

        {json.dumps(user_data, indent=2)}

        Use this information to provide an assessment. Focus on `HeartDisease` and `Risk` categories.
        If risk is high, provide guidance on what factors contributed.
    """
    return prompt

def answer_question():
    user_data = st.session_state.user_inputs
    medical_prompt = generate_medical_prompt(user_data)
    response = Complete("llama3.1-70b", medical_prompt)  # AI model query
    return response

def main():
    st.sidebar.title("Navigation")
    page = st.sidebar.radio("Go to:", ["Heart Risk Assessment", "Metabolic Health", "Organ Systems Evaluation", "Data Consent"])
    
    if page == "Heart Risk Assessment":
        st.title(":stethoscope: Heart Disease Risk Assessment AI")
        st.write("The AI will ask you health-related questions to assess your heart disease risk. You can also ask questions.")
    
        if st.button("New Session"):
            initialize_questions()
            st.rerun()
    
        initialize_questions()
    
        # User can also ask questions
        user_input = st.chat_input("Enter your response or ask a question:")
    
        if user_input:
            st.session_state.messages.append({"role": "user", "content": user_input})
            
            if st.session_state.q_index < len(st.session_state.questions):
                field, question = get_next_question()
                if field:
                    st.session_state.user_inputs[field] = user_input  # Store response
                    st.session_state.q_index += 1  # Move to the next question
                    st.rerun()
            else:
                # AI evaluates user data
                with st.chat_message("assistant"):
                    st.markdown("All questions answered. Analyzing data...")
                    result = answer_question()
                    st.markdown(result)
                    st.session_state.messages.append({"role": "assistant", "content": result})
    
        # Display AI messages
        for message in st.session_state.messages:
            with st.chat_message(message["role"]):
                st.markdown(message["content"])
    
    elif page == "Metabolic Health":
        st.title(":apple: Metabolic Health AI")
        st.write("This section will evaluate your metabolic health factors.")
    
    elif page == "Organ Systems Evaluation":
        st.title(":lungs: Organ Systems Evaluation")
        st.write("This section will help assess various organ systems.")
    
    elif page == "Data Consent":
        st.title(":lock: Data Consent")
        st.write("Manage your data privacy and consent settings here.")

if __name__ == "__main__":
    main()
