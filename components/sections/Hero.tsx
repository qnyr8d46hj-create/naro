'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import type { Locale } from '@/locales/hr'

interface HeroProps {
  t: Locale
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function Hero({ t }: HeroProps) {
  const scrollToForm = () => {
    document.getElementById('forma')?.scrollIntoView({ behavior: 'smooth' })
  }

  const [line1, line2] = t.hero.headline.split('\n')

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Full-bleed image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1920&q=85"
          alt="Naro – trenutak iznenađenja"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Warm gradient overlay — keeps text readable and brand-warm */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 max-w-6xl mx-auto px-6 pt-40 pb-24">
        <div className="max-w-2xl flex flex-col flex-1">
          {/* Badge */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xs font-medium tracking-[0.25em] uppercase text-white/60 mb-8"
          >
            {t.hero.badge}
          </motion.p>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-2"
          >
            {line1}
          </motion.h1>
          <motion.h1
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-naro-accent leading-[1.05] mb-8"
          >
            {line2}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-white/75 text-lg md:text-xl leading-relaxed max-w-lg mb-12"
          >
            {t.hero.subheadline}
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Button size="lg" onClick={scrollToForm}>
              {t.hero.cta}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Button>
          </motion.div>

          <div className="flex-1" />

          {/* Scroll indicator */}
          <ScrollIndicator label={t.hero.scrollHint} />
        </div>
      </div>
    </section>
  )
}
