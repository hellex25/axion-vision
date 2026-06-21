/**
 * Date din contractul de finanțare AFIR / PS 2023–2027.
 * Actualizează valorile conform contractului semnat (Anexa II).
 */
export const feadrFundingConfig = {
  showNotice: true,

  projectName:
    'Dezvoltarea activității Axion Vision SRL prin investiții în echipamente IT și platformă digitală',
  projectCode: 'C11L-XXXXXX', // Cod cerere AFIR din contract
  county: 'Județul …', // ex: Județul Iași
  locality: 'Localitatea …', // ex: Municipiul Iași

  beneficiary: 'Axion Vision SRL',
  totalEligibleEur: 0, // Valoare totală eligibilă (€) — din contract
  feadrFundingEur: 0, // Finanțare nerambursabilă PS 2023–2027 (€)

  designer: '—', // Proiectant — din contract
  executor: '—', // Executant — din contract
  startDate: '2026', // Demarare
  endDate: '2028', // Finalizare

  /** Proiect finanțat prin LEADER */
  isLeader: false,

  shortDescription:
    'Investiție în echipamente IT, infrastructură digitală și platformă web pentru extinderea serviciilor de consultanță și dezvoltare software.',
  goalsAndResults:
    'Modernizarea capacității operaționale, creșterea productivității și accesul la servicii IT performante, cu sprijin financiar din fonduri europene nerambursabile.',

  /** Site-ul Comisiei Europene referitor la FEADR (obligatoriu — Anexa II) */
  feadrCommissionUrl:
    'https://agriculture.ec.europa.eu/common-agricultural-policy/rural-development_en',
} as const

export type FeadrFundingConfig = typeof feadrFundingConfig

export function formatEur(value: number) {
  if (!value) return '—'
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}
