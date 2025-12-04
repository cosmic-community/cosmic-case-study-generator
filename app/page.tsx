import { getLandingPage, getSiteConfiguration } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import BenefitsSection from '@/components/BenefitsSection'
import AnalysisForm from '@/components/AnalysisForm'
import SocialProof from '@/components/SocialProof'
import Footer from '@/components/Footer'

export default async function HomePage() {
  const landingPage = await getLandingPage()
  const config = await getSiteConfiguration()
  
  if (!landingPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Content Not Available
          </h1>
          <p className="text-gray-600">
            Please configure your landing page content in Cosmic CMS.
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <main className="min-h-screen">
      <HeroSection landingPage={landingPage} />
      <AnalysisForm landingPage={landingPage} />
      <BenefitsSection landingPage={landingPage} />
      <SocialProof landingPage={landingPage} />
      <Footer config={config} />
    </main>
  )
}