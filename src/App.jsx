import React, { useEffect, useRef, useState } from "react";

// ---------- Data (edit here to update content) ----------

const PROFILE = {
  name: "Mohd Sameer",
  role: "Backend Developer",
  tagline:
    "Python APIs, Django & Flask services, and GenAI pipelines that hold up in production.",
  email: "md.sameer.edu@gmail.com",
  phone: "+91 7617056679",
  linkedin: "https://www.linkedin.com/in/sameeer/",
  github: "https://github.com/sameer2002ms",
  leetcode: "https://leetcode.com/u/Sameer_ms786/",
  experienceStart: new Date("2024-09-01"),
};

const NAV = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
];

const EXPERIENCE = [
  {
    role: "Application Developer (Backend Developer)",
    company: "IBM",
    location: "Noida, India (Remote)",
    period: "Nov 2024 — Present",
    status: "current",
    points: [
      "Designed and implemented Azure Durable Functions to orchestrate long-running document processing pipelines, enabling parallel processing of 10,000+ page PDFs within 10 minutes using fan-out/fan-in execution.",
      "Engineered LLM prompts and integrated Azure AI Document Intelligence (OCR) to improve the accuracy of PII/sensitive data extraction from scanned and digital documents.",
      "Implemented multithreaded processing and integrated Azure Blob Storage for efficient document ingestion, storage, and retrieval across large-scale AI processing pipelines.",
      "Developed backend APIs using Python (Flask) as a proxy layer, orchestrating requests to Azure Functions and Azure Durable Functions for enterprise AI workflows.",
    ],
  },
  {
    role: "Backend Engineer Intern (Founding Developer)",
    company: "American Tiger LLC",
    location: "Kolkata, WB",
    period: "Sep 2024 — Nov 2024",
    status: "done",
    points: [
      "Built the backend of a product from scratch using Django REST Framework, designing REST APIs and core application architecture.",
      "Implemented JWT authentication, Google OAuth, and PostgreSQL for secure user management and persistent data storage.",
      "Containerized the application with Docker and deployed backend services to Google Cloud Platform (GCP).",
    ],
  },
  {
    role: "Summer Intern",
    company: "HighRadius",
    location: "Bhubaneswar, Odisha",
    period: "May 2023 — Jun 2023",
    status: "done",
    points: [
      "Built an ML model on real-world datasets to predict customer order amounts, presenting insights to the team.",
    ],
  },
];

