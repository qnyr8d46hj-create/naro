'use client'

import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import type { Locale } from '@/locales/hr'

interface ExampleProps {
  t: Locale
}

// Per-story accent colours — matches locale order
const ACCENTS = [
  { pill: 'bg-[#F5EDE6] text-[#B8714E]', highlight: 'bg-[#FCEEE5] text-[#9A5A3A]', check: 'bg-[#F5EDE6] text-[#B8714E]', dot: 'bg-[#B8714E]', name: 'text-[#B8714E]' },
  { pill: 'bg-[#EDF2EC] text-[#5C7A58]', highlight: 'bg-[#E4EFE3] text-[#4A6847]', check: 'bg-[#EDF2EC] text-[#5C7A58]', dot: 'bg-[#5C7A58]', name: 'text-[#5C7A58]' },
  { pill: 'bg-[#EAE8F5] text-[#6256A8]', highlight: 'bg-[#E3E0F5] text-[#4E4390]', check: 'bg-[#EAE8F5] text-[#6256A8]', dot: 'bg-[#6256A8]', name: 'text-[#6256A8]' },
] as const

// Renders context text with highlighted segments
function ContextText({
  segments,
  highlightClass,
}: {
  segments: readonly { text: string; highlight: boolean }[]
  highlightClass: string
}) {
  return (
    <p className="font-serif text-xl md:text-2xl text-naro-text leading-relaxed">
      {segments.map((seg, i) =>
        seg.highlight ? (
          <mark key={i} className={`${highlightClass} rounded px-0.5 not-italic font-medium`} style={{ fontStyle: 'normal' }}>
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </p>
  )
}

// Single story card — full layout
function StoryCard({
  item,
  accent,
  note,
  sectionContext,
  sectionScenario,
  sectionReasons,
}: {
  item: Locale['examples']['items'][number]
  accent: typeof ACCENTS[number]
  note: string
  sectionContext: string
  sectionScenario: string
  sectionReasons: string
}) {
  return (
    <div className="card overflow-hidden">
      <div className="grid lg:grid-cols-2">

        {/* ── LEFT: What you told us ─────────────────── */}
        <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-naro-border flex flex-col gap-8">
          {/* Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${accent.pill}`}>
              {item.badge}
            </span>
            <span className="text-naro-muted text-sm">{item.for}</span>
          </div>

          {/* Section label */}
          <div>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-naro-muted mb-5">
              {sectionContext}
            </p>
            <ContextText segments={item.context} highlightClass={accent.highlight} />
          </div>

          {/* Visual connector — desktop shows arrow pointing right, mobile points down */}
          <div className="flex items-center gap-3 mt-auto">
            <div className="flex-1 h-px bg-naro-border" />
            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${accent.pill}`}>
              {/* Arrow right on lg, arrow down on mobile */}
              <svg className={`w-3.5 h-3.5 hidden lg:block ${accent.name}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <svg className={`w-3.5 h-3.5 lg:hidden ${accent.name}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </div>
            <div className="flex-1 h-px bg-naro-border" />
          </div>
        </div>

        {/* ── RIGHT: Scenario + Reasons ──────────────── */}
        <div className="p-8 md:p-10 flex flex-col gap-8">

          {/* Scenario */}
          <div>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-naro-muted mb-3">
              {sectionScenario}
            </p>
            <p className={`font-serif text-xl font-medium mb-5 ${accent.name}`}>
              {item.scenarioName}
            </p>
            <p className="text-naro-text text-base leading-[1.85] ">
              {item.scenario}
            </p>
          </div>

          {/* Reasons card */}
          <div className="rounded-xl border border-naro-border bg-naro-sand p-6">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-naro-muted mb-4">
              {sectionReasons}
            </p>
            <ul className="space-y-3">
              {item.reasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${accent.check}`}>
                    <Check className="w-3 h-3" strokeWidth={2.5} />
                  </div>
                  <p className="text-naro-text text-sm leading-relaxed">{reason}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Note */}
          <p className="text-naro-muted text-xs leading-relaxed border-t border-naro-border pt-5">
            {note}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Example({ t }: ExampleProps) {
  const { label, headline, subheadline, sectionContext, sectionScenario, sectionReasons, note, items } = t.examples

  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)

  // Touch/swipe state
  const touchStartX = useRef<number>(0)

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir)
    setPage(idx)
  }, [])

  const prev = useCallback(() => {
    goTo((page - 1 + items.length) % items.length, -1)
  }, [page, items.length, goTo])

  const next = useCallback(() => {
    goTo((page + 1) % items.length, 1)
  }, [page, items.length, goTo])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 48) {
      if (delta > 0) next()
      else prev()
    }
  }

  const [line1, line2] = headline.split('\n')

  return (
    <section id="primjeri" className="py-28 md:py-36 px-6 bg-naro-cream overflow-hidden">
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
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-serif text-4xl md:text-5xl text-naro-text leading-tight">
              {line1}
              <br />
              <span className="text-naro-accent">{line2}</span>
            </h2>
            <p className="text-naro-muted text-sm max-w-xs leading-relaxed lg:text-right lg:mb-1">
              {subheadline}
            </p>
          </div>
        </motion.div>

        {/* Carousel wrapper */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Primjeri Naro scenarija"
        >
          {/*
           * Grid-stacking technique: all cards render in the same grid cell.
           * Container height = height of tallest card. No jumping on switch.
           * Inactive cards: opacity 0, pointer-events none.
           */}
          <div
            className="grid"
            style={{ gridTemplateAreas: '"card"' }}
          >
            {items.map((item, i) => {
              const isActive = i === page
              const xOffset = direction > 0 ? 24 : -24
              return (
                <motion.div
                  key={i}
                  style={{ gridArea: 'card' }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : direction > 0 ? -xOffset : xOffset,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  aria-hidden={!isActive}
                >
                  <StoryCard
                    item={item}
                    accent={ACCENTS[i]}
                    note={note}
                    sectionContext={sectionContext}
                    sectionScenario={sectionScenario}
                    sectionReasons={sectionReasons}
                  />
                </motion.div>
              )
            })}
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-naro-border bg-white hover:border-naro-accent hover:text-naro-accent text-naro-warm transition-all duration-200 flex items-center justify-center group"
              aria-label="Prethodni primjer"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-150" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-3">
              {items.map((_, i) => {
                const isActive = i === page
                return (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > page ? 1 : -1)}
                    aria-label={`Primjer ${i + 1} od ${items.length}`}
                    aria-current={isActive ? 'true' : undefined}
                    className="p-1 -m-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-naro-accent rounded-full"
                  >
                    <motion.div
                      animate={{ width: isActive ? 28 : 8 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className={`h-2 rounded-full transition-colors duration-300 ${
                        isActive ? ACCENTS[i].dot : 'bg-naro-border'
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-naro-border bg-white hover:border-naro-accent hover:text-naro-accent text-naro-warm transition-all duration-200 flex items-center justify-center group"
              aria-label="Sljedeći primjer"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-150" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
