import { LandingPage } from '@/types'

interface HeroSectionProps {
  landingPage: LandingPage
}

export default function HeroSection({ landingPage }: HeroSectionProps) {
  const { metadata } = landingPage
  
  return (
    <section className="relative bg-gradient-to-br from-primary via-accent to-secondary text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container relative py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            {metadata.hero_headline}
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-white/90 animate-slide-up">
            {metadata.hero_subheadline}
          </p>
          
          {metadata.hero_image && (
            <div className="mt-12 rounded-lg overflow-hidden shadow-2xl animate-slide-up">
              <img
                src={`${metadata.hero_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
                alt="Website Analysis Dashboard"
                width={600}
                height={200}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="rgb(249, 250, 251)"
          />
        </svg>
      </div>
    </section>
  )
}