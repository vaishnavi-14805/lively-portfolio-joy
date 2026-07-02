import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import pupilHeartRateImg from "../assets/pupil-heart-rate.jpg";
import busActivityImg from "../assets/bus-activity-detection.jpg";
import portfolioSiteImg from "../assets/portfolio-site.jpg";
import calculatorAppImg from "../assets/calculator-app.jpg";
import vaishnaviProfile from "../assets/profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vaishnavi Vilasagaram — Python Developer Portfolio" },
      { name: "description", content: "Aspiring Python developer. Explore projects, skills, internships and get in touch." },
      { property: "og:title", content: "Vaishnavi Vilasagaram — Portfolio" },
      { property: "og:description", content: "Aspiring Python developer." },
    ],
  }),
  component: Index,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "internships", label: "Internships" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  { name: "Python", level: 90 },
  { name: "HTML", level: 85 },
  { name: "CSS", level: 80 },
  { name: "JavaScript", level: 70 },
];

const PROJECTS = [
  { title: "Pupil Heart Rate Monitoring Device", desc: "Non-invasive heart rate estimation by analyzing pupil response and micro-variations using computer vision.", img: pupilHeartRateImg },
  { title: "Abnormal Activity Detection in Buses", desc: "In-vehicle image sensing system that detects and classifies abnormal passenger activities using deep learning.", img: busActivityImg },
  { title: "Portfolio Website", desc: "Personal portfolio website built using HTML and CSS.", img: portfolioSiteImg },
  { title: "Calculator App", desc: "Simple calculator application developed using Python.", img: calculatorAppImg },
];

const LINKEDIN_URL = "https://www.linkedin.com/in/vilasagaram-vaishnavi-855935351/";

// Unified motion tokens — consistent timing & easing across the whole site
const EASE = [0.22, 1, 0.36, 1] as const; // smooth "easeOutExpo"-ish
const DUR = { fast: 0.45, base: 0.7, slow: 1.0 } as const;
const STAGGER = 0.1;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};


function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: STAGGER, delayChildren: 0.05 } },
      }}
    >
      {children}
    </motion.section>
  );
}

function ProjectsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.4 });
  const yA = useTransform(smooth, [0, 1], [60, -60]);
  const yB = useTransform(smooth, [0, 1], [-40, 40]);
  const yC = useTransform(smooth, [0, 1], [30, -30]);
  const offsets = [yA, yB, yC, yA];

  return (
    <Section id="projects" className="relative py-28 px-6">
      <motion.h2 variants={fadeUp} className="text-center text-4xl md:text-5xl font-bold text-slate-900">
        My <span className="text-sky-500">Projects</span>
      </motion.h2>
      <motion.div variants={fadeUp} className="mx-auto mt-3 mb-12 h-1 w-20 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 drift drift-x" />
      <div ref={ref} className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            style={{ y: offsets[i % offsets.length] }}
            whileHover={{ scale: 1.025 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="group relative rounded-2xl bg-white shadow-md ring-1 ring-slate-100 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/0 to-cyan-400/0 group-hover:from-sky-400/10 group-hover:to-cyan-400/10 transition" />
            <img
              src={p.img}
              alt={p.title}
              loading="lazy"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 drift drift-delay-1">{p.title}</h3>
              <p className="mt-3 text-slate-600 leading-relaxed drift-slow drift-delay-2">{p.desc}</p>
              <motion.div
                className="mt-5 h-1 w-12 rounded-full bg-gradient-to-r from-sky-400 to-blue-500"
                whileHover={{ width: 80 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function AboutSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 85, damping: 22, mass: 0.35 });
  const textY = useTransform(smooth, [0, 1], [32, -32]);
  const cardsY = useTransform(smooth, [0, 1], [-22, 22]);

  return (
    <Section id="about" className="relative py-28 px-6">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div className="text-center">
          <motion.span
            variants={fadeUp}
            className="inline-block rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600"
          >
            Profile
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
            About <span className="text-sky-500">Me</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-sky-400 to-blue-500" />
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-5">
          <motion.div
            variants={fadeUp}
            style={{ y: textY }}
            className="md:col-span-3 rounded-2xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              Aspiring Python Developer
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-600 drift-slow">
              I'm <span className="font-semibold text-slate-800">Vaishnavi Vilasagaram</span>, a
              Computer Science undergraduate focused on building reliable, well-engineered
              software. My work spans Python development, modern web technologies, and clean,
              user-centered interfaces.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 drift-slow drift-delay-2">
              I value clarity, maintainability, and continuous learning — collaborating
              effectively, writing readable code, and shipping solutions that solve real
              problems.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} style={{ y: cardsY }} className="md:col-span-2 grid grid-cols-2 gap-4">
            {[
              { label: "Role", value: "Python Developer" },
              { label: "Focus", value: "Web Development" },
              { label: "Education", value: "CSE" },
              { label: "Location", value: "India" },
              { label: "Languages", value: "Python, JS" },
              { label: "Status", value: "Open to Work" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-300 hover:shadow-md"
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-sky-500">
                  {item.label}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-800">{item.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function AnimatedBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      <motion.div
        className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-sky-300/40 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-cyan-200/40 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Index() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [active, setActive] = useState("home");

  // Smooth in-page anchor scroll
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-slate-800 overflow-hidden">
      <AnimatedBlobs />

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 z-[1100]"
      />

      {/* Nav */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: DUR.base, ease: EASE }}
        className="fixed top-0 inset-x-0 z-[1000] backdrop-blur-md bg-white/70 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
      >
        <ul className="flex flex-wrap justify-center gap-2 sm:gap-6 py-4 px-4">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`relative px-3 py-1.5 text-sm sm:text-base font-semibold transition-colors ${
                  active === n.id ? "text-sky-500" : "text-slate-900 hover:text-sky-500"
                }`}
              >
                {n.label}
                {active === n.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-2 right-2 -bottom-0.5 h-0.5 bg-sky-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Home */}
      <section id="home" className="min-h-screen flex items-center pt-24 px-6">
        <div className="mx-auto max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: DUR.slow, ease: EASE }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold leading-tight text-slate-900"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: DUR.base, ease: EASE }}
            >
              Hi, I'm{" "}
              <motion.span
                className="bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Vaishnavi
              </motion.span>
            </motion.h1>

            <motion.h2
              className="mt-4 text-2xl md:text-3xl font-semibold text-sky-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: DUR.fast, ease: EASE }}
            >
              <Typewriter text="Python Developer" />
            </motion.h2>

            <motion.p
              className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-slate-600"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: DUR.base, ease: EASE }}
            >
              Passionate about Python programming, web development,
              problem solving and creating innovative solutions.
            </motion.p>

            <motion.div
              className="mt-6 flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: DUR.fast, ease: EASE }}
            >
              {[
                { href: "https://instagram.com", src: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png", label: "Instagram", target: "_blank" },
                { href: "https://github.com/Vaishnavi-14805", src: "https://cdn-icons-png.flaticon.com/512/733/733553.png", label: "GitHub", target: "_blank" },
                { href: "mailto:vilasagaramvaishnavimail@gmail.com", src: "https://cdn-icons-png.flaticon.com/512/732/732200.png", label: "Email", target: "_blank" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.target}
                  rel={s.target === "_blank" ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.18, rotate: -6, y: -4 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="rounded-full p-2 bg-white shadow-md ring-1 ring-slate-200"
                  aria-label={s.label}
                >
                  <img src={s.src} alt={s.label} className="w-7 h-7" />
                </motion.a>
              ))}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="rounded-full p-2 bg-white shadow-md ring-1 ring-slate-200 transition hover:-translate-y-1 hover:scale-110"
                aria-label="LinkedIn"
              >
                <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn" className="w-7 h-7" />
              </a>
            </motion.div>

            <motion.a
              href="/resume.pdf"
              download
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: DUR.base, ease: EASE }}
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 30px rgba(56,189,248,0.45)" }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-block rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-7 py-3 text-white font-semibold shadow-lg"
            >
              Download Resume
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DUR.slow, ease: EASE }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400 to-cyan-300 blur-2xl opacity-60"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <img
                src={vaishnaviProfile.url}
                alt="Vaishnavi"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://api.dicebear.com/7.x/initials/svg?seed=Vaishnavi&backgroundColor=38bdf8";
                }}
                className="relative w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full object-cover border-[6px] border-sky-400 shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <AboutSection />

      {/* Skills */}
      <Section id="skills" className="relative py-28 px-6 bg-slate-50">
        <motion.h2 variants={fadeUp} className="text-center text-4xl md:text-5xl font-bold text-slate-900">
          My <span className="text-sky-500">Skills</span>
        </motion.h2>
        <motion.div variants={fadeUp} className="mx-auto mt-3 mb-12 h-1 w-20 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 drift drift-x" />
        <div className="mx-auto max-w-3xl space-y-6">
          {SKILLS.map((s, i) => (
            <motion.div key={s.name} variants={fadeUp}>
              <div className={`flex justify-between mb-2 font-semibold text-slate-700 drift-slow drift-delay-${(i % 3) + 1}`}>
                <span>{s.name}</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * STAGGER, duration: DUR.fast, ease: EASE }}
                  className="text-sky-500"
                >
                  {s.level}%
                </motion.span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: DUR.slow, delay: i * STAGGER, ease: EASE }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <ProjectsSection />

      {/* Internships */}
      <Section id="internships" className="relative py-28 px-6 bg-slate-50">
        <motion.h2 variants={fadeUp} className="text-center text-4xl md:text-5xl font-bold text-slate-900">
          <span className="text-sky-500">Internships</span>
        </motion.h2>
        <motion.div variants={fadeUp} className="mx-auto mt-3 mb-12 h-1 w-20 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 drift drift-x" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-100"
          >
            <h3 className="text-xl font-bold text-slate-900 drift drift-delay-1">Python Development Internship</h3>
            <p className="mt-3 text-slate-600 leading-relaxed drift-slow drift-delay-2">
              Worked on Python programming concepts, project development, and problem-solving techniques.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-100"
          >
            <h3 className="text-xl font-bold text-slate-900 drift drift-delay-2">Web Development Internship</h3>
            <p className="mt-3 text-slate-600 leading-relaxed drift-slow drift-delay-3">
              Built responsive web interfaces using HTML, CSS, and JavaScript. Gained hands-on experience in modern frontend workflows and responsive design.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-100"
          >
            <h3 className="text-xl font-bold text-slate-900 drift drift-delay-3">Python Developer Intern — Embrizon Technologies</h3>
            <p className="mt-3 text-slate-600 leading-relaxed drift-slow drift-delay-1">
              Developed Python-based applications and automation scripts. Collaborated on real-world projects involving data processing and software solutions.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" className="relative py-28 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-slate-900">
            Contact <span className="text-sky-500">Me</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="mx-auto mt-3 mb-8 h-1 w-20 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 drift drift-x" />
          <motion.p variants={fadeUp} className="text-lg text-slate-600">
            Email:{" "}
            <a className="text-sky-500 hover:underline" href="mailto:vilasagaramvaishnavimail@gmail.com">
              vilasagaramvaishnavimail@gmail.com
            </a>
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          className="mx-auto mt-10 max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-md"
        >
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none ring-sky-300 transition focus:border-sky-400 focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none ring-sky-300 transition focus:border-sky-400 focus:ring-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-slate-700">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="What's this about?"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none ring-sky-300 transition focus:border-sky-400 focus:ring-2"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Write your message here..."
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none ring-sky-300 transition focus:border-sky-400 focus:ring-2 resize-none"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="w-full rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-7 py-3 text-white font-semibold shadow-lg transition hover:shadow-xl"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 flex justify-center gap-4 flex-wrap">
          <motion.a
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            href="https://github.com/Vaishnavi-14805"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-7 py-3 text-white font-semibold shadow-lg"
          >
            GitHub
          </motion.a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-7 py-3 text-white font-semibold shadow-lg transition hover:-translate-y-1 hover:scale-105"
          >
            LinkedIn
          </a>
        </motion.div>
      </Section>

      <footer className="bg-slate-100 py-6 text-center text-slate-700">
        <p>© 2026 Vaishnavi Vilasagaram | All Rights Reserved</p>
      </footer>
    </div>
  );
}

function Typewriter({ text }: { text: string }) {
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  const ref = useRef(0);
  useEffect(() => {
    const t = setTimeout(() => {
      if (!del) {
        if (i < text.length) setI(i + 1);
        else {
          ref.current = window.setTimeout(() => setDel(true), 1500);
        }
      } else {
        if (i > 0) setI(i - 1);
        else setDel(false);
      }
    }, del ? 60 : 110);
    return () => {
      clearTimeout(t);
      clearTimeout(ref.current);
    };
  }, [i, del, text]);
  return (
    <span>
      {text.slice(0, i)}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity }}
        className="ml-0.5 inline-block w-[2px] h-7 align-middle bg-sky-500"
      />
    </span>
  );
}
