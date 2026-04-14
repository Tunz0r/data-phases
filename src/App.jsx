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
  const r = 230
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

function MaturityBar({ value, max = 5 }) {
  const pct = (value / max) * 100
  const barColor = value <= 1.5 ? 'var(--accent-red)' : value <= 2.5 ? 'var(--accent-amber)' : 'var(--accent-green)'
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
              <MaturityBar value={detail.maturity[dim.key]} />
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
// PLATFORM PAGE
// ────────────────────────────────────────────

function PlatformPage() {
  const { t } = useLang()
  const pp = t.platformPage

  return (
    <div className="main-content platform-page" style={{ cursor: 'default' }}>
      <div className="phase-header">
        <div className="phase-label" style={{ color: '#06b6d4' }}>{pp.label}</div>
        <h1 className="phase-title">{pp.title}</h1>
        <p className="phase-subtitle">{pp.subtitle}</p>
      </div>

      {/* SVG Architecture Diagram */}
      <div className="platform-diagram" onClick={e => e.stopPropagation()}>
        <svg viewBox="0 0 1000 640" className="platform-svg">
          <defs>
            <linearGradient id="dataPlatGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="intPlatGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="principlesGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
            </linearGradient>
            <marker id="arrowR" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <path d="M0,0 L10,3.5 L0,7" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
            </marker>
            <marker id="arrowL" markerWidth="10" markerHeight="7" refX="1" refY="3.5" orient="auto">
              <path d="M10,0 L0,3.5 L10,7" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
            </marker>
          </defs>

          {/* ═══ DOMAIN 4: ENTERPRISE ARCHITECTURE — spans top ═══ */}
          <rect x="30" y="12" width="940" height="56" rx="10" fill="url(#principlesGrad)" stroke="#8b5cf680" strokeWidth="1" strokeDasharray="6,3" />
          <text x="500" y="34" textAnchor="middle" fontSize="11" fontWeight="700" fill="#8b5cf6" letterSpacing="2" fontFamily="var(--sans)">
            {pp.eaDomainTitle}
          </text>
          <text x="500" y="50" textAnchor="middle" fontSize="8.5" fill="#8b5cf680" fontFamily="var(--sans)">
            {pp.eaDomainDesc}
          </text>
          <text x="500" y="62" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="#8b5cf650" fontFamily="var(--sans)">
            {pp.eaDomainLabel}
          </text>

          {/* ═══ DOMAIN 2: DATA (left side) ═══ */}
          <rect x="30" y="80" width="460" height="420" rx="12" fill="url(#dataPlatGrad)" stroke="#10b981" strokeWidth="1.5" />
          <text x="260" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#10b981" fontFamily="var(--sans)">
            {pp.dataDomainTitle}
          </text>
          <text x="260" y="119" textAnchor="middle" fontSize="9" fill="#10b98180" fontFamily="var(--sans)">
            {pp.dataDomainTech}
          </text>

          {/* Hub (core of data domain) */}
          <rect x="55" y="135" width="410" height="85" rx="10" fill="#10b98112" stroke="#10b981" strokeWidth="1.5" />
          <text x="260" y="157" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981" fontFamily="var(--sans)">
            {pp.hubTitle}
          </text>
          <text x="260" y="172" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)" fontFamily="var(--sans)">
            {pp.hubDesc}
          </text>
          <text x="260" y="187" textAnchor="middle" fontSize="8" fill="var(--text-muted)" fontFamily="var(--sans)">
            {pp.hubTech}
          </text>
          <text x="260" y="200" textAnchor="middle" fontSize="8" fill="var(--text-muted)" fontFamily="var(--sans)">
            {pp.hubTech2}
          </text>
          <text x="260" y="215" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="#10b98180" fontFamily="var(--sans)">
            {pp.hubOwner}
          </text>

          {/* Analytics Tempo */}
          <rect x="55" y="235" width="195" height="85" rx="8" fill="#3b82f608" stroke="#3b82f640" strokeWidth="1" />
          <text x="152" y="255" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3b82f6" fontFamily="var(--sans)">
            {pp.analyticsTempo}
          </text>
          <text x="152" y="270" textAnchor="middle" fontSize="8" fill="var(--text-secondary)" fontFamily="var(--sans)">
            {pp.analyticsDesc}
          </text>
          <text x="152" y="283" textAnchor="middle" fontSize="7.5" fill="var(--text-muted)" fontFamily="var(--sans)">
            {pp.analyticsTech}
          </text>
          <text x="152" y="296" textAnchor="middle" fontSize="7.5" fill="var(--text-muted)" fontFamily="var(--sans)">
            {pp.analyticsTech2}
          </text>
          <text x="152" y="313" textAnchor="middle" fontSize="7" fontWeight="600" fill="#3b82f660" fontFamily="var(--sans)">
            {pp.analyticsConsumers}
          </text>

          {/* Operational Tempo */}
          <rect x="270" y="235" width="195" height="85" rx="8" fill="#f59e0b08" stroke="#f59e0b40" strokeWidth="1" strokeDasharray="6,3" />
          <text x="367" y="255" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f59e0b" fontFamily="var(--sans)">
            {pp.operationalTempo}
          </text>
          <text x="367" y="270" textAnchor="middle" fontSize="8" fill="var(--text-secondary)" fontFamily="var(--sans)">
            {pp.operationalDesc}
          </text>
          <text x="367" y="283" textAnchor="middle" fontSize="7.5" fill="var(--text-muted)" fontFamily="var(--sans)">
            {pp.operationalTech}
          </text>
          <text x="367" y="296" textAnchor="middle" fontSize="7.5" fill="var(--text-muted)" fontFamily="var(--sans)">
            {pp.operationalTech2}
          </text>
          <text x="367" y="313" textAnchor="middle" fontSize="7" fontWeight="600" fill="#f59e0b60" fontFamily="var(--sans)">
            {pp.operationalConsumers}
          </text>

          {/* ═══ DOMAIN 3: OTHER DOMAINS — inside data platform ═══ */}
          <rect x="55" y="335" width="410" height="75" rx="8" fill="#ec489908" stroke="#ec489930" strokeWidth="1" />
          <text x="260" y="356" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ec4899" fontFamily="var(--sans)">
            {pp.otherDomainsTitle}
          </text>
          <text x="260" y="372" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)" fontFamily="var(--sans)">
            {pp.otherDomainsDesc}
          </text>
          {pp.otherDomainsExamples.map((ex, i) => (
            <text key={i} x={110 + i * 120} y="396" textAnchor="middle" fontSize="7.5" fill="var(--text-muted)" fontFamily="var(--sans)">
              {ex}
            </text>
          ))}

          {/* Domain 2 label */}
          <text x="260" y="490" textAnchor="middle" fontSize="8" fontWeight="700" fill="#10b98160" letterSpacing="1.5" fontFamily="var(--sans)">
            {pp.dataDomainLabel}
          </text>

          {/* ═══ DOMAIN 1: TECH ENABLING (right side) ═══ */}
          <rect x="520" y="80" width="450" height="420" rx="12" fill="url(#intPlatGrad)" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="745" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3b82f6" fontFamily="var(--sans)">
            {pp.techDomainTitle}
          </text>
          <text x="745" y="119" textAnchor="middle" fontSize="9" fill="#3b82f680" fontFamily="var(--sans)">
            {pp.techDomainDesc}
          </text>

          {/* Integration Platform */}
          <rect x="545" y="135" width="400" height="85" rx="10" fill="#3b82f610" stroke="#3b82f650" strokeWidth="1" />
          <text x="745" y="155" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6" fontFamily="var(--sans)">
            {pp.integrationPlatformTitle}
          </text>
          <text x="645" y="172" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)" fontFamily="var(--sans)">
            {pp.apiGatewayTitle}: {pp.apiGatewayDesc2}
          </text>
          <text x="645" y="186" textAnchor="middle" fontSize="8" fontWeight="600" fill="#f59e0b" fontFamily="var(--sans)">
            {pp.apiGatewayTech}
          </text>
          <text x="870" y="172" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)" fontFamily="var(--sans)">
            {pp.eventBusTitle}: {pp.eventBusDesc2}
          </text>
          <text x="870" y="186" textAnchor="middle" fontSize="8" fontWeight="600" fill="#f59e0b" fontFamily="var(--sans)">
            {pp.eventBusTech}
          </text>
          <text x="745" y="210" textAnchor="middle" fontSize="8" fill="var(--text-muted)" fontFamily="var(--sans)">
            {pp.intCapDesc}
          </text>

          {/* Dev Platforms */}
          <rect x="545" y="235" width="195" height="85" rx="8" fill="#3b82f608" stroke="#3b82f630" strokeWidth="1" />
          <text x="642" y="255" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3b82f6" fontFamily="var(--sans)">
            {pp.devPlatTitle}
          </text>
          <text x="642" y="270" textAnchor="middle" fontSize="8" fill="var(--text-secondary)" fontFamily="var(--sans)">
            {pp.devPlatDesc}
          </text>
          <text x="642" y="283" textAnchor="middle" fontSize="7.5" fill="var(--text-muted)" fontFamily="var(--sans)">
            {pp.devPlatTech}
          </text>
          <text x="642" y="296" textAnchor="middle" fontSize="7.5" fill="var(--text-muted)" fontFamily="var(--sans)">
            {pp.devPlatTech2}
          </text>

          {/* Observability & Security */}
          <rect x="750" y="235" width="195" height="85" rx="8" fill="#06b6d408" stroke="#06b6d430" strokeWidth="1" />
          <text x="847" y="255" textAnchor="middle" fontSize="10" fontWeight="700" fill="#06b6d4" fontFamily="var(--sans)">
            {pp.obsSecTitle}
          </text>
          <text x="847" y="270" textAnchor="middle" fontSize="8" fill="var(--text-secondary)" fontFamily="var(--sans)">
            {pp.obsSecDesc}
          </text>
          <text x="847" y="283" textAnchor="middle" fontSize="7.5" fill="var(--text-muted)" fontFamily="var(--sans)">
            {pp.obsSecTech}
          </text>
          <text x="847" y="296" textAnchor="middle" fontSize="7.5" fill="var(--text-muted)" fontFamily="var(--sans)">
            {pp.obsSecTech2}
          </text>

          {/* Domain 3 consumers on integration side */}
          <rect x="545" y="335" width="400" height="75" rx="8" fill="#ec489908" stroke="#ec489930" strokeWidth="1" />
          <text x="745" y="356" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ec4899" fontFamily="var(--sans)">
            {pp.otherDomainsIntTitle}
          </text>
          <text x="745" y="372" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)" fontFamily="var(--sans)">
            {pp.otherDomainsIntDesc}
          </text>
          <text x="745" y="396" textAnchor="middle" fontSize="7.5" fill="var(--text-muted)" fontFamily="var(--sans)">
            {pp.otherDomainsIntExamples}
          </text>

          {/* Domain 1 label */}
          <text x="745" y="490" textAnchor="middle" fontSize="8" fontWeight="700" fill="#3b82f660" letterSpacing="1.5" fontFamily="var(--sans)">
            {pp.techDomainLabel}
          </text>

          {/* ═══ INTEROP ARROWS — clean curved paths ═══ */}
          {/* Top arrow: Data → Integration */}
          <path d="M490,170 C508,170 508,170 530,170" fill="none" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowR)" />
          <text x="510" y="163" textAnchor="middle" fontSize="7.5" fill="#06b6d4" fontWeight="600" fontFamily="var(--sans)">
            {pp.flowLabelOut}
          </text>
          {/* Bottom arrow: Integration → Data */}
          <path d="M530,195 C508,195 508,195 490,195" fill="none" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowL)" />
          <text x="510" y="210" textAnchor="middle" fontSize="7.5" fill="#06b6d4" fontWeight="600" fontFamily="var(--sans)">
            {pp.flowLabelIn}
          </text>

          {/* Middle arrow: Integration feeds domain data products */}
          <path d="M540,370 L495,370" fill="none" stroke="#06b6d450" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrowL)" />
          <text x="518" y="364" textAnchor="middle" fontSize="7" fill="#06b6d460" fontFamily="var(--sans)">
            {pp.flowToSpokes}
          </text>

          {/* ═══ NOT THE SAME callout ═══ */}
          <rect x="320" y="510" width="360" height="40" rx="8" fill="#ef444410" stroke="#ef444440" strokeWidth="1.5" />
          <text x="500" y="528" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444" fontFamily="var(--sans)">
            {pp.notSameWarning}
          </text>
          <text x="500" y="543" textAnchor="middle" fontSize="8.5" fill="#ef444490" fontFamily="var(--sans)">
            {pp.notSameDesc}
          </text>

          {/* ═══ LEGEND — 4 domains ═══ */}
          <g transform="translate(30, 570)">
            <rect width="940" height="50" rx="8" fill="#ffffff04" stroke="#ffffff10" strokeWidth="1" />
            <text x="470" y="14" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff40" letterSpacing="1.5" fontFamily="var(--sans)">
              {pp.legendTitle}
            </text>
            <circle cx="80" cy="35" r="5" fill="#10b981" />
            <text x="92" y="39" fontSize="8.5" fill="var(--text-secondary)" fontFamily="var(--sans)">{pp.legendData}</text>
            <circle cx="300" cy="35" r="5" fill="#3b82f6" />
            <text x="312" y="39" fontSize="8.5" fill="var(--text-secondary)" fontFamily="var(--sans)">{pp.legendTech}</text>
            <circle cx="530" cy="35" r="5" fill="#ec4899" />
            <text x="542" y="39" fontSize="8.5" fill="var(--text-secondary)" fontFamily="var(--sans)">{pp.legendOther}</text>
            <circle cx="740" cy="35" r="5" fill="#8b5cf6" />
            <text x="752" y="39" fontSize="8.5" fill="var(--text-secondary)" fontFamily="var(--sans)">{pp.legendEA}</text>
          </g>
        </svg>
      </div>

      {/* Key points cards */}
      <div className="platform-cards" onClick={e => e.stopPropagation()}>
        {pp.cards.map((card, i) => (
          <div key={i} className="platform-card" style={{ borderLeftColor: card.color }}>
            <div className="platform-card-icon" style={{ background: card.color + '18', color: card.color }}>{card.icon}</div>
            <div>
              <div className="platform-card-title">{card.title}</div>
              <div className="platform-card-desc">{card.desc}</div>
            </div>
          </div>
        ))}
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
  const [currentPage, setCurrentPage] = useState('phases') // 'phases' | 'vibe' | 'platform'
  const [lang, setLang] = useState('da')

  const t = useMemo(() => getTranslations(lang), [lang])

  const advance = useCallback(() => {
    setPhase(p => (p + 1) % 3)
  }, [])

  const cx = 550, cy = 290
  const positions = phase === 0
    ? getPhase0Positions(cx, cy)
    : phase === 1
      ? getPhase1Positions(cx, cy)
      : getPhase2Positions(cx, cy)

  const data = t.phases[phase]
  const bubbleR = 58
  const spokeLabels = ['SPOKE LILLE', 'SPOKE MELLEM', 'SPOKE LILLE/MELLEM', 'HUB + CX TEAM', 'ALLE SPOKES', 'PRODUKTTEAMS']

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
    <div className="app">
      {/* Tab navigation */}
      <nav className="phase-nav">
        {t.phases.map((p, i) => (
          <div
            key={i}
            className={`phase-tab tab-${i} ${currentPage === 'phases' && phase === i ? 'active' : ''}`}
            onClick={() => { setPhase(i); setCurrentPage('phases') }}
          >
            <div className="phase-tab-label">{t.ui.phaseLabels[i]}</div>
            <div className="phase-tab-title">{p.tabLabel}</div>
          </div>
        ))}
        <div
          className={`phase-tab tab-vibe ${currentPage === 'vibe' ? 'active' : ''}`}
          onClick={() => setCurrentPage('vibe')}
        >
          <div className="phase-tab-label" style={{ color: '#8b5cf6' }}>{t.ui.discussion}</div>
          <div className="phase-tab-title">Vibe Coding</div>
        </div>
        <div
          className={`phase-tab tab-platform ${currentPage === 'platform' ? 'active' : ''}`}
          onClick={() => setCurrentPage('platform')}
        >
          <div className="phase-tab-label" style={{ color: '#06b6d4' }}>{t.ui.wipLabel}</div>
          <div className="phase-tab-title">{t.ui.platformTabTitle}</div>
        </div>
        <LangToggle />
      </nav>

      {currentPage === 'vibe' ? (
        <VibeCodingPage />
      ) : currentPage === 'platform' ? (
        <PlatformPage />
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
            <svg className="viz-svg" viewBox="-20 -20 1140 620">
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
                    <text x={pos.x} y={pos.y - 18} textAnchor="middle" fontSize="22" dominantBaseline="central">
                      {persona.icon}
                    </text>
                    <text x={pos.x} y={pos.y + 8} className="persona-label" fontSize="12.5">
                      {persona.label}
                    </text>
                    <text x={pos.x} y={pos.y + 22} className="persona-sublabel" fontSize="7.5">
                      {persona.sublabel}
                    </text>
                    {phase === 2 && (
                      <text x={pos.x} y={pos.y + 35} fontSize="8.5" fontWeight="700"
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
      {currentPage === 'phases' && (
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
