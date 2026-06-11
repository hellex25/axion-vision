import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './useReducedMotion'

interface TypewriterOptions {
  /** Milliseconds per character. */
  speed?: number
  /** Delay before typing starts, in ms. */
  startDelay?: number
  /** Only begin typing once `active` flips to true (e.g. when in view). */
  active?: boolean
}

/**
 * Types out a string character-by-character.
 * Renders the full string instantly when reduced motion is requested.
 */
export function useTypewriter(
  text: string,
  { speed = 28, startDelay = 0, active = true }: TypewriterOptions = {},
) {
  const reduced = usePrefersReducedMotion()
  const [output, setOutput] = useState('')
  const [done, setDone] = useState(false)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!active || startedRef.current) return

    if (reduced) {
      setOutput(text)
      setDone(true)
      return
    }

    startedRef.current = true
    let index = 0
    let interval: ReturnType<typeof setInterval>

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        index += 1
        setOutput(text.slice(0, index))
        if (index >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [active, reduced, speed, startDelay, text])

  return { output, done }
}
