import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUp,
  Award,
  Briefcase,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Rocket,
  Send,
  Sparkles,
  Star,
  Sun,
  Trophy,
  X,
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";

import malakPhoto from "@/assets/malak.jpeg";
import { cn } from "@/lib/utils";
import {
  achievements,
  categories,
  certificates,
  education,
  experience,
  profile,
  projects,
  testimonials,
  type Project,
  type ProjectCategory,
} from "./data";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiReact,
  SiReactrouter,
  SiRedux,
  SiReactquery,
  SiAxios,
  SiGit,
  SiGithub,
  SiPostman,
  SiFigma,
  SiVercel,
  SiNpm,
  SiVscodium,
} from "react-icons/si";

/* -------------------- Utilities -------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8", className)}
    >
      {children}
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
        <Sparkles className="h-3 w-3 text-primary" />
        {eyebrow}
      </div>
      <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>
      )}
    </motion.div>
  );
}

/* -------------------- Loading Screen -------------------- */
function LoadingScreen({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            className="relative flex h-24 w-24 items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-t-2 border-primary" />
            <span className="font-display text-2xl font-bold text-gradient">M</span>
          </motion.div>
          <motion.p
            className="mt-6 text-sm uppercase tracking-[0.4em] text-muted-foreground"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            Loading portfolio
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------- Cursor Follower -------------------- */
function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 250, damping: 30 });
  const springY = useSpring(y, { stiffness: 250, damping: 30 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[400px] w-[400px] rounded-full opacity-40 mix-blend-screen blur-3xl"
    >
      <div className="h-full w-full rounded-full bg-gradient-primary" />
    </motion.div>
  );
}

