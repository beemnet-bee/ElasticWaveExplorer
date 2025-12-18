
import React, { useEffect, useRef } from 'react';
import { MaterialProperties, SimulationState } from '../types';

interface WaveCanvasProps {
  material: MaterialProperties;
  simState: SimulationState;
}

const WaveCanvas: React.FC<WaveCanvasProps> = ({ material, simState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const nodesRef = useRef<any[]>([]);

  // Simulation parameters derived from physical properties
  // Wave speed v = sqrt(E / rho)
  const calculateWaveSpeed = () => {
    const E = material.youngsModulus * 1e9; // Convert GPa to Pa
    const rho = material.density;
    const speed = Math.sqrt(E / rho);
    // Normalize speed for visual simulation
    return Math.max(2, Math.min(20, speed / 500));
  };

  const initNodes = (width: number, height: number) => {
    const spacing = 15;
    const rows = Math.floor(height / spacing);
    const cols = Math.floor(width / spacing);
    const nodes = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        nodes.push({
          x: j * spacing + spacing / 2,
          y: i * spacing + spacing / 2,
          origX: j * spacing + spacing / 2,
          origY: i * spacing + spacing / 2,
          vx: 0,
          vy: 0,
        });
      }
    }
    nodesRef.current = nodes;
  };

  const animate = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const nodes = nodesRef.current;
    const speed = calculateWaveSpeed();
    const freq = simState.frequency;
    const amp = simState.amplitude;
    const isPWave = simState.waveType === 'P';

    // Source wave generation (Left side)
    const sourcePhase = time * freq * 0.1;
    const sourceOffset = Math.sin(sourcePhase) * amp;

    nodes.forEach((node) => {
      if (simState.isRunning) {
        // Simple distance-based wave propagation model
        // In a real FDTD, we'd use neighboring nodes. 
        // For visual performance in JS, we use a hybrid phase-delay approach.
        const distFromLeft = node.origX;
        const waveFront = time * speed * 0.1;
        
        // Propagation with attenuation
        const attenuation = Math.exp(-distFromLeft * material.damping * 0.05);
        const localPhase = (distFromLeft / (speed * 10)) - (time * freq * 0.01);
        const displacement = Math.sin(localPhase * 10) * amp * attenuation;

        if (isPWave) {
          // Longitudinal: X displacement
          node.x = node.origX + displacement;
          node.y = node.origY;
        } else {
          // Transverse: Y displacement
          node.x = node.origX;
          node.y = node.origY + displacement;
        }
      }

      // Render node
      const alpha = 0.3 + (Math.abs(node.x - node.origX + node.y - node.origY) / amp) * 0.7;
      ctx.fillStyle = material.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      ctx.beginPath();
      ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
        initNodes(canvasRef.current.width, canvasRef.current.height);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [material, simState.isRunning, simState.waveType, simState.amplitude, simState.frequency]);

  return (
    <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-800">
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
      <div className="absolute bottom-4 left-4 bg-slate-950/80 px-3 py-1 rounded-md text-xs font-mono text-slate-400 border border-slate-700 pointer-events-none">
        {simState.waveType}-WAVE | {material.name} | E: {material.youngsModulus} GPa | ρ: {material.density} kg/m³
      </div>
    </div>
  );
};

export default WaveCanvas;
