import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { analyzeWebsite } from '@/lib/analyzer'
import { getCaseStudyTemplate, createGeneratedCaseStudy, getSiteConfiguration } from '@/lib/cosmic'
import { renderCaseStudy } from '@/lib/template-renderer'
import { sendCaseStudyEmail } from '@/lib/email'

const AnalysisRequestSchema = z.object({
  domain: z.string().min(1, 'Domain is required'),
  email: z.string().email('Valid email is required'),
  companyName: z.string().optional(),
  consent: z.boolean().refine(val => val === true, 'Consent is required')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request
    const validation = AnalysisRequestSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }
    
    const { domain, email, companyName, consent } = validation.data
    
    // Get configuration for timeout
    const config = await getSiteConfiguration()
    const timeoutSeconds = config?.metadata.analysis_timeout_seconds || 60
    
    // Run analysis with timeout
    const analysisPromise = analyzeWebsite(domain)
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Analysis timeout')), timeoutSeconds * 1000)
    )
    
    const analysis = await Promise.race([analysisPromise, timeoutPromise]) as any
    
    // Get case study template
    const template = await getCaseStudyTemplate()
    if (!template) {
      return NextResponse.json(
        { error: 'Case study template not found' },
        { status: 500 }
      )
    }
    
    // Render case study HTML
    const generatedHTML = renderCaseStudy(template, analysis, domain, companyName)
    
    // Save to Cosmic
    const caseStudy = await createGeneratedCaseStudy({
      email,
      domain,
      companyName,
      score: analysis.overallScore,
      detectedCMS: analysis.detectedCMS,
      diagnosticData: analysis.diagnosticData,
      improvementAreas: analysis.painPoints,
      generatedHTML,
      consent
    })
    
    // Send email with results
    const caseStudyUrl = `${request.nextUrl.origin}/case-study/${caseStudy.id}`
    await sendCaseStudyEmail({
      email,
      domain,
      score: analysis.overallScore,
      improvementPercentage: analysis.improvementPercentage,
      caseStudyUrl
    })
    
    return NextResponse.json({
      success: true,
      caseStudyId: caseStudy.id,
      analysis: {
        overallScore: analysis.overallScore,
        improvementPercentage: analysis.improvementPercentage,
        categoryScores: analysis.categoryScores,
        detectedCMS: analysis.detectedCMS
      }
    })
  } catch (error) {
    console.error('Analysis error:', error)
    
    if (error instanceof Error && error.message === 'Analysis timeout') {
      return NextResponse.json(
        { error: 'Analysis is taking longer than expected. Please try again.' },
        { status: 408 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to analyze website. Please check the domain and try again.' },
      { status: 500 }
    )
  }
}