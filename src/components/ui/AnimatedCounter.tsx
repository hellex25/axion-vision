import { animate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '~/hooks/useReducedMotion'

interface AnimatedCounterProps {
  to: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

/** Counts up from zero when scrolled into view. */
export function AnimatedCounter({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.8,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return

    const format = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`
    if (reduced) {
      node.textContent = format(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => {
        node.textContent = format(v)
      },
    })
    return () => controls.stop()
  }, [inView, reduced, to, decimals, prefix, suffix, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
