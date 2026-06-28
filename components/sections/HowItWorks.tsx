'use client'

import { motion } from 'framer-motion'
import type { Locale } from '@/locales/hr'

interface HowItWorksProps {
  t: Locale
}

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function HowItWorks({ t }: HowItWorksProps) {
  const { label, headline, steps } = t.howItWorks

  return (
    <section
      id="kako-funkcionira"
      className="py-28 md:py-36 px-6 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="section-label mb-4">{label}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-naro-text max-w-lg leading-tight">
            {headline}
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-8 left-[calc(33.33%+16px)] right-[calc(33.33%+16px)] h-px bg-naro-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              custom={i}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="relative"
            >
              {/* Step number */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-naro-sand border border-naro-border flex items-center justify-center flex-shrink-0 relative z-10">
                  <span className="font-serif text-naro-accent text-lg font-medium">
                    {step.number}
                  </span>
                </div>
              </div>

              <h3 className="font-serif text-2xl text-naro-text mb-3 leading-snug">
                {step.title}
              </h3>
              <p className="text-naro-warm text-base leading-relaxed">
                {step.description}
              </p>

              {/* Mobile connector */}
              {i < steps.length - 1 && (
                <div className="md:hidden absolute left-7 top-14 w-px h-12 bg-naro-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
