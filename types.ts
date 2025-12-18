
export interface MaterialProperties {
  id: string;
  name: string;
  youngsModulus: number; // in GPa
  density: number; // in kg/m^3
  damping: number; // attenuation factor
  color: string;
}

export interface SimulationState {
  isRunning: boolean;
  waveType: 'P' | 'S';
  amplitude: number;
  frequency: number;
  gridSize: number;
}

export interface AIExplanation {
  title: string;
  content: string;
  speedOfSound: number;
  behaviorDescription: string;
}
