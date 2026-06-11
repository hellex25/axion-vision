import { Reveal } from '~/components/ui/Reveal'
import { SectionLabel } from '~/components/ui/SectionLabel'
import { useI18n } from '~/i18n/LanguageContext'
import type { Dictionary } from '~/i18n/translations'

type RoleKey = keyof Dictionary['engine']['roles']

interface StackMeta {
  name: string
  key: RoleKey
  mark: string
}

const STACK: StackMeta[] = [
  { name: 'TypeScript', key: 'typescript', mark: 'TS' },
  { name: 'React 19', key: 'react', mark: '⚛' },
  { name: 'TanStack', key: 'tanstack', mark: '◆' },
  { name: 'Supabase', key: 'supabase', mark: '⚡' },
  { name: 'PostgreSQL', key: 'postgresql', mark: '🐘' },
  { name: 'Cloudflare', key: 'cloudflare', mark: '☁' },
  { name: 'Python', key: 'python', mark: 'PY' },
  { name: 'Tailwind', key: 'tailwind', mark: '~' },
]

function StackCard({ item, role }: { item: StackMeta; role: string }) {
  return (
    <div className="group relative mx-2.5 flex w-60 shrink-0 items-center gap-4 rounded-xl border border-hairline bg-panel/70 px-5 py-4 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-cyan/40 hover:shadow-[0_8px_30px_-12px_rgba(0,240,255,0.35)]">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-hairline bg-void font-mono text-sm text-cyan transition-shadow duration-300 group-hover:shadow-[0_0_18px_-4px_rgba(0,240,255,0.6)]">
        {item.mark}
      </span>
      <div className="flex flex-col">
        <span className="font-mono text-sm font-medium text-ink">
          {item.name}
        </span>
        <span className="text-xs text-dim">{role}</span>
      </div>
    </div>
  )
}

export function EngineRoom() {
  const { t } = useI18n()
  // Duplicate the list so the -50% marquee translate loops seamlessly.
  const loop = [...STACK, ...STACK]

  return (
    <section id="engine" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col items-start gap-5">
          <SectionLabel>{t.engine.kicker}</SectionLabel>
          <h2 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {t.engine.title}
          </h2>
          <p className="max-w-2xl text-pretty text-muted">{t.engine.lead}</p>
        </Reveal>
      </div>

      {/* Marquee */}
      <div className="relative mt-14">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-void to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-void to-transparent" />

        <div className="flex w-max marquee-track">
          {loop.map((item, i) => (
            <StackCard
              key={`${item.name}-${i}`}
              item={item}
              role={t.engine.roles[item.key]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
