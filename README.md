# Cosmic Case Study Generator

![App Preview](https://imgix.cosmicjs.com/6729a850-d144-11f0-b693-79ceb5783a41-photo-1460925895917-afdab827c52f-1764875216563.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A sophisticated lead generation platform that creates personalized website performance case studies. Users enter their website domain, and the application performs a comprehensive analysis comparing their current setup against Cosmic's capabilities, generating a custom case study with actionable insights and improvement recommendations.

## ✨ Features

- **Real-time Website Analysis** - Scrapes and analyzes websites for performance, SEO, and content management efficiency
- **AI-Powered Case Study Generation** - Creates personalized reports using dynamic templates and variable substitution
- **Weighted Scoring System** - Configurable analysis criteria with customizable weights across 6 categories
- **Automated Email Marketing** - Multi-touch drip campaigns with immediate delivery, day 3, day 7, and day 14 follow-ups
- **PDF Export & Downloads** - Professional case study reports with branded design
- **Lead Management** - Track conversions, downloads, and engagement through Cosmic CMS
- **Content-Driven Configuration** - All messaging, templates, and settings managed through Cosmic
- **Responsive Design** - Beautiful, mobile-optimized interface with smooth animations

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=6931da3e2794e7afddb52972&clone_repository=6931dd4e2794e7afddb529a2)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I want to create a single page that is branded as a build your own case study website where users can enter in their website domain, and the cosmic ai scrapes their site, runs a diagnostic on it, and then compares it to what cosmic offers and how their site will be improved by using cosmic. It then writes up a mini case study for them. So essentially this is a lead magent that offers up a download, but the download is personal to everyone that uses it."

### Code Generation Prompt

> Based on the content model I created for "I want to create a single page that is branded as a build your own case study website where users can enter in their website domain, and the cosmic ai scrapes their site, runs a diagnostic on it, and then compares it to what cosmic offers and how their site will be improved by using cosmic. It then writes up a mini case study for them. So essentially this is a lead magent that offers up a download, but the download is personal to everyone that uses it.", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **Resend** - Email delivery service
- **Puppeteer** - Website scraping and analysis
- **React PDF** - PDF generation
- **Framer Motion** - Smooth animations (optional enhancement)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- Cosmic account with the case study content model
- Resend API key for email functionality (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cosmic-case-study-generator
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
RESEND_API_KEY=your-resend-api-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Cosmic SDK Examples

### Fetching Landing Page Content

```typescript
import { cosmic } from '@/lib/cosmic'

const { object: landingPage } = await cosmic.objects
  .findOne({
    type: 'landing-page',
    slug: 'case-study-generator-landing-page'
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Creating a Generated Case Study

```typescript
const caseStudy = await cosmic.objects.insertOne({
  type: 'generated-case-studies',
  title: `Case Study - ${domain}`,
  metadata: {
    user_email: email,
    website_domain: domain,
    scan_date: new Date().toISOString(),
    overall_score: calculatedScore,
    diagnostic_data: analysisResults,
    detected_cms: detectedCMS,
    improvement_areas: ['Performance', 'SEO', 'Content Management'],
    generated_content_html: renderedHTML,
    status: 'generated',
    user_consent: true
  }
})
```

### Fetching Analysis Criteria with Weights

```typescript
const { objects: criteria } = await cosmic.objects
  .find({ type: 'analysis-criteria' })
  .props(['id', 'title', 'metadata'])
  .depth(0)

// Sort by display_order and apply weights
const sortedCriteria = criteria.sort((a, b) => 
  (a.metadata?.display_order || 0) - (b.metadata?.display_order || 0)
)
```

### Sending Automated Emails

```typescript
// Fetch email template
const { object: emailTemplate } = await cosmic.objects
  .findOne({
    type: 'email-templates',
    'metadata.email_type.key': 'immediate_delivery'
  })
  .props(['id', 'title', 'metadata'])

// Replace variables and send
const renderedEmail = emailTemplate.metadata.email_body_html
  .replace('{domain_name}', domain)
  .replace('{score}', score.toString())
  .replace('{improvement_percentage}', improvementPercentage.toString())
```

## 🔧 Cosmic CMS Integration

This application uses a comprehensive content model with 7 object types:

1. **Landing Page** (Singleton)
   - Hero content, benefits, CTAs
   - Error messages and loading states
   - Form configuration

2. **Analysis Criteria**
   - Performance, SEO, Security, etc.
   - Weighted scoring algorithm
   - Cosmic benchmarks and advantages

3. **Case Study Template** (Singleton)
   - Introduction, challenge, solution sections
   - Variable-based content substitution
   - Score-based messaging variants

4. **Generated Case Studies**
   - Lead capture and tracking
   - Diagnostic data storage
   - Status progression (generated → emailed → downloaded → converted)

5. **Email Templates**
   - Multi-touch drip campaigns
   - Variable substitution
   - Active/inactive toggles

6. **Site Configuration** (Singleton)
   - Brand colors and styling
   - Analysis timeout settings
   - Email automation toggles
   - Scoring weights (JSON)

7. **Visual Assets**
   - Logos, icons, badges
   - Chart templates
   - Branded imagery

All content is dynamically loaded from Cosmic, making the entire application configurable without code changes.

## 📧 Email Automation Flow

The application includes a sophisticated email drip campaign:

1. **Immediate Delivery (Day 0)** - Case study delivery with results
2. **Day 3 Follow-up** - Check-in about results and questions
3. **Day 7 Demo Request** - Personalized demo invitation
4. **Day 14 Success Story** - Share customer success stories

All templates are managed in Cosmic with variable substitution support.

## 🎯 Lead Scoring Algorithm

The scoring system uses weighted criteria:
- Performance: 30%
- Content Management: 25%
- Developer Experience: 20%
- SEO: 15%
- Security: 5%
- Scalability: 5%

Weights are configurable through the Site Configuration object.

## 📊 PDF Generation

Generated case studies can be exported as professional PDF reports including:
- Executive summary with overall score
- Detailed analysis by category
- Side-by-side comparisons with Cosmic
- Actionable recommendations
- Next steps and CTAs

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
   - `RESEND_API_KEY`
4. Deploy

### Environment Variables

Set these in your hosting platform:

```env
COSMIC_BUCKET_SLUG=cosmic-case-study-production
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
RESEND_API_KEY=your-resend-api-key
```

## 📄 License

MIT License - feel free to use this for your own projects!

## 🤝 Support

For questions or issues, visit [Cosmic Docs](https://www.cosmicjs.com/docs) or contact support@cosmicjs.com.

<!-- README_END -->