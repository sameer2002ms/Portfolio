const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  ExternalHyperlink,
  TabStopType,
  TabStopPosition,
  convertInchesToTwip,
  NumberFormat,
} = require("docx");

const NAVY = "1F3864";
const DARK = "000000";
const GREY = "404040";

const bulletNumbering = {
  config: [
    {
      reference: "bullet-list",
      levels: [
        {
          level: 0,
          format: "bullet",
          text: "\u25CF",
          alignment: AlignmentType.LEFT,
          style: {
            paragraph: {
              indent: {
                left: convertInchesToTwip(0.25),
                hanging: convertInchesToTwip(0.18),
              },
            },
            run: { size: 16, color: NAVY },
          },
        },
      ],
    },
  ],
};

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 90, after: 40 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 2 },
    },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 22,
        color: NAVY,
        allCaps: true,
        font: "Calibri",
      }),
    ],
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullet-list", level: 0 },
    spacing: { after: 30 },
    children: [new TextRun({ text, size: 20, color: DARK, font: "Calibri" })],
  });
}

function link(url, text) {
  return new ExternalHyperlink({
    link: url,
    children: [
      new TextRun({
        text,
        size: 20,
        color: "1155CC",
        underline: {},
        font: "Calibri",
      }),
    ],
  });
}

function jobHeader(title, dates) {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { after: 20 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 21,
        color: DARK,
        font: "Calibri",
      }),
      new TextRun({
        text: `\t${dates}`,
        italics: true,
        size: 19,
        color: GREY,
        font: "Calibri",
      }),
    ],
  });
}

function jobSub(text) {
  return new Paragraph({
    spacing: { after: 20 },
    children: [
      new TextRun({
        text,
        italics: true,
        size: 19,
        color: GREY,
        font: "Calibri",
      }),
    ],
  });
}

function projectHeader(titleRuns) {
  return new Paragraph({
    spacing: { after: 20 },
    children: titleRuns,
  });
}

function techStack(text) {
  return new Paragraph({
    spacing: { after: 20 },
    children: [
      new TextRun({
        text: "Tech Stack: ",
        bold: true,
        size: 19,
        color: NAVY,
        font: "Calibri",
      }),
      new TextRun({
        text,
        italics: true,
        size: 19,
        color: GREY,
        font: "Calibri",
      }),
    ],
  });
}

