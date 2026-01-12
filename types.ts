export enum ContentType {
  MARKDOWN = 'MARKDOWN',
  CODE_PLAYGROUND = 'CODE_PLAYGROUND',
  NOTEBOOK = 'NOTEBOOK',
  SPLIT_VIEW = 'SPLIT_VIEW',
  QUIZ = 'QUIZ'
}

export interface Hint {
  text: string;
  relearnLessonId?: string;
}

export interface CodeProject {
  id: string;
  initialCode: string;
  solutionCode?: string;
  hints: Hint[];
  language: 'python' | 'javascript' | 'typescript';
  description?: string;
  expectedOutput?: string;
  validationType?: 'exact' | 'contains';
}

export interface NotebookCell {
  id: string;
  type: 'markdown' | 'code';
  content: string;
  output?: string;
}

export interface NotebookData {
  id: string;
  title: string;
  description?: string;
  cells: NotebookCell[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
  hint?: Hint;
  optionExplanations?: {
    text: string;
    relearnLessonId?: string;
  }[];
}

export interface QuizData {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface LessonContent {
  type: ContentType;
  markdown?: string;
  codeProject?: CodeProject;
  notebook?: NotebookData;
  quiz?: QuizData;
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
  analogy?: string;
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