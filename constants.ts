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
};

export const MOCK_CV_DATA: CVData = {
  fullName: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '(555) 123-4567',
  location: 'San Francisco, CA',
  website: 'linkedin.com/in/alexj',
  photo: undefined,
  summary: 'Dedicated professional with over 5 years of experience in the industry. Proven track record of delivering high-quality results and driving business growth. Passionate about innovation and continuous improvement.',
  experience: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      role: 'Senior Analyst',
      startDate: '2020-01',
      endDate: 'Present',
      description: '• Led a team of 5 analysts to deliver critical project milestones.\n• Optimized data processing workflows, reducing time by 30%.\n• Collaborated with cross-functional teams to define product requirements.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of State',
      degree: 'B.S. Computer Science',
      startDate: '2015-09',
      endDate: '2019-05',
    },
  ],
  skills: [
    { id: '1', name: 'Project Management', level: 'Expert' },
    { id: '2', name: 'Data Analysis', level: 'Expert' },
    { id: '3', name: 'Leadership', level: 'Intermediate' },
  ],
};

// Polished, modern color palettes
export const THEME_COLORS: Record<ColorTheme, { primary: string; secondary: string; accent: string; text: string; border: string; highlight: string }> = {
  [ColorTheme.BLUE]: {
    primary: 'bg-slate-900', 
    secondary: 'bg-slate-100',
    accent: 'text-blue-700',
    text: 'text-slate-900',
    border: 'border-slate-800',
    highlight: 'bg-slate-200',
  },
  [ColorTheme.PURPLE]: {
    primary: 'bg-purple-900',
    secondary: 'bg-purple-50',
    accent: 'text-purple-800',
    text: 'text-slate-900',
    border: 'border-purple-800',
    highlight: 'bg-purple-100',
  },
  [ColorTheme.GREEN]: {
    primary: 'bg-emerald-900',
    secondary: 'bg-emerald-50',
    accent: 'text-emerald-800',
    text: 'text-slate-900',
    border: 'border-emerald-800',
    highlight: 'bg-emerald-100',
  },
  [ColorTheme.RED]: {
    primary: 'bg-red-900',
    secondary: 'bg-red-50',
    accent: 'text-red-800',
    text: 'text-slate-900',
    border: 'border-red-800',
    highlight: 'bg-red-100',
  },
  [ColorTheme.SLATE]: {
    primary: 'bg-neutral-900',
    secondary: 'bg-neutral-100',
    accent: 'text-neutral-700',
    text: 'text-neutral-900',
    border: 'border-neutral-800',
    highlight: 'bg-neutral-200',
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