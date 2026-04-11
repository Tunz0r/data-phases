import { useState, useCallback, useMemo } from 'react'
import './App.css'

// ────────────────────────────────────────────
// DATA
// ────────────────────────────────────────────

const PERSONAS = [
  { id: 'nonit-dep', label: 'Data Consumer', sublabel: 'Non-IT, data dependent', color: '#3b82f6', icon: '\u{1F4CA}' },
  { id: 'nonit-builder', label: 'Data Product Builder', sublabel: 'Non-IT, builds with data & AI', color: '#8b5cf6', icon: '\u{1F9E0}' },
  { id: 'it-dep', label: 'IT Data Consumer', sublabel: 'IT, data dependent', color: '#06b6d4', icon: '\u{1F4BB}' },
  { id: 'it-pro', label: 'Data & AI Professional', sublabel: 'IT, data/ML/AI professional', color: '#10b981', icon: '\u{2699}\u{FE0F}' },
]

const SILOS = [
  'Ad-Hoc Excel', 'Local Database', 'Own Pipeline', 'Separate BI Tool',
  'Shadow IT', 'Manual Reports', 'Siloed API', 'Dept. Data Lake',
  'Private Notebooks', 'Team SharePoint',
]

const PHASE_DETAILS = [
  {
    label: 'FASE 1 \u00B7 AS-IS',
    tabLabel: 'As-Is',
    title: 'The Fragmented Landscape',
    subtitle: 'No shared ontology. No master data alignment. Each team defines "customer", "content", and "product" differently. Data sits in silos, governance is ad-hoc, and everyone builds their own pipelines.',
    personas: [
      {
        desc: 'Relies on colleagues or IT to pull data. Waits days or weeks for reports. Gets conflicting numbers from different sources.',
        capabilities: [
          { icon: 'no', text: 'No self-service access to data' },
          { icon: 'no', text: 'No shared definitions \u2014 "what is a customer?" depends on who you ask' },
          { icon: 'no', text: 'No single source of truth for KPIs' },
          { icon: 'partial', text: 'Creates own Excel reports from emailed data extracts' },
          { icon: 'no', text: 'Cannot combine data across departments' },
        ],
        tools: ['Excel', 'Email', 'SharePoint'],
      },
      {
        desc: 'Wants to build data-driven solutions but ends up creating shadow IT. No shared platform or data products to build on.',
        capabilities: [
          { icon: 'no', text: 'No governed platform for prototyping or building' },
          { icon: 'no', text: 'No access to AI/ML capabilities' },
          { icon: 'partial', text: 'Builds own pipelines in isolated tools' },
          { icon: 'no', text: 'No shared feature store or data catalogue' },
          { icon: 'no', text: 'Cannot operationalise models \u2014 relies on IT for deployment' },
        ],
        tools: ['Excel', 'Local Python', 'Shadow IT tools'],
      },
      {
        desc: 'Builds applications that need data, but must integrate with fragmented sources. No unified data layer to consume from.',
        capabilities: [
          { icon: 'no', text: 'No unified API or data product layer' },
          { icon: 'partial', text: 'Point-to-point integrations with individual data sources' },
          { icon: 'no', text: 'No common data model \u2014 each system has different schemas' },
          { icon: 'no', text: 'No real-time data access for applications' },
          { icon: 'partial', text: 'Builds own data transformation logic per project' },
        ],
        tools: ['Custom APIs', 'Direct DB queries', 'FTP transfers'],
      },
      {
        desc: 'Maintains separate platforms across teams. Data engineers duplicate pipelines. ML engineers lack shared infrastructure.',
        capabilities: [
          { icon: 'partial', text: 'Separate cloud platforms per team (no consolidation)' },
          { icon: 'no', text: 'No shared ML platform or feature store' },
          { icon: 'no', text: 'No common data governance or quality framework' },
          { icon: 'partial', text: 'Builds pipelines, but duplicates effort across teams' },
          { icon: 'no', text: 'No standardised deployment or monitoring of ML models' },
        ],
        tools: ['Multiple clouds', 'Team-specific DBs', 'Ad-hoc notebooks'],
      },
    ],
  },
  {
    label: 'FASE 2 \u00B7 INTERMEDIATE',
    tabLabel: 'Intermediate',
    title: 'Consolidation & Foundation',
    subtitle: 'A shared platform is emerging around Databricks. Master data model is being established with first L1 entities (Kunde, Forbruger, Indhold, Produkt). The Hub is forming \u2014 governance basics and central services are taking shape.',
    personas: [
      {
        desc: 'Starting to get self-service dashboards. Power BI connects to the shared platform. Still some Excel, but data is getting more consistent.',
        capabilities: [
          { icon: 'yes', text: 'Power BI dashboards connected to shared Databricks data' },
          { icon: 'partial', text: 'Shared definitions emerging \u2014 but not yet enforced everywhere' },
          { icon: 'partial', text: 'Some self-service, but still needs help for complex queries' },
          { icon: 'yes', text: 'Data catalogue available \u2014 can discover what data exists' },
          { icon: 'partial', text: 'Cross-department data combining possible for priority domains' },
        ],
        tools: ['Power BI', 'Excel', 'Data Catalogue'],
      },
      {
        desc: 'Can now access shared data and initial AI tooling. Databricks notebooks available for prototyping. Governance gives guardrails.',
        capabilities: [
          { icon: 'yes', text: 'Databricks notebooks for data exploration and prototyping' },
          { icon: 'partial', text: 'AI/ML capabilities becoming available via shared platform' },
          { icon: 'partial', text: 'Can build on governed data \u2014 but not all domains onboarded yet' },
          { icon: 'yes', text: 'AI use case approval process emerging (yellow-zone governance)' },
          { icon: 'no', text: 'Still limited ability to deploy to production autonomously' },
        ],
        tools: ['Databricks', 'Power BI', 'CoPilot'],
      },
      {
        desc: 'Shared data layer forming. Can integrate with curated data products from the platform instead of point-to-point connections.',
        capabilities: [
          { icon: 'yes', text: 'Data products available via APIs from shared platform' },
          { icon: 'partial', text: 'Adobe Experience Platform providing unified customer data' },
          { icon: 'partial', text: 'Common data model partially rolled out \u2014 priority entities first' },
          { icon: 'yes', text: 'Real-time customer data accessible for key use cases' },
          { icon: 'partial', text: 'Reducing point-to-point integrations, some legacy remains' },
        ],
        tools: ['Databricks APIs', 'Adobe Experience Platform', 'Power BI'],
      },
      {
        desc: 'Migrating to shared Databricks platform. ML platform consolidating. Hub team providing core infrastructure and engineering support.',
        capabilities: [
          { icon: 'yes', text: 'Single Databricks platform for data engineering and ML' },
          { icon: 'partial', text: 'Shared feature store forming \u2014 initial ML models migrated' },
          { icon: 'yes', text: 'Data governance framework established with ownership model' },
          { icon: 'partial', text: 'CI/CD pipelines for model deployment being standardised' },
          { icon: 'yes', text: 'Hub team providing advisory and engineering support to spokes' },
        ],
        tools: ['Databricks', 'ML Platform', 'CI/CD Pipelines', 'Adobe CDP'],
      },
    ],
  },
  {
    label: 'FASE 3 \u00B7 TARGET STATE',
    tabLabel: 'Target State',
    title: 'Hub & Spoke Operating Model',
    subtitle: 'Unified platform with clear spoke archetypes. Common ontology enforced via master data model. Self-service at scale. Governed AI with clear guardrails. Value-driven prioritisation of all data & AI initiatives.',
    personas: [
      {
        desc: 'Full self-service via governed tools. Trusted data with shared definitions. Can answer own questions without waiting for IT.',
        capabilities: [
          { icon: 'yes', text: 'Self-service Power BI & Excel connected to governed data products' },
          { icon: 'yes', text: 'Shared definitions enforced \u2014 "customer" means the same everywhere' },
          { icon: 'yes', text: 'Data catalogue with full discoverability and lineage' },
          { icon: 'yes', text: 'Cross-department data combining via common ontology' },
          { icon: 'yes', text: 'AI-powered insights (CoPilot, natural language queries)' },
        ],
        tools: ['Power BI', 'Excel', 'CoPilot', 'Data Catalogue'],
        spoke: 'Spoke "lille" \u2014 consumes governed data products',
      },
      {
        desc: 'Builds data products and AI solutions on the shared platform within governed sandbox. Can prototype and deploy within guardrails.',
        capabilities: [
          { icon: 'yes', text: 'Databricks workspace for building data products & ML models' },
          { icon: 'yes', text: 'AI platform capabilities: agents, automation, GenAI tools' },
          { icon: 'yes', text: 'Governed sandbox with clear risk framework for AI use cases' },
          { icon: 'yes', text: 'Can deploy models to production via standardised pipelines' },
          { icon: 'yes', text: 'Shared feature store and data products to build upon' },
        ],
        tools: ['Databricks', 'AI Platform', 'CoPilot', 'Adobe Experience Platform'],
        spoke: 'Spoke "mellem" \u2014 builds within governed framework',
      },
      {
        desc: 'Consumes curated data products and customer data via governed APIs. Real-time data from Adobe Experience Platform fuels applications.',
        capabilities: [
          { icon: 'yes', text: 'Governed APIs exposing curated data products' },
          { icon: 'yes', text: 'Adobe Experience Platform: unified customer 360 view' },
          { icon: 'yes', text: 'Common data model ensures consistent schemas across apps' },
          { icon: 'yes', text: 'Real-time event streaming for personalisation & recommendations' },
          { icon: 'yes', text: 'ML model predictions available as API services' },
        ],
        tools: ['Databricks APIs', 'Adobe Experience Platform', 'Event Streaming'],
        spoke: 'Spoke "lille/mellem" \u2014 integrates governed data products',
      },
      {
        desc: 'Owns and operates the platform, ML models, and data products. You-build-it-you-run-it within clear governance. Drives capability for all spokes.',
        capabilities: [
          { icon: 'yes', text: 'Full Databricks platform: lakehouse, ML, feature store, Unity Catalog' },
          { icon: 'yes', text: 'End-to-end ML lifecycle: develop, deploy, monitor, retrain' },
          { icon: 'yes', text: 'Data governance enforced via tooling (lineage, quality, ownership)' },
          { icon: 'yes', text: 'AI governance: risk model, use-case portfolio, guardrails' },
          { icon: 'yes', text: 'Hub services: advisory, engineering, enablement, platform ops' },
        ],
        tools: ['Databricks Unity Catalog', 'ML Platform', 'Adobe CDP', 'Governance Tooling'],
        spoke: 'Spoke "stor" + Hub \u2014 owns platform, governs all',
      },
    ],
  },
]

