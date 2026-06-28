'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import type { Locale } from '@/locales/hr'

interface HeaderProps {
  t: Locale
}

export default function Header({ t }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollToForm = () => {
    document.getElementById('forma')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-naro-cream/95 backdrop-blur-md border-b border-naro-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          className="font-serif text-2xl text-naro-text tracking-tight hover:text-naro-accent transition-colors"
        >
          {t.nav.logo}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#kako-funkcionira"
            className="text-sm text-naro-warm hover:text-naro-accent transition-colors font-medium"
          >
            {t.nav.howItWorks}
          </a>
        </nav>

        <Button size="md" onClick={scrollToForm}>
          {t.nav.cta}
          <svg
            className="w-4 h-4 ml-1"
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
      </div>
    </motion.header>
  )
}
