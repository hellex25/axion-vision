import type { SeoMeta } from '~/lib/seo'
import { CAREER_ROUTES, CONTACT_EMAIL } from '~/lib/site'

export interface JobPageContent {
  pathname: string
  meta: SeoMeta
  h1: string
  intro: string
  sections: { title: string; paragraphs: string[] }[]
  responsibilitiesTitle: string
  responsibilities: string[]
  requirementsTitle: string
  requirements: string[]
  offersTitle: string
  offers: string[]
  priorityNote: string
  processTitle: string
  processSteps: string[]
  contactPhone: string
  contactEmail: string
  jobTitle: string
  corCode: string
  employmentType: string
  /** ISO date (YYYY-MM-DD) — JobPosting validThrough = +6 luni. */
  datePosted: string
}

const companySection = {
  title: 'Despre companie',
  paragraphs: [
    'Axion Vision SRL desfășoară activități de consultanță în tehnologia informației (CAEN 6220) și administrare portaluri web (CAEN 6391), adresându-se microîntreprinderilor, persoanelor fizice și instituțiilor publice locale din mediul rural și din zona regională.',
    'Punctul de lucru se află în Vârvoru de Jos, Dolj, nr. 108. Oferim un mediu de lucru modern, cu echipamente IT performante, și instruire la locul de muncă pentru posturile care nu necesită studii de specialitate.',
  ],
}

const priorityNote =
  'În cadrul procesului de recrutare asumat prin proiectul finanțat, prioritate acordată persoanelor din categorii vulnerabile și de pe teritoriul GAL. Toate candidaturile eligibile sunt evaluate în mod echitabil.'

const CONTACT_PHONE = '0749516549'

export const asistentOperationalPage: JobPageContent = {
  pathname: CAREER_ROUTES.asistentOperational,
  meta: {
    title: 'Angajare Asistent Operațional — Axion Vision SRL | Project Axion',
    description:
      'Axion Vision SRL angajează Asistent operațional (COR 411002), normă întreagă, Vârvoru de Jos, Dolj. CIM permanent, instruire la locul de muncă. Aplică online.',
    keywords:
      'loc de muncă Vârvoru de Jos, angajare Dolj, asistent operațional, COR 411002, Axion Vision, IT rural, GAL',
    ogTitle: 'Se caută Asistent operațional — Axion Vision SRL',
    ogDescription:
      'Post permanent, normă întreagă, Vârvoru de Jos. Susține activitatea IT a unei microîntreprinderi locale — aplică direct pe site.',
    twitterTitle: 'Angajare Asistent Operațional | Axion Vision',
    twitterDescription:
      'CIM permanent, normă întreagă, Vârvoru de Jos, Dolj. Aplică online.',
  },
  h1: 'Se caută Asistent operațional',
  intro:
    'Axion Vision SRL — microîntreprindere IT din Vârvoru de Jos, județul Dolj — angajează un Asistent operațional (COR 411002) cu normă întreagă. Rolul susține activitatea de consultanță IT și servicii digitale prin sarcini administrative și operaționale: preluarea solicitărilor clienților, organizarea documentelor, introducerea datelor și programarea intervențiilor.',
  sections: [companySection],
  responsibilitiesTitle: 'Responsabilități',
  responsibilities: [
    'Gestionarea solicitărilor primite de la clienți (telefon, email, online)',
    'Organizarea și arhivarea documentelor interne și ale clienților',
    'Introducerea, validarea și prelucrarea datelor în evidențele firmei',
    'Programarea intervențiilor tehnice și a activităților operaționale',
    'Suport administrativ pentru echipa tehnică și relația cu clienții',
  ],
  requirementsTitle: 'Cerințe',
  requirements: [
    'Studii medii (minim)',
    'Cunoștințe de bază de utilizare PC și organizare a muncii',
    'Disponibilitate pentru normă întreagă (8 ore/zi, 40 ore/săptămână)',
    'Seriozitate, atenție la detalii și comunicare clară',
    'Reședință sau domiciliu în județul Dolj / zona GAL reprezintă un avantaj',
  ],
  offersTitle: 'Oferim',
  offers: [
    'Contract individual de muncă (CIM) pe perioadă nedeterminată',
    'Program normă întreagă, post permanent',
    'Instruire la locul de muncă — nu sunt necesare studii de specialitate IT',
    'Mediu de lucru IT modern, în Vârvoru de Jos',
    'Oportunitate de dezvoltare într-o firmă locală de servicii digitale',
  ],
  priorityNote,
  processTitle: 'Proces de selecție',
  processSteps: [
    'Completezi formularul de aplicare de pe această pagină',
    'Analizăm candidatura și te contactăm telefonic sau prin email',
    'Interviu la punctul de lucru din Vârvoru de Jos',
    'Decizie și, după caz, încheiere contract individual de muncă',
  ],
  contactPhone: CONTACT_PHONE,
  contactEmail: CONTACT_EMAIL,
  jobTitle: 'Asistent operațional',
  corCode: '411002',
  employmentType: 'FULL_TIME',
  datePosted: '2026-07-13',
}

