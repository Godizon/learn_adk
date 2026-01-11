import React, { useState, useEffect } from 'react';
import { syllabusData, getEncyclopediaEntry } from './services/contentService';
import { NavigationState, EncyclopediaEntry, ContentType } from './types';
import MarkdownRenderer from './components/MarkdownRenderer';
import EncyclopediaPanel from './components/EncyclopediaPanel';
import CodePlayground from './components/CodePlayground';
import Notebook from './components/Notebook';
import Quiz from './components/Quiz';

const App: React.FC = () => {
  // State
  const [activeNav, setActiveNav] = useState<NavigationState>({
    phaseId: syllabusData[0].id,
    weekId: syllabusData[0].weeks[0].id,
    lessonId: syllabusData[0].weeks[0].lessons[0].id
  });

  const [activeEncyclopediaEntry, setActiveEncyclopediaEntry] = useState<EncyclopediaEntry | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Derived State: Current Content
  const currentPhase = syllabusData.find(p => p.id === activeNav.phaseId);
  const currentWeek = currentPhase?.weeks.find(w => w.id === activeNav.weekId);
  const currentLesson = currentWeek?.lessons.find(l => l.id === activeNav.lessonId);

  // Handlers
  const handleTermClick = (term: string) => {
    const entry = getEncyclopediaEntry(term);
    if (entry) {
      setActiveEncyclopediaEntry(entry);
    } else {
        // Fallback for missing entries during dev
        setActiveEncyclopediaEntry({
            id: 'missing',
            term: term,
            category: 'Unindexed',
            summary: `This term "${term}" hasn't been added to the local knowledge graph yet.`,
            adkContext: 'TODO',
            pythonInternals: 'TODO',
            relatedTerms: []
        });
    }
  };

  const handleNavigate = (lessonId: string) => {
    // Find the phase and week for this lesson
    for (const phase of syllabusData) {
        for (const week of phase.weeks) {
            if (week.lessons.find(l => l.id === lessonId)) {
                setActiveNav({ phaseId: phase.id, weekId: week.id, lessonId });
                return;
            }
        }
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900">
      
      {/* Mobile Sidebar Toggle */}
      <button 
        className="lg:hidden fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-xl z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:relative z-30 w-72 h-full bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <i className="fa-solid fa-layer-group text-indigo-400"></i>
            ADK Hub
          </h1>
          <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest font-semibold">Learning Platform</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {syllabusData.map(phase => (
            <div key={phase.id}>
              <h3 className="text-xs font-bold text-slate-500 uppercase mb-3 pl-2">{phase.title}</h3>
              <div className="space-y-4">
                {phase.weeks.map(week => (
                  <div key={week.id} className="pl-2 border-l-2 border-slate-700">
                    <div className="text-sm font-semibold text-slate-200 mb-2 pl-2">{week.title}</div>
                    <ul className="space-y-1">
                      {week.lessons.map(lesson => (
                        <li key={lesson.id}>
                          <button
                            onClick={() => {
                                setActiveNav({ phaseId: phase.id, weekId: week.id, lessonId: lesson.id });
                                if (window.innerWidth < 1024) setIsSidebarOpen(false);
                            }}
                            className={`w-full text-left text-sm py-1.5 px-3 rounded transition-colors flex items-center gap-2 ${
                              activeNav.lessonId === lesson.id 
                                ? 'bg-indigo-600 text-white font-medium shadow-md' 
                                : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <i className={`text-[10px] fa-solid ${activeNav.lessonId === lesson.id ? 'fa-circle' : 'fa-circle-notch'}`}></i>
                            {lesson.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-600 text-center">
            v1.0.0 &bull; Local Environment
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm shrink-0">
            <div>
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-0.5">
                    {currentPhase?.title} / {currentWeek?.title}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{currentLesson?.title}</h2>
            </div>
            <div className="flex items-center gap-4">
                <button className="text-slate-400 hover:text-indigo-600 transition-colors" title="Search (Coming Soon)">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs border border-indigo-200">
                    US
                </div>
            </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
            {currentLesson?.content?.map((block, idx) => (
                <div key={idx} className="mb-8 animate-fadeIn">
                    {block.type === ContentType.MARKDOWN && block.markdown && (
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <MarkdownRenderer 
                                content={block.markdown} 
                                onTermClick={handleTermClick} 
                            />
                        </div>
                    )}
                    {block.type === ContentType.CODE_PLAYGROUND && block.codeProject && (
                        <div className="mt-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <i className="fa-solid fa-code text-indigo-500"></i>
                                Interactive Lab: {block.codeProject.id}
                            </h3>
                            <CodePlayground project={block.codeProject} onNavigate={handleNavigate} />
                        </div>
                    )}
                    {block.type === ContentType.NOTEBOOK && block.notebook && (
                        <div className="mt-6">
                             <Notebook notebook={block.notebook} onTermClick={handleTermClick} />
                        </div>
                    )}
                    {block.type === ContentType.QUIZ && block.quiz && (
                        <div className="mt-6">
                             <Quiz quiz={block.quiz} onNavigate={handleNavigate} />
                        </div>
                    )}
                </div>
            ))}

            {/* Empty State / Coming Soon */}
            {(!currentLesson?.content || currentLesson.content.length === 0) && (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                    <i className="fa-solid fa-hammer text-4xl mb-4 opacity-50"></i>
                    <p>Content for this lesson is under development.</p>
                </div>
            )}
            
            <div className="h-16"></div> {/* Bottom spacer */}
        </div>
      </main>

      {/* Encyclopedia "Deep Dive" Panel */}
      <EncyclopediaPanel 
        entry={activeEncyclopediaEntry} 
        isOpen={!!activeEncyclopediaEntry} 
        onClose={() => setActiveEncyclopediaEntry(null)} 
      />

    </div>
  );
};

export default App;