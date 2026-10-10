import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react'
import { profile } from './data'

const Scene = lazy(() => import('./Scene'))

class SceneBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <div className="hero-fallback"><div className="fallback-orbit" /><div className="fallback-core" /></div> : this.props.children }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

function useWebGL() {
  const [supported, setSupported] = useState(false)
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      setSupported(Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')))
    } catch { setSupported(false) }
  }, [])
  return supported
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function MagneticLink({ href, children, className = '' }: { href: string, children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()
  return <a ref={ref} className={className} href={href}
    onPointerMove={event => {
      if (reduced || event.pointerType !== 'mouse') return
      const el = ref.current
      if (!el) return
      const box = el.getBoundingClientRect()
      el.style.transform = `translate(${(event.clientX - box.left - box.width / 2) * .09}px, ${(event.clientY - box.top - box.height / 2) * .09}px)`
    }}
    onPointerLeave={() => { if (ref.current) ref.current.style.transform = '' }}>
    {children}
  </a>
}

function Hero() {
  const reduced = useReducedMotion()
  const webgl = useWebGL()
  const [inView, setInView] = useState(true)
  const heroRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 })
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])
  return <section className="hero" id="top" ref={heroRef}>
    <div className="hero-art" aria-hidden="true">
      {webgl && !reduced && inView ? <SceneBoundary><Suspense fallback={<div className="hero-fallback" />}><Scene /></Suspense></SceneBoundary> : <div className="hero-fallback"><div className="fallback-orbit" /><div className="fallback-core" /></div>}
    </div>
    <div className="hero-notes" aria-hidden="true">
      <div className="hero-note note-one"><span>FIELD NOTE / 01</span><strong>language<br />& logic</strong><i>↗</i></div>
      <div className="hero-note note-two"><span>IN THE WORKSHOP</span><strong>models<br />in motion.</strong><i>✳</i></div>
      <div className="hero-note note-three"><span>MEYANK / 2026</span><strong>curiosity<br />is the method</strong></div>
    </div>
    <div className="hero-vignette" />
    <div className="hero-content shell">
      <div className="hero-eyebrow"><span className="status-dot" /> OPEN TO IDEAS & COLLABORATION <span className="eyebrow-rule" /> 01 / INTRO</div>
      <h1>Ideas, made<br /><em>intelligent.</em></h1>
      <p className="hero-lead">{profile.summary}</p>
      <div className="hero-cta">
        <MagneticLink className="button button-primary" href="#work">Explore my work <Arrow /></MagneticLink>
        <MagneticLink className="button button-ghost" href="/Meyank_Resume_Public.pdf">Download resume <span aria-hidden="true">↓</span></MagneticLink>
      </div>
      <div className="hero-bottom"><span>MEYANK / {profile.role.toUpperCase()}</span><span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span></div>
    </div>
  </section>
}

function SectionLabel({ number, title }: { number: string, title: string }) {
  return <div className="section-label"><span>{number}</span><span>{title}</span><span className="section-line" /></div>
}

function ProjectCard({ project }: { project: typeof profile.projects[number] }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  return <article className={`project-card tone-${project.tone}`} ref={ref}
    onPointerMove={event => {
      if (reduced || event.pointerType !== 'mouse' || !ref.current) return
      const box = ref.current.getBoundingClientRect()
      ref.current.style.setProperty('--px', `${((event.clientX - box.left) / box.width - .5) * 10}px`)
      ref.current.style.setProperty('--py', `${((event.clientY - box.top) / box.height - .5) * 10}px`)
    }}
    onPointerLeave={() => { ref.current?.style.setProperty('--px', '0px'); ref.current?.style.setProperty('--py', '0px') }}>
    <div className="project-visual" aria-hidden="true"><div className="project-orbit orbit-a" /><div className="project-orbit orbit-b" /><div className="project-symbol">{project.index}</div><span className="visual-caption">{project.label}</span></div>
    <div className="project-body"><div className="project-meta"><span>{project.index} / {project.label}</span><span>{project.status}</span></div>
      <h3>{project.title}</h3><p>{project.description}</p>
      <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      {project.url ? <a className="project-link" href={project.url} target="_blank" rel="noopener noreferrer">{project.linkLabel} <Arrow diagonal /></a> : <span className="project-note">Details available on request</span>}
    </div>
  </article>
}

