'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Locale } from '@/locales/hr'

interface WhyNaroProps {
  t: Locale
}

const icons = [
  // Unique/star
  <svg key="star" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
  </svg>,
  // Check/organize
  <svg key="check" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Heart
  <svg key="heart" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>,
]

export default function WhyNaro({ t }: WhyNaroProps) {
  const { label, headline, reasons } = t.whyNaro
  const [headlineLine1, headlineLine2] = headline.split('\n')

  return (
    <section className="py-28 md:py-36 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80"
                alt="Osmišljavanje iznenađenja"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-naro-accent text-white rounded-2xl p-6 shadow-xl max-w-[200px]"
            >
              <p className="font-serif text-3xl font-medium mb-1">100%</p>
              <p className="text-white/80 text-sm leading-snug">personaliziranih iznenađenja</p>
            </motion.div>
          </motion.div>

          {/* Right: text */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <p className="section-label mb-4">{label}</p>
              <h2 className="font-serif text-4xl md:text-5xl text-naro-text leading-tight">
                {headlineLine1}
                <br />
                <span className="text-naro-accent">{headlineLine2}</span>
              </h2>
            </motion.div>

            <div className="space-y-8">
              {reasons.map((reason, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-naro-sand border border-naro-border flex items-center justify-center flex-shrink-0 text-naro-accent">
                    {icons[i]}
                  </div>
                  <div>
                    <h3 className="font-medium text-naro-text text-lg mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-naro-warm leading-relaxed text-base">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
