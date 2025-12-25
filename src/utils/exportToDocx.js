import { asBlob } from "html-docx-js-typescript";
import { saveAs } from "file-saver";

export const exportToDocx = async (elementId, filename = "document.docx") => {
  const content = document.getElementById(elementId).innerHTML;

  // Wrap in a standard HTML document structure with styles
  const htmlString = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <style>
            body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; color: #000; background: #fff; }
            h1 { font-size: 24pt; text-align: center; font-weight: bold; margin-bottom: 24pt; }
            h2 { font-size: 18pt; color: #2e74b5; margin-top: 18pt; margin-bottom: 12pt; }
            h3 { font-size: 14pt; margin-top: 14pt; margin-bottom: 10pt; }
            p { margin-bottom: 10pt; text-align: justify; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 18pt; }
            th, td { border: 1px solid #000; padding: 8pt; text-align: left; vertical-align: top; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .page-break { page-break-after: always; }
            .title-page { text-align: center; padding-top: 50pt; height: 90vh; display: flex; flex-direction: column; justify-content: space-between; }
            .logo-placeholder { font-weight: bold; font-size: 14pt; margin-bottom: 40pt; }
            .main-title { font-size: 36pt; font-weight: bold; margin-bottom: 20pt; }
            .sub-title { font-size: 24pt; color: #4472c4; margin-bottom: 60pt; }
            .revision-table { margin-top: auto; }
        </style>
    </head>
    <body>
        ${content}
    </body>
    </html>
  `;

  try {
    const blob = await asBlob(htmlString);
    saveAs(blob, filename);
  } catch (error) {
    console.error("Export failed:", error);
    alert("Failed to generate DOCX. Please try again.");
  }
};
