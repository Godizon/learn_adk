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
        
        // Basic Markdown Rendering Simulation (for bold, headers, code blocks)
        // In a real app, use react-markdown. Here we do simple replacements for visual structure.
        return (
          <span key={index} dangerouslySetInnerHTML={{ 
            __html: part
              .replace(/^# (.*$)/gm, '<h1 class="text-3xl mb-4 mt-6">$1</h1>')
              .replace(/^### (.*$)/gm, '<h3 class="text-xl mb-2 mt-4 font-semibold text-slate-700">$1</h3>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n/g, '<br />')
              .replace(/`([^`]+)`/g, '<code class="font-mono text-sm bg-slate-100 px-1 py-0.5 rounded text-pink-600">$1</code>')
          }} />
        );
      })}
    </div>
  );
};

export default MarkdownRenderer;