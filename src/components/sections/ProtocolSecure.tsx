import { motion } from 'framer-motion'
import { Fingerprint, KeyRound, Lock, ShieldCheck } from 'lucide-react'
import { Reveal } from '~/components/ui/Reveal'
import { SectionLabel } from '~/components/ui/SectionLabel'
import { TerminalLine } from '~/components/ui/TerminalLine'
import { useI18n } from '~/i18n/LanguageContext'

const SPEC_ICONS = [Lock, KeyRound, ShieldCheck, Fingerprint]

// A faux encrypted payload that the scan line sweeps across.
const PAYLOAD_ROWS = [
  '0xA7F2  9C11  D4E8  2B6A  ENCRYPTED',
  '0x4D90  F03C  118E  77AB  SEALED',
  '0xE21B  6A4F  C90D  5512  VAULT::R2',
  '0x0FCD  B83A  17E2  44A9  RLS::ON',
  '0x9B7E  2C50  E6F1  D038  AES-GCM',
  '0x3A14  88BD  09CC  61F7  SIGNED',
]

export function ProtocolSecure() {
  const { t } = useI18n()

  return (
    <section id="security" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {/* Copy column */}
        <Reveal className="flex flex-col items-start gap-6">
          <SectionLabel>{t.secure.kicker}</SectionLabel>
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {t.secure.headlinePre}
            <span className="text-gradient">{t.secure.headlineHighlight}</span>
          </h2>
          <p className="max-w-lg text-pretty text-muted">{t.secure.sub}</p>

          <div className="mt-2 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            {t.secure.specs.map((spec, i) => {
              const Icon = SPEC_ICONS[i]
              return (
                <div
                  key={spec.label}
                  className="flex items-center gap-3 rounded-xl border border-hairline bg-panel/60 px-4 py-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-void text-cyan">
                    <Icon size={16} strokeWidth={1.7} />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs tracking-wide text-ink">
                      {spec.label}
                    </span>
                    <span className="text-[0.7rem] text-dim">{spec.note}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>

        {/* Visual column — encrypted payload with scan sweep */}
        <Reveal delay={0.12}>
          <div className="gradient-card relative overflow-hidden rounded-2xl">
            <div className="flex items-center gap-2 border-b border-hairline px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[0.7rem] text-dim">
                axion://vault/encrypted-store
              </span>
            </div>

            <div className="relative p-6">
              {/* Scan line */}
              <div className="scan-sweep pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,transparent,rgba(0,240,255,0.12),transparent)]">
                <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-cyan to-transparent" />
              </div>

              <div className="flex flex-col gap-2.5 font-mono text-[0.74rem] text-muted">
                {PAYLOAD_ROWS.map((row, i) => {
                  const [hex, label] = [
                    row.slice(0, row.lastIndexOf('  ')),
                    row.slice(row.lastIndexOf('  ') + 2),
                  ]
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 22 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-10%' }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-center justify-between gap-4 rounded-md bg-void/40 px-3 py-1.5 transition-colors duration-300 hover:bg-void/80"
                    >
                      <span className="truncate text-dim">{hex}</span>
                      <span className="shrink-0 text-cyan/80">{label}</span>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-hairline pt-4">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" />
                <TerminalLine
                  text={t.secure.integrity}
                  speed={18}
                  className="text-[0.7rem] text-muted"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
