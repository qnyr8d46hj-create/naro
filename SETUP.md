# Naro — Setup upute

## Lokalni development

### 1. Instalirajte dependencies

```bash
npm install
```

### 2. Kopirajte env varijable

```bash
cp .env.local.example .env.local
```

Popunite `.env.local` s vašim podacima (Firebase + Resend).

### 3. Firebase setup

1. Idite na [console.firebase.google.com](https://console.firebase.google.com)
2. Kreirajte novi projekt (npr. `naro-mvp`)
3. Dodajte **Web app** u projekt
4. Kopirajte `firebaseConfig` podatke u `.env.local`
5. Idite na **Firestore Database** → Create database → Start in test mode
6. Kolekcija `surprise_requests` će se automatski kreirati pri prvom zahtjevu

### 4. Resend setup

1. Idite na [resend.com](https://resend.com) i kreirajte račun
2. Dodajte i verificirajte svoju domenu (ili koristite Resend sandbox za testiranje)
3. Kreirajte API ključ i dodajte u `.env.local`
4. U `lib/resend.ts` zamijenite `from: 'Naro <obavijesti@naro.hr>'` s vašom verificiranom email adresom

> **Za MVP testiranje:** Resend sandbox dopušta slanje emailova na vašu vlastitu adresu bez verifikacije domene.

### 5. Pokrenite lokalno

```bash
npm run dev
```

Aplikacija će biti dostupna na [http://localhost:3000](http://localhost:3000)

---

## Deploy na Vercel

### Opcija A — Vercel CLI

```bash
npx vercel
```

### Opcija B — GitHub integracija

1. Pushajte kod na GitHub
2. Idite na [vercel.com](https://vercel.com) → New Project → Import repozitorij
3. Dodajte sve env varijable iz `.env.local.example` u Vercel dashboard
4. Deploy

### Environment varijable na Vercelu

U Vercel dashboardu, pod **Settings → Environment Variables** dodajte:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | vaš Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | vaš auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | vaš project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | vaš storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | vaš sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | vaš app ID |
| `RESEND_API_KEY` | vaš Resend API ključ |
| `ADMIN_EMAIL` | email na koji dolaze zahtjevi |
| `NEXT_PUBLIC_SITE_URL` | `https://vasa-domena.com` |

---

## Struktura projekta

```
naro/
├── app/
│   ├── api/submit/route.ts     ← API endpoint (Firestore + email)
│   ├── hvala/page.tsx          ← Thank you stranica
│   ├── layout.tsx              ← Root layout + SEO metadata
│   ├── page.tsx                ← Landing page
│   ├── robots.ts               ← robots.txt
│   ├── sitemap.ts              ← sitemap.xml
│   └── globals.css             ← Globalni stilovi + slider CSS
├── components/
│   ├── layout/
│   │   └── Header.tsx          ← Navigacija (transparent → solid on scroll)
│   ├── sections/
│   │   ├── Hero.tsx            ← Hero s full-bleed slikom
│   │   ├── HowItWorks.tsx      ← 3 koraka
│   │   ├── Example.tsx         ← Primjer priče (Ivan i supruga)
│   │   ├── WhyNaro.tsx         ← 3 razloga + fotografija
│   │   ├── Form.tsx            ← Forma za zahtjev
│   │   ├── FAQ.tsx             ← Accordion FAQ
│   │   └── Footer.tsx          ← Footer
│   └── ui/
│       ├── Button.tsx          ← Reusable button s Framer Motion
│       └── ScrollIndicator.tsx ← Animirani scroll hint
├── lib/
│   ├── firebase.ts             ← Firebase inicijalizacija
│   ├── firestore.ts            ← Firestore helper
│   ├── resend.ts               ← Email predlošci
│   └── utils.ts                ← cn() helper
├── locales/
│   ├── hr.ts                   ← Svi tekstovi (HR)
│   └── index.ts                ← Locale loader
└── types/
    └── index.ts                ← TypeScript tipovi
```

---

## Dodavanje novog jezika

1. Kopirajte `locales/hr.ts` u `locales/en.ts`
2. Prevedite sve stringove
3. Dodajte u `locales/index.ts`:
   ```typescript
   import { en } from './en'
   export const locales = { hr, en }
   ```
4. U `app/page.tsx` promijenite `const t = hr` na željeni locale

---

## Praćenje zahtjeva

Svi zahtjevi se spremaju u **Firestore** pod kolekcijom `surprise_requests` s ovim poljima:

- `createdAt` — timestamp
- `status` — `new` / `in_progress` / `sent` / `completed`
- `name`, `email` — podaci korisnika
- `recipient`, `occasion`, `age`, `budget`, `deliveryDate`, `description` — detalji
- `contactPermission` — boolean

Možete pratiti zahtjeve direktno u Firebase Consoleu ili kasnije dodati admin panel.
