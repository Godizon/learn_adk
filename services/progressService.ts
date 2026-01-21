import { adksyllabusData } from './adkContentService';
const syllabusData = adksyllabusData;
const STORAGE_KEY = 'adk_course_progress';

export interface UserProgress {
  completedLessons: string[];
  completedProjects: string[];
}

export const getProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { completedLessons: [], completedProjects: [] };
    return JSON.parse(stored);
  } catch (e) {
    return { completedLessons: [], completedProjects: [] };
  }
};

export const saveProgress = (progress: UserProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const markProjectComplete = (projectId: string) => {
  const progress = getProgress();
  if (!progress.completedProjects.includes(projectId)) {
    progress.completedProjects.push(projectId);
    saveProgress(progress);
  }
};

export const markLessonComplete = (lessonId: string) => {
  const progress = getProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    saveProgress(progress);
  }
};

export const isProjectComplete = (projectId: string) => {
  return getProgress().completedProjects.includes(projectId);
};
