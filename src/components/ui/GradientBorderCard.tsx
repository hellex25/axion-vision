import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'
import { cn } from '~/lib/cn'
import { usePrefersReducedMotion } from '~/hooks/useReducedMotion'

interface GradientBorderCardProps {
  children: ReactNode
  className?: string
}

/**
 * Card with an animated conic-gradient border (driven by the `--angle`
 * @property in app.css), a cursor-tracked spotlight, and a subtle 3D tilt.
 */
export function GradientBorderCard({
  children,
  className,
}: GradientBorderCardProps) {
  const reduced = usePrefersReducedMotion()

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rxBase = useMotionValue(0)
  const ryBase = useMotionValue(0)
  const rotateX = useSpring(rxBase, { stiffness: 180, damping: 22 })
  const rotateY = useSpring(ryBase, { stiffness: 180, damping: 22 })

  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${px}px ${py}px, rgba(0,240,255,0.10), transparent 65%)`

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    px.set(x)
    py.set(y)
    ryBase.set((x / rect.width - 0.5) * 5)
    rxBase.set((y / rect.height - 0.5) * -5)
  }

  const handlePointerLeave = () => {
    rxBase.set(0)
    ryBase.set(0)
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn(
        'gradient-card group relative overflow-hidden rounded-2xl',
        'transition-shadow duration-500 hover:shadow-[0_0_40px_-12px_rgba(0,240,255,0.45)]',
        className,
      )}
    >
      {/* Inner radial sheen that wakes on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(120%_80%_at_50%_-10%,rgba(138,43,226,0.14),transparent_60%)]" />
      {/* Cursor-tracked spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      {children}
    </motion.div>
  )
}
