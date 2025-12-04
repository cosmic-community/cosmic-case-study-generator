import { LandingPage } from '@/types'

interface BenefitsSectionProps {
  landingPage: LandingPage
}

export default function BenefitsSection({ landingPage }: BenefitsSectionProps) {
  const { metadata } = landingPage
  
  const benefits = [
    {
      icon: metadata.benefit_1_icon || '⚡',
      title: metadata.benefit_1_title || 'Performance Insights',
      description: metadata.benefit_1_description || 'Discover performance improvements'
    },
    {
      icon: metadata.benefit_2_icon || '💻',
      title: metadata.benefit_2_title || 'Developer Experience',
      description: metadata.benefit_2_description || 'See how Cosmic improves workflows'
    },
    {
      icon: metadata.benefit_3_icon || '📊',
      title: metadata.benefit_3_title || 'ROI Analysis',
      description: metadata.benefit_3_description || 'Understand potential cost savings'
    }
  ]
  
  return (
    <section className="py-16 bg-white">
      <div className="container">
        {metadata.benefits_section_title && (
          <h2 className="text-3xl font-bold text-center text-secondary mb-12">
            {metadata.benefits_section_title}
          </h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-secondary mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}