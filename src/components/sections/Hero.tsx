import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import { GlowButton } from '~/components/ui/GlowButton'
import { GhostButton } from '~/components/ui/GhostButton'
import { TerminalLine } from '~/components/ui/TerminalLine'
import { AnimatedCounter } from '~/components/ui/AnimatedCounter'
import { ParticleField } from '~/components/visuals/ParticleField'
import { useI18n } from '~/i18n/LanguageContext'
import { cn } from '~/lib/cn'

const ease = [0.22, 1, 0.36, 1] as const

interface Token {
  word: string
  gradient: boolean
}

const headlineVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: '0.55em', rotateX: 50, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: '0em',
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease },
  },
}

/** Splits the localized H1 into words and reveals them one by one in 3D. */
function StaggeredHeadline() {
  const { t, lang } = useI18n()

  const tokens = useMemo<Token[]>(() => {
    const pre = t.hero.h1Pre.split(' ').filter(Boolean)
    const highlight = t.hero.h1Highlight.split(' ').filter(Boolean)
    const postRaw = t.hero.h1Post
    const post = postRaw.split(' ').filter(Boolean)

    const list: Token[] = [
      ...pre.map((word) => ({ word, gradient: false })),
      ...highlight.map((word) => ({ word, gradient: true })),
    ]
    // Leading punctuation (e.g. a trailing '.') glues to the last word.
    if (post.length > 0 && !postRaw.startsWith(' ')) {
      list[list.length - 1] = {
        ...list[list.length - 1],
        word: list[list.length - 1].word + post.shift(),
      }
    }
    list.push(...post.map((word) => ({ word, gradient: false })))
    return list
  }, [t])

  return (
    <motion.h1
      key={lang}
      initial="hidden"
      animate="visible"
      variants={headlineVariants}
      className="text-balance text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[1.02] tracking-tight"
    >
      {tokens.map((token, i) => (
        <span key={`${token.word}-${i}`} className="inline-block">
          <motion.span
            variants={wordVariants}
            style={{ transformPerspective: 800 }}
            className={cn(
              'inline-block will-change-transform',
              token.gradient && 'text-gradient',
            )}
          >
            {token.word}
          </motion.span>
          {i < tokens.length - 1 && '\u00A0'}
        </span>
      ))}
    </motion.h1>
  )
}

const METRICS = [
  { to: 99.99, decimals: 2, suffix: '%', label: 'UPTIME' },
  { to: 12, prefix: '<', suffix: 'ms', label: 'LATENCY' },
  { to: 24, suffix: '/7', label: 'ENGINES' },
] as const

export function Hero() {
  const { t } = useI18n()
  const { scrollY } = useScroll()
  const orbCyanY = useTransform(scrollY, [0, 700], [0, 140])
  const orbPurpleY = useTransform(scrollY, [0, 700], [0, -90])
  const contentY = useTransform(scrollY, [0, 700], [0, 60])

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28 pb-20"
    >
      {/* Particle matrix */}
      <div className="absolute inset-0 -z-20">
        <ParticleField />
      </div>

      {/* Ambient texture */}
      <div className="bg-grid absolute inset-0 -z-20 opacity-60" />
      <div className="bg-vignette absolute inset-0 -z-10" />

      {/* Aurora orbs — parallax drift + slow breathing */}
      <motion.div
        aria-hidden
        style={{ y: orbCyanY }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.12),transparent_60%)] blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: orbPurpleY }}
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/3 -z-10 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(138,43,226,0.10),transparent_65%)] blur-3xl"
      />

      <motion.div
        style={{ y: contentY }}
        className="relative mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-hairline bg-panel/60 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted backdrop-blur-sm"
        >
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" />
          {t.hero.kicker}
        </motion.span>

        <StaggeredHeadline />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.55 }}
          className="mt-7 max-w-2xl text-pretty text-base text-muted sm:text-lg"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.7 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <GlowButton href="#contact">{t.hero.ctaPrimary}</GlowButton>
          <GhostButton href="#capabilities">{t.hero.ctaSecondary}</GhostButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-14 flex items-center gap-3 rounded-full border border-hairline bg-void/50 px-5 py-2 backdrop-blur-sm"
        >
          <span className="pulse-dot h-2 w-2 rounded-full bg-signal" />
          <TerminalLine
            text={t.hero.status}
            speed={22}
            startDelay={1100}
            className="text-[0.72rem] text-muted"
          />
        </motion.div>

        {/* Animated metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.1 }}
          className="mt-8 flex items-stretch divide-x divide-hairline rounded-2xl border border-hairline bg-panel/40 backdrop-blur-sm"
        >
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-center gap-1 px-6 py-3 sm:px-8"
            >
              <AnimatedCounter
                to={metric.to}
                decimals={'decimals' in metric ? metric.decimals : 0}
                prefix={'prefix' in metric ? metric.prefix : ''}
                suffix={metric.suffix}
                className="font-mono text-lg font-semibold text-ink sm:text-xl"
              />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-dim">
                {metric.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-dim"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block"
        >
          {t.hero.scroll}
        </motion.span>
      </motion.div>
    </section>
  )
}
