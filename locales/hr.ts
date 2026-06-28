export const hr = {
  meta: {
    title: 'Naro – Personalizirani studio za osmišljavanje iznenađenja',
    description:
      'Ispričajte nam nešto o osobi koju volite. Mi osmišljavamo tri savršena scenarija iznenađenja i organiziramo sve do detalja.',
    ogTitle: 'Naro – Iznenađenja koja ostavljaju bez teksta',
    ogDescription:
      'Ne tražimo što možemo poslati. Tražimo što će joj ostati u srcu.',
  },
  nav: {
    logo: 'Naro',
    howItWorks: 'Kako funkcionira',
    cta: 'Osmisli iznenađenje',
  },
  hero: {
    badge: 'Personalizirani studio za iznenađenja',
    headline: 'Najljepša iznenađenja\nne kupuju se.',
    headlineAccent: 'Ona se osmišljavaju.',
    subheadline:
      'Ispričajte nam nešto o osobi koju volite. Mi osmišljavamo tri potpuno personalizirana scenarija iznenađenja — i organiziramo sve do zadnjeg detalja.',
    cta: 'Osmisli iznenađenje',
    scrollHint: 'Saznajte više',
  },
  howItWorks: {
    label: 'Kako funkcionira',
    headline: 'Tri koraka do savršenog trenutka',
    steps: [
      {
        number: '01',
        title: 'Ispričajte nam o osobi',
        description:
          'Podijelite s nama što je čini posebnom — hobije, navike, snove, najdraže uspomene. Što više detalja, to osobnije iznenađenje.',
      },
      {
        number: '02',
        title: 'Mi osmišljavamo tri scenarija',
        description:
          'Naš tim pažljivo proučava sve što ste nam povjerili i kreira tri potpuno različita, personalizirana koncepta iznenađenja.',
      },
      {
        number: '03',
        title: 'Vi birate, mi organiziramo sve',
        description:
          'Odaberete scenarij koji vam se čini savršenim. Mi se brinemo za svaki detalj — od nabave do isporuke.',
      },
    ],
  },
  example: {
    label: 'Primjer',
    headline: 'Ovako izgleda Naro u praksi',
    story: {
      intro: 'Ivan želi iznenaditi suprugu za desetu godišnjicu braka.',
      quote:
        '"Voli planine, uvijek čita kad nađe minutu i stalno govori da nema vremena za sebe."',
      scenarioTitle: 'Scenarij koji smo osmislili:',
      scenarioName: '"DAN SAMO ZA NJU"',
      timeline: [
        { time: '08:00', event: 'Buket njezinih omiljenih cvjetova na poslu' },
        { time: '12:00', event: 'Poruka s tajnom adresom' },
        { time: '15:00', event: 'Wellness tretman za dvoje' },
        { time: '20:00', event: 'Privatna večera s pogledom na grad' },
        {
          time: 'Kod kuće',
          event: 'Personalizirana knjiga s njihovim najljepšim uspomenama',
        },
      ],
      result: '"Nije mogla vjerovati da sam se toga sjetio."',
      note: 'Ovo je jedan od tri scenarija koje bismo predložili. Svaki je potpuno drugačiji.',
    },
  },
  whyNaro: {
    label: 'Zašto Naro',
    headline: 'Mi ne biramo proizvode.\nMi biramo emocije.',
    reasons: [
      {
        title: 'Svako iznenađenje je jedinstveno',
        description:
          'Ne postoje predlošci ni gotova rješenja. Svaki scenarij osmišljavamo od nule, za tu točno određenu osobu.',
      },
      {
        title: 'Vi ne morate razmišljati ni o čemu',
        description:
          'Koordiniramo sve — od ideje do isporuke. Vaš jedini zadatak je biti tamo kad osoba otvori poklon.',
      },
      {
        title: 'Tražimo što će joj ostati u srcu',
        description:
          'Ne pitamo se što možemo poslati. Pitamo se što će ta osoba pamtiti godinama.',
      },
    ],
  },
  form: {
    label: 'Počnite ovdje',
    headline: 'Ispričajte nam o osobi',
    subheadline:
      'Što više detalja podijelite, to ćemo osmisliti osobnije iznenađenje.',
    fields: {
      recipient: {
        label: 'Koga želite iznenaditi?',
        placeholder: 'Odaberite osobu',
        options: [
          { value: 'partnerica', label: 'Partnericu / suprugu' },
          { value: 'partner', label: 'Partnera / supruga' },
          { value: 'mama', label: 'Mamu' },
          { value: 'tata', label: 'Tatu' },
          { value: 'prijateljica', label: 'Prijateljicu' },
          { value: 'prijatelj', label: 'Prijatelja' },
          { value: 'sestra', label: 'Sestru' },
          { value: 'brat', label: 'Brata' },
          { value: 'dijete', label: 'Dijete' },
          { value: 'baka', label: 'Baku' },
          { value: 'djed', label: 'Djeda' },
          { value: 'kolega', label: 'Kolegu / kolegicu' },
          { value: 'ostalo', label: 'Ostalo' },
        ],
      },
      occasion: {
        label: 'Prigoda',
        placeholder: 'Odaberite prigodu',
        options: [
          { value: 'rodjendan', label: 'Rođendan' },
          { value: 'godisnjica', label: 'Godišnjica' },
          { value: 'majcin-dan', label: 'Majčin dan' },
          { value: 'ocevdan', label: 'Očev dan' },
          { value: 'valentinovo', label: 'Valentinovo' },
          { value: 'bozic', label: 'Božić' },
          { value: 'nova-godina', label: 'Nova godina' },
          { value: 'diploma', label: 'Diploma / završetak školovanja' },
          { value: 'promocija', label: 'Promaknuće / novi posao' },
          { value: 'vjencanje', label: 'Vjenčanje' },
          { value: 'beba', label: 'Rođenje djeteta' },
          { value: 'ostalo', label: 'Ostalo' },
        ],
      },
      age: {
        label: 'Koliko godina ima?',
        placeholder: 'npr. 35',
      },
      budget: {
        label: 'Budžet',
        prefix: '€',
        min: 50,
        max: 1000,
        step: 25,
        aboveMax: '1000€+',
      },
      deliveryDate: {
        label: 'Kada treba biti spremno?',
      },
      description: {
        label: 'Ispričajte nam o njoj / njemu',
        placeholder:
          'Što više detalja podijelite, to ćemo osmisliti osobnije iznenađenje.\n\nNpr. što voli, što ne voli, hobiji, omiljena hrana, boje, kućni ljubimci, najljepše uspomene, snovi, što često spominje, što bi je / ga iskreno razveselilo...',
      },
      name: {
        label: 'Vaše ime',
        placeholder: 'Ana',
      },
      email: {
        label: 'Vaš email',
        placeholder: 'ana@email.com',
      },
      contactPermission: {
        label:
          'Možete me kontaktirati kako bismo zajedno osmislili još bolje iznenađenje.',
      },
    },
    cta: 'Osmisli moje iznenađenje',
    ctaLoading: 'Šaljemo...',
    privacy: 'Vaši podaci su sigurni i nikada ih nećemo dijeliti s trećim stranama.',
    errors: {
      recipient: 'Odaberite koga želite iznenaditi',
      occasion: 'Odaberite prigodu',
      age: 'Unesite dob osobe',
      ageInvalid: 'Unesite ispravnu dob (1–120)',
      deliveryDate: 'Odaberite datum',
      description: 'Ispričajte nam nešto o osobi (min. 20 znakova)',
      name: 'Unesite vaše ime',
      email: 'Unesite ispravnu email adresu',
      submit: 'Nešto je pošlo po krivu. Pokušajte ponovo ili nas kontaktirajte na info@naro.hr',
    },
  },
  faq: {
    label: 'Česta pitanja',
    headline: 'Imate pitanja?\nImate ih i svi drugi.',
    items: [
      {
        question: 'Što ako mi se ne svidi nijedan od tri prijedloga?',
        answer:
          'Vraćamo se s alternativama. Naš cilj nije poslati vam tri opcije i završiti posao — naš cilj je pronaći nešto što će osobu zaista ganuti. Ako nismo pogodili, radimo dalje.',
      },
      {
        question: 'Moram li unaprijed znati što osoba voli?',
        answer:
          'Ne morate imati savršenu listu. Dovoljna su i mala zapažanja — što često govori, čega joj nedostaje, koji film je pogledala deset puta. Mi smo tu da od malih detalja stvorimo veliku priču.',
      },
      {
        question: 'Koliko košta vaša usluga i kada plaćam?',
        answer:
          'Naknada za osmišljavanje i koordinaciju iznosi 49 €, a plaća se tek nakon što odaberete jedan od prijedloga i odlučite krenuti dalje. Budžet za iznenađenje dogovaramo zajedno i njega plaćate direktno.',
      },
      {
        question: 'Kada ću dobiti prijedloge?',
        answer:
          'Unutar 24 do 48 sati od kada nam pošaljete informacije. Ako je datum iznenađenja blizu, kontaktirajte nas direktno na info@naro.hr i pokušat ćemo ubrzati.',
      },
      {
        question: 'Možete li organizirati dostavu na drugu adresu ili u drugi grad?',
        answer:
          'Da. Organiziramo iznenađenja diljem Hrvatske — od Dubrovnika do Varaždina. Svaki put dogovaramo logistiku prilagođenu situaciji.',
      },
    ],
  },
  footer: {
    tagline: 'Studio za osmišljavanje iznenađenja.',
    contact: 'Kontakt',
    email: 'info@naro.hr',
    instagram: 'Instagram',
    privacy: 'Politika privatnosti',
    terms: 'Uvjeti korištenja',
    copyright: '© 2025 Naro. Sva prava pridržana.',
  },
  thankYou: {
    title: 'Hvala.',
    headline: 'Već razmišljamo o vašem iznenađenju.',
    description:
      'Pažljivo ćemo proučiti sve što ste nam povjerili i poslati vam tri personalizirana prijedloga unutar 24 do 48 sati.',
    note: 'Provjerite inbox — pa i spam folder, za svaki slučaj.',
    back: 'Natrag na početak',
  },
} as const

export type Locale = typeof hr
