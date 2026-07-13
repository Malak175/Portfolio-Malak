import calculatorImg from "@/assets/Calculator.png";
import memoryGameImg from "@/assets/memorry-game.png";
import quizImg from "@/assets/Quize-App.png";
import blossomImg from "@/assets/Blossom.png";
import sheImg from "@/assets/SH.E.png";
import rmImg from "@/assets/R.M.png";
import tabeebakImg from "@/assets/tabeebak.png";
import adminImg from "@/assets/admintabeebak.png";

export type ProjectCategory = "React" | "HTML • CSS • JavaScript";

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tech: string[];
  category: ProjectCategory;
  github?: string;
  demo?: string;
  features?: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Tabeebak",
    description:
      "A full-stack healthcare platform that enables patients to book appointments, browse doctors and laboratories, and receive AI-powered health predictions.",
    longDescription:
      "A full-stack healthcare platform that enables patients to book appointments, browse doctors and laboratories, manage medical services, and receive AI-powered health predictions through a modern and responsive interface.",
    image: tabeebakImg,
    tech: ["React", "TypeScript", "Tailwind CSS", "React Router", "TanStack Query", "Node.js", "Express", "MongoDB"],
    category: "React",
    demo: "https://tabeebak-wqlp.vercel.app/",
    featured: true,
  },
  {
    title: "Tabeebak Admin Dashboard",
    description:
      "A responsive admin dashboard for managing doctors, laboratories, appointments, patients, and healthcare services with a clean scalable interface.",
    longDescription:
      "A responsive admin dashboard for managing doctors, laboratories, appointments, patients, and healthcare services with a clean and scalable interface.",
    image: adminImg,
    tech: ["React", "TypeScript", "Tailwind CSS", "React Router", "TanStack Query"],
    category: "React",
    demo: "https://admintabeebak.vercel.app/login",
    featured: true,
  },
  {
    title: "Blossom",
    description:
      "A modern responsive website showcasing elegant UI design, smooth layouts, and an engaging user experience.",
    longDescription:
      "A modern responsive website showcasing elegant UI design, smooth layouts, and engaging user experience.",
    image: blossomImg,
    tech: ["HTML5", "CSS3", "JavaScript"],
    category: "HTML • CSS • JavaScript",
    demo: "https://malak175.github.io/Blossom/",
  },
  {
    title: "SH.E",
    description:
      "A responsive landing page built with modern HTML, CSS, and JavaScript focusing on clean layouts and usability.",
    longDescription:
      "A responsive landing page built with modern HTML, CSS, and JavaScript focusing on clean layouts and usability.",
    image: sheImg,
    tech: ["HTML5", "CSS3", "JavaScript"],
    category: "HTML • CSS • JavaScript",
    demo: "https://malak175.github.io/SH.E/",
  },
  {
    title: "Quiz App",
    description:
      "An interactive quiz application with score tracking, dynamic questions, and responsive design.",
    longDescription:
      "An interactive quiz application with score tracking, dynamic questions, and responsive design.",
    image: quizImg,
    tech: ["HTML5", "CSS3", "JavaScript"],
    category: "HTML • CSS • JavaScript",
    demo: "https://malak175.github.io/Quize-App/",
  },
  {
    title: "Memory Game",
    description:
      "A responsive memory matching game with smooth interactions and engaging gameplay.",
    longDescription:
      "A responsive memory matching game with smooth interactions and engaging gameplay.",
    image: memoryGameImg,
    tech: ["HTML5", "CSS3", "JavaScript"],
    category: "HTML • CSS • JavaScript",
    demo: "https://malak175.github.io/memorry-game/",
  },
  {
    title: "Calculator",
    description:
      "A responsive calculator application capable of performing real-time arithmetic operations with a clean interface.",
    longDescription:
      "A responsive calculator application capable of performing real-time arithmetic operations with a clean interface.",
    image: calculatorImg,
    tech: ["HTML5", "CSS3", "JavaScript"],
    category: "HTML • CSS • JavaScript",
    demo: "https://malak175.github.io/Calculator/",
  },
  {
    title: "R.M",
    description:
      "A responsive website demonstrating modern layouts, reusable components, and interactive front-end design.",
    longDescription:
      "A responsive website demonstrating modern layouts, reusable components, and interactive front-end design.",
    image: rmImg,
    tech: ["HTML5", "CSS3", "JavaScript"],
    category: "HTML • CSS • JavaScript",
    demo: "https://malak175.github.io/R.M/",
  },
];

export const categories: Array<"All" | ProjectCategory> = [
  "All",
  "React",
  "HTML • CSS • JavaScript",
];