const doc = new Document({
  numbering: bulletNumbering,
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 200, bottom: 200, left: 600, right: 600 },
        },
      },
      children: [
        // Header
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 20 },
          children: [
            new TextRun({
              text: "MOHD SAMEER",
              bold: true,
              size: 36,
              color: NAVY,
              font: "Calibri",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: "Backend Developer",
              size: 21,
              color: DARK,
              font: "Calibri",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 30 },
          children: [
            new TextRun({
              text: "+91 7617056679 | md.sameer.edu@gmail.com | ",
              size: 18,
              color: DARK,
              font: "Calibri",
            }),
            link("https://www.linkedin.com/in/sameeer/", "LinkedIn"),
            new TextRun({
              text: " | ",
              size: 18,
              color: DARK,
              font: "Calibri",
            }),
            link("https://github.com/sameer2002ms", "GitHub"),
            new TextRun({
              text: " | ",
              size: 18,
              color: DARK,
              font: "Calibri",
            }),
            link("https://leetcode.com/u/Sameer_ms786/", "LeetCode"),
          ],
        }),

        // Experience
        sectionHeading("Experience"),
        jobHeader(
          "Application Developer (Backend Developer) — IBM",
          "Nov 2024 – Present",
        ),
        jobSub("Noida, India (Remote)"),

        bullet(
          "Designed and implemented Azure Durable Functions to orchestrate long-running document processing pipelines, enabling parallel processing of 10,000+ page PDFs within 10 minutes using fan-out/fan-in execution.",
        ),
        bullet(
          "Engineered LLM prompts and integrated Azure AI Document Intelligence (OCR) to improve the accuracy of PII/sensitive data extraction from scanned and digital documents.",
        ),
        bullet(
          "Implemented multithreaded processing and integrated Azure Blob Storage for efficient document ingestion, storage, and retrieval across large-scale AI processing pipelines.",
        ),
        bullet(
          "Developed backend APIs using Python (Flask) as a proxy layer, orchestrating requests to Azure Functions and Azure Durable Functions for enterprise AI workflows.",
        ),

        jobHeader(
          "Backend Engineer Intern (Founding Developer) — American Tiger LLC",
          "Sep 2024 – Nov 2024",
        ),
        jobSub("Kolkata, WB"),
        bullet(
          "Built the backend of a product from scratch using Django REST Framework, designing REST APIs and core application architecture.",
        ),
        bullet(
          "Implemented JWT authentication, Google OAuth, and PostgreSQL for secure user management and persistent data storage.",
        ),
        bullet(
          "Containerized the application with Docker and deployed backend services to Google Cloud Platform (GCP).",
        ),

        // Projects
        sectionHeading("Projects"),

        projectHeader([
          new TextRun({
            text: "StrideAI – AI Accountability Platform  —  ",
            bold: true,
            size: 21,
            color: DARK,
            font: "Calibri",
          }),
          link("https://github.com/sameer2002ms/strideAI", "GitHub"),
          new TextRun({
            text: "  |  ",
            size: 20,
            color: DARK,
            font: "Calibri",
          }),
          link("https://stride-ai-phi.vercel.app/dashboard", "Live Demo"),
        ]),
        techStack(
          "Python, Django REST Framework, PostgreSQL, Redis, Celery, Celery Beat, Message Broker/Queue, Webhooks, Cron Jobs, Rate Limiting, OpenAI API, Docker, Azure, React.js, Tailwind CSS",
        ),
        bullet(
          "Architected a production-grade AI accountability platform (Django REST Framework, React + Tailwind CSS) enabling goal tracking, AI-driven coaching conversations, and webhook-based Telegram bot integration across multiple channels",
        ),
        bullet(
          "Integrated OpenAI APIs with conversation-history and long-term memory context to generate personalized, stateful AI coaching responses",
        ),
        bullet(
          "Built asynchronous task pipelines using Celery as a message broker and Redis as a message queue, with Celery Beat for cron-style scheduled AI workflows and automation",
        ),
        bullet(
          "Implemented JWT-based authentication with refresh-token rotation and Redis-backed rate limiting to secure REST APIs against abuse",
        ),
        bullet(
          "Designed a normalized PostgreSQL schema for users, goals, conversations, and AI memory, optimized for relational query performance",
        ),
        bullet(
          "Architected the system with a provider-agnostic AI layer, enabling future support for multiple LLM providers with minimal code changes",
        ),
        bullet(
          "Containerized the application with Docker and deployed the backend on Azure Container Apps (Azure Database for PostgreSQL, Azure Container Registry), with the frontend hosted on Vercel",
        ),

        projectHeader([
          new TextRun({
            text: "RAG-based Document Q&A System V2 (LangChain + Qdrant)  —  ",
            bold: true,
            size: 21,
            color: DARK,
            font: "Calibri",
          }),
          link("https://github.com/sameer2002ms/chatWithDoc-v3.0.0", "GitHub"),
          new TextRun({
            text: "  |  ",
            size: 20,
            color: DARK,
            font: "Calibri",
          }),
          link("https://chat-with-doc-v3-0-0.vercel.app/", "Live Demo"),
        ]),
        techStack(
          "Python, Django REST Framework, LangChain, Qdrant, PostgreSQL, Redis, React.js, Docker, JWT Authentication, Supabase, OpenAI API (text-embedding-3-small, GPT-4.1-mini), Vercel",
        ),
        bullet(
          "Iteratively rebuilt this project across three versions — from a core Django + Qdrant RAG pipeline to a full-stack production system with a React frontend (deployed on Vercel) and a Django REST backend, fully containerized with Docker Compose (Django, PostgreSQL, Qdrant, Redis)",
        ),
        bullet(
          "Built a PDF-first ingestion pipeline using LangChain Runnable chains with token-based chunking and OpenAI text-embedding-3-small embeddings, storing vectors in Qdrant with metadata-scoped semantic retrieval",
        ),
        bullet(
          "Implemented JWT-based authentication (register, login, logout) and Redis-backed API rate limiting to secure upload and chat endpoints",
        ),
        bullet(
          "Used Supabase Storage for PDF hosting and PostgreSQL as the metadata source of truth, with grounded, hallucination-controlled answer generation via GPT-4.1-mini",
        ),

        // Skills
        sectionHeading("Skills"),
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({
              text: "Languages: ",
              bold: true,
              size: 20,
              color: NAVY,
              font: "Calibri",
            }),
            new TextRun({
              text: "Python, C++",
              size: 20,
              color: DARK,
              font: "Calibri",
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({
              text: "Backend: ",
              bold: true,
              size: 20,
              color: NAVY,
              font: "Calibri",
            }),
            new TextRun({
              text: "Django, Django REST Framework, Flask, REST API Development, LangChain, Celery, Redis",
              size: 20,
              color: DARK,
              font: "Calibri",
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({
              text: "Databases: ",
              bold: true,
              size: 20,
              color: NAVY,
              font: "Calibri",
            }),
            new TextRun({
              text: "SQL, PostgreSQL, Qdrant",
              size: 20,
              color: DARK,
              font: "Calibri",
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({
              text: "Cloud & DevOps: ",
              bold: true,
              size: 20,
              color: NAVY,
              font: "Calibri",
            }),
            new TextRun({
              text: "Azure Functions, Azure Durable Functions, Azure AI Services, Docker, Git",
              size: 20,
              color: DARK,
              font: "Calibri",
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({
              text: "GenAI: ",
              bold: true,
              size: 20,
              color: NAVY,
              font: "Calibri",
            }),
            new TextRun({
              text: "OpenAI API, LangChain, RAG pipelines, Azure AI Services",
              size: 20,
              color: DARK,
              font: "Calibri",
            }),
          ],
        }),

        // Education
        sectionHeading("Education"),
        new Paragraph({
          tabStops: [
            { type: TabStopType.RIGHT, position: TabStopPosition.MAX },
          ],
          children: [
            new TextRun({
              text: "Bachelor of Technology (Electrical Engineering) — KIIT University, Bhubaneswar",
              bold: true,
              size: 20,
              color: DARK,
              font: "Calibri",
            }),
            new TextRun({
              text: "\t2020 – 2024",
              italics: true,
              size: 19,
              color: GREY,
              font: "Calibri",
            }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  require("fs").writeFileSync("Mohd_Sameer_Resume.docx", buf);
  console.log("done");
});
