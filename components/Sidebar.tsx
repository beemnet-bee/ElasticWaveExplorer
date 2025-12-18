
import React from 'react';
import { MATERIAL_PRESETS } from '../constants';
import { MaterialProperties, SimulationState } from '../types';

interface SidebarProps {
  material: MaterialProperties;
  setMaterial: (m: MaterialProperties) => void;
  simState: SimulationState;
  setSimState: (s: SimulationState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ material, setMaterial, simState, setSimState }) => {
  const updateMaterial = (updates: Partial<MaterialProperties>) => {
    setMaterial({ ...material, ...updates });
  };

  const updateSim = (updates: Partial<SimulationState>) => {
    setSimState({ ...simState, ...updates });
  };

  return (
    <div className="w-80 h-full bg-slate-900 border-r border-slate-800 p-6 flex flex-col gap-8 overflow-y-auto">
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
          Simulator Controls
        </h2>
        
        <div className="flex gap-2 mb-6">
          <button 
            onClick={() => updateSim({ isRunning: !simState.isRunning })}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              simState.isRunning 
                ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            {simState.isRunning ? 'Stop' : 'Start'}
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Wave Mode</label>
            <div className="flex bg-slate-800 p-1 rounded-lg">
              <button 
                onClick={() => updateSim({ waveType: 'P' })}
                className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${simState.waveType === 'P' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                P-Wave
              </button>
              <button 
                onClick={() => updateSim({ waveType: 'S' })}
                className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${simState.waveType === 'S' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                S-Wave
              </button>
            </div>
            <p className="mt-2 text-[10px] text-slate-500 leading-tight">
              {simState.waveType === 'P' ? 'Longitudinal: Oscillation in propagation direction.' : 'Transverse: Oscillation perpendicular to propagation.'}
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Source Amplitude</label>
            <input 
              type="range" min="5" max="100" value={simState.amplitude}
              onChange={(e) => updateSim({ amplitude: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Frequency</label>
            <input 
              type="range" min="0.01" max="1" step="0.01" value={simState.frequency}
              onChange={(e) => updateSim({ frequency: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-8">
        <h2 className="text-lg font-bold mb-4">Material Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Presets</label>
            <select 
              value={material.id}
              onChange={(e) => {
                const preset = MATERIAL_PRESETS.find(p => p.id === e.target.value);
                if (preset) setMaterial(preset);
              }}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {MATERIAL_PRESETS.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Elasticity (GPa)</label>
              <span className="text-xs text-blue-400 font-mono">{material.youngsModulus}</span>
            </div>
            <input 
              type="range" min="0.01" max="500" step="0.1" value={material.youngsModulus}
              onChange={(e) => updateMaterial({ youngsModulus: Number(e.target.value), id: 'custom' })}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Density (kg/m³)</label>
              <span className="text-xs text-blue-400 font-mono">{material.density}</span>
            </div>
            <input 
              type="range" min="500" max="10000" value={material.density}
              onChange={(e) => updateMaterial({ density: Number(e.target.value), id: 'custom' })}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attenuation</label>
              <span className="text-xs text-blue-400 font-mono">{material.damping.toFixed(3)}</span>
            </div>
            <input 
              type="range" min="0" max="0.1" step="0.001" value={material.damping}
              onChange={(e) => updateMaterial({ damping: Number(e.target.value), id: 'custom' })}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
