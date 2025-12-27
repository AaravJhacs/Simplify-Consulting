import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
/* App.css is not needed as we use index.css */
import Questionnaire from "./components/Questionnaire";
import DocumentPreview from "./components/DocumentPreview";
import Home from "./components/Home";

// Navigation Menu Component
const NavMenu = ({ goHome, goApp, currentView, toggleTheme, currentTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="nav-menu"
      style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000 }}
    >
      {/* 3-Dot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="menu-btn"
        style={{
          background: "var(--nav-bg)", // Theme aware
          border: "1px solid var(--border-color)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          backdropFilter: "blur(5px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <span
          style={{
            width: "4px",
            height: "4px",
            background: "var(--text-primary)", // Theme aware
            borderRadius: "50%",
          }}
        ></span>
        <span
          style={{
            width: "4px",
            height: "4px",
            background: "var(--text-primary)",
            borderRadius: "50%",
          }}
        ></span>
        <span
          style={{
            width: "4px",
            height: "4px",
            background: "var(--text-primary)",
            borderRadius: "50%",
          }}
        ></span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 10, y: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="menu-dropdown"
            style={{
              position: "absolute",
              top: "50px",
              right: "0",
              background: "var(--card-bg)", // Use variable
              padding: "0.5rem",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
              minWidth: "150px",
              border: "var(--glass-border)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              backdropFilter: "blur(12px)",
            }}
          >
            <button
              onClick={() => {
                goHome();
                setIsOpen(false);
              }}
              style={{
                background:
                  currentView === "home"
                    ? "rgba(99, 102, 241, 0.2)"
                    : "transparent",
                color:
                  currentView === "home" ? "#818cf8" : "var(--text-primary)",
                border: "none",
                padding: "0.75rem 1rem",
                textAlign: "left",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              🏠 Home
            </button>
            <button
              onClick={() => {
                goApp();
                setIsOpen(false);
              }}
              style={{
                background:
                  currentView === "app"
                    ? "rgba(99, 102, 241, 0.2)"
                    : "transparent",
                color:
                  currentView === "app" ? "#818cf8" : "var(--text-primary)",
                border: "none",
                padding: "0.75rem 1rem",
                textAlign: "left",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              🚀 Generator
            </button>
            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                // Don't close menu immediately so user can see change
              }}
              style={{
                background: "transparent",
                color: "var(--text-primary)",
                border: "none",
                borderTop: "1px solid var(--border-color)",
                padding: "0.75rem 1rem",
                marginTop: "0.25rem",
                textAlign: "left",
                borderRadius: "0 0 8px 8px",
                cursor: "pointer",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {currentTheme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  const [formData, setFormData] = useState({});
  const [isInputExpanded, setIsInputExpanded] = useState(false); // Default: Compact sidebar
  const [showHome, setShowHome] = useState(true);

  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"; // Default to light
  });

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Sample Data: HG Construction Ltd (Real-world Example)
  // ... keeping sampleData ...

  const sampleData = {
    organizationName: "HG Construction Ltd",
    address: "4 Hunting Gate, Hitchin, Hertfordshire, SG4 0TJ, United Kingdom",
    scope:
      "The design, project management, and construction of residential, commercial, and student accommodation buildings across the United Kingdom.",
    standard: "ISO 9001:2015",
    exclusions:
      "None. All requirements of ISO 9001:2015 are applicable to the scope of our management system.",
    context:
      "Internal Issues: Rapid organizational growth, need for skilled labor retention, digital transformation of site processes.\nExternal Issues: Supply chain volatility, evolving building safety regulations (Building Safety Act), environmental sustainability targets (Net Zero).",
    policy:
      "HG Construction Ltd is dedicated to quality in everything it does. We achieve success through the satisfaction of Clients with the quality of our finished product. Quality working methods will increase efficiencies, reduce mistakes, enhance safety practices, and improve working environments. We are committed to satisfying applicable requirements and continual improvement of the QMS.",
    objectives:
      "1. Achieve zero reportable safety incidents (RIDDOR) on all sites.\n2. Obtain a 'Good' or 'Excellent' rating in 95% of Client Satisfaction Surveys.\n3. Reduce snagging items at practical completion by 15% year-on-year.",
    roles:
      "Managing Director: Ultimate accountability for the QMS.\nConstruction Director: Operational delivery and quality control.\nQuality Manager: System maintenance, audits, and process improvement.",
    risks:
      "1. Supply Chain Failure (High) - Mitigation: Approved vendor list & dual sourcing.\n2. Health & Safety Incident (High) - Mitigation: Rigorous induction & site audits.\n3. Regulatory Non-compliance (Medium) - Mitigation: Dedicated compliance officer.",
    support:
      "We ensure competence through our 'HG Academy' training program. Resources are allocated based on project complexity. Awareness is maintained through weekly 'Toolbox Talks'.",
    operation:
      "We follow the RIBA Plan of Work stages. Processes include: Tender -> Pre-construction -> Construction -> Handover -> Defects Liability Period.",
  };

  const loadSample = () => {
    setFormData(sampleData);
    navigateToApp();
  };

  // Handle Browser History
  useEffect(() => {
    // When component mounts, check if we should likely be at home
    // (Simplistic approach: start at home)
    window.history.replaceState({ page: "home" }, "Home", "/");

    const handlePopState = (event) => {
      if (event.state && event.state.page === "app") {
        setShowHome(false);
      } else {
        setShowHome(true);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateToApp = () => {
    setShowHome(false);
    window.history.pushState({ page: "app" }, "Generator", "#generator");
  };

  const navigateToHome = () => {
    setShowHome(true);
    // Go back in history if possible to keep stack clean, or push if checking
    // Ideally pop if we just came from there, but push is safer for generic Nav
    if (window.location.hash === "#generator") {
      window.history.back();
    } else {
      window.history.pushState({ page: "home" }, "Home", "/");
    }
  };

  return (
    <div className="app-container">
      <NavMenu
        goHome={navigateToHome}
        goApp={navigateToApp}
        currentView={showHome ? "home" : "app"}
        toggleTheme={toggleTheme}
        currentTheme={theme}
      />

      <AnimatePresence mode="wait">
        {showHome ? (
          <Home key="home" onStart={navigateToApp} onViewSample={loadSample} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <header
              className="app-header"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                onClick={navigateToHome}
                className="secondary-btn"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "0.5rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                ← Back
              </button>
              <h1 style={{ flex: 1, textAlign: "center" }}>
                Simplified consulting ISO Consultant AI tool
              </h1>
              <div style={{ width: "80px" }}></div> {/* Spacer for balance */}
            </header>
            <main className="main-content">
              <motion.section
                className={`input-section ${
                  !isInputExpanded ? "collapsed" : ""
                }`}
                animate={{ flexBasis: isInputExpanded ? "50%" : "350px" }}
                initial={{ flexBasis: "350px" }}
                transition={{ duration: 0.3 }}
                style={{
                  flexGrow: isInputExpanded ? 1 : 0,
                  flexShrink: 0,
                  overflowY: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  {!isInputExpanded && <h3>Input</h3>}
                  <button
                    onClick={() => setIsInputExpanded(!isInputExpanded)}
                    className="secondary-btn"
                    style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                  >
                    {isInputExpanded ? "Shrink <<" : "Expand >>"}
                  </button>
                </div>
                <Questionnaire formData={formData} setFormData={setFormData} />
              </motion.section>

              <section
                className="preview-section"
                style={{ flex: isInputExpanded ? 1 : 4 }}
              >
                <DocumentPreview formData={formData} />
              </section>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
