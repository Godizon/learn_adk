import React, { useState } from 'react';
import { NotebookData, NotebookCell } from '../types';
import MarkdownRenderer from './MarkdownRenderer';

interface NotebookProps {
  notebook: NotebookData;
  onTermClick: (term: string) => void;
}

const Notebook: React.FC<NotebookProps> = ({ notebook, onTermClick }) => {
  const [cells, setCells] = useState<NotebookCell[]>(notebook.cells);
  const [activeCellId, setActiveCellId] = useState<string | null>(null);

  const handleRunCell = (cellId: string) => {
    // Simulate execution
    setCells(prev => prev.map(cell => {
      if (cell.id === cellId && cell.type === 'code') {
        return {
          ...cell,
          output: `[${new Date().toLocaleTimeString()}] Executed successfully.\nResult: <Mock Object at 0x7f...>`,
        };
      }
      return cell;
    }));
  };

  const handleCodeChange = (cellId: string, newCode: string) => {
    setCells(prev => prev.map(cell => {
      if (cell.id === cellId) {
        return { ...cell, content: newCode };
      }
      return cell;
    }));
  };

  return (
    <div className="my-8 border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
      {/* Notebook Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <i className="fa-brands fa-python text-xl text-blue-600"></i>
                <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded">IPYNB</span>
            </div>
            <h3 className="font-bold text-slate-800">{notebook.title}</h3>
        </div>
        <div className="flex gap-2">
             <button className="text-slate-500 hover:text-slate-700 text-sm px-3 py-1 bg-white border border-slate-200 rounded shadow-sm">
                <i className="fa-solid fa-arrows-rotate mr-1"></i> Restart Kernel
             </button>
        </div>
      </div>

      {/* Cells */}
      <div className="p-2 md:p-6 bg-slate-50/50 min-h-[400px]">
        {cells.map((cell, index) => (
          <div 
            key={cell.id} 
            className={`mb-4 transition-all duration-200 group ${activeCellId === cell.id ? 'shadow-md scale-[1.01]' : ''}`}
            onClick={() => setActiveCellId(cell.id)}
          >
            {/* Cell Gutter & Content */}
            <div className="flex gap-2 md:gap-4">
                {/* Input Prompt (In [ ]) */}
                <div className="w-16 flex-shrink-0 text-right font-mono text-xs text-slate-400 pt-3 select-none">
                    {cell.type === 'code' ? `In [${index + 1}]:` : ''}
                </div>

                {/* Main Cell Content */}
                <div className="flex-1 min-w-0">
                    {cell.type === 'markdown' ? (
                        <div className="p-4 bg-transparent prose prose-sm max-w-none border border-transparent hover:border-slate-200 rounded transition-colors">
                            <MarkdownRenderer content={cell.content} onTermClick={onTermClick} />
                        </div>
                    ) : (
                        <div className={`rounded-lg overflow-hidden border ${activeCellId === cell.id ? 'border-green-500 ring-1 ring-green-500' : 'border-slate-300 bg-white'}`}>
                            {/* Code Editor */}
                            <div className="relative">
                                <textarea 
                                    value={cell.content}
                                    onChange={(e) => handleCodeChange(cell.id, e.target.value)}
                                    className="w-full h-auto min-h-[100px] bg-slate-50 p-3 font-mono text-sm text-slate-800 focus:outline-none resize-y"
                                    spellCheck={false}
                                />
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleRunCell(cell.id); }}
                                    className="absolute top-2 right-2 bg-white hover:bg-green-50 text-green-600 border border-green-200 rounded p-1.5 shadow-sm transition-colors z-10"
                                    title="Run Cell"
                                >
                                    <i className="fa-solid fa-play text-xs"></i>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Output Area */}
                    {cell.type === 'code' && cell.output && (
                        <div className="mt-2 flex gap-2 md:gap-4">
                             <div className="w-16 flex-shrink-0 text-right font-mono text-xs text-red-400 select-none">
                                Out[{index + 1}]:
                            </div>
                            <div className="flex-1 bg-white border-l-4 border-slate-200 pl-4 py-2 font-mono text-sm text-slate-700 whitespace-pre-wrap">
                                {cell.output}
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notebook;