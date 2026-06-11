import { useMotionValue, useSpring } from 'framer-motion'
import type { PointerEvent } from 'react'
import { usePrefersReducedMotion } from './useReducedMotion'

/**
 * Magnetic hover: the element is gently pulled toward the cursor while
 * hovered and springs back on leave. No-op under reduced motion.
 */
export function useMagnetic(strength = 0.25) {
  const reduced = usePrefersReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 })

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduced) return
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set((event.clientX - rect.left - rect.width / 2) * strength)
    my.set((event.clientY - rect.top - rect.height / 2) * strength)
  }

  const onPointerLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return { x, y, onPointerMove, onPointerLeave }
}
