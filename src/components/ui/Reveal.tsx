import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '~/lib/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger offset for sibling reveals, in seconds. */
  delay?: number
  /** Slide distance, in px. */
  y?: number
  as?: 'div' | 'section' | 'li' | 'span'
}

/**
 * Scroll-into-view reveal: fades up + un-blurs once, on first intersection.
 * Honors reduced motion automatically via Framer Motion's MotionConfig.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
