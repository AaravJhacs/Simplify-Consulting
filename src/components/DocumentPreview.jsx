import React, { useState, useEffect } from "react";
import { getDocumentData } from "../utils/aiLogic.js";
import { generateDocx } from "../utils/generateDocx.js";
import { motion, AnimatePresence } from "framer-motion";

const Page = ({ children, id, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`page ${className}`}
    id={id}
  >
    {children}
  </motion.div>
);

const PaginatedContent = ({ data, logoBase64 }) => {
  // Canvas-like logic: Split content into chunks if it's too long
  // A4 conservative char estimate: ~3000 chars per page max

  const SAFE_CHAR_LIMIT = 2500;
  const detailsLen = data.details.length;
  const productsLen = data.products.length;
  const aiLen = data.aiEnhancement ? data.aiEnhancement.length : 0;

  const needsExtraPage = detailsLen + productsLen + aiLen > SAFE_CHAR_LIMIT;

  const LogoImage = () =>
    logoBase64 ? (
      <img
        src={logoBase64}
        alt="Logo"
        style={{ maxHeight: "60px", maxWidth: "150px" }}
      />
    ) : (
      <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
        [Company Logo]
      </span>
    );

  return (
    <>
      {/* Title Page (Always Page 1) */}
      <Page id="page-1" className="title-page">
        <div className="logo-placeholder">
          {logoBase64 ? (
            <img
              src={logoBase64}
              alt="Logo"
              style={{ maxHeight: "150px", maxWidth: "300px" }}
            />
          ) : (
            "[Company Logo]"
          )}
        </div>

        <div className="title-section">
          <h1 className="main-title">Organization Profile</h1>
          <h2 className="sub-title">
            {data.companyName}
            <br />
            Quality Management System
          </h2>
        </div>

        <div className="revision-section">
          <table className="revision-table">
            <thead>
              <tr>
                <th>Rev. No.</th>
                <th>Description</th>
                <th>Originator</th>
                <th>Approved by</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.0</td>
                <td>Final Version</td>
                <td>{data.originator}</td>
                <td>{data.approver}</td>
                <td>{data.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Page>

      {/* Page 2: Initial Content */}
      <Page id="page-2" className="content-page">
        {/* Table-based header for perfect Word/Print compatibility */}
        <table
          style={{
            width: "100%",
            borderBottom: "1px solid #ccc",
            marginBottom: "2rem",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  verticalAlign: "middle",
                  border: "none",
                  width: "30%",
                }}
              >
                <LogoImage />
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  textAlign: "right",
                  border: "none",
                }}
              >
                <strong>Quality Management System</strong>
                <br />
                Section 1- Organization Profile (Pg. 1)
              </td>
            </tr>
          </tbody>
        </table>

        <div className="section-content">
          <section>
            <h3>1. Purpose</h3>
            <p>
              The purpose of this document is to provide the details of the
              organization and the products/services provided.
            </p>
          </section>
          <section>
            <h3>2. Responsibilities</h3>
            <p>NA</p>
          </section>
          <section>
            <h3>3. Company Details</h3>
            <p style={{ whiteSpace: "pre-line" }}>{data.details}</p>
          </section>

          {!needsExtraPage && (
            <>
              <section>
                <h3>4. Products/Services Provided</h3>
                <p style={{ whiteSpace: "pre-line" }}>{data.products}</p>
                {data.aiEnhancement && (
                  <div className="ai-highlight">
                    <strong>AI-Enhanced Scope Definition:</strong>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {data.aiEnhancement}
                    </p>
                  </div>
                )}
              </section>
              <section>
                <h3>5. Company Address</h3>
                <p>
                  <strong>{data.companyName}</strong>
                  <br />
                  {data.address}
                  <br />
                  {data.phone}
                  <br />
                  {data.website}
                </p>
              </section>
              <section>
                <h3>6. Records</h3>
                <p>NA</p>
              </section>
              <section>
                <h3>7. References</h3>
                <p>ISO 9001:2015 Standard</p>
              </section>
            </>
          )}
        </div>
      </Page>

      {/* Page 3: Overflow Content (if needed) */}
      {needsExtraPage && (
        <Page id="page-3" className="content-page">
          <table
            style={{
              width: "100%",
              borderBottom: "1px solid #ccc",
              marginBottom: "2rem",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    verticalAlign: "middle",
                    border: "none",
                    width: "30%",
                  }}
                >
                  <LogoImage />
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    border: "none",
                  }}
                >
                  <strong>Quality Management System</strong>
                  <br />
                  Section 1- Organization Profile (Pg. 2)
                </td>
              </tr>
            </tbody>
          </table>
          <div className="section-content">
            <div className="system-note">
              <i>(Continued from previous page...)</i>
            </div>
            <section>
              <h3>4. Products/Services Provided</h3>
              <p style={{ whiteSpace: "pre-line" }}>{data.products}</p>
              {data.aiEnhancement && (
                <div className="ai-highlight">
                  <strong>AI-Enhanced Scope Definition:</strong>
                  <p style={{ whiteSpace: "pre-line" }}>{data.aiEnhancement}</p>
                </div>
              )}
            </section>
            <section>
              <h3>5. Company Address</h3>
              <p>
                <strong>{data.companyName}</strong>
                <br />
                {data.address}
                <br />
                {data.phone}
                <br />
                {data.website}
              </p>
            </section>
            <section>
              <h3>6. Records</h3>
              <p>NA</p>
            </section>
            <section>
              <h3>7. References</h3>
              <p>ISO 9001:2015 Standard</p>
            </section>
          </div>
        </Page>
      )}
    </>
  );
};

