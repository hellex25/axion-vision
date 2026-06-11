import { cn } from '~/lib/cn'
import { DecodeText } from './DecodeText'

interface SectionLabelProps {
  children: string
  className?: string
}

/** Mono kicker label, e.g. `// 02 — TECH MATRIX`, with a decode-in effect. */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-muted',
        className,
      )}
    >
      <span className="h-px w-6 bg-gradient-to-r from-cyan to-transparent" />
      <DecodeText text={children} />
    </span>
  )
}
