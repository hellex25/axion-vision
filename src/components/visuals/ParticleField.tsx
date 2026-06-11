import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '~/hooks/useReducedMotion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

const CYAN = '0, 240, 255'
const PURPLE = '138, 43, 226'

/**
 * Interactive particle matrix rendered to a canvas behind the hero.
 * - Caps device pixel ratio for performance.
 * - Particles drift, connect with lines under a distance threshold,
 *   and nudge gently toward the cursor (parallax).
 * - Pauses via IntersectionObserver when scrolled offscreen.
 * - Renders nothing animated under prefers-reduced-motion (static dots only).
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let particles: Particle[] = []
    let raf = 0
    let visible = true

    const pointer = { x: -9999, y: -9999 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = Math.min(
        90,
        Math.floor((width * height) / 18000),
      )
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }))
    }

    const connectionDist = 130

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // Gentle cursor attraction
        const dxp = pointer.x - p.x
        const dyp = pointer.y - p.y
        const distp = Math.hypot(dxp, dyp)
        if (distp < 180) {
          p.vx += (dxp / distp) * 0.012
          p.vy += (dyp / distp) * 0.012
        }

        // Friction + soft speed clamp
        p.vx = Math.max(-0.6, Math.min(0.6, p.vx * 0.99))
        p.vy = Math.max(-0.6, Math.min(0.6, p.vy * 0.99))

        // Wrap around edges
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${CYAN}, 0.55)`
        ctx.fill()
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.22
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            grad.addColorStop(0, `rgba(${CYAN}, ${alpha})`)
            grad.addColorStop(1, `rgba(${PURPLE}, ${alpha})`)
            ctx.strokeStyle = grad
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${CYAN}, 0.4)`
        ctx.fill()
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }
    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)

    if (reduced) {
      drawStatic()
      return () => {
        window.removeEventListener('resize', resize)
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerleave', onPointerLeave)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !raf) {
          raf = requestAnimationFrame(draw)
        } else if (!visible && raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  )
}
