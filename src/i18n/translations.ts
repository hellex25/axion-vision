export type Lang = 'ro' | 'en'

interface Field {
  label: string
  placeholder: string
}

export interface Dictionary {
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
    twitterTitle: string
    twitterDescription: string
  }
  nav: {
    capabilities: string
    services: string
    servicesConsulting: string
    servicesPortals: string
    servicesMaintenance: string
    engine: string
    security: string
    contact: string
    funding: string
    fundingTitle: string
    cta: string
  }
  services: {
    kicker: string
    titlePre: string
    titleHighlight: string
    sub: string
    learnMore: string
    domains: {
      tier: string
      title: string
      intro: string
      items: string[]
    }[]
  }
  hero: {
    kicker: string
    h1Pre: string
    h1Highlight: string
    h1Post: string
    sub: string
    ctaPrimary: string
    ctaSecondary: string
    status: string
    scroll: string
  }
  matrix: {
    kicker: string
    titlePre: string
    titleHighlight: string
    sub: string
    pillars: { title: string; body: string }[]
  }
  engine: {
    kicker: string
    title: string
    lead: string
    roles: {
      typescript: string
      react: string
      tanstack: string
      supabase: string
      postgresql: string
      cloudflare: string
      python: string
      tailwind: string
    }
  }
  secure: {
    kicker: string
    headlinePre: string
    headlineHighlight: string
    sub: string
    specs: { label: string; note: string }[]
    integrity: string
  }
  contact: {
    kicker: string
    title: string
    sub: string
    fields: {
      name: Field
      email: Field
      phone: Field
      details: Field
    }
    phoneOptional: string
    submitIdle: string
    submitSending: string
    submitDone: string
    submitError: string
    successNote: string
  }
  footer: {
    legal: string
    status: string
    servicesTitle: string
    nap: string
  }
}

