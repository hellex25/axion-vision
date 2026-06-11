import { motion } from 'framer-motion'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '~/lib/cn'
import { useMagnetic } from '~/hooks/useMagnetic'

interface GhostButtonProps extends ComponentPropsWithoutRef<'a'> {
  children: ReactNode
}

/**
 * Secondary CTA: magnetic hover pull and a gradient hairline border that
 * brightens on hover.
 */
export function GhostButton({
  children,
  className,
  ...props
}: GhostButtonProps) {
  const magnetic = useMagnetic(0.2)

  return (
    <motion.a
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onPointerMove={magnetic.onPointerMove}
      onPointerLeave={magnetic.onPointerLeave}
      style={{ x: magnetic.x, y: magnetic.y }}
      className={cn(
        'group relative inline-flex items-center gap-2 rounded-full px-6 py-3',
        'text-sm font-semibold text-ink',
        className,
      )}
      {...(props as ComponentPropsWithoutRef<typeof motion.a>)}
    >
      {/* Gradient border via masked padding layer */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full p-px [background:linear-gradient(120deg,var(--color-cyan),var(--color-purple))] opacity-40 transition-opacity duration-300 group-hover:opacity-100 [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude]"
      />
      <span className="absolute inset-0 rounded-full bg-void/40 backdrop-blur-sm" />
      <span className="relative z-10">{children}</span>
    </motion.a>
  )
}
