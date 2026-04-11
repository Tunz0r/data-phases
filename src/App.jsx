import { useState, useCallback, useMemo } from 'react'
import './App.css'

const PERSONAS = [
  { id: 'nonit-dep', label: 'Data Consumer', sublabel: 'Non-IT, data dependent', color: '#3b82f6' },
  { id: 'nonit-builder', label: 'Data Builder', sublabel: 'Non-IT, AI/data product', color: '#8b5cf6' },
  { id: 'it-dep', label: 'IT Consumer', sublabel: 'IT, data dependent', color: '#06b6d4' },
  { id: 'it-pro', label: 'IT Professional', sublabel: 'IT, data professional', color: '#10b981' },
]

const SILOS = [
  'Ad Hoc Excel', 'Local DB', 'Own Pipeline', 'Separate BI',
  'Shadow IT', 'Manual Reports', 'Siloed API', 'Dept. Lake',
]

const PHASES = [
  {
    label: 'FASE 1',
    title: 'As-Is: Fragmented Landscape',
    subtitle: 'No shared ontology. No master data alignment. Teams operate in silos with duplicated data, ad-hoc governance, and isolated platforms.',
    cards: [
      { title: 'No Common Language', desc: 'What is a "customer"? Each team has a different definition.' },
      { title: 'Data Silos', desc: 'Fragmented data across departments with no shared model.' },
      { title: 'Ad-Hoc Governance', desc: 'No clear ownership, no data quality enforcement.' },
      { title: 'Duplicated Effort', desc: 'Multiple teams building the same pipelines independently.' },
    ],
  },
  {
    label: 'FASE 2',
    title: 'Intermediate: Consolidating',
    subtitle: 'Shared platform emerging. Master data model being established. Hub forming with initial governance and common tooling.',
    cards: [
      { title: 'Platform Consolidation', desc: 'Moving to a single shared data platform for all teams.' },
      { title: 'Master Data Model', desc: 'First L1 entities defined: Kunde, Forbruger, Indhold, Produkt.' },
      { title: 'Governance Basics', desc: 'Data ownership assigned. AI forum and risk framework emerging.' },
      { title: 'Hub Forming', desc: 'Central Data Foundation team providing core services.' },
    ],
  },
  {
    label: 'FASE 3',
    title: 'Target: Hub & Spoke',
    subtitle: 'Unified platform with clear spoke archetypes. Self-service at scale. Common ontology, governed AI, and value-driven prioritization.',
    cards: [
      { title: 'Self-Service at Scale', desc: 'Teams access data via governed self-service tools from the Hub.' },
      { title: 'Common Ontology', desc: 'Shared master data model with enforced definitions across TV 2.' },
      { title: 'AI Governance', desc: 'Clear AI risk model, use-case portfolio mgmt, and guardrails.' },
      { title: 'Spoke Archetypes', desc: 'From "lille" to "stor" — each spoke has clear mandate and tech.' },
    ],
  },
]

function getPhase0Positions(cx, cy) {
  // Scattered chaos positions
  return {
    personas: [
      { x: cx - 250, y: cy - 120 },
      { x: cx + 200, y: cy - 80 },
      { x: cx - 150, y: cy + 100 },
      { x: cx + 260, y: cy + 130 },
    ],
    silos: [
      { x: cx - 300, y: cy - 40 },
      { x: cx - 80, y: cy - 170 },
      { x: cx + 100, y: cy - 160 },
      { x: cx + 310, y: cy + 20 },
      { x: cx - 200, y: cy + 30 },
      { x: cx + 50, y: cy + 160 },
      { x: cx + 170, y: cy + 50 },
      { x: cx - 50, y: cy + 80 },
    ],
    hub: null,
  }
}

function getPhase1Positions(cx, cy) {
  // Semi-organized — hub appearing, some connections
  return {
    personas: [
      { x: cx - 200, y: cy - 130 },
      { x: cx + 200, y: cy - 130 },
      { x: cx - 200, y: cy + 130 },
      { x: cx + 200, y: cy + 130 },
    ],
    silos: [
      { x: cx - 310, y: cy - 50 },
      { x: cx - 280, y: cy + 50 },
      { x: cx + 310, y: cy - 50 },
      { x: cx + 280, y: cy + 50 },
    ],
    hub: { x: cx, y: cy, r: 50, opacity: 0.6 },
  }
}

