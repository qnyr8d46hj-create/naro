'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Locale } from '@/locales/hr'

interface FAQProps {
  t: Locale
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-naro-border last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-start py-6 text-left group"
      >
        <span className="font-medium text-naro-text text-lg pr-8 leading-snug group-hover:text-naro-accent transition-colors">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="w-6 h-6 flex-shrink-0 text-naro-accent mt-0.5"
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="text-naro-warm leading-relaxed pb-6 text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ({ t }: FAQProps) {
  const { label, headline, items } = t.faq
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [headlineLine1, headlineLine2] = headline.split('\n')

  return (
    <section className="py-28 md:py-36 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-4">{label}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-naro-text leading-tight">
            {headlineLine1}
            <br />
            {headlineLine2}
          </h2>
        </motion.div>

        {/* Items */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-2"
        >
          <div className="px-6">
            {items.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
