import streamlit as st
from google_auth_oauthlib.flow import Flow
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import json
import os
import pathlib

# Configuration and setup
def setup_google_oauth():
    # Create a credentials.json file with your Google OAuth credentials
    client_config = {
        "web": {
            "client_id": st.secrets["GOOGLE_CLIENT_ID"],
            "client_secret": st.secrets["GOOGLE_CLIENT_SECRET"],
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": ["http://localhost:8501/"],
            "javascript_origins": ["http://localhost:8501"]
        }
    }
    
    # Save the client configuration
    if not os.path.exists("credentials.json"):
        with open("credentials.json", "w") as f:
            json.dump(client_config, f)

def main():
    st.title("Streamlit Google OAuth Demo")
    
    # Initialize session state variables
    if 'credentials' not in st.session_state:
        st.session_state.credentials = None
    if 'user_info' not in st.session_state:
        st.session_state.user_info = None
    
    # Setup OAuth configuration
    setup_google_oauth()
    
    # Create OAuth flow instance
    flow = Flow.from_client_secrets_file(
        'credentials.json',
        scopes=['https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'],
        redirect_uri='http://localhost:8501'
    )
    
    if not st.session_state.credentials:
        # Generate authorization URL
        auth_url, _ = flow.authorization_url(prompt='consent')
        
        st.write("Please login with Google to continue")
        if st.button("Login with Google"):
            st.markdown(f'<a href="{auth_url}" target="_self">Click here to login</a>',
                      unsafe_allow_html=True)
    
    # Handle OAuth callback
    query_params = st.experimental_get_query_params()
    if 'code' in query_params:
        code = query_params['code'][0]
        
        try:
            flow.fetch_token(code=code)
            credentials = flow.credentials
            st.session_state.credentials = {
                'token': credentials.token,
                'refresh_token': credentials.refresh_token,
                'token_uri': credentials.token_uri,
                'client_id': credentials.client_id,
                'client_secret': credentials.client_secret,
                'scopes': credentials.scopes
            }
            
            # Clear query parameters
            st.experimental_set_query_params()
            st.experimental_rerun()
            
        except Exception as e:
            st.error(f"Error during authentication: {str(e)}")
    
    # Display user info if authenticated
    if st.session_state.credentials:
        credentials = Credentials(
            **st.session_state.credentials
        )
        
        if not st.session_state.user_info:
            service = build('oauth2', 'v2', credentials=credentials)
            user_info = service.userinfo().get().execute()
            st.session_state.user_info = user_info
        
        st.write(f"Welcome {st.session_state.user_info['name']}!")
        st.write(f"Email: {st.session_state.user_info['email']}")
        
        if st.button("Logout"):
            st.session_state.credentials = None
            st.session_state.user_info = None
            st.experimental_rerun()

if __name__ == "__main__":
    main()