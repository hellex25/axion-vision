import { Link } from '@tanstack/react-router'
import { Globe, Layers, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '~/components/ui/Reveal'
import { GradientBorderCard } from '~/components/ui/GradientBorderCard'
import { SectionLabel } from '~/components/ui/SectionLabel'
import { useI18n } from '~/i18n/LanguageContext'
import { SERVICE_ROUTES } from '~/lib/site'
import { cn } from '~/lib/cn'

const DOMAIN_ICONS: LucideIcon[] = [Layers, Globe, Wrench]

const DOMAIN_ROUTES = [
  SERVICE_ROUTES.consultantaIt,
  SERVICE_ROUTES.portaluriWeb,
  SERVICE_ROUTES.mentenantaIt,
] as const

export function ServicesCatalog() {
  const { t } = useI18n()

  return (
    <section
      id="services"
      className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36"
    >
      <Reveal className="flex flex-col items-start gap-5">
        <SectionLabel>{t.services.kicker}</SectionLabel>
        <h2 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {t.services.titlePre}
          <span className="text-gradient">{t.services.titleHighlight}</span>
        </h2>
        <p className="max-w-2xl text-pretty text-muted">{t.services.sub}</p>
      </Reveal>

      <div className="mt-14 flex flex-col gap-6">
        {t.services.domains.map((domain, i) => {
          const Icon = DOMAIN_ICONS[i]
          const isPrimary = i === 0
          const route = DOMAIN_ROUTES[i]
          return (
            <Reveal key={domain.title} delay={i * 0.08}>
              <GradientBorderCard className="overflow-hidden">
                <div
                  className={cn(
                    'flex flex-col gap-6 p-7 sm:p-9',
                    isPrimary && 'lg:flex-row lg:gap-10',
                  )}
                >
                  <div
                    className={cn(
                      'flex flex-col gap-4',
                      isPrimary && 'lg:w-[42%] lg:shrink-0',
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hairline bg-void/60 text-cyan">
                        <Icon size={20} strokeWidth={1.6} />
                      </span>
                      <span className="rounded-full border border-hairline bg-void/40 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-dim">
                        {domain.tier}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold leading-snug tracking-tight text-ink">
                      {domain.title}
                    </h3>
                    <p className="text-pretty text-sm leading-relaxed text-muted">
                      {domain.intro}
                    </p>
                    <Link
                      to={route}
                      className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-cyan transition-colors hover:text-ink"
                    >
                      {t.services.learnMore}
                      <span aria-hidden className="font-mono">
                        →
                      </span>
                    </Link>
                  </div>

                  <ul
                    className={cn(
                      'grid gap-2 border-t border-hairline pt-6 sm:grid-cols-2',
                      isPrimary &&
                        'lg:flex-1 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10',
                      !isPrimary && 'sm:grid-cols-2',
                    )}
                  >
                    {domain.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-muted"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </GradientBorderCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
