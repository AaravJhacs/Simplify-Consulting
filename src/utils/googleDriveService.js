import { GOOGLE_CONFIG } from "../googleConfig";

let tokenClient;
let gapiInited = false;
let gisInited = false;

export const googleDriveService = {
  // Load the necessary scripts dynamically
  loadScripts: (callback) => {
    const script1 = document.createElement("script");
    script1.src = "https://apis.google.com/js/api.js";
    script1.async = true;
    script1.defer = true;
    script1.onload = () => {
      window.gapi.load("client", async () => {
        try {
          await window.gapi.client.init({
            apiKey: GOOGLE_CONFIG.API_KEY,
            discoveryDocs: GOOGLE_CONFIG.DISCOVERY_DOCS,
          });
          gapiInited = true;
          if (gisInited && callback) callback(true);
        } catch (err) {
          console.error("GAPI INIT ERROR:", err);
          alert("Google API Error: " + JSON.stringify(err.result || err));
        }
      });
    };
    script1.onerror = (e) => console.error("Script 1 failed to load", e);
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://accounts.google.com/gsi/client";
    script2.async = true;
    script2.defer = true;
    script2.onload = () => {
      tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CONFIG.CLIENT_ID,
        scope: GOOGLE_CONFIG.SCOPES,
        callback: "", // defined later at request time
      });
      gisInited = true;
      if (gapiInited && callback) callback(true);
    };
    document.body.appendChild(script2);
  },

  // Authenticate user
  signIn: () => {
    return new Promise((resolve, reject) => {
      if (!tokenClient) {
        reject("Google Scripts not loaded");
        return;
      }

      tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          reject(resp);
        }
        resolve(resp);
      };

      if (window.gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: "none" });
      }
    });
  },

  // Upload file (HTML converted to Google Doc)
  uploadHtmlAsDoc: async (title, htmlContent) => {
    try {
      const metadata = {
        name: title,
        mimeType: "application/vnd.google-apps.document", // Google Doc format
      };

      // Multipart upload
      const boundary = "-------314159265358979323846";
      const delimiter = "\r\n--" + boundary + "\r\n";
      const close_delim = "\r\n--" + boundary + "--";

      const contentType = "text/html";

      const multipartRequestBody =
        delimiter +
        "Content-Type: application/json\r\n\r\n" +
        JSON.stringify(metadata) +
        delimiter +
        "Content-Type: " +
        contentType +
        "\r\n\r\n" +
        htmlContent +
        close_delim;

      const request = window.gapi.client.request({
        path: "https://www.googleapis.com/upload/drive/v3/files",
        method: "POST",
        params: { uploadType: "multipart" },
        headers: {
          "Content-Type": 'multipart/related; boundary="' + boundary + '"',
        },
        body: multipartRequestBody,
      });

      const response = await request;
      return response.result;
    } catch (error) {
      console.error("Error uploading to drive", error);
      throw error;
    }
  },
};
