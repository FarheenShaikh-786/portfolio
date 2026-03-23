import { useEffect, useState, type FormEvent } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from 'framer-motion'
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  FileCode2,
  Brain,
  Award,
  Cpu,
  TerminalSquare,
} from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import { StarsField } from './components/StarsField'
import { ProfilePhoto } from './components/ProfilePhoto'
import { RippleButton } from './components/RippleButton'

const sections = [
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'achievements',
  'contact',
] as const

type SectionId = (typeof sections)[number]

const scrollToSection = (id: SectionId) => {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function useCursorGlow() {
  useEffect(() => {
    const glow = document.querySelector<HTMLDivElement>('.cursor-glow')
    if (!glow) return

    let rafId = 0
    let currentX = window.innerWidth / 2
    let currentY = window.innerHeight / 2
    let targetX = currentX
    let targetY = currentY

    const animate = () => {
      currentX += (targetX - currentX) * 0.14
      currentY += (targetY - currentY) * 0.14
      glow.style.opacity = '1'
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      rafId = window.requestAnimationFrame(animate)
    }

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }
    const handleLeave = () => {
      glow.style.opacity = '0'
    }

    rafId = window.requestAnimationFrame(animate)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)
    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])
}

function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-bg-deep"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,245,255,0.12),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(122,92,255,0.15),transparent_50%)]" />
      <div className="relative flex flex-col items-center gap-8">
        <motion.div
          className="relative h-28 w-28"
          initial={{ rotate: -12, opacity: 0, scale: 0.75 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 16 }}
        >
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary via-secondary to-accent opacity-80 blur-2xl"
            animate={{ opacity: [0.35, 0.9, 0.35], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative flex h-full w-full items-center justify-center rounded-3xl border border-white/10 bg-[#0a0f24]/90 shadow-neon backdrop-blur-md">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="h-10 w-10 text-primary drop-shadow-[0_0_28px_rgba(0,245,255,0.9)]" />
            </motion.div>
          </div>
        </motion.div>
        <div className="space-y-2 text-center">
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.4em] text-primary/90"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            Initializing
          </motion.p>
          <motion.p
            className="max-w-xs text-sm text-slate-400"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Loading premium experience…
          </motion.p>
          <motion.div
            className="mx-auto mt-4 h-1 w-40 overflow-hidden rounded-full bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function Navbar({ activeSection }: { activeSection: SectionId }) {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[48] border-b border-primary/15 bg-bg-deep/75 backdrop-blur-2xl"
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="section-container flex h-16 items-center justify-between">
        <button
          onClick={() => scrollToSection('hero')}
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono uppercase tracking-[0.25em] text-slate-200 shadow-[0_0_20px_rgba(0,245,255,0.12)] transition hover:border-primary/50 hover:text-primary"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_rgba(0,245,255,0.95)] group-hover:scale-110" />
          Farheen Shaikh
        </button>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 shadow-[0_0_24px_rgba(122,92,255,0.15)] md:flex">
          {sections.map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`rounded-full px-3 py-1 capitalize transition ${
                activeSection === id
                  ? 'bg-gradient-to-r from-primary/30 via-secondary/40 to-accent/25 text-white shadow-[0_0_22px_rgba(0,245,255,0.45)]'
                  : 'text-slate-400 hover:bg-white/10 hover:text-primary'
              }`}
            >
              {id}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/FarheenShaikh-786"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 shadow-[0_0_16px_rgba(0,245,255,0.15)] transition hover:border-primary/50 hover:text-primary"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/farheen-nisar-shaikh-542b47282?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 shadow-[0_0_16px_rgba(0,245,255,0.15)] transition hover:border-primary/50 hover:text-primary"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.header>
  )
}

