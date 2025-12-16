import { CVData, ExperienceItem, EducationItem, SkillItem, TemplateType, ColorTheme } from './types';

export const INITIAL_CV_DATA: CVData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  photo: undefined,
  summary: '',
  experience: [],
  education: [],
  skills: [],
  customSections: [],
};

export const MOCK_CV_DATA: CVData = {
  fullName: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '(555) 123-4567',
  location: 'San Francisco, CA',
  website: 'linkedin.com/in/alexj',
  photo: undefined,
  summary: 'Senior professional with over 8 years of experience in the industry, demonstrating a proven track record of delivering high-quality results and driving business growth through strategic innovation. Expert in leading cross-functional teams to achieve critical project milestones under tight deadlines.',
  experience: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      role: 'Senior Project Manager',
      startDate: '2020-01',
      endDate: 'Present',
      description: '• Spearheaded a cross-functional team of 15+ members to deliver a flagship product launch, resulting in a 25% increase in Q3 revenue.\n• Implemented agile methodologies that reduced project delivery time by 30% while maintaining 99% defect-free deployments.\n• Negotiated with key stakeholders to secure a $500k budget increase for R&D initiatives.\n• Mentored junior analysts and developers, fostering a culture of continuous learning.',
    },
    {
      id: '2',
      company: 'Global Innovations Corp',
      role: 'Business Analyst',
      startDate: '2017-06',
      endDate: '2019-12',
      description: '• Analyzed complex datasets to identify market trends, providing actionable insights that influenced C-level strategic decisions.\n• Collaborated with product design teams to refine user requirements, improving customer satisfaction scores by 15%.\n• Automated reporting processes using Python and SQL, saving the department approximately 20 hours of manual work per week.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Master of Business Administration',
      startDate: '2019-09',
      endDate: '2021-05',
    },
    {
      id: '2',
      institution: 'University of State',
      degree: 'B.S. Computer Science',
      startDate: '2015-09',
      endDate: '2019-05',
    },
  ],
  skills: [
    { id: '1', name: 'Strategic Planning', level: 'Expert' },
    { id: '2', name: 'Data Analysis & SQL', level: 'Expert' },
    { id: '3', name: 'Agile & Scrum', level: 'Expert' },
    { id: '4', name: 'Stakeholder Management', level: 'Intermediate' },
    { id: '5', name: 'Python Automation', level: 'Intermediate' },
    { id: '6', name: 'Public Speaking', level: 'Expert' },
  ],
  customSections: [],
};

// Polished, modern color palettes
export const THEME_COLORS: Record<ColorTheme, { primary: string; secondary: string; accent: string; text: string; border: string; highlight: string; softBg: string }> = {
  [ColorTheme.BLUE]: {
    primary: 'bg-slate-900', 
    secondary: 'bg-slate-100',
    accent: 'text-blue-700',
    text: 'text-slate-900',
    border: 'border-slate-800',
    highlight: 'bg-slate-200',
    softBg: 'bg-blue-50/50',
  },
  [ColorTheme.PURPLE]: {
    primary: 'bg-purple-900',
    secondary: 'bg-purple-50',
    accent: 'text-purple-800',
    text: 'text-slate-900',
    border: 'border-purple-800',
    highlight: 'bg-purple-100',
    softBg: 'bg-purple-50/50',
  },
  [ColorTheme.GREEN]: {
    primary: 'bg-emerald-900',
    secondary: 'bg-emerald-50',
    accent: 'text-emerald-800',
    text: 'text-slate-900',
    border: 'border-emerald-800',
    highlight: 'bg-emerald-100',
    softBg: 'bg-emerald-50/50',
  },
  [ColorTheme.RED]: {
    primary: 'bg-red-900',
    secondary: 'bg-red-50',
    accent: 'text-red-800',
    text: 'text-slate-900',
    border: 'border-red-800',
    highlight: 'bg-red-100',
    softBg: 'bg-red-50/50',
  },
  [ColorTheme.SLATE]: {
    primary: 'bg-neutral-900',
    secondary: 'bg-neutral-100',
    accent: 'text-neutral-700',
    text: 'text-neutral-900',
    border: 'border-neutral-800',
    highlight: 'bg-neutral-200',
    softBg: 'bg-slate-50/50',
  },
};

// Map keywords in job titles to themes
export const JOB_ROLE_THEMES: Record<string, ColorTheme> = {
  'engineer': ColorTheme.BLUE,
  'developer': ColorTheme.BLUE,
  'tech': ColorTheme.BLUE,
  'data': ColorTheme.BLUE,
  'designer': ColorTheme.PURPLE,
  'artist': ColorTheme.PURPLE,
  'creative': ColorTheme.PURPLE,
  'product': ColorTheme.PURPLE,
  'manager': ColorTheme.SLATE,
  'executive': ColorTheme.SLATE,
  'consultant': ColorTheme.SLATE,
  'finance': ColorTheme.GREEN,
  'accountant': ColorTheme.GREEN,
  'health': ColorTheme.GREEN,
  'sales': ColorTheme.RED,
  'marketing': ColorTheme.RED,
  'hr': ColorTheme.RED,
};

export const getThemeForRole = (role: string): ColorTheme => {
  const lowerRole = role.toLowerCase();
  for (const [key, theme] of Object.entries(JOB_ROLE_THEMES)) {
    if (lowerRole.includes(key)) return theme;
  }
  return ColorTheme.SLATE; // Default
};