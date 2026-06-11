import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { cn } from '~/lib/cn'
import { useI18n } from '~/i18n/LanguageContext'
import type { Lang } from '~/i18n/translations'

const LANGS: Lang[] = ['ro', 'en']

function LanguageToggle() {
  const { lang, setLang } = useI18n()
  return (
    <div className="flex items-center rounded-full border border-hairline bg-void/50 p-0.5 font-mono text-[0.65rem]">
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={cn(
            'rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors',
            lang === code
              ? 'bg-ink text-void'
              : 'text-dim hover:text-ink',
          )}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

export function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24)
  })

  const links = [
    { label: t.nav.capabilities, href: '#capabilities' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.engine, href: '#engine' },
    { label: t.nav.security, href: '#security' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          'flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6',
          scrolled
            ? 'border border-hairline bg-void/70 backdrop-blur-xl'
            : 'border border-transparent bg-transparent',
        )}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="text-gradient inline-block text-lg leading-none transition-transform duration-500 group-hover:rotate-[225deg]">
            ◇
          </span>
          <span className="font-mono text-sm font-semibold tracking-[0.2em] text-ink">
            PROJECT AXION
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
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
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a
            href="#contact"
            className="group relative hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-void sm:inline-flex"
          >
            <span className="absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-r from-cyan to-purple opacity-0 blur transition-opacity duration-300 group-hover:opacity-70" />
            {t.nav.cta}
            <span className="font-mono">→</span>
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