function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-24 sm:pt-32 sm:pb-28">
      <StarsField />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-mesh opacity-90" />
        <div className="pointer-events-none absolute -inset-x-24 top-32 h-[520px] rotate-3 bg-grid-slate opacity-50 [mask-image:radial-gradient(circle_at_center,_black,_transparent_72%)]" />
        <motion.div
          className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-secondary/20 blur-[100px]"
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-accent/15 blur-[90px]"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="section-container relative grid gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
        <motion.div
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-white/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.28em] text-primary shadow-[0_0_24px_rgba(0,245,255,0.25)] backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent shadow-[0_0_16px_rgba(255,78,205,0.9)]" />
            Open to internships &amp; full‑time roles
          </div>

          <div className="space-y-6">
            <h1 className="font-display text-display-xl text-slate-50">
              Hi, I&apos;m{' '}
              <span className="text-name-gradient">Farheen Shaikh</span>
            </h1>
            <TypingHeadline />
            <p className="max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Results‑oriented Computer Science student and full stack Java developer crafting
              reliable, scalable web experiences. I love building real‑time collaboration tools,
              secure systems and delightful user interfaces.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <RippleButton
              className="px-7 py-3 text-sm"
              onClick={() => scrollToSection('projects')}
            >
              View projects
              <ArrowRight className="h-4 w-4" />
            </RippleButton>
            <RippleButton
              variant="outline"
              className="px-6 py-3 text-sm"
              onClick={() => scrollToSection('contact')}
            >
              <Mail className="h-4 w-4" />
              Contact me
            </RippleButton>
          </div>

          <dl className="grid gap-3 text-xs text-slate-400 sm:grid-cols-3">
            <InfoPill label="Location" value="Nanded, Maharashtra" />
            <InfoPill label="Role" value="Full Stack Developer" />
            <InfoPill label="Focus" value="Java • React • Node.js" />
          </dl>
        </motion.div>

        <motion.div
          className="order-2 flex flex-col items-center gap-8 lg:pt-4"
          initial={{ y: 56, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          <ProfilePhoto />

          <div className="glass-panel neon-border relative w-full max-w-md overflow-hidden rounded-3xl">
            <div className="absolute inset-0 opacity-40 mix-blend-screen">
              <div className="dot-grid h-full w-full" />
            </div>
            <div className="relative flex flex-col gap-6 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary/80">
                    Profile
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold text-slate-50">
                    Full Stack Java Dev
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_24px_rgba(0,245,255,0.45)]">
                  <Cpu className="h-5 w-5" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-3">
                <Stat
                  label="Core stack"
                  value="Java • Spring • React"
                  icon={<FileCode2 className="h-4 w-4" />}
                />
                <Stat
                  label="Strengths"
                  value="Clean code, problem solving, teamwork"
                  icon={<Brain className="h-4 w-4" />}
                />
                <Stat
                  label="Focus areas"
                  value="Real‑time apps • security • UX"
                  icon={<TerminalSquare className="h-4 w-4" />}
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#050816]/80 p-4 text-xs leading-relaxed text-slate-300 shadow-inner">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-secondary">
                  Live signal
                </p>
                <p className="mt-2 text-[13px] text-slate-200">
                  &ldquo;I&apos;m driven by building experiences where performance, reliability and
                  design all feel world‑class.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TypingHeadline() {
  const roles = ['Java Developer', 'Full Stack Developer', 'Problem Solver']
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState('')

  useEffect(() => {
    const current = roles[index]
    let i = 0
    setDisplay('')
    const interval = setInterval(() => {
      setDisplay(current.slice(0, i))
      i += 1
      if (i > current.length) {
        clearInterval(interval)
        setTimeout(() => setIndex((prev) => (prev + 1) % roles.length), 1300)
      }
    }, 90)
    return () => clearInterval(interval)
  }, [index])

  return (
    <p className="font-mono text-xs uppercase tracking-[0.38em] text-primary/90 sm:text-sm">
      <span className="mr-2 text-slate-500">I specialize in</span>
      <span className="inline-flex min-w-[10rem] items-center text-secondary">
        <span className="drop-shadow-[0_0_12px_rgba(122,92,255,0.5)]">{display}</span>
        <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-accent shadow-[0_0_8px_#ff4ecd]" />
      </span>
    </p>
  )
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 shadow-[0_0_20px_rgba(0,245,255,0.06)] backdrop-blur-md transition hover:border-primary/25 hover:shadow-[0_0_28px_rgba(122,92,255,0.12)]">
      <dt className="text-[11px] uppercase tracking-[0.25em] text-slate-500">{label}</dt>
      <dd className="mt-1.5 text-xs font-medium text-slate-100">{value}</dd>
    </div>
  )
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0f24]/90 p-3 transition hover:border-primary/30 hover:shadow-[0_0_20px_rgba(0,245,255,0.12)]">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500">
          {label}
        </p>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary">
          {icon}
        </span>
      </div>
      <p className="text-[11px] leading-snug text-slate-200">{value}</p>
    </div>
  )
}