function getPhase2Positions(cx, cy) {
  // Clean hub & spoke
  const spokeRadius = 180
  return {
    personas: [
      { x: cx + spokeRadius * Math.cos(-Math.PI / 4), y: cy + spokeRadius * Math.sin(-Math.PI / 4) },
      { x: cx + spokeRadius * Math.cos(-3 * Math.PI / 4), y: cy + spokeRadius * Math.sin(-3 * Math.PI / 4) },
      { x: cx + spokeRadius * Math.cos(Math.PI / 4), y: cy + spokeRadius * Math.sin(Math.PI / 4) },
      { x: cx + spokeRadius * Math.cos(3 * Math.PI / 4), y: cy + spokeRadius * Math.sin(3 * Math.PI / 4) },
    ],
    silos: [], // No more silos
    hub: { x: cx, y: cy, r: 65, opacity: 1 },
  }
}

function ChaosLines({ positions, cx, cy }) {
  // Random tangled lines between silos and personas in phase 0
  const lines = useMemo(() => {
    const result = []
    const allNodes = [...positions.personas, ...positions.silos]
    for (let i = 0; i < allNodes.length; i++) {
      for (let j = i + 1; j < allNodes.length; j++) {
        if (Math.random() > 0.55) {
          result.push({ x1: allNodes[i].x, y1: allNodes[i].y, x2: allNodes[j].x, y2: allNodes[j].y, key: `${i}-${j}` })
        }
      }
    }
    return result
  }, [])

  return lines.map(l => (
    <line
      key={l.key}
      x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
      stroke="#ef444440"
      strokeWidth={1}
      strokeDasharray="4,4"
      className="chaos-line"
    />
  ))
}

