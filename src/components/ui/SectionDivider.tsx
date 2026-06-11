import { motion } from 'framer-motion'

/** Animated gradient hairline that draws itself between sections. */
export function SectionDivider() {
  return (
    <div aria-hidden className="mx-auto max-w-6xl px-6">
      <div className="relative">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-px origin-center bg-gradient-to-r from-transparent via-cyan/30 to-transparent"
        />
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'backOut' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.55rem] text-cyan/60"
        >
          ◇
        </motion.span>
      </div>
    </div>
  )
}
