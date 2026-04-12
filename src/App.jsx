import { useState, useCallback, useMemo, createContext, useContext } from 'react'
import { getTranslations } from './translations'
import './App.css'

// ────────────────────────────────────────────
// LANGUAGE CONTEXT
// ────────────────────────────────────────────

const LangContext = createContext()

function useLang() {
  return useContext(LangContext)
}

// ────────────────────────────────────────────
// RICH TEXT RENDERER
// ────────────────────────────────────────────

function RichText({ segments }) {
  return segments.map((seg, i) =>
    typeof seg === 'string' ? seg : <strong key={i}>{seg.b}</strong>
  )
}

// ────────────────────────────────────────────
// POSITIONING
// ────────────────────────────────────────────

function getPhase0Positions(cx, cy) {
  return {
    personas: [
      { x: cx - 320, y: cy - 100 },
      { x: cx + 240, y: cy - 80 },
      { x: cx - 240, y: cy + 130 },
      { x: cx + 340, y: cy + 120 },
      { x: cx + 50, y: cy - 130 },
      { x: cx - 60, y: cy + 140 },
    ],
    silos: [
      { x: cx - 400, y: cy - 10 },
      { x: cx - 160, y: cy - 160 },
      { x: cx + 130, y: cy - 165 },
      { x: cx + 420, y: cy + 10 },
      { x: cx - 300, y: cy + 40 },
      { x: cx + 80, y: cy + 175 },
      { x: cx + 200, y: cy + 40 },
      { x: cx - 100, y: cy + 50 },
      { x: cx - 80, y: cy - 40 },
      { x: cx + 380, y: cy - 70 },
    ],
    hub: null,
  }
}

function getPhase1Positions(cx, cy) {
  return {
    personas: [
      { x: cx - 280, y: cy - 140 },
      { x: cx, y: cy - 150 },
      { x: cx + 280, y: cy - 140 },
      { x: cx - 280, y: cy + 140 },
      { x: cx, y: cy + 150 },
      { x: cx + 280, y: cy + 140 },
    ],
    silos: [
      { x: cx - 420, y: cy - 50 },
      { x: cx - 400, y: cy + 50 },
      { x: cx + 420, y: cy - 50 },
      { x: cx + 400, y: cy + 50 },
    ],
    hub: { x: cx, y: cy, r: 60, opacity: 0.7 },
  }
}

function getPhase2Positions(cx, cy) {
  const r = 210
  const angles = [-Math.PI / 2, -Math.PI / 6, Math.PI / 6, Math.PI / 2, 5 * Math.PI / 6, -5 * Math.PI / 6]
  return {
    personas: angles.map(a => ({
      x: cx + r * Math.cos(a),
      y: cy + r * Math.sin(a),
    })),
    silos: [],
    hub: { x: cx, y: cy, r: 75, opacity: 1 },
  }
}

// ────────────────────────────────────────────
// CHAOS LINES (phase 0)
// ────────────────────────────────────────────

function ChaosLines({ positions }) {
  const lines = useMemo(() => {
    const result = []
    const all = [...positions.personas, ...positions.silos]
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        if (Math.random() > 0.5) {
          result.push({ x1: all[i].x, y1: all[i].y, x2: all[j].x, y2: all[j].y, key: `${i}-${j}` })
        }
      }
    }
    return result
  }, [])

  return lines.map(l => (
    <line
      key={l.key}
      x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
      stroke="#ef444425"
      strokeWidth={0.8}
      strokeDasharray="4,6"
    />
  ))
}

// ────────────────────────────────────────────
// MATURITY BAR
// ────────────────────────────────────────────

function MaturityBar({ value, max = 5, color }) {
  const pct = (value / max) * 100
  const barColor = value <= 1.5 ? 'var(--accent-red)' : value <= 2.5 ? 'var(--accent-amber)' : color || 'var(--accent-green)'
  return (
    <div className="maturity-bar-track">
      <div className="maturity-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
      {[1, 2, 3, 4].map(n => (
        <div key={n} className="maturity-bar-marker" style={{ left: `${(n / max) * 100}%` }} />
      ))}
    </div>
  )
}

// ────────────────────────────────────────────
// PERSONA CARD
// ────────────────────────────────────────────

