import { LandingPage } from '@/types'

interface SocialProofProps {
  landingPage: LandingPage
}

export default function SocialProof({ landingPage }: SocialProofProps) {
  const { metadata } = landingPage
  
  if (!metadata.social_proof_section) {
    return null
  }
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div
          className="max-w-4xl mx-auto"
          dangerouslySetInnerHTML={{ __html: metadata.social_proof_section }}
        />
      </div>
      
      <style jsx>{`
        :global(.stats) {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: center;
        }
        
        :global(.stat) {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        :global(.stat strong) {
          font-size: 2.5rem;
          font-weight: bold;
          color: #5851FF;
        }
        
        :global(.stat span) {
          color: #6B7280;
          font-size: 0.875rem;
        }
      `}</style>
    </section>
  )
}