import { googleDriveService } from "../utils/googleDriveService";
import { GOOGLE_CONFIG } from "../googleConfig";

const DocumentPreview = ({ formData }) => {
  const data = getDocumentData(formData);
  const [zoomLevel, setZoomLevel] = useState(0.65); // Default to reduced size
  const [logoBase64, setLogoBase64] = useState(null);
  const [isGapiReady, setIsGapiReady] = useState(false);

  useEffect(() => {
    // Load Google Scripts
    googleDriveService.loadScripts((success) => setIsGapiReady(success));

    if (formData.companyLogo instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoBase64(reader.result);
      };
      reader.readAsDataURL(formData.companyLogo);
    } else {
      setLogoBase64(null);
    }
  }, [formData.companyLogo]);

  // Update Page Title for PDF Printing names
  useEffect(() => {
    if (data.companyName && data.companyName !== "<Company Name>") {
      const safeName = data.companyName.replace(/[^a-z0-9 ]/gi, "").trim();
      document.title = `${safeName}_ISO_9001_Profile`;
    }
  }, [data.companyName]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.3));

  const handleGoogleExport = async () => {
    // Check for default config values
    if (
      (GOOGLE_CONFIG.CLIENT_ID && GOOGLE_CONFIG.CLIENT_ID.includes("YOUR_")) ||
      (GOOGLE_CONFIG.API_KEY && GOOGLE_CONFIG.API_KEY.includes("YOUR_"))
    ) {
      alert(
        "SETUP REQUIRED:\n\n" +
          "You have not configured your Google Cloud details yet.\n" +
          "Please open 'src/googleConfig.js' and add your Client ID and API Key.\n\n" +
          "The login window cannot open without a valid Client ID."
      );
      return;
    }

    if (!isGapiReady) {
      alert(
        "Google Services are still loading (or failed to load). Check console for API Key errors."
      );
      return;
    }

    try {
      await googleDriveService.signIn();
      const content = document.getElementById("preview-content").innerHTML;

      // Basic styling wrapper for Google Doc
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: 'Times New Roman', serif; }
              table { border-collapse: collapse; width: 100%; }
              td, th { border: 1px solid #000; padding: 5px; }
            </style>
          </head>
          <body>${content}</body>
        </html>
      `;

      const result = await googleDriveService.uploadHtmlAsDoc(
        `${data.companyName} - Organization Profile`,
        htmlContent
      );

      alert(`Saved to Google Drive! File ID: ${result.id}`);
      window.open(
        `https://docs.google.com/document/d/${result.id}/edit`,
        "_blank"
      );
    } catch (error) {
      console.error(error);
      if (error.error === "idpiframe_initialization_failed") {
        alert(
          "Google Sign-In failed. Please ensure you have enabled 3rd party cookies or use a standard browser window."
        );
      } else {
        alert(
          "Failed to save to Google Docs. Check console for details (Client ID might be missing)."
        );
      }
    }
  };

  return (
    <div className="preview-container">
      <div className="header-actions">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h2>Document Preview</h2>
          <div
            className="zoom-controls"
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              background: "rgba(255,255,255,0.1)",
              padding: "0.25rem 0.5rem",
              borderRadius: "8px",
            }}
          >
            <button
              onClick={handleZoomOut}
              className="secondary-btn"
              style={{ padding: "0.25rem 0.5rem", fontSize: "1rem" }}
            >
              -
            </button>
            <span
              style={{
                minWidth: "3rem",
                textAlign: "center",
                fontSize: "0.85rem",
              }}
            >
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="secondary-btn"
              style={{ padding: "0.25rem 0.5rem", fontSize: "1rem" }}
            >
              +
            </button>
          </div>
        </div>
        <div className="actions">
          <button onClick={() => window.print()} className="secondary-btn">
            Print / PDF
          </button>
          <button
            onClick={async () => {
              const safeName = (data.companyName || "Organization")
                .replace(/[^a-z0-9 ]/gi, "")
                .trim()
                .replace(/\s+/g, "_");
              const fileName = `${safeName}_ISO_9001.docx`; // v11.0 .docx
              await generateDocx(data, logoBase64, fileName);
            }}
            className="secondary-btn"
          >
            DOCX
          </button>

          <button onClick={handleGoogleExport} className="primary-btn">
            Save to YOUR Google Drive
          </button>
        </div>
      </div>

      {/* Apply zoom style. Note: 'zoom' property works well on Chrome/Safari/Edge for layout scaling */}
      <div
        className="preview-box"
        id="preview-content"
        style={{ zoom: zoomLevel }}
      >
        <PaginatedContent data={data} logoBase64={logoBase64} />
      </div>
    </div>
  );
};

export default DocumentPreview;