// ────────────────────────────────────────────
// POSITIONING
// ────────────────────────────────────────────

function getPhase0Positions(cx, cy) {
  return {
    personas: [
      { x: cx - 300, y: cy - 100 },
      { x: cx + 260, y: cy - 70 },
      { x: cx - 200, y: cy + 120 },
      { x: cx + 320, y: cy + 130 },
    ],
    silos: [
      { x: cx - 380, y: cy - 10 },
      { x: cx - 120, y: cy - 160 },
      { x: cx + 100, y: cy - 155 },
      { x: cx + 400, y: cy + 20 },
      { x: cx - 260, y: cy + 40 },
      { x: cx + 60, y: cy + 170 },
      { x: cx + 190, y: cy + 50 },
      { x: cx - 60, y: cy + 60 },
      { x: cx - 50, y: cy - 50 },
      { x: cx + 150, y: cy - 20 },
    ],
    hub: null,
  }
}

function getPhase1Positions(cx, cy) {
  return {
    personas: [
      { x: cx - 260, y: cy - 140 },
      { x: cx + 260, y: cy - 140 },
      { x: cx - 260, y: cy + 140 },
      { x: cx + 260, y: cy + 140 },
    ],
    silos: [
      { x: cx - 400, y: cy - 50 },
      { x: cx - 370, y: cy + 60 },
      { x: cx + 400, y: cy - 50 },
      { x: cx + 370, y: cy + 60 },
    ],
    hub: { x: cx, y: cy, r: 60, opacity: 0.7 },
  }
}

