/**
 * Career narrative for hiring managers:
 * Employers first (what you shipped there), then one flagship personal project.
 * Nested live products live in copy + relatedLinks — not as separate scroll items.
 */

export const experience = [
  {
    company: "ArifPay",
    year: "2025",
    role: "DevOps Engineer",
    summary:
      "Ethiopia's first licensed payment gateway operator — production infrastructure plus live partner platforms.",
    work: [
      "Payment gateway infrastructure (Linux, CI/CD, containers, monitoring, security)",
      "Sheger FM dashboard, Bisrat FM dashboard, Arif Ekub",
      "Ethiopian FM, Ethio FM, and Switch",
    ],
  },
  {
    company: "Andrew Williams Solicitors",
    year: "2024",
    role: "Full Stack Developer",
    summary:
      "Remote UK full stack work on legal compliance and social-impact web platforms.",
    work: [
      "ICMS — Immigration Compliance Management System",
      "TSEP — The Social Enterprise Pound",
    ],
  },
  {
    company: "Atlas Computer Technology",
    year: "2022",
    role: "DevOps Engineer",
    summary:
      "Mobile banking delivery for Ethiopian bank clients.",
    work: ["Siinqee Bank", "Wegagen Bank", "Zamzam", "Hijira"],
  },
];

/** Featured portfolio scroll items — one story per employer + flagship personal. */
export const projects = [
  {
    id: "01",
    slug: "arifpay",
    title: "ArifPay",
    year: "2025",
    role: "DevOps Engineer",
    company: "ArifPay",
    description:
      "DevOps for Ethiopia's licensed payment gateway — plus live platforms like Arif Ekub, Sheger FM, and Bisrat FM dashboards.",
    link: "https://arifpay.net",
    screenshot: "/projects/arifpay.png",
    accent: "#16c47f",
    surface: "linear-gradient(180deg, #07140f 0%, #040a08 100%)",
    eyebrow: "Current role",
    lines: ["Arif Ekub", "Sheger FM", "Bisrat FM"],
    summary:
      "At ArifPay I own the reliability layer for a licensed payment gateway and support live partner products — including Arif Ekub and FM dashboards for Sheger and Bisrat.",
    bullets: [
      "Manage Linux servers, CI/CD, containerized deployments, monitoring, and security.",
      "Support live products such as Arif Ekub and Sheger / Bisrat FM dashboards.",
      "Also worked across Ethiopian FM, Ethio FM, and Switch in the same production environment.",
    ],
    stack: ["Linux", "Docker", "CI/CD", "Monitoring", "Payments"],
    relatedLinks: [
      { label: "Arif Ekub", href: "https://arif-ekub.arifpay.net/" },
      { label: "Sheger FM dashboard", href: "https://shegerfm-dashboard.arifpay.net" },
      { label: "Bisrat FM dashboard", href: "https://bisratfm-dashboard.arifpay.net" },
      { label: "ArifPay", href: "https://arifpay.net" },
    ],
  },
  {
    id: "02",
    slug: "andrew-williams-solicitors",
    title: "Andrew Williams Solicitors",
    year: "2024",
    role: "Full Stack Developer",
    company: "Andrew Williams Solicitors",
    description:
      "Full stack developer on ICMS (Immigration Compliance Management System) and TSEP (The Social Enterprise Pound).",
    link: "https://www.ibiab-compliance.co.uk/landing",
    screenshot: "/projects/ibiab-compliance.png",
    accent: "#c28f45",
    surface: "linear-gradient(180deg, #17140f 0%, #0d0b09 100%)",
    eyebrow: "Full stack",
    lines: ["ICMS", "TSEP", "UK remote"],
    summary:
      "At Andrew Williams Solicitors I shipped full stack work on ICMS — a cloud compliance platform for immigration professionals — and TSEP, a social enterprise commerce platform.",
    bullets: [
      "Built features for ICMS (live as IBIAB Compliance) across case and document workflows.",
      "Contributed to TSEP — The Social Enterprise Pound — across web and platform functionality.",
      "Worked remotely with a UK team on client-facing, trust-sensitive products.",
    ],
    stack: ["JavaScript", "React", "Full Stack", "Compliance SaaS", "Platforms"],
    relatedLinks: [
      {
        label: "ICMS / IBIAB Compliance",
        href: "https://www.ibiab-compliance.co.uk/landing",
      },
      {
        label: "TSEP",
        href: "https://www.thesocialenterprisepound.com",
      },
    ],
    gallery: [
      {
        label: "ICMS",
        src: "/projects/ibiab-compliance.png",
        href: "https://www.ibiab-compliance.co.uk/landing",
      },
      {
        label: "TSEP",
        src: "/projects/social-enterprise-pound.png",
        href: "https://www.thesocialenterprisepound.com",
      },
    ],
  },
  {
    id: "03",
    slug: "atlas-computer-technology",
    title: "Atlas Computer Technology",
    year: "2022",
    role: "DevOps Engineer",
    company: "Atlas Computer Technology",
    description:
      "DevOps and delivery for mobile banking used by banks including Siinqee and Wegagen — plus Zamzam and Hijira.",
    link: "https://act.com.et",
    screenshot: "/projects/atlas-computer-technology.png",
    accent: "#2563eb",
    surface: "linear-gradient(180deg, #0d1220 0%, #080b14 100%)",
    eyebrow: "Mobile banking",
    lines: ["Siinqee", "Wegagen", "Zamzam", "Hijira"],
    summary:
      "At Atlas Computer Technology I supported mobile banking products for Ethiopian banks. Live references include Siinqee Bank and Wegagen Bank's digital / mobile banking presence.",
    bullets: [
      "Supported mobile banking delivery for Siinqee Bank and Wegagen Bank.",
      "Also contributed across Zamzam and Hijira banking clients.",
      "Worked in production fintech contexts where uptime and trust are non-negotiable.",
    ],
    stack: ["Mobile Banking", "DevOps", "Fintech", "Delivery"],
    relatedLinks: [
      { label: "Atlas Computer Technology", href: "https://act.com.et" },
      { label: "Siinqee Bank", href: "https://siinqeebank.com/" },
      { label: "Wegagen Bank", href: "https://wegagen.com/" },
    ],
    gallery: [
      {
        label: "Siinqee Bank",
        src: "/projects/siinqee-bank.png",
        href: "https://siinqeebank.com/",
      },
      {
        label: "Wegagen Bank",
        src: "/projects/wegagen-bank.png",
        href: "https://wegagen.com/",
      },
    ],
  },
  {
    id: "04",
    slug: "routeforge",
    title: "RouteForge",
    year: "2026",
    role: "Personal Project",
    company: "Personal",
    description:
      "Personal platform for browsing, editing, and visualizing Apache Camel integrations, schemas, and route metadata.",
    link: "https://github.com/TselotBeyene/RouteForge",
    screenshot: "/projects/routeforge.png",
    accent: "#4da3ff",
    surface: "linear-gradient(180deg, #08111e 0%, #050b13 100%)",
    eyebrow: "Personal · flagship",
    lines: ["Camel routes", "Schemas", "Full stack"],
    summary:
      "RouteForge is my flagship personal project — a full stack tool for making Apache Camel integrations visible, editable, and easier to reason about.",
    bullets: [
      "Designed and built tooling around Camel routes, schemas, and OpenAPI metadata.",
      "Used it to practice end-to-end product thinking: UI, backend, and deployment.",
      "Related personal work on GitHub includes a customer risk ML pipeline, multi-threaded banking, and banking fraud detection.",
    ],
    stack: ["TypeScript", "Apache Camel", "Full Stack", "OpenAPI", "Tooling"],
  },
];

/** Extra personal repos — for the AI twin / detail context, not the main scroll. */
export const personalProjects = [
  {
    title: "Customer Risk Pipeline",
    year: "2025",
    detail:
      "End-to-end customer risk ML pipeline with PySpark, MLflow, ClickHouse, and Superset.",
    link: "https://github.com/TselotBeyene/customer-risk-ml-pipeline",
  },
  {
    title: "Multi-Threaded Banking",
    year: "2026",
    detail:
      "Core Java project on concurrency, memory behavior, and data integrity in simultaneous banking operations.",
    link: "https://github.com/TselotBeyene/Multi-Threaded-Banking",
  },
  {
    title: "Banking Fraud Detection",
    year: "2025",
    detail:
      "ML exploration of banking fraud detection patterns and risk signals.",
    link: "https://github.com/TselotBeyene/Banking-fraud-detection-adey",
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug) ?? null;
}
