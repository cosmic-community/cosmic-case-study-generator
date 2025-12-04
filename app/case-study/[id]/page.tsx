// app/case-study/[id]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import DownloadButton from '@/components/DownloadButton'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getCaseStudy(id: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'generated-case-studies',
        id: id
      })
      .props(['id', 'title', 'metadata'])
      .depth(0)
    
    return response.object
  } catch (error) {
    return null
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params
  const caseStudy = await getCaseStudy(id)
  
  if (!caseStudy) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-secondary">
                Your Website Analysis Results
              </h1>
              <p className="text-gray-600 mt-1">
                {caseStudy.metadata.website_domain}
              </p>
            </div>
            <DownloadButton caseStudyId={caseStudy.id} />
          </div>
        </div>
      </header>
      
      <div className="container py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div
            dangerouslySetInnerHTML={{ __html: caseStudy.metadata.generated_content_html }}
          />
        </div>
      </div>
      
      <footer className="bg-secondary text-white py-8 mt-12">
        <div className="container text-center">
          <p className="mb-4">Ready to transform your website?</p>
          <a
            href="https://app.cosmicjs.com/signup"
            className="btn-primary inline-block"
          >
            Start Free Trial
          </a>
        </div>
      </footer>
    </div>
  )
}