const ro: Dictionary = {
  meta: {
    title: 'Consultanță IT & Dezvoltare Web pentru Firme | Project Axion',
    description:
      'Consultanță IT, site-uri rapide și mentenanță pentru IMM-uri și firme din România. Cloud, securitate cibernetică și automatizări — Axion Vision SRL (Project Axion). Ofertă gratuită.',
    keywords:
      'consultanță IT firme, dezvoltare web România, mentenanță IT IMM, infrastructură cloud, securitate cibernetică, portaluri web, Axion Vision, Project Axion',
    ogTitle: 'Consultanță IT & Dezvoltare Web pentru Firme — Project Axion',
    ogDescription:
      'Consultanță IT, site-uri rapide și mentenanță pentru IMM-uri din România — Axion Vision SRL.',
    twitterTitle: 'Consultanță IT pentru Firme | Project Axion',
    twitterDescription:
      'Consultanță IT, dezvoltare web și mentenanță pentru firme din România.',
  },
  nav: {
    capabilities: 'Capabilități',
    services: 'Servicii',
    servicesConsulting: 'Consultanță IT',
    servicesPortals: 'Portaluri web',
    servicesMaintenance: 'Mentenanță IT',
    engine: 'Motorul',
    security: 'Securitate',
    contact: 'Contact',
    funding: 'PS 2027',
    fundingTitle: 'Informații finanțare europeană (PS 2023–2027)',
    cta: 'Contact',
  },
  hero: {
    kicker: 'Axion Vision SRL — Divizia de Inginerie',
    h1Pre: 'Arhitecturăm ecosisteme digitale de ',
    h1Highlight: 'înaltă performanță',
    h1Post: '.',
    sub: 'Project Axion fuzionează inginerie web de elită, infrastructură cloud suverană și fluxuri de lucru autonome. Nu construim site-uri banale; lansăm motoare software hiper-scalabile.',
    ctaPrimary: 'Contactează-ne',
    ctaSecondary: 'Explorează capabilitățile',
    status: 'SYS_STATUS: OPTIMAL // ENGINES: ACTIVE // LATENCY: <12ms',
    scroll: 'scroll ↓',
  },
  matrix: {
    kicker: '// 02 — CAPABILITĂȚI DE BAZĂ',
    titlePre: 'Patru piloni. ',
    titleHighlight: 'Un singur motor.',
    sub: 'Un stack de capabilități integrat vertical — proiectat, automatizat și securizat sub un singur acoperiș.',
    pillars: [
      {
        title: 'Full-Stack de ultimă generație',
        body: 'Construit pe TanStack Start, React 19 și Vite. Server Functions executate la edge în sub 10 milisecunde. Fără taxă de hidratare, fără cascade de request-uri — doar performanță de instrument de precizie, livrată global.',
      },
      {
        title: 'Motoare autonome',
        body: 'Scripturi Python și Node.js care lucrează în timp ce tu dormi. Pipeline-uri orchestrate prin cron, sincronizare API în timp real și fluxuri de lucru auto-reparabile care elimină complet frecarea umană și balastul operațional.',
      },
      {
        title: 'Infrastructură suverană',
        body: 'Supabase + PostgreSQL cu indexare relațională avansată și Row-Level Security aplicat chirurgical. Datele reci, sigilate în seifuri izolate Cloudflare R2. Stack-ul tău. Regulile tale. Suveranitatea ta.',
      },
      {
        title: 'Arhitectură strategică',
        body: 'Consultanță IT enterprise pentru sisteme construite să scaleze. Audituri de arhitectură, securitate multi-tenant prin design și deciziile grele de inginerie — luate înainte ca prima linie de cod să intre în producție.',
      },
    ],
  },
  services: {
    kicker: '// 03 — SERVICII',
    titlePre: 'Trei domenii. ',
    titleHighlight: 'Acoperire completă.',
    sub: 'Consultanță TI, portaluri web de elită și întreținere echipamente — livrate cu același standard de inginerie, de la arhitectură la operare.',
    learnMore: 'Află mai mult',
    domains: [
      {
        tier: 'Activitate principală',
        title:
          'Consultanță în tehnologia informației și management al infrastructurii de calcul',
        intro:
          'Consultanță hardware, software și sisteme informatice — proiectare, operare, securitate cibernetică și audit infrastructuri. Nucleul Project Axion.',
        items: [
          'Audit arhitectural și evaluare tehnică a sistemelor existente',
          'Planificare și proiectare sisteme informatice integrate',
          'Aplicații web full-stack de înaltă performanță (TanStack Start, React 19, Vite)',
          'Platforme SSR, Server Functions și API-uri REST / RPC la edge',
          'Arhitecturi Supabase + PostgreSQL (indexare, RLS, migrații)',
          'Deploy și operare Cloudflare Workers, Pages și R2',
          'Scripturi Python și Node.js, pipeline-uri cron și sincronizări API',
          'Fluxuri de lucru autonome, ETL și procesare batch',
          'Consultanță securitate cibernetică, monitorizare și testare rețele',
          'Criptare AES-GCM 256-bit, conformitate GDPR, izolarea datelor',
          'Management și operare sisteme informatice client',
          'Instruire, suport utilizatori și SLA-uri enterprise',
        ],
      },
      {
        tier: 'Activitate secundară',
        title: 'Portaluri web',
        intro:
          'Platforme web orientate conținut, autentificare și interacțiune — proiectate ca vitrine premium, nu ca template-uri generice.',
        items: [
          'Portaluri web corporate și platforme de brand de elită',
          'Site-uri showcase hiper-performante (edge-native, sub 12ms)',
          'Portaluri cu autentificare, roluri, extranet și zone client',
          'Platforme orientate conținut cu administrare dinamică',
          'Integrări API, webhook-uri și module interactive',
          'Optimizare performanță, SEO tehnic și livrare globală',
        ],
      },
      {
        tier: 'Activitate secundară',
        title:
          'Repararea și întreținerea calculatoarelor și echipamentelor de comunicații',
        intro:
          'Intervenții tehnice, diagnostic și mentenanță preventivă — hardware, rețele locale și echipamente de comunicații.',
        items: [
          'Repararea calculatoarelor și stațiilor de lucru',
          'Întreținerea echipamentelor de comunicații și rețele locale',
          'Diagnostic hardware, software și remediere defecțiuni',
          'Mentenanță preventivă și planuri de service programate',
          'Instalare, configurare și upgrade componente',
          'Intervenții tehnice la fața locului și suport de urgență',
        ],
      },
    ],
  },
  engine: {
    kicker: '// 04 — ARSENALUL',
    title: 'Camera motoarelor.',
    lead: 'Zero umplutură. Zero cod legacy umflat. Construim exclusiv pe stack-uri de ultimă generație, optimizate pentru viteză brută și securitate blindată.',
    roles: {
      typescript: 'Siguranță de tipuri end-to-end',
      react: 'Runtime UI concurent',
      tanstack: 'Full-stack nativ la edge',
      supabase: 'Postgres + Auth + RLS',
      postgresql: 'Nucleul relațional',
      cloudflare: 'Workers · Pages · R2',
      python: 'Automatizări & scripturi de date',
      tailwind: 'Sistem de design atomic',
    },
  },
  secure: {
    kicker: '// 05 — PROTOCOL SECURIZAT',
    headlinePre: 'Izolarea datelor la standard militar. ',
    headlineHighlight: 'Implicit.',
    sub: 'Fiecare rând este protejat. Fiecare conexiune este semnată. Datele tale nu ajung niciodată în stocare publică — sunt izolate în seifuri criptate, în spatele unor funcții proxy securizate.',
    specs: [
      { label: 'AES-GCM · 256-BIT', note: 'Criptare autentificată' },
      { label: 'CRIPTARE LA NIVEL DE CÂMP', note: 'Simetrică, per coloană' },
      { label: 'CONFORM GDPR', note: 'Rezidența datelor în UE' },
      { label: 'CONEXIUNI SEMNATE', note: 'Proxy-uri cu autentificare mutuală' },
    ],
    integrity: 'INTEGRITY: VERIFIED // ACCESS: PROXY-ONLY',
  },
  contact: {
    kicker: '// 06 — CONTACT',
    title: 'Hai să vorbim.',
    sub: 'Spune-ne pe scurt despre proiect. Revenim în cel mult 24 de ore.',
    fields: {
      name: { label: 'Nume', placeholder: 'Ion Popescu' },
      email: { label: 'Email', placeholder: 'ion@companie.ro' },
      phone: { label: 'Telefon', placeholder: '07xx xxx xxx' },
      details: {
        label: 'Detalii proiect',
        placeholder:
          'Descrie pe scurt ce ai nevoie: tip de proiect, termen, buget estimativ...',
      },
    },
    phoneOptional: 'opțional',
    submitIdle: 'Trimite mesajul',
    submitSending: 'Se trimite…',
    submitDone: 'Mesaj trimis ✓',
    submitError: 'Nu am putut trimite mesajul. Încearcă din nou.',
    successNote: 'Mulțumim — te contactăm în curând.',
  },
  footer: {
    legal: '© 2026 AXION VISION SRL · TOATE SISTEMELE OPERAȚIONALE',
    status: 'SYS_STATUS: OPTIMAL',
    servicesTitle: 'Servicii',
    nap: 'Axion Vision SRL · Vârvoru de Jos, Dolj · daviddricu@gmail.com',
  },
}

