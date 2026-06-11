import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useI18n } from '~/i18n/LanguageContext'

export function Footer() {
  const { t } = useI18n()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const watermarkY = useTransform(scrollYProgress, [0, 1], [110, 0])
  const watermarkOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  const links = [
    { label: t.nav.capabilities, href: '#capabilities' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.engine, href: '#engine' },
    { label: t.nav.security, href: '#security' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-hairline"
    >
      {/* Parallax watermark */}
      <motion.div
        aria-hidden
        style={{
          y: watermarkY,
          opacity: watermarkOpacity,
          WebkitTextStroke: '1px rgba(255,255,255,0.07)',
        }}
        className="pointer-events-none absolute inset-x-0 -bottom-[0.18em] select-none text-center font-mono text-[22vw] font-bold leading-none tracking-tighter text-transparent"
      >
        AXION
      </motion.div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="text-gradient inline-block text-lg leading-none transition-transform duration-500 group-hover:rotate-[225deg]">
              ◇
            </span>
            <span className="font-mono text-sm font-semibold tracking-[0.2em]">
              PROJECT AXION
            </span>
          </a>

          <nav className="flex flex-wrap gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan to-purple transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center">
          <span className="font-mono text-[0.7rem] tracking-wide text-dim">
            {t.footer.legal}
          </span>
          <span className="flex items-center gap-2 font-mono text-[0.7rem] text-muted">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" />
            {t.footer.status}
          </span>
        </div>
      </div>
    </footer>
  )
}
