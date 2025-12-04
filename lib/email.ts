import { Resend } from 'resend'
import { getEmailTemplate, getSiteConfiguration } from './cosmic'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendCaseStudyEmail(data: {
  email: string;
  domain: string;
  score: number;
  improvementPercentage: number;
  caseStudyUrl: string;
}) {
  try {
    const config = await getSiteConfiguration()
    const template = await getEmailTemplate('immediate_delivery')
    
    if (!template || !template.metadata.active) {
      console.log('Email template not active or not found')
      return
    }
    
    // Replace variables in template
    const subjectLine = template.metadata.subject_line
      .replace('{domain_name}', data.domain)
      .replace('{score}', data.score.toString())
    
    const emailBody = template.metadata.email_body_html
      .replace(/{domain_name}/g, data.domain)
      .replace(/{score}/g, data.score.toString())
      .replace(/{improvement_percentage}/g, data.improvementPercentage.toString())
      .replace(/{case_study_url}/g, data.caseStudyUrl)
      .replace(/{demo_booking_url}/g, config?.metadata.demo_booking_url || 'https://cosmicjs.com/schedule-demo')
    
    await resend.emails.send({
      from: 'Cosmic Case Study <noreply@cosmicjs.com>',
      to: data.email,
      subject: subjectLine,
      html: emailBody,
    })
    
    console.log('Case study email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
    // Don't throw - email failure shouldn't break the flow
  }
}

export async function scheduleFollowUpEmails(caseStudyId: string, email: string, domain: string) {
  // In production, this would queue emails using a service like Inngest or QStash
  // For now, we'll just log the intent
  console.log(`Follow-up emails scheduled for case study ${caseStudyId}`)
  
  // Would schedule:
  // - Day 3 follow-up
  // - Day 7 demo request
  // - Day 14 success story
}