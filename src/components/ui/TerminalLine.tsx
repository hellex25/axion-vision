import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '~/lib/cn'
import { useTypewriter } from '~/hooks/useTypewriter'

interface TerminalLineProps {
  text: string
  className?: string
  speed?: number
  startDelay?: number
  /** Show a blinking cursor after the text finishes typing. */
  cursor?: boolean
}

/** Monospace line that types itself out the first time it scrolls into view. */
export function TerminalLine({
  text,
  className,
  speed = 26,
  startDelay = 0,
  cursor = true,
}: TerminalLineProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const { output, done } = useTypewriter(text, {
    speed,
    startDelay,
    active: inView,
  })

  return (
    <span
      ref={ref}
      className={cn(
        'font-mono text-xs tracking-wide text-muted',
        cursor && !done && 'cursor-blink',
        className,
      )}
    >
      {output}
      {cursor && done && <span className="cursor-blink" />}
    </span>
  )
}
