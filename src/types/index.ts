export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  about: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  contact: Contact;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
}

export interface Contact {
  email: string;
  phone?: string;
  location?: string;
  linkedIn?: string;
  github?: string;
  website?: string;
}

export interface TemplateOption {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
  salary?: string;
  postedDate: string;
  deadline?: string;
  compatibility?: number;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'technical' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
  expectedTopics?: string[];
}

export interface InterviewFeedback {
  confidenceScore: number;
  clarity: number;
  relevance: number;
  strengths: string[];
  improvements: string[];
  suggestedAnswer?: string;
  technicalAccuracy?: number;
  communicationScore?: number;
  missingConcepts?: string[];
  codeQuality?: number;
  systemDesign?: number;
}

export interface SkillGap {
  skill: string;
  importance: number;
  resources: LearningResource[];
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'course' | 'article' | 'video' | 'book';
  link: string;
  duration?: string;
}