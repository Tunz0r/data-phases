// ────────────────────────────────────────────
// TRANSLATIONS — EN / DA
// ────────────────────────────────────────────

const PERSONAS_EN = [
  { id: 'nonit-dep', label: 'Data Consumer', sublabel: 'Non-IT \u2014 needs data to do their job', color: '#3b82f6', icon: '\u{1F4CA}' },
  { id: 'nonit-builder', label: 'Citizen Developer', sublabel: 'Non-IT \u2014 builds solutions with data & AI', color: '#8b5cf6', icon: '\u{1F9E0}' },
  { id: 'it-dep', label: 'IT Data Consumer', sublabel: 'IT \u2014 builds apps that need data', color: '#06b6d4', icon: '\u{1F4BB}' },
  { id: 'it-pro', label: 'Data & AI Professional', sublabel: 'IT \u2014 data engineering, ML, AI specialist', color: '#10b981', icon: '\u{2699}\u{FE0F}' },
  { id: 'everyday-ai', label: 'Everyday AI Builder', sublabel: 'Non-IT \u2014 builds personal AI tools', color: '#f59e0b', icon: '\u{2728}' },
  { id: 'ai-engineer', label: 'AI Platform Engineer', sublabel: 'IT \u2014 builds AI infrastructure for others', color: '#ec4899', icon: '\u{1F916}' },
]

const PERSONAS_DA = [
  { id: 'nonit-dep', label: 'Dataforbruger', sublabel: 'Ikke-IT \u2014 har brug for data i sit arbejde', color: '#3b82f6', icon: '\u{1F4CA}' },
  { id: 'nonit-builder', label: 'Borgerudvikler', sublabel: 'Ikke-IT \u2014 bygger l\u00f8sninger med data & AI', color: '#8b5cf6', icon: '\u{1F9E0}' },
  { id: 'it-dep', label: 'IT Dataforbruger', sublabel: 'IT \u2014 bygger apps der bruger data', color: '#06b6d4', icon: '\u{1F4BB}' },
  { id: 'it-pro', label: 'Data & AI Specialist', sublabel: 'IT \u2014 data engineering, ML, AI specialist', color: '#10b981', icon: '\u{2699}\u{FE0F}' },
  { id: 'everyday-ai', label: 'Hverdags AI-bygger', sublabel: 'Ikke-IT \u2014 bygger personlige AI-v\u00e6rkt\u00f8jer', color: '#f59e0b', icon: '\u{2728}' },
  { id: 'ai-engineer', label: 'AI Platform Ingeni\u00f8r', sublabel: 'IT \u2014 bygger AI-infrastruktur for andre', color: '#ec4899', icon: '\u{1F916}' },
]

const SILOS = [
  'Ad-Hoc Excel', 'Local Database', 'Own Pipeline', 'Separate BI Tool',
  'Shadow IT', 'Manual Reports', 'Siloed API', 'Dept. Data Lake',
  'Private Notebooks', 'Team SharePoint',
]

const MATURITY_DIMS_EN = [
  { key: 'access', label: 'Data Access' },
  { key: 'governance', label: 'Governance' },
  { key: 'ai', label: 'AI & Analytics' },
  { key: 'value', label: 'Value Realisation' },
]

const MATURITY_DIMS_DA = [
  { key: 'access', label: 'Datatilgang' },
  { key: 'governance', label: 'Governance' },
  { key: 'ai', label: 'AI & Analyse' },
  { key: 'value', label: 'V\u00e6rdirealisering' },
]

// ── PHASE DETAILS ──

const PHASES_EN = [
  {
    label: 'FASE 1 \u00B7 AS-IS',
    tabLabel: 'As-Is',
    title: 'The Fragmented Landscape',
    subtitle: 'No shared language for data. Each team defines \u201ccustomer\u201d, \u201ccontent\u201d, and \u201cproduct\u201d differently. Data sits in silos, governance is ad-hoc, and everyone builds their own solutions. Personalisation is one-size-fits-all \u2014 we have no complete view of our customers and no shared way to tailor their experience.',
    personas: [
      {
        desc: 'Relies on colleagues or IT to pull data. Waits days or weeks for reports. Gets conflicting numbers from different sources.',
        capabilities: [
          { icon: 'no', text: 'No self-service access to data' },
          { icon: 'no', text: 'No shared definitions \u2014 \u201cwhat is a customer?\u201d depends on who you ask' },
          { icon: 'no', text: 'No single source of truth for KPIs' },
          { icon: 'partial', text: 'Creates own Excel reports from emailed data extracts' },
          { icon: 'no', text: 'Cannot combine data across departments' },
        ],
        tools: ['Excel', 'Email', 'SharePoint'],
        maturity: { access: 1, governance: 1, ai: 1, value: 1 },
      },
      {
        desc: 'Wants to build data-driven solutions but ends up creating shadow IT. No shared platform or reusable data to build on.',
        capabilities: [
          { icon: 'no', text: 'No approved platform for prototyping or building' },
          { icon: 'no', text: 'No access to AI or machine learning capabilities' },
          { icon: 'partial', text: 'Builds own data flows in isolated tools' },
          { icon: 'no', text: 'No shared catalogue \u2014 can\u2019t find what data exists' },
          { icon: 'no', text: 'Can\u2019t put solutions into production \u2014 relies on IT for deployment' },
        ],
        tools: ['Excel', 'Local Python', 'Shadow IT tools'],
        maturity: { access: 1.5, governance: 1, ai: 1, value: 1 },
      },
      {
        desc: 'Builds applications that need data, but must connect to fragmented sources one by one. No unified data layer, no complete customer view, and no shared personalisation logic.',
        capabilities: [
          { icon: 'no', text: 'No unified way to access data \u2014 every app connects differently' },
          { icon: 'partial', text: 'One-off connections to individual data sources' },
          { icon: 'no', text: 'No common data model \u2014 each system defines things differently' },
          { icon: 'no', text: 'No complete customer view or content overview across systems' },
          { icon: 'no', text: 'No shared personalisation \u2014 each channel (Play, tv2.dk, etc.) builds its own' },
        ],
        tools: ['Custom APIs', 'Direct DB queries', 'FTP transfers'],
        maturity: { access: 1.5, governance: 1, ai: 1, value: 1.5 },
      },
      {
        desc: 'Maintains separate platforms across teams. Data engineers duplicate work. AI/ML engineers lack shared infrastructure.',
        capabilities: [
          { icon: 'partial', text: 'Separate cloud platforms per team \u2014 no consolidation' },
          { icon: 'no', text: 'No shared AI/ML platform or reusable data library' },
          { icon: 'no', text: 'No common framework for data quality or ownership' },
          { icon: 'partial', text: 'Builds data flows, but duplicates effort across teams' },
          { icon: 'no', text: 'No standard way to deploy or monitor AI models in production' },
        ],
        tools: ['Multiple clouds', 'Team-specific DBs', 'Ad-hoc notebooks'],
        maturity: { access: 2, governance: 1, ai: 2, value: 1 },
      },
      {
        desc: 'Interested in AI but no tools or guidance. Uses free ChatGPT on personal devices. No way to build anything that connects to TV 2 data or processes.',
        capabilities: [
          { icon: 'partial', text: 'Uses CoPilot for basic writing and email assistance' },
          { icon: 'no', text: 'No ability to build AI workflows or automations' },
          { icon: 'no', text: 'No access to TV 2 data from AI tools' },
          { icon: 'no', text: 'No guidelines for what is allowed vs. not' },
          { icon: 'no', text: 'No way to share useful AI solutions with colleagues' },
        ],
        tools: ['CoPilot (basic)', 'Free ChatGPT'],
        maturity: { access: 1, governance: 0.5, ai: 1, value: 0.5 },
      },
      {
        desc: 'AI capabilities scattered across teams. No shared agent framework or platform. Each team experiments with different LLM providers and approaches.',
        capabilities: [
          { icon: 'partial', text: 'Some teams experimenting with AI/LLM integration' },
          { icon: 'no', text: 'No shared AI platform or agent framework' },
          { icon: 'no', text: 'No standardised approach to building AI solutions' },
          { icon: 'no', text: 'No AI governance or risk assessment process' },
          { icon: 'no', text: 'No reusable components \u2014 every AI project starts from scratch' },
        ],
        tools: ['Ad-hoc LLM APIs', 'Team experiments', 'No shared infra'],
        maturity: { access: 1.5, governance: 0.5, ai: 1.5, value: 0.5 },
      },
    ],
  },
  {
    label: 'FASE 2 \u00B7 INTERMEDIATE',
    tabLabel: 'Intermediate',
    title: 'Consolidation & Foundation',
    subtitle: 'A shared data platform (Databricks) is emerging. We are agreeing on what \u201ccustomer\u201d, \u201ccontent\u201d, and \u201cproduct\u201d mean across TV 2. A central Hub team is forming to provide governance, shared services, and a unified customer view. The foundation for personalisation is being laid. The platform begins operating at two speeds: an analytics tempo for batch reporting and a forming operational tempo for near-real-time behaviour.',
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
        maturity: { access: 2.5, governance: 2, ai: 1.5, value: 2 },
        tempo: 'analytics',
      },
      {
        desc: 'Can now access shared data and initial AI tooling. Databricks notebooks available for prototyping. Governance gives guardrails.',
        capabilities: [
          { icon: 'yes', text: 'Databricks notebooks for data exploration and prototyping' },
          { icon: 'partial', text: 'AI and machine learning capabilities becoming available' },
          { icon: 'partial', text: 'Can build on shared data \u2014 but not all areas connected yet' },
          { icon: 'yes', text: 'Approval process for AI use cases emerging (risk-zone model)' },
          { icon: 'no', text: 'Still limited ability to deploy to production autonomously' },
        ],
        tools: ['Databricks', 'Power BI', 'CoPilot'],
        maturity: { access: 2.5, governance: 2, ai: 2, value: 1.5 },
        tempo: 'analytics',
      },
      {
        desc: 'Shared data layer forming. A unified customer view is being established. The personalisation platform is enabling initial segment-based targeting.',
        capabilities: [
          { icon: 'yes', text: 'Reusable datasets available from the shared platform' },
          { icon: 'yes', text: 'Unified customer view \u2014 one place to see the full customer picture' },
          { icon: 'partial', text: 'Personalisation platform starting with audience segments' },
          { icon: 'partial', text: 'Common data model partially rolled out \u2014 priority areas first' },
          { icon: 'partial', text: 'Reducing one-off connections, content metadata being consolidated' },
        ],
        tools: ['Databricks APIs', 'Adobe Experience Platform', 'Power BI'],
        maturity: { access: 2.5, governance: 2, ai: 1.5, value: 2 },
        tempo: 'both',
      },
      {
        desc: 'Migrating to shared Databricks platform. AI/ML infrastructure consolidating. Hub team providing core infrastructure and engineering support to all teams.',
        capabilities: [
          { icon: 'yes', text: 'Single Databricks platform for data engineering and AI/ML' },
          { icon: 'partial', text: 'Shared library of reusable AI-ready data forming' },
          { icon: 'yes', text: 'Data governance framework established \u2014 clear ownership model' },
          { icon: 'partial', text: 'Automated deployment processes for AI models being standardised' },
          { icon: 'yes', text: 'Hub team providing advisory and engineering support to spokes' },
        ],
        tools: ['Databricks', 'AI/ML Platform', 'Deployment Automation', 'Adobe CDP'],
        maturity: { access: 3, governance: 2.5, ai: 2.5, value: 2 },
        tempo: 'both',
      },
      {
        desc: 'CoPilot is rolled out broadly. AI guidelines published. Can build simple personal agents and automations within approved tools \u2014 but only in \u201csikre zoner\u201d.',
        capabilities: [
          { icon: 'yes', text: 'CoPilot with full integration \u2014 email, documents, meetings' },
          { icon: 'partial', text: 'Can build personal CoPilot agents for own workflows' },
          { icon: 'yes', text: 'Clear AI guidelines \u2014 knows what is allowed in \u201csikre zoner\u201d' },
          { icon: 'partial', text: 'Vibe coding with approved browser-based tools' },
          { icon: 'no', text: 'Cannot yet connect AI tools to governed TV 2 data' },
        ],
        tools: ['CoPilot', 'CoPilot Agents', 'Approved AI Tools'],
        maturity: { access: 2, governance: 2, ai: 2, value: 1.5 },
      },
      {
        desc: 'Building out AI platform capabilities on Databricks. Initial agent framework emerging. Starting to standardise LLM integration patterns.',
        capabilities: [
          { icon: 'yes', text: 'AI platform layer on Databricks under development' },
          { icon: 'partial', text: 'Initial agent framework \u2014 first internal agents in pilot' },
          { icon: 'partial', text: 'LLM integration patterns being standardised' },
          { icon: 'yes', text: 'AI risk model and yellow-zone governance for new use cases' },
          { icon: 'no', text: 'Agent factory not yet production-ready for spoke teams' },
        ],
        tools: ['Databricks', 'LLM APIs', 'Agent Framework (pilot)', 'AI Governance'],
        maturity: { access: 2.5, governance: 2.5, ai: 2.5, value: 2 },
        tempo: 'both',
      },
    ],
  },
  {
    label: 'FASE 3 \u00B7 TARGET STATE',
    tabLabel: 'Target State',
    title: 'Hub & Spoke Operating Model',
    subtitle: 'One shared platform. One shared language for data. Everyone can access the data they need through self-service tools. AI is governed with clear rules for what\u2019s allowed. Every data & AI initiative is tied to measurable business value. Personalisation is user-specific and works consistently across all TV 2 channels. The platform operates at two speeds: an analytics tempo for batch analysis and dashboards, and an operational tempo for near-real-time streaming, viewer behaviour, and personalisation decisions.',
    personas: [
      {
        desc: 'Full self-service via governed tools. Trusted data with shared definitions. Can answer own questions without waiting for IT.',
        capabilities: [
          { icon: 'yes', text: 'Self-service Power BI & Excel connected to governed data products' },
          { icon: 'yes', text: 'Shared definitions enforced \u2014 \u201ccustomer\u201d means the same everywhere' },
          { icon: 'yes', text: 'Data catalogue with full discoverability and lineage' },
          { icon: 'yes', text: 'Cross-department data combining via common ontology' },
          { icon: 'yes', text: 'AI-powered insights (CoPilot, natural language queries)' },
        ],
        tools: ['Power BI', 'Excel', 'CoPilot', 'Data Catalogue'],
        spoke: 'Spoke \u201clille\u201d (small) \u2014 uses shared data via self-service tools',
        maturity: { access: 3.5, governance: 3, ai: 3, value: 3 },
        tempo: 'analytics',
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
        spoke: 'Spoke \u201cmellem\u201d (medium) \u2014 builds solutions within guardrails',
        maturity: { access: 3.5, governance: 3, ai: 3.5, value: 3 },
        tempo: 'analytics',
      },
      {
        desc: 'Consumes high-quality, shared datasets and a complete customer view. Personalisation decisions are centralised \u2014 all channels (Play, tv2.dk, etc.) get consistent, tailored experiences.',
        capabilities: [
          { icon: 'yes', text: 'Shared datasets and a unified customer view available via standard interfaces' },
          { icon: 'yes', text: 'Personalisation platform: tailored experiences per user in real time' },
          { icon: 'yes', text: 'Content delivery works consistently across Play, tv2.dk, Sport, Vejr' },
          { icon: 'yes', text: 'Common data model ensures the same definitions across all channels' },
          { icon: 'yes', text: 'AI-powered content recommendations available as ready-to-use services' },
        ],
        tools: ['Databricks APIs', 'Adobe Experience Platform', 'Event Streaming'],
        spoke: 'Spoke \u201clille/mellem\u201d \u2014 integrates shared data into applications',
        maturity: { access: 3.5, governance: 3, ai: 3, value: 3.5 },
        tempo: 'both',
      },
      {
        desc: 'Owns and operates the full data & AI platform. Drives capability for all teams. Ensures the three layers (data, personalisation decisions, channels) work together seamlessly.',
        capabilities: [
          { icon: 'yes', text: 'Full Databricks platform: data storage, AI/ML, governance tooling' },
          { icon: 'yes', text: 'Complete AI model lifecycle: develop, deploy, monitor, and improve' },
          { icon: 'yes', text: 'Data governance enforced via tooling \u2014 clear ownership, quality tracking' },
          { icon: 'yes', text: 'Architecture governance: ensures all teams follow shared standards' },
          { icon: 'yes', text: 'Hub services: advisory, engineering support, training, platform operations' },
        ],
        tools: ['Databricks Unity Catalog', 'ML Platform', 'Adobe CDP', 'Governance Tooling'],
        spoke: 'Spoke \u201cstor\u201d (large) + Hub \u2014 owns the platform, sets standards',
        maturity: { access: 4, governance: 3.5, ai: 4, value: 3 },
        tempo: 'both',
      },
      {
        desc: 'Builds internal AI tools that enhance everyday work. Personal AI assistants, workflow automations, and team-level solutions \u2014 all within safe zones (\u201csikre zoner\u201d).',
        capabilities: [
          { icon: 'yes', text: 'Builds personal AI assistants connected to TV 2 data' },
          { icon: 'yes', text: 'Workflow automations via approved low-code AI tools' },
          { icon: 'yes', text: 'Vibe coding for internal tools with controlled data access' },
          { icon: 'yes', text: 'Shares useful solutions with colleagues via internal marketplace' },
          { icon: 'yes', text: 'Clear rules: safe zones for internal use, escalation path for risky use cases' },
        ],
        tools: ['CoPilot Agents', 'AI Workspace', 'Low-Code AI', 'Vibe Coding Tools'],
        spoke: 'All teams \u2014 builds internal tools within safe zones',
        maturity: { access: 3, governance: 3, ai: 3.5, value: 3 },
      },
      {
        desc: 'Operates the AI factory. Builds and maintains reusable AI building blocks, so other teams can create AI solutions without starting from scratch.',
        capabilities: [
          { icon: 'yes', text: 'Agent factory: ready-made templates for building AI assistants at scale' },
          { icon: 'yes', text: 'AI model management with cost control and quality monitoring' },
          { icon: 'yes', text: 'Advanced AI capabilities: search over documents, model customisation, testing' },
          { icon: 'yes', text: 'Shared AI building blocks for all teams to build on' },
          { icon: 'yes', text: 'AI governance tooling: risk assessment, approval workflows, monitoring' },
        ],
        tools: ['Databricks AI', 'Agent Framework', 'AI Model Management', 'AI Governance Tooling'],
        spoke: 'Hub \u2014 builds the AI factory, enables all teams',
        maturity: { access: 4, governance: 3.5, ai: 4, value: 3.5 },
        tempo: 'operational',
      },
    ],
  },
]

