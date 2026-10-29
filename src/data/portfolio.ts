/**
 * Portfolio content, grounded in Jaswant Singh's supplied resume.
 * Add screenshots to public/projects and update image/imageAlt here.
 * Empty project URLs are intentionally omitted when the resume supplies none.
 */
export type ProjectPreview =
  | "travel"
  | "assistant"
  | "commerce"
  | "automation"
  | "sport"
  | "health"
  | "industrial"
  | "coffee";

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  purpose: string;
  contribution: string;
  outcome: string;
  technologies: string[];
  url?: string;
  image: string;
  imageAlt: string;
  preview: ProjectPreview;
  featured: boolean;
}

export const profile = {
  name: "Jaswant Singh",
  role: "Web & AI Developer",
  location: "New Delhi, India",
  email: "jaswantjassi2003@gmail.com",
  phone: "+91 83750 52071",
  phoneHref: "tel:+918375052071",
  resumeUrl: "/Jaswant_Singh_Resume.pdf",
  linkedin: "https://www.linkedin.com/in/jaswantsinghai/",
  summary:
    "I build thoughtful websites, online stores, and practical AI tools. From WordPress and Shopify to custom web development, I connect clear interfaces with the systems that make a business work.",
};

export const projects: Project[] = [
  {
    id: "travelbit-holidays",
    number: "01",
    title: "TravelBit Holidays",
    category: "Travel website & CRM",
    summary:
      "A connected travel experience, from discovering a destination to managing bookings and invoices.",
    purpose:
      "Give a travel business a public-facing website and a practical CRM for customer bookings and invoice generation.",
    contribution:
      "Built the travel website and CRM with WordPress, PHP, Laravel, React, and MySQL. Created ACF components and REST API integrations, with headless WordPress and GraphQL feeding the React front end.",
    outcome:
      "A travel website connected to a CRM that manages customer bookings and generates invoices.",
    technologies: [
      "WordPress",
      "PHP",
      "Laravel",
      "React",
      "MySQL",
      "REST API",
      "GraphQL",
    ],
    url: "https://travelbitholidays.com/",
    image: "/projects/travelbit-holidays.webp",
    imageAlt: "TravelBit Holidays travel website and booking CRM screenshot",
    preview: "travel",
    featured: true,
  },
  {
    id: "wordpress-business-assistant",
    number: "02",
    title: "AI-Powered WordPress Business Assistant",
    category: "Custom WordPress plugin",
    summary:
      "An AI assistant inside WordPress that turns existing page content into useful SEO and business copy.",
    purpose:
      "Help website owners create SEO-focused and business content without leaving WordPress.",
    contribution:
      "Built a custom PHP and JavaScript plugin that sends requests through the WordPress REST API to the Gemini API in the background, then displays results directly inside WordPress.",
    outcome:
      "Generates SEO titles, meta descriptions, product and service descriptions, FAQs, social captions, blog outlines, CTAs, and keyword suggestions from existing page content.",
    technologies: ["WordPress", "PHP", "JavaScript", "REST API", "Gemini API"],
    image: "/projects/wordpress-business-assistant.webp",
    imageAlt:
      "AI-Powered WordPress Business Assistant plugin interface screenshot",
    preview: "assistant",
    featured: true,
  },
  {
    id: "mata-payals",
    number: "03",
    title: "Mata Payals",
    category: "Shopify storefront",
    summary:
      "A responsive Shopify storefront with carefully structured product presentation.",
    purpose:
      "Present the brand and its products through a responsive online store.",
    contribution:
      "Built the Shopify website using Liquid, developed responsive layouts and product presentation, and handled ongoing website updates.",
    outcome:
      "A working Shopify storefront with responsive layouts, clear product presentation, and ongoing updates.",
    technologies: ["Shopify", "Shopify Liquid", "Responsive design"],
    url: "https://matapayals.com/",
    image: "/projects/mata-payals.webp",
    imageAlt: "Mata Payals Shopify storefront screenshot",
    preview: "commerce",
    featured: true,
  },
  {
    id: "ai-seo-automation",
    number: "04",
    title: "AI SEO & Content Automation System",
    category: "AI content workflow",
    summary:
      "A multi-option plugin that brings page analysis and generative SEO suggestions into WordPress.",
    purpose:
      "Automate repetitive content and technical SEO tasks across WordPress posts and pages.",
    contribution:
      "Built a custom WordPress plugin that analyzes page content and uses the Gemini API through Google AI Studio to suggest metadata, keywords, FAQs, and content improvements.",
    outcome:
      "Works with Elementor, Gutenberg, and other page builders on both posts and pages.",
    technologies: ["WordPress", "Gemini API", "Elementor", "Gutenberg"],
    image: "/projects/ai-seo-automation.webp",
    imageAlt: "AI SEO & Content Automation System WordPress plugin screenshot",
    preview: "automation",
    featured: false,
  },
  {
    id: "kho-kho-federation",
    number: "05",
    title: "Kho Kho Federation of India",
    category: "Government website",
    summary:
      "A custom WordPress platform for live information, data collection, and structured content management.",
    purpose:
      "Support live database-driven information, data collection, and structured information management.",
    contribution:
      "Built and maintain the custom WordPress website with PHP, JavaScript, and MySQL. Handle server and DNS configuration, deployments, and maintenance, using WP-CLI for routine tasks.",
    outcome:
      "A maintained platform with live database-driven information and structured data collection.",
    technologies: ["WordPress", "PHP", "JavaScript", "MySQL", "WP-CLI"],
    image: "/projects/kho-kho-federation.webp",
    imageAlt: "Kho Kho Federation of India website screenshot",
    preview: "sport",
    featured: false,
  },
  {
    id: "universal-remedies",
    number: "06",
    title: "Universal Remedies",
    category: "Ayurvedic e-commerce",
    summary:
      "An Ayurvedic online store combining custom web components with product-focused creative work.",
    purpose:
      "Create a responsive shopping experience for an Ayurvedic e-commerce business.",
    contribution:
      "Built the WordPress website with custom HTML5, CSS3, and JavaScript components and a Vite and Node.js front-end build. Designed product mockups in Figma and created product content, banners, and videos using AI tools.",
    outcome:
      "A responsive shopping experience supported by custom components, product content, and promotional assets.",
    technologies: [
      "WordPress",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Vite",
      "Node.js",
      "Figma",
    ],
    image: "/projects/universal-remedies.webp",
    imageAlt: "Universal Remedies Ayurvedic e-commerce website screenshot",
    preview: "health",
    featured: false,
  },
  {
    id: "trident-valves",
    number: "07",
    title: "Trident Valves",
    category: "Industrial website",
    summary:
      "An industrial website with structured product presentation and a focus on front-end performance.",
    purpose:
      "Present industrial products clearly across devices and improve website performance.",
    contribution:
      "Built the responsive WordPress website using HTML5, CSS3, and JavaScript. Optimized images, front-end code, and site structure for Core Web Vitals and technical SEO.",
    outcome:
      "Delivered up to 10x faster page loads for Trident Valves through front-end and image optimization.",
    technologies: [
      "WordPress",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Core Web Vitals",
      "Technical SEO",
    ],
    image: "/projects/trident-valves.webp",
    imageAlt: "Trident Valves industrial product website screenshot",
    preview: "industrial",
    featured: false,
  },
  {
    id: "zohras-coffee-shop",
    number: "08",
    title: "Zohra’s Coffee Shop",
    category: "Shopify storefront",
    summary:
      "A responsive Shopify presence for a coffee business, built with Liquid and maintained with content updates.",
    purpose: "Give a coffee business a responsive Shopify website.",
    contribution:
      "Built the Shopify website using Liquid, created responsive layouts, and handled website content updates.",
    outcome:
      "A working Shopify website with responsive layouts and maintained content.",
    technologies: ["Shopify", "Shopify Liquid", "Responsive design"],
    url: "https://zohrascoffeeshop.com/",
    image: "/projects/zohras-coffee-shop.webp",
    imageAlt: "Zohra’s Coffee Shop Shopify website screenshot",
    preview: "coffee",
    featured: false,
  },
];

