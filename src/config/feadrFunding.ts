/**
 * Date din Contractul de Finanțare AFIR — C 1.1L DR 36 LEADER Start-up.
 * Contract nr. C 36010806109241703226 · Cerere F 36010806109241703226
 */
export const feadrFundingConfig = {
  showNotice: true,

  contractNumber: 'C 36010806109241703226',
  projectNumber: '36010806109241703226',
  projectCode: 'F36010806109241703226',
  fundingRequestNumber: 'F 36010806109241703226',

  projectName:
    'Înființarea și dezvoltarea unui start-up de servicii IT și consultanță în tehnologia informației în comuna Vârvoru de Jos, județul Dolj',

  intervention:
    'C 1.1L — Intervenția DR 36 LEADER: Dezvoltarea locală plasată sub responsabilitatea comunității — proiecte de tip start-up neagricol (M6)',
  callTitle: 'Apel de selecție 1/2025 I6',

  county: 'Dolj',
  locality: 'Vârvoru de Jos',
  implementationAddress:
    'Sat Vîrvor, nr. 1, Comuna Vârvoru de Jos, jud. Dolj, cod poștal 207637',

  beneficiary: 'AXION VISION SRL',
  beneficiaryFullName: 'AXION VISION SOCIETATE CU RĂSPUNDERE LIMITATĂ',
  cui: '53180379',
  legalRepresentative: 'Dricu David Costin',
  companyFounded: '23.12.2025',

  totalEligibleEur: 65_000,
  totalEligibleRon: 331_292,
  feadrFundingEur: 65_000,
  feadrFundingRon: 331_292,
  fundingPercent: 100,

  /** Tranșe conform Art. 3 — Contract de finanțare */
  tranches: [
    { label: 'Prima tranșă (70%)', eur: 45_500, ron: 231_904.4 },
    { label: 'A doua tranșă (30%)', eur: 19_500, ron: 99_387.6 },
  ] as const,

  /** Durata execuție: max. 36 luni de la semnare; implementare max. 33 luni */
  startDate: '2026',
  endDate: '2029',

  /** Start-up implementat de beneficiar — conform Planului de afaceri */
  designer: 'AXION VISION SRL',
  executor: 'AXION VISION SRL',

  isLeader: true,
  galName:
    'Asociația Grupul de Acțiune Locală Lunca Jiului–Câmpia Desnățuiului',
  galSdlCode: 'SD0123000000044',

  caenCodes: ['6220', '6391'] as const,

  contactEmail: 'daviddricu@gmail.com',
  contactPhone: '', // completează telefon echipă proiect, dacă e cazul

  contractingAuthority:
    'Agenția pentru Finanțarea Investițiilor Rurale (AFIR), din cadrul Ministerului Agriculturii și Dezvoltării Rurale',
  crfir: 'Centrul Regional pentru Finanțarea Investițiilor Rurale 4 Sud-Vest — Craiova',

  shortDescription:
    'Proiect de înființare și dezvoltare a unui start-up de servicii IT și consultanță în tehnologia informației, prin investiții în echipamente, infrastructură digitală și platformă web, implementat în comuna Vârvoru de Jos, județul Dolj.',
  goalsAndResults:
    'Crearea și dezvoltarea capacității de livrare a serviciilor IT și de consultanță TI, creșterea productivității și accesul la servicii digitale performante în mediul rural, cu sprijin financiar nerambursabil de 65.000 EUR (100%) din fonduri europene FEADR prin LEADER.',

  feadrCommissionUrl:
    'https://agriculture.ec.europa.eu/common-agricultural-policy/rural-development_en',
} as const

export type FeadrFundingConfig = typeof feadrFundingConfig

export function formatEur(value: number) {
  if (value == null || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatRon(value: number) {
  if (value == null || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON',
    maximumFractionDigits: 0,
  }).format(value)
}
