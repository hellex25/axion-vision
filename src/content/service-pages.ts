import type { SeoMeta } from '~/lib/seo'
import { SERVICE_ROUTES } from '~/lib/site'

export interface ServicePageContent {
  pathname: string
  meta: SeoMeta
  h1: string
  intro: string
  sections: { title: string; paragraphs: string[] }[]
  deliverablesTitle: string
  deliverables: string[]
  audienceTitle: string
  audience: string[]
  ctaTitle: string
  ctaBody: string
  schemaName: string
  schemaServiceType: string
}

export const consultantaItPage: ServicePageContent = {
  pathname: SERVICE_ROUTES.consultantaIt,
  meta: {
    title: 'Consultanță IT pentru Firme & IMM-uri | Project Axion',
    description:
      'Consultanță IT pentru firme mici și mijlocii din România: audit sisteme, cloud, securitate cibernetică, automatizări și infrastructură scalabilă. Solicită o ofertă gratuită.',
    keywords:
      'consultanță IT firme, consultanță IT IMM, infrastructură cloud România, securitate cibernetică firme, audit IT, automatizări business, Axion Vision',
    ogTitle: 'Consultanță IT pentru Firme — Project Axion',
    ogDescription:
      'Audit, arhitectură și operare IT pentru IMM-uri: cloud, securitate și automatizări cu livrare rapidă.',
    twitterTitle: 'Consultanță IT pentru Firme | Project Axion',
    twitterDescription:
      'Consultanță IT, cloud și securitate pentru firme din România. Estimare gratuită în 24h.',
  },
  h1: 'Consultanță IT pentru firme care vor sisteme sigure și scalabile',
  intro:
    'Dacă firma ta depinde de calculatoare, aplicații web sau date în cloud, ai nevoie de un partener IT care înțelege atât tehnologia, cât și realitatea unui IMM: buget limitat, termene clare și zero toleranță pentru downtime. Project Axion (Axion Vision SRL) oferă consultanță IT completă — de la evaluarea sistemelor existente până la proiectarea și operarea infrastructurii digitale.',
  sections: [
    {
      title: 'Problemele pe care le rezolvăm pentru IMM-uri',
      paragraphs: [
        'Multe firme mici ajung să lucreze cu soluții puse laolaltă în timp: un site vechi, fișiere pe stick-uri, parole partajate, backup-uri inexistente. Când ceva se strică, pierzi timp, bani și încrederea clienților.',
        'Consultanța noastră IT începe cu un audit clar: ce funcționează, ce e riscant și ce trebuie schimbat primul. Prioritizăm acțiunile după impactul asupra afacerii tale, nu după moda tehnologică a momentului.',
        'Lucrăm remote cu firme din toată România și oferim intervenții la fața locului în județul Dolj, din baza noastră din Vârvoru de Jos.',
      ],
    },
    {
      title: 'Ce include consultanța IT Project Axion',
      paragraphs: [
        'Acoperim întregul ciclu: evaluare tehnică, planificare, implementare și mentenanță. Construim aplicații web full-stack de înaltă performanță, deploy pe Cloudflare Workers și baze de date Supabase cu PostgreSQL — stack-uri moderne, rapide și conforme GDPR.',
        'Proiectăm arhitecturi multi-tenant, pipeline-uri de automatizare (Python, Node.js, cron) și fluxuri ETL care reduc munca manuală. Pentru securitate, aplicăm criptare AES-GCM, Row-Level Security și monitorizare continuă.',
        'Oferim și management operațional: migrări, actualizări, suport utilizatori și SLA-uri adaptate dimensiunii firmei tale.',
      ],
    },
    {
      title: 'De ce firmele aleg un partener tehnic, nu doar un „freelancer de site-uri"',
      paragraphs: [
        'Un site sau o aplicație nu e un proiect izolat — e parte din infrastructura firmei. Noi gândim sistemul cap-coadă: cum se autentifică utilizatorii, unde stau datele, cum faci backup, ce se întâmplă la 10.000 de înregistrări în loc de 100.',
        'Folosim tehnologii edge-native (TanStack Start, React 19) pentru timpi de răspuns sub 12 ms și costuri de hosting predictibile. Asta înseamnă site-uri și aplicații care se încarcă rapid pe mobil — esențial pentru clienții tăi și pentru Google.',
        'Transparența e parte din serviciu: primești recomandări clare, estimări realiste și documentație pe care o poți înțelege chiar dacă nu ești inginer.',
      ],
    },
  ],
  deliverablesTitle: 'Ce primești concret',
  deliverables: [
    'Audit tehnic al sistemelor și infrastructurii existente',
    'Plan de acțiune prioritizat pe riscuri și buget',
    'Arhitectură cloud (Cloudflare, Supabase, PostgreSQL)',
    'Aplicații web și API-uri la edge, scalabile',
    'Automatizări și integrări între sisteme',
    'Consultanță securitate cibernetică și conformitate GDPR',
    'Mentenanță, suport și instruire pentru echipă',
  ],
  audienceTitle: 'Pentru cine este acest serviciu',
  audience: [
    'IMM-uri care digitalizează procesele interne',
    'Firme de servicii care au nevoie de aplicații web custom',
    'Antreprenori care vor infrastructură IT sigură de la început',
    'Companii care migrează de la soluții vechi la cloud modern',
  ],
  ctaTitle: 'Solicită o evaluare IT gratuită',
  ctaBody:
    'Spune-ne pe scurt ce sisteme folosești și ce probleme întâmpini. Revenim în cel mult 24 de ore cu pașii recomandați și o estimare orientativă.',
  schemaName: 'Consultanță IT pentru firme',
  schemaServiceType: 'Consultanță în tehnologia informației',
}

