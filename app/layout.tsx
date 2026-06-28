import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { hr } from '@/locales/hr'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://naro.hr'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: hr.meta.title,
    template: `%s | Naro`,
  },
  description: hr.meta.description,
  openGraph: {
    title: hr.meta.ogTitle,
    description: hr.meta.ogDescription,
    url: siteUrl,
    siteName: 'Naro',
    locale: 'hr_HR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Naro – Personalizirani studio za osmišljavanje iznenađenja',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: hr.meta.ogTitle,
    description: hr.meta.ogDescription,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hr" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
