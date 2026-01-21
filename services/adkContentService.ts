import { CoursePhase, Week, Lesson } from '../types';

//--Load modules dynamically
const weekModules = import.meta.glob('../adk_week_modules/*.ts', {
  eager: true
});
//--create an array of weeks
const allWeeks: Week[] = Object.values(weekModules).map(
  (mod: any) => mod.default
);


// --- Course Syllabus Data ---
export const adksyllabusData: CoursePhase[] = [
  {
    id: 'phase-1',
    title: 'Phase 1: ADK Fundamentals',
    weeks: allWeeks.filter(w => w.phaseid === 'phase-1')
  },
  {
    id: 'phase-2',
    title: 'Phase 2: Core Components',
    weeks: allWeeks.filter(w => w.phaseid === 'phase-2')
  },
  {
    id: 'phase-3',
    title: 'Phase 3: Advanced Patterns',
    weeks: allWeeks.filter(w => w.phaseid === 'phase-3')
  },
  {
    id: 'phase-4',
    title: 'Phase 4: TO DO',
    weeks: allWeeks.filter(w => w.phaseid === 'phase-4')
  },
  {
    id: 'phase-5',
    title: 'Phase 3: TO DO',
    weeks: allWeeks.filter(w => w.phaseid === 'phase-5')
  }
];
const syllabusData = adksyllabusData;
export const getLessonByProjectId = (projectId: string): Lesson | undefined => {
  for (const phase of syllabusData) {
    for (const week of phase.weeks) {
      for (const lesson of week.lessons) {
        if (lesson.content.some(c => c.codeProject?.id === projectId)) {
          return lesson;
        }
      }
    }
  }
  return undefined;
};

export const getNextLesson = (currentLessonId: string): Lesson | undefined => {
  let found = false;
  for (const phase of syllabusData) {
    for (const week of phase.weeks) {
      for (const lesson of week.lessons) {
        if (found) return lesson;
        if (lesson.id === currentLessonId) found = true;
      }
    }
  }
  return undefined;
};