export const portaluriWebPage: ServicePageContent = {
  pathname: SERVICE_ROUTES.portaluriWeb,
  meta: {
    title: 'Dezvoltare Web & Portaluri Corporate | Project Axion',
    description:
      'Site-uri și portaluri web rapide pentru firme din România: prezentare, autentificare, extranet, SEO tehnic și livrare globală pe Cloudflare. Ofertă gratuită.',
    keywords:
      'dezvoltare web firmă, portaluri web corporate, site business România, site rapid IMM, dezvoltare site profesional, SEO tehnic, Axion Vision',
    ogTitle: 'Dezvoltare Web & Portaluri pentru Firme — Project Axion',
    ogDescription:
      'Site-uri și portaluri web premium, rapide și optimizate SEO pentru IMM-uri din România.',
    twitterTitle: 'Dezvoltare Web pentru Firme | Project Axion',
    twitterDescription:
      'Site-uri și portaluri web performante pentru business. Estimare în 24h.',
  },
  h1: 'Site-uri și portaluri web care încarcă rapid și inspiră încredere',
  intro:
    'Primul contact al clienților tăi cu firma este adesea online. Un site lent, învechit sau greu de folosit pe telefon îți costă lead-uri în fiecare zi. Project Axion construiește site-uri de prezentare și portaluri web corporate — rapide, sigure și gândite să crească odată cu afacerea ta.',
  sections: [
    {
      title: 'Ce înseamnă un site bun pentru o firmă mică sau mijlocie',
      paragraphs: [
        'Un site de business nu trebuie să fie complicat, dar trebuie să fie profesionist: se încarcă în câteva secunde, arată bine pe telefon, explică clar ce oferi și te ajută să fii găsit pe Google.',
        'Multe firme rămân blocate cu template-uri generice sau site-uri WordPress neoptimizate care se strică la fiecare update. Noi construim de la zero pe tehnologii moderne, cu performanță și securitate integrate din start.',
        'Fiecare proiect include optimizare SEO tehnică: titluri, descrieri, structură semantică, viteză și date structurate — astfel încât site-ul tău să poată concura în căutările relevante pentru serviciile tale.',
      ],
    },
    {
      title: 'Portaluri web — mai mult decât un site de prezentare',
      paragraphs: [
        'Când ai nevoie de zone pentru clienți, autentificare, roluri diferite sau administrare conținut, un portal web este soluția potrivită. Proiectăm platforme cu extranet, formulare securizate, integrări API și webhook-uri către CRM-ul sau softul tău de facturare.',
        'Stack-ul nostru (TanStack Start, React 19, Supabase) permite livrare rapidă fără compromisuri: server-side rendering pentru SEO, funcții la edge pentru viteză, autentificare și baze de date relaționale pentru date complexe.',
        'Site-urile sunt găzduite pe Cloudflare — rețea globală, protecție DDoS inclusă și timpi de răspuns foarte mici pentru vizitatorii din România și din străinătate.',
      ],
    },
    {
      title: 'Procesul nostru de lucru cu firmele',
      paragraphs: [
        'Începem cu o discuție scurtă despre obiective, public țintă și buget. Apoi propunem structura site-ului, designul aliniat cu brandul tău și un calendar realist de livrare.',
        'Un site de prezentare pentru IMM poate fi livrat în 2–4 săptămâni. Portalurile cu funcționalități avansate durează 1–3 luni, în funcție de integrări și numărul de roluri de utilizator.',
        'După lansare, oferim mentenanță, actualizări și suport tehnic — nu te lăsăm singur după ce site-ul e live.',
      ],
    },
  ],
  deliverablesTitle: 'Ce livrăm',
  deliverables: [
    'Site de prezentare sau portal web custom',
    'Design responsive (mobil, tabletă, desktop)',
    'Optimizare SEO tehnic și performanță (Core Web Vitals)',
    'Formulare de contact și integrări email',
    'Zone cu autentificare, roluri și extranet (la cerere)',
    'Administrare conținut dinamic',
    'Deploy pe Cloudflare cu certificat SSL',
  ],
  audienceTitle: 'Ideal pentru',
  audience: [
    'Firme de servicii care au nevoie de prezență online profesională',
    'Companii care vor un portal pentru clienți sau parteneri',
    'Antreprenori care lansează un brand nou pe piață',
    'Business-uri care înlocuiesc un site vechi cu unul modern',
  ],
  ctaTitle: 'Solicită o ofertă pentru site-ul tău',
  ctaBody:
    'Descrie-ne proiectul — tip de site, termen dorit, funcționalități necesare. Îți trimitem o estimare orientativă în cel mult 24 de ore.',
  schemaName: 'Dezvoltare web și portaluri corporate',
  schemaServiceType: 'Dezvoltare web și portaluri',
}

