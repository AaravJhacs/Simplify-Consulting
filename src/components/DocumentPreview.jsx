import React, { useState, useEffect } from "react";
import { getDocumentData } from "../utils/aiLogic.js";
import { exportToDocx } from "../utils/exportToDocx.js";
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

const PaginatedContent = ({ data }) => {
  // Canvas-like logic: Split content into chunks if it's too long
  // A4 conservative char estimate: ~3000 chars per page max

  const SAFE_CHAR_LIMIT = 2500;
  const detailsLen = data.details.length;
  const productsLen = data.products.length;
  const aiLen = data.aiEnhancement ? data.aiEnhancement.length : 0;

  const needsExtraPage = detailsLen + productsLen + aiLen > SAFE_CHAR_LIMIT;

  return (
    <>
      {/* Title Page (Always Page 1) */}
      <Page id="page-1" className="title-page">
        <div className="logo-placeholder">
          {data.companyLogo ? (
            <img
              src={URL.createObjectURL(data.companyLogo)}
              alt="Logo"
              style={{ maxHeight: "100px", maxWidth: "300px" }}
            />
          ) : (
            "<Company Logo>"
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
        <div className="doc-header">
          <span>{data.companyLogo ? "Logo" : "Company Logo"}</span>
          <div className="right-header">
            <strong>Quality Management System</strong>
            <br />
            Section 1- Organization Profile (Pg. 1)
          </div>
        </div>

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
          <div className="doc-header">
            <span>{data.companyLogo ? "Logo" : "Company Logo"}</span>
            <div className="right-header">
              <strong>Quality Management System</strong>
              <br />
              Section 1- Organization Profile (Pg. 2)
            </div>
          </div>
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

const DocumentPreview = ({ formData }) => {
  const data = getDocumentData(formData);
  const [zoomLevel, setZoomLevel] = useState(0.65); // Default to reduced size

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.3));

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
            onClick={() =>
              exportToDocx("preview-content", "Organization_Profile.docx")
            }
            className="primary-btn"
          >
            Export to Word (.docx)
          </button>
        </div>
      </div>

      {/* Apply zoom style. Note: 'zoom' property works well on Chrome/Safari/Edge for layout scaling */}
      <div
        className="preview-box"
        id="preview-content"
        style={{ zoom: zoomLevel }}
      >
        <PaginatedContent data={data} />
      </div>
    </div>
  );
};

export default DocumentPreview;