const PHASES_DA = [
  {
    label: 'FASE 1 \u00B7 NUV\u00c6RENDE',
    tabLabel: 'Nuv\u00e6rende',
    title: 'Det fragmenterede landskab',
    subtitle: 'Intet f\u00e6lles sprog for data. Hvert team definerer \u201ckunde\u201d, \u201cindhold\u201d og \u201cprodukt\u201d forskelligt. Data sidder i siloer, governance er ad-hoc, og alle bygger deres egne l\u00f8sninger. Personalisering er one-size-fits-all \u2014 vi har intet samlet billede af vores kunder og ingen f\u00e6lles m\u00e5de at skr\u00e6ddersy deres oplevelse.',
    personas: [
      {
        desc: 'Afh\u00e6nger af kolleger eller IT for at f\u00e5 data. Venter dage eller uger p\u00e5 rapporter. F\u00e5r modstridende tal fra forskellige kilder.',
        capabilities: [
          { icon: 'no', text: 'Ingen selvbetjent adgang til data' },
          { icon: 'no', text: 'Ingen f\u00e6lles definitioner \u2014 \u201dhvad er en kunde?\u201d afh\u00e6nger af hvem man sp\u00f8rger' },
          { icon: 'no', text: 'Ingen single source of truth for KPI\u2019er' },
          { icon: 'partial', text: 'Laver egne Excel-rapporter fra mailede datatr\u00e6k' },
          { icon: 'no', text: 'Kan ikke kombinere data p\u00e5 tv\u00e6rs af afdelinger' },
        ],
        tools: ['Excel', 'Email', 'SharePoint'],
        maturity: { access: 1, governance: 1, ai: 1, value: 1 },
      },
      {
        desc: 'Vil gerne bygge datadrevne l\u00f8sninger, men ender med at skabe shadow IT. Ingen f\u00e6lles platform eller genbrugelige data at bygge p\u00e5.',
        capabilities: [
          { icon: 'no', text: 'Ingen godkendt platform til prototyper eller udvikling' },
          { icon: 'no', text: 'Ingen adgang til AI eller machine learning' },
          { icon: 'partial', text: 'Bygger egne dataflows i isolerede v\u00e6rkt\u00f8jer' },
          { icon: 'no', text: 'Intet f\u00e6lles katalog \u2014 kan ikke finde hvilke data der findes' },
          { icon: 'no', text: 'Kan ikke s\u00e6tte l\u00f8sninger i produktion \u2014 afh\u00e6nger af IT' },
        ],
        tools: ['Excel', 'Local Python', 'Shadow IT tools'],
        maturity: { access: 1.5, governance: 1, ai: 1, value: 1 },
      },
      {
        desc: 'Bygger applikationer der har brug for data, men skal forbinde til fragmenterede kilder \u00e9n ad gangen. Intet samlet datalag, intet komplet kundebillede og ingen f\u00e6lles personaliseringslogik.',
        capabilities: [
          { icon: 'no', text: 'Ingen samlet m\u00e5de at tilg\u00e5 data \u2014 hver app forbinder forskelligt' },
          { icon: 'partial', text: 'Enkelst\u00e5ende forbindelser til individuelle datakilder' },
          { icon: 'no', text: 'Ingen f\u00e6lles datamodel \u2014 hvert system definerer ting forskelligt' },
          { icon: 'no', text: 'Intet komplet kundebillede eller indholdsoverblik p\u00e5 tv\u00e6rs af systemer' },
          { icon: 'no', text: 'Ingen f\u00e6lles personalisering \u2014 hver kanal (Play, tv2.dk, osv.) bygger sin egen' },
        ],
        tools: ['Custom APIs', 'Direct DB queries', 'FTP transfers'],
        maturity: { access: 1.5, governance: 1, ai: 1, value: 1.5 },
      },
      {
        desc: 'Vedligeholder separate platforme p\u00e5 tv\u00e6rs af teams. Data engineers duplikerer arbejde. AI/ML-ingeni\u00f8rer mangler f\u00e6lles infrastruktur.',
        capabilities: [
          { icon: 'partial', text: 'Separate cloud-platforme per team \u2014 ingen konsolidering' },
          { icon: 'no', text: 'Ingen f\u00e6lles AI/ML-platform eller genbrugeligt databibliotek' },
          { icon: 'no', text: 'Intet f\u00e6lles framework for datakvalitet eller ejerskab' },
          { icon: 'partial', text: 'Bygger dataflows, men duplikerer indsatsen p\u00e5 tv\u00e6rs af teams' },
          { icon: 'no', text: 'Ingen standardiseret m\u00e5de at deploye eller monitorere AI-modeller i produktion' },
        ],
        tools: ['Multiple clouds', 'Team-specific DBs', 'Ad-hoc notebooks'],
        maturity: { access: 2, governance: 1, ai: 2, value: 1 },
      },
      {
        desc: 'Interesseret i AI men ingen v\u00e6rkt\u00f8jer eller vejledning. Bruger gratis ChatGPT p\u00e5 personlige enheder. Ingen mulighed for at bygge noget der forbinder til TV 2-data.',
        capabilities: [
          { icon: 'partial', text: 'Bruger CoPilot til grundl\u00e6ggende skrivning og email-hj\u00e6lp' },
          { icon: 'no', text: 'Ingen mulighed for at bygge AI-workflows eller automatiseringer' },
          { icon: 'no', text: 'Ingen adgang til TV 2-data fra AI-v\u00e6rkt\u00f8jer' },
          { icon: 'no', text: 'Ingen retningslinjer for hvad der er tilladt vs. ikke' },
          { icon: 'no', text: 'Ingen mulighed for at dele nyttige AI-l\u00f8sninger med kolleger' },
        ],
        tools: ['CoPilot (basic)', 'Free ChatGPT'],
        maturity: { access: 1, governance: 0.5, ai: 1, value: 0.5 },
      },
      {
        desc: 'AI-kapaciteter spredt p\u00e5 tv\u00e6rs af teams. Ingen f\u00e6lles agent-framework eller platform. Hvert team eksperimenterer med forskellige LLM-udbydere.',
        capabilities: [
          { icon: 'partial', text: 'Nogle teams eksperimenterer med AI/LLM-integration' },
          { icon: 'no', text: 'Ingen f\u00e6lles AI-platform eller agent-framework' },
          { icon: 'no', text: 'Ingen standardiseret tilgang til at bygge AI-l\u00f8sninger' },
          { icon: 'no', text: 'Ingen AI governance eller risikovurderingsproces' },
          { icon: 'no', text: 'Ingen genbrugelige komponenter \u2014 hvert AI-projekt starter fra bunden' },
        ],
        tools: ['Ad-hoc LLM APIs', 'Team experiments', 'No shared infra'],
        maturity: { access: 1.5, governance: 0.5, ai: 1.5, value: 0.5 },
      },
    ],
  },
  {
    label: 'FASE 2 \u00B7 MELLEMFASE',
    tabLabel: 'Mellemfase',
    title: 'Konsolidering & fundament',
    subtitle: 'En f\u00e6lles dataplatform (Databricks) er ved at tage form. Vi enes om hvad \u201ckunde\u201d, \u201cindhold\u201d og \u201cprodukt\u201d betyder p\u00e5 tv\u00e6rs af TV 2. Et centralt Hub-team er under opbygning med governance, f\u00e6lles services og et samlet kundebillede. Fundamentet for personalisering l\u00e6gges. Platformen begynder at operere i to tempi: et analyse-tempo for batch-rapportering og et kommende operationelt tempo for n\u00e6r-realtids adf\u00e6rd.',
    personas: [
      {
        desc: 'Begynder at f\u00e5 selvbetjent dashboards. Power BI forbinder til den f\u00e6lles platform. Stadig noget Excel, men data bliver mere konsistent.',
        capabilities: [
          { icon: 'yes', text: 'Power BI-dashboards forbundet til f\u00e6lles Databricks-data' },
          { icon: 'partial', text: 'F\u00e6lles definitioner begynder at tage form \u2014 men endnu ikke h\u00e5ndh\u00e6vet overalt' },
          { icon: 'partial', text: 'Noget selvbetjening, men har stadig brug for hj\u00e6lp til komplekse foresp\u00f8rgsler' },
          { icon: 'yes', text: 'Datakatalog tilg\u00e6ngeligt \u2014 kan finde hvilke data der findes' },
          { icon: 'partial', text: 'Kombination af data p\u00e5 tv\u00e6rs af afdelinger muligt for prioriterede dom\u00e6ner' },
        ],
        tools: ['Power BI', 'Excel', 'Data Catalogue'],
        maturity: { access: 2.5, governance: 2, ai: 1.5, value: 2 },
        tempo: 'analytics',
      },
      {
        desc: 'Kan nu tilg\u00e5 f\u00e6lles data og indledende AI-v\u00e6rkt\u00f8jer. Databricks-notebooks tilg\u00e6ngelige til prototyper. Governance giver rammer.',
        capabilities: [
          { icon: 'yes', text: 'Databricks-notebooks til dataudforskning og prototyper' },
          { icon: 'partial', text: 'AI og machine learning-kapaciteter begynder at blive tilg\u00e6ngelige' },
          { icon: 'partial', text: 'Kan bygge p\u00e5 f\u00e6lles data \u2014 men endnu ikke alle omr\u00e5der forbundet' },
          { icon: 'yes', text: 'Godkendelsesproces for AI use cases under opbygning (risikozone-model)' },
          { icon: 'no', text: 'Stadig begr\u00e6nset mulighed for selvst\u00e6ndigt at deploye til produktion' },
        ],
        tools: ['Databricks', 'Power BI', 'CoPilot'],
        maturity: { access: 2.5, governance: 2, ai: 2, value: 1.5 },
        tempo: 'analytics',
      },
      {
        desc: 'F\u00e6lles datalag er under opbygning. Et samlet kundebillede etableres. Personaliseringsplatformen muligg\u00f8r indledende segmentbaseret m\u00e5lretning.',
        capabilities: [
          { icon: 'yes', text: 'Genbrugelige datas\u00e6t tilg\u00e6ngelige fra den f\u00e6lles platform' },
          { icon: 'yes', text: 'Samlet kundebillede \u2014 \u00e9t sted at se det fulde kundebillede' },
          { icon: 'partial', text: 'Personaliseringsplatform starter med publikumssegmenter' },
          { icon: 'partial', text: 'F\u00e6lles datamodel delvist udrullet \u2014 prioriterede omr\u00e5der f\u00f8rst' },
          { icon: 'partial', text: 'Reducerer enkelst\u00e5ende forbindelser, indholdsmetadata konsolideres' },
        ],
        tools: ['Databricks APIs', 'Adobe Experience Platform', 'Power BI'],
        maturity: { access: 2.5, governance: 2, ai: 1.5, value: 2 },
        tempo: 'both',
      },
      {
        desc: 'Migrerer til f\u00e6lles Databricks-platform. AI/ML-infrastruktur konsolideres. Hub-teamet leverer kerne-infrastruktur og engineering-support til alle teams.',
        capabilities: [
          { icon: 'yes', text: '\u00c9n samlet Databricks-platform til data engineering og AI/ML' },
          { icon: 'partial', text: 'F\u00e6lles bibliotek af genbrugelig AI-klar data under opbygning' },
          { icon: 'yes', text: 'Data governance-framework etableret \u2014 klar ejerskabsmodel' },
          { icon: 'partial', text: 'Automatiserede deployment-processer for AI-modeller under standardisering' },
          { icon: 'yes', text: 'Hub-teamet leverer r\u00e5dgivning og engineering-support til spokes' },
        ],
        tools: ['Databricks', 'AI/ML Platform', 'Deployment Automation', 'Adobe CDP'],
        maturity: { access: 3, governance: 2.5, ai: 2.5, value: 2 },
        tempo: 'both',
      },
      {
        desc: 'CoPilot er udrullet bredt. AI-retningslinjer offentliggjort. Kan bygge simple personlige agenter og automatiseringer i godkendte v\u00e6rkt\u00f8jer \u2014 men kun i \u201csikre zoner\u201d.',
        capabilities: [
          { icon: 'yes', text: 'CoPilot med fuld integration \u2014 email, dokumenter, m\u00f8der' },
          { icon: 'partial', text: 'Kan bygge personlige CoPilot-agenter til egne workflows' },
          { icon: 'yes', text: 'Klare AI-retningslinjer \u2014 ved hvad der er tilladt i \u201csikre zoner\u201d' },
          { icon: 'partial', text: 'Vibe coding med godkendte browserbaserede v\u00e6rkt\u00f8jer' },
          { icon: 'no', text: 'Kan endnu ikke forbinde AI-v\u00e6rkt\u00f8jer til governed TV 2-data' },
        ],
        tools: ['CoPilot', 'CoPilot Agents', 'Approved AI Tools'],
        maturity: { access: 2, governance: 2, ai: 2, value: 1.5 },
      },
      {
        desc: 'Bygger AI-platformskapaciteter p\u00e5 Databricks. Indledende agent-framework tager form. Begynder at standardisere LLM-integrationsm\u00f8nstre.',
        capabilities: [
          { icon: 'yes', text: 'AI-platformslag p\u00e5 Databricks under udvikling' },
          { icon: 'partial', text: 'Indledende agent-framework \u2014 f\u00f8rste interne agenter i pilot' },
          { icon: 'partial', text: 'LLM-integrationsm\u00f8nstre under standardisering' },
          { icon: 'yes', text: 'AI-risikomodel og gul-zone governance for nye use cases' },
          { icon: 'no', text: 'Agent factory endnu ikke produktionsklar for spoke-teams' },
        ],
        tools: ['Databricks', 'LLM APIs', 'Agent Framework (pilot)', 'AI Governance'],
        maturity: { access: 2.5, governance: 2.5, ai: 2.5, value: 2 },
        tempo: 'both',
      },
    ],
  },
  {
    label: 'FASE 3 \u00B7 M\u00c5LTILSTAND',
    tabLabel: 'M\u00e5ltilstand',
    title: 'Hub & Spoke driftsmodel',
    subtitle: '\u00c9n f\u00e6lles platform. \u00c9t f\u00e6lles sprog for data. Alle kan tilg\u00e5 de data de har brug for via selvbetjeningsv\u00e6rkt\u00f8jer. AI er styret med klare regler for hvad der er tilladt. Enhver data & AI-indsats er koblet til m\u00e5lbar forretningsv\u00e6rdi. Personalisering er brugerspecifik og fungerer konsistent p\u00e5 tv\u00e6rs af alle TV 2-kanaler. Platformen opererer i to tempi: et analyse-tempo for batch-analyse og dashboards, og et operationelt tempo for n\u00e6r-realtids streaming, seeradf\u00e6rd og personaliseringsbeslutninger.',
    personas: [
      {
        desc: 'Fuld selvbetjening via styrede v\u00e6rkt\u00f8jer. Trov\u00e6rdige data med f\u00e6lles definitioner. Kan besvare egne sp\u00f8rgsm\u00e5l uden at vente p\u00e5 IT.',
        capabilities: [
          { icon: 'yes', text: 'Selvbetjent Power BI & Excel forbundet til styrede dataprodukter' },
          { icon: 'yes', text: 'F\u00e6lles definitioner h\u00e5ndh\u00e6vet \u2014 \u201ckunde\u201d betyder det samme overalt' },
          { icon: 'yes', text: 'Datakatalog med fuld s\u00f8gbarhed og lineage' },
          { icon: 'yes', text: 'Kombination af data p\u00e5 tv\u00e6rs af afdelinger via f\u00e6lles ontologi' },
          { icon: 'yes', text: 'AI-drevne indsigter (CoPilot, naturligt sprog-foresp\u00f8rgsler)' },
        ],
        tools: ['Power BI', 'Excel', 'CoPilot', 'Data Catalogue'],
        spoke: 'Spoke \u201clille\u201d \u2014 bruger f\u00e6lles data via selvbetjeningsv\u00e6rkt\u00f8jer',
        maturity: { access: 3.5, governance: 3, ai: 3, value: 3 },
        tempo: 'analytics',
      },
      {
        desc: 'Bygger dataprodukter og AI-l\u00f8sninger p\u00e5 den f\u00e6lles platform i styret sandbox. Kan prototypere og deploye inden for rammerne.',
        capabilities: [
          { icon: 'yes', text: 'Databricks-workspace til at bygge dataprodukter & ML-modeller' },
          { icon: 'yes', text: 'AI-platformskapaciteter: agenter, automatisering, GenAI-v\u00e6rkt\u00f8jer' },
          { icon: 'yes', text: 'Styret sandbox med klart risikoframework for AI use cases' },
          { icon: 'yes', text: 'Kan deploye modeller til produktion via standardiserede pipelines' },
          { icon: 'yes', text: 'F\u00e6lles feature store og dataprodukter at bygge videre p\u00e5' },
        ],
        tools: ['Databricks', 'AI Platform', 'CoPilot', 'Adobe Experience Platform'],
        spoke: 'Spoke \u201cmellem\u201d \u2014 bygger l\u00f8sninger inden for rammerne',
        maturity: { access: 3.5, governance: 3, ai: 3.5, value: 3 },
        tempo: 'analytics',
      },
      {
        desc: 'Forbruger dataprodukter af h\u00f8j kvalitet og et komplet kundebillede. Personaliseringsbeslutninger er centraliseret \u2014 alle kanaler f\u00e5r konsistente, skr\u00e6ddersyede oplevelser.',
        capabilities: [
          { icon: 'yes', text: 'F\u00e6lles datas\u00e6t og samlet kundebillede tilg\u00e6ngeligt via standard-interfaces' },
          { icon: 'yes', text: 'Personaliseringsplatform: skr\u00e6ddersyede oplevelser per bruger i realtid' },
          { icon: 'yes', text: 'Indholdslevering fungerer konsistent p\u00e5 tv\u00e6rs af Play, tv2.dk, Sport, Vejr' },
          { icon: 'yes', text: 'F\u00e6lles datamodel sikrer samme definitioner p\u00e5 tv\u00e6rs af alle kanaler' },
          { icon: 'yes', text: 'AI-drevne indholdsanbefalinger tilg\u00e6ngelige som f\u00e6rdige services' },
        ],
        tools: ['Databricks APIs', 'Adobe Experience Platform', 'Event Streaming'],
        spoke: 'Spoke \u201clille/mellem\u201d \u2014 integrerer f\u00e6lles data i applikationer',
        maturity: { access: 3.5, governance: 3, ai: 3, value: 3.5 },
        tempo: 'both',
      },
      {
        desc: 'Ejer og driver hele data & AI-platformen. Skaber kapacitet for alle teams. Sikrer at de tre lag fungerer problemfrit sammen.',
        capabilities: [
          { icon: 'yes', text: 'Fuld Databricks-platform: datalagring, AI/ML, governance-v\u00e6rkt\u00f8jer' },
          { icon: 'yes', text: 'Komplet AI-model livscyklus: udvikle, deploye, monitorere og forbedre' },
          { icon: 'yes', text: 'Data governance h\u00e5ndh\u00e6vet via v\u00e6rkt\u00f8jer \u2014 klart ejerskab, kvalitetssporing' },
          { icon: 'yes', text: 'Arkitektur-governance: sikrer at alle teams f\u00f8lger f\u00e6lles standarder' },
          { icon: 'yes', text: 'Hub services: r\u00e5dgivning, engineering-support, tr\u00e6ning, platformsdrift' },
        ],
        tools: ['Databricks Unity Catalog', 'ML Platform', 'Adobe CDP', 'Governance Tooling'],
        spoke: 'Spoke \u201cstor\u201d + Hub \u2014 ejer platformen, s\u00e6tter standarder',
        maturity: { access: 4, governance: 3.5, ai: 4, value: 3 },
        tempo: 'both',
      },
      {
        desc: 'Bygger interne AI-v\u00e6rkt\u00f8jer der forbedrer det daglige arbejde. Personlige AI-assistenter, workflow-automatiseringer og teaml\u00f8sninger \u2014 alt inden for sikre zoner.',
        capabilities: [
          { icon: 'yes', text: 'Bygger personlige AI-assistenter forbundet til TV 2-data' },
          { icon: 'yes', text: 'Workflow-automatiseringer via godkendte low-code AI-v\u00e6rkt\u00f8jer' },
          { icon: 'yes', text: 'Vibe coding til interne v\u00e6rkt\u00f8jer med kontrolleret dataadgang' },
          { icon: 'yes', text: 'Deler nyttige l\u00f8sninger med kolleger via intern markedsplads' },
          { icon: 'yes', text: 'Klare regler: sikre zoner til intern brug, eskaleringssti for risikable use cases' },
        ],
        tools: ['CoPilot Agents', 'AI Workspace', 'Low-Code AI', 'Vibe Coding Tools'],
        spoke: 'Alle teams \u2014 bygger interne v\u00e6rkt\u00f8jer inden for sikre zoner',
        maturity: { access: 3, governance: 3, ai: 3.5, value: 3 },
      },
      {
        desc: 'Driver AI-fabrikken. Bygger og vedligeholder genbrugelige AI-byggeblokke, s\u00e5 andre teams kan skabe AI-l\u00f8sninger uden at starte fra bunden.',
        capabilities: [
          { icon: 'yes', text: 'Agent factory: f\u00e6rdige skabeloner til at bygge AI-assistenter i stor skala' },
          { icon: 'yes', text: 'AI-modelstyring med omkostningskontrol og kvalitetsmonitorering' },
          { icon: 'yes', text: 'Avancerede AI-kapaciteter: s\u00f8gning i dokumenter, modeltilpasning, test' },
          { icon: 'yes', text: 'F\u00e6lles AI-byggeblokke som alle teams kan bygge videre p\u00e5' },
          { icon: 'yes', text: 'AI governance-v\u00e6rkt\u00f8jer: risikovurdering, godkendelsesworkflows, monitorering' },
        ],
        tools: ['Databricks AI', 'Agent Framework', 'AI Model Management', 'AI Governance Tooling'],
        spoke: 'Hub \u2014 bygger AI-fabrikken, enabler alle teams',
        maturity: { access: 4, governance: 3.5, ai: 4, value: 3.5 },
        tempo: 'operational',
      },
    ],
  },
]