export const mentenantaItPage: ServicePageContent = {
  pathname: SERVICE_ROUTES.mentenantaIt,
  meta: {
    title: 'Mentenanță IT & Reparare Calculatoare Firme | Project Axion',
    description:
      'Mentenanță IT, reparare calculatoare și suport rețea pentru firme din Dolj și România. Diagnostic, intervenții la fața locului și planuri de service preventiv.',
    keywords:
      'mentenanță IT firme, reparare calculatoare firmă, suport IT IMM, mentenanță rețea locală, service calculatoare Dolj, intervenții IT, Axion Vision',
    ogTitle: 'Mentenanță IT pentru Firme — Project Axion',
    ogDescription:
      'Reparare calculatoare, mentenanță rețele și suport IT pentru IMM-uri. Intervenții în Dolj și remote.',
    twitterTitle: 'Mentenanță IT pentru Firme | Project Axion',
    twitterDescription:
      'Mentenanță IT și reparare echipamente pentru firme. Suport rapid, planuri preventive.',
  },
  h1: 'Mentenanță IT și reparare echipamente pentru firme care nu își permit opriri',
  intro:
    'Când un calculator sau o rețea se oprește, firma ta pierde productivitate imediat. Project Axion oferă mentenanță IT, diagnostic și reparare pentru calculatoare, stații de lucru și echipamente de comunicații — cu planuri preventive care reduc surprizele și costurile pe termen lung.',
  sections: [
    {
      title: 'De ce mentenanța preventivă costă mai puțin decât o pană',
      paragraphs: [
        'Majoritatea problemelor IT grave încep cu semne mici: calculatorul merge greu, internetul pică intermitent, backup-ul nu a mai rulat de luni. Mentenanța preventivă identifică aceste riscuri înainte să devină urgențe scumpe.',
        'Oferim planuri de service programate — verificări periodice ale hardware-ului, actualizări software, curățare sistem și testare backup. Pentru firmele din Dolj, putem interveni la fața locului; pentru restul României, rezolvăm multe probleme remote.',
        'Documentăm fiecare intervenție, astfel încât să știi exact ce s-a făcut și când e nevoie de următorul control.',
      ],
    },
    {
      title: 'Servicii de reparare și suport tehnic',
      paragraphs: [
        'Reparăm calculatoare și stații de lucru: diagnostic hardware și software, înlocuire componente, recuperare după defecțiuni, instalare și configurare sisteme de operare.',
        'Întreținem rețele locale și echipamente de comunicații: routere, switch-uri, cablare, configurare Wi-Fi pentru birouri mici și medii.',
        'Oferim suport de urgență pentru situații critice — când un echipament esențial nu funcționează și ai nevoie de rezolvare rapidă.',
      ],
    },
    {
      title: 'Combinația perfectă: mentenanță + consultanță IT',
      paragraphs: [
        'Mentenanța hardware merge mână în mână cu consultanța software. Dacă firma ta are nevoie și de site-uri, cloud sau securitate, acoperim totul sub același acoperiș — fără să jonglezi cu cinci furnizori diferiți.',
        'Axion Vision SRL este înregistrată pentru consultanță IT (CAEN 6220) și pentru repararea echipamentelor de calcul — o combinație rară care acoperă atât biroul tău fizic, cât și infrastructura digitală.',
        'Contactează-ne pentru un plan de mentenanță adaptat numărului de stații de lucru și tipului de activitate.',
      ],
    },
  ],
  deliverablesTitle: 'Ce include serviciul',
  deliverables: [
    'Diagnostic hardware și software',
    'Reparare calculatoare și stații de lucru',
    'Mentenanță rețele locale și echipamente de comunicații',
    'Instalare, configurare și upgrade componente',
    'Planuri de mentenanță preventivă programată',
    'Intervenții la fața locului (Dolj) și suport remote',
    'Suport de urgență pentru defecțiuni critice',
  ],
  audienceTitle: 'Pentru cine',
  audience: [
    'Birouri mici cu 2–20 stații de lucru',
    'Firme din Dolj care au nevoie de intervenții locale',
    'IMM-uri fără departament IT intern',
    'Companii care vor un singur partener pentru IT hardware și software',
  ],
  ctaTitle: 'Cere un plan de mentenanță IT',
  ctaBody:
    'Spune-ne câte echipamente ai și ce probleme întâmpini des. Îți propunem un plan de mentenanță și o estimare de cost.',
  schemaName: 'Mentenanță IT și reparare echipamente',
  schemaServiceType: 'Reparare și întreținere echipamente IT',
}

export const servicePages = [
  consultantaItPage,
  portaluriWebPage,
  mentenantaItPage,
] as const

export function getRelatedServices(currentPath: string) {
  return servicePages
    .filter((page) => page.pathname !== currentPath)
    .map((page) => ({
      path: page.pathname,
      label: page.schemaName,
    }))
}
