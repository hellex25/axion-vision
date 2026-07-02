import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'framer-motion'
import { LanguageProvider } from '~/i18n/LanguageContext'
import { translations } from '~/i18n/translations'
import { JsonLd } from '~/components/JsonLd'
import { ScrollProgress } from '~/components/ui/ScrollProgress'
import { SectionDivider } from '~/components/ui/SectionDivider'
import { Navbar } from '~/components/sections/Navbar'
import { Hero } from '~/components/sections/Hero'
import { TechMatrix } from '~/components/sections/TechMatrix'
import { ServicesCatalog } from '~/components/sections/ServicesCatalog'
import { EngineRoom } from '~/components/sections/EngineRoom'
import { ProtocolSecure } from '~/components/sections/ProtocolSecure'
import { ContactForm } from '~/components/sections/ContactForm'
import { Footer } from '~/components/sections/Footer'
import { SeoHead } from '~/components/SeoHead'
import { buildHomeJsonLd, buildPageHead } from '~/lib/seo'

export const Route = createFileRoute('/')({
  head: () => buildPageHead('ro', translations.ro.meta, '/'),
  component: Home,
})

function Home() {
  const jsonLd = buildHomeJsonLd('ro', translations.ro.meta)

  return (
    <LanguageProvider>
      <JsonLd data={jsonLd} />
      <SeoHead />
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-void">
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <TechMatrix />
            <SectionDivider />
            <ServicesCatalog />
            <SectionDivider />
            <EngineRoom />
            <SectionDivider />
            <ProtocolSecure />
            <SectionDivider />
            <ContactForm />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LanguageProvider>
  )
}
