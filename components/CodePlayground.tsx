import React, { useState, useRef, useEffect } from 'react';
import Confetti from 'react-confetti';
import { CodeProject } from '../types';
import { adksyllabusData, getLessonByProjectId, getNextLesson } from '../services/adkContentService';
import { markProjectComplete, markLessonComplete, getProgress } from '../services/progressService';
const syllabusData = adksyllabusData;
interface CodePlaygroundProps {
  project: CodeProject;
  onNavigate: (lessonId: string) => void;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({ project, onNavigate }) => {
  const [code, setCode] = useState(project.initialCode);
  const [output, setOutput] = useState<string | null>(null);
  // Hint state: how many hints are currently revealed. 0 means none.
  const [hintsRevealedCount, setHintsRevealedCount] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [nextLessonId, setNextLessonId] = useState<string | null>(null);
  const [lessonProgress, setLessonProgress] = useState<{completed: number, total: number} | null>(null);

  useEffect(() => {
    setCode(project.initialCode);
    setOutput(null);
    setHintsRevealedCount(0);
    setIsCorrect(null);
    setShowSolution(false);
    setShowConfetti(false);
    setNextLessonId(null);
    setIsRunning(false);
  }, [project.id, project.initialCode]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  // Initialize progress display
  useEffect(() => {
    const lesson = getLessonByProjectId(project.id);
    if (lesson) {
        const total = lesson.content.filter(c => c.codeProject).length;
        const completed = getProgress().completedProjects.filter(id => 
            lesson.content.some(c => c.codeProject?.id === id)
        ).length;
        setLessonProgress({ completed, total });
    }
  }, [project.id]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);
    setIsCorrect(null);

    try {
      const response = await fetch('/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      setOutput(data.output);

      // Validation Logic
      if (project.expectedOutput) {
        const cleanOutput = (data.output || "").trim();
        const cleanExpected = project.expectedOutput.trim();
        const passed = project.validationType === 'contains' 
            ? cleanOutput.includes(cleanExpected) 
            : cleanOutput === cleanExpected;
        setIsCorrect(passed);

        if (passed) {
            markProjectComplete(project.id);
            const lesson = getLessonByProjectId(project.id);
            
            if (lesson) {
                const allProjects = lesson.content.filter(c => c.codeProject).map(c => c.codeProject!.id);
                const currentProgress = getProgress();
                const isLessonDone = allProjects.every(id => currentProgress.completedProjects.includes(id));
                
                setLessonProgress({ completed: allProjects.filter(id => currentProgress.completedProjects.includes(id)).length, total: allProjects.length });

                if (isLessonDone) {
                    markLessonComplete(lesson.id);
                    setShowConfetti(true);
                    const next = getNextLesson(lesson.id);
                    if (next) setNextLessonId(next.id);
                    // Stop confetti after 8 seconds
                    setTimeout(() => setShowConfetti(false), 8000);
                }
            }
        }
      }
    } catch (error) {
      setOutput(">> Error: Could not connect to Python backend.\n>> Ensure server is running on port 8000.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the code? Your changes will be lost.")) {
      setCode(project.initialCode);
      setOutput(null);
      setHintsRevealedCount(0);
      setIsCorrect(null);
      setShowSolution(false);
      setShowConfetti(false);
      setNextLessonId(null);
    }
  };

  const handleExport = () => {
    const element = document.createElement("a");
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${project.id}.${project.language === 'python' ? 'py' : 'ts'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const showNextHint = () => {
      if (hintsRevealedCount < project.hints.length) {
          setHintsRevealedCount(prev => prev + 1);
      }
  };

  const handleRelearn = (lessonId: string) => {
      const exists = syllabusData.some(p => p.weeks.some(w => w.lessons.some(l => l.id === lessonId)));

      if (!exists) {
          alert("Content will be added soon.");
          return;
      }

      if (window.confirm("Navigate to review this topic? Your current code changes will be lost.")) {
          onNavigate(lessonId);
      }
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} />}
      {/* Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="ml-2 text-xs font-mono text-slate-500 font-semibold">{project.language === 'python' ? 'main.py' : 'app.ts'}</span>
            {lessonProgress && (
                <span className="ml-4 text-xs text-slate-400 font-medium">
                    Lesson Progress: {lessonProgress.completed}/{lessonProgress.total}
                </span>
            )}
        </div>
        <div className="flex gap-2">
            <button 
                onClick={handleReset}
                className="text-xs font-semibold text-slate-600 hover:text-red-600 px-3 py-1.5 rounded hover:bg-slate-200 transition-colors"
                title="Reset to initial code"
            >
                <i className="fa-solid fa-rotate-left mr-1"></i> Reset
            </button>
            <button 
                onClick={handleExport}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded hover:bg-slate-200 transition-colors"
            >
                <i className="fa-solid fa-download mr-1"></i> Export to VSCode
            </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="relative">
        <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full min-h-[16rem] bg-[#1e1e1e] text-[#d4d4d4] font-mono p-4 text-sm focus:outline-none resize-none leading-relaxed overflow-hidden"
            spellCheck={false}
        />
        <button 
            onClick={handleRun}
            disabled={isRunning}
            className="absolute bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-lg font-semibold text-sm transition-all flex items-center gap-2"
        >
            {isRunning ? (
                <i className="fa-solid fa-circle-notch fa-spin"></i>
            ) : (
                <i className="fa-solid fa-play"></i>
            )}
            Run Code
        </button>
      </div>

      {/* Output Console */}
      {output && (
        <div className="bg-slate-900 text-green-400 p-4 font-mono text-sm border-t border-slate-800">
            <div className="uppercase text-xs text-slate-500 mb-2">Terminal Output</div>
            <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      )}

      {/* Validation Feedback */}
      {isCorrect !== null && (
        <div className={`p-4 border-b border-slate-200 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-start gap-3">
                <div className={`mt-0.5 rounded-full p-1 ${isCorrect ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                    <i className={`fa-solid ${isCorrect ? 'fa-check' : 'fa-xmark'} text-xs w-4 h-4 flex items-center justify-center`}></i>
                </div>
                <div className="flex-1">
                    <h5 className={`text-sm font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {isCorrect ? 'Excellent! Output matches expected result.' : 'Incorrect Output'}
                    </h5>
                    {isCorrect && nextLessonId && (
                        <button 
                            onClick={() => onNavigate(nextLessonId)}
                            className="mt-3 bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-2 rounded-full font-bold shadow-sm transition-all flex items-center gap-2 animate-bounce"
                        >
                            Next Day <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    )}
                    {!isCorrect && (
                        <div className="mt-2">
                            <p className="text-xs text-red-700 mb-3">Your code ran, but the output didn't match the assignment requirements.</p>
                            <button 
                                onClick={() => setShowSolution(!showSolution)}
                                className="text-xs bg-white border border-red-200 text-red-700 px-3 py-1.5 rounded font-semibold hover:bg-red-50 transition-colors shadow-sm"
                            >
                                {showSolution ? 'Hide Solution' : 'Reveal Solution'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {showSolution && !isCorrect && project.solutionCode && (
                <div className="mt-4 animate-fadeIn">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">Reference Solution</div>
                    <div className="relative">
                        <pre className="bg-slate-800 text-slate-300 p-4 rounded-lg text-xs font-mono overflow-x-auto border border-slate-700">
                            {project.solutionCode}
                        </pre>
                        <button 
                            onClick={() => {
                                setCode(project.solutionCode!);
                                setShowSolution(false);
                                setIsCorrect(null);
                                setOutput(null);
                            }}
                            className="absolute top-2 right-2 text-[10px] bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded transition-colors"
                        >
                            Replace My Code
                        </button>
                    </div>
                </div>
            )}
        </div>
      )}

      {/* Instructions & Progressive Hints */}
      <div className="bg-slate-50 p-5 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Assignment Instructions</h4>
            
            {hintsRevealedCount < project.hints.length ? (
                <button 
                    onClick={showNextHint}
                    className="text-xs flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full hover:bg-yellow-200 font-semibold transition-colors"
                >
                    <i className="fa-solid fa-lightbulb"></i>
                    {hintsRevealedCount === 0 ? 'Get a Hint' : 'Next Hint'}
                </button>
            ) : (
                <span className="text-xs text-slate-400 font-medium italic">All hints revealed</span>
            )}
          </div>
          
          <p className="text-slate-600 text-sm mb-4 leading-relaxed">{project.description}</p>
          
          {/* Hints Container */}
          {hintsRevealedCount > 0 && (
              <div className="space-y-2">
                  {project.hints.slice(0, hintsRevealedCount).map((hint, i) => (
                      <div key={i} className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-yellow-900 animate-fadeIn">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                                <span className="font-bold mr-2">Hint {i + 1}:</span> {hint.text}
                            </div>
                            {hint.relearnLessonId && (
                                <button 
                                    onClick={() => handleRelearn(hint.relearnLessonId!)}
                                    className="shrink-0 text-xs bg-yellow-200 hover:bg-yellow-300 text-yellow-900 px-2 py-1 rounded font-semibold transition-colors"
                                    title="Go back to lesson"
                                >
                                    <i className="fa-solid fa-rotate-left mr-1"></i> Review
                                </button>
                            )}
                          </div>
                      </div>
                  ))}
              </div>
          )}
      </div>
    </div>
  );
};

export default CodePlayground;