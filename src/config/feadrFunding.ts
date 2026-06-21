/**
 * Date din cererea / contractul de finanțare AFIR–LEADER (PS 2023–2027).
 * Sursă: Apel de selecție 1/2025 I6 — Start-up M6.
 */
export const feadrFundingConfig = {
  showNotice: true,

  projectName:
    'Înființarea și dezvoltarea unui start-up de servicii IT și consultanță în tehnologia informației în comuna Vârvoru de Jos, județul Dolj',
  projectCode: 'F36010806109241703226',

  county: 'Dolj',
  locality: 'Vârvoru de Jos',

  beneficiary: 'AXION VISION SRL',
  cui: '53180379',
  legalRepresentative: 'Dricu David Costin',

  totalEligibleEur: 65_000,
  feadrFundingEur: 65_000,
  fundingPercent: 100,

  /** Proiect finanțat prin LEADER / GAL */
  isLeader: true,
  galName:
    'Asociația Grupul de Acțiune Locală Lunca Jiului–Câmpia Desnățuiului',
  galSdlCode: 'SD0123000000044',

  callTitle: 'Apel de selecție 1/2025 I6',
  intervention:
    'M6 — Înființare activități non-agricole de tip start-up (Start-up)',
  caenCodes: ['6220', '6391'] as const,

  /** Completează din contractul de finanțare semnat, dacă diferă */
  designer: '—',
  executor: '—',
  startDate: '2026',
  endDate: '2028',

  shortDescription:
    'Investiție în echipamente IT, platformă digitală și servicii de consultanță în tehnologia informației, pentru înființarea și dezvoltarea activității Axion Vision SRL în comuna Vârvoru de Jos.',
  goalsAndResults:
    'Crearea și dezvoltarea unui start-up de servicii IT și consultanță TI, creșterea capacității operaționale și accesul la servicii digitale performante în mediul rural, cu sprijin financiar nerambursabil din fonduri europene (FEADR) prin LEADER.',

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
