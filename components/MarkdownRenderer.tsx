import React from 'react';

interface MarkdownRendererProps {
  content: string;
  onTermClick: (term: string) => void;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onTermClick }) => {
  // Split by the wiki-link pattern [[Term]]
  const parts = content.split(/(\[\[.*?\]\])/g);

  return (
    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-a:text-blue-600 prose-code:text-pink-600 prose-code:bg-slate-100 prose-code:px-1 prose-code:rounded">
      {parts.map((part, index) => {
        if (part.startsWith('[[') && part.endsWith(']]')) {
          const term = part.slice(2, -2);
          return (
            <button
              key={index}
              onClick={() => onTermClick(term)}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 -my-1 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 transition-colors cursor-pointer text-sm align-baseline"
              title={`Open Deep Dive for ${term}`}
            >
              <i className="fa-solid fa-book-open text-xs opacity-70"></i>
              {term}
            </button>
          );
        }
        
        // Split by Code Blocks (```lang ... ```) to handle them separately
        const segments = part.split(/(```[\s\S]*?```)/g);

        return (
          <span key={index}>
            {segments.map((segment, i) => {
                // Check if this segment is a code block
                if (segment.startsWith('```')) {
                    const match = segment.match(/```(\w*)\n([\s\S]*?)```/);
                    if (match) {
                        const lang = match[1] || 'text';
                        const code = match[2];
                        return (
                            <div key={i} className="my-6 rounded-lg overflow-hidden bg-[#1e1e1e] text-[#d4d4d4] border border-slate-800 shadow-sm">
                                <div className="bg-[#252526] px-4 py-2 text-xs font-bold text-slate-400 uppercase border-b border-slate-700 flex items-center gap-2 select-none">
                                    <span className={`w-2 h-2 rounded-full ${lang === 'python' ? 'bg-blue-500' : lang === 'bash' ? 'bg-green-500' : 'bg-slate-500'}`}></span>
                                    {lang}
                                </div>
                                <pre className="p-4 overflow-x-auto font-mono text-sm leading-relaxed m-0 whitespace-pre">{code}</pre>
                            </div>
                        );
                    }
                }

                // Regular Markdown Text
                return (
                  <span key={i} dangerouslySetInnerHTML={{ 
                    __html: segment
                      .replace(/^# (.*$)/gm, '<h1 class="text-3xl mb-4 mt-6">$1</h1>')
                      .replace(/^### (.*$)/gm, '<h3 class="text-xl mb-2 mt-4 font-semibold text-slate-700">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br />')
                      .replace(/`([^`]+)`/g, '<code class="font-mono text-sm bg-slate-100 px-1 py-0.5 rounded text-pink-600 border border-slate-200">$1</code>')
                  }} />
                );
            })}
          </span>
        );
      })}
    </div>
  );
};

export default MarkdownRenderer;