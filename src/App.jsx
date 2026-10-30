import { useEffect, useId, useState, useRef } from 'react'
import { ArrowDown, Briefcase, ChevronRight, Code2, GraduationCap, Link, Menu, Moon, Sun, X, Copy, Check, Mail } from 'lucide-react'
import './App.css'
import playerPortrait from './assets/eric-player.jpeg'

const NAV = [
  ['accueil', 'Accueil'], ['carriere', 'Carrière'], ['profil', 'Profil'],
  ['competences', 'Compétences'], ['projets', 'Projets'], ['contact', 'Contact'],
]

const SKILLS = [
  ['HTML / CSS', 'Bases web'], ['JavaScript', 'En progression'],
  ['PHP / MySQL', 'Bases backend'], ['React', 'En apprentissage'],
  ['Laravel', 'Pratique projet'], ['Git', 'En progression'],
  ['React Native', 'Pratique projet'], ['UI responsive', 'Fondamentaux'],
  ['Next.js', 'Pratique projet'], ['Supabase', 'Pratique projet'], 
  ['Filament AdminPanel', 'Pratique projet'], ['SQLite', 'Pratique projet'],
  ['Linux', 'Fondamentaux'], ['Sécurité applicative', 'Apprentissage'],
]

const PROJECTS = [
  { n: '01', name: 'PHARMADI', type: 'Application web · PHP / MySQL', status: 'À documenter', desc: 'Application de recherche et de gestion des pharmacies de garde, avec PHP, MySQL, une architecture MVC personnalisée et Leaflet.', tags: ['PHP', 'MySQL', 'MVC', 'Leaflet'], note: 'Projet en ligne', url: 'https://pharmadi.ct.ws' },
  { n: '02', name: 'MyShop', type: 'Commerce · Next.js/Supabase', status: 'En ligne (Test)', desc: 'Application conçue pour une petite activité commerciale, avec un backend Next.js et une base de données Supabase.', tags: ['Next.js', 'Supabase'], note: 'Version pour aider une amie à gérer sa boutique en ligne.', url: 'https://marie-shop-ci.vercel.app'},
  { n: '03', name: 'Ivoire Pressing Ops', type: 'Application mobile · React Native', status: 'En développement', desc: 'Projet de gestion de pressing avec interface mobile et backend Laravel. Mode hors-ligne avec synchronisation en ligne et photos.', tags: ['React Native', 'Laravel', 'SQLite'], note: 'Certaines fonctions restent à finaliser.', url: 'https://github.com/FullKageX/Pressing-App' },
  { n: '04', name: 'MonDjai', type: 'Application mobile · React Native / Filament', status: 'En développement', desc: 'Projet de gestion de tontine avec interface mobile et backend Laravel. Le périmètre est présenté selon son état réel d’avancement.', tags: ['React Native', 'Laravel', 'Filament'], note: 'Certaines fonctions restent à finaliser.', url : 'https://github.com/FullKageX/MonDjai'},
]

const CONTACT = {
  email: 'ericloba@icloud.com',
  github: 'https://github.com/FullKageX', 
  linkedin: 'https://www.linkedin.com/in/eric-sekongo-68477b3b8',
}

