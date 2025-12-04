import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch landing page content
export async function getLandingPage() {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'landing-page',
        slug: 'case-study-generator-landing-page'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch landing page')
  }
}

// Fetch all analysis criteria
export async function getAnalysisCriteria() {
  try {
    const response = await cosmic.objects
      .find({ type: 'analysis-criteria' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    // Sort by display_order
    return response.objects.sort((a: any, b: any) => 
      (a.metadata?.display_order || 0) - (b.metadata?.display_order || 0)
    )
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch analysis criteria')
  }
}

// Fetch case study template
export async function getCaseStudyTemplate() {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'case-study-template',
        slug: 'default-case-study-template'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch case study template')
  }
}

// Fetch site configuration
export async function getSiteConfiguration() {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'site-configuration',
        slug: 'site-configuration'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch site configuration')
  }
}

// Fetch email template by type
export async function getEmailTemplate(emailType: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'email-templates',
        'metadata.email_type.key': emailType
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch email template')
  }
}

// Create generated case study
export async function createGeneratedCaseStudy(data: {
  email: string;
  domain: string;
  companyName?: string;
  score: number;
  detectedCMS?: string;
  diagnosticData: Record<string, any>;
  improvementAreas: string[];
  generatedHTML: string;
  consent: boolean;
}) {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'generated-case-studies',
      title: `Case Study - ${data.domain}`,
      metadata: {
        user_email: data.email,
        company_name: data.companyName || '',
        website_domain: data.domain,
        scan_date: new Date().toISOString(),
        diagnostic_data: data.diagnosticData,
        overall_score: data.score,
        detected_cms: data.detectedCMS || '',
        improvement_areas: data.improvementAreas,
        generated_content_html: data.generatedHTML,
        status: 'generated',
        user_consent: data.consent,
        notes: ''
      }
    })
    
    return response.object
  } catch (error) {
    console.error('Error creating case study:', error)
    throw new Error('Failed to create case study')
  }
}

// Update case study status
export async function updateCaseStudyStatus(id: string, status: string) {
  try {
    await cosmic.objects.updateOne(id, {
      metadata: {
        status: status
      }
    })
  } catch (error) {
    console.error('Error updating case study status:', error)
    throw new Error('Failed to update case study status')
  }
}