const PROJECTS = [
  {
    name: "StrideAI – AI Accountability Platform",
    version: "v1.0.0",
    stack: [
      "Django REST Framework",
      "React",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Docker",
      "Azure",
      "OpenAI",
    ],
    description:
      "Built a production-grade AI accountability platform featuring intelligent coaching conversations, goal tracking, Telegram integration, and a scalable, provider-agnostic AI architecture deployed on Microsoft Azure.",
    points: [
      "Developed a provider-agnostic AI engine using OpenAI, conversation history, and long-term memory to deliver personalized, stateful coaching responses.",
      "Implemented asynchronous workflows using Celery, Redis, and Celery Beat, along with JWT authentication, refresh-token rotation, and Redis-backed API rate limiting.",
      "Containerized the application with Docker and deployed the backend on Azure Container Apps (Azure Database for PostgreSQL, Azure Container Registry) and the frontend on Vercel.",
    ],
    github: "https://github.com/sameer2002ms/strideAI",
    live: "https://stride-ai-phi.vercel.app",
  },
  {
    name: "RAG-based Document Q&A System",
    version: "v3.0.0",
    stack: [
      "Django",
      "LangChain",
      "Qdrant",
      "React",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    description:
      "Iteratively rebuilt across three versions — from a core Django + Qdrant RAG pipeline to a full-stack production system with a React frontend and a Django REST backend, fully containerized with Docker Compose.",
    points: [
      "PDF-first ingestion pipeline using LangChain Runnable chains with token-based chunking and OpenAI text-embedding-3-small embeddings, stored in Qdrant with metadata-scoped retrieval.",
      "JWT-based authentication (register, login, logout) and Redis-backed API rate limiting on upload and chat endpoints.",
      "Supabase Storage for PDF hosting, PostgreSQL as the metadata source of truth, and grounded answer generation via GPT-4.1-mini.",
    ],
    github: "https://github.com/sameer2002ms/chatWithDoc-v3.0.0",
    live: "https://chat-with-doc-v3-0-0.vercel.app/",
  },
  {
    name: "CSV Processing API",
    version: "v1.0.0",
    stack: ["Django REST Framework", "Celery", "Redis"],
    description:
      "A scalable Django REST API built to handle large CSV uploads without blocking the request cycle.",
    points: [
      "Async processing via Celery + Redis queues for large uploads.",
      "Deduplication logic tuned to handle datasets with 100k+ rows.",
    ],
    github: "https://github.com/sameer2002ms/csv_final",
    live: null,
  },
  {
    name: "My Recipe App",
    version: "v1.0.0",
    stack: ["Django", "JWT", "REST"],
    description:
      "A recipe manager with a clean REST architecture and full CRUD support.",
    points: [
      "JWT authentication and full CRUD on recipes.",
      "Image upload support and search via ORM filtering.",
    ],
    github: "https://github.com/sameer2002ms/My-Recipe",
    live: null,
  },
];

const SKILLS = [
  { group: "languages", items: ["Python", "C++"] },
  {
    group: "backend",
    items: [
      "Django",
      "Django REST Framework",
      "Flask",
      "REST APIs",
      "LangChain",
      "Celery",
      "Redis",
      "celery-beat",
      "celery",
    ],
  },
  { group: "databases", items: ["SQL", "PostgreSQL", "Qdrant"] },
  {
    group: "cloud & devops",
    items: [
      "Azure Functions",
      "Azure Durable Functions",
      "Azure AI Services",
      "Docker",
      "Git",
    ],
  },
  {
    group: "genai",
    items: ["OpenAI API", "LangChain", "RAG Pipelines", "Azure AI Services"],
  },
];

const EDUCATION = {
  degree: "B.Tech, Electrical Engineering",
  school: "KIIT University, Bhubaneswar",
  period: "2020 — 2024",
};

// ---------- Helpers ----------

function useYearsOfExperience() {
  const [years, setYears] = useState("1.5");
  useEffect(() => {
    const ms = Date.now() - PROFILE.experienceStart.getTime();
    const y = ms / (1000 * 60 * 60 * 24 * 365.25);
    setYears(y.toFixed(1));
  }, []);
  return years;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ---------- Sections ----------

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <a href="#top" className="nav-brand">
        <span className="nav-brand-glyph">&gt;_</span> sameer
      </a>
      <button
        className="nav-toggle"
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "☰"}
      </button>
      <nav className={`nav-routes ${open ? "nav-routes-open" : ""}`}>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
            <span className="nav-slash">/</span>
            {n.label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
          say hello
        </a>
      </nav>
    </header>
  );
}

function TypedLine({ text, speed = 28, onDone }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setShown(text);
      onDone && onDone();
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        onDone && onDone();
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <span>{shown}</span>;
}

const JSON_LINES = (years) => [
  { key: null, raw: "{" },
  { key: "name", value: PROFILE.name, type: "s" },
  { key: "role", value: PROFILE.role, type: "s" },
  { key: "experience_years", value: `${years}+`, type: "n" },
  {
    key: "stack",
    value: '["Python", "Django", "Flask", "GenAI"]',
    type: "raw",
  },
  { key: "status", value: "open_to_opportunities", type: "s" },
  { key: null, raw: "}" },
];

function JsonLine({ line, isLast }) {
  if (line.raw) return <div>{line.raw}</div>;
  const valueNode =
    line.type === "s" ? (
      <span className="s">"{line.value}"</span>
    ) : line.type === "n" ? (
      <span className="n">{line.value}</span>
    ) : (
      <span className="s">{line.value}</span>
    );
  return (
    <div>
      &nbsp;&nbsp;<span className="k">"{line.key}"</span>: {valueNode}
      {!isLast && ","}
    </div>
  );
}