// ── GLOSSARY ──

const GLOSSARY_EN = [
  { term: 'Hub', short: 'Central data & AI team', detail: 'The central Data Foundation team that owns and operates the shared data platform, AI platform, and governance framework. Provides core services to all spokes: advisory, engineering support, enablement, and platform operations. The Hub does not own the data itself \u2014 it owns the infrastructure, tooling, and standards that make data usable across TV 2.' },
  { term: 'Spoke', short: 'Domain team consuming Hub services', detail: 'A team or domain that consumes services from the Hub. Spokes range from \u201clille\u201d (consumes governed data products via self-service tools) through \u201cmellem\u201d (builds data products and ML models within governed framework) to \u201cstor\u201d (owns local tech stack and ML models with you-build-it-you-run-it responsibility).' },
  { term: 'Data Platform', short: 'Shared infrastructure for data storage, processing & serving', detail: 'The shared technical foundation (Databricks) for ingesting, storing, modelling, and serving data across TV 2. Provides lakehouse architecture, Unity Catalog for governance, feature store, and ML platform capabilities. The data platform is explicitly NOT an integration platform \u2014 it does not replace point-to-point system integrations.' },
  { term: 'Integration Platform', short: 'System-to-system connectivity (separate from Data Platform)', detail: 'The infrastructure for real-time, operational system-to-system integrations (APIs, event streaming, ETL between operational systems). Architecturally distinct from the Data Platform. If system A needs to send data to system B in real-time for operational purposes, that is an integration concern, not a data platform concern.' },
  { term: 'Master Data Model', short: 'Shared definitions for key business entities', detail: 'A common, organisation-wide model defining key business entities: Kunde, Forbruger, Indhold, Produkt, Abonnement. Establishes one shared language so \u201ccustomer\u201d means the same thing in every report, dashboard, and AI model across TV 2.' },
  { term: 'Common Ontology', short: 'Shared language and taxonomy across TV 2', detail: 'The broader shared vocabulary and classification system beyond master data. Includes agreed definitions, measures, KPIs, and business terms used consistently across departments. The semantic layer that makes data comparable and combinable.' },
  { term: 'Data Governance', short: 'Ownership, quality, and accountability for data', detail: 'The framework of policies, roles, and processes ensuring data is managed as a strategic corporate asset. Includes business ownership of data domains, quality standards, access control, lineage tracking, and compliance. Not just a Teknologi concern \u2014 business ownership of shared data is a core principle.' },
  { term: 'AI Governance', short: 'Risk framework and guardrails for AI usage', detail: 'The framework for responsible AI adoption across TV 2. Defines clear zones: \u201csikre zoner\u201d where AI use is encouraged, \u201crisikable zoner\u201d requiring case-by-case assessment, and \u201cno-go zoner\u201d. Ensures AI creates value without compromising TV 2\u2019s trov\u00e6rdighed.' },
  { term: 'Sikre Zoner', short: 'Safe zones for AI \u2014 encouraged usage', detail: 'Areas where AI can be used freely within general guidelines: internal efficiency, administrative automation, AI-assisted search, CoPilot for daily work. Non-customer-facing, low-risk applications. No case-by-case approval needed.' },
  { term: 'Self-Service', short: 'Teams access data independently via governed tools', detail: 'The ability for non-technical teams to access, explore, and analyse data without depending on IT. Enabled through Power BI, Excel, and data catalogues. Self-service does not mean ungoverned \u2014 autonomy within guardrails.' },
  { term: 'Data Product', short: 'A curated, governed, reusable dataset', detail: 'A packaged, well-documented, quality-assured dataset exposed for consumption. Has clear ownership, SLAs, schema documentation, and lineage. The primary interface between Hub and spokes.' },
  { term: 'Feature Store', short: 'Shared library of AI-ready data', detail: 'A centralised library of pre-prepared data variables for AI/ML models. Think of it as a shared ingredient store: instead of each team preparing data from scratch, they use pre-made, quality-checked \u201cfeatures\u201d.' },
  { term: 'Agent Factory', short: 'Ready-made building blocks for AI assistants', detail: 'Standardised templates and infrastructure for building AI assistants (\u201cagents\u201d). Think of it as a well-stocked workshop: teams pick from pre-built, tested, governed components instead of starting from scratch.' },
  { term: 'Value Realisation', short: 'Ensuring data & AI initiatives deliver measurable outcomes', detail: 'The discipline of linking every data and AI initiative to measurable business value. Includes a shared value vocabulary, uncompromising value consideration from early in the use-case lifecycle, and periodic evaluation.' },
  { term: 'Single Customer View', short: 'SCV \u2014 System of Record for customer 360', detail: 'A consolidated, holistic view of each customer \u2014 the System of Record for customer data. Aggregates user profile data from all sources, enforces consent guardrails, provides a Global Unique Identifier. The linchpin for personalisation.' },
  { term: 'Experience Management Platform', short: 'EMP \u2014 centralised decisioning for personalisation', detail: 'The Decision layer in TV 2\u2019s three-layer architecture (Data \u2192 Decision \u2192 Engagement). Houses content recommendations, customer journey decisioning, real-time CDP activation, segmentation, and campaign management.' },
  { term: 'Experience Orchestration Layer', short: 'EOL \u2014 headless omnichannel delivery', detail: 'A centralised runtime composition and orchestration capability for personalised, headless omnichannel content delivery. Combines channel and customer context with recommendations from the EMP.' },
  { term: 'Three-Layer Architecture', short: 'Data \u2192 Decision \u2192 Engagement', detail: 'TV 2\u2019s target architecture: (1) Data layer \u2014 Data Platform as Single Source of Truth; (2) Decision layer \u2014 Experience Management Platform; (3) Engagement layer \u2014 decoupled channels that consume from the Decision layer. Data flows vertically, never horizontally.' },
  { term: 'Design Authority', short: 'Governance body for architecture and integrations', detail: 'A cross-organisational committee anchored in Enterprise Architecture. Governs the Common Data Model, integration patterns, and architectural decisions. Key to preventing fragmentation as the ecosystem grows.' },
  { term: 'Personalisation Maturity', short: 'From one-to-all to user-specific predictive', detail: 'The progressive personalisation journey: Year 1 \u2014 segment-based, multi-channel; Year 2 \u2014 behaviour-based, batch ML; Year 3 \u2014 user-specific, real-time, omnichannel; Year 4 \u2014 full customer-centricity. Revenue target: +35% subscription uplift (~400 DKKm).' },
]

