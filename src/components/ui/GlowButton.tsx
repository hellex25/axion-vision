import { motion } from 'framer-motion'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '~/lib/cn'
import { useMagnetic } from '~/hooks/useMagnetic'

interface GlowButtonProps extends ComponentPropsWithoutRef<'a'> {
  children: ReactNode
  /** Trailing glyph, defaults to a terminal arrow. */
  glyph?: ReactNode
}

/**
 * Primary CTA: magnetic hover pull, blurred gradient halo that ignites on
 * hover, and a light sheen that sweeps across the surface.
 */
export function GlowButton({
  children,
  glyph = '→',
  className,
  ...props
}: GlowButtonProps) {
  const magnetic = useMagnetic(0.3)

  return (
    <motion.a
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      onPointerMove={magnetic.onPointerMove}
      onPointerLeave={magnetic.onPointerLeave}
      style={{ x: magnetic.x, y: magnetic.y }}
      className={cn(
        'group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3',
        'text-sm font-semibold text-void',
        'bg-ink transition-colors',
        className,
      )}
      {...(props as ComponentPropsWithoutRef<typeof motion.a>)}
    >
      {/* Glow halo */}
      <motion.span
        aria-hidden
        variants={{
          hover: { opacity: 0.85, scale: 1.12 },
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="absolute -inset-1 -z-10 rounded-full bg-gradient-to-r from-cyan to-purple blur-lg"
      />
      {/* Sheen sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[180%] -skew-x-12 bg-white/40 blur-sm transition-transform duration-700 ease-out group-hover:translate-x-[420%]"
      />
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden
        variants={{ hover: { x: 4 } }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative z-10 font-mono"
      >
        {glyph}
      </motion.span>
    </motion.a>
  )
}
