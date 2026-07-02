import { Link } from '@tanstack/react-router'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'
import { cn } from '~/lib/cn'
import { feadrFundingConfig } from '~/config/feadrFunding'
import { useI18n } from '~/i18n/LanguageContext'
import { homeSectionHash, SERVICE_ROUTES } from '~/lib/site'
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

function ServicesMenu() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const items = [
    { label: t.nav.servicesConsulting, to: SERVICE_ROUTES.consultantaIt },
    { label: t.nav.servicesPortals, to: SERVICE_ROUTES.portaluriWeb },
    { label: t.nav.servicesMaintenance, to: SERVICE_ROUTES.mentenantaIt },
  ] as const

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <a
        href={homeSectionHash('services')}
        className="group relative inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {t.nav.services}
        <span className="font-mono text-[0.6rem] text-dim">▾</span>
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan to-purple transition-all duration-300 group-hover:w-full" />
      </a>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[12rem] rounded-xl border border-hairline bg-void/95 py-2 shadow-xl backdrop-blur-xl">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block px-4 py-2 text-sm text-muted transition-colors hover:bg-panel hover:text-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
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
    { label: t.nav.capabilities, hash: 'capabilities' },
    { label: t.nav.engine, hash: 'engine' },
    { label: t.nav.security, hash: 'security' },
    { label: t.nav.contact, hash: 'contact' },
  ] as const

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
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="text-gradient inline-block text-lg leading-none transition-transform duration-500 group-hover:rotate-[225deg]">
            ◇
          </span>
          <span className="font-mono text-sm font-semibold tracking-[0.2em] text-ink">
            PROJECT AXION
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.slice(0, 1).map((link) => (
            <a
              key={link.hash}
              href={homeSectionHash(link.hash)}
              className="group relative text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan to-purple transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <ServicesMenu />
          {links.slice(1).map((link) => (
            <a
              key={link.hash}
              href={homeSectionHash(link.hash)}
              className="group relative text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan to-purple transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {feadrFundingConfig.showNotice && (
            <Link
              to="/finantare-europeana"
              title={t.nav.fundingTitle}
              aria-label={t.nav.fundingTitle}
              className="group inline-flex items-center gap-1.5 rounded-full border border-hairline bg-void/40 px-2 py-1 font-mono text-[0.65rem] tracking-wide text-dim transition-colors hover:border-[#003399]/35 hover:text-muted sm:px-2.5"
            >
              <span
                aria-hidden
                className="relative h-2.5 w-4 shrink-0 overflow-hidden rounded-[2px] border border-[#003399]/30"
              >
                <span className="absolute inset-0 bg-[#003399]" />
                <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffcc00]" />
              </span>
              <span className="hidden sm:inline">{t.nav.funding}</span>
            </Link>
          )}
          <LanguageToggle />
          <a
            href={homeSectionHash('contact')}
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
