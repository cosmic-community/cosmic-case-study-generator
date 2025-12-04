import { AnalysisResult } from '@/types'

export function renderCaseStudy(
  template: any,
  analysis: AnalysisResult,
  domain: string,
  companyName?: string
): string {
  if (!template || !template.metadata) {
    throw new Error('Invalid template')
  }
  
  const scanDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  // Get score-specific messaging
  let scoreHeadline = ''
  let scoreMessage = ''
  
  if (analysis.overallScore >= 80) {
    scoreHeadline = template.metadata.score_excellent_headline || 'Excellent Performance'
    scoreMessage = template.metadata.score_excellent_message || ''
  } else if (analysis.overallScore >= 60) {
    scoreHeadline = template.metadata.score_good_headline || 'Good Foundation'
    scoreMessage = template.metadata.score_good_message || ''
  } else {
    scoreHeadline = template.metadata.score_needs_improvement_headline || 'Opportunities for Improvement'
    scoreMessage = template.metadata.score_needs_improvement_message || ''
  }
  
  // Prepare replacement values
  const replacements: Record<string, string> = {
    '{domain_name}': domain,
    '{company_name}': companyName || domain,
    '{scan_date}': scanDate,
    '{current_score}': analysis.overallScore.toString(),
    '{detected_cms}': analysis.detectedCMS || 'Unknown',
    '{improvement_percentage}': analysis.improvementPercentage.toString(),
    '{score_headline}': scoreHeadline,
    '{score_message}': scoreMessage,
    '{top_pain_points}': analysis.painPoints.map(p => `<li>${p}</li>`).join(''),
    '{metrics_improved}': Object.entries(analysis.categoryScores)
      .filter(([_, score]) => score < 80)
      .map(([key, _]) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
      .join(', ')
  }
  
  // Render sections
  let html = '<div class="case-study">'
  
  // Introduction
  html += replaceVariables(template.metadata.introduction_template, replacements)
  
  // Score section
  html += `
    <div class="score-section">
      <h2>${scoreHeadline}</h2>
      <div class="score-display">
        <div class="score-circle">${analysis.overallScore}/100</div>
      </div>
      <p>${scoreMessage}</p>
    </div>
  `
  
  // Challenge section
  html += `<h2>${template.metadata.challenge_section_header}</h2>`
  html += replaceVariables(template.metadata.challenge_section_template, replacements)
  
  // Category scores breakdown
  html += '<div class="category-scores">'
  Object.entries(analysis.categoryScores).forEach(([category, score]) => {
    const categoryName = category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    html += `
      <div class="category-score">
        <span class="category-name">${categoryName}</span>
        <div class="score-bar">
          <div class="score-fill" style="width: ${score}%"></div>
        </div>
        <span class="score-value">${score}/100</span>
      </div>
    `
  })
  html += '</div>'
  
  // Solution section
  html += `<h2>${template.metadata.solution_section_header}</h2>`
  html += replaceVariables(template.metadata.solution_section_template, replacements)
  
  // Results section
  html += `<h2>${template.metadata.results_section_header}</h2>`
  html += replaceVariables(template.metadata.results_section_template, replacements)
  
  // CTA section
  html += `<h2>${template.metadata.cta_section_header}</h2>`
  html += replaceVariables(template.metadata.cta_section_content, replacements)
  html += `
    <div class="cta-button-container">
      <a href="${template.metadata.cta_button_url}" class="cta-button">
        ${template.metadata.cta_button_text}
      </a>
    </div>
  `
  
  html += '</div>'
  
  return html
}

function replaceVariables(template: string, replacements: Record<string, string>): string {
  let result = template
  
  Object.entries(replacements).forEach(([key, value]) => {
    const regex = new RegExp(key.replace(/[{}]/g, '\\$&'), 'g')
    result = result.replace(regex, value)
  })
  
  return result
}