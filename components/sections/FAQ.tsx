'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail } from 'lucide-react'
import type { Locale } from '@/locales/hr'

interface FAQProps {
  t: Locale
}

function FAQItem({
  question,
  answer,
  isOpen,
  index,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  index: number
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border-b border-naro-border last:border-0"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex justify-between items-start py-6 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-naro-accent focus-visible:ring-offset-2 rounded"
      >
        <span className="font-medium text-naro-text text-lg pr-8 leading-snug group-hover:text-naro-accent transition-colors duration-200">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-6 h-6 flex-shrink-0 mt-0.5"
        >
          <svg
            className={`w-6 h-6 transition-colors duration-200 ${isOpen ? 'text-naro-accent' : 'text-naro-muted group-hover:text-naro-accent'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="text-naro-warm leading-relaxed pb-7 text-base pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ({ t }: FAQProps) {
  const { label, headline, items, cta } = t.faq
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [line1, line2] = headline.split('\n')

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
            {line1}
            <br />
            <span className="text-naro-accent">{line2}</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card px-8 mb-8"
        >
          {items.map((item, i) => (
            <FAQItem
              key={i}
              index={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* Contact CTA — catches anyone whose question wasn't answered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <a
            href={`mailto:${cta.link}`}
            className="group flex items-center justify-between w-full bg-naro-sand border border-naro-border rounded-2xl px-7 py-5 hover:border-naro-accent transition-all duration-200"
          >
            <div>
              <p className="font-medium text-naro-text text-base group-hover:text-naro-accent transition-colors duration-200">
                {cta.headline}
              </p>
              <p className="text-naro-muted text-sm mt-0.5">{cta.body}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 ml-6">
              <span className="text-sm text-naro-accent font-medium hidden sm:block">
                {cta.link}
              </span>
              <div className="w-9 h-9 rounded-full bg-white border border-naro-border group-hover:border-naro-accent group-hover:bg-naro-accent transition-all duration-200 flex items-center justify-center">
                <Mail className="w-4 h-4 text-naro-muted group-hover:text-white transition-colors duration-200" />
              </div>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
