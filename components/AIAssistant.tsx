
import React, { useState, useEffect } from 'react';
import { getPhysicsExplanation } from '../services/geminiService';
import { MaterialProperties, AIExplanation } from '../types';

interface AIAssistantProps {
  material: MaterialProperties;
  waveType: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ material, waveType }) => {
  const [explanation, setExplanation] = useState<AIExplanation | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchExplanation = async () => {
    setLoading(true);
    const data = await getPhysicsExplanation(material, waveType);
    if (data) setExplanation(data);
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        fetchExplanation();
    }, 1000);
    return () => clearTimeout(timer);
  }, [material.id, waveType, material.youngsModulus, material.density]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full flex flex-col shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-slate-100">AI Physics Guide</h3>
            <p className="text-[10px] text-slate-500 font-mono">GEMINI-3-FLASH ANALYSIS</p>
          </div>
        </div>
        {loading && (
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {explanation ? (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">Calculated Metric</h4>
              <div className="text-3xl font-bold text-slate-100 font-mono">
                {explanation.speedOfSound.toLocaleString()} <span className="text-sm font-normal text-slate-400">m/s</span>
              </div>
              <p className="text-[10px] text-slate-500">Theoretical longitudinal wave speed in this medium.</p>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <h4 className="text-slate-100 font-semibold mb-2">{explanation.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                {explanation.content}
              </p>
            </div>

            <div>
              <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Wave Behavior</h4>
              <p className="text-sm text-slate-400 italic leading-relaxed border-l-2 border-indigo-500/50 pl-4">
                "{explanation.behaviorDescription}"
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-sm px-8">Adjust simulation parameters to generate a new AI physical analysis.</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-[10px] text-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Data based on linear elasticity theory (Hooke's Law)
      </div>
    </div>
  );
};

export default AIAssistant;
