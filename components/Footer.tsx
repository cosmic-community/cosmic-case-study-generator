import { SiteConfiguration } from '@/types'

interface FooterProps {
  config: SiteConfiguration | null
}

export default function Footer({ config }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Cosmic</h3>
            <p className="text-white/80">
              The headless CMS built for modern development workflows.
              Fast, flexible, and developer-friendly.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.cosmicjs.com/docs"
                  className="text-white/80 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://app.cosmicjs.com/signup"
                  className="text-white/80 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Free Trial
                </a>
              </li>
              {config?.metadata.demo_booking_url && (
                <li>
                  <a
                    href={config.metadata.demo_booking_url}
                    className="text-white/80 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule Demo
                  </a>
                </li>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            {config?.metadata.contact_email && (
              <p className="text-white/80 mb-2">
                Email: {config.metadata.contact_email}
              </p>
            )}
            {config?.metadata.support_email && (
              <p className="text-white/80">
                Support: {config.metadata.support_email}
              </p>
            )}
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {config?.metadata.terms_of_service_url && (
              <a
                href={config.metadata.terms_of_service_url}
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>
            )}
            {config?.metadata.privacy_policy_url && (
              <a
                href={config.metadata.privacy_policy_url}
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            )}
          </div>
          <p>© {currentYear} Cosmic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}