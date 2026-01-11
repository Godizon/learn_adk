export enum ContentType {
  MARKDOWN = 'MARKDOWN',
  CODE_PLAYGROUND = 'CODE_PLAYGROUND',
  SPLIT_VIEW = 'SPLIT_VIEW'
}

export interface CodeProject {
  id: string;
  initialCode: string;
  solutionCode?: string;
  hints: string[];
  language: 'python' | 'javascript' | 'typescript';
  description?: string;
}

export interface LessonContent {
  type: ContentType;
  markdown?: string;
  codeProject?: CodeProject;
}

export interface Lesson {
  id: string;
  title: string;
  duration?: string;
  content: LessonContent[];
}

export interface Week {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CoursePhase {
  id: string;
  title: string;
  weeks: Week[];
}

// The "Deep Dive" Encyclopedia Structure
export interface EncyclopediaEntry {
  id: string;
  term: string;
  category: string; // e.g., "Core Python", "ADK Architecture"
  summary: string;
  
  // The comprehensive sections requested
  adkContext: string; // Relevance to ADK
  pythonInternals: string; // Underlying code/mechanics
  crossLanguage?: string; // How other languages handle it
  history?: string; // Etymology/History
  
  relatedTerms: string[];
}

export type NavigationState = {
  phaseId: string;
  weekId: string;
  lessonId: string;
};