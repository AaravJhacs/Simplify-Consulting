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
              Simplify Your Path to <br />
              <span className="gradient-text">ISO Certification</span>
            </motion.h1>
            <motion.h2
              variants={fadeInUp}
              style={{
                fontSize: "2rem",
                marginBottom: "1.5rem",
                fontWeight: 600,
              }}
            >
              Become Certification-Ready in Hours, Not Months
            </motion.h2>
            <motion.p variants={fadeInUp} className="sub-heading">
              Stop spending months preparing for ISO certification. Our
              AI-powered platform helps you generate documents required for
              certification in just <strong>hours</strong>—without expensive
              consultants, endless meetings, or struggling with generic
              templates that don't fit your business.
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
                  border: "none",
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

      {/* Problem Section (Why Traditional Fails) */}
      <section className="features-section" style={{ paddingTop: "5rem" }}>
        <div className="section-header">
          <h2>Why Traditional Certification Preparation Fails?</h2>
          <p>Certification shouldn't be this hard.</p>
        </div>
        <div
          className="grid-container"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          }}
        >
          <div className="feature-box" style={{ borderColor: "#ef4444" }}>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                "High consultant fees and long engagement cycles",
                "Repeated explanations of your processes to external consultants",
                "Generic templates that don't reflect how your organization actually works",
                "Purchased documents that teams don't know how to adapt",
                "Last-minute audit panic due to poorly aligned documentation",
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ color: "#ef4444", fontWeight: "bold" }}>
                    ✕
                  </span>{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Our Tool */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Our Tool?</h2>
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
              Input company details and how your processes work and receive
              formatted Word documents mapping directly to the clauses of the
              standards. This makes it easier to understand for both you and the
              auditors.
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
            <h3>Expert Designed</h3>
            <p>
              Designed by ISO consultants with 25+ years of hands-on experience,
              based on real certification audits and nonconformity trends.
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
            <div className="icon">💎</div>
            <h3>Cost Effective</h3>
            <p>
              You get expert-level guidance—without expert-level fees. Save time
              and cut costs while getting certified with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>How It Works?</h2>
        </div>
        <div
          className="steps-container"
          style={{
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {[
            {
              title: "Answer Questions",
              desc: "Answer a few guided questions about your organization.",
            },
            {
              title: "AI Processing",
              desc: "AI applies proven ISO consulting logic to your inputs.",
            },
            {
              title: "Generate Docs",
              desc: "Certification-ready documentation is generated automatically.",
            },
            {
              title: "Review",
              desc: "Review and finalize the documentation.",
            },
            {
              title: "Implement",
              desc: "Implement the new registers/forms (We will provide samples for this step).",
            },
            {
              title: "Internal Audit",
              desc: (
                <>
                  Conduct an internal audit. Do it yourself by going through our{" "}
                  <span className="fake-link">internal audit training</span> or{" "}
                  <span className="fake-link">
                    seek help from our consultant
                  </span>
                  .
                </>
              ),
            },
            {
              title: "Certification",
              desc: "Hire an external certification body to do the certification audit and you are ready to go.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="step-item"
              style={{
                width: "100%",
                maxWidth: "600px",
                textAlign: "left",
                display: "flex",
                gap: "1.5rem",
                alignItems: "flex-start",
              }}
            >
              <span
                className="step-number"
                style={{ fontSize: "2rem", lineHeight: 1 }}
              >
                0{i + 1}
              </span>
              <div>
                <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.2rem" }}>
                  {step.title}
                </h4>
                <p style={{ margin: 0, color: "var(--text-secondary)" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Distinction & Target Audience */}
      <section className="features-section">
        <div className="grid-container">
          <div className="feature-box">
            <h3>How is this tool different?</h3>
            <p style={{ marginBottom: "1rem" }}>
              This tool does not generate generic AI output. Our platform is:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: "1.5rem" }}>
              <li>
                Designed by ISO consultants with 25+ years of hands-on
                experience.
              </li>
              <li>
                Based on real certification audits and nonconformity trends.
              </li>
              <li>
                Structured to meet current ISO standard and auditor
                expectations.
              </li>
              <li>You get expert-level guidance—without expert-level fees.</li>
            </ul>
            <p
              style={{
                textAlign: "center",
                marginTop: "1.5rem",
                fontWeight: "bold",
                color: "#818cf8",
              }}
            >
              Built by Experts. Powered by AI.
            </p>
          </div>

          <div className="feature-box">
            <h3>Who Is This For?</h3>
            <ul style={{ listStyle: "disc", paddingLeft: "1.5rem" }}>
              <li>Startups and SMEs needing rapid certification readiness.</li>
              <li>Organizations stuck with generic or purchased templates.</li>
              <li>Companies looking to reduce certification costs.</li>
              <li>
                Teams preparing for initial, surveillance, or recertification
                audits.
              </li>
              <li>Businesses that want practical, implementable compliance.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer" style={{ textAlign: "center" }}>
        <div className="footer-content" style={{ display: "block" }}>
          <h2 style={{ marginBottom: "1rem" }}>
            Save Time. Cut Costs. Get Certified with Confidence.
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            <span>✓ Certification readiness in hours</span>
            <span>✓ No expensive consultants</span>
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
