import { useEffect, useId, useState } from 'react'
import {
  ArrowDown,
  Briefcase,
  ChevronRight,
  Code2,
  GraduationCap,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react'
import './App.css'

const NAV_LINKS = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'carriere', label: 'Carrière' },
  { id: 'profil', label: 'Profil' },
  { id: 'competences', label: 'Compétences' },
  { id: 'contact', label: 'Contact' },
]

const SKILLS = [
  'HTML / CSS',
  'JavaScript',
  'React',
  'Vite',
  'Git',
  'UI responsive',
]

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('extra-time-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* ignore */
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? 'Passer au thème clair' : 'Passer au thème sombre'}
      title={isDark ? 'Thème clair' : 'Thème sombre'}
    >
      {isDark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  )
}

function SiteHeader({ theme, onToggleTheme, menuOpen, onToggleMenu, onNavigate }) {
  const menuId = useId()

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a
          href="#accueil"
          className="brand"
          onClick={(e) => {
            e.preventDefault()
            onNavigate('accueil')
          }}
        >
          <span className="brand__mark">EXTRA TIME</span>
          <span className="brand__sig">Eric Sekongo</span>
        </a>

        <nav className="nav-desktop" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault()
                onNavigate(link.id)
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={onToggleMenu}
          >
            {menuOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className={`nav-mobile ${menuOpen ? 'is-open' : ''}`}
        hidden={!menuOpen}
      >
        <nav aria-label="Navigation mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="nav-mobile__link"
              onClick={(e) => {
                e.preventDefault()
                onNavigate(link.id)
              }}
            >
              {link.label}
              <ChevronRight size={16} aria-hidden />
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function StadiumScene() {
  return (
    <div className="stadium" aria-hidden="true">
      <div className="stadium__sky" />
      <div className="stadium__glow stadium__glow--violet" />
      <div className="stadium__glow stadium__glow--pitch" />
      <div className="stadium__tunnel">
        <div className="stadium__wall stadium__wall--left" />
        <div className="stadium__wall stadium__wall--right" />
        <div className="stadium__ceiling" />
        <div className="stadium__floor" />
        <div className="stadium__mouth">
          <div className="stadium__pitch">
            <span className="stadium__line stadium__line--mid" />
            <span className="stadium__line stadium__line--h1" />
            <span className="stadium__line stadium__line--h2" />
            <span className="stadium__circle" />
          </div>
        </div>
        <div className="stadium__light stadium__light--l" />
        <div className="stadium__light stadium__light--r" />
        <div className="stadium__haze" />
      </div>
      <div className="stadium__vignette" />
    </div>
  )
}

function HeroSection({ onNavigate }) {
  return (
    <section id="accueil" className="hero" aria-labelledby="hero-title">
      <StadiumScene />

      <div className="hero__content">
        <p className="hero__eyebrow">Mode carrière · Portfolio</p>
        <h1 id="hero-title" className="hero__brand">
          EXTRA TIME
        </h1>
        <p className="hero__tagline">Chaque projet est un nouveau match.</p>

        <div className="hero__identity">
          <h2 className="hero__name">Eric Sekongo</h2>
          <p className="hero__role">
            Développeur web junior — BTS Informatique Développeur d’Applications
          </p>
          <p className="hero__note">
            Stage réalisé chez <strong>Ludotech Robotics</strong>
          </p>
        </div>

        <div className="hero__progress" aria-label="Indicateur de parcours">
          <div className="hero__progress-meta">
            <span className="mono-label">Saison 01</span>
            <span className="mono-label">Niveau — Junior</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={28}
            aria-label="Progression de parcours junior"
          >
            <div className="progress-track__fill" style={{ width: '28%' }} />
          </div>
          <p className="hero__progress-caption">
            Construction du portfolio · parcours en cours
          </p>
        </div>

        <div className="hero__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => onNavigate('carriere')}
          >
            Entrer en carrière
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => onNavigate('projets')}
          >
            Voir mes projets
          </button>
        </div>
      </div>

      <a
        href="#carriere"
        className="scroll-hint"
        onClick={(e) => {
          e.preventDefault()
          onNavigate('carriere')
        }}
      >
        <span>Explorer</span>
        <ArrowDown size={16} aria-hidden />
      </a>
    </section>
  )
}

function SectionHeading({ eyebrow, title, lead }) {
  return (
    <header className="section-heading">
      {eyebrow ? <p className="mono-label">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </header>
  )
}

function CareerSection() {
  return (
    <section id="carriere" className="section" aria-labelledby="carriere-title">
      <SectionHeading
        eyebrow="Carrière"
        title="Le parcours"
        lead="Une trajectoire honnête : formation, stage, et construction du portfolio."
      />
      <ol className="timeline">
        <li className="timeline__item">
          <span className="timeline__badge mono-label">En cours</span>
          <h3 id="carriere-title">BTS Informatique — Développeur d’Applications</h3>
          <p>
            Formation axée sur le développement web et applicatif, avec une
            montée en compétences progressive sur le front-end moderne.
          </p>
        </li>
        <li className="timeline__item">
          <span className="timeline__badge mono-label">Stage</span>
          <h3>Ludotech Robotics</h3>
          <p>
            Immersion en entreprise autour de projets concrets, collaboration
            d’équipe et pratiques de développement.
          </p>
        </li>
        <li className="timeline__item">
          <span className="timeline__badge mono-label">Portfolio</span>
          <h3>EXTRA TIME</h3>
          <p>
            Expérience d’accueil et vitrine personnelle — cette interface est
            la première phase du mode carrière.
          </p>
        </li>
      </ol>
    </section>
  )
}

function ProfileSection() {
  return (
    <section id="profil" className="section" aria-labelledby="profil-title">
      <SectionHeading
        eyebrow="Profil"
        title="Eric Sekongo"
        lead="Développeur web junior, curieux des interfaces immersives et des produits utiles."
      />
      <div className="profile-grid">
        <article className="info-block">
          <GraduationCap className="info-block__icon" size={22} aria-hidden />
          <h3 id="profil-title">Formation</h3>
          <p>BTS Informatique Développeur d’Applications</p>
        </article>
        <article className="info-block">
          <Briefcase className="info-block__icon" size={22} aria-hidden />
          <h3>Expérience</h3>
          <p>Stage chez Ludotech Robotics</p>
        </article>
        <article className="info-block">
          <Code2 className="info-block__icon" size={22} aria-hidden />
          <h3>Focus</h3>
          <p>Interfaces web, React, attention au détail et à l’accessibilité</p>
        </article>
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section id="competences" className="section" aria-labelledby="skills-title">
      <SectionHeading
        eyebrow="Compétences"
        title="Kit technique"
        lead="Un socle en construction, orienté web et interfaces."
      />
      <h3 id="skills-title" className="visually-hidden">
        Liste des compétences
      </h3>
      <ul className="skill-list">
        {SKILLS.map((skill) => (
          <li key={skill} className="skill-chip">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projets" className="section" aria-labelledby="projets-title">
      <SectionHeading
        eyebrow="Projets"
        title="Sur le terrain"
        lead="Les matchs à venir — contenus détaillés dans les prochaines phases."
      />
      <div className="project-board">
        <article className="project-slot">
          <p className="mono-label">Projet</p>
          <h3 id="projets-title">EXTRA TIME</h3>
          <p>
            Portfolio immersif inspiré d’un mode carrière. Phase 1 : expérience
            d’accueil.
          </p>
          <p className="project-slot__status mono-label">En cours</p>
        </article>
        <article className="project-slot project-slot--muted">
          <p className="mono-label">Projet</p>
          <h3>PHARMADI</h3>
          <p>
            Projet mentionné dans le parcours — non présenté ici comme un
            service en ligne.
          </p>
          <p className="project-slot__status mono-label">Hors ligne / à documenter</p>
        </article>
      </div>
      <p className="section-footnote">
        CV et fiches projets détaillées seront ajoutés sans bloquer la navigation
        actuelle.
      </p>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="section section--last" aria-labelledby="contact-title">
      <SectionHeading
        eyebrow="Contact"
        title="Prochaine mi-temps"
        lead="Pour échanger sur un projet, un stage ou une opportunité."
      />
      <div className="contact-panel">
        <h3 id="contact-title" className="visually-hidden">
          Coordonnées
        </h3>
        <p>
          Le formulaire d’envoi n’est pas branché pour l’instant (pas de backend).
          Utilisez un canal direct lorsque les coordonnées seront publiées.
        </p>
        <p className="contact-panel__hint mono-label">
          Coordonnées à compléter · aucune fausse adresse affichée
        </p>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="brand__mark brand__mark--sm">EXTRA TIME</p>
      <p>Eric Sekongo · Développeur web junior</p>
    </footer>
  )
}

function App() {
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined' ? getInitialTheme() : 'dark',
  )
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('extra-time-theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const navigateTo = (id) => {
    setMenuOpen(false)
    scrollToId(id)
  }

  return (
    <div className="app-shell">
      <SiteHeader
        theme={theme}
        onToggleTheme={toggleTheme}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onNavigate={navigateTo}
      />

      <main>
        <HeroSection onNavigate={navigateTo} />
        <CareerSection />
        <ProfileSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  )
}

export default App