function Hero() {
  const years = useYearsOfExperience();
  const [showResponse, setShowResponse] = useState(false);
  const jsonLines = JSON_LINES(years);

  return (
    <section id="top" className="hero">
      <Reveal>
        <div className="terminal">
          <div className="terminal-bar">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
            <span className="terminal-title">request.sh</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-line">
              <span className="prompt">$</span>{" "}
              <span className="cmd">
                curl -X GET api.sameer.dev/developer{" "}
                <TypedLine
                  text="--pretty"
                  onDone={() => setShowResponse(true)}
                />
              </span>
            </div>

            {showResponse && (
              <div className="response fade-in">
                <div className="response-status">
                  <span className="status-code">200 OK</span>
                  <span className="status-meta">application/json · 41ms</span>
                </div>
                <pre className="json">
                  {jsonLines.map((line, i) => (
                    <JsonLine
                      key={i}
                      line={line}
                      isLast={i === jsonLines.length - 2}
                    />
                  ))}
                </pre>
              </div>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal delay={150} className="hero-copy">
        <h1>
          {PROFILE.name}
          <span className="hero-role">
            /{PROFILE.role.toLowerCase().replace(/\s+/g, "-")}
          </span>
        </h1>
        <p className="hero-tagline">{PROFILE.tagline}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">
            View projects
          </a>
          <a className="btn btn-ghost" href={`mailto:${PROFILE.email}`}>
            Get in touch
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function About() {
  const years = useYearsOfExperience();
  return (
    <section id="about" className="section">
      <Reveal>
        <p className="eyebrow">/about</p>
        <h2>What I build</h2>
        <p className="lede">
          I'm a backend developer with {years}+ years of hands-on experience
          shipping Python APIs and cloud-integrated systems. Most of my recent
          work sits at the intersection of traditional backend engineering and
          GenAI — building the plumbing that makes LLM features reliable in
          production, not just in a notebook. At IBM, that meant a document
          pipeline handling 20,000+ pages; on my own projects, it's meant
          retrieval pipelines, rate limiting, and auth done properly.
        </p>
      </Reveal>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <Reveal>
        <p className="eyebrow">/experience</p>
        <h2>Where I've worked</h2>
      </Reveal>
      <div className="timeline">
        {EXPERIENCE.map((job, i) => (
          <Reveal key={job.company} delay={i * 100} className="timeline-item">
            <div className="timeline-marker">
              <span
                className={`timeline-dot ${job.status === "current" ? "timeline-dot-live" : ""}`}
              />
              {i < EXPERIENCE.length - 1 && <span className="timeline-rule" />}
            </div>
            <div className="timeline-content">
              <div className="timeline-head">
                <h3>
                  {job.role} <span className="at">@ {job.company}</span>
                </h3>
                <span className="period">{job.period}</span>
              </div>
              <p className="location">{job.location}</p>
              <ul>
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index * 100} className="project-card">
      <div className="project-head">
        <h3>{project.name}</h3>
        <span className="version-tag">{project.version}</span>
      </div>
      <p className="project-desc">{project.description}</p>
      <ul className="project-points">
        {project.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div className="project-stack">
        {project.stack.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>
      <div className="project-links">
        <a href={project.github} target="_blank" rel="noreferrer noopener">
          source →
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer noopener"
            className="project-live"
          >
            live demo →
          </a>
        )}
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal>
        <p className="eyebrow">/projects</p>
        <h2>Things I've shipped on my own</h2>
      </Reveal>
      <div className="project-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard project={p} index={i} key={p.name} />
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <Reveal>
        <p className="eyebrow">/skills</p>
        <h2>Toolbox</h2>
      </Reveal>
      <div className="skills-grid">
        {SKILLS.map((s, i) => (
          <Reveal key={s.group} delay={i * 70} className="skill-group">
            <p className="skill-group-label">{s.group}</p>
            <div className="skill-chips">
              {s.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section section-tight">
      <Reveal>
        <p className="eyebrow">/education</p>
        <h2>{EDUCATION.degree}</h2>
        <p className="lede">
          {EDUCATION.school} · {EDUCATION.period}
        </p>
      </Reveal>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <Reveal>
        <p className="eyebrow">/contact</p>
        <h2>Let's build something</h2>
        <p className="lede">
          Open to backend and GenAI roles. The fastest way to reach me is email
          — I check it daily.
        </p>
        <div className="contact-grid">
          <a className="contact-card" href={`mailto:${PROFILE.email}`}>
            <span className="contact-label">email</span>
            <span className="contact-value">{PROFILE.email}</span>
          </a>
          <a
            className="contact-card"
            href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
          >
            <span className="contact-label">phone</span>
            <span className="contact-value">{PROFILE.phone}</span>
          </a>
          <a
            className="contact-card"
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="contact-label">linkedin</span>
            <span className="contact-value">/in/sameeer</span>
          </a>
          <a
            className="contact-card"
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="contact-label">github</span>
            <span className="contact-value">/sameer2002ms</span>
          </a>
          <a
            className="contact-card"
            href={PROFILE.leetcode}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="contact-label">leetcode</span>
            <span className="contact-value">/Sameer_ms786</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {PROFILE.name}
      </span>
      <span className="footer-status">
        <span className="footer-dot" /> status: 200 OK
      </span>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
