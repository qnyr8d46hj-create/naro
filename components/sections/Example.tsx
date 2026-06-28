'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Locale } from '@/locales/hr'

interface ExampleProps {
  t: Locale
}

export default function Example({ t }: ExampleProps) {
  const { label, headline, story } = t.example

  return (
    <section className="py-28 md:py-36 px-6 bg-naro-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-4">{label}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-naro-text max-w-lg leading-tight">
            {headline}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Story card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="card p-8 md:p-10"
          >
            <p className="text-naro-warm text-base mb-6">{story.intro}</p>

            {/* Quote */}
            <blockquote className="border-l-2 border-naro-accent pl-5 mb-8">
              <p className="font-serif text-xl text-naro-text leading-relaxed italic">
                {story.quote}
              </p>
            </blockquote>

            {/* Scenario label */}
            <p className="text-xs font-medium tracking-widest uppercase text-naro-muted mb-2">
              {story.scenarioTitle}
            </p>
            <p className="font-serif text-2xl text-naro-accent mb-8">
              {story.scenarioName}
            </p>

            {/* Timeline */}
            <div className="space-y-4 mb-8">
              {story.timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex gap-4 items-start"
                >
                  <span className="text-naro-accent font-medium text-sm min-w-[70px] pt-0.5">
                    {item.time}
                  </span>
                  <div className="flex gap-3 items-start flex-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-naro-accent mt-2 flex-shrink-0" />
                    <span className="text-naro-text text-base">{item.event}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Result */}
            <div className="bg-naro-sand rounded-xl p-5">
              <p className="font-serif text-lg text-naro-text italic">
                {story.result}
              </p>
            </div>
          </motion.div>

          {/* Image + note */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&w=800&q=80"
                alt="Trenutak iznenađenja"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="card p-6 bg-naro-sand border-naro-border">
              <p className="text-xs font-medium tracking-widest uppercase text-naro-muted mb-2">
                Napomena
              </p>
              <p className="text-naro-warm text-base leading-relaxed">
                {story.note}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