export const tehnicianSistemeInformaticePage: JobPageContent = {
  pathname: CAREER_ROUTES.tehnicianSistemeInformatice,
  meta: {
    title:
      'Angajare Tehnician Sisteme Informatice — Axion Vision SRL | Project Axion',
    description:
      'Axion Vision SRL angajează Tehnician sisteme informatice (COR 351103), normă întreagă, Vârvoru de Jos, Dolj. CIM permanent, instruire la locul de muncă. Aplică online.',
    keywords:
      'loc de muncă Vârvoru de Jos, angajare Dolj, tehnician IT, tehnician echipamente de calcul și rețele, COR 351103, Axion Vision, IT rural, GAL',
    ogTitle: 'Se caută Tehnician sisteme informatice — Axion Vision SRL',
    ogDescription:
      'Post permanent, normă întreagă, Vârvoru de Jos. Instalare, configurare și mentenanță echipamente IT și rețele — aplică direct pe site.',
    twitterTitle: 'Angajare Tehnician Sisteme Informatice | Axion Vision',
    twitterDescription:
      'CIM permanent, normă întreagă, Vârvoru de Jos, Dolj. Aplică online.',
  },
  h1: 'Se caută Tehnician sisteme informatice',
  intro:
    'Axion Vision SRL — microîntreprindere IT din Vârvoru de Jos, județul Dolj — angajează un Tehnician sisteme informatice (COR 351103 — Tehnician echipamente de calcul și rețele) cu normă întreagă. Rolul susține activitatea de consultanță IT, mentenanță și servicii digitale prin intervenții tehnice: instalarea, configurarea și întreținerea echipamentelor IT, a rețelelor și a aplicațiilor pentru clienții firmei.',
  sections: [companySection],
  responsibilitiesTitle: 'Responsabilități',
  responsibilities: [
    'Instalarea, configurarea și punerea în funcțiune a calculatoarelor, imprimantelor și a altor echipamente IT',
    'Instalarea și actualizarea sistemelor de operare, aplicațiilor și soluțiilor antivirus',
    'Configurarea și întreținerea rețelelor locale (LAN/Wi-Fi), routerelor și echipamentelor de rețea',
    'Diagnosticarea și remedierea defecțiunilor hardware și software, la sediul clientului sau de la distanță',
    'Mentenanță preventivă, backup de date și verificări periodice ale sistemelor',
    'Suport tehnic pentru utilizatori și evidența intervențiilor efectuate',
  ],
  requirementsTitle: 'Cerințe',
  requirements: [
    'Studii medii (minim); liceu cu profil tehnic/informatic sau curs de calificare în domeniu reprezintă un avantaj',
    'Cunoștințe de hardware, sisteme de operare (Windows, de preferat și Linux) și rețele de bază',
    'Disponibilitate pentru normă întreagă (8 ore/zi, 40 ore/săptămână) și pentru deplasări la clienți din zonă',
    'Seriozitate, atenție la detalii, capacitate de rezolvare a problemelor și comunicare clară',
    'Permis de conducere categoria B reprezintă un avantaj',
    'Reședință sau domiciliu în județul Dolj / zona GAL reprezintă un avantaj',
  ],
  offersTitle: 'Oferim',
  offers: [
    'Contract individual de muncă (CIM) pe perioadă nedeterminată',
    'Program normă întreagă, post permanent',
    'Instruire la locul de muncă pe echipamentele și procedurile firmei',
    'Mediu de lucru IT modern, în Vârvoru de Jos',
    'Oportunitate de dezvoltare într-o firmă locală de servicii digitale',
  ],
  priorityNote,
  processTitle: 'Proces de selecție',
  processSteps: [
    'Completezi formularul de aplicare de pe această pagină',
    'Analizăm candidatura și te contactăm telefonic sau prin email',
    'Interviu (cu o scurtă probă practică) la punctul de lucru din Vârvoru de Jos',
    'Decizie și, după caz, încheiere contract individual de muncă',
  ],
  contactPhone: CONTACT_PHONE,
  contactEmail: CONTACT_EMAIL,
  jobTitle: 'Tehnician sisteme informatice',
  corCode: '351103',
  employmentType: 'FULL_TIME',
  datePosted: '2026-10-07',
}

export const JOB_PAGES: JobPageContent[] = [
  tehnicianSistemeInformaticePage,
  asistentOperationalPage,
]
