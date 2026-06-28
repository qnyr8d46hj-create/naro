'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Sun,
  BookOpen,
  Mountain,
  Sparkles,
  Utensils,
  Camera,
  Flower2,
  ChefHat,
  Heart,
  Cake,
  BookMarked,
  Mail,
  FlaskConical,
  Building2,
  Search,
  Award,
  ChevronLeft,
  ChevronRight,
  Quote,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Locale } from '@/locales/hr'

interface ExampleProps {
  t: Locale
}

// Icons are defined here (not in locale) — locale stays text-only for i18n
const STORY_ICONS: LucideIcon[][] = [
  [Sun, BookOpen, Mountain, Sparkles, Utensils, Camera],
  [Flower2, ChefHat, Heart, Cake, BookMarked],
  [Mail, FlaskConical, Building2, Search, Award],
]

// Accent colours per story — warm palette variations
const STORY_ACCENTS = [
  { bg: 'bg-[#F5EDE6]', text: 'text-[#B8714E]', dot: 'bg-[#B8714E]' },
  { bg: 'bg-[#EDF2EC]', text: 'text-[#5C7A58]', dot: 'bg-[#5C7A58]' },
  { bg: 'bg-[#EAE8F5]', text: 'text-[#6256A8]', dot: 'bg-[#6256A8]' },
]

const AUTOPLAY_MS = 8000

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? 80 : -80,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.25 + i * 0.07, duration: 0.35 },
  }),
}

