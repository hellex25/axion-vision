import { createServerFn } from '@tanstack/react-start'

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  details: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parseContact(data: unknown): ContactPayload {
  if (!data || typeof data !== 'object') {
    throw new Error('Date invalide.')
  }
  const raw = data as Record<string, unknown>
  const name = String(raw.name ?? '').trim()
  const email = String(raw.email ?? '').trim()
  const phone = String(raw.phone ?? '').trim()
  const details = String(raw.details ?? '').trim()

  if (name.length < 2) throw new Error('Numele este prea scurt.')
  if (!EMAIL_RE.test(email)) throw new Error('Adresa de email nu este validă.')
  if (details.length < 10) throw new Error('Detaliile sunt prea scurte.')

  return {
    name,
    email,
    phone: phone || undefined,
    details,
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildEmailHtml(data: ContactPayload) {
  const phoneRow = data.phone
    ? `<tr><td style="padding:8px 0;color:#71717a">Telefon</td><td style="padding:8px 0">${escapeHtml(data.phone)}</td></tr>`
    : ''
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#18181b">
      <h2 style="margin:0 0 16px;font-size:18px">Mesaj nou — Project Axion</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;color:#71717a;width:120px">Nume</td><td style="padding:8px 0">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:8px 0;color:#71717a">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        ${phoneRow}
      </table>
      <p style="margin:20px 0 8px;font-size:13px;color:#71717a">Detalii</p>
      <p style="margin:0;padding:16px;background:#f4f4f5;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.details)}</p>
    </div>
  `.trim()
}

function buildEmailText(data: ContactPayload) {
  return [
    'Mesaj nou — Project Axion',
    '',
    `Nume: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Telefon: ${data.phone}` : null,
    '',
    'Detalii:',
    data.details,
  ]
    .filter(Boolean)
    .join('\n')
}

export const sendContactEmail = createServerFn({ method: 'POST' })
  .validator((data: unknown) => parseContact(data))
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
        subject: `[Project Axion] Mesaj de la ${data.name}`,
        html: buildEmailHtml(data),
        text: buildEmailText(data),
      }),
    })

    if (!response.ok) {
      console.error('Resend error:', await response.text())
      throw new Error('Nu am putut trimite mesajul. Încearcă din nou.')
    }

    return { ok: true as const }
  })