function App() {
  const [phase, setPhase] = useState(0)

  const advance = useCallback((e) => {
    // Don't advance if clicking on interactive elements
    if (e.target.closest('.phase-dot') || e.target.closest('.info-card')) return
    setPhase(p => (p + 1) % 3)
  }, [])

  const cx = 400, cy = 240
  const positions = phase === 0
    ? getPhase0Positions(cx, cy)
    : phase === 1
      ? getPhase1Positions(cx, cy)
      : getPhase2Positions(cx, cy)

  const phaseData = PHASES[phase]

  return (
    <div className="app" onClick={advance}>
      {/* Phase indicator dots */}
      <div className="phase-indicator">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`phase-dot phase-${i} ${phase === i ? 'active' : ''}`}
            style={{ opacity: phase === i ? 1 : 0.3 }}
            onClick={(e) => { e.stopPropagation(); setPhase(i) }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="phase-header">
        <div className={`phase-label phase-${phase}`}>{phaseData.label}</div>
        <h1 className="phase-title">{phaseData.title}</h1>
        <p className="phase-subtitle">{phaseData.subtitle}</p>
      </div>

      {/* SVG Visualization */}
      <div className="viz-container">
        <svg className="viz-svg" viewBox="0 0 800 480">
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b98130" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Phase 0: chaos lines */}
          {phase === 0 && <ChaosLines positions={positions} cx={cx} cy={cy} />}

          {/* Phase 1 & 2: connection lines to hub */}
          {positions.hub && positions.personas.map((p, i) => (
            <line
              key={`conn-${i}`}
              x1={positions.hub.x} y1={positions.hub.y}
              x2={p.x} y2={p.y}
              stroke={phase === 2 ? PERSONAS[i].color + '60' : '#ffffff15'}
              strokeWidth={phase === 2 ? 2 : 1}
              strokeDasharray={phase === 1 ? '6,4' : 'none'}
              className="connection-line"
            />
          ))}

          {/* Phase 1: remaining silo connections (fading) */}
          {phase === 1 && positions.silos.map((s, i) => {
            const pIdx = i < 2 ? 0 : 1
            const persona = positions.personas[pIdx + 2]
            return (
              <line
                key={`silo-conn-${i}`}
                x1={s.x} y1={s.y}
                x2={persona.x} y2={persona.y}
                stroke="#f59e0b20"
                strokeWidth={1}
                strokeDasharray="3,5"
                className="chaos-line"
              />
            )
          })}

          {/* Hub */}
          {positions.hub && (
            <g>
              <circle
                cx={positions.hub.x} cy={positions.hub.y}
                r={positions.hub.r * 1.5}
                fill="url(#hubGlow)"
                opacity={positions.hub.opacity}
              />
              <circle
                cx={positions.hub.x} cy={positions.hub.y}
                r={positions.hub.r}
                fill={phase === 2 ? '#10b98115' : '#ffffff08'}
                stroke={phase === 2 ? '#10b981' : '#ffffff30'}
                strokeWidth={phase === 2 ? 2 : 1}
                opacity={positions.hub.opacity}
                className="hub-circle"
                filter={phase === 2 ? 'url(#glow)' : 'none'}
              />
              <text x={positions.hub.x} y={positions.hub.y - 8} className="hub-label"
                opacity={positions.hub.opacity}>
                Hub
              </text>
              <text x={positions.hub.x} y={positions.hub.y + 8} className="hub-sublabel"
                opacity={positions.hub.opacity}>
                {phase === 1 ? 'Forming...' : 'Data Foundation'}
              </text>
              {phase === 2 && (
                <>
                  <text x={positions.hub.x} y={positions.hub.y + 22} className="hub-sublabel">
                    Platform + Governance
                  </text>
                  <text x={positions.hub.x} y={positions.hub.y + 34} className="hub-sublabel">
                    Self-Service + AI
                  </text>
                </>
              )}
            </g>
          )}

          {/* Silos */}
          {positions.silos.map((s, i) => (
            <g key={`silo-${i}`}>
              <rect
                x={s.x - 35} y={s.y - 14}
                width={70} height={28}
                rx={4}
                fill="#ef444410"
                stroke={phase === 1 ? '#f59e0b30' : '#ef444430'}
                strokeWidth={1}
                strokeDasharray={phase === 1 ? '4,2' : 'none'}
                className="silo-rect"
              />
              <text x={s.x} y={s.y + 3} className="silo-label">
                {SILOS[i]}
              </text>
            </g>
          ))}

          {/* Personas */}
          {PERSONAS.map((persona, i) => {
            const pos = positions.personas[i]
            const r = phase === 2 ? 38 : 32
            return (
              <g key={persona.id} className="persona-group">
                {/* Glow */}
                <circle
                  cx={pos.x} cy={pos.y} r={r + 8}
                  fill={persona.color + '10'}
                />
                {/* Circle */}
                <circle
                  cx={pos.x} cy={pos.y} r={r}
                  fill={persona.color + '18'}
                  stroke={persona.color}
                  strokeWidth={2}
                  className="persona-circle"
                />
                {/* Icon */}
                <text
                  x={pos.x} y={pos.y - 6}
                  textAnchor="middle"
                  fontSize="18"
                  dominantBaseline="central"
                >
                  {i === 0 ? '\u{1F4CA}' : i === 1 ? '\u{1F527}' : i === 2 ? '\u{1F4BB}' : '\u{2699}\u{FE0F}'}
                </text>
                {/* Label */}
                <text x={pos.x} y={pos.y + 14} className="persona-label">
                  {persona.label}
                </text>
                <text x={pos.x} y={pos.y + 26} className="persona-sublabel">
                  {persona.sublabel}
                </text>
                {/* Spoke type label in phase 2 */}
                {phase === 2 && (
                  <text x={pos.x} y={pos.y + 38} className="persona-sublabel"
                    fill={persona.color} fontWeight="600">
                    {i === 0 ? 'Spoke "lille"' : i === 1 ? 'Spoke "mellem"' : i === 2 ? 'Spoke "lille/mellem"' : 'Spoke "stor"'}
                  </text>
                )}
              </g>
            )
          })}

          {/* Phase 2: outer ring labels */}
          {phase === 2 && (
            <g>
              {/* Governance ring */}
              <circle cx={cx} cy={cy} r={220} fill="none" stroke="#ffffff08" strokeWidth={1} strokeDasharray="4,8" />
              <text x={cx} y={cy - 225} textAnchor="middle" fontSize="10" fill="#ffffff30" fontWeight="600">
                GOVERNANCE + COMMON ONTOLOGY
              </text>
              <text x={cx} y={cy + 240} textAnchor="middle" fontSize="10" fill="#ffffff30" fontWeight="600">
                SHARED MASTER DATA MODEL
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="legend">
        {PERSONAS.map(p => (
          <div key={p.id} className="legend-item">
            <div className="legend-color" style={{ background: p.color }} />
            {p.sublabel}
          </div>
        ))}
      </div>

      {/* Info cards */}
      <div className="info-cards">
        {phaseData.cards.map((card, i) => (
          <div key={i} className="info-card">
            <div className="info-card-title">{card.title}</div>
            <div>{card.desc}</div>
          </div>
        ))}
      </div>

      {/* Click hint */}
      <div className="bottom-bar">
        <span className="click-hint">
          Click anywhere to advance &middot; Phase {phase + 1} of 3
        </span>
      </div>
    </div>
  )
}

export default App
