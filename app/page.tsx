import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import HowItWorks from '@/components/sections/HowItWorks'
import Example from '@/components/sections/Example'
import WhyNaro from '@/components/sections/WhyNaro'
import Form from '@/components/sections/Form'
import FAQ from '@/components/sections/FAQ'
import Footer from '@/components/sections/Footer'
import { hr } from '@/locales/hr'

export default function Home() {
  const t = hr
  return (
    <>
      <Header t={t} />
      <main>
        <Hero t={t} />
        <HowItWorks t={t} />
        <Example t={t} />
        <WhyNaro t={t} />
        <Form t={t} />
        <FAQ t={t} />
      </main>
      <Footer t={t} />
    </>
  )
}
