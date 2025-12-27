// Expert System Knowledge Base simulating "Training Data"
const knowledgeBase = {
  software: {
    keywords: [
      "software",
      "app",
      "platform",
      "saas",
      "coding",
      "development",
      "digital",
      "tech",
    ],
    enhancement:
      "The Quality Management System (QMS) covers the design, development, deployment, and maintenance of software products. It ensures compliance with best practices in software engineering, version control, and user acceptance testing.",
  },
  construction: {
    keywords: [
      "construction",
      "building",
      "civil",
      "contractor",
      "infrastructure",
      "engineering",
    ],
    enhancement:
      "The QMS governs all construction activities, including project planning, site management, subcontractor oversight, and health & safety compliance. It ensures all structures meet regulatory codes and client specifications.",
  },
  manufacturing: {
    keywords: [
      "manufacturing",
      "production",
      "fabrication",
      "assembly",
      "factory",
      "goods",
    ],
    enhancement:
      "The QMS applies to the entire manufacturing lifecycle, from raw material procurement to final product assembly and quality control. It strictly adheres to ISO standards for production consistency and defect reduction.",
  },
  consulting: {
    keywords: [
      "consulting",
      "advisory",
      "training",
      "audit",
      "services",
      "management",
    ],
    enhancement:
      "The QMS ensures the consistent delivery of high-quality professional services. It focuses on client satisfaction, deliverable accuracy, and the continuous improvement of consulting methodologies.",
  },
};

const expertEnhancement = (text) => {
  if (!text) return "";
  const lowerText = text.toLowerCase();
  let enhancements = [];

  // "Inference Engine"
  for (const [key, data] of Object.entries(knowledgeBase)) {
    if (data.keywords.some((k) => lowerText.includes(k))) {
      enhancements.push(data.enhancement);
    }
  }

  return enhancements.length > 0 ? enhancements.join("\n\n") : null;
};

export const getDocumentData = (answers) => {
  const currentDate = new Date().toLocaleDateString("en-GB");

  const products = answers.productsServices || "";
  const details = answers.companyDetails || "";
  const aiContext = expertEnhancement(products + " " + details);

  return {
    companyName: answers.companyLegalName || "<Company Name>",
    shortName: answers.shortCompanyName || "<Short Name>",
    companyLogo: answers.companyLogo, // File object or null
    originator: answers.originatorName || "<Originator Name>",
    approver: answers.approverName || "<Approver Name>",
    date: currentDate,
    details: details || "<Company Details>",
    products: products || "<products and/or services provided>",
    aiEnhancement: aiContext,
    address: answers.companyAddress || "<Company Address>",
    phone: answers.companyPhone || "<Company Phone no.>",
    website: answers.companyWebsite || "<Company website>",
  };
};

// Deprecated: generateDocument (Markdown) - keeping for reference if needed, but not used in new flow
export const generateDocument = (answers) => "";

export const questions = [
  {
    id: "companyLegalName",
    label: "1. Company Legal Name",
    type: "text",
    tooltip:
      "Enter the full registered legal name of your organization as it appears on official documents.",
  },
  {
    id: "shortCompanyName",
    label: "2. Short Company Name",
    type: "text",
    tooltip:
      "A defined short name or abbreviation (e.g., 'ABC') used internally.",
  },
  {
    id: "companyAddress",
    label: "3. Company Address",
    type: "textarea",
    tooltip: "The physical address of the site to be certified.",
  },
  {
    id: "companyWebsite",
    label: "4. Company Website",
    type: "text",
    tooltip: "Your official business website URL.",
  },
  {
    id: "companyPhone",
    label: "5. Company Phone No.",
    type: "tel",
    tooltip: "Primary contact number for the organization.",
  },
  {
    id: "originatorName",
    label: "6. Name of the person creating the QMS (Originator)",
    type: "text",
    tooltip: "The individual responsible for drafting/creating this manual.",
  },
  {
    id: "originatorDesignation",
    label: "7. Designation of the Originator",
    type: "text",
    tooltip: "Job title of the person creating the QMS.",
  },
  {
    id: "approverName",
    label: "8. Name of the approver",
    type: "text",
    tooltip:
      "The senior person (e.g., Director, CEO) who authorizes this document.",
  },
  {
    id: "approverDesignation",
    label: "9. Designation of the approver",
    type: "text",
    tooltip: "Job title of the approver.",
  },
  {
    id: "companyLogo",
    label: "10. Upload the Company Logo (Image)",
    type: "file",
    tooltip: "Upload a high-quality image file (PNG/JPG) of your company logo.",
  },
  {
    id: "companyDetails",
    label: "11. Company Details (Provide small write-up about the company)",
    type: "textarea",
    tooltip:
      "A brief introduction to your company, its history, and what it does.",
  },
  {
    id: "productsServices",
    label: "12. Products and/or services provided",
    type: "textarea",
    tooltip: "List the core products and/or services you deliver to customers.",
  },
];
