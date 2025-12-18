
import { MaterialProperties } from './types';

export const MATERIAL_PRESETS: MaterialProperties[] = [
  {
    id: 'steel',
    name: 'Steel',
    youngsModulus: 200,
    density: 7850,
    damping: 0.001,
    color: '#94a3b8'
  },
  {
    id: 'rubber',
    name: 'Rubber',
    youngsModulus: 0.1,
    density: 1100,
    damping: 0.05,
    color: '#1e293b'
  },
  {
    id: 'water',
    name: 'Water',
    youngsModulus: 2.2, // Bulk modulus used for approximation
    density: 1000,
    damping: 0.005,
    color: '#0ea5e9'
  },
  {
    id: 'granite',
    name: 'Granite',
    youngsModulus: 50,
    density: 2700,
    damping: 0.002,
    color: '#fb7185'
  }
];

export const INITIAL_SIM_STATE = {
  isRunning: true,
  waveType: 'P' as const,
  amplitude: 20,
  frequency: 0.1,
  gridSize: 50
};
