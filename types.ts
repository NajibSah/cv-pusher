export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Expert'; // Optional usage in templates
}

export interface CustomSectionItem {
  id: string;
  title: string;
  content: string; // HTML or Markdown text
}

export interface CVData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  photo?: string; // Base64 or URL
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  customSections: CustomSectionItem[];
}

export enum TemplateType {
  MINIMALIST = 'minimalist',
  CREATIVE = 'creative',
  EXECUTIVE = 'executive',
  MODERN = 'modern',
  BOLD = 'bold',
  TECHNICAL = 'technical',
}

export enum ColorTheme {
  BLUE = 'blue',
  PURPLE = 'purple',
  GREEN = 'green',
  RED = 'red',
  SLATE = 'slate',
}

export interface JobRoleConfig {
  role: string;
  theme: ColorTheme;
}