function PersonaCard({ persona, detail, colorIndex }) {
  const { t } = useLang()
  const iconMap = { yes: '\u2713', no: '\u2717', partial: '\u25CB' }
  const classMap = { yes: 'cap-yes', no: 'cap-no', partial: 'cap-partial' }
  const tempoLabels = { analytics: t.ui.tempoAnalytics, operational: t.ui.tempoOperational, both: `${t.ui.tempoAnalytics} + ${t.ui.tempoOperational}` }
  const tempoColors = { analytics: '#3b82f6', operational: '#f59e0b', both: '#10b981' }

  return (
    <div className={`persona-card color-${colorIndex}`} onClick={e => e.stopPropagation()}>
      <div className="persona-card-header">
        <div className="persona-card-icon">{persona.icon}</div>
        <div>
          <div className="persona-card-name">{persona.label}</div>
          <div className="persona-card-role">{persona.sublabel}</div>
        </div>
      </div>
      <div className="persona-card-desc">{detail.desc}</div>
      {detail.spoke && (
        <div style={{ fontSize: 11, fontWeight: 600, color: persona.color, marginBottom: 10 }}>
          {detail.spoke}
        </div>
      )}
      {detail.tempo && (
        <div className="tempo-badge" style={{ color: tempoColors[detail.tempo], borderColor: tempoColors[detail.tempo] + '40' }}>
          {tempoLabels[detail.tempo]}
        </div>
      )}
      {detail.maturity && (
        <div className="maturity-section">
          {t.maturityDims.map(dim => (
            <div key={dim.key} className="maturity-row">
              <span className="maturity-label">{dim.label}</span>
              <MaturityBar value={detail.maturity[dim.key]} color={persona.color} />
              <span className="maturity-value">{detail.maturity[dim.key]}</span>
            </div>
          ))}
        </div>
      )}
      <ul className="capability-list">
        {detail.capabilities.map((cap, i) => (
          <li key={i} className="capability-item">
            <span className={`capability-icon ${classMap[cap.icon]}`}>{iconMap[cap.icon]}</span>
            <span>{cap.text}</span>
          </li>
        ))}
      </ul>
      <div className="tools-row">
        {detail.tools.map((tool, i) => (
          <span key={i} className="tool-tag">{tool}</span>
        ))}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────
// GLOSSARY
// ────────────────────────────────────────────

function Glossary() {
  const [openTerm, setOpenTerm] = useState(null)
  const { t } = useLang()
  const openItem = openTerm ? t.glossary.find(g => g.term === openTerm) : null

  return (
    <div className="glossary" onClick={e => e.stopPropagation()}>
      <div className="glossary-header">
        <span className="glossary-title">{t.ui.keyTerms}</span>
        <span className="glossary-hint">{t.ui.clickForDetails}</span>
      </div>
      <div className="glossary-terms">
        {t.glossary.map(item => (
          <div key={item.term} className="glossary-term-wrapper">
            <button
              className={`glossary-chip ${openTerm === item.term ? 'active' : ''}`}
              onClick={() => setOpenTerm(openTerm === item.term ? null : item.term)}
            >
              <span className="glossary-chip-term">{item.term}</span>
              <span className="glossary-chip-short">{item.short}</span>
            </button>
          </div>
        ))}
      </div>
      {openItem && (
        <>
          <div className="glossary-backdrop" onClick={e => { e.stopPropagation(); setOpenTerm(null) }} />
          <div className="glossary-detail" onClick={e => e.stopPropagation()}>
            <div className="glossary-detail-title">{openItem.term}</div>
            <div className="glossary-detail-text">{openItem.detail}</div>
          </div>
        </>
      )}
    </div>
  )
}

// ────────────────────────────────────────────
// VIBE CODING COMPONENTS
// ────────────────────────────────────────────

function VibeMatrix() {
  const { t } = useLang()
  const zones = t.vibeMatrix

  return (
    <div className="vibe-matrix" onClick={e => e.stopPropagation()}>
      <div className="vibe-matrix-header">
        <div className="vibe-matrix-corner" />
        <div className="vibe-matrix-col-header">{t.vibePage.colHeaders[0]}</div>
        <div className="vibe-matrix-col-header">{t.vibePage.colHeaders[1]}</div>
      </div>
      <div className="vibe-matrix-body">
        <div className="vibe-matrix-row-header">{t.vibePage.rowHeaders[0]}</div>
        {zones.filter(z => z.row === 0).map((z, i) => (
          <div key={i} className={`vibe-matrix-cell vibe-zone-${z.zone}`}>
            <div className="vibe-cell-zone" style={{ color: z.color }}>{z.desc}</div>
            <div className="vibe-cell-examples">{z.examples}</div>
            <div className="vibe-cell-who">{z.who}</div>
          </div>
        ))}
        <div className="vibe-matrix-row-header">{t.vibePage.rowHeaders[1]}</div>
        {zones.filter(z => z.row === 1).map((z, i) => (
          <div key={i} className={`vibe-matrix-cell vibe-zone-${z.zone}`}>
            <div className="vibe-cell-zone" style={{ color: z.color }}>{z.desc}</div>
            <div className="vibe-cell-examples">{z.examples}</div>
            <div className="vibe-cell-who">{z.who}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VibeCard({ persona, vibe, colorIndex }) {
  const { t } = useLang()
  const iconMap = { yes: '\u2713', no: '\u2717', partial: '\u25CB' }
  const classMap = { yes: 'cap-yes', no: 'cap-no', partial: 'cap-partial' }
  const zoneColors = { sikker: '#10b981', risikabel: '#f59e0b', nogo: '#ef4444' }

  return (
    <div className={`persona-card color-${colorIndex}`} onClick={e => e.stopPropagation()}>
      <div className="persona-card-header">
        <div className="persona-card-icon">{persona.icon}</div>
        <div>
          <div className="persona-card-name">{persona.label}</div>
          <div className="persona-card-role">{persona.sublabel}</div>
        </div>
      </div>
      <div className="persona-card-desc">{vibe.desc}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: zoneColors[vibe.zone], marginBottom: 10 }}>
        {vibe.zoneLabel}
      </div>
      <div className="maturity-section">
        {t.vibeDims.map(dim => {
          const val = vibe.scores[dim.key]
          const pct = (val / 5) * 100
          const barColor = val === 0 ? '#ef4444' : val <= 1.5 ? '#ef4444' : val <= 2.5 ? '#f59e0b' : '#10b981'
          return (
            <div key={dim.key} className="maturity-row">
              <span className="maturity-label">{dim.label}</span>
              <div className="maturity-bar-track">
                <div className="maturity-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className="maturity-bar-marker" style={{ left: `${(n / 5) * 100}%` }} />
                ))}
              </div>
              <span className="maturity-value">{val || '\u2014'}</span>
            </div>
          )
        })}
      </div>
      <ul className="capability-list">
        {vibe.examples.map((ex, i) => (
          <li key={i} className="capability-item">
            <span className={`capability-icon ${classMap[ex.icon]}`}>{iconMap[ex.icon]}</span>
            <span>{ex.text}</span>
          </li>
        ))}
      </ul>
      <div className="tools-row">
        {vibe.tools.map((tool, i) => (
          <span key={i} className="tool-tag">{tool}</span>
        ))}
      </div>
    </div>
  )
}

function VibeCommsSection({ section }) {
  return (
    <div className={`vibe-comms-section ${section.css}`}>
      <div className="vibe-comms-section-header">
        <span className="vibe-comms-icon" style={{ background: section.iconBg, color: section.iconColor }}>{section.icon}</span>
        <h3>{section.title}</h3>
      </div>
      {section.paragraphs && section.paragraphs.map((p, i) => (
        <p key={i}><RichText segments={p} /></p>
      ))}
      {section.list && (
        <ul className="vibe-comms-list">
          {section.list.map((item, i) => (
            <li key={i}><RichText segments={item} /></li>
          ))}
        </ul>
      )}
      {section.paragraphsAfter && section.paragraphsAfter.map((p, i) => (
        <p key={`a${i}`}><RichText segments={p} /></p>
      ))}
      {section.principles && (
        <ol className="vibe-comms-principles-list">
          {section.principles.map((p, i) => (
            <li key={i}><strong>{p.da}</strong> {p.text}</li>
          ))}
        </ol>
      )}
    </div>
  )
}

function VibeCodingPage() {
  const { t } = useLang()
  const vp = t.vibePage

  return (
    <div className="main-content" style={{ cursor: 'default' }}>
      <div className="phase-header">
        <div className="phase-label" style={{ color: '#8b5cf6' }}>{vp.label}</div>
        <h1 className="phase-title">{vp.title}</h1>
        <p className="phase-subtitle">{vp.subtitle}</p>
      </div>

      <VibeMatrix />

      <div className="vibe-comms" onClick={e => e.stopPropagation()}>
        <div className="vibe-comms-header">
          <span className="vibe-comms-badge">{vp.commsBadge}</span>
          <h2 className="vibe-comms-title">{vp.commsTitle}</h2>
          <p className="vibe-comms-hint">{vp.commsHint}</p>
        </div>
        <div className="vibe-comms-body">
          {vp.sections.map(section => (
            <VibeCommsSection key={section.key} section={section} />
          ))}
        </div>
      </div>

      <div className="bottom-panel">
        <div className="persona-grid">
          {t.personas.map((persona, i) => (
            <VibeCard
              key={persona.id}
              persona={persona}
              vibe={t.vibeProfiles[i]}
              colorIndex={i}
            />
          ))}
        </div>
        <Glossary />
      </div>
    </div>
  )
}

// ────────────────────────────────────────────
// LANGUAGE TOGGLE
// ────────────────────────────────────────────

function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-toggle" onClick={e => e.stopPropagation()}>
      <button
        className={`lang-flag ${lang === 'da' ? 'active' : ''}`}
        onClick={() => setLang('da')}
        title="Dansk"
      >
        <svg viewBox="0 0 640 480" width="20" height="15">
          <rect width="640" height="480" fill="#c8102e"/>
          <rect x="170" width="60" height="480" fill="#fff"/>
          <rect y="180" width="640" height="120" fill="#fff"/>
        </svg>
      </button>
      <button
        className={`lang-flag ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
        title="English"
      >
        <svg viewBox="0 0 640 480" width="20" height="15">
          <rect width="640" height="480" fill="#012169"/>
          <path d="M75,0L320,240L565,0H640V60L395,300L640,540V480H565L320,240L75,480H0V420L245,180L0,0Z" fill="#fff" opacity="0.5"/>
          <path d="M0,0L640,480M640,0L0,480" stroke="#C8102E" strokeWidth="40"/>
          <path d="M320,0V480M0,240H640" stroke="#fff" strokeWidth="80"/>
          <path d="M320,0V480M0,240H640" stroke="#C8102E" strokeWidth="48"/>
        </svg>
      </button>
    </div>
  )
}

// ────────────────────────────────────────────
// APP
// ────────────────────────────────────────────

function App() {
  const [phase, setPhase] = useState(0)
  const [showVibe, setShowVibe] = useState(false)
  const [lang, setLang] = useState('da')

  const t = useMemo(() => getTranslations(lang), [lang])

  const advance = useCallback(() => {
    setPhase(p => (p + 1) % 3)
  }, [])

  const cx = 550, cy = 250
  const positions = phase === 0
    ? getPhase0Positions(cx, cy)
    : phase === 1
      ? getPhase1Positions(cx, cy)
      : getPhase2Positions(cx, cy)

  const data = t.phases[phase]
  const bubbleR = 42
  const spokeLabels = ['SPOKE LILLE', 'SPOKE MELLEM', 'SPOKE LILLE/MELLEM', 'SPOKE STOR', 'ALLE SPOKES', 'HUB']

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
    <div className="app">
      {/* Tab navigation */}
      <nav className="phase-nav">
        {t.phases.map((p, i) => (
          <div
            key={i}
            className={`phase-tab tab-${i} ${!showVibe && phase === i ? 'active' : ''}`}
            onClick={() => { setPhase(i); setShowVibe(false) }}
          >
            <div className="phase-tab-label">{t.ui.phaseLabels[i]}</div>
            <div className="phase-tab-title">{p.tabLabel}</div>
          </div>
        ))}
        <div
          className={`phase-tab tab-vibe ${showVibe ? 'active' : ''}`}
          onClick={() => setShowVibe(true)}
        >
          <div className="phase-tab-label" style={{ color: '#8b5cf6' }}>{t.ui.discussion}</div>
          <div className="phase-tab-title">Vibe Coding</div>
        </div>
        <LangToggle />
      </nav>

      {showVibe ? (
        <VibeCodingPage />
      ) : (
      <div className="main-content" onClick={advance}>
        {/* Header */}
        <div className="phase-header">
          <div className={`phase-label phase-${phase}`}>{data.label}</div>
          <h1 className="phase-title">{data.title}</h1>
          <p className="phase-subtitle">{data.subtitle}</p>
        </div>

        {/* SVG Visualization */}
        <div className="viz-section">
          <div className="viz-container">
            <svg className="viz-svg" viewBox="-20 0 1140 500">
              <defs>
                <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b98120" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Phase 0: chaos lines */}
              {phase === 0 && <ChaosLines positions={positions} />}

              {/* Connection lines to hub */}
              {positions.hub && t.personas.map((p, i) => (
                <line
                  key={`conn-${i}`}
                  x1={positions.hub.x} y1={positions.hub.y}
                  x2={positions.personas[i].x} y2={positions.personas[i].y}
                  stroke={phase === 2 ? p.color + '50' : '#ffffff12'}
                  strokeWidth={phase === 2 ? 2.5 : 1.5}
                  strokeDasharray={phase === 1 ? '8,5' : 'none'}
                  className="connection-line"
                />
              ))}

              {/* Phase 1: remaining silo lines */}
              {phase === 1 && positions.silos.map((s, i) => {
                const pIdx = i < 2 ? 0 : 1
                const persona = positions.personas[pIdx + 2]
                return (
                  <line
                    key={`silo-conn-${i}`}
                    x1={s.x} y1={s.y} x2={persona.x} y2={persona.y}
                    stroke="#f59e0b18"
                    strokeWidth={1}
                    strokeDasharray="3,6"
                  />
                )
              })}

              {/* Hub */}
              {positions.hub && (
                <g>
                  <circle
                    cx={positions.hub.x} cy={positions.hub.y}
                    r={positions.hub.r * 1.8}
                    fill="url(#hubGlow)"
                    opacity={positions.hub.opacity}
                  />
                  <circle
                    cx={positions.hub.x} cy={positions.hub.y}
                    r={positions.hub.r}
                    fill={phase === 2 ? '#10b98110' : '#ffffff06'}
                    stroke={phase === 2 ? '#10b981' : '#ffffff25'}
                    strokeWidth={phase === 2 ? 2.5 : 1.5}
                    opacity={positions.hub.opacity}
                    filter={phase === 2 ? 'url(#glow)' : 'none'}
                  />
                  <text x={positions.hub.x} y={positions.hub.y - 14} className="hub-label" fontSize="15" opacity={positions.hub.opacity}>
                    Hub
                  </text>
                  <text x={positions.hub.x} y={positions.hub.y + 2} className="hub-sublabel" fontSize="10" opacity={positions.hub.opacity}>
                    Data Foundation
                  </text>
                  <text x={positions.hub.x} y={positions.hub.y + 14} className="hub-sublabel" fontSize="9" opacity={positions.hub.opacity}>
                    {phase === 1 ? t.ui.hubForming : t.ui.hubFull}
                  </text>
                  {phase === 2 && (
                    <text x={positions.hub.x} y={positions.hub.y + 26} className="hub-sublabel" fontSize="9" fill="#10b981">
                      {t.ui.hubExtra}
                    </text>
                  )}
                </g>
              )}

              {/* Tempo rings (phase 1 and 2) */}
              {phase === 1 && (
                <g>
                  {/* Analytics tempo ring - forming */}
                  <circle cx={cx} cy={cy} r={120} fill="none" stroke="#3b82f615" strokeWidth={1.5} strokeDasharray="6,4" />
                  <text x={cx + 125} y={cy - 10} fontSize="8" fill="#3b82f650" fontWeight="600" fontFamily="var(--sans)" textAnchor="start">
                    {t.ui.tempoAnalytics}
                  </text>
                  <text x={cx + 125} y={cy + 2} fontSize="7" fill="#3b82f635" fontFamily="var(--sans)" textAnchor="start">
                    {t.ui.tempoAnalyticsShort}
                  </text>
                </g>
              )}
              {phase === 2 && (
                <g>
                  {/* Analytics tempo ring */}
                  <circle cx={cx} cy={cy} r={115} fill="none" stroke="#3b82f625" strokeWidth={1.5} />
                  <text x={cx} y={cy - 120} textAnchor="middle" fontSize="8" fill="#3b82f660" fontWeight="600" fontFamily="var(--sans)" letterSpacing="1">
                    {t.ui.tempoAnalytics} \u2014 {t.ui.tempoAnalyticsShort}
                  </text>
                  {/* Operational tempo ring */}
                  <circle cx={cx} cy={cy} r={150} fill="none" stroke="#f59e0b20" strokeWidth={1.5} strokeDasharray="8,4" className="tempo-ring-operational" />
                  <text x={cx} y={cy + 160} textAnchor="middle" fontSize="8" fill="#f59e0b50" fontWeight="600" fontFamily="var(--sans)" letterSpacing="1">
                    {t.ui.tempoOperational} \u2014 {t.ui.tempoOperationalShort}
                  </text>
                </g>
              )}

              {/* Silos */}
              {positions.silos.map((s, i) => (
                <g key={`silo-${i}`}>
                  <rect
                    x={s.x - 42} y={s.y - 14}
                    width={84} height={28}
                    rx={5}
                    fill={phase === 1 ? '#f59e0b08' : '#ef444408'}
                    stroke={phase === 1 ? '#f59e0b25' : '#ef444425'}
                    strokeWidth={1}
                    strokeDasharray={phase === 1 ? '4,3' : 'none'}
                  />
                  <text x={s.x} y={s.y + 4} className="silo-label" fontSize="9.5">
                    {t.silos[i]}
                  </text>
                </g>
              ))}

              {/* Governance ring (phase 2) */}
              {phase === 2 && (
                <g>
                  <circle cx={cx} cy={cy} r={280} fill="none" stroke="#ffffff06" strokeWidth={1} strokeDasharray="6,10" />
                  <text x={cx} y={cy - 288} textAnchor="middle" fontSize="9.5" fill="#ffffff25" fontWeight="600" letterSpacing="1.5">
                    {t.ui.govRingTop}
                  </text>
                  <text x={cx} y={cy + 298} textAnchor="middle" fontSize="9.5" fill="#ffffff25" fontWeight="600" letterSpacing="1.5">
                    {t.ui.govRingBottom}
                  </text>
                </g>
              )}

              {/* Personas */}
              {t.personas.map((persona, i) => {
                const pos = positions.personas[i]
                return (
                  <g key={persona.id}>
                    <circle cx={pos.x} cy={pos.y} r={bubbleR + 12} fill={persona.color + '08'} />
                    <circle
                      cx={pos.x} cy={pos.y} r={bubbleR}
                      fill={persona.color + '12'}
                      stroke={persona.color}
                      strokeWidth={2}
                    />
                    <text x={pos.x} y={pos.y - 12} textAnchor="middle" fontSize="20" dominantBaseline="central">
                      {persona.icon}
                    </text>
                    <text x={pos.x} y={pos.y + 12} className="persona-label" fontSize="11">
                      {persona.label}
                    </text>
                    <text x={pos.x} y={pos.y + 24} className="persona-sublabel" fontSize="8.5">
                      {persona.sublabel}
                    </text>
                    {phase === 2 && (
                      <text x={pos.x} y={pos.y + 36} fontSize="8" fontWeight="700"
                        fill={persona.color} textAnchor="middle" fontFamily="var(--sans)">
                        {spokeLabels[i]}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          </div>
        </div>

        {/* Bottom panel */}
        <div className="bottom-panel">
          <div className="tech-strip">
            <span className="tech-strip-label">{t.ui.platform}</span>
            <div className="tech-strip-items">
              <span className="tech-strip-item">Databricks</span>
              <span className="tech-strip-item">Adobe Experience Platform</span>
              <span className="tech-strip-item">Power BI</span>
              <span className="tech-strip-item">Excel</span>
              <span className="tech-strip-item">Microsoft CoPilot</span>
            </div>
          </div>

          <div className="personas-intro" onClick={e => e.stopPropagation()}>
            <div className="personas-intro-text">
              <strong>{t.ui.personasIntroA}</strong>{t.ui.personasIntroB}
            </div>
            <div className="maturity-legend">
              <span className="maturity-legend-label">{t.ui.maturityScale}</span>
              {t.ui.levels.map((lvl, i) => {
                const colors = ['var(--accent-red)', 'var(--accent-amber)', 'var(--accent-green)', '#3b82f6', '#6366f1']
                return (
                  <span key={i}>
                    {i > 0 && <span className="maturity-legend-sep">{'\u2192'}</span>}
                    <span className="maturity-legend-item" style={{ color: colors[i] }}>{lvl}</span>
                  </span>
                )
              })}
              <span className="maturity-legend-note">{t.ui.maturityNote}</span>
            </div>
          </div>

          <div className="persona-grid">
            {t.personas.map((persona, i) => (
              <PersonaCard
                key={persona.id}
                persona={persona}
                detail={data.personas[i]}
                colorIndex={i}
              />
            ))}
          </div>
          <Glossary />
        </div>
      </div>
      )}

      {/* Click hint */}
      {!showVibe && (
        <div className="bottom-bar">
          <span className="click-hint">
            {t.ui.clickHint} &middot; {data.label}
          </span>
        </div>
      )}
    </div>
    </LangContext.Provider>
  )
}

export default App