export default function Example({ t }: ExampleProps) {
  const { label, headline, subheadline, contextLabel, scenarioLabel, noteLabel, note, items } =
    t.examples

  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback(
    (newIndex: number, dir: number) => {
      setDirection(dir)
      setPage(newIndex)
      setProgress(0)
    },
    []
  )

  const prev = useCallback(() => {
    goTo((page - 1 + items.length) % items.length, -1)
  }, [page, items.length, goTo])

  const next = useCallback(() => {
    goTo((page + 1) % items.length, 1)
  }, [page, items.length, goTo])

  // Autoplay + progress bar
  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      setProgress(0)
      return
    }

    const tick = 50
    const steps = AUTOPLAY_MS / tick

    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next()
          return 0
        }
        return p + 100 / steps
      })
    }, tick)

    return () => {
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [isPaused, page, next, prefersReducedMotion])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next])

  const current = items[page]
  const icons = STORY_ICONS[page] ?? []
  const accent = STORY_ACCENTS[page]

  // Drag-to-swipe
  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 60
    if (info.offset.x < -swipeThreshold) next()
    else if (info.offset.x > swipeThreshold) prev()
  }

  return (
    <section className="py-28 md:py-36 px-6 bg-naro-cream overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-4">{label}</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-serif text-4xl md:text-5xl text-naro-text leading-tight max-w-lg">
              {headline}
            </h2>
            <p className="text-naro-muted text-sm max-w-xs leading-relaxed md:text-right">
              {subheadline}
            </p>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Primjeri Naro scenarija"
          aria-roledescription="carousel"
        >
          {/* Card stage — fixed min-height prevents layout shift */}
          <div className="relative min-h-[640px] sm:min-h-[560px] lg:min-h-[480px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={prefersReducedMotion ? {} : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
                aria-live="polite"
                aria-atomic="true"
              >
                <div className="card h-full p-0 overflow-hidden shadow-sm">
                  <div className="grid lg:grid-cols-2 h-full">
                    {/* Left panel — context */}
                    <div className="p-8 md:p-10 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-naro-border">
                      {/* Badge + recipient */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${accent.bg} ${accent.text}`}
                        >
                          {current.badge}
                        </span>
                        <span className="text-naro-muted text-sm">{current.for}</span>
                      </div>

                      {/* Context quote */}
                      <div>
                        <p className="text-xs font-medium tracking-widest uppercase text-naro-muted mb-3">
                          {contextLabel}
                        </p>
                        <blockquote className={`border-l-2 pl-4 ${accent.text} border-current`}>
                          <p className="font-serif text-xl text-naro-text leading-relaxed italic">
                            {current.context}
                          </p>
                        </blockquote>
                      </div>

                      {/* Connector arrow */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-naro-border" />
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center ${accent.bg}`}
                        >
                          <svg
                            className={`w-3.5 h-3.5 ${accent.text}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 13.5l-7 7-7-7M12 3v17.5"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 h-px bg-naro-border" />
                      </div>

                      {/* Scenario name */}
                      <div>
                        <p className="text-xs font-medium tracking-widest uppercase text-naro-muted mb-2">
                          {scenarioLabel}
                        </p>
                        <p className={`font-serif text-2xl md:text-3xl ${accent.text} leading-tight`}>
                          {current.scenarioName}
                        </p>
                      </div>

                      {/* Reaction */}
                      <div className="mt-auto pt-4 border-t border-naro-border">
                        <Quote className={`w-5 h-5 ${accent.text} mb-2 opacity-60`} />
                        <p className="font-serif text-lg text-naro-text leading-relaxed italic mb-2">
                          {current.reaction}
                        </p>
                        <p className="text-naro-muted text-sm">{current.reactionBy}</p>
                      </div>
                    </div>

                    {/* Right panel — timeline */}
                    <div className="p-8 md:p-10 flex flex-col">
                      <div className="flex-1 space-y-0">
                        {current.timeline.map((item, i) => {
                          const Icon = icons[i]
                          const isLast = i === current.timeline.length - 1
                          return (
                            <motion.div
                              key={`${page}-${i}`}
                              custom={i}
                              variants={listItemVariants}
                              initial="hidden"
                              animate="visible"
                              className="flex gap-4 relative"
                            >
                              {/* Icon column with connector */}
                              <div className="flex flex-col items-center flex-shrink-0">
                                <div
                                  className={`w-9 h-9 rounded-lg ${accent.bg} flex items-center justify-center z-10`}
                                >
                                  {Icon && (
                                    <Icon className={`w-4 h-4 ${accent.text}`} strokeWidth={1.5} />
                                  )}
                                </div>
                                {!isLast && (
                                  <div className="w-px flex-1 bg-naro-border my-1 min-h-[20px]" />
                                )}
                              </div>

                              {/* Text */}
                              <div className={`pb-5 ${isLast ? '' : ''}`}>
                                <p className={`text-xs font-medium ${accent.text} mb-0.5`}>
                                  {item.time}
                                </p>
                                <p className="text-naro-text text-sm leading-relaxed">
                                  {item.event}
                                </p>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>

                      {/* Note */}
                      <div className="mt-6 pt-6 border-t border-naro-border">
                        <p className="text-xs font-medium tracking-widest uppercase text-naro-muted mb-1.5">
                          {noteLabel}
                        </p>
                        <p className="text-naro-muted text-sm leading-relaxed">{note}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            {/* Prev arrow */}
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-naro-border bg-white hover:border-naro-accent hover:text-naro-accent text-naro-warm transition-all duration-200 flex items-center justify-center group"
              aria-label="Prethodna priča"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Indicators + progress */}
            <div className="flex items-center gap-3">
              {items.map((_, i) => {
                const isActive = i === page
                const thisAccent = STORY_ACCENTS[i]
                return (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > page ? 1 : -1)}
                    className="relative flex items-center justify-center"
                    aria-label={`Priča ${i + 1} od ${items.length}`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <motion.div
                      animate={{
                        width: isActive ? 32 : 8,
                        opacity: isActive ? 1 : 0.35,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`h-2 rounded-full ${isActive ? thisAccent.dot : 'bg-naro-border'} overflow-hidden`}
                    >
                      {isActive && (
                        <motion.div
                          className="h-full bg-white/40 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0 }}
                        />
                      )}
                    </motion.div>
                  </button>
                )
              })}
            </div>

            {/* Next arrow */}
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-naro-border bg-white hover:border-naro-accent hover:text-naro-accent text-naro-warm transition-all duration-200 flex items-center justify-center group"
              aria-label="Sljedeća priča"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Story counter — top right of card */}
          <div className="absolute top-0 right-0 -mt-10 text-xs text-naro-muted tabular-nums">
            {page + 1} / {items.length}
          </div>
        </div>
      </div>
    </section>
  )
}
