import React from "react";
import { motion } from "framer-motion";
import DemoAnimation from "./DemoAnimation";

const Home = ({ onStart }) => {
  const [showVideo, setShowVideo] = React.useState(false);

  // ... (keep existing fade variants)
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="home-page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Navbar */}
      <nav className="home-navbar">
        <div className="logo">Simplify Consulting</div>
        <div className="nav-links">
          <span>ISO 9001 Specialists</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.span variants={fadeInUp} className="badge">
              AI-Powered Compliance
            </motion.span>
            <motion.h1 variants={fadeInUp} className="main-heading">
              Streamline Your Path to <br />
              <span className="gradient-text">ISO 9001 Certification</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="sub-heading">
              Generate professional Organization Profiles and Scope documents in
              minutes, not days. Expert knowledge from{" "}
              <strong>Divya Jha</strong> distilled into an intelligent automated
              tool.
            </motion.p>
            <motion.div variants={fadeInUp} className="cta-group">
              <button onClick={onStart} className="primary-cta">
                Start Generating Now <span className="arrow">→</span>
              </button>
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="secondary-cta"
              >
                {showVideo ? "Close Demo" : "View Live Demo"}
              </button>
            </motion.div>

            {showVideo && (
              <motion.div
                variants={fadeInUp}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="demo-video-container"
                style={{
                  marginTop: "2rem",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "none", // Remove border to let component handle it
                  background: "transparent",
                }}
              >
                <DemoAnimation />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Abstract Background Element */}
        <div className="hero-visuals">
          <div className="glowing-orb"></div>
          <div className="grid-overlay"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Our Tool?</h2>
          <p>Efficiency meets Expertise</p>
        </div>
        <div className="grid-container">
          <motion.div
            className="feature-box"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="icon">🚀</div>
            <h3>Instant Documentation</h3>
            <p>
              Input basic company details and receive a formatted A4 Word
              document ready for review.
            </p>
          </motion.div>

          <motion.div
            className="feature-box"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="icon">🧠</div>
            <h3>Smart Scope Generation</h3>
            <p>
              Our algorithms analyze your industry to suggest professional ISO
              scope definitions.
            </p>
          </motion.div>

          <motion.div
            className="feature-box"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="icon">⚔️</div>
            <h3>Consultant Certified</h3>
            <p>
              Built on the proven frameworks and methodologies of Lead
              Consultant Divya Jha.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
        </div>
        <div className="steps-container">
          <div className="step-item">
            <span className="step-number">01</span>
            <h4>Input Data</h4>
            <p>Answer simple questions about your company.</p>
          </div>
          <div className="step-divider"></div>
          <div className="step-item">
            <span className="step-number">02</span>
            <h4>AI Processing</h4>
            <p>We structure and refine your profile.</p>
          </div>
          <div className="step-divider"></div>
          <div className="step-item">
            <span className="step-number">03</span>
            <h4>Export Docx</h4>
            <p>Download your polished ISO document.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="brand">
            <h4>Simplify Consulting</h4>
            <p>Excellence in Quality Management Systems.</p>
          </div>
          <div className="credits">
            <p>
              Designed & Developed by{" "}
              <a href="#" className="credit-link">
                Divya Jha
              </a>
            </p>
            <p className="copyright">
              © {new Date().getFullYear()} Simplify Consulting. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;
