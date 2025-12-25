import React from "react";
import { questions } from "../utils/aiLogic.js";

const Questionnaire = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div className="questionnaire-container">
      <h2>Section 1: Organization Profile Input</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {questions.map((q) => (
          <div key={q.id} className="form-group">
            <label htmlFor={q.id}>{q.label}</label>
            {q.type === "textarea" ? (
              <textarea
                id={q.id}
                name={q.id}
                value={formData[q.id] || ""}
                onChange={(e) => {
                  handleChange(e);
                  e.target.style.height = "auto"; // Reset height
                  e.target.style.height = e.target.scrollHeight + "px"; // Set new height
                }}
                rows="1" // Start small
                style={{
                  overflow: "hidden",
                  resize: "none",
                  minHeight: "40px",
                }}
              />
            ) : q.type === "file" ? (
              <input
                type="file"
                id={q.id}
                name={q.id}
                onChange={handleChange}
                accept="image/*"
              />
            ) : (
              <input
                type={q.type}
                id={q.id}
                name={q.id}
                value={formData[q.id] || ""}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default Questionnaire;
