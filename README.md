# 🏥 AI-Powered Medical Examiner Assistant

A web-based application designed to assist with preliminary insurance health assessments using an AI-powered avatar. The application leverages Retrieval-Augmented Generation (RAG) to screen users' health by asking a series of questions and analyzing their responses against a medical dataset.

## 📌 Overview

This system is a **RAG-powered assistant** that conducts **preliminary health screenings** by interacting with users through a conversational AI. It collects medical information, processes user responses, and generates structured health reports for insurance underwriters. The application ensures secure authentication, data privacy, and efficient medical data retrieval using advanced AI techniques.

## 🛠️ Technology Stack

Our system integrates several technologies to ensure seamless operation:

- **Next.js** – Used for developing the user interface.
- **Flask** – Handles backend logic and AI processing.
- **Snowflake** – Provides data storage and processing capabilities.
- **Cortex Search** – Utilized for retrieval-augmented generation (RAG) to analyze and compare user input with our medical dataset.
- **Mistral LLM** – Powers the conversational AI component.
- **NextAuth** – Implements secure authentication.
- **WebRTC** – Enables real-time interaction with the AI-powered medical avatar.
- **OCR Processing** – Extracts data from uploaded medical reports.
- **RBAC in Snowflake** – Manages role-based access control for different user roles (underwriters, medical reviewers, etc.).

## 🔄 Workflow

1. **User Authentication**: Secure login via **NextAuth** (Firebase-based authentication).
2. **Interactive Health Assessment**:
   - Users interact with an AI-driven **chatbot and avatar** to provide health details.
   - The system dynamically adjusts questions based on responses.
3. **RAG-Powered Data Retrieval**:
   - **Snowflake Cortex Search** retrieves relevant medical insights.
   - **Mistral LLM** generates contextual responses.
4. **Risk Scoring & Report Generation**:
   - User input is processed to assess health risks.
   - A structured medical report is generated for insurance underwriters.
5. **Secure Data Handling & Compliance**:
   - User data is securely stored.
   - Audit logs ensure compliance with regulatory requirements.
6. **Final Report Submission**:
   - The structured report is sent to **underwriters** for further evaluation.

## 🚀 Installation & Setup

### Prerequisites

Ensure you have **Python, Node.js, and Snowflake access** set up before proceeding.

### Installation Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/IshanJ9/KhammaGhani-HackX2025_KG
   cd KhammaGhani-HackX2025_KG
   ```
2. Install dependencies:
   ```sh
   cd server
   pip install -r requirements.txt  # Install backend dependencies

   cd frontend
   npm install  # Install frontend dependencies
   ```

### Running the Application

1. **Start the Backend (Flask Server):**
   ```sh
   python cardio.py
   ```
2. **Start the Frontend (Next.js Server):**
   ```sh
   npm run dev
   ```

The application will be available at `http://localhost:3000/`.

## 📖 Additional Information

- **Data Storage**: The dataset required for health assessment is stored within Snowflake.
- **Snowflake Cortex Search**: Used for retrieving medical data and improving AI-driven responses.
- **Role-Based Access Control**: Different users (medical examiners, underwriters) have different levels of access.
- **Security Measures**:
  - Secure login via **NextAuth**.
  - **Data encryption** and **audit logging** for compliance.
- **SQL Commands**: You can view the SQL commands used in this project in the [snowflake-sql](./snowflake-sql/) folder.


## 📞 Support

For any issues or queries, feel free to contact our team or open an issue on GitHub.

---

This project is designed to **streamline health assessments** for insurance underwriting using cutting-edge AI and data retrieval techniques. 🚀