const GLOSSARY_DA = [
  { term: 'Hub', short: 'Centralt data & AI-team', detail: 'Det centrale Data Foundation-team der ejer og driver den f\u00e6lles dataplatform, AI-platform og governance-framework. Leverer kerneservices til alle spokes: r\u00e5dgivning, engineering-support, enablement og platformsdrift. Hub\u2019et ejer ikke selve dataen \u2014 det ejer infrastrukturen, v\u00e6rkt\u00f8jerne og standarderne.' },
  { term: 'Spoke', short: 'Dom\u00e6neteam der bruger Hub-services', detail: 'Et team eller dom\u00e6ne der bruger services fra Hub\u2019et. Spokes sp\u00e6nder fra \u201clille\u201d (bruger styrede dataprodukter via selvbetjening) over \u201cmellem\u201d (bygger dataprodukter og ML-modeller) til \u201cstor\u201d (ejer lokal tech-stack med you-build-it-you-run-it ansvar).' },
  { term: 'Data Platform', short: 'F\u00e6lles infrastruktur til datalagring, processering & servering', detail: 'Det f\u00e6lles tekniske fundament (Databricks) til at indsamle, lagre, modellere og servere data p\u00e5 tv\u00e6rs af TV 2. Dataplatformen er eksplicit IKKE en integrationsplatform \u2014 den erstatter ikke punkt-til-punkt systemintegrationer.' },
  { term: 'Integration Platform', short: 'System-til-system forbindelser (adskilt fra Dataplatformen)', detail: 'Infrastrukturen til realtids, operationelle system-til-system integrationer (API\u2019er, event streaming, ETL). Arkitektonisk adskilt fra Dataplatformen. Operationelle flows er et integrationsanliggende, ikke et dataplatformsanliggende.' },
  { term: 'Master Data Model', short: 'F\u00e6lles definitioner for centrale forretningsentiteter', detail: 'En f\u00e6lles, organisationsd\u00e6kkende model der definerer centrale forretningsentiteter: Kunde, Forbruger, Indhold, Produkt, Abonnement. Etablerer \u00e9t f\u00e6lles sprog s\u00e5 \u201ckunde\u201d betyder det samme overalt.' },
  { term: 'Common Ontology', short: 'F\u00e6lles sprog og taksonomi p\u00e5 tv\u00e6rs af TV 2', detail: 'Det bredere f\u00e6lles ordforr\u00e5d og klassifikationssystem ud over master data. Inkluderer aftalte definitioner, m\u00e5l, KPI\u2019er og forretningstermer. Det semantiske lag der g\u00f8r data sammenlignelig og kombinerbar.' },
  { term: 'Data Governance', short: 'Ejerskab, kvalitet og ansvarlighed for data', detail: 'Rammerne af politikker, roller og processer der sikrer at data forvaltes som et strategisk virksomhedsaktiv. Inkluderer forretningsejerskab, datakvalitetsstandarder, adgangskontrol og compliance. Ikke kun et Teknologi-anliggende.' },
  { term: 'AI Governance', short: 'Risikoframework og rammer for AI-brug', detail: 'Rammerne for ansvarlig AI-adoption. Definerer klare zoner: \u201csikre zoner\u201d hvor AI-brug opmuntres, \u201crisikable zoner\u201d der kr\u00e6ver case-by-case vurdering, og \u201cno-go zoner\u201d. Sikrer at AI skaber v\u00e6rdi uden at kompromittere TV 2\u2019s trov\u00e6rdighed.' },
  { term: 'Sikre Zoner', short: 'Sikre zoner for AI \u2014 opmuntret brug', detail: 'Omr\u00e5der hvor AI kan bruges frit inden for generelle retningslinjer: intern effektivitet, administrativ automatisering, AI-assisteret s\u00f8gning, CoPilot til dagligt arbejde. Ikke-kundevendte applikationer med lav risiko.' },
  { term: 'Self-Service', short: 'Teams tilg\u00e5r data selvst\u00e6ndigt via styrede v\u00e6rkt\u00f8jer', detail: 'Muligheden for at ikke-tekniske teams kan tilg\u00e5, udforske og analysere data uden at afh\u00e6nge af IT. Self-service betyder ikke ustyret \u2014 autonomi inden for rammer.' },
  { term: 'Data Product', short: 'Et kurateret, styret, genbrugeligt datas\u00e6t', detail: 'Et pakket, veldokumenteret, kvalitetssikret datas\u00e6t eksponeret til forbrug. Den prim\u00e6re gr\u00e6nseflade mellem Hub og spokes.' },
  { term: 'Feature Store', short: 'F\u00e6lles bibliotek af AI-klar data', detail: 'Et centraliseret bibliotek af forbehandlede datavariable til AI/ML-modeller. T\u00e6nk p\u00e5 det som en f\u00e6lles ingrediensbutik: i stedet for at hvert team tilbereder data fra bunden, bruger de f\u00e6rdiglavede, kvalitetskontrollerede \u201cfeatures\u201d.' },
  { term: 'Agent Factory', short: 'F\u00e6rdige byggeblokke til AI-assistenter', detail: 'Standardiserede skabeloner og infrastruktur til at bygge AI-assistenter (\u201cagenter\u201d). T\u00e6nk p\u00e5 det som et velforsynet v\u00e6rksted: teams v\u00e6lger fra pr\u00e6byggede, testede og styrede komponenter.' },
  { term: 'Value Realisation', short: 'Sikrer at data & AI-initiativer leverer m\u00e5lbare resultater', detail: 'Disciplinen med at koble enhver data- og AI-indsats til m\u00e5lbar forretningsv\u00e6rdi. Inkluderer et f\u00e6lles v\u00e6rdivokabular og periodisk evaluering.' },
  { term: 'Single Customer View', short: 'SCV \u2014 System of Record for kunde 360', detail: 'Et konsolideret, holistisk overblik over hver kunde \u2014 System of Record for kundedata. Aggregerer brugerprofil-data fra alle kilder, h\u00e5ndh\u00e6ver samtykke-rammer og giver en Global Unique Identifier. Omdrejningspunktet for personalisering.' },
  { term: 'Experience Management Platform', short: 'EMP \u2014 centraliseret beslutningstagning for personalisering', detail: 'Beslutningslaget i TV 2\u2019s tre-lags m\u00e5larkitektur (Data \u2192 Beslutning \u2192 Engagement). Rummer indholdsanbefalinger, kundrejse-beslutningstagning, realtids CDP-aktivering, segmentering og kampagnestyring.' },
  { term: 'Experience Orchestration Layer', short: 'EOL \u2014 headless omnichannel-levering', detail: 'En centraliseret runtime-komposition og orkestreringskapacitet til personaliseret, headless omnichannel-indholdslevering. Kombinerer kanal- og kundekontekst med anbefalinger fra EMP.' },
  { term: 'Three-Layer Architecture', short: 'Data \u2192 Beslutning \u2192 Engagement', detail: 'TV 2\u2019s m\u00e5larkitektur: (1) Datalag \u2014 Dataplatformen som Single Source of Truth; (2) Beslutningslag \u2014 Experience Management Platform; (3) Engagementlag \u2014 afkoblede kanaler. Data flyder vertikalt, aldrig horisontalt.' },
  { term: 'Design Authority', short: 'Styrende organ for arkitektur og integrationer', detail: 'Et tv\u00e6rorganisatorisk udvalg forankret i Enterprise Architecture. Styrer den f\u00e6lles datamodel, integrationsm\u00f8nstre og arkitekturbeslutninger. N\u00f8glen til at forhindre fragmentering.' },
  { term: 'Personalisation Maturity', short: 'Fra one-to-all til brugerspecifik pr\u00e6diktiv', detail: 'Den progressive personaliseringsrejse: \u00c5r 1 \u2014 segmentbaseret, multi-channel; \u00c5r 2 \u2014 adf\u00e6rdsbaseret, batch ML; \u00c5r 3 \u2014 brugerspecifik, realtid, omnichannel; \u00c5r 4 \u2014 fuld kundecentricitet. Omsm\u00e5l: +35% abonnementsopl\u00f8ft (~400 mio. DKK).' },
]

