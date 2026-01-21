import React, { useState } from 'react';
import { QuizData } from '../types';
import { adksyllabusData } from '../services/adkContentService';
const syllabusData = adksyllabusData;
interface QuizProps {
  quiz: QuizData;
  onNavigate: (lessonId: string) => void;
}

const Quiz: React.FC<QuizProps> = ({ quiz, onNavigate }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const handleSelect = (questionId: string, optionIndex: number) => {
    // If hint is revealed and requires relearning, prevent answering until they navigate away (simulated by UI)
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const toggleHint = (questionId: string) => {
    setRevealedHints(prev => ({ ...prev, [questionId]: true }));
  };

  const handleRelearn = (lessonId: string) => {
    // Check if lesson exists in the syllabus
    const exists = syllabusData.some(p => p.weeks.some(w => w.lessons.some(l => l.id === lessonId)));
    
    if (!exists) {
        alert("Content will be added soon.");
        return;
    }

    if (window.confirm("This will take you back to the lesson to review this topic. Continue?")) {
        onNavigate(lessonId);
    }
  };

  return (
    <div className="my-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex items-center gap-3">
        <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
            <i className="fa-solid fa-list-check text-xl"></i>
        </div>
        <div>
            <h3 className="font-bold text-slate-800 text-lg">{quiz.title}</h3>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Knowledge Check</p>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {quiz.questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== undefined;
          const userSelectedIdx = answers[q.id];
          const isCorrect = isAnswered && userSelectedIdx === q.correctOptionIndex;
          const showHint = revealedHints[q.id];

          return (
            <div key={q.id} className="animate-fadeIn">
              <div className="flex gap-3 mb-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center mt-0.5">
                    {idx + 1}
                </span>
                <h4 className="text-slate-800 font-medium text-base">{q.question}</h4>
              </div>

              <div className="ml-9 space-y-2">
                {q.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => !isAnswered && handleSelect(q.id, optIdx)}
                    disabled={isAnswered || (showHint && q.hint?.relearnLessonId ? true : false)}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                      isAnswered
                        ? optIdx === q.correctOptionIndex
                            ? 'bg-green-50 border-green-200 text-green-800 ring-1 ring-green-500' // Always highlight correct
                            : userSelectedIdx === optIdx
                                ? 'bg-red-50 border-red-200 text-red-800 ring-1 ring-red-500' // Highlight wrong selection
                                : 'bg-slate-50 border-slate-100 text-slate-400 opacity-60' // Dim others
                        : answers[q.id] === optIdx
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                    } ${(showHint && q.hint?.relearnLessonId && !isAnswered) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex justify-between items-center">
                        <span>{opt}</span>
                        {isAnswered && optIdx === q.correctOptionIndex && (
                            <i className="fa-solid fa-check text-green-600"></i>
                        )}
                        {isAnswered && userSelectedIdx === optIdx && userSelectedIdx !== q.correctOptionIndex && (
                            <i className="fa-solid fa-xmark text-red-600"></i>
                        )}
                    </div>
                  </button>
                ))}

                {/* Hint / Explanation Section */}
                <div className="mt-4 flex items-start gap-3">
                    {!isAnswered && !showHint && q.hint && (
                        <button 
                            onClick={() => toggleHint(q.id)}
                            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 mt-2"
                        >
                            <i className="fa-solid fa-key"></i> Unlock Hint
                        </button>
                    )}

                    {showHint && q.hint && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-sm text-yellow-900 w-full">
                            <p className="font-bold mb-1"><i className="fa-solid fa-lightbulb mr-1"></i> Hint:</p>
                            <p className="mb-2">{q.hint.text}</p>
                            {q.hint.relearnLessonId && (
                                <button 
                                    onClick={() => handleRelearn(q.hint!.relearnLessonId!)}
                                    className="bg-yellow-200 hover:bg-yellow-300 text-yellow-900 text-xs px-3 py-1.5 rounded font-bold transition-colors flex items-center gap-2"
                                >
                                    <i className="fa-solid fa-arrow-left"></i> Relearn Topic
                                </button>
                            )}
                        </div>
                    )}

                    {isAnswered && q.explanation && !q.optionExplanations && (
                        <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded text-sm text-green-800 w-full animate-fadeIn">
                            <span className="font-bold">Correct!</span> {q.explanation}
                        </div>
                    )}
                </div>

                {/* Detailed Analysis for Wrong Answers */}
                {isAnswered && q.optionExplanations && (
                    <div className="mt-6 space-y-3 animate-fadeIn">
                        <h5 className="font-bold text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200 pb-2">Detailed Analysis</h5>
                        {q.optionExplanations.map((exp, i) => (
                            <div key={i} className={`p-3 rounded text-sm border ${i === q.correctOptionIndex ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
                                <div className="flex items-start gap-3">
                                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white shrink-0 ${i === q.correctOptionIndex ? 'bg-green-500' : 'bg-slate-300'}`}>
                                        {i === q.correctOptionIndex ? <i className="fa-solid fa-check"></i> : <span className="font-mono font-bold">{String.fromCharCode(65 + i)}</span>}
                                    </div>
                                    <div className="flex-1">
                                        <span className={`font-semibold block mb-1 ${i === q.correctOptionIndex ? 'text-green-800' : 'text-slate-700'}`}>{q.options[i]}</span>
                                        <span className="text-slate-600 block mb-2">{exp.text}</span>
                                        {exp.relearnLessonId && (
                                             <button 
                                                onClick={() => handleRelearn(exp.relearnLessonId!)}
                                                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded hover:bg-indigo-100 transition-colors"
                                            >
                                                <i className="fa-solid fa-book-open"></i> Review Topic
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;