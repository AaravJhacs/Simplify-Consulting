import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  Header,
  ImageRun,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";

export const generateDocx = async (
  data,
  logoBase64,
  filename = "document.docx"
) => {
  try {
    console.log("Generating Native DOCX (v11.0 - Packer.toBlob)...");

    // Ensure filename ends in .docx
    if (filename.endsWith(".doc")) {
      filename = filename.replace(".doc", ".docx");
    }

    // Image logic: We need to convert Base64 string to Uint8Array for the docx library
    let imageChild = new TextRun("[Company Logo]");
    let headerImageChild = new TextRun("[Logo]");

    if (logoBase64) {
      try {
        // Convert Base64 data URI to Uint8Array
        const base64Data = logoBase64.split(",")[1];
        const binaryString = window.atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        imageChild = new ImageRun({
          data: bytes,
          transformation: { width: 200, height: 100 },
        });

        headerImageChild = new ImageRun({
          data: bytes,
          transformation: { width: 80, height: 40 },
        });
      } catch (e) {
        console.warn("Image conversion failed, falling back to text", e);
      }
    }

    // --- TITLE PAGE ---
    const titlePageValues = [
      new Paragraph({
        children: [imageChild],
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Organization Profile",
            bold: true,
            size: 48, // 24pt
          }),
        ],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: data.companyName,
            color: "4472C4",
            size: 36, // 18pt
          }),
        ],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Quality Management System",
            color: "333333",
            size: 32, // 16pt
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 800 },
      }),
      // Revision Table
      new Table({
        rows: [
          new TableRow({
            children: [
              "Rev. No.",
              "Description",
              "Originator",
              "Approved by",
              "Date",
            ].map(
              (text) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text, bold: true })],
                    }),
                  ],
                  shading: { fill: "F2F2F2" },
                  width: { size: 20, type: WidthType.PERCENTAGE },
                })
            ),
          }),
          new TableRow({
            children: [
              "1.0",
              "Final Version",
              data.originator,
              data.approver,
              data.date,
            ].map(
              (text) =>
                new TableCell({
                  children: [new Paragraph({ text: text || "" })],
                  width: { size: 20, type: WidthType.PERCENTAGE },
                })
            ),
          }),
        ],
        width: { size: 100, type: WidthType.PERCENTAGE },
      }),
    ];

    // --- MAIN CONTENT HEADER ---
    const header = new Header({
      children: [
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ children: [headerImageChild] })],
                  width: { size: 30, type: WidthType.PERCENTAGE },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                  },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Quality Management System",
                          bold: true,
                        }),
                      ],
                      alignment: AlignmentType.RIGHT,
                    }),
                    new Paragraph({
                      text: "Section 1- Organization Profile",
                      alignment: AlignmentType.RIGHT,
                    }),
                  ],
                  width: { size: 70, type: WidthType.PERCENTAGE },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                  },
                }),
              ],
            }),
          ],
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            bottom: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC" },
          },
        }),
      ],
    });

    // --- CONTENT SECTIONS ---
    const createSection = (title, content, isBold = false) => [
      new Paragraph({
        children: [new TextRun({ text: title, bold: true, size: 28 })], // 14pt
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: content, bold: isBold })],
        spacing: { after: 200 },
      }),
    ];

    const contentChildren = [
      ...createSection(
        "1. Purpose",
        "The purpose of this document is to provide the details of the organization and the products/services provided."
      ),
      ...createSection("2. Responsibilities", "NA"),
      ...createSection("3. Company Details", data.details),
      ...createSection("4. Products/Services Provided", data.products),
    ];

    if (data.aiEnhancement) {
      contentChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: "AI-Enhanced Scope Definition:", bold: true }),
          ],
          spacing: { before: 100 },
        }),
        new Paragraph({
          children: [new TextRun({ text: data.aiEnhancement })],
          spacing: { after: 200 },
        })
      );
    }

    contentChildren.push(
      new Paragraph({
        children: [
          new TextRun({ text: "5. Company Address", bold: true, size: 28 }),
        ],
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: data.companyName, bold: true })],
      }),
      new Paragraph({ text: data.address }),
      new Paragraph({ text: data.phone }),
      new Paragraph({ text: data.website, spacing: { after: 200 } }),

      ...createSection("6. Records", "NA"),
      ...createSection("7. References", "ISO 9001:2015 Standard")
    );

    // Construct Document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: titlePageValues, // Page 1
        },
        {
          properties: {},
          headers: { default: header }, // Headers for subsequent pages
          children: contentChildren,
        },
      ],
    });

    // Generate Blob and Download (v11.0)
    const blob = await Packer.toBlob(doc);
    console.log("Blob generated (v11.0 - Native), size:", blob.size);
    saveAs(blob, filename);

    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Export failed:", error);
    alert("Export failed: " + error.message);
    return null;
  }
};
