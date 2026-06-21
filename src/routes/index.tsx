import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'framer-motion'
import { LanguageProvider } from '~/i18n/LanguageContext'
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
import { EuFundingNotice } from '~/components/sections/EuFundingNotice'
import { SeoHead } from '~/components/SeoHead'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <LanguageProvider>
      <SeoHead />
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-void">
          <ScrollProgress />
          <Navbar />
          <EuFundingNotice />
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