// ── VIBE CODING ──

const VIBE_DIMS_EN = [
  { key: 'internal_everyday', label: 'Internal \u00B7 Everyday' },
  { key: 'internal_gamechanging', label: 'Internal \u00B7 Game-changing' },
  { key: 'customer_everyday', label: 'Customer \u00B7 Everyday' },
  { key: 'customer_gamechanging', label: 'Customer \u00B7 Game-changing' },
]

const VIBE_DIMS_DA = [
  { key: 'internal_everyday', label: 'Internt \u00B7 Hverdag' },
  { key: 'internal_gamechanging', label: 'Internt \u00B7 Game-changing' },
  { key: 'customer_everyday', label: 'Danskerne \u00B7 Hverdag' },
  { key: 'customer_gamechanging', label: 'Danskerne \u00B7 Game-changing' },
]

const VIBE_PROFILES_EN = [
  {
    desc: 'Uses CoPilot and basic AI tools daily. Wants to automate report generation and data lookups. No coding background \u2014 vibe coding could unlock simple internal automations.',
    zone: 'sikker', zoneLabel: 'Safe zone \u2014 internal efficiency',
    scores: { internal_everyday: 4, internal_gamechanging: 1.5, customer_everyday: 0, customer_gamechanging: 0 },
    examples: [
      { icon: 'yes', text: 'Personal CoPilot agents for data summaries and email drafting' },
      { icon: 'yes', text: 'Vibe-coded dashboards and internal reporting tools' },
      { icon: 'yes', text: 'Automated meeting summaries and action item tracking' },
      { icon: 'no', text: 'Should NOT build tools that surface data to customers or public' },
      { icon: 'no', text: 'Should NOT create workflows that bypass data governance' },
    ],
    tools: ['CoPilot', 'Low-code AI tools', 'Browser-based vibe coding'],
  },
  {
    desc: 'Technical enough to build useful prototypes. Vibe coding lets them rapidly test data product ideas \u2014 but production deployment must go through governed channels.',
    zone: 'sikker', zoneLabel: 'Safe zone \u2014 prototyping & internal tools',
    scores: { internal_everyday: 4, internal_gamechanging: 3, customer_everyday: 0, customer_gamechanging: 0 },
    examples: [
      { icon: 'yes', text: 'Rapid prototyping of internal data products and ML experiments' },
      { icon: 'yes', text: 'Internal tools for team workflow automation' },
      { icon: 'no', text: 'Should NOT build anything customer-facing \u2014 even prototypes go through IT' },
      { icon: 'no', text: 'Should NOT deploy vibe-coded solutions to production without review' },
      { icon: 'no', text: 'Should NOT build customer-facing AI features outside governed pipeline' },
    ],
    tools: ['Databricks notebooks', 'CoPilot', 'Cursor/Windsurf', 'Approved AI tools'],
  },
  {
    desc: 'Builds applications professionally. Vibe coding accelerates development but output must meet existing code quality, security, and review standards.',
    zone: 'sikker', zoneLabel: 'Safe zone \u2014 internal tooling only',
    scores: { internal_everyday: 4, internal_gamechanging: 3, customer_everyday: 0, customer_gamechanging: 0 },
    examples: [
      { icon: 'yes', text: 'AI-assisted coding for internal services and tooling' },
      { icon: 'yes', text: 'Vibe coding for rapid internal application development' },
      { icon: 'no', text: 'Should NOT vibe code anything customer-facing \u2014 standard dev pipeline applies' },
      { icon: 'no', text: 'Customer-facing code must go through professional review and QA' },
      { icon: 'no', text: 'AI-generated code touching user data needs security review' },
    ],
    tools: ['CoPilot', 'Cursor/Windsurf', 'AI code assistants', 'Standard CI/CD'],
  },
  {
    desc: 'Sets the standards others follow. Responsible for ensuring vibe-coded output from all personas meets quality and governance requirements before it reaches production.',
    zone: 'risikabel', zoneLabel: 'Risk zone \u2014 high capability, high responsibility',
    scores: { internal_everyday: 4.5, internal_gamechanging: 4, customer_everyday: 3, customer_gamechanging: 4 },
    examples: [
      { icon: 'yes', text: 'AI-accelerated platform development and ML pipeline building' },
      { icon: 'yes', text: 'Building governed templates and guardrails for spoke vibe coding' },
      { icon: 'partial', text: 'Customer-facing AI with full governance, review, and monitoring' },
      { icon: 'partial', text: 'Game-changing customer AI (personalisation, recommendations) \u2014 case-by-case' },
      { icon: 'no', text: 'Must NOT bypass AI governance even with high technical capability' },
    ],
    tools: ['Full AI dev stack', 'Agent frameworks', 'LLM orchestration', 'AI Gov tooling'],
  },
  {
    desc: 'The journalist, the editor, the marketer \u2014 building personal AI tools. This is where the biggest opportunity AND the biggest risk lives. Clear guardrails are essential.',
    zone: 'sikker', zoneLabel: 'Safe zone ONLY \u2014 internal, non-customer-facing',
    scores: { internal_everyday: 4.5, internal_gamechanging: 2, customer_everyday: 0, customer_gamechanging: 0 },
    examples: [
      { icon: 'yes', text: 'Personal workflow agents \u2014 research, summaries, scheduling' },
      { icon: 'yes', text: 'Team-level tools for internal collaboration and efficiency' },
      { icon: 'yes', text: 'Vibe-coded internal dashboards and data exploration tools' },
      { icon: 'no', text: 'Must NOT build anything customer-facing or that touches customers' },
      { icon: 'no', text: 'Must NOT use AI to generate content for news or editorial output' },
    ],
    tools: ['CoPilot Agents', 'Approved low-code AI', 'Browser-based vibe coding'],
  },
  {
    desc: 'Builds the guardrails and platform that make safe vibe coding possible for everyone else. Responsible for the \u201cfactory\u201d that governs what others build.',
    zone: 'risikabel', zoneLabel: 'Risk zone \u2014 builds the safety net',
    scores: { internal_everyday: 4.5, internal_gamechanging: 4.5, customer_everyday: 3.5, customer_gamechanging: 3 },
    examples: [
      { icon: 'yes', text: 'Building governed vibe coding environments and templates' },
      { icon: 'yes', text: 'Creating sandboxed AI workspaces with data access controls' },
      { icon: 'yes', text: 'Agent factory: reusable, governed agent frameworks for all spokes' },
      { icon: 'partial', text: 'Customer-facing AI infrastructure \u2014 with full governance stack' },
      { icon: 'partial', text: 'Game-changing AI (agent-based services) \u2014 risk assessment required' },
    ],
    tools: ['Full platform stack', 'AI governance tooling', 'MCP', 'Sandbox infrastructure'],
  },
]

const VIBE_PROFILES_DA = [
  {
    desc: 'Bruger CoPilot og basale AI-v\u00e6rkt\u00f8jer dagligt. Vil automatisere rapportgenerering og dataopslag. Ingen kodebaggrund \u2014 vibe coding kan l\u00e5se op for simple interne automatiseringer.',
    zone: 'sikker', zoneLabel: 'Sikker zone \u2014 intern effektivitet',
    scores: { internal_everyday: 4, internal_gamechanging: 1.5, customer_everyday: 0, customer_gamechanging: 0 },
    examples: [
      { icon: 'yes', text: 'Personlige CoPilot-agenter til dataopsummeringer og email-udkast' },
      { icon: 'yes', text: 'Vibe-kodede dashboards og interne rapporteringsv\u00e6rkt\u00f8jer' },
      { icon: 'yes', text: 'Automatiserede m\u00f8deopsummeringer og handlingspunkt-sporing' },
      { icon: 'no', text: 'B\u00f8r IKKE bygge v\u00e6rkt\u00f8jer der viser data til kunder eller offentligheden' },
      { icon: 'no', text: 'B\u00f8r IKKE skabe workflows der omg\u00e5r data governance' },
    ],
    tools: ['CoPilot', 'Low-code AI tools', 'Browser-based vibe coding'],
  },
  {
    desc: 'Teknisk nok til at bygge brugbare prototyper. Vibe coding lader dem hurtigt teste dataprodukt-id\u00e9er \u2014 men produktion skal g\u00e5 gennem styrede kanaler.',
    zone: 'sikker', zoneLabel: 'Sikker zone \u2014 prototyper & interne v\u00e6rkt\u00f8jer',
    scores: { internal_everyday: 4, internal_gamechanging: 3, customer_everyday: 0, customer_gamechanging: 0 },
    examples: [
      { icon: 'yes', text: 'Hurtig prototyping af interne dataprodukter og ML-eksperimenter' },
      { icon: 'yes', text: 'Interne v\u00e6rkt\u00f8jer til team workflow-automatisering' },
      { icon: 'no', text: 'B\u00f8r IKKE bygge noget kundevendt \u2014 selv prototyper skal igennem IT' },
      { icon: 'no', text: 'B\u00f8r IKKE deploye vibe-kodede l\u00f8sninger til produktion uden review' },
      { icon: 'no', text: 'B\u00f8r IKKE bygge kundevendte AI-features uden for styret pipeline' },
    ],
    tools: ['Databricks notebooks', 'CoPilot', 'Cursor/Windsurf', 'Approved AI tools'],
  },
  {
    desc: 'Bygger applikationer professionelt. Vibe coding accelererer udvikling, men output skal leve op til eksisterende kodekvalitet, sikkerhed og review-standarder.',
    zone: 'sikker', zoneLabel: 'Sikker zone \u2014 kun internt v\u00e6rkt\u00f8j',
    scores: { internal_everyday: 4, internal_gamechanging: 3, customer_everyday: 0, customer_gamechanging: 0 },
    examples: [
      { icon: 'yes', text: 'AI-assisteret kodning til interne services og v\u00e6rkt\u00f8jer' },
      { icon: 'yes', text: 'Vibe coding til hurtig intern applikationsudvikling' },
      { icon: 'no', text: 'B\u00f8r IKKE vibe-kode noget kundevendt \u2014 standard dev-pipeline g\u00e6lder' },
      { icon: 'no', text: 'Kundevendt kode skal igennem professionelt review og QA' },
      { icon: 'no', text: 'AI-genereret kode der r\u00f8rer brugerdata kr\u00e6ver sikkerhedsreview' },
    ],
    tools: ['CoPilot', 'Cursor/Windsurf', 'AI code assistants', 'Standard CI/CD'],
  },
  {
    desc: 'S\u00e6tter de standarder andre f\u00f8lger. Ansvarlig for at sikre at vibe-kodet output fra alle personas opfylder kvalitets- og governance-krav f\u00f8r det n\u00e5r produktion.',
    zone: 'risikabel', zoneLabel: 'Risikabel zone \u2014 h\u00f8j kapacitet, h\u00f8jt ansvar',
    scores: { internal_everyday: 4.5, internal_gamechanging: 4, customer_everyday: 3, customer_gamechanging: 4 },
    examples: [
      { icon: 'yes', text: 'AI-accelereret platformsudvikling og ML-pipeline-opbygning' },
      { icon: 'yes', text: 'Bygger styrede skabeloner og rammer for spoke vibe coding' },
      { icon: 'partial', text: 'Kundevendt AI med fuld governance, review og monitorering' },
      { icon: 'partial', text: 'Game-changing kunde-AI (personalisering, anbefalinger) \u2014 case-by-case' },
      { icon: 'no', text: 'M\u00e5 IKKE omg\u00e5 AI governance selv med h\u00f8j teknisk kapacitet' },
    ],
    tools: ['Full AI dev stack', 'Agent frameworks', 'LLM orchestration', 'AI Gov tooling'],
  },
  {
    desc: 'Journalisten, redakt\u00f8ren, marketingmedarbejderen \u2014 bygger personlige AI-v\u00e6rkt\u00f8jer. Her er den st\u00f8rste mulighed OG den st\u00f8rste risiko. Klare rammer er afg\u00f8rende.',
    zone: 'sikker', zoneLabel: 'KUN sikker zone \u2014 intern, ikke-kundevendt',
    scores: { internal_everyday: 4.5, internal_gamechanging: 2, customer_everyday: 0, customer_gamechanging: 0 },
    examples: [
      { icon: 'yes', text: 'Personlige workflow-agenter \u2014 research, opsummeringer, planl\u00e6gning' },
      { icon: 'yes', text: 'Teamv\u00e6rkt\u00f8jer til intern samarbejde og effektivitet' },
      { icon: 'yes', text: 'Vibe-kodede interne dashboards og dataudforskningsv\u00e6rkt\u00f8jer' },
      { icon: 'no', text: 'M\u00e5 IKKE bygge noget kundevendt eller der r\u00f8rer Danskerne' },
      { icon: 'no', text: 'M\u00e5 IKKE bruge AI til at generere indhold til nyheder eller redaktionelt output' },
    ],
    tools: ['CoPilot Agents', 'Approved low-code AI', 'Browser-based vibe coding'],
  },
  {
    desc: 'Bygger rammerne og platformen der g\u00f8r sikker vibe coding mulig for alle andre. Ansvarlig for \u201cfabrikken\u201d der styrer hvad andre bygger.',
    zone: 'risikabel', zoneLabel: 'Risikabel zone \u2014 bygger sikkerhedsnettet',
    scores: { internal_everyday: 4.5, internal_gamechanging: 4.5, customer_everyday: 3.5, customer_gamechanging: 3 },
    examples: [
      { icon: 'yes', text: 'Bygger styrede vibe coding-milj\u00f8er og skabeloner' },
      { icon: 'yes', text: 'Skaber sandboxede AI-workspaces med dataadgangskontroller' },
      { icon: 'yes', text: 'Agent factory: genbrugelige, styrede agent-frameworks for alle spokes' },
      { icon: 'partial', text: 'Kundevendt AI-infrastruktur \u2014 med fuld governance-stack' },
      { icon: 'partial', text: 'Game-changing AI (agentbaserede services) \u2014 risikovurdering p\u00e5kr\u00e6vet' },
    ],
    tools: ['Full platform stack', 'AI governance tooling', 'MCP', 'Sandbox infrastructure'],
  },
]

