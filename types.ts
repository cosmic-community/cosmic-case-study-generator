// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Landing Page
export interface LandingPage extends CosmicObject {
  type: 'landing-page';
  metadata: {
    hero_headline: string;
    hero_subheadline: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    form_cta_text: string;
    form_placeholder_text?: string;
    benefits_section_title?: string;
    benefit_1_icon?: string;
    benefit_1_title?: string;
    benefit_1_description?: string;
    benefit_2_icon?: string;
    benefit_2_title?: string;
    benefit_2_description?: string;
    benefit_3_icon?: string;
    benefit_3_title?: string;
    benefit_3_description?: string;
    social_proof_section?: string;
    privacy_notice: string;
    loading_message?: string;
    error_message_invalid_domain?: string;
    error_message_timeout?: string;
    error_message_general?: string;
  };
}

// Analysis Criteria
export interface AnalysisCriterion extends CosmicObject {
  type: 'analysis-criteria';
  metadata: {
    criterion_name: string;
    category: {
      key: string;
      value: string;
    };
    weight: number;
    description: string;
    cosmic_advantage: string;
    measurement_type: {
      key: string;
      value: string;
    };
    good_threshold?: number;
    excellent_threshold?: number;
    cosmic_benchmark_value: string;
    display_order?: number;
  };
}

// Case Study Template
export interface CaseStudyTemplate extends CosmicObject {
  type: 'case-study-template';
  metadata: {
    introduction_template: string;
    challenge_section_header: string;
    challenge_section_template: string;
    solution_section_header: string;
    solution_section_template: string;
    results_section_header: string;
    results_section_template: string;
    cta_section_header: string;
    cta_section_content: string;
    cta_button_text: string;
    cta_button_url: string;
    score_excellent_headline?: string;
    score_excellent_message?: string;
    score_good_headline?: string;
    score_good_message?: string;
    score_needs_improvement_headline?: string;
    score_needs_improvement_message?: string;
  };
}

// Generated Case Study
export interface GeneratedCaseStudy extends CosmicObject {
  type: 'generated-case-studies';
  metadata: {
    user_email: string;
    company_name?: string;
    website_domain: string;
    industry?: {
      key: string;
      value: string;
    };
    scan_date: string;
    diagnostic_data: Record<string, any>;
    overall_score: number;
    detected_cms?: string;
    improvement_areas?: string[];
    generated_content_html: string;
    pdf_url?: {
      url: string;
      imgix_url: string;
    };
    status: {
      key: string;
      value: string;
    };
    user_consent: boolean;
    utm_source?: string;
    utm_campaign?: string;
    notes?: string;
  };
}

// Email Template
export interface EmailTemplate extends CosmicObject {
  type: 'email-templates';
  metadata: {
    template_name: string;
    email_type: {
      key: string;
      value: string;
    };
    send_delay_days: number;
    subject_line: string;
    preview_text?: string;
    email_body_html: string;
    email_body_plain_text?: string;
    cta_button_text?: string;
    cta_button_url?: string;
    active: boolean;
  };
}

// Site Configuration
export interface SiteConfiguration extends CosmicObject {
  type: 'site-configuration';
  metadata: {
    site_title: string;
    primary_brand_color: string;
    secondary_brand_color?: string;
    analysis_timeout_seconds: number;
    minimum_score_for_download?: number;
    google_analytics_id?: string;
    contact_email: string;
    support_email?: string;
    demo_booking_url?: string;
    terms_of_service_url?: string;
    privacy_policy_url?: string;
    enable_email_automation: boolean;
    scoring_weights?: {
      performance: number;
      content_management: number;
      developer_experience: number;
      seo: number;
      security: number;
      scalability: number;
    };
  };
}

// Analysis Request Form
export interface AnalysisRequest {
  domain: string;
  email: string;
  companyName?: string;
  consent: boolean;
}

// Analysis Result
export interface AnalysisResult {
  domain: string;
  overallScore: number;
  detectedCMS?: string;
  improvementPercentage: number;
  categoryScores: {
    performance: number;
    contentManagement: number;
    developerExperience: number;
    seo: number;
    security: number;
    scalability: number;
  };
  painPoints: string[];
  recommendations: string[];
  diagnosticData: Record<string, any>;
}