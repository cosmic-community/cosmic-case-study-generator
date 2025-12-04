import { AnalysisResult } from '@/types'
import * as cheerio from 'cheerio'

// Simulate website analysis (in production, this would use Puppeteer/Lighthouse)
export async function analyzeWebsite(domain: string): Promise<AnalysisResult> {
  // Normalize domain
  const normalizedDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')
  
  try {
    // Fetch the website HTML
    const response = await fetch(`https://${normalizedDomain}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CosmicAnalyzer/1.0)'
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch website')
    }
    
    const html = await response.text()
    const $ = cheerio.load(html)
    
    // Detect CMS
    const detectedCMS = detectCMS(html, $)
    
    // Analyze various aspects
    const performanceScore = analyzePerformance(html, $)
    const seoScore = analyzeSEO($)
    const contentManagementScore = analyzeContentManagement($, detectedCMS)
    const developerExperienceScore = analyzeDeveloperExperience(html)
    const securityScore = analyzeSecurityHeaders(response.headers)
    const scalabilityScore = analyzeScalability(html)
    
    // Calculate overall score with weights
    const weights = {
      performance: 0.3,
      content_management: 0.25,
      developer_experience: 0.2,
      seo: 0.15,
      security: 0.05,
      scalability: 0.05
    }
    
    const overallScore = Math.round(
      performanceScore * weights.performance +
      contentManagementScore * weights.content_management +
      developerExperienceScore * weights.developer_experience +
      seoScore * weights.seo +
      securityScore * weights.security +
      scalabilityScore * weights.scalability
    )
    
    // Calculate improvement percentage (what Cosmic could improve)
    const improvementPercentage = Math.round((100 - overallScore) * 0.6) // Conservative estimate
    
    // Generate pain points based on scores
    const painPoints: string[] = []
    if (performanceScore < 70) painPoints.push('Slow page load times affecting user experience')
    if (seoScore < 70) painPoints.push('SEO optimization opportunities for better rankings')
    if (contentManagementScore < 70) painPoints.push('Content management workflow inefficiencies')
    if (developerExperienceScore < 70) painPoints.push('Complex development setup and maintenance')
    if (securityScore < 70) painPoints.push('Security headers and best practices gaps')
    
    // Generate recommendations
    const recommendations: string[] = [
      'Migrate to Cosmic for API-first content delivery',
      'Implement global CDN for faster content distribution',
      'Utilize headless architecture for better performance',
      'Leverage modern framework integration capabilities',
      'Automate content workflows with Cosmic\'s intuitive dashboard'
    ]
    
    return {
      domain: normalizedDomain,
      overallScore,
      detectedCMS,
      improvementPercentage,
      categoryScores: {
        performance: performanceScore,
        contentManagement: contentManagementScore,
        developerExperience: developerExperienceScore,
        seo: seoScore,
        security: securityScore,
        scalability: scalabilityScore
      },
      painPoints,
      recommendations,
      diagnosticData: {
        pageSize: html.length,
        hasMetaDescription: $('meta[name="description"]').length > 0,
        hasStructuredData: $('script[type="application/ld+json"]').length > 0,
        imageCount: $('img').length,
        scriptCount: $('script').length,
        detectedCMS
      }
    }
  } catch (error) {
    console.error('Analysis error:', error)
    throw new Error('Failed to analyze website')
  }
}

// CMS Detection
function detectCMS(html: string, $: cheerio.CheerioAPI): string {
  const indicators = {
    'WordPress': [/wp-content/, /wp-includes/, /<meta name="generator" content="WordPress/],
    'Drupal': [/sites\/default/, /<meta name="generator" content="Drupal/],
    'Shopify': [/cdn\.shopify\.com/, /Shopify\.theme/],
    'Wix': [/wix\.com/, /static\.parastorage\.com/],
    'Squarespace': [/squarespace/i],
    'Webflow': [/webflow/i],
    'Ghost': [/ghost/i, /<meta name="generator" content="Ghost/],
    'Contentful': [/contentful/i],
  }
  
  for (const [cms, patterns] of Object.entries(indicators)) {
    if (patterns.some(pattern => pattern.test(html))) {
      return cms
    }
  }
  
  return 'Unknown CMS'
}

// Performance Analysis
function analyzePerformance(html: string, $: cheerio.CheerioAPI): number {
  let score = 100
  
  // Page size penalty
  const pageSizeKB = html.length / 1024
  if (pageSizeKB > 1000) score -= 20
  else if (pageSizeKB > 500) score -= 10
  
  // Script count penalty
  const scriptCount = $('script').length
  if (scriptCount > 20) score -= 15
  else if (scriptCount > 10) score -= 8
  
  // Image optimization
  const images = $('img')
  let unoptimizedImages = 0
  images.each((_, img) => {
    const src = $(img).attr('src') || ''
    if (!src.includes('cdn') && !src.includes('optimized')) {
      unoptimizedImages++
    }
  })
  if (unoptimizedImages > images.length * 0.5) score -= 15
  
  return Math.max(0, score)
}

// SEO Analysis
function analyzeSEO($: cheerio.CheerioAPI): number {
  let score = 100
  
  if (!$('title').length) score -= 20
  if (!$('meta[name="description"]').length) score -= 15
  if (!$('meta[property="og:title"]').length) score -= 10
  if (!$('h1').length) score -= 10
  if ($('script[type="application/ld+json"]').length === 0) score -= 15
  
  // Check for proper heading hierarchy
  const h1Count = $('h1').length
  if (h1Count === 0 || h1Count > 1) score -= 10
  
  return Math.max(0, score)
}

// Content Management Analysis
function analyzeContentManagement($: cheerio.CheerioAPI, cms: string): number {
  let score = 70 // Base score
  
  // Traditional CMS penalties
  if (cms === 'WordPress') score -= 15
  if (cms === 'Drupal') score -= 20
  if (cms === 'Unknown CMS') score -= 10
  
  // Modern headless CMS bonus
  if (cms === 'Contentful' || cms === 'Sanity') score += 10
  
  return Math.max(0, Math.min(100, score))
}

// Developer Experience Analysis
function analyzeDeveloperExperience(html: string): number {
  let score = 70
  
  // Check for modern frameworks
  if (html.includes('next') || html.includes('_next')) score += 15
  if (html.includes('react')) score += 10
  if (html.includes('vue') || html.includes('nuxt')) score += 10
  
  // Inline styles penalty
  const inlineStyleCount = (html.match(/style="/g) || []).length
  if (inlineStyleCount > 50) score -= 15
  
  return Math.max(0, Math.min(100, score))
}

// Security Analysis
function analyzeSecurityHeaders(headers: Headers): number {
  let score = 100
  
  if (!headers.get('strict-transport-security')) score -= 20
  if (!headers.get('x-content-type-options')) score -= 15
  if (!headers.get('x-frame-options')) score -= 15
  if (!headers.get('content-security-policy')) score -= 20
  
  return Math.max(0, score)
}

// Scalability Analysis
function analyzeScalability(html: string): number {
  let score = 75
  
  // Check for CDN usage
  if (html.includes('cdn.') || html.includes('cloudfront') || html.includes('cloudflare')) {
    score += 15
  }
  
  // Check for API patterns
  if (html.includes('/api/') || html.includes('graphql')) {
    score += 10
  }
  
  return Math.max(0, Math.min(100, score))
}