'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Locale } from '@/locales/hr'

interface HeaderProps {
  t: Locale
}

const NAV_ITEMS = [
  { labelKey: 'howItWorks' as const, anchor: 'kako-funkcionira' },
  { labelKey: 'examples' as const,   anchor: 'primjeri' },
  { labelKey: 'faqLink' as const,    anchor: 'cesta-pitanja' },
]

function scrollTo(anchor: string) {
  const el = document.getElementById(anchor)
  if (!el) return
  // Offset for fixed header (64px)
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Header({ t }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = useCallback((anchor: string) => {
    setMenuOpen(false)
    // Small delay on mobile so the menu closes first
    setTimeout(() => scrollTo(anchor), menuOpen ? 280 : 0)
  }, [menuOpen])

  const handleCTA = useCallback(() => {
    setMenuOpen(false)
    setTimeout(() => scrollTo('forma'), menuOpen ? 280 : 0)
  }, [menuOpen])

  const navLinkClass =
    'text-sm font-medium text-naro-warm hover:text-naro-accent transition-colors duration-150'

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? 'bg-naro-cream/95 backdrop-blur-xl border-b border-naro-border/80 shadow-[0_1px_12px_rgba(28,23,20,0.06)]'
            : 'bg-white/80 backdrop-blur-xl border-b border-white/30'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="font-serif text-2xl text-naro-text tracking-tight hover:text-naro-accent transition-colors duration-150 flex-shrink-0"
          >
            {t.nav.logo}
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Glavna navigacija">
            {NAV_ITEMS.map(({ labelKey, anchor }) => (
              <button
                key={anchor}
                onClick={() => handleNavClick(anchor)}
                className={navLinkClass}
              >
                {t.nav[labelKey]}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Button size="md" onClick={handleCTA}>
              {t.nav.cta}
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          </div>

          {/* Mobile: CTA (compact) + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <Button size="md" onClick={handleCTA} className="text-sm px-4 py-2.5">
              {t.nav.cta}
            </Button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Zatvori izbornik' : 'Otvori izbornik'}
              aria-expanded={menuOpen}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-naro-warm hover:text-naro-accent hover:bg-naro-sand transition-all duration-150"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-16 left-0 right-0 z-40 bg-naro-cream border-b border-naro-border shadow-lg md:hidden"
            >
              <nav
                aria-label="Mobilna navigacija"
                className="flex flex-col px-6 py-4"
              >
                {NAV_ITEMS.map(({ labelKey, anchor }, i) => (
                  <motion.button
                    key={anchor}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.2 }}
                    onClick={() => handleNavClick(anchor)}
                    className="text-left py-4 text-base font-medium text-naro-warm hover:text-naro-accent transition-colors duration-150 border-b border-naro-border last:border-0"
                  >
                    {t.nav[labelKey]}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