function initialTheme() {
  try {
    const saved = localStorage.getItem('extra-time-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function goTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="theme-toggle" type="button" onClick={onToggle} aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'} title="Changer de thème">
      {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )
}

function Header({ theme, onTheme, menuOpen, onMenu, navigate }) {
  const menuId = useId()
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#accueil" onClick={e => { e.preventDefault(); navigate('accueil') }}>
          <span className="brand__mark">EXTRA TIME</span>
          <span className="brand__sig">Eric Fulcanelli Sekongo · Portfolio</span>
        </a>
        <nav className="nav-desktop" aria-label="Navigation principale">
          {NAV.map(([id, label]) => (
            <a key={id} className="nav-link" href={`#${id}`} onClick={e => { e.preventDefault(); navigate(id) }}>{label}</a>
          ))}
        </nav>
        <div className="site-header__actions">
          <ThemeToggle theme={theme} onToggle={onTheme} />
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls={menuId} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={onMenu}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      <div id={menuId} className="nav-mobile" hidden={!menuOpen}>
        <nav aria-label="Navigation mobile">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="nav-mobile__link" onClick={e => { e.preventDefault(); navigate(id) }}>
              {label}<ChevronRight size={16} />
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Stadium() {
  return (
    <div className="stadium" aria-hidden="true">
      <div className="stadium__stars" />
      <div className="stadium__glow stadium__glow--violet" />
      <div className="stadium__glow stadium__glow--mint" />
      <div className="stadium__roof">
        <i className="stadium__lamp stadium__lamp--left" />
        <i className="stadium__lamp stadium__lamp--right" />
      </div>
      <div className="stadium__stand stadium__stand--left" />
      <div className="stadium__stand stadium__stand--right" />
      <div className="stadium__pitch-wrap">
        <div className="stadium__pitch">
          <i className="pitch-line pitch-line--halfway" />
          <i className="pitch-line pitch-line--box-left" />
          <i className="pitch-line pitch-line--box-right" />
          <i className="pitch-circle" />
          <div className="pitch-ball">
            <span className="pitch-ball__emoji">⚽</span>
            <i className="pitch-ball__shadow" />
          </div>
        </div>
      </div>
      <div className="stadium__vignette" />
      <div className="stadium__grain" />
    </div>
  )
}

function Hero({ navigate }) {
  return (
    <section id="accueil" className="hero" aria-labelledby="hero-title">
      <Stadium />
      <div className="hero__content">
        <p className="hero__eyebrow"><span className="live-dot" /> Mode carrière · Portfolio interactif</p>
        <p className="hero__season mono-label">Saison 01 / Nouvelle partie</p>
        <h1 id="hero-title" className="hero__brand">
          <span>EXTRA</span>
          <span className="hero__brand-second">TIME<span className="hero__period">.</span></span>
        </h1>
        <p className="hero__tagline">Chaque projet est un nouveau match.</p>
        <div className="hero__identity">
          <h2 className="hero__name">Eric Fulcanelli Sekongo</h2>
          <p className="hero__role">Technologies numériques · Développement · Innovation</p>
          <p className="hero__role">Du logiciel aux expériences technologiques</p>
          <p className="hero__note">Actuellement en stage chez <strong>Ludotech Robotics</strong></p>
        </div>
        <div className="hero__progress">
          <div className="hero__progress-meta">
            <span className="mono-label">Parcours en construction</span>
            <span className="mono-label">Niveau junior</span>
          </div>
          <div className="progress-track"><div className="progress-track__fill" /></div>
          <p className="hero__progress-caption">Formation · projets · apprentissage continu</p>
        </div>
        <div className="hero__actions">
          <button className="btn btn--primary" type="button" onClick={() => navigate('carriere')}>
            Entrer en carrière <ChevronRight size={17} />
          </button>
          <button className="btn btn--ghost" type="button" onClick={() => navigate('projets')}>
            Voir mes projets <ArrowDown size={16} />
          </button>
        </div>
      </div>
      <a href="#carriere" className="scroll-hint" onClick={e => { e.preventDefault(); navigate('carriere') }}>
        Explorer le parcours <ArrowDown size={16} />
      </a>
    </section>
  )
}

function Heading({ eyebrow, title, lead }) {
  return (
    <header className="section-heading">
      <p className="mono-label section-heading__eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-lead">{lead}</p>
    </header>
  )
}

function Career() {
  return (
    <section id="carriere" className="section" aria-labelledby="carriere-title">
      <Heading eyebrow="Mode carrière / 01" title="Le parcours" lead="Une progression construite étape par étape : formation, immersion professionnelle et projets concrets." />
      <ol className="timeline">
        <li className="timeline__item">
          <span className="timeline__badge mono-label">Diplôme obtenu</span>
          <h3 id="carriere-title">BTS Informatique — Développeur d’Applications</h3>
          <p>Un socle en conception et développement d’applications, avec une progression continue.</p>
        </li>
        <li className="timeline__item">
          <span className="timeline__badge mono-label">Terminé</span>
          <h3>Mandigo SARL</h3>
          <p>Stage de validation de diplôme, acquisition de compétences et première expérience en environnement professionnel.</p>
        </li>
        <li className="timeline__item">
          <span className="timeline__badge mono-label">En cours</span>
          <h3>Ludotech Robotics</h3>
          <p>Stage en environnement professionnel, découverte de projets concrets et collaboration autour de solutions numériques et éducatives.</p>
        </li>
        <li className="timeline__item">
          <span className="timeline__badge mono-label">Objectif suivant</span>
          <h3>Développer, tester, améliorer</h3>
          <p>Renforcer mes bases, apprendre les bonnes pratiques d’équipe et livrer des applications utiles, maintenables et accessibles.</p>
        </li>
      </ol>

      <div className="career-roadmap">
        <div className="career-roadmap__heading">
          <p className="mono-label">La suite du match / Feuille de route</p>
          <h3>Mes prochains objectifs.</h3>
          <p>Une trajectoire réaliste, construite autour de la pratique, de l'expérience et de l'apprentissage continu.</p>
        </div>
        <div className="career-roadmap__grid">
          <article className="roadmap-card roadmap-card--current">
            <span className="roadmap-card__period mono-label">Court terme · Maintenant</span>
            <h4>Consolider le terrain</h4>
            <ul><li>Renforcer mes bases en développement web et mobile.</li><li>Pratiquer Git, les tests et le travail en équipe.</li><li>Contribuer sérieusement aux missions de stage et documenter mes projets.</li></ul>
            <span className="roadmap-card__status">EN CONSTRUCTION</span>
          </article>
          <article className="roadmap-card">
            <span className="roadmap-card__period mono-label">Moyen terme · Prochaine étape</span>
            <h4>Élargir mes compétences</h4>
            <ul><li>Approfondir Laravel, les API et l'architecture d'applications.</li><li>Progresser en Linux, réseaux et sécurité applicative.</li><li>Développer des projets plus structurés, maintenables et collaboratifs.</li></ul>
            <span className="roadmap-card__status">À DÉVELOPPER</span>
          </article>
          <article className="roadmap-card">
            <span className="roadmap-card__period mono-label">Long terme · Vision</span>
            <h4>Relier les disciplines</h4>
            <ul><li>Évoluer vers des pratiques de cybersécurité et DevSecOps.</li><li>Approfondir l'IA et les technologies connectées à la robotique.</li><li>Concevoir des solutions numériques complètes, utiles et sécurisées.</li></ul>
            <span className="roadmap-card__status">VISION À LONG TERME</span>
          </article>
        </div>
        <p className="career-roadmap__note">Cette feuille de route présente mes objectifs, pas des compétences déjà acquises ni des échéances garanties.</p>
      </div>
    </section>
  )
}

function PlayerCard() {
  const [detailsOpen, setDetailsOpen] = useState(false)

  useEffect(() => {
    if (!detailsOpen) return
    const onKeyDown = event => {
      if (event.key === 'Escape') setDetailsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [detailsOpen])

  const attributes = [
    ['01', 'BUILD', 'Développement'],
    ['02', 'CREATE', 'Conception'],
    ['03', 'AUTOMATE', 'Automatisation'],
    ['04', 'ROBOTICS', 'Robotique'],
    ['05', 'AI', 'Intelligence artificielle'],
    ['06', 'ADAPT', 'Adaptabilité'],
  ]

  return (
    <>
      <div className="player-showcase">
        <div className="player-showcase__copy">
          <p className="mono-label player-showcase__eyebrow">Carte spéciale / EXTRA TIME</p>
          <h3>Un profil, plusieurs terrains de jeu.</h3>
          <p>Le numérique ne se limite pas au développement web. Je m’intéresse à la création de solutions, aux applications mobiles, à l’IA, à la robotique et aux technologies qui répondent à des besoins concrets.</p>
          <button className="btn btn--primary" type="button" onClick={() => setDetailsOpen(true)}>
            Consulter ma fiche joueur <ChevronRight size={17} />
          </button>
        </div>

        <button className="player-card" type="button" onClick={() => setDetailsOpen(true)} aria-label="Ouvrir la fiche joueur d’Eric Sekongo">
          <span className="player-card__topline"><span>EXTRA TIME</span><span>01 / CI</span></span>
          <span className="player-card__portrait-wrap"><img src={playerPortrait} alt="Portrait professionnel d’Eric Sekongo" className="player-card__portrait" /></span>
          <span className="player-card__identity"><strong>ERIC <em>SEKONGO</em></strong><small>TECH · DIGITAL · INNOVATION</small></span>
          <span className="player-card__divider" />
          <span className="player-card__attributes">
            {attributes.map(([number, label, caption]) => (
              <span className="player-card__attribute" key={number}><small>{number}</small><b>{label}</b><i>{caption}</i></span>
            ))}
          </span>
          <span className="player-card__footer"><span>FULLKAGEX</span><span className="player-card__flag" aria-label="Côte d’Ivoire"><i /><i /><i /></span><span>PLAYER PROFILE</span></span>
          <span className="player-card__shine" />
        </button>
      </div>

      {detailsOpen && (
        <div className="player-modal" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setDetailsOpen(false) }}>
          <section className="player-modal__panel" role="dialog" aria-modal="true" aria-labelledby="player-modal-title">
            <button className="player-modal__close" type="button" onClick={() => setDetailsOpen(false)} aria-label="Fermer la fiche"><X size={20} /></button>
            <p className="mono-label player-showcase__eyebrow">EXTRA TIME / Profil du joueur</p>
            <h3 id="player-modal-title">Eric Fulcanelli Sekongo</h3>
            <p className="player-modal__subtitle">Technologies · Développement · Innovation</p>
            <div className="player-modal__body">
              <img src={playerPortrait} alt="Portrait d’Eric Sekongo" />
              <div>
                <p>Je suis titulaire d’un BTS Informatique – Développeur d’Applications et actuellement en stage chez Ludotech Robotics.</p>
                <p>Mon parcours associe développement web et mobile, exploration de l’intelligence artificielle, découverte de la robotique et intérêt croissant pour la cybersécurité.</p>
                <p>J’aime apprendre en réalisant : comprendre un besoin, construire une première solution, la tester et l’améliorer. Je reste transparent sur mes acquis et sur les sujets que je suis encore en train d’approfondir.</p>
              </div>
            </div>
            <div className="player-modal__chips"><span>Développement</span><span>Applications mobiles</span><span>IA en exploration</span><span>Robotique</span><span>Cybersécurité en apprentissage</span><span>Apprentissage continu</span></div>
            <p className="player-modal__note">Les domaines affichés reflètent mes pratiques, mes centres d’intérêt et mes apprentissages — pas une revendication de maîtrise experte.</p>
          </section>
        </div>
      )}
    </>
  )
}

function Profile() {
  const APPROACH = [
    {
      n: '01',
      title: 'Code utile',
      desc: 'Je préfère une fonction simple qui marche, à une architecture complexe qui impressionne.',
    },
    {
      n: '02',
      title: 'Transparence',
      desc: 'Je dis ce que je sais faire, ce que j’apprends, et ce que je ne maîtrise pas encore.',
    },
    {
      n: '03',
      title: 'Détail soigné',
      desc: 'Un bon produit se joue dans les petits gestes : accessibilité, responsive, messages clairs.',
    },
    {
      n: '04',
      title: 'Apprentissage continu',
      desc: 'Chaque projet est une occasion de consolider une base ou d’en découvrir une nouvelle.',
    },
  ]

  return (
    <section id="profil" className="section section--alternate">
      <Heading
        eyebrow="Joueur / Profil"
        title="À propos du joueur"
        lead="Je construis mes compétences en restant transparent sur mon niveau, mes contributions et ce que je suis encore en train d’apprendre."
      />

      <PlayerCard />

      <div className="profile-intro">
        <p>
          Je m’appelle <strong>Eric Fulcanelli Sekongo</strong>. Je suis un profil junior orienté technologies et solutions numériques, titulaire d’un <strong>BTS Informatique — Développeur d’Applications</strong>. Le développement web et mobile constitue une base de mon parcours, que j’élargis progressivement à d’autres domaines technologiques.
        </p>
        <p>
          Mon parcours commence par un stage chez <strong>Mandigo SARL</strong>,
          puis se poursuit aujourd’hui chez <strong>Ludotech Robotics</strong>, où
          je découvre un environnement professionnel concret : collaboration,
          contraintes réelles, solutions numériques à livrer.
        </p>
        <p>
          Je pratique le développement web (PHP, Laravel, Next.js) et mobile (React Native). Je m’intéresse également à l’intelligence artificielle, à la robotique éducative et à la cybersécurité, que je découvre progressivement. Mon objectif n’est pas de tout maîtriser vite, mais de construire des bases solides, une à une, projet après projet.
        </p>
      </div>

      <div className="profile-grid">
        <article className="info-block">
          <GraduationCap className="info-block__icon" size={23} />
          <p className="info-block__label mono-label">Formation</p>
          <h3>BTS IDA</h3>
          <p>Informatique Développeur d’Applications.</p>
        </article>
        <article className="info-block">
          <Briefcase className="info-block__icon" size={23} />
          <p className="info-block__label mono-label">Expérience</p>
          <h3>Ludotech Robotics</h3>
          <p>Stage en cours et apprentissage en contexte professionnel.</p>
        </article>
        <article className="info-block">
          <Code2 className="info-block__icon" size={23} />
          <p className="info-block__label mono-label">Approche</p>
          <h3>Curiosité & méthode</h3>
          <p>Développement d'applications utiles, interfaces et amélioration continue.</p>
        </article>
      </div>

      <div className="profile-approach">
        <div className="profile-approach__head">
          <p className="mono-label">Dans le vestiaire</p>
          <h3>Quatre principes que je tiens.</h3>
        </div>
        <ul className="approach-list">
          {APPROACH.map(item => (
            <li key={item.n} className="approach-item">
              <span className="approach-item__number mono-label">{item.n}</span>
              <div className="approach-item__body">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Skills() {
  const [activeCategory, setActiveCategory] = useState('Tout')
  const groupedSkills = [
    { category: 'Développement', description: 'Conception et réalisation d’applications web et mobiles.', skills: ['HTML / CSS', 'JavaScript', 'PHP / MySQL', 'React', 'Laravel', 'React Native', 'Next.js'] },
    { category: 'Données & outils', description: 'Stockage, administration et environnement de travail.', skills: ['Git', 'Supabase', 'Filament AdminPanel', 'SQLite', 'Linux'] },
    { category: 'Conception & sécurité', description: 'Fondamentaux transversaux et domaines en exploration.', skills: ['UI responsive', 'Sécurité applicative'] },
  ]
  const categoryNames = ['Tout', ...groupedSkills.map(group => group.category)]
  const visibleSkills = groupedSkills
    .filter(group => activeCategory === 'Tout' || group.category === activeCategory)
    .flatMap(group => group.skills.map(name => ({ name, level: SKILLS.find(([skillName]) => skillName === name)?.[1] ?? 'À préciser', category: group.category })))
  const levelCounts = SKILLS.reduce((counts, [, level]) => ({ ...counts, [level]: (counts[level] || 0) + 1 }), {})

  return (
    <section id="competences" className="section">
      <Heading eyebrow="Équipement / 03" title="Le kit technique" lead="Mes compétences sont présentées par domaine et selon leur niveau actuel. Les catégories montrent les terrains que je pratique, consolide ou explore." />
      <div className="skill-dashboard">
        <div className="skill-dashboard__top">
          <div>
            <p className="mono-label">Inventaire du joueur</p>
            <h3>{SKILLS.length} compétences référencées</h3>
            <p>Pas de note artificielle sur 100 : chaque niveau décrit simplement mon rapport actuel à la compétence.</p>
          </div>
          <div className="skill-dashboard__legend" aria-label="Répartition des niveaux">
            {Object.entries(levelCounts).map(([level, count]) => (
              <span key={level}><b>{count}</b>{level}</span>
            ))}
          </div>
        </div>
        <div className="skill-filters" role="group" aria-label="Filtrer les compétences par domaine">
          {categoryNames.map(category => (
            <button key={category} type="button" className={`skill-filter${activeCategory === category ? ' is-active' : ''}`} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>
          ))}
        </div>
        <div className="skill-groups-intro">
          {groupedSkills.filter(group => activeCategory === 'Tout' || activeCategory === group.category).map(group => (
            <p key={group.category}><strong>{group.category}</strong><span>{group.description}</span></p>
          ))}
        </div>
        <ul className="skill-list">
          {visibleSkills.map(({ name, level, category }, i) => (
            <li key={name} className="skill-chip">
              <span className="skill-chip__number">{String(SKILLS.findIndex(([skillName]) => skillName === name) + 1).padStart(2, '0')}</span>
              <span className="skill-chip__name">{name}<small>{category}</small></span>
              <span className="skill-chip__level">{level}</span>
            </li>
          ))}
        </ul>
        <p className="skill-dashboard__note">Les niveaux reflètent une autoévaluation prudente et pourront évoluer avec la pratique, les projets et l’expérience professionnelle.</p>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projets" className="section section--alternate">
      <Heading 
        eyebrow="Sélection / 04" 
        title="Sur le terrain" 
        lead="Des réalisations et projets en cours qui illustrent ma façon d’apprendre, de concevoir et de faire évoluer des solutions numériques. Leur état d’avancement est indiqué clairement." 
      />
      <div className="project-board">
        {PROJECTS.map(p => (
          <article className="project-card" key={p.name}>
            <div className={`project-card__visual project-card__visual--${p.n}`} aria-hidden="true">
              <span className="project-card__visual-kicker">EXTRA TIME / PROJECT FILE</span>
              <span className="project-card__visual-index">{p.n}</span>
              <span className="project-card__visual-lines"><i /><i /><i /></span>
              <span className="project-card__visual-label">{p.name}</span>
            </div>
            <div className="project-card__top">
              <span className="project-card__number mono-label">{p.n} / 04</span>
              <span className="project-card__mark">＋</span>
            </div>
            <p className="project-card__type">{p.type}</p>
            <h3>{p.name}</h3>
            <p className="project-card__description">{p.desc}</p>
            <ul className="project-tags" aria-label={`Technologies de ${p.name}`}>
              {p.tags.map(tag => <li key={tag}>{tag}</li>)}
            </ul>
            
            <div className="project-card__footer">
              <span className="project-status">
                <i className="project-status__dot" />
                {p.status}
              </span>
              
              {/* Lien conditionnel : s'affiche seulement si p.url existe et n'est pas vide */}
              {p.url ? (
                <a 
                  href={p.url} 
                  target="_blank" 
                  rel="noreferrer noopener" 
                  className="project-card__link"
                  aria-label={`Voir le projet ${p.name} (nouvel onglet)`}
                >
                  Voir le projet <ChevronRight size={16} />
                </a>
              ) : (
                <span className="project-card__arrow" aria-hidden="true">
                  <ChevronRight size={20} />
                </span>
              )}
            </div>
            
            <p className="project-card__note">{p.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="section section--last">
      <Heading
        eyebrow="Coup de sifflet final"
        title="On échange ?"
        lead="Ouvert aux échanges autour du développement web, aux collaborations et aux opportunités adaptées à un profil junior."
      />

      <div className="contact-panel">
        <div className="contact-panel__content">
          <p className="contact-panel__kicker mono-label">Prochain match</p>
          <h3>Construisons quelque chose d’utile.</h3>

          <div className="contact-links">
            <a className="btn btn--primary" href={`mailto:${CONTACT.email}`}>
              <Mail size={17} aria-hidden="true" />
              M’écrire
            </a>

            <button
              type="button"
              className="btn btn--ghost"
              onClick={copyEmail}
              aria-live="polite"
            >
              {copied ? (
                <>
                  <Check size={16} aria-hidden="true" />
                  Adresse copiée
                </>
              ) : (
                <>
                  <Copy size={16} aria-hidden="true" />
                  Copier l’adresse
                </>
              )}
            </button>

            {/* Remplacement de Github par Code2 */}
            <a
              className="contact-link"
              href={CONTACT.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub (nouvel onglet)"
            >
              <Code2 size={16} aria-hidden="true" />
              <span>GitHub</span>
            </a>

            {/* Remplacement de Linkedin par Link */}
            <a
              className="contact-link"
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn (nouvel onglet)"
            >
              <Link size={16} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <span className="contact-panel__ball" aria-hidden="true">⚽</span>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <a className="brand" href="#accueil" onClick={e => { e.preventDefault(); goTo('accueil') }}>
        <span className="brand__mark brand__mark--sm">EXTRA TIME</span>
        <span className="brand__sig">Eric Fulcanelli Sekongo</span>
      </a>
      <p>© {new Date().getFullYear()} Eric Fulcanelli Sekongo · Portfolio</p>
      <a className="footer-top" href="#accueil" onClick={e => { e.preventDefault(); goTo('accueil') }}>
        Retour en haut ↑
      </a>
    </footer>
  )
}

export default function App() {
  const [theme, setTheme] = useState(initialTheme)
  const [menuOpen, setMenuOpen] = useState(false)
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('extra-time-theme', theme) } catch {}
  }, [theme])
  
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])
  
  const navigate = id => { 
    setMenuOpen(false)
    window.setTimeout(() => goTo(id), 30) 
  }
  
  return (
    <div className="app-shell">
      <Header 
        theme={theme} 
        onTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} 
        menuOpen={menuOpen} 
        onMenu={() => setMenuOpen(v => !v)} 
        navigate={navigate} 
      />
      <main>
        <Hero navigate={navigate} />
        <Career />
        <Profile />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
