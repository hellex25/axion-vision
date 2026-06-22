/**
 * Date afișate pe site conform Anexei II AFIR — secțiunea B-(1) / model C.1 PS 2027.
 */
export const feadrFundingConfig = {
  showNotice: true,

  projectName:
    'Înființarea și dezvoltarea unui start-up de servicii IT și consultanță în tehnologia informației în comuna Vârvoru de Jos, județul Dolj',

  projectCode: 'F36010806109241703226',

  county: 'Dolj',
  locality: 'Vârvoru de Jos',

  beneficiary: 'AXION VISION SRL',

  totalEligibleEur: 65_000,
  feadrFundingEur: 65_000,

  designer: 'AXION VISION SRL',
  executor: 'AXION VISION SRL',

  startDate: '2026',
  endDate: '2029',

  /** Proiect LEADER — afișează logo LEADER pe placă */
  isLeader: true,

  shortDescription:
    'Proiect de înființare și dezvoltare a unui start-up de servicii IT și consultanță în tehnologia informației, prin investiții în echipamente, infrastructură digitală și platformă web, implementat în comuna Vârvoru de Jos, județul Dolj.',

  goalsAndResults:
    'Crearea și dezvoltarea capacității de livrare a serviciilor IT și de consultanță TI, creșterea productivității și accesul la servicii digitale performante în mediul rural, cu sprijin financiar nerambursabil de 65.000 EUR (100%) din fonduri europene FEADR prin LEADER.',

  contractingAuthority:
    'Agenția pentru Finanțarea Investițiilor Rurale (AFIR), din cadrul Ministerului Agriculturii și Dezvoltării Rurale',

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

/** Format model C.1: „65.000 euro” */
export function formatEurPlain(value: number) {
  if (value == null || Number.isNaN(value)) return '—'
  return `${new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 0 }).format(value)} euro`
}
