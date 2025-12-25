import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DemoAnimation = () => {
  const [text, setText] = useState("");
  const [rolesText, setRolesText] = useState("");

  const fullText = "XYZ Innovations Pvt Ltd";
  const rolesFullText =
    "Top Management: Accountable for QMS effectiveness.\nProcess Owners: Manage specific QMS processes.";

  useEffect(() => {
    let phase = "org"; // org, wait, roles, finish
    let charIndex = 0;

    // reset
    setText("");
    setRolesText("");

    const interval = setInterval(() => {
      if (phase === "org") {
        if (charIndex <= fullText.length) {
          setText(fullText.slice(0, charIndex));
          charIndex++;
        } else {
          phase = "wait_1";
          charIndex = 0;
        }
      } else if (phase === "wait_1") {
        charIndex++;
        if (charIndex > 5) {
          // short pause
          phase = "roles";
          charIndex = 0;
        }
      } else if (phase === "roles") {
        if (charIndex <= rolesFullText.length) {
          setRolesText(rolesFullText.slice(0, charIndex));
          charIndex++;
        } else {
          phase = "finish";
          charIndex = 0;
        }
      } else if (phase === "finish") {
        charIndex++;
        if (charIndex > 30) {
          // 3 seconds pause
          // Reset
          setText("");
          setRolesText("");
          phase = "org";
          charIndex = 0;
        }
      }
    }, 50); // Faster typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "800px",
        height: "450px", // Increased height to fit new field
        background: "#0f172a",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Left Panel: Form Input */}
      <div
        style={{
          flex: 1,
          padding: "2rem",
          borderRight: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Org Name Input */}
        <div>
          <div
            style={{
              height: "10px",
              width: "40px",
              background: "#334155",
              borderRadius: "4px",
              marginBottom: "0.5rem",
            }}
          ></div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "#94a3b8",
              marginBottom: "0.5rem",
            }}
          >
            Organization Name
          </div>
          <div
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "#1e293b",
              borderRadius: "6px",
              border: "1px solid #3b82f6",
              color: "#fff",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              minHeight: "40px",
            }}
          >
            {text}
            {/* Blinking cursor only when typing org name */}
            {!rolesText && text.length < fullText.length && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1.2em",
                  background: "#3b82f6",
                  marginLeft: "2px",
                }}
              />
            )}
          </div>
        </div>

        {/* Roles Input (New) */}
        <div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "#94a3b8",
              marginBottom: "0.5rem",
            }}
          >
            Roles & Responsibilities
          </div>
          <div
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "#1e293b",
              borderRadius: "6px",
              border: "1px solid #3b82f6",
              color: "#fff",
              fontSize: "0.9rem",
              minHeight: "80px",
              whiteSpace: "pre-wrap",
            }}
          >
            {rolesText}
            {/* Blinking cursor when typing roles */}
            {text.length === fullText.length &&
              rolesText.length < rolesFullText.length && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  style={{
                    display: "inline-block",
                    width: "2px",
                    height: "1rem",
                    background: "#3b82f6",
                    marginLeft: "2px",
                    verticalAlign: "text-bottom",
                  }}
                />
              )}
          </div>
        </div>

        <div style={{ opacity: 0.5 }}>
          <div
            style={{
              fontSize: "0.8rem",
              color: "#94a3b8",
              marginBottom: "0.5rem",
            }}
          >
            Address
          </div>
          <div
            style={{
              width: "100%",
              height: "40px",
              background: "#1e293b",
              borderRadius: "6px",
              border: "1px solid #334155",
            }}
          ></div>
        </div>
      </div>

      {/* Right Panel: Document Preview */}
      <div
        style={{
          flex: 1,
          background: "#e2e8f0",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <motion.div
          layout
          style={{
            width: "100%",
            background: "#fff",
            height: "100%",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            borderRadius: "4px",
            padding: "2rem",
            color: "#334155",
            fontSize: "0.7rem",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "1rem",
              borderBottom: "2px solid #000",
              paddingBottom: "0.5rem",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1rem", color: "#000" }}>
              ISO 9001:2015
            </h3>
            <p style={{ margin: "5px 0 0", fontSize: "0.6rem" }}>
              Quality Management System
            </p>
          </div>

          <div>
            <strong
              style={{
                display: "block",
                marginBottom: "0.2rem",
                color: "#000",
              }}
            >
              1. Organization
            </strong>
            <div
              style={{
                background: text ? "#dbeafe" : "transparent",
                transition: "background 0.2s",
              }}
            >
              {text || (
                <span style={{ color: "#cbd5e1" }}>[Organization Name]</span>
              )}
            </div>
          </div>

          <div>
            <strong
              style={{
                display: "block",
                marginBottom: "0.2rem",
                color: "#000",
              }}
            >
              2. Responsibilities
            </strong>
            <div
              style={{
                background: rolesText ? "#dbeafe" : "transparent",
                transition: "background 0.2s",
                whiteSpace: "pre-wrap",
                minHeight: "1rem",
              }}
            >
              {rolesText || (
                <span style={{ color: "#cbd5e1" }}>
                  [Roles & Responsibilities]
                </span>
              )}
            </div>
          </div>

          <div>
            <strong
              style={{
                display: "block",
                marginBottom: "0.2rem",
                color: "#000",
              }}
            >
              3. Context
            </strong>
            <div
              style={{
                height: "4px",
                width: "90%",
                background: "#e2e8f0",
                marginBottom: "4px",
              }}
            ></div>
            <div
              style={{
                height: "4px",
                width: "80%",
                background: "#e2e8f0",
                marginBottom: "4px",
              }}
            ></div>
          </div>
        </motion.div>

        {/* Floating Label */}
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.7rem",
            pointerEvents: "none",
          }}
        >
          Live Preview
        </div>
      </div>
    </div>
  );
};

export default DemoAnimation;