export const skills = [
  {
    category: "Front-End",
    items: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "Responsive Design", level: 93 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Bootstrap", level: 85 },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "React.js", level: 90 },
      { name: "React Router", level: 85 },
      { name: "Component Architecture", level: 88 },
    ],
  },
  {
    category: "Programming Languages",
    items: [
      { name: "JavaScript (ES6+)", level: 88 },
      { name: "Python", level: 80 },
      { name: "Java", level: 70 },
      { name: "C++", level: 68 },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Git & GitHub", level: 88 },
      { name: "VS Code", level: 95 },
      { name: "Vercel", level: 82 },
    ],
  },
  {
    category: "Concepts",
    items: [
      { name: "OOP", level: 85 },
      { name: "DOM Manipulation", level: 90 },
      { name: "REST APIs", level: 82 },
    ],
  },
  {
    category: "Other",
    items: [
      { name: "Problem Solving", level: 90 },
      { name: "Teamwork", level: 92 },
      { name: "Fast Learning", level: 95 },
    ],
  },
];

export const certificates = [
  {
    title: "React Frontend Web Developer",
    org: "Digital Egypt Pioneers Initiative (DEPI)",
    date: "Expected Dec 2025",
    description:
      "Comprehensive React.js training covering responsive UI, component architecture, and modern web fundamentals.",
  },
  {
    title: "CCNA — Networking Essentials",
    org: "Cisco Networking Academy",
    date: "May 2024 – Dec 2024",
    description:
      "Introduction to Networks, Switching, Routing, Wireless Essentials, and Enterprise Networking. Python automation & problem-solving.",
  },
  {
    title: "Python Programming",
    org: "Egyptian E-Learning University",
    date: "Expected Sep 2025 · 40 hours",
    description:
      "Python fundamentals, syntax, control flow, and OOP concepts through structured coursework.",
  },
  {
    title: "Artificial Intelligence",
    org: "Egyptian E-Learning University",
    date: "Expected Sep 2025",
    description:
      "Foundational AI concepts, algorithms, and their applications in modern software.",
  },
];

export const experience = [
  {
    role: "Front-End Developer (Freelance & Projects)",
    company: "Independent",
    period: "2024 — Present",
    description:
      "Built responsive web applications with React.js, Tailwind, and modern JavaScript. Delivered production-ready projects including healthcare platforms and admin dashboards.",
    achievements: [
      "Shipped Tabeebak — a healthcare booking web app used by real patients",
      "Designed & developed a full admin analytics dashboard",
      "Crafted a premium developer portfolio from the ground up",
    ],
  },
  {
    role: "React Frontend Trainee",
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    period: "2025",
    description:
      "Intensive training program on React.js, modern UI design, component-based architecture, and industry best practices.",
    achievements: [
      "Completed hands-on React.js projects",
      "Practiced modern web development fundamentals",
      "Collaborated in agile team settings",
    ],
  },
  {
    role: "Networking Academy Cadet",
    company: "Cisco Networking Academy",
    period: "May 2024 — Dec 2024",
    description:
      "Completed CCNA modules covering networks, switching, routing, wireless essentials, and Python automation.",
    achievements: [
      "Configured routers, switches, and wireless networks",
      "Automated network tasks with Python",
      "Solved multi-layer network challenges",
    ],
  },
];

export const education = [
  {
    degree: "B.Sc. in Information Technology",
    school: "Egyptian E-Learning University (EELU)",
    location: "Alexandria, Egypt",
    period: "Graduated 2026",
    detail:
      "Graduation Project: Tabeebak — AI-Powered Healthcare Management System · Grade: A+",
  },
];

export const testimonials = [
  {
    name: "Ranim Mohamed",
    project: "R.M Portfolio",
    initials: "RM",
    rating: 5,
    quote:
      "Working with Malak was a smooth experience. She understood the requirements well, communicated clearly throughout the project, and delivered a responsive website with a clean, modern design. I'm very happy with the final result.",
  },
  {
    name: "Shahd El Sayed",
    project: "SH.E",
    initials: "SE",
    rating: 5,
    quote:
      "Malak paid great attention to the UI details and made sure the website looked professional on different screen sizes. The final project matched what I had in mind and was delivered with excellent quality.",
  },
  {
    name: "Sarah Ahmed",
    project: "Blossom",
    initials: "SA",
    rating: 5,
    quote:
      "I really liked the overall design and user experience. The website feels modern, easy to navigate, and responsive across devices. Communication was professional and the project was delivered as expected.",
  },
];

export const achievements = [
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "Technologies Mastered", value: 20, suffix: "+" },
  { label: "Certificates Earned", value: 4, suffix: "" },
  { label: "GitHub Contributions", value: 320, suffix: "+" },
];

export const profile = {
  name: "Malak Mahmoud",
  title: "Front-End Developer",
  location: "Al Buhayrah, Egypt",
  email: "malak.mahmoud.zayed5@gmail.com",
  phone: "+201558520651",
  github: "https://github.com/Malak175",
  linkedin: "https://www.linkedin.com/in/malak-zayed-a5674a322",
  intro:
    "Front-End Developer with a degree in Information Technology, passionate about building responsive and user-friendly web applications using React.js, JavaScript, and modern web technologies. I enjoy creating clean, intuitive interfaces and continuously improving my skills through real-world development experience.",
};