# 🏥 AI-Powered Medical Examiner Assistant

A web-based application designed to assist with preliminary insurance health assessments using an AI-powered avatar. The application leverages Snowflake Cortex Search for RAG-based retrieval and integrates a WebRTC-based medical avatar for interactive assessments.

## Features

- **Conversational Health Assessment**: Users interact with an AI-powered chatbot that collects preliminary health information.
- **Structured Reports & Risk Scoring**: The system generates structured reports for underwriters with risk scoring.
- **Secure Data Handling & Consent Management**: Ensures user data privacy with secure storage and proper consent mechanisms.
- **Audit Logging**: Tracks interactions for compliance and security.
- **Cortex Search Service**: Enables efficient retrieval of health-related data.

## 🔄 Workflow

1. **Data Storage**: The dataset required for the assessment is stored in the `assets` folder.
2. **Snowflake Cortex Complete**: This service generates responses based on the dataset context and LLM capabilities.
3. **SQL Commands**: The SQL scripts required to replicate our procedure are available in the `snowflake-sql` folder.
4. **Retrieval-Augmented Generation (RAG)**: Snowflake Cortex Search retrieves relevant health data and enhances LLM-generated responses.
5. **User Interaction**: Users provide health details via the chatbot, and the AI avatar assists in assessments.
6. **Risk Scoring & Reporting**: The system processes user data, applies risk assessment logic, and generates structured reports for insurance underwriters.
7. **Secure Handling & Compliance**: Ensures privacy, data protection, and proper audit logging.

## 🚀 How to Run the Application

### Prerequisites
Ensure you have Python installed along with the required dependencies.

### Installation

1. Install the requirements:

   ```sh
   pip install -r requirements.txt
   ```

2. Run the application:

   ```sh
   streamlit run streamlit_app.py
   ```

