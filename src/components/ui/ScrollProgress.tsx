import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin gradient progress bar pinned above the navbar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  })

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan via-purple to-cyan shadow-[0_0_12px_rgba(0,240,255,0.5)]"
      style={{ scaleX }}
    />
  )
}
