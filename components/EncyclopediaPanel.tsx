import React from 'react';
import { EncyclopediaEntry } from '../types';

interface EncyclopediaPanelProps {
  entry: EncyclopediaEntry | null;
  isOpen: boolean;
  onClose: () => void;
}

const EncyclopediaPanel: React.FC<EncyclopediaPanelProps> = ({ entry, isOpen, onClose }) => {
  if (!entry) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
            <div>
                <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded mb-2">
                    {entry.category}
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">{entry.term}</h2>
            </div>
            <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
            >
                <i className="fa-solid fa-xmark text-xl"></i>
            </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Summary */}
            <section>
                <p className="text-lg text-slate-700 leading-relaxed font-medium">
                    {entry.summary}
                </p>
            </section>

            {/* Analogy Section (Added) */}
            {entry.analogy && (
                <section className="bg-amber-50 p-5 rounded-xl border border-amber-200 shadow-sm">
                    <h3 className="text-amber-800 font-bold flex items-center gap-2 mb-3">
                        <i className="fa-solid fa-lightbulb text-amber-500"></i> Intuitive Analogy
                    </h3>
                    <div className="prose prose-sm prose-amber text-slate-800">
                        <div dangerouslySetInnerHTML={{ __html: entry.analogy.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </div>
                </section>
            )}

            {/* ADK Context */}
            <section className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h3 className="text-blue-900 font-bold flex items-center gap-2 mb-3">
                    <i className="fa-solid fa-robot"></i> Relevance in ADK
                </h3>
                <div className="prose prose-sm prose-blue text-slate-700">
                    <div dangerouslySetInnerHTML={{ __html: entry.adkContext.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
            </section>

            {/* Python Internals */}
            <section className="bg-slate-900 text-slate-300 p-5 rounded-xl shadow-inner border border-slate-800">
                <h3 className="text-emerald-400 font-bold flex items-center gap-2 mb-3 font-mono">
                    <i className="fa-brands fa-python"></i> Underlying Python Internals
                </h3>
                <div className="prose prose-invert prose-sm font-mono text-sm opacity-90">
                     <div dangerouslySetInnerHTML={{ __html: entry.pythonInternals.replace(/\n/g, '<br/>').replace(/```python([\s\S]*?)```/g, '<div class="bg-black/50 p-3 rounded border border-white/10 my-2 whitespace-pre-wrap">$1</div>') }} />
                </div>
            </section>

             {/* Cross Language */}
             {entry.crossLanguage && (
                 <section>
                    <h3 className="text-slate-900 font-bold flex items-center gap-2 mb-3">
                        <i className="fa-solid fa-code-branch"></i> Cross-Language Comparison
                    </h3>
                    <div className="prose prose-sm max-w-none text-slate-600">
                         <div dangerouslySetInnerHTML={{ __html: entry.crossLanguage.replace(/\n/g, '<br/>').replace(/\|/g, '').replace(/-+/g, '') }} /> 
                         {/* Note: Simple table rendering in vanilla HTML/CSS within React can be tricky without a Markdown parser. 
                             If your data is raw markdown tables, you might need a library like 'react-markdown'. 
                             The replace regex above is a rudimentary fallback. */}
                    </div>
                </section>
             )}

            {/* History */}
             {entry.history && (
                 <section className="border-t border-slate-100 pt-6">
                    <h3 className="text-slate-500 font-bold flex items-center gap-2 mb-2 text-sm uppercase">
                        <i className="fa-solid fa-landmark"></i> History & Etymology
                    </h3>
                    <div className="text-slate-500 text-sm italic">
                         <div dangerouslySetInnerHTML={{ __html: entry.history.replace(/\n/g, '<br/>') }} />
                    </div>
                </section>
             )}

        </div>
      </div>
    </>
  );
};

export default EncyclopediaPanel;