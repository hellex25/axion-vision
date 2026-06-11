import { Boxes, Cpu, ShieldHalf, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '~/components/ui/Reveal'
import { GradientBorderCard } from '~/components/ui/GradientBorderCard'
import { SectionLabel } from '~/components/ui/SectionLabel'
import { useI18n } from '~/i18n/LanguageContext'
import { cn } from '~/lib/cn'

interface PillarMeta {
  index: string
  icon: LucideIcon
  tags: string[]
  span: string
}

const PILLAR_META: PillarMeta[] = [
  {
    index: '01',
    icon: Boxes,
    tags: ['TanStack Start', 'React 19', 'Vite', 'Edge SSR'],
    span: 'lg:col-span-3',
  },
  {
    index: '02',
    icon: Workflow,
    tags: ['Python', 'Node.js', 'Cron', 'API Sync'],
    span: 'lg:col-span-3',
  },
  {
    index: '03',
    icon: Cpu,
    tags: ['Supabase', 'PostgreSQL', 'RLS', 'Cloudflare R2'],
    span: 'lg:col-span-2',
  },
  {
    index: '04',
    icon: ShieldHalf,
    tags: ['Audits', 'Multi-Tenant', 'Scale Strategy', 'Enterprise'],
    span: 'lg:col-span-4',
  },
]

export function TechMatrix() {
  const { t } = useI18n()

  return (
    <section
      id="capabilities"
      className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36"
    >
      <Reveal className="flex flex-col items-start gap-5">
        <SectionLabel>{t.matrix.kicker}</SectionLabel>
        <h2 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {t.matrix.titlePre}
          <span className="text-gradient">{t.matrix.titleHighlight}</span>
        </h2>
        <p className="max-w-xl text-muted">{t.matrix.sub}</p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-6">
        {PILLAR_META.map((meta, i) => {
          const Icon = meta.icon
          const pillar = t.matrix.pillars[i]
          return (
            <Reveal key={meta.index} delay={i * 0.08} className={cn(meta.span)}>
              <GradientBorderCard className="h-full">
                <div className="flex h-full flex-col gap-5 p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-void/60 text-cyan">
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-xs text-dim">
                      {meta.index} / 04
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-semibold tracking-tight text-ink">
                      {pillar.title}
                    </h3>
                    <p className="text-pretty text-sm leading-relaxed text-muted">
                      {pillar.body}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-hairline bg-void/40 px-2.5 py-1 font-mono text-[0.68rem] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GradientBorderCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