function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: SectionId
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="py-20 sm:py-24">
      <div className="section-container space-y-12">
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl space-y-4"
        >
          <p className="inline-flex rounded-full border border-primary/25 bg-white/5 px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.28em] text-primary/90 backdrop-blur-sm">
            {eyebrow}
          </p>
          <h2 className="font-display text-display-lg font-semibold tracking-tight text-slate-50">
            <span className="text-heading-gradient">{title}</span>
          </h2>
          <p className="text-base leading-relaxed text-slate-400">{description}</p>
        </motion.div>
        {children}
      </div>
    </section>
  )
}

function About() {
  const paragraphVariants = {
    hidden: { opacity: 0, x: -26 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="Blending strong fundamentals with modern full‑stack engineering"
      description="I’m a Computer Science student with a solid foundation in Java, object‑oriented design and problem solving, now building polished full‑stack experiences with React, Node.js and modern databases."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <motion.div
          className="space-y-4 text-sm text-slate-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.14,
              },
            },
          }}
        >
          <motion.p variants={paragraphVariants} transition={{ duration: 0.55, ease: 'easeOut' }}>
            I enjoy turning complex requirements into intuitive products. From low‑level Java logic
            to sleek React interfaces, I focus on clean architecture, readable code and thoughtful
            user flows.
          </motion.p>
          <motion.p variants={paragraphVariants} transition={{ duration: 0.55, ease: 'easeOut' }}>
            My recent work includes a real‑time collaborative code editor and a PDF converter
            application showcased at a technical exhibition. I also gained cybersecurity exposure
            during my internship at SecureLayer7, strengthening my mindset around secure coding.
          </motion.p>
          <motion.p variants={paragraphVariants} transition={{ duration: 0.55, ease: 'easeOut' }}>
            Beyond code, I&apos;m known for clear communication, leadership and the ability to break
            down complex concepts for others skills that make me effective in cross‑functional
            teams.
          </motion.p>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <Tilt
            glareEnable
            glareMaxOpacity={0.2}
            glareColor="#00f5ff"
            glarePosition="all"
            scale={1.01}
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            transitionSpeed={1300}
            className="rounded-2xl"
          >
            <motion.div
              className="glass-panel premium-card rounded-2xl p-4"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            >
              <p className="mb-3 text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
                Core technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Java',
                  'Spring fundamentals',
                  'React',
                  'Node.js',
                  'TypeScript',
                  'MongoDB',
                  'SQL',
                  'HTML5',
                  'CSS3',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs text-primary/90"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </Tilt>

          <Tilt
            glareEnable
            glareMaxOpacity={0.2}
            glareColor="#7a5cff"
            glarePosition="all"
            scale={1.01}
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            transitionSpeed={1300}
            className="rounded-2xl"
          >
            <motion.div
              className="glass-panel premium-card flex items-center justify-between rounded-2xl p-4"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            >
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
                  Education
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-100">
                  B.Tech in Computer Science &amp; Engineering
                </p>
                <p className="text-xs text-slate-400">MGM&apos;s College of Engineering • 2023–2026</p>
              </div>
              <Award className="h-9 w-9 text-amber-300/90" />
            </motion.div>
          </Tilt>
        </motion.div>
      </div>
    </SectionShell>
  )
}

