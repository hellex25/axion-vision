import { createServerFn } from '@tanstack/react-start'

export interface JobApplicationPayload {
  jobTitle: string
  name: string
  email: string
  phone: string
  location: string
  education: string
  experience: string
  cvLink?: string
  vulnerableCategory?: string
  gdprConsent: true
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EDUCATION_LEVELS = ['medii', 'superioare'] as const

function parseApplication(data: unknown): JobApplicationPayload {
  if (!data || typeof data !== 'object') {
    throw new Error('Date invalide.')
  }
  const raw = data as Record<string, unknown>
  const str = (key: string) => String(raw[key] ?? '').trim()

  const jobTitle = str('jobTitle')
  const name = str('name')
  const email = str('email')
  const phone = str('phone')
  const location = str('location')
  const education = str('education')
  const experience = str('experience')
  const cvLink = str('cvLink')
  const vulnerableCategory = str('vulnerableCategory')

  if (jobTitle.length < 2 || jobTitle.length > 120) throw new Error('Post invalid.')
  if (name.length < 2) throw new Error('Numele este prea scurt.')
  if (!EMAIL_RE.test(email)) throw new Error('Adresa de email nu este validă.')
  if (phone.replace(/\D/g, '').length < 9) {
    throw new Error('Numărul de telefon nu este valid.')
  }
  if (location.length < 2) throw new Error('Completează localitatea.')
  if (!EDUCATION_LEVELS.includes(education as (typeof EDUCATION_LEVELS)[number])) {
    throw new Error('Selectează nivelul de studii.')
  }
  if (experience.length < 10) throw new Error('Prezentarea este prea scurtă.')
  if (cvLink && !/^https?:\/\//i.test(cvLink)) {
    throw new Error('Link-ul CV trebuie să înceapă cu http:// sau https://.')
  }
  if (raw.gdprConsent !== true) {
    throw new Error('Este necesar acordul pentru prelucrarea datelor.')
  }

  return {
    jobTitle,
    name,
    email,
    phone,
    location,
    education,
    experience,
    cvLink: cvLink || undefined,
    vulnerableCategory: vulnerableCategory || undefined,
    gdprConsent: true,
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function rows(data: JobApplicationPayload) {
  return [
    ['Post', data.jobTitle],
    ['Nume', data.name],
    ['Email', data.email],
    ['Telefon', data.phone],
    ['Localitate', data.location],
    ['Studii', data.education === 'superioare' ? 'Studii superioare' : 'Studii medii'],
    ['Link CV', data.cvLink],
    ['Categorie vulnerabilă', data.vulnerableCategory],
    ['Acord GDPR', 'Da'],
  ].filter((row): row is [string, string] => Boolean(row[1]))
}

function buildEmailHtml(data: JobApplicationPayload) {
  const tableRows = rows(data)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 0;color:#71717a;width:160px">${label}</td><td style="padding:8px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join('')
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#18181b">
      <h2 style="margin:0 0 16px;font-size:18px">Aplicație nouă — ${escapeHtml(data.jobTitle)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">${tableRows}</table>
      <p style="margin:20px 0 8px;font-size:13px;color:#71717a">Experiență / prezentare</p>
      <p style="margin:0;padding:16px;background:#f4f4f5;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.experience)}</p>
    </div>
  `.trim()
}

function buildEmailText(data: JobApplicationPayload) {
  return [
    `Aplicație nouă — ${data.jobTitle}`,
    '',
    ...rows(data).map(([label, value]) => `${label}: ${value}`),
    '',
    'Experiență / prezentare:',
    data.experience,
  ].join('\n')
}

export const sendJobApplication = createServerFn({ method: 'POST' })
  .validator((data: unknown) => parseApplication(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('Serviciul de email nu este configurat.')
    }

    const to = process.env.CONTACT_TO ?? 'daviddricu@gmail.com'
    const from =
      process.env.CONTACT_FROM ?? 'Project Axion <onboarding@resend.dev>'

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `[Cariere] ${data.jobTitle} — ${data.name}`,
        html: buildEmailHtml(data),
        text: buildEmailText(data),
      }),
    })

    if (!response.ok) {
      console.error('Resend error:', await response.text())
      throw new Error('Nu am putut trimite aplicația. Încearcă din nou.')
    }

    return { ok: true as const }
  })
