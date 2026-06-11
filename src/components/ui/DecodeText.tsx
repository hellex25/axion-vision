import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '~/hooks/useReducedMotion'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01'

interface DecodeTextProps {
  text: string
  className?: string
  /** Total scramble duration in ms. */
  duration?: number
}

/**
 * Matrix-style decode: characters flicker through random glyphs and resolve
 * left-to-right once the element scrolls into view.
 */
export function DecodeText({ text, className, duration = 900 }: DecodeTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    setDisplay(text)
    if (!inView || reduced) return

    const frameMs = 40
    const totalFrames = Math.max(1, Math.round(duration / frameMs))
    let frame = 0

    const id = setInterval(() => {
      frame += 1
      const progress = frame / totalFrames
      if (frame >= totalFrames) {
        setDisplay(text)
        clearInterval(id)
        return
      }
      setDisplay(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (i < progress * text.length) return ch
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join(''),
      )
    }, frameMs)

    return () => clearInterval(id)
  }, [text, inView, reduced, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