/* -------------------- Animated Background -------------------- */
function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--gradient-hero),transparent_60%)]" />
      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl animate-blob" />
      <div
        className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl animate-blob"
        style={{ animationDelay: "6s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-fuchsia-500/15 blur-3xl animate-blob"
        style={{ animationDelay: "12s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

/* -------------------- Navbar -------------------- */
const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function Navbar({
  theme,
  toggleTheme,
  active,
}: {
  theme: "dark" | "light";
  toggleTheme: () => void;
  active: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl border border-border/40 px-4 py-3 transition-all",
            scrolled ? "glass-strong shadow-elegant" : "bg-transparent",
          )}
        >
          <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              M
            </span>
            <span className="hidden sm:inline">Malak.dev</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-primary opacity-20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-10 w-10 place-items-center rounded-full border border-border/50 bg-secondary/40 text-foreground transition-all hover:scale-105 hover:border-primary/50"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <a
              href="#contact"
              className="hidden rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105 sm:inline-block"
            >
              Hire me
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border/50 bg-secondary/40 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-strong mt-2 flex flex-col gap-1 rounded-2xl border border-border/40 p-3 md:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

/* -------------------- Typing effect -------------------- */
function useTypewriter(textToType: string, speed = 90, pause = 1800) {
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const t = setTimeout(
      () => {
        if (!deleting) {
          const next = textToType.slice(0, text.length + 1);
          setText(next);
          if (next === textToType) setTimeout(() => setDeleting(true), pause);
        } else {
          const next = textToType.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, speed, pause, textToType]);

  return text;
}

/* -------------------- Hero -------------------- */
function Hero() {
  const typed = useTypewriter("Front-End Developer");
  return (
    <Section id="home" className="min-h-screen pt-32 sm:pt-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-xs backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-muted-foreground">Available for internships & work</span>
          </div>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-gradient">Malak</span>
            <br />
            <span className="inline-flex items-center whitespace-nowrap text-[clamp(1.2rem,5vw,3.4rem)]">
              <span className="text-gradient">{typed}</span>
              <span className="inline-block h-[0.9em] w-[3px] animate-pulse bg-primary" />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.cv}
              download
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Download CV
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-6 py-3 text-sm font-semibold backdrop-blur transition-all hover:border-primary/60 hover:bg-secondary/60"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-transparent px-6 py-3 text-sm font-semibold backdrop-blur transition-all hover:border-primary/60 hover:bg-secondary/40"
            >
              <Rocket className="h-4 w-4" />
              View Projects
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-primary opacity-40 blur-3xl" />
          <div className="glass-strong relative overflow-hidden rounded-[2rem] border border-border/40 p-2 shadow-elegant">
            <img
              src={malakPhoto}
              alt={profile.name}
              className="h-[520px] w-full rounded-[1.6rem] object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* -------------------- About -------------------- */
function About() {
  return (
    <Section id="about">
      <SectionHeader
        eyebrow="About me"
        title="Crafting web experiences with care"
        description="A quick look at who I am and what I love to build."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="glass-strong rounded-3xl border border-border/40 p-8 lg:col-span-2"
        >
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            I'm <span className="text-foreground font-semibold">Malak Mahmoud</span>, a
            Front-End Developer . I love turning complex ideas into
            elegant, responsive interfaces — with a strong focus on <span className="text-foreground">React.js</span>,{" "}
            <span className="text-foreground">Tailwind CSS</span>, and modern JavaScript.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            My work spans healthcare platforms, admin dashboards, and premium portfolio
            experiences. I care deeply about clean architecture, accessibility, and delightful
            micro-interactions that make products feel alive.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            {[
              { icon: MapPin, label: profile.location },
              { icon: Mail, label: "Open to internships" },
              { icon: Globe, label: "Arabic · English" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-xl border border-border/40 bg-secondary/30 px-3 py-2 text-muted-foreground"
              >
                <item.icon className="h-4 w-4 text-primary" />
                {item.label}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4"
        >
          {[
            { icon: Rocket, title: "Fast learner", body: "Absorb new stacks in days, not weeks." },
            { icon: Layers, title: "Component thinker", body: "Reusable, composable, maintainable." },
            { icon: Trophy, title: "Quality obsessed", body: "Pixel-perfect and performance-aware." },
          ].map((c) => (
            <div
              key={c.title}
              className="glass rounded-2xl border border-border/40 p-5 transition-transform hover:-translate-y-1 hover:border-primary/50"
            >
              <c.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-display text-lg font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* -------------------- Skills -------------------- */
function Skills() {
  const stackCards = [
    {
      title: "Frontend",
      items: [
        { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS3", icon: SiCss, color: "#1572B6" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Bootstrap", icon: SiBootstrap, color: "#7D63F4" },
      ],
    },
    {
      title: "React Ecosystem",
      items: [
        { name: "React.js", icon: SiReact, color: "#61DAFB" },
        { name: "React Router", icon: SiReactrouter, color: "#CA4245" },
        { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
        { name: "React Query", icon: SiReactquery, color: "#0B7285" },
        { name: "Axios", icon: SiAxios, color: "#5A29E4" },
      ],
    },
    {
      title: "Tools",
      items: [
        { name: "Git", icon: SiGit, color: "#F05032" },
        { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
        { name: "VS Code", icon: SiVscodium, color: "#007ACC" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" },
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
        { name: "npm", icon: SiNpm, color: "#CB3837" },
      ],
    },
    {
      title: "Core Knowledge",
      items: [
        { name: "REST APIs", icon: Code2, color: "#22C55E" },
        { name: "Responsive Design", icon: Code2, color: "#38BDF8" },
        { name: "Component Architecture", icon: Code2, color: "#A78BFA" },
        { name: "DOM Manipulation", icon: Code2, color: "#F59E0B" },
        { name: "OOP", icon: Code2, color: "#F97316" },
        { name: "JSON", icon: Code2, color: "#F8B400" },
      ],
    },
  ];

  const badgeVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <Section id="skills">
      <SectionHeader
        eyebrow="Tech Stack"
        title="Tech Stack"
        description="Technologies and tools I use to build modern, scalable, and responsive web applications."
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.08 }}
        className="grid gap-5 sm:grid-cols-2"
      >
        {stackCards.map((group, idx) => (
          <motion.div
            key={group.title}
            variants={cardVariants}
            transition={{ duration: 0.6, delay: idx * 0.06 }}
            className="glass rounded-3xl border border-border/40 bg-secondary/50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="font-display text-lg font-semibold text-foreground">
                {group.title}
              </h3>
              <span className="rounded-full border border-border/40 bg-background/70 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted-foreground backdrop-blur">
                Stack
              </span>
            </div>
            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
              className="flex flex-wrap gap-3"
            >
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.span
                    key={item.name}
                    variants={badgeVariants}
                    className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/70 px-3 py-2 text-sm text-foreground transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/50 hover:shadow-[0_14px_32px_rgba(59,130,246,0.08)]"
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" style={{ color: item.color }} />
                    <span>{item.name}</span>
                  </motion.span>
                );
              })}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* -------------------- Projects -------------------- */
function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
      className="group overflow-hidden rounded-[28px] border border-border/50 bg-background/80 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-500 hover:border-primary/40 hover:shadow-[0_24px_90px_rgba(59,130,246,0.16)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-border/40 bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground backdrop-blur">
            {p.category}
          </span>
          {p.featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
              {p.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{p.description}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-full border border-border/40 bg-secondary/60 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {p.demo && (
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={p.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-all"
            >
              <Globe className="h-4 w-4" />
              Live Demo
            </motion.a>
          )}
          {p.github && (
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/70 px-4 py-2 text-sm font-semibold text-foreground transition-all hover:border-primary/40"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <Section id="projects">
      <SectionHeader
        eyebrow="Projects"
        title="Featured Projects"
        description="A collection of projects that showcase my experience in building responsive, modern, and user-friendly web applications using React and front-end technologies."
      />

      <div className="mx-auto mb-10 flex max-w-3xl flex-wrap justify-center gap-2 rounded-full border border-border/40 bg-secondary/30 p-2 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        {categories.map((c) => {
          const isActive = c === active;
          return (
            <motion.button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-medium transition-all",
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="projects-active"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-primary shadow-glow"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{c}</span>
            </motion.button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              className="col-span-full rounded-[28px] border border-dashed border-border/60 bg-secondary/20 py-16 text-center text-muted-foreground"
            >
              No projects in this category yet — more coming soon.
            </motion.div>
          )}
          {filtered.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

/* -------------------- Experience -------------------- */
function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        eyebrow="Experience"
        title="Where I've been building"
        description="Roles, programs and projects that shaped my journey."
      />
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/40 via-accent/30 to-transparent sm:left-1/2" />
        <div className="space-y-10">
          {experience.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={cn(
                "relative pl-14 sm:pl-0",
                i % 2 === 0 ? "sm:pr-[52%]" : "sm:pl-[52%]",
              )}
            >
              <span className="absolute left-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-gradient-primary shadow-glow sm:left-[calc(50%-10px)]">
                <Briefcase className="h-3 w-3 text-primary-foreground" />
              </span>
              <div className="glass rounded-2xl border border-border/40 p-6">
                <div className="text-xs uppercase tracking-widest text-primary">{e.period}</div>
                <h3 className="mt-1 font-display text-lg font-semibold">{e.role}</h3>
                <div className="text-sm text-muted-foreground">{e.company}</div>
                <p className="mt-3 text-sm text-muted-foreground">{e.description}</p>
                <ul className="mt-3 space-y-1.5">
                  {e.achievements.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------- Education & Certificates -------------------- */
function EducationAndCerts() {
  return (
    <Section id="education">
      <SectionHeader
        eyebrow="Education & Certificates"
        title="Always learning, always shipping"
      />
      <div className="grid gap-8 lg:grid-cols-5">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="glass-strong rounded-3xl border border-border/40 p-6 lg:col-span-2"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <GraduationCap className="h-5 w-5" />
            </span>
            <h3 className="font-display text-xl font-semibold">Education</h3>
          </div>
          {education.map((e) => (
            <div key={e.degree} className="rounded-2xl border border-border/40 bg-secondary/20 p-5">
              <div className="text-xs uppercase tracking-widest text-accent">{e.period}</div>
              <h4 className="mt-1 font-display text-lg font-semibold">{e.degree}</h4>
              <div className="text-sm text-muted-foreground">
                {e.school} · {e.location}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{e.detail}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
          {certificates.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass group rounded-2xl border border-border/40 p-5 transition hover:-translate-y-1 hover:border-primary/50"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-110">
                <Award className="h-5 w-5" />
              </span>
              <h4 className="mt-3 font-display text-base font-semibold">{c.title}</h4>
              <div className="text-xs text-primary">{c.org}</div>
              <div className="mt-1 text-xs text-muted-foreground">{c.date}</div>
              <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------- Counter -------------------- */
function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const duration = 1800;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(value * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="text-gradient">
      {n}
      {suffix}
    </span>
  );
}

function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeader eyebrow="By the numbers" title="A few milestones" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass-strong rounded-3xl border border-border/40 p-6 text-center"
          >
            <div className="font-display text-5xl font-bold">
              <Counter value={a.value} suffix={a.suffix} />
            </div>
            <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">
              {a.label}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- Testimonials -------------------- */
function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeader
        eyebrow="Testimonials"
        title="Client feedback"
        description="Real feedback from collaborators and stakeholders who have worked with me."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="glass-strong group relative overflow-hidden rounded-[28px] border border-border/40 bg-secondary/30 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-primary/40"
          >
            <div className="absolute right-5 top-5 font-display text-5xl leading-none text-primary/35">
              &ldquo;
            </div>
            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: t.rating }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">“{t.quote}”</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-primary/20 bg-gradient-primary text-sm font-semibold text-primary-foreground shadow-glow">
                {t.initials}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{t.name}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t.project}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- Contact -------------------- */
function Contact() {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Failed to copy email");
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    if (!name) return toast.error("Please add your name");
    toast.success("Thanks! I'll get back to you soon.");
    e.currentTarget.reset();
  };

  return (
    <Section id="contact">
      <SectionHeader
        eyebrow="Contact"
        title="Let's build something great"
        description="Have an idea, role or collaboration in mind? Drop a message."
      />
      <div className="grid gap-6 lg:grid-cols-5">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-3"
        >
          {[
            { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, copy: true },
            { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
            { icon: FaLinkedin, label: "LinkedIn", value: "malak-zayed", href: profile.linkedin },
            { icon: FaGithub, label: "GitHub", value: "@Malak175", href: profile.github },
            { icon: MapPin, label: "Location", value: profile.location },
          ].map((c) => (
            <div
              key={c.label}
              className="glass group flex items-center justify-between rounded-2xl border border-border/40 p-4 transition hover:border-primary/50"
            >
              <a
                href={c.href ?? "#"}
                target={c.href?.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex min-w-0 flex-1 items-center gap-3"
              >
                <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <c.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="truncate text-sm font-medium">{c.value}</div>
                </div>
              </a>
              {c.copy && (
                <button
                  onClick={copyEmail}
                  className="ml-3 grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg border border-border/40 bg-secondary/40 transition hover:border-primary/50 hover:bg-primary/10"
                  aria-label="Copy email"
                >
                  <Copy className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            {[
              { icon: FaGithub, href: profile.github },
              { icon: FaLinkedin, href: profile.linkedin },
              { icon: FaInstagram, href: "#" },
              { icon: Mail, href: `mailto:${profile.email}` },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-xl border border-border/40 bg-secondary/30 transition-all hover:scale-110 hover:border-primary/60 hover:bg-primary/10"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          onSubmit={onSubmit}
          className="glass-strong rounded-3xl border border-border/40 p-6 sm:p-8 lg:col-span-3"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-muted-foreground">Your name</span>
              <input
                name="name"
                required
                placeholder="Your name"
                className="rounded-xl border border-border/40 bg-background/40 px-4 py-3 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-muted-foreground">Email</span>
              <input
                name="email"
                type="email"
                required
                placeholder="your.email@example.com"
                className="rounded-xl border border-border/40 bg-background/40 px-4 py-3 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>
          <label className="mt-4 flex flex-col gap-2 text-sm">
            <span className="text-muted-foreground">Subject</span>
            <input
              name="subject"
              placeholder="Subject"
              className="rounded-xl border border-border/40 bg-background/40 px-4 py-3 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="mt-4 flex flex-col gap-2 text-sm">
            <span className="text-muted-foreground">Message</span>
            <textarea
              name="message"
              rows={5}
              placeholder="Write your message here"
              className="resize-none rounded-xl border border-border/40 bg-background/40 px-4 py-3 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <button
            type="submit"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            <Send className="h-4 w-4" />
            Send Message
          </button>
        </motion.form>
      </div>
    </Section>
  );
}

/* -------------------- Footer -------------------- */
function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border/40 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted-foreground sm:flex-row sm:px-8">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
            M
          </span>
          <span className="font-display font-semibold text-foreground">Malak Mahmoud</span>
          <span className="hidden sm:inline">· Front-End Developer</span>
        </div>
        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub className="h-4 w-4 transition hover:text-foreground" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="h-4 w-4 transition hover:text-foreground" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Mail className="h-4 w-4 transition hover:text-foreground" />
          </a>
        </div>
        <div className="text-xs">© {new Date().getFullYear()} · Crafted with care</div>
      </div>
    </footer>
  );
}

/* -------------------- Scroll to top + progress -------------------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <motion.div
      style={{ width }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-primary"
    />
  );
}

function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-transform hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* -------------------- Root Portfolio -------------------- */
export function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [active, setActive] = useState("home");

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.href.slice(1))).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LoadingScreen done={loaded} />
      <ScrollProgress />
      <AnimatedBackground />
      <CursorGlow />
      <Navbar
        theme={theme}
        toggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        active={active}
      />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <EducationAndCerts />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}