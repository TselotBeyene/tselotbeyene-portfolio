export const projects = [
  {
    id: "01",
    slug: "aws-solicitors",
    title: "AWS Solicitors",
    year: "2024",
    role: "Full Stack Developer",
    description:
      "Developed and maintained the main web platforms and client-facing services for a UK immigration law firm.",
    link: "https://www.awsolicitors.co.uk",
    screenshot: "/projects/aws-solicitors.png",
    accent: "#c28f45",
    surface: "linear-gradient(180deg, #17140f 0%, #0d0b09 100%)",
    eyebrow: "Legal Services",
    lines: ["Immigration", "Case flows", "Consultation"],
    summary:
      "A legal-services website and client-facing platform focused on trust, clarity, and structured service discovery for immigration support.",
    bullets: [
      "Implemented and maintained the main website and supporting client-facing pages.",
      "Worked across frontend, backend, and data integration in a remote UK team setup.",
      "Helped structure clear navigation and service journeys for consultation-focused flows.",
    ],
    stack: ["JavaScript", "React", "Frontend", "Backend", "Client Services"],
  },
  {
    id: "02",
    slug: "ibiab-compliance",
    title: "IBIAB Compliance",
    year: "2024",
    role: "Full Stack Developer",
    description:
      "Built features for a cloud-based SaaS compliance platform that automates case and document workflows for immigration professionals.",
    link: "https://www.ibiab-compliance.co.uk/landing",
    screenshot: "/projects/ibiab-compliance.png",
    accent: "#7c8cff",
    surface: "linear-gradient(180deg, #0d1220 0%, #080b14 100%)",
    eyebrow: "Compliance SaaS",
    lines: ["Cases", "Documents", "Automation"],
    summary:
      "A cloud-based compliance platform designed to automate document handling and workflow management for immigration professionals.",
    bullets: [
      "Built workflow features for case and document compliance operations.",
      "Contributed to the product across the stack, connecting UI flows to backend behavior.",
      "Focused on readability, operational clarity, and automation support.",
    ],
    stack: ["SaaS", "Workflow Automation", "Frontend", "Backend", "Compliance"],
  },
  {
    id: "03",
    slug: "social-enterprise-pound",
    title: "The Social Enterprise Pound",
    year: "2024",
    role: "Full Stack Developer",
    description:
      "Supported a web platform for social enterprise initiatives, working across front-end, back-end, and platform functionality.",
    link: "https://www.thesocialenterprisepound.com",
    screenshot: "/projects/social-enterprise-pound.png",
    accent: "#10b981",
    surface: "linear-gradient(180deg, #0c1410 0%, #070b08 100%)",
    eyebrow: "Impact Platform",
    lines: ["Community", "Commerce", "Social impact"],
    summary:
      "A digital platform supporting social enterprise initiatives through clear storytelling, platform functionality, and community-facing web experiences.",
    bullets: [
      "Worked across frontend, backend, and platform-level functionality.",
      "Supported product delivery for social impact and commerce-oriented use cases.",
      "Helped maintain a web experience that balances messaging with usable flows.",
    ],
    stack: ["Full Stack", "Platform Development", "Community Web", "Frontend"],
  },
  {
    id: "04",
    slug: "arifpay",
    title: "ArifPay",
    year: "2025",
    role: "DevOps Engineer",
    description:
      "Manage Linux servers, CI/CD pipelines, containerized deployments, monitoring, and security controls for Ethiopia's first licensed payment gateway operator.",
    link: "https://arifpay.net",
    screenshot: "/projects/arifpay.png",
    accent: "#16c47f",
    surface: "linear-gradient(180deg, #07140f 0%, #040a08 100%)",
    eyebrow: "Payments",
    lines: ["Gateway", "POS", "Infrastructure"],
    summary:
      "A payment systems environment where infrastructure, deployment reliability, observability, and security are critical to everyday operation.",
    bullets: [
      "Support production Linux servers and containerized payment platform services.",
      "Build and maintain CI/CD pipelines and deployment workflows.",
      "Use monitoring and security controls to protect transaction-critical systems.",
    ],
    stack: ["Linux", "Docker", "CI/CD", "Monitoring", "Payments"],
  },
  {
    id: "05",
    slug: "routeforge",
    title: "RouteForge",
    year: "2026",
    role: "Personal Project",
    description:
      "A personal Render-hosted platform for browsing, editing, and visualizing Apache Camel integrations, schemas, and route metadata.",
    link: "https://routeforge-8zd3.onrender.com",
    screenshot: "/projects/routeforge.png",
    accent: "#4da3ff",
    surface: "linear-gradient(180deg, #08111e 0%, #050b13 100%)",
    eyebrow: "Personal Project",
    lines: ["Camel routes", "Schemas", "Visualization"],
    summary:
      "A personal exploration of full stack product building around Apache Camel integration workflows, route visibility, and schema-driven tooling.",
    bullets: [
      "Designed and deployed a Render-hosted platform for exploring integrations.",
      "Focused on browsing, editing, and visualizing route and schema metadata.",
      "Used it as a practical full stack project spanning UI, backend thinking, and platform setup.",
    ],
    stack: ["Personal Project", "Apache Camel", "Render", "Full Stack", "Tooling"],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug) ?? null;
}
