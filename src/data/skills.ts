// Technology names verified against public/Jaswant_Singh_Resume.pdf.
// Keep named tools separate from broader services or unlisted AI products.
export const technologySkills = [
  {
    id: "languages",
    title: "Languages & frameworks",
    items: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "SCSS", icon: "sass" },
      { name: "JavaScript", icon: "javascript" },
      { name: "jQuery", icon: "jquery" },
      { name: "PHP", icon: "php" },
      { name: "Laravel", icon: "laravel" },
      { name: "React", icon: "react" },
      { name: "Vite", icon: "vite" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
  {
    id: "wordpress",
    title: "WordPress & APIs",
    items: [
      { name: "WordPress", icon: "wordpress" },
      { name: "ACF", icon: "acf", title: "Advanced Custom Fields" },
      { name: "Elementor", icon: "elementor" },
      { name: "Gutenberg", icon: "gutenberg" },
      { name: "Headless WordPress", icon: "wordpress" },
      { name: "REST API", icon: "api" },
      { name: "GraphQL", icon: "graphql" },
      { name: "WP-CLI", icon: "terminal" },
    ],
  },
  {
    id: "commerce",
    title: "Commerce & payments",
    items: [
      { name: "Shopify", icon: "shopify" },
      { name: "Shopify Liquid", icon: "liquid" },
      { name: "WooCommerce", icon: "woocommerce" },
      { name: "Razorpay", icon: "razorpay" },
      { name: "Stripe", icon: "stripe" },
    ],
  },
  {
    id: "ai",
    title: "AI & automation",
    items: [
      { name: "Gemini API", icon: "googlegemini" },
      { name: "Google AI Studio", icon: "googleaistudio" },
    ],
  },
  {
    id: "design",
    title: "Design & analytics",
    items: [
      { name: "Figma", icon: "figma" },
      { name: "Google Analytics", icon: "googleanalytics" },
      { name: "Google Search Console", icon: "googlesearchconsole" },
      { name: "Core Web Vitals", icon: "performance" },
    ],
  },
  {
    id: "development",
    title: "Development tools",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
    ],
  },
] as const;
