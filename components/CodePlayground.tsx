import React, { useState, useRef, useEffect } from 'react';
import { CodeProject } from '../types';

interface CodePlaygroundProps {
  project: CodeProject;
  onNavigate: (lessonId: string) => void;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({ project, onNavigate }) => {
  const [code, setCode] = useState(project.initialCode);
  const [output, setOutput] = useState<string | null>(null);
  // Hint state: how many hints are currently revealed. 0 means none.
  const [hintsRevealedCount, setHintsRevealedCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);

    try {
      const response = await fetch('http://localhost:8000/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      setOutput(data.output);
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

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
      {/* Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="ml-2 text-xs font-mono text-slate-500 font-semibold">{project.language === 'python' ? 'main.py' : 'app.ts'}</span>
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
                                    onClick={() => onNavigate(hint.relearnLessonId!)}
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