export const capabilities = [
  {
    title: "Web Development",
    description:
      "Responsive websites and custom systems, built around the content, workflows, and integrations a business needs.",
    skills: [
      "WordPress",
      "Custom themes & plugins",
      "PHP & Laravel",
      "React",
      "REST API & GraphQL",
      "Technical SEO",
    ],
  },
  {
    title: "E-commerce",
    description:
      "Shopify and WooCommerce stores with clear product presentation, responsive shopping journeys, and payment integrations.",
    skills: [
      "Shopify Liquid",
      "WooCommerce",
      "Custom components",
      "Razorpay & Stripe",
      "Product presentation",
    ],
  },
  {
    title: "AI & Automation",
    description:
      "Practical AI integrations that help teams create content, support customers, and reduce repetitive website tasks.",
    skills: [
      "Gemini API",
      "AI assistants & chatbots",
      "SEO content workflows",
      "Workflow automation",
      "AI image & video generation",
    ],
  },
];

export const experience = [
  {
    role: "Web & AI Developer",
    company: "HANJICREATIONS",
    period: "May 2025 – Present",
    description:
      "Build responsive WordPress, Shopify, and custom web solutions across client industries. Develop AI chatbot and assistant integrations, deliver custom client projects, and create SEO-focused content and visual assets with generative AI.",
  },
  {
    role: "Web Developer",
    company: "SOCIAL EMERGER WEB SOLUTIONS",
    period: "Jul 2023 – May 2025",
    description:
      "Developed and optimized WordPress and Shopify websites, e-commerce platforms, and course-selling experiences. Managed responsive layouts, on-page SEO, hosting, maintenance, and third-party API integrations.",
  },
  {
    role: "Web Developer",
    company: "PRUDENTIAL BIOTECH",
    period: "Nov 2022 – May 2023",
    description:
      "Developed business and e-commerce websites with WordPress and WooCommerce. Built shopping workflows with Razorpay and Stripe, and handled SEO, lead-generation pages, product banners, and website maintenance.",
  },
];

export const education = [
  {
    title: "Bachelor of Computer Applications (BCA)",
    institution: "Indira Gandhi National Open University, New Delhi, India",
    period: "2022 – 2025",
  },
  {
    title: "Diploma in Website Engineering",
    institution: "Indian Institute of Computer Science, New Delhi, India",
    period: "2022 – 2024",
  },
];