const skillGroups = [
  {
    label: 'Programming',
    items: ['Java', 'C++', 'JavaScript'],
  },
  {
    label: 'Frontend',
    items: ['HTML5', 'CSS3', 'React'],
  },
  {
    label: 'Backend',
    items: ['Node.js'],
  },
  {
    label: 'Database',
    items: ['SQL', 'MongoDB'],
  },
] as const

function Skills() {
  return (
    <SectionShell
      id="skills"
      eyebrow="Skills"
      title="Technical toolbox for modern full‑stack development"
      description="A focused set of technologies that let me design, build and ship end‑to‑end web solutions from intuitive frontends to robust backends and data layers."
    >
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {skillGroups.map((group) => (
          <motion.div
            key={group.label}
            variants={{
              hidden: { y: 26, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group glass-panel premium-card flex flex-col rounded-2xl p-4 shadow-[0_0_0_1px_rgba(0,245,255,0.06)] transition-shadow hover:shadow-[0_0_40px_rgba(122,92,255,0.15)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
                {group.label}
              </p>
              <span className="h-6 w-6 rounded-full bg-gradient-to-tr from-primary/45 to-secondary/70 opacity-70 shadow-[0_0_18px_rgba(0,245,255,0.55)] transition group-hover:opacity-100" />
            </div>
            <div className="space-y-2">
              {group.items.map((skill) => (
                <motion.div
                  key={skill}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-xs text-slate-200"
                >
                  <span>{skill}</span>
                    <span className="h-1.5 flex-1 rounded-full bg-slate-800">
                    <span className="block h-full w-[90%] rounded-full bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_18px_rgba(0,245,255,0.45)]" />
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  )
}

const projects = [
  {
    name: 'Real‑Time Code Collaboration',
    description:
      'A real‑time web‑based code collaboration platform where multiple developers can edit code simultaneously, see changes instantly and stay in sync.',
    role: 'Full‑stack development, real‑time architecture, UX',
    tech: ['React', 'Node.js', 'WebSockets', 'Express', 'TypeScript'],
    demo: 'https://my-cool-web-dsyg.vercel.app/',
    github: 'https://github.com/FarheenShaikh-786/my-cool-web',
  },
  {
    name: 'PDF Converter Application',
    description:
      'Application that converts images and text into polished PDF documents, showcased and explained during a technical exhibition.',
    role: 'Java logic, UI design, feature explanation to evaluators',
    tech: ['Java', 'Swing / JavaFX', 'File I/O'],
    demo: '#contact',
    github: '#',
  },
] as const

function Projects() {
  return (
    <SectionShell
      id="projects"
      eyebrow="Projects"
      title="Selected work that reflects how I think and build"
      description="Each project is an experiment in combining strong fundamentals with smooth user experience—focusing on performance, clarity and maintainability."
    >
      <motion.div
        className="grid gap-8 lg:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.14 },
          },
        }}
      >
        {projects.map((proj) => (
          <motion.div
            key={proj.name}
            variants={{
              hidden: { y: 40, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <Tilt
              glareEnable
              glareMaxOpacity={0.35}
              glareColor="#00f5ff"
              glarePosition="all"
              scale={1.02}
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
              transitionSpeed={1200}
              className="h-full rounded-2xl"
            >
              <article className="group relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a0f24]/95 via-bg-deep to-[#050816] p-6 shadow-[0_0_0_1px_rgba(0,245,255,0.08)] transition duration-300 hover:border-primary/40 hover:shadow-[0_0_48px_rgba(0,245,255,0.18),0_0_80px_rgba(122,92,255,0.12)]">
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 opacity-70 blur-3xl transition group-hover:opacity-100" />
                <div className="relative z-[1] flex flex-col gap-4 transition duration-300 group-hover:opacity-25 group-hover:blur-[0.5px]">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-clash text-lg text-slate-50">{proj.name}</h3>
                    <span className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                      Featured
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400">{proj.description}</p>
                  <p className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-200">My impact:</span> {proj.role}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center gap-3 rounded-2xl bg-[#050816]/80 opacity-0 backdrop-blur-sm transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100 sm:gap-4">
                  <a
                    href={proj.demo}
                    onClick={(e) => {
                      if (proj.demo.startsWith('#')) {
                        e.preventDefault()
                        scrollToSection('contact')
                      }
                    }}
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-5 py-2.5 text-sm font-semibold text-[#050816] shadow-[0_0_28px_rgba(0,245,255,0.5)] transition hover:scale-105 active:scale-95"
                  >
                    Live demo
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={proj.github}
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-primary/50 hover:bg-primary/15 hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </div>
              </article>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  )
}

function Experience() {
  return (
    <SectionShell
      id="experience"
      eyebrow="Experience"
      title="Applying my skills in real‑world environments"
      description="Hands‑on cybersecurity and corporate exposure during my SecureLayer7 internship, combined with academic and project experience in building full‑stack systems."
    >
      <motion.div
        className="relative border-l border-primary/25 pl-6"
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-[0_0_20px_rgba(0,245,255,0.85)]" />
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-100">Internship Trainee</p>
              <p className="text-xs text-slate-400">SecureLayer7</p>
            </div>
            <p className="text-xs text-slate-400">Jul 2025 – Aug 2025</p>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
            <li>• Gained exposure to professional corporate work environment and processes.</li>
            <li>• Learned to follow structured procedures while assisting in assigned tasks.</li>
            <li>
              • Honed communication, discipline and time management through regular status updates.
            </li>
            <li>
              • Received introductory training in cybersecurity concepts and security assessment
              methodologies.
            </li>
          </ul>
        </div>
      </motion.div>
    </SectionShell>
  )
}

function Achievements() {
  const cards = [
    {
      title: 'National Level 2nd Prize',
      subtitle: 'Journalism Competition',
      detail:
        'Recognized nationally for clear communication and storytelling skills I apply when explaining complex technical work.',
      metric: '2nd',
      label: 'National prize',
    },
    {
      title: 'Technical Exhibition Award',
      subtitle: 'PDF Converter Project',
      detail:
        'Awarded for building and effectively explaining a PDF converter application during a technical exhibition.',
      metric: 'Awarded',
      label: 'Best project',
    },
    {
      title: 'Hackathon Shortlist',
      subtitle: 'College‑Level Hackathon',
      detail:
        'Shortlisted for proposing and building impactful solutions under tight deadlines with a small team.',
      metric: 'Shortlisted',
      label: 'Hackathon',
    },
  ] as const

  return (
    <SectionShell
      id="achievements"
      eyebrow="Achievements"
      title="Signals that I show up, deliver and communicate well"
      description="From national‑level recognition to technical competitions and hackathons, I consistently put myself in environments that stretch both my technical and soft skills."
    >
      <motion.div
        className="grid gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08 },
          },
        }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.title}
            variants={{
              hidden: { y: 26, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="glass-panel premium-card group relative flex flex-col justify-between rounded-2xl p-4"
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition group-hover:border-primary/40 group-hover:shadow-glow-soft" />
            <div className="relative space-y-1.5">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400">
                {card.label}
              </p>
              <h3 className="font-clash text-sm font-semibold text-slate-50">{card.title}</h3>
              <p className="text-xs text-slate-400">{card.subtitle}</p>
            </div>
            <div className="relative mt-4 flex items-end justify-between gap-2">
              <p className="text-xs text-slate-300">{card.detail}</p>
              <div className="text-right">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">
                  {card.metric}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  )
}

const web3formsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const key = web3formsAccessKey?.trim()
    if (!key) {
      setFormStatus('error')
      setFormMessage(
        'Contact form is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file.',
      )
      return
    }

    setFormStatus('loading')
    setFormMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.append('access_key', key)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = (await response.json()) as { success?: boolean; message?: string }

      if (data.success) {
        setFormStatus('success')
        setFormMessage('Thank you! Your message has been sent.')
        form.reset()
      } else {
        setFormStatus('error')
        setFormMessage(data.message ?? 'Something went wrong. Please try again or email directly.')
      }
    } catch {
      setFormStatus('error')
      setFormMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Let’s build something impactful together"
      description="Whether it’s internships, entry‑level roles or collaborations, I’d love to hear where I can add value with my blend of Java, React and problem‑solving skills."
    >
      <motion.div
        className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
        initial={{ y: 26, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <form
          className="glass-panel premium-card space-y-4 rounded-2xl p-5"
          onSubmit={onSubmit}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <input
                required
                name="name"
                className="input-neon h-10 w-full"
                placeholder="Your name"
              />
            </Field>
            <Field label="Email">
              <input
                required
                type="email"
                name="email"
                className="input-neon h-10 w-full"
                placeholder="you@company.com"
              />
            </Field>
          </div>
          <Field label="How can I help?">
            <textarea
              required
              name="message"
              rows={4}
              className="input-neon w-full resize-none py-2"
              placeholder="Share a bit about the role, project or idea..."
            />
          </Field>
          <div className="flex flex-wrap items-center gap-4">
            <RippleButton
              type="submit"
              disabled={formStatus === 'loading'}
              className="px-7 py-2.5 text-sm disabled:pointer-events-none"
            >
              {formStatus === 'loading' ? 'Sending…' : 'Send message'}
              <ArrowRight className="h-4 w-4" />
            </RippleButton>
            <AnimatePresence>
              {(formStatus === 'success' || formStatus === 'error') && formMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className={
                    formStatus === 'success' ? 'text-xs text-emerald-300' : 'text-xs text-rose-300'
                  }
                >
                  {formMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>

        <div className="space-y-5">
          <div className="glass-panel premium-card rounded-2xl p-5">
            <p className="mb-3 text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
              Direct links
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:farheen.shaikh07@gmail.com"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0a0f24]/90 px-3 py-2 text-slate-200 transition hover:border-primary/40 hover:text-primary hover:underline hover:decoration-primary hover:decoration-2 hover:underline-offset-4"
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  farheen.shaikh07@gmail.com
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com/FarheenShaikh-786"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0a0f24]/90 px-3 py-2 text-slate-200 transition hover:border-primary/40 hover:text-primary hover:underline hover:decoration-primary hover:decoration-2 hover:underline-offset-4"
              >
                <span className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  github.com/FarheenShaikh-786
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/farheen-nisar-shaikh-542b47282?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0a0f24]/90 px-3 py-2 text-slate-200 transition hover:border-primary/40 hover:text-primary hover:underline hover:decoration-primary hover:decoration-2 hover:underline-offset-4"
              >
                <span className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  linkedin.com/in/farheen-nisar-shaikh-542b47282
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs text-slate-200">
      <span className="mb-1 block text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400">
        {label}
      </span>
      {children}
    </label>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg-deep/90 py-8 backdrop-blur-md">
      <div className="section-container flex flex-col items-center justify-between gap-3 text-[11px] text-slate-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Farheen Shaikh
        </p>
        <p className="font-mono uppercase tracking-[0.25em] text-slate-500">
          Nanded • Maharashtra • India
        </p>
      </div>
    </footer>
  )
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[46] h-[3px] origin-left bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_20px_rgba(0,245,255,0.45)]"
      style={{ scaleX }}
    />
  )
}

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [activeSection, setActiveSection] = useState<SectionId>('hero')

  useCursorGlow()

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId
            if (sections.includes(id)) {
              setActiveSection(id)
            }
          }
        })
      },
      {
        threshold: 0.4,
      },
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen bg-bg-deep text-slate-50">
      <div className="cursor-glow" />
      <ScrollProgressBar />
      <Navbar activeSection={activeSection} />
      <AnimatePresence mode="wait">{showLoader && <Loader />}</AnimatePresence>
      <motion.main
        className="pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: showLoader ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </motion.main>
      <Footer />
    </div>
  )
}

