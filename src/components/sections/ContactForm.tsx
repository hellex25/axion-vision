import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Reveal } from '~/components/ui/Reveal'
import { SectionLabel } from '~/components/ui/SectionLabel'
import { useI18n } from '~/i18n/LanguageContext'
import { cn } from '~/lib/cn'
import { trackEvent } from '~/lib/analytics'
import { sendContactEmail } from '~/server/contact'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const FIELD_ORDER = ['name', 'email', 'phone', 'details'] as const

const inputClass =
  'w-full rounded-lg border border-hairline bg-void/60 px-4 py-3 text-sm text-ink placeholder:text-dim outline-none transition-[border-color,background-color,box-shadow] duration-300 focus:border-cyan/60 focus:bg-void focus:shadow-[0_0_24px_-8px_rgba(0,240,255,0.5)]'

export function ContactForm() {
  const { t } = useI18n()
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
      await sendContactEmail({
        data: {
          name: String(fd.get('name') ?? ''),
          email: String(fd.get('email') ?? ''),
          phone: String(fd.get('phone') ?? ''),
          details: String(fd.get('details') ?? ''),
        },
      })
      setStatus('sent')
      form.reset()
      trackEvent('generate_lead', { method: 'contact_form' })
      window.setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof Error ? err.message : t.contact.submitError,
      )
    }
  }

  const submitLabel = {
    idle: t.contact.submitIdle,
    sending: t.contact.submitSending,
    sent: t.contact.submitDone,
    error: t.contact.submitIdle,
  }[status]

  return (
    <section id="contact" className="relative mx-auto max-w-2xl px-6 py-28 sm:py-36">
      <Reveal className="mb-10 flex flex-col items-center gap-4 text-center">
        <SectionLabel>{t.contact.kicker}</SectionLabel>
        <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {t.contact.title}
        </h2>
        <p className="max-w-md text-pretty text-muted">{t.contact.sub}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="gradient-card overflow-hidden rounded-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-7 sm:p-9">
            {FIELD_ORDER.map((name, i) => {
              const field = t.contact.fields[name]
              const isPhone = name === 'phone'
              const isDetails = name === 'details'

              return (
                <motion.label
                  key={name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{
                    duration: 0.45,
                    delay: 0.08 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col gap-2"
                >
                  <span className="text-sm font-medium text-ink">
                    {field.label}
                    {isPhone && (
                      <span className="ml-1.5 text-xs font-normal text-dim">
                        ({t.contact.phoneOptional})
                      </span>
                    )}
                  </span>
                  {isDetails ? (
                    <textarea
                      name={name}
                      required
                      rows={4}
                      placeholder={field.placeholder}
                      className={cn(inputClass, 'resize-none')}
                    />
                  ) : (
                    <input
                      name={name}
                      type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'}
                      required={!isPhone}
                      placeholder={field.placeholder}
                      className={inputClass}
                    />
                  )}
                </motion.label>
              )
            })}

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
                status === 'sent'
                  ? 'bg-signal text-void'
                  : 'bg-ink text-void',
                status === 'sending' && 'opacity-70',
              )}
            >
              {status !== 'sent' && (
                <span className="absolute -inset-1 -z-0 rounded-full bg-gradient-to-r from-cyan to-purple opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-70" />
              )}

              <AnimatePresence>
                {status === 'sent' && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full bg-signal"
                  />
                )}
              </AnimatePresence>

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
              {status === 'sent' ? t.contact.successNote : '\u00A0'}
            </p>
          </form>
        </div>
      </Reveal>
    </section>
  )
}