function SkillField() {
  const fieldRef = useRef<HTMLDivElement>(null)
  const active = useRef<{ el: HTMLElement, lastX: number, lastY: number, vx: number, vy: number, frame: number | null } | null>(null)
  const reduced = useReducedMotion()
  const tokens = profile.skills.flatMap(group => group.items.map(item => ({ item, group: group.group })))
  const [selected, setSelected] = useState<{ item: string, group: string } | null>(null)
  function onDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (reduced || event.pointerType === 'touch') return
    const el = event.currentTarget
    const previous = active.current
    if (previous?.frame) cancelAnimationFrame(previous.frame)
    const box = el.getBoundingClientRect()
    const parent = fieldRef.current?.getBoundingClientRect()
    if (!parent) return
    el.style.left = `${box.left - parent.left}px`
    el.style.top = `${box.top - parent.top}px`
    el.style.position = 'absolute'
    el.style.zIndex = '5'
    el.setPointerCapture(event.pointerId)
    active.current = { el, lastX: event.clientX, lastY: event.clientY, vx: 0, vy: 0, frame: null }
  }
  function onMove(event: React.PointerEvent<HTMLButtonElement>) {
    const a = active.current
    if (!a || a.el !== event.currentTarget) return
    const dx = event.clientX - a.lastX, dy = event.clientY - a.lastY
    a.vx = dx; a.vy = dy
    a.lastX = event.clientX; a.lastY = event.clientY
    a.el.style.left = `${a.el.offsetLeft + dx}px`
    a.el.style.top = `${a.el.offsetTop + dy}px`
  }
  function onUp(event: React.PointerEvent<HTMLButtonElement>) {
    const a = active.current
    if (!a || a.el !== event.currentTarget || !fieldRef.current) return
    const field = fieldRef.current
    const animate = () => {
      a.vx *= .88; a.vy *= .88
      let x = a.el.offsetLeft + a.vx, y = a.el.offsetTop + a.vy
      const maxX = field.clientWidth - a.el.offsetWidth, maxY = field.clientHeight - a.el.offsetHeight
      if (x < 0 || x > maxX) { a.vx *= -.55; x = Math.max(0, Math.min(maxX, x)) }
      if (y < 0 || y > maxY) { a.vy *= -.55; y = Math.max(0, Math.min(maxY, y)) }
      a.el.style.left = `${x}px`; a.el.style.top = `${y}px`
      if (Math.abs(a.vx) + Math.abs(a.vy) > .25) a.frame = requestAnimationFrame(animate)
      else a.frame = null
    }
    a.frame = requestAnimationFrame(animate)
    active.current = null
  }
  return <><div className="skill-field" ref={fieldRef} aria-label="Technical skills">
    <div className="field-guide" aria-hidden="true"><span>DRAG TO EXPLORE</span><span>SKILLS / 2026</span></div>
    <div className="skill-cloud">{tokens.map(({ item, group }, index) => <button key={item} className={`skill-token skill-token-${index % 4}`} type="button" title={`${item} · ${group}`} aria-label={`${item}, ${group}`} onClick={() => setSelected({ item, group })} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>{item}</button>)}</div>
  </div><div className="skill-detail" aria-live="polite"><span>SELECT A SKILL / DRAG TO THROW</span><strong>{selected ? selected.item : 'Explore the toolkit'}</strong><span>{selected ? selected.group : 'Click or tap a token to see its category.'}</span></div></>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const elements = document.querySelectorAll<HTMLElement>('.section-heading, .about-grid, .timeline-item, .contact-inner')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: .12 })
    elements.forEach(element => { element.classList.add('will-reveal'); observer.observe(element) })
    return () => observer.disconnect()
  }, [])
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><nav className="shell nav" aria-label="Main navigation">
      <a className="brand" href="#top" aria-label="Meyank, back to top"><span className="brand-mark">M<span>.</span></span><span className="brand-label">MEYANK<br /><small>AI / DATA SCIENCE</small></span></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '+'}</span></button>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="nav-links"><a onClick={() => setMenuOpen(false)} href="#about">About</a><a onClick={() => setMenuOpen(false)} href="#work">Work</a><a onClick={() => setMenuOpen(false)} href="#skills">Skills</a><a onClick={() => setMenuOpen(false)} href="#journey">Journey</a><a className="nav-contact" onClick={() => setMenuOpen(false)} href="#contact">Let's connect <Arrow diagonal /></a></div>
    </nav></header>
    <main id="main">
      <Hero />
      <section className="about-section section-pad" id="about"><div className="shell"><SectionLabel number="02" title="ABOUT / THE HUMAN BEHIND THE SYSTEM" /><div className="about-grid"><div><p className="overline">A CURIOUS MIND, IN MOTION</p><h2>Learning the systems.<br /><span>Building what matters.</span></h2><div className="about-stamp" aria-hidden="true"><span>USAR</span><strong>AI / DATA</strong><small>2025 — 2029</small></div></div><div className="about-copy"><p>{profile.about}</p><p>My current interests span multilingual data, LLM fine-tuning, efficient inference, and tools that make complex workflows easier to use.</p><a className="text-link" href="mailto:meyank27@gmail.com">Start a conversation <Arrow diagonal /></a></div></div></div></section>
      <section className="work-section section-pad" id="work"><div className="shell"><SectionLabel number="03" title="SELECTED WORK / REAL PROBLEMS, REAL BUILDS" /><div className="section-heading"><div><p className="overline">PROJECTS / 01 — 04</p><h2>Things I've<br /><em>put into motion.</em></h2></div><p>From model infrastructure to multilingual data and practical tools, these projects reflect how I learn by building.</p></div><div className="project-grid">{profile.projects.map(project => <ProjectCard key={project.title} project={project} />)}</div></div></section>
      <section className="skills-section section-pad" id="skills"><div className="shell"><SectionLabel number="04" title="TOOLKIT / IDEAS NEED INSTRUMENTS" /><div className="section-heading"><div><p className="overline">WORKING KNOWLEDGE</p><h2>A toolkit for<br /><em>exploration.</em></h2></div><p>Languages, libraries, and methods I use across data, AI, and software projects. Drag the tokens on desktop to give them a little momentum.</p></div><SkillField /><div className="skill-groups">{profile.skills.map(group => <div key={group.group}><h3>{group.group}</h3><p>{group.items.join(' · ')}</p></div>)}</div></div></section>
      <section className="journey-section section-pad" id="journey"><div className="shell"><SectionLabel number="05" title="JOURNEY / STILL IN THE MAKING" /><div className="journey-grid"><div><p className="overline">A GROWING PATH</p><h2>Learning out loud.<br /><em>Building together.</em></h2></div><div className="timeline">{profile.timeline.map(item => <article key={item.title} className="timeline-item"><span className="timeline-date">{item.date}</span><div><h3>{item.title}</h3><strong>{item.place}</strong><p>{item.description}</p></div></article>)}</div></div></div></section>
      <section className="contact-section section-pad" id="contact"><div className="shell"><SectionLabel number="06" title="CONTACT / THE NEXT CONVERSATION" /><div className="contact-inner"><p className="overline">HAVE AN IDEA?</p><h2>Let's make<br /><em>something useful.</em></h2><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <Arrow diagonal /></a><div className="socials"><a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub <Arrow diagonal /></a><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal /></a><a href={profile.links.huggingFace} target="_blank" rel="noopener noreferrer">Hugging Face <Arrow diagonal /></a></div></div></div></section>
    </main>
    <footer><div className="shell footer-inner"><span>© {new Date().getFullYear()} MEYANK</span><span>BUILT WITH CURIOSITY</span><a href="#top">BACK TO TOP ↑</a></div></footer>
  </>
}

export default App