const VIBE_MATRIX_EN = [
  { row: 0, col: 0, zone: 'sikker', color: '#10b981', desc: 'Safe zone \u2014 everyone should experiment here', examples: 'CoPilot agents, workflow automation, internal dashboards, personal AI tools', who: 'All personas' },
  { row: 0, col: 1, zone: 'risikabel', color: '#f59e0b', desc: 'Case-by-case \u2014 requires architecture approval', examples: 'AI-driven process optimisation, agent-based workflows, internal knowledge sharing with AI', who: 'IT professionals with review' },
  { row: 1, col: 0, zone: 'risikabel', color: '#f59e0b', desc: 'IT professionals only with full governance', examples: 'AI-assisted customer service, content search, personalisation', who: 'Only Data & AI / AI Platform' },
  { row: 1, col: 1, zone: 'nogo', color: '#ef4444', desc: 'Vibe coding never alone \u2014 requires full governance', examples: 'GenAI in news, fully automated articles, AI-generated content', who: 'Only with architecture + AI governance' },
]

const VIBE_MATRIX_DA = [
  { row: 0, col: 0, zone: 'sikker', color: '#10b981', desc: 'Sikker zone \u2014 alle b\u00f8r eksperimentere her', examples: 'CoPilot-agenter, workflow-automatisering, interne dashboards, personlige AI-v\u00e6rkt\u00f8jer', who: 'Alle personas' },
  { row: 0, col: 1, zone: 'risikabel', color: '#f59e0b', desc: 'Case-by-case \u2014 kr\u00e6ver arkitekturgodkendelse', examples: 'AI-drevet procesoptimering, agentbaserede workflows, intern videndeling med AI', who: 'IT-professionelle med review' },
  { row: 1, col: 0, zone: 'risikabel', color: '#f59e0b', desc: 'Kun IT-professionelle med fuld governance', examples: 'AI-underst\u00f8ttet kundeservice, indholdss\u00f8gning, personalisering', who: 'Kun Data & AI / AI Platform' },
  { row: 1, col: 1, zone: 'nogo', color: '#ef4444', desc: 'Vibe coding aldrig alene \u2014 kr\u00e6ver fuld governance', examples: 'GenAI i nyheder, fuldautomatiserede artikler, AI-genereret indhold', who: 'Kun med arkitektur + AI governance' },
]

// ── VIBE PAGE CONTENT ──

const VIBE_PAGE_EN = {
  label: 'AI GOVERNANCE \u00B7 VIBE CODING',
  title: 'Where Can We Vibe Code?',
  subtitle: '\u201cVibe coding\u201d means using AI tools (like CoPilot, Cursor, or GitHub Spark) to build software by describing what you want in plain language \u2014 no traditional coding skills required. This is a discussion page: it maps out a proposed position on who can build what, and how we govern it. The goal is alignment, not restriction.',
  commsBadge: 'PROPOSED POSITION',
  commsTitle: 'Our Stance on Vibe Coding \u2014 For Alignment',
  commsHint: 'This is the position Architecture is proposing. We need leadership alignment before communicating broadly.',
  colHeaders: ['Everyday', 'Game-changing'],
  rowHeaders: ['TV 2 internal', 'Customers'],
  sections: [
    { key: 'context', css: 'vibe-comms-context', iconBg: 'rgba(139, 92, 246, 0.15)', iconColor: '#8b5cf6', icon: '\u2699', title: 'Why this matters now',
      paragraphs: [
        ['We know the fear: ', { b: 'vibe coding looks like shadow IT all over again.' }, ' After 35 years without a real IT department and two years into our technology strategy, the instinct to lock things down is understandable. We have all seen what happens when the organisation builds ungoverned solutions \u2014 we are still cleaning up after it.'],
        ['But this time is different. We now have a technology strategy, an architecture function, a data platform, and a governance model. ', { b: 'The question is not whether people will use AI to build things \u2014 they already are.' }, ' The question is whether we channel that energy through governed tools where we have visibility, or push it underground to personal devices and free tools where we have none.'],
        ['Banning vibe coding does not make it go away. It makes it invisible. And invisible is exactly what created the mess we spent two years cleaning up.'],
      ],
    },
    { key: 'now', css: 'vibe-comms-now', iconBg: 'rgba(16, 185, 129, 0.15)', iconColor: '#10b981', icon: '\u2713', title: 'What we already have',
      paragraphs: [['We are not starting from zero. Two tools are already available and approved:']],
      list: [
        [{ b: 'GitHub Spark' }, ' \u2014 access to Anthropic\u2019s Claude models for building lightweight internal apps. Already available to developers and increasingly to power users.'],
        [{ b: 'Microsoft CoPilot' }, ' \u2014 available across the organisation for everyday productivity: email, documents, meetings, code assistance, and personal agents.'],
      ],
      paragraphsAfter: [['These are governed tools on governed infrastructure. ', { b: 'If you have access, you can already experiment' }, ' \u2014 within the internal/everyday quadrant of the matrix above. This is not a future promise. It is the current state.']],
    },
    { key: 'boundary', css: 'vibe-comms-boundary', iconBg: 'rgba(239, 68, 68, 0.15)', iconColor: '#ef4444', icon: '!', title: 'The one hard boundary',
      paragraphs: [
        [{ b: 'Do not install or use ungoverned third-party AI coding tools on TV 2 networks or hardware.' }, ' This means no personal Cursor licenses, no free-tier AI coding tools, no browser-based IDEs we haven\u2019t approved.'],
        ['This is not about distrusting our people. It is about ', { b: 'data exposure.' }, ' Ungoverned tools can send proprietary code, customer data, or internal business logic to external AI providers without the protections our approved tools have. One journalist\u2019s helpful automation could inadvertently leak sensitive content. The risk is not the intent \u2014 it\u2019s the tooling.'],
      ],
    },
    { key: 'soon', css: 'vibe-comms-soon', iconBg: 'rgba(245, 158, 11, 0.15)', iconColor: '#f59e0b', icon: '\u231B', title: 'What we are building next',
      paragraphs: [['Architecture is evaluating options to expand beyond GitHub Spark and CoPilot into a ', { b: 'broader governed vibe coding platform' }, ' for the entire organisation. The goal is to give everyone \u2014 not just IT \u2014 the ability to build internal tools safely. The platform will provide:']],
      list: [
        [{ b: 'Data access controls' }, ' \u2014 AI tools can only see data you\u2019re authorised to use'],
        [{ b: 'Output boundaries' }, ' \u2014 nothing you build can accidentally become customer-facing'],
        [{ b: 'Approved model access' }, ' \u2014 vetted AI models that meet our security and privacy requirements'],
        [{ b: 'Templates and examples' }, ' \u2014 so you build on proven patterns, not from scratch'],
        [{ b: 'Sharing and reuse' }, ' \u2014 great internal tools can benefit your colleagues too'],
      ],
      paragraphsAfter: [[{ b: 'This is how we avoid shadow IT 2.0:' }, ' not by saying no, but by making the governed path easier and better than the ungoverned alternative. If the official platform is more capable and more convenient than whatever people find on their own, adoption follows naturally.']],
    },
    { key: 'future', css: 'vibe-comms-future', iconBg: 'rgba(16, 185, 129, 0.15)', iconColor: '#10b981', icon: '\u2605', title: 'The end state we are aiming for',
      paragraphs: [
        ['A meeting organiser that auto-summarises action items. A journalist\u2019s research assistant that searches TV 2\u2019s archive. A marketer\u2019s campaign performance dashboard built in an afternoon. An editor\u2019s tool that suggests metadata tags. ', { b: 'These are not threats \u2014 they are exactly the efficiency gains our technology strategy promised.' }],
        ['The principle is simple: ', { b: 'internal and everyday \u2014 go for it.' }, ' Game-changing or process-transforming \u2014 discuss with Architecture first. Customer-facing \u2014 only through professional development with full governance. This is the same principle we apply to every technology decision: autonomy within guardrails, not freedom without structure.'],
      ],
    },
    { key: 'principles', css: 'vibe-comms-principles', iconBg: 'rgba(139, 92, 246, 0.15)', iconColor: '#8b5cf6', icon: '\u2605', title: 'Five principles for vibe coding at TV 2',
      principles: [
        { da: 'Intern f\u00f8r ekstern.', text: 'Build for yourself and your team first. Nothing reaches a customer without professional review and governance.' },
        { da: 'Platform, ikke personlig maskine.', text: 'Use approved tools (GitHub Spark, CoPilot), not personal setups. This protects our data, our people, and TV 2.' },
        { da: 'Byg videre, ikke forfra.', text: 'Start from templates and shared patterns. The platform provides building blocks so you don\u2019t reinvent the wheel.' },
        { da: 'Del det gode.', text: 'If you build something useful, share it. One team\u2019s solution can save dozens of colleagues hours every week.' },
        { da: 'Kend din zone.', text: 'Check the matrix above. Green means go. Yellow means discuss with Technology. Red means this needs full governance.' },
      ],
    },
    { key: 'alignment', css: 'vibe-comms-alignment', iconBg: 'rgba(59, 130, 246, 0.15)', iconColor: '#3b82f6', icon: '?', title: 'What we need alignment on',
      list: [
        ['Do we agree that ', { b: 'enabling governed vibe coding is better than banning it?' }, ' (Architecture\u2019s position: yes \u2014 banning creates shadow IT, enabling with guardrails creates visibility)'],
        ['Do we agree that ', { b: 'GitHub Spark and CoPilot are sufficient for now' }, ', with a broader platform evaluation underway?'],
        ['Do we agree on the ', { b: 'matrix boundaries' }, ' \u2014 specifically, that non-IT personas should not build customer-facing solutions, but IT professionals can with governance?'],
        ['Do we agree that ', { b: 'AI team together with Tech Enabling owns the tool approval and governance framework' }, ' for vibe coding, consistent with our technology strategy?'],
        ['Are we ready to ', { b: 'communicate this position to the broader organisation' }, ', or do we need a pilot phase first?'],
      ],
    },
  ],
}

