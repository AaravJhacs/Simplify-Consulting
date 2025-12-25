// Google API Configuration
// IMPORTANT: You must create a project in Google Cloud Console
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project.
// 3. Enable "Google Drive API".
// 4. Configure OAuth Consent Screen (External -> User Support Email).
// 5. Create Credentials -> OAuth Client ID -> Web Application.
// 6. Add "http://localhost:5173" and your GitHub Pages URL to "Authorized JavaScript origins".
// 7. Paste the Client ID below.

export const GOOGLE_CONFIG = {
  CLIENT_ID:
    "908987959064-tvjnlsvg46mqpn8mqf7g15blrq8haber.apps.googleusercontent.com", // User provided Client ID
  API_KEY: "AIzaSyCdqhaseD2mH3F7Nob9loUbjetd7oW-K08", // User provided key
  SCOPES: "https://www.googleapis.com/auth/drive.file", // Only access files created by this app
  DISCOVERY_DOCS: [
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  ],
};