const en: Dictionary = {
  meta: {
    title: 'IT Consultancy & Web Development for Businesses | Project Axion',
    description:
      'IT consultancy, fast websites and maintenance for SMEs in Romania. Cloud, cybersecurity and automation — Axion Vision SRL (Project Axion). Free quote.',
    keywords:
      'IT consultancy Romania, web development, IT maintenance SME, cloud infrastructure, cybersecurity, web portals, Axion Vision, Project Axion',
    ogTitle: 'IT Consultancy & Web Development — Project Axion',
    ogDescription:
      'IT consultancy, fast websites and maintenance for SMEs in Romania — Axion Vision SRL.',
    twitterTitle: 'IT Consultancy for Businesses | Project Axion',
    twitterDescription:
      'IT consultancy, web development and maintenance for companies in Romania.',
  },
  nav: {
    capabilities: 'Capabilities',
    services: 'Services',
    servicesConsulting: 'IT consultancy',
    servicesPortals: 'Web portals',
    servicesMaintenance: 'IT maintenance',
    engine: 'Engine',
    security: 'Security',
    contact: 'Contact',
    funding: 'PS 2027',
    fundingTitle: 'EU funding information (CAP Strategic Plan 2023–2027)',
    cta: 'Contact',
  },
  hero: {
    kicker: 'Axion Vision SRL — Engineering Division',
    h1Pre: 'Architecting ',
    h1Highlight: 'High-Throughput',
    h1Post: ' Digital Ecosystems.',
    sub: "Project Axion fuses elite web engineering, sovereign cloud infrastructure, and autonomous workflows. We don't build basic websites; we launch hyper-scalable software engines.",
    ctaPrimary: 'Contact us',
    ctaSecondary: 'View Capabilities',
    status: 'SYS_STATUS: OPTIMAL // ENGINES: ACTIVE // LATENCY: <12ms',
    scroll: 'scroll ↓',
  },
  matrix: {
    kicker: '// 02 — CORE CAPABILITIES',
    titlePre: 'Four Pillars. ',
    titleHighlight: 'One Engine.',
    sub: 'A vertically integrated capability stack — engineered, automated, and secured under a single roof.',
    pillars: [
      {
        title: 'Next-Gen Full-Stack Dev',
        body: 'Built on TanStack Start, React 19, and Vite. Server Functions that execute at the edge in single-digit milliseconds. No hydration tax, no waterfall — just instrument-grade performance shipped globally.',
      },
      {
        title: 'Autonomous Engines',
        body: 'Custom Python and Node.js scripts that run while you sleep. Cron-driven pipelines, real-time API syncing, and self-healing workflows that eliminate human friction and operational drag entirely.',
      },
      {
        title: 'Sovereign Infrastructure',
        body: 'Supabase + PostgreSQL with advanced relational indexing and surgical Row-Level Security. Cold data sealed in isolated Cloudflare R2 vaults. Your stack, your rules, your sovereignty.',
      },
      {
        title: 'Strategic Architecture',
        body: 'Enterprise IT consultancy for systems built to scale. Architecture audits, multi-tenant security design, and the hard engineering decisions made before the first line of code ships.',
      },
    ],
  },
  services: {
    kicker: '// 03 — SERVICES',
    titlePre: 'Three domains. ',
    titleHighlight: 'Full coverage.',
    sub: 'IT consultancy, elite web portals and equipment maintenance — delivered with the same engineering standard, from architecture to operations.',
    learnMore: 'Learn more',
    domains: [
      {
        tier: 'Primary activity',
        title:
          'Information technology consultancy and computer facilities management',
        intro:
          'Hardware, software and systems consultancy — design, operations, cybersecurity and infrastructure audit. The Project Axion core.',
        items: [
          'Architecture audit and technical assessment of existing systems',
          'Planning and design of integrated information systems',
          'High-performance full-stack web applications (TanStack Start, React 19, Vite)',
          'SSR platforms, Server Functions and REST / RPC APIs at the edge',
          'Supabase + PostgreSQL architectures (indexing, RLS, migrations)',
          'Cloudflare Workers, Pages and R2 deploy and operations',
          'Python and Node.js scripts, cron pipelines and API sync',
          'Autonomous workflows, ETL and batch processing',
          'Cybersecurity consultancy, network monitoring and testing',
          'AES-GCM 256-bit encryption, GDPR compliance, data isolation',
          'Client information systems management and operation',
          'Training, user support and enterprise SLAs',
        ],
      },
      {
        tier: 'Secondary activity',
        title: 'Web portal activities',
        intro:
          'Content-driven, authenticated and interactive web platforms — engineered as premium showcases, not generic templates.',
        items: [
          'Corporate web portals and elite brand platforms',
          'Hyper-performance showcase sites (edge-native, sub-12ms)',
          'Portals with authentication, roles, extranet and client zones',
          'Content-driven platforms with dynamic administration',
          'API integrations, webhooks and interactive modules',
          'Performance optimization, technical SEO and global delivery',
        ],
      },
      {
        tier: 'Secondary activity',
        title:
          'Repair and maintenance of computers and communication equipment',
        intro:
          'Technical interventions, diagnostics and preventive maintenance — hardware, local networks and communication equipment.',
        items: [
          'Computer and workstation repair',
          'Communication equipment and local network maintenance',
          'Hardware and software diagnostics and fault remediation',
          'Preventive maintenance and scheduled service plans',
          'Component installation, configuration and upgrades',
          'On-site technical interventions and emergency support',
        ],
      },
    ],
  },
  engine: {
    kicker: '// 04 — THE ARSENAL',
    title: 'The Engine Room.',
    lead: 'Zero filler. Zero bloated legacy code. We engineer exclusively on cutting-edge stacks optimized for raw speed and bulletproof security.',
    roles: {
      typescript: 'End-to-end type safety',
      react: 'Concurrent UI runtime',
      tanstack: 'Edge-native full-stack',
      supabase: 'Postgres + Auth + RLS',
      postgresql: 'Relational core engine',
      cloudflare: 'Workers · Pages · R2',
      python: 'Automation & data scripts',
      tailwind: 'Atomic design system',
    },
  },
  secure: {
    kicker: '// 05 — PROTOCOL SECURE',
    headlinePre: 'Military-Grade Data Isolation. ',
    headlineHighlight: 'By Default.',
    sub: 'Every row is protected. Every connection is signed. Your data never lives in public storage—it is isolated in encrypted vaults behind secure proxy functions.',
    specs: [
      { label: 'AES-GCM · 256-BIT', note: 'Authenticated encryption' },
      { label: 'FIELD-LEVEL ENCRYPTION', note: 'Symmetric, per-column' },
      { label: 'GDPR COMPLIANT', note: 'EU data residency' },
      { label: 'SIGNED CONNECTIONS', note: 'Mutual auth proxies' },
    ],
    integrity: 'INTEGRITY: VERIFIED // ACCESS: PROXY-ONLY',
  },
  contact: {
    kicker: '// 06 — CONTACT',
    title: "Let's talk.",
    sub: "Tell us briefly about your project. We'll get back to you within 24 hours.",
    fields: {
      name: { label: 'Name', placeholder: 'John Smith' },
      email: { label: 'Email', placeholder: 'john@company.com' },
      phone: { label: 'Phone', placeholder: '+40 7xx xxx xxx' },
      details: {
        label: 'Project details',
        placeholder:
          'Briefly describe what you need: project type, timeline, estimated budget...',
      },
    },
    phoneOptional: 'optional',
    submitIdle: 'Send message',
    submitSending: 'Sending…',
    submitDone: 'Message sent ✓',
    submitError: 'Could not send your message. Please try again.',
    successNote: 'Thank you — we will be in touch soon.',
  },
  footer: {
    legal: '© 2026 AXION VISION SRL · ALL SYSTEMS OPERATIONAL',
    status: 'SYS_STATUS: OPTIMAL',
    servicesTitle: 'Services',
    nap: 'Axion Vision SRL · Vârvoru de Jos, Dolj · daviddricu@gmail.com',
  },
}

export const translations: Record<Lang, Dictionary> = { ro, en }
