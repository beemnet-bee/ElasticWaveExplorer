
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import WaveCanvas from './components/WaveCanvas';
import AIAssistant from './components/AIAssistant';
import { MATERIAL_PRESETS, INITIAL_SIM_STATE } from './constants';
import { MaterialProperties, SimulationState } from './types';

const App: React.FC = () => {
  const [material, setMaterial] = useState<MaterialProperties>(MATERIAL_PRESETS[0]);
  const [simState, setSimState] = useState<SimulationState>(INITIAL_SIM_STATE);

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans">
      <Sidebar 
        material={material} 
        setMaterial={setMaterial} 
        simState={simState} 
        setSimState={setSimState} 
      />
      
      <main className="flex-1 flex flex-col p-6 bg-slate-950 overflow-hidden">
        {/* Header */}
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              Elastic Wave Explorer
              <span className="text-xs font-mono font-medium px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">v2.0</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">Real-time particle simulation of elastic propagation through varying media.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 shadow-sm">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Selected Material</span>
              <span className="text-sm font-semibold text-slate-200">{material.name}</span>
            </div>
            <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]`} style={{ backgroundColor: material.color }}></div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Main Simulation Area */}
          <div className="flex-[2.5] flex flex-col gap-4 overflow-hidden">
             <div className="flex-1 min-h-0">
               <WaveCanvas material={material} simState={simState} />
             </div>
             
             {/* Dynamic Dashboard Metrics */}
             <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Young's Modulus</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-white">{material.youngsModulus}</span>
                    <span className="text-xs text-slate-400">GPa</span>
                  </div>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Medium Density</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-white">{material.density}</span>
                    <span className="text-xs text-slate-400">kg/m³</span>
                  </div>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Damping Coeff</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-white">{material.damping.toFixed(4)}</span>
                    <span className="text-xs text-slate-400">δ</span>
                  </div>
                </div>
             </div>
          </div>

          {/* AI / Sidebar Info Area */}
          <div className="flex-1 flex flex-col gap-6 overflow-hidden">
            <AIAssistant material={material} waveType={simState.waveType} />
            
            <div className="bg-indigo-900/10 border border-indigo-500/20 rounded-xl p-5">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Physics Insight
              </h4>
              <p className="text-xs text-indigo-200/70 leading-relaxed italic">
                {simState.waveType === 'P' 
                  ? "P-waves (Primary) are longitudinal. Particles oscillate parallel to the wave motion. They travel through solids, liquids, and gases." 
                  : "S-waves (Secondary) are transverse. Particles move perpendicular to propagation. They require shear strength and cannot travel through liquids."
                }
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