const VIBE_PAGE_DA = {
  label: 'AI GOVERNANCE \u00B7 VIBE CODING',
  title: 'Hvor kan vi vibe-kode?',
  subtitle: '\u201cVibe coding\u201d betyder at bruge AI-v\u00e6rkt\u00f8jer (som CoPilot, Cursor eller GitHub Spark) til at bygge software ved at beskrive hvad du vil i almindeligt sprog \u2014 ingen traditionelle kodningsf\u00e6rdigheder p\u00e5kr\u00e6vet. Dette er en diskussionsside: den kortl\u00e6gger en foresl\u00e5et position for hvem der kan bygge hvad, og hvordan vi styrer det. M\u00e5let er alignment, ikke restriktion.',
  commsBadge: 'FORESL\u00c5ET POSITION',
  commsTitle: 'Vores holdning til Vibe Coding \u2014 Til alignment',
  commsHint: 'Dette er den position Arkitektur foresl\u00e5r. Vi har brug for ledelsesalignment f\u00f8r vi kommunikerer bredt.',
  colHeaders: ['Hverdag', 'Game-changing'],
  rowHeaders: ['TV 2 internt', 'Danskerne'],
  sections: [
    { key: 'context', css: 'vibe-comms-context', iconBg: 'rgba(139, 92, 246, 0.15)', iconColor: '#8b5cf6', icon: '\u2699', title: 'Hvorfor dette er vigtigt nu',
      paragraphs: [
        ['Vi kender frygten: ', { b: 'vibe coding ligner shadow IT om igen.' }, ' Efter 35 \u00e5r uden en egentlig IT-afdeling og to \u00e5r inde i vores teknologistrategi er instinktet om at l\u00e5se tingene ned forst\u00e5eligt. Vi har alle set hvad der sker n\u00e5r organisationen bygger ustyrede l\u00f8sninger \u2014 vi rydder stadig op efter det.'],
        ['Men denne gang er anderledes. Vi har nu en teknologistrategi, en arkitekturfunktion, en dataplatform og en governance-model. ', { b: 'Sp\u00f8rgsm\u00e5let er ikke om folk vil bruge AI til at bygge ting \u2014 det g\u00f8r de allerede.' }, ' Sp\u00f8rgsm\u00e5let er om vi kanaliserer den energi gennem styrede v\u00e6rkt\u00f8jer hvor vi har synlighed, eller presser den under jorden til personlige enheder og gratis v\u00e6rkt\u00f8jer hvor vi ingen har.'],
        ['At forbyde vibe coding f\u00e5r det ikke til at forsvinde. Det g\u00f8r det usynligt. Og usynlighed er pr\u00e6cis det der skabte det rod vi brugte to \u00e5r p\u00e5 at rydde op.'],
      ],
    },
    { key: 'now', css: 'vibe-comms-now', iconBg: 'rgba(16, 185, 129, 0.15)', iconColor: '#10b981', icon: '\u2713', title: 'Hvad vi allerede har',
      paragraphs: [['Vi starter ikke fra nul. To v\u00e6rkt\u00f8jer er allerede tilg\u00e6ngelige og godkendte:']],
      list: [
        [{ b: 'GitHub Spark' }, ' \u2014 adgang til Anthropics Claude-modeller til at bygge lette interne apps. Allerede tilg\u00e6ngeligt for udviklere og i stigende grad for power users.'],
        [{ b: 'Microsoft CoPilot' }, ' \u2014 tilg\u00e6ngeligt p\u00e5 tv\u00e6rs af organisationen til daglig produktivitet: email, dokumenter, m\u00f8der, kodehj\u00e6lp og personlige agenter.'],
      ],
      paragraphsAfter: [['Disse er styrede v\u00e6rkt\u00f8jer p\u00e5 styret infrastruktur. ', { b: 'Hvis du har adgang, kan du allerede eksperimentere' }, ' \u2014 inden for den interne/hverdags-kvadrant i matrixen ovenfor. Dette er ikke et fremtidigt l\u00f8fte. Det er den nuv\u00e6rende tilstand.']],
    },
    { key: 'boundary', css: 'vibe-comms-boundary', iconBg: 'rgba(239, 68, 68, 0.15)', iconColor: '#ef4444', icon: '!', title: 'Den ene h\u00e5rde gr\u00e6nse',
      paragraphs: [
        [{ b: 'Install\u00e9r eller brug ikke ustyrede tredjeparts AI-kodningsv\u00e6rkt\u00f8jer p\u00e5 TV 2\u2019s netv\u00e6rk eller hardware.' }, ' Det betyder ingen personlige Cursor-licenser, ingen gratis AI-kodningsv\u00e6rkt\u00f8jer, ingen browserbaserede IDE\u2019er vi ikke har godkendt.'],
        ['Det handler ikke om mistillid til vores mennesker. Det handler om ', { b: 'dataeksponering.' }, ' Ustyrede v\u00e6rkt\u00f8jer kan sende propriet\u00e6r kode, kundedata eller intern forretningslogik til eksterne AI-udbydere uden de beskyttelser vores godkendte v\u00e6rkt\u00f8jer har. \u00c9n journalists hj\u00e6lpsomme automatisering kan utilsigtet l\u00e6kke f\u00f8lsomt indhold. Risikoen er ikke hensigten \u2014 det er v\u00e6rkt\u00f8jet.'],
      ],
    },
    { key: 'soon', css: 'vibe-comms-soon', iconBg: 'rgba(245, 158, 11, 0.15)', iconColor: '#f59e0b', icon: '\u231B', title: 'Hvad vi bygger n\u00e6ste',
      paragraphs: [['Arkitektur evaluerer muligheder for at udvide ud over GitHub Spark og CoPilot til en ', { b: 'bredere styret vibe coding-platform' }, ' for hele organisationen. M\u00e5let er at give alle \u2014 ikke kun IT \u2014 muligheden for at bygge interne v\u00e6rkt\u00f8jer sikkert. Platformen vil levere:']],
      list: [
        [{ b: 'Dataadgangskontroller' }, ' \u2014 AI-v\u00e6rkt\u00f8jer kan kun se data du er autoriseret til at bruge'],
        [{ b: 'Output-gr\u00e6nser' }, ' \u2014 intet du bygger kan ved et uheld blive kundevendt'],
        [{ b: 'Godkendt modeladgang' }, ' \u2014 kontrollerede AI-modeller der opfylder vores sikkerheds- og privatlivskrav'],
        [{ b: 'Skabeloner og eksempler' }, ' \u2014 s\u00e5 du bygger p\u00e5 gennempr\u00f8vede m\u00f8nstre, ikke fra bunden'],
        [{ b: 'Deling og genbrug' }, ' \u2014 gode interne v\u00e6rkt\u00f8jer kan ogs\u00e5 gavne dine kolleger'],
      ],
      paragraphsAfter: [[{ b: 'S\u00e5dan undg\u00e5r vi shadow IT 2.0:' }, ' ikke ved at sige nej, men ved at g\u00f8re den styrede vej nemmere og bedre end det ustyrede alternativ. Hvis den officielle platform er mere kapabel og mere bekvem end hvad folk finder p\u00e5 egen h\u00e5nd, f\u00f8lger adoption naturligt.']],
    },
    { key: 'future', css: 'vibe-comms-future', iconBg: 'rgba(16, 185, 129, 0.15)', iconColor: '#10b981', icon: '\u2605', title: 'Sluttilstanden vi sigter mod',
      paragraphs: [
        ['En m\u00f8deorganisator der automatisk opsummerer handlingspunkter. En journalists forskningsassistent der s\u00f8ger i TV 2\u2019s arkiv. En marketingmedarbejders kampagne-performance dashboard bygget p\u00e5 en eftermiddag. Et redakt\u00f8rv\u00e6rkt\u00f8j der foresl\u00e5r metadata-tags. ', { b: 'Disse er ikke trusler \u2014 de er pr\u00e6cis de effektivitetsgevinster vores teknologistrategi lovede.' }],
        ['Princippet er simpelt: ', { b: 'internt og hverdag \u2014 k\u00f8r p\u00e5.' }, ' Game-changing eller procestransformerende \u2014 diskut\u00e9r med Arkitektur f\u00f8rst. Kundevendt \u2014 kun gennem professionel udvikling med fuld governance. Dette er det samme princip vi anvender p\u00e5 enhver teknologibeslutning: autonomi inden for rammer, ikke frihed uden struktur.'],
      ],
    },
    { key: 'principles', css: 'vibe-comms-principles', iconBg: 'rgba(139, 92, 246, 0.15)', iconColor: '#8b5cf6', icon: '\u2605', title: 'Fem principper for vibe coding hos TV 2',
      principles: [
        { da: 'Intern f\u00f8r ekstern.', text: 'Byg til dig selv og dit team f\u00f8rst. Intet n\u00e5r en kunde uden professionelt review og governance.' },
        { da: 'Platform, ikke personlig maskine.', text: 'Brug godkendte v\u00e6rkt\u00f8jer (GitHub Spark, CoPilot), ikke personlige ops\u00e6tninger. Det beskytter vores data, vores mennesker og TV 2.' },
        { da: 'Byg videre, ikke forfra.', text: 'Start fra skabeloner og f\u00e6lles m\u00f8nstre. Platformen leverer byggeblokke s\u00e5 du ikke genopfinder hjulet.' },
        { da: 'Del det gode.', text: 'Hvis du bygger noget nyttigt, del det. \u00c9t teams l\u00f8sning kan spare snesevis af kolleger timer hver uge.' },
        { da: 'Kend din zone.', text: 'Tjek matrixen ovenfor. Gr\u00f8n betyder k\u00f8r. Gul betyder diskut\u00e9r med Teknologi. R\u00f8d betyder dette kr\u00e6ver fuld governance.' },
      ],
    },
    { key: 'alignment', css: 'vibe-comms-alignment', iconBg: 'rgba(59, 130, 246, 0.15)', iconColor: '#3b82f6', icon: '?', title: 'Hvad vi har brug for alignment p\u00e5',
      list: [
        ['Er vi enige om at ', { b: 'styret vibe coding er bedre end at forbyde det?' }, ' (Arkitekturs position: ja \u2014 forbud skaber shadow IT, enablement med rammer skaber synlighed)'],
        ['Er vi enige om at ', { b: 'GitHub Spark og CoPilot er tilstr\u00e6kkelige for nu' }, ', med en bredere platformevaluering undervejs?'],
        ['Er vi enige om ', { b: 'matrixgr\u00e6nserne' }, ' \u2014 specifikt at ikke-IT personas ikke b\u00f8r bygge kundevendte l\u00f8sninger, men IT-professionelle kan med governance?'],
        ['Er vi enige om at ', { b: 'AI-teamet sammen med Tech Enabling ejer v\u00e6rkt\u00f8jsgodkendelse og governance-framework' }, ' for vibe coding, konsistent med vores teknologistrategi?'],
        ['Er vi klar til at ', { b: 'kommunikere denne position til den bredere organisation' }, ', eller har vi brug for en pilotfase f\u00f8rst?'],
      ],
    },
  ],
}

// ── UI STRINGS ──

const UI_EN = {
  clickHint: 'Click anywhere to advance',
  platform: 'Platform:',
  keyTerms: 'Key Terms',
  clickForDetails: 'Click a term for details',
  maturityScale: 'Maturity scale:',
  levels: ['1 Ad-hoc', '2 Emerging', '3 Defined', '4 Managed', '5 Optimised'],
  maturityNote: 'We target 3\u20134. Levels 4\u20135 are only relevant for core platform teams.',
  personasIntroA: 'Six personas',
  personasIntroB: ' represent the different ways people at TV 2 work with data & AI. You likely have several of these in your teams. The maturity scores show where we are today and where we\u2019re heading.',
  phaseLabels: ['FASE 1', 'FASE 2', 'FASE 3'],
  discussion: 'DISCUSSION',
  hubForming: '(forming...)',
  hubFull: 'Platform \u00B7 Governance \u00B7 AI',
  hubExtra: 'Self-Service \u00B7 Enablement',
  govRingTop: 'GOVERNANCE \u00B7 COMMON ONTOLOGY \u00B7 MASTER DATA MODEL',
  govRingBottom: 'DATA LAYER \u00B7 DECISION LAYER (EMP) \u00B7 ENGAGEMENT LAYER',
  tempoAnalytics: 'ANALYTICS TEMPO',
  tempoAnalyticsShort: 'Batch \u00B7 Dashboards \u00B7 Historical',
  tempoOperational: 'OPERATIONAL TEMPO',
  tempoOperationalShort: 'Streaming \u00B7 Real-time \u00B7 Personalisation',
  wipLabel: 'WIP',
  platformTabTitle: 'Data/Integrations Platform',
}

