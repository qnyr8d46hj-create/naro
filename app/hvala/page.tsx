import type { Metadata } from 'next'
import Link from 'next/link'
import { hr } from '@/locales/hr'

export const metadata: Metadata = {
  title: 'Hvala — Naro',
  robots: { index: false },
}

export default function ThankYouPage() {
  const t = hr.thankYou

  return (
    <main className="min-h-screen bg-naro-cream flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-lg w-full text-center">
        {/* Animated checkmark */}
        <div className="w-20 h-20 mx-auto mb-10 rounded-full bg-naro-accent/10 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-naro-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <p className="section-label mb-6">{t.title}</p>

        <h1 className="font-serif text-4xl md:text-5xl text-naro-text leading-tight mb-6">
          {t.headline}
        </h1>

        <p className="prose-warm mb-4">{t.description}</p>

        <p className="text-naro-muted text-sm mb-12">{t.note}</p>

        <div className="w-16 h-px bg-naro-border mx-auto mb-12" />

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-naro-warm hover:text-naro-accent transition-colors text-sm font-medium"
        >
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          {t.back}
        </Link>
      </div>
    </main>
  )
}
