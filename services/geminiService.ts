
import { GoogleGenAI, Type } from "@google/genai";
import { MaterialProperties } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPhysicsExplanation = async (material: MaterialProperties, waveType: string) => {
  const prompt = `Act as a senior physicist. Explain the elastic wave propagation characteristics of ${material.name}. 
  Current wave type: ${waveType === 'P' ? 'Primary/Longitudinal' : 'Secondary/Transverse'}.
  Physical properties: Young's Modulus: ${material.youngsModulus} GPa, Density: ${material.density} kg/m³.
  Focus on the speed of sound and how attenuation affects this specific material.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            speedOfSound: { type: Type.NUMBER },
            behaviorDescription: { type: Type.STRING }
          },
          required: ["title", "content", "speedOfSound", "behaviorDescription"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