const UI_DA = {
  clickHint: 'Klik hvor som helst for at g\u00e5 videre',
  platform: 'Platform:',
  keyTerms: 'N\u00f8glebegreber',
  clickForDetails: 'Klik p\u00e5 et begreb for detaljer',
  maturityScale: 'Modenhedsskala:',
  levels: ['1 Ad-hoc', '2 Begyndende', '3 Defineret', '4 Styret', '5 Optimeret'],
  maturityNote: 'Vi sigter mod 3\u20134. Niveau 4\u20135 er kun relevant for centrale platformhold.',
  personasIntroA: 'Seks personas',
  personasIntroB: ' repr\u00e6senterer de forskellige m\u00e5der, folk hos TV 2 arbejder med data & AI. Du har sandsynligvis flere af disse i dine teams. Modenhedsscorerne viser, hvor vi er i dag, og hvor vi er p\u00e5 vej hen.',
  phaseLabels: ['FASE 1', 'FASE 2', 'FASE 3'],
  discussion: 'DISKUSSION',
  hubForming: '(under opbygning...)',
  hubFull: 'Platform \u00B7 Governance \u00B7 AI',
  hubExtra: 'Self-Service \u00B7 Enablement',
  govRingTop: 'GOVERNANCE \u00B7 F\u00c6LLES ONTOLOGI \u00B7 MASTER DATA MODEL',
  govRingBottom: 'DATALAG \u00B7 BESLUTNINGSLAG (EMP) \u00B7 ENGAGEMENTLAG',
  tempoAnalytics: 'ANALYSE-TEMPO',
  tempoAnalyticsShort: 'Batch \u00B7 Dashboards \u00B7 Historisk',
  tempoOperational: 'OPERATIONELT TEMPO',
  tempoOperationalShort: 'Streaming \u00B7 Realtid \u00B7 Personalisering',
  wipLabel: 'WIP',
  platformTabTitle: 'Data/Integrationsplatform',
}

// ── PLATFORM PAGE ──

const PLATFORM_PAGE_EN = {
  label: 'WORK IN PROGRESS',
  title: 'Data Platform & Integration Platform',
  subtitle: 'Two distinct platforms that work together. The data platform stores, transforms, and serves data. The integration platform connects systems. They are architecturally separate with different owners, technologies, and purposes.',

  principlesBar: 'ARCHITECTURE PRINCIPLES · DATA GOVERNANCE · SECURITY & PRIVACY',
  principlesOwner: 'Owned by Enterprise Architecture',

  dataPlatformTitle: 'Data Platform',
  dataPlatformTech: 'Databricks · lakehouse architecture',

  hubTitle: 'Hub — Data Foundation',
  hubDesc: 'Master data, ontology, common data models, data products',
  hubOwner: 'Owner: Data Foundation domain',
  hubTech: 'Databricks Unity Catalog · Delta Lake · dbt',
  hubTech2: 'Medallion architecture (bronze / silver / gold)',

  analyticsTempo: 'Analytics Tempo',
  analyticsDesc: 'Batch processing · historical analysis',
  analyticsTech: 'Power BI · Excel · Databricks SQL',
  analyticsTech2: 'Dashboards · reports · ad-hoc queries',
  analyticsConsumers: 'All personas consume analytics',

  operationalTempo: 'Operational Tempo',
  operationalDesc: 'Streaming · near real-time · personalisation',
  operationalTech: 'Databricks Streaming · Delta Live Tables',
  operationalTech2: 'Adobe Experience Platform · real-time decisioning',
  operationalConsumers: 'Feeds personalisation & viewer experience',

  spokesTitle: 'Spoke Teams — Domain-Owned Data Products',
  spokesDesc: 'Each spoke builds and owns their own data products, following hub standards',
  spokeExamples: ['Content & Editorial', 'Ads & Revenue', 'Viewer & Subs'],
  spokesOwner: 'Spokes own their data — Hub owns the platform & standards',

  integrationPlatformTitle: 'Integration Platform',
  integrationPlatformTech: 'Technology: TBD (under evaluation)',

  apiGatewayTitle: 'API Gateway',
  apiGatewayDesc: 'System-to-system communication',
  apiGatewayDesc2: 'REST, GraphQL, service mesh',
  apiGatewayTech: '⚠️ Technology TBD',

  eventBusTitle: 'Event Bus',
  eventBusDesc: 'Async event-driven architecture',
  eventBusDesc2: 'Pub/sub, event streaming, CDC',
  eventBusTech: '⚠️ Technology TBD',

  intCapTitle: 'Integration Capabilities',
  intCapDesc: 'Data ingestion · CDC · API management · event routing',
  intCapDesc2: 'Connects source systems to data platform and between applications',

  techEnablingTitle: 'Tech Enabling Domain',
  techEnablingDesc: 'Owns and operates the integration platform — tooling, standards, and support',

  productTeamsTitle: 'Product Teams (Consumers & Producers)',
  productTeamsDesc: 'Product teams use the integration platform to connect their systems',
  productTeamsExamples: 'TV 2 Play · News · Sport · Ads · Subscriptions',

  flowLabel: 'DATA FLOW',
  flowToSpokes: 'ingested data',
  notSameWarning: 'These are NOT the same platform',
  notSameDesc: 'Different owners · Different technology · Different purpose · Architecturally separate',

  legendData: 'Data Platform (Databricks)',
  legendIntegration: 'Integration Platform (TBD)',
  legendPrinciples: 'Enterprise Architecture',
  legendFlow: 'Data flow / interop',
  legendTbd: 'Technology undecided',

  cards: [
    { icon: '🏛️', color: '#10b981', title: 'Data Foundation owns the Hub', desc: 'Master data, common ontology, data products catalog, and platform standards. But not the entire data platform — spokes own their domain data.' },
    { icon: '🔧', color: '#3b82f6', title: 'Tech Enabling owns Integration', desc: 'The integration platform is a separate concern — API gateway, event bus, system connectivity. Technology stack is under evaluation.' },
    { icon: '📐', color: '#8b5cf6', title: 'Enterprise Architecture owns Principles', desc: 'Architecture principles, data governance framework, security and privacy requirements apply across both platforms.' },
    { icon: '⚡', color: '#f59e0b', title: 'Two tempos, one platform', desc: 'The data platform serves both analytics (batch, dashboards) and operational (streaming, real-time personalisation) needs.' },
    { icon: '🔗', color: '#06b6d4', title: 'Interoperation, not merger', desc: 'Data flows between platforms via well-defined contracts. The integration platform feeds data into the data platform and distributes data products outward.' },
    { icon: '⚠️', color: '#ef4444', title: 'Integration tech is TBD', desc: 'The integration platform technology stack is under active evaluation. This is a deliberate choice — we want to get it right, not just pick something fast.' },
  ],
}

const PLATFORM_PAGE_DA = {
  label: 'WORK IN PROGRESS',
  title: 'Dataplatform & Integrationsplatform',
  subtitle: 'To distinkte platforme der arbejder sammen. Dataplatformen gemmer, transformerer og serverer data. Integrationsplatformen forbinder systemer. De er arkitektonisk adskilte med forskellige ejere, teknologier og formål.',

  principlesBar: 'ARKITEKTURPRINCIPPER · DATA GOVERNANCE · SIKKERHED & PRIVATLIV',
  principlesOwner: 'Ejet af Enterprise Architecture',

  dataPlatformTitle: 'Dataplatform',
  dataPlatformTech: 'Databricks · lakehouse-arkitektur',

  hubTitle: 'Hub — Data Foundation',
  hubDesc: 'Stamdata, ontologi, fælles datamodeller, dataprodukter',
  hubOwner: 'Ejer: Data Foundation-domænet',
  hubTech: 'Databricks Unity Catalog · Delta Lake · dbt',
  hubTech2: 'Medallion-arkitektur (bronze / silver / gold)',

  analyticsTempo: 'Analyse-tempo',
  analyticsDesc: 'Batch-processering · historisk analyse',
  analyticsTech: 'Power BI · Excel · Databricks SQL',
  analyticsTech2: 'Dashboards · rapporter · ad-hoc forespørgsler',
  analyticsConsumers: 'Alle personas bruger analytics',

  operationalTempo: 'Operationelt Tempo',
  operationalDesc: 'Streaming · nær-realtid · personalisering',
  operationalTech: 'Databricks Streaming · Delta Live Tables',
  operationalTech2: 'Adobe Experience Platform · realtidsbeslutninger',
  operationalConsumers: 'Driver personalisering & seeroplevelse',

  spokesTitle: 'Spoke-teams — Domæne-ejede Dataprodukter',
  spokesDesc: 'Hver spoke bygger og ejer deres egne dataprodukter efter hub-standarder',
  spokeExamples: ['Content & Redaktion', 'Ads & Revenue', 'Seer & Abonnement'],
  spokesOwner: 'Spokes ejer deres data — Hub ejer platformen & standarderne',

  integrationPlatformTitle: 'Integrationsplatform',
  integrationPlatformTech: 'Teknologi: TBD (under evaluering)',

  apiGatewayTitle: 'API Gateway',
  apiGatewayDesc: 'System-til-system kommunikation',
  apiGatewayDesc2: 'REST, GraphQL, service mesh',
  apiGatewayTech: '⚠️ Teknologi TBD',

  eventBusTitle: 'Event Bus',
  eventBusDesc: 'Asynkron event-drevet arkitektur',
  eventBusDesc2: 'Pub/sub, event streaming, CDC',
  eventBusTech: '⚠️ Teknologi TBD',

  intCapTitle: 'Integrationskapabiliteter',
  intCapDesc: 'Dataindtag · CDC · API-styring · event-routing',
  intCapDesc2: 'Forbinder kildesystemer til dataplatformen og mellem applikationer',

  techEnablingTitle: 'Tech Enabling-domænet',
  techEnablingDesc: 'Ejer og driver integrationsplatformen — tooling, standarder og support',

  productTeamsTitle: 'Produktteams (Forbrugere & Producenter)',
  productTeamsDesc: 'Produktteams bruger integrationsplatformen til at forbinde deres systemer',
  productTeamsExamples: 'TV 2 Play · Nyheder · Sport · Annoncer · Abonnementer',

  flowLabel: 'DATAFLOW',
  flowToSpokes: 'indlæst data',
  notSameWarning: 'Det er IKKE den samme platform',
  notSameDesc: 'Forskellige ejere · Forskellig teknologi · Forskelligt formål · Arkitektonisk adskilte',

  legendData: 'Dataplatform (Databricks)',
  legendIntegration: 'Integrationsplatform (TBD)',
  legendPrinciples: 'Enterprise Architecture',
  legendFlow: 'Dataflow / interop',
  legendTbd: 'Teknologi uafklaret',

  cards: [
    { icon: '🏛️', color: '#10b981', title: 'Data Foundation ejer Hub\'en', desc: 'Stamdata, fælles ontologi, dataproduktkatalog og platformstandarder. Men ikke hele dataplatformen — spokes ejer deres domænedata.' },
    { icon: '🔧', color: '#3b82f6', title: 'Tech Enabling ejer Integration', desc: 'Integrationsplatformen er et separat ansvar — API gateway, event bus, systemforbindelser. Teknologistakken er under evaluering.' },
    { icon: '📐', color: '#8b5cf6', title: 'Enterprise Architecture ejer Principper', desc: 'Arkitekturprincipper, data governance-framework, sikkerheds- og privatlivskrav gælder på tværs af begge platforme.' },
    { icon: '⚡', color: '#f59e0b', title: 'To tempi, én platform', desc: 'Dataplatformen betjener både analytics (batch, dashboards) og operationelle (streaming, realtidspersonalisering) behov.' },
    { icon: '🔗', color: '#06b6d4', title: 'Samspil, ikke sammenlægning', desc: 'Data flyder mellem platformene via veldefinerede kontrakter. Integrationsplatformen fører data ind i dataplatformen og distribuerer dataprodukter udad.' },
    { icon: '⚠️', color: '#ef4444', title: 'Integrationsteknologi er TBD', desc: 'Integrationsplatformens teknologistak er under aktiv evaluering. Det er et bevidst valg — vi vil gøre det rigtigt, ikke bare vælge noget hurtigt.' },
  ],
}

// ── EXPORT ──

export function getTranslations(lang) {
  const isDA = lang === 'da'
  return {
    ui: isDA ? UI_DA : UI_EN,
    personas: isDA ? PERSONAS_DA : PERSONAS_EN,
    silos: SILOS,
    maturityDims: isDA ? MATURITY_DIMS_DA : MATURITY_DIMS_EN,
    phases: isDA ? PHASES_DA : PHASES_EN,
    glossary: isDA ? GLOSSARY_DA : GLOSSARY_EN,
    vibeDims: isDA ? VIBE_DIMS_DA : VIBE_DIMS_EN,
    vibeProfiles: isDA ? VIBE_PROFILES_DA : VIBE_PROFILES_EN,
    vibeMatrix: isDA ? VIBE_MATRIX_DA : VIBE_MATRIX_EN,
    vibePage: isDA ? VIBE_PAGE_DA : VIBE_PAGE_EN,
    platformPage: isDA ? PLATFORM_PAGE_DA : PLATFORM_PAGE_EN,
  }
}
