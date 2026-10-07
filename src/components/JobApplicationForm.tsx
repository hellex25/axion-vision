import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '~/lib/cn'
import { trackEvent } from '~/lib/analytics'
import { sendJobApplication } from '~/server/job-application'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const inputClass =
  'w-full rounded-lg border border-hairline bg-void/60 px-4 py-3 text-sm text-ink placeholder:text-dim outline-none transition-[border-color,background-color,box-shadow] duration-300 focus:border-cyan/60 focus:bg-void focus:shadow-[0_0_24px_-8px_rgba(0,240,255,0.5)]'

const EDUCATION_OPTIONS = [
  { value: '', label: 'Selectează nivelul de studii' },
  { value: 'medii', label: 'Studii medii' },
  { value: 'superioare', label: 'Studii superioare' },
]

interface JobApplicationFormProps {
  jobTitle: string
}

export function JobApplicationForm({ jobTitle }: JobApplicationFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const fd = new FormData(form)

    setStatus('sending')
    setErrorMsg('')

    try {
      await sendJobApplication({
        data: {
          jobTitle,
          name: String(fd.get('name') ?? ''),
          email: String(fd.get('email') ?? ''),
          phone: String(fd.get('phone') ?? ''),
          location: String(fd.get('location') ?? ''),
          education: String(fd.get('education') ?? ''),
          experience: String(fd.get('experience') ?? ''),
          cvLink: String(fd.get('cvLink') ?? ''),
          vulnerableCategory: String(fd.get('vulnerableCategory') ?? ''),
          gdprConsent: fd.get('gdprConsent') === 'on',
        },
      })
      setStatus('sent')
      form.reset()
      trackEvent('generate_lead', { method: 'job_application' })
      window.setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Nu am putut trimite aplicația. Încearcă din nou.',
      )
    }
  }

  const submitLabel = {
    idle: 'Trimite aplicația',
    sending: 'Se trimite…',
    sent: 'Aplicație trimisă ✓',
    error: 'Trimite aplicația',
  }[status]

  return (
    <div className="gradient-card overflow-hidden rounded-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-7 sm:p-9">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ink">Nume complet</span>
          <input
            name="name"
            type="text"
            required
            placeholder="Ex.: Maria Popescu"
            className={inputClass}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">Email</span>
            <input
              name="email"
              type="email"
              required
              placeholder="email@exemplu.ro"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">Telefon</span>
            <input
              name="phone"
              type="tel"
              required
              placeholder="07xx xxx xxx"
              className={inputClass}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">Localitate / Județ</span>
            <input
              name="location"
              type="text"
              required
              placeholder="Ex.: Vârvoru de Jos, Dolj"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">Nivel studii</span>
            <select
              name="education"
              required
              defaultValue=""
              className={inputClass}
            >
              {EDUCATION_OPTIONS.map((option) => (
                <option
                  key={option.value || 'empty'}
                  value={option.value}
                  disabled={!option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ink">
            Experiență / scurtă prezentare
          </span>
          <textarea
            name="experience"
            required
            rows={5}
            placeholder="Descrie pe scurt experiența ta profesională, abilitățile relevante și de ce ești interesat(ă) de acest post..."
            className={cn(inputClass, 'resize-none')}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ink">
            Link CV
            <span className="ml-1.5 text-xs font-normal text-dim">(opțional)</span>
          </span>
          <input
            name="cvLink"
            type="url"
            placeholder="https://drive.google.com/... sau LinkedIn"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ink">
            Categorie vulnerabilă
            <span className="ml-1.5 text-xs font-normal text-dim">
              (opțional, declarație voluntară)
            </span>
          </span>
          <input
            name="vulnerableCategory"
            type="text"
            placeholder="Ex.: șomer, persoană cu dizabilități, tânăr NEET..."
            className={inputClass}
          />
        </label>

        <label className="flex items-start gap-3 rounded-lg border border-hairline bg-void/40 px-4 py-3">
          <input
            name="gdprConsent"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-cyan"
          />
          <span className="text-sm leading-relaxed text-muted">
            Sunt de acord cu prelucrarea datelor personale furnizate în scopul
            procesului de recrutare, conform legislației în vigoare.
          </span>
        </label>

        <AnimatePresence mode="wait">
          {errorMsg && status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {errorMsg}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={status === 'sending'}
          whileHover={{ scale: status !== 'sending' ? 1.01 : 1 }}
          whileTap={{ scale: status !== 'sending' ? 0.98 : 1 }}
          className={cn(
            'group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold transition-colors',
            status === 'sent' ? 'bg-signal text-void' : 'bg-ink text-void',
            status === 'sending' && 'opacity-70',
          )}
        >
          {status !== 'sent' && (
            <span className="absolute -inset-1 -z-0 rounded-full bg-gradient-to-r from-cyan to-purple opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-70" />
          )}
          <span className="relative z-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={status}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {submitLabel}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.button>

        <p className="text-center text-xs text-dim">
          {status === 'sent'
            ? 'Mulțumim — analizăm aplicația și te contactăm în curând.'
            : ' '}
        </p>
      </form>
    </div>
  )
}