function getPhase2Positions(cx, cy) {
  const r = 210
  return {
    personas: [
      { x: cx + r * Math.cos(-Math.PI * 0.75), y: cy + r * Math.sin(-Math.PI * 0.75) },
      { x: cx + r * Math.cos(-Math.PI * 0.25), y: cy + r * Math.sin(-Math.PI * 0.25) },
      { x: cx + r * Math.cos(Math.PI * 0.75), y: cy + r * Math.sin(Math.PI * 0.75) },
      { x: cx + r * Math.cos(Math.PI * 0.25), y: cy + r * Math.sin(Math.PI * 0.25) },
    ],
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
// CAPABILITY CARD
// ────────────────────────────────────────────

function PersonaCard({ persona, detail, colorIndex }) {
  const iconMap = { yes: '\u2713', no: '\u2717', partial: '\u25CB' }
  const classMap = { yes: 'cap-yes', no: 'cap-no', partial: 'cap-partial' }

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
// APP
// ────────────────────────────────────────────

function App() {
  const [phase, setPhase] = useState(0)

  const advance = useCallback(() => {
    setPhase(p => (p + 1) % 3)
  }, [])

  const cx = 550, cy = 250
  const positions = phase === 0
    ? getPhase0Positions(cx, cy)
    : phase === 1
      ? getPhase1Positions(cx, cy)
      : getPhase2Positions(cx, cy)

  const data = PHASE_DETAILS[phase]
  const bubbleR = 48

  return (
    <div className="app">
      {/* Tab navigation */}
      <nav className="phase-nav">
        {PHASE_DETAILS.map((p, i) => (
          <div
            key={i}
            className={`phase-tab tab-${i} ${phase === i ? 'active' : ''}`}
            onClick={() => setPhase(i)}
          >
            <div className="phase-tab-label">{i === 0 ? 'FASE 1' : i === 1 ? 'FASE 2' : 'FASE 3'}</div>
            <div className="phase-tab-title">{p.tabLabel}</div>
          </div>
        ))}
      </nav>

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
            <svg className="viz-svg" viewBox="0 0 1100 500">
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
              {positions.hub && positions.personas.map((p, i) => (
                <line
                  key={`conn-${i}`}
                  x1={positions.hub.x} y1={positions.hub.y}
                  x2={p.x} y2={p.y}
                  stroke={phase === 2 ? PERSONAS[i].color + '50' : '#ffffff12'}
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
                    {phase === 1 ? 'Data Foundation' : 'Data Foundation'}
                  </text>
                  <text x={positions.hub.x} y={positions.hub.y + 14} className="hub-sublabel" fontSize="9" opacity={positions.hub.opacity}>
                    {phase === 1 ? '(forming...)' : 'Platform \u00B7 Governance \u00B7 AI'}
                  </text>
                  {phase === 2 && (
                    <>
                      <text x={positions.hub.x} y={positions.hub.y + 26} className="hub-sublabel" fontSize="9" fill="#10b981">
                        Self-Service \u00B7 Enablement
                      </text>
                    </>
                  )}
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
                    {SILOS[i]}
                  </text>
                </g>
              ))}

              {/* Governance ring (phase 2) */}
              {phase === 2 && (
                <g>
                  <circle cx={cx} cy={cy} r={280} fill="none" stroke="#ffffff06" strokeWidth={1} strokeDasharray="6,10" />
                  <text x={cx} y={cy - 288} textAnchor="middle" fontSize="9.5" fill="#ffffff25" fontWeight="600" letterSpacing="1.5">
                    GOVERNANCE &middot; COMMON ONTOLOGY &middot; MASTER DATA MODEL
                  </text>
                  <text x={cx} y={cy + 298} textAnchor="middle" fontSize="9.5" fill="#ffffff25" fontWeight="600" letterSpacing="1.5">
                    DATABRICKS &middot; ADOBE EXPERIENCE PLATFORM &middot; SHARED SERVICES
                  </text>
                </g>
              )}

              {/* Personas */}
              {PERSONAS.map((persona, i) => {
                const pos = positions.personas[i]
                return (
                  <g key={persona.id}>
                    {/* Outer glow */}
                    <circle cx={pos.x} cy={pos.y} r={bubbleR + 12} fill={persona.color + '08'} />
                    {/* Main circle */}
                    <circle
                      cx={pos.x} cy={pos.y} r={bubbleR}
                      fill={persona.color + '12'}
                      stroke={persona.color}
                      strokeWidth={2}
                    />
                    {/* Icon */}
                    <text x={pos.x} y={pos.y - 12} textAnchor="middle" fontSize="20" dominantBaseline="central">
                      {persona.icon}
                    </text>
                    {/* Label */}
                    <text x={pos.x} y={pos.y + 12} className="persona-label" fontSize="11">
                      {persona.label}
                    </text>
                    <text x={pos.x} y={pos.y + 24} className="persona-sublabel" fontSize="8.5">
                      {persona.sublabel}
                    </text>
                    {/* Spoke label (phase 2) */}
                    {phase === 2 && (
                      <text x={pos.x} y={pos.y + 36} fontSize="8" fontWeight="700"
                        fill={persona.color} textAnchor="middle" fontFamily="var(--sans)">
                        {i === 0 ? 'SPOKE LILLE' : i === 1 ? 'SPOKE MELLEM' : i === 2 ? 'SPOKE LILLE/MELLEM' : 'SPOKE STOR'}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          </div>
        </div>

        {/* Bottom panel: persona capability cards */}
        <div className="bottom-panel">
          <div className="tech-strip">
            <span className="tech-strip-label">Platform:</span>
            <div className="tech-strip-items">
              <span className="tech-strip-item">Databricks</span>
              <span className="tech-strip-item">Adobe Experience Platform</span>
              <span className="tech-strip-item">Power BI</span>
              <span className="tech-strip-item">Excel</span>
              <span className="tech-strip-item">Microsoft CoPilot</span>
            </div>
          </div>
          <div className="persona-grid">
            {PERSONAS.map((persona, i) => (
              <PersonaCard
                key={persona.id}
                persona={persona}
                detail={data.personas[i]}
                colorIndex={i}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Click hint */}
      <div className="bottom-bar">
        <span className="click-hint">
          Click anywhere to advance &middot; {data.label}
        </span>
      </div>
    </div>
  )
}

export default App
