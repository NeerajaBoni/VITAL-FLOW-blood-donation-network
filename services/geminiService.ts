import { GoogleGenAI } from "@google/genai";

// FIX: Per coding guidelines, directly initialize GoogleGenAI assuming API_KEY is present,
// and remove conditional logic and mock responses. The API key must be sourced from `process.env.API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateEventDescription = async (theme: string): Promise<string> => {
  try {
    const prompt = `Generate a creative and engaging description for a blood donation drive with the theme: "${theme}". The description should be short (2-3 sentences), inspiring, and encourage people to participate. Do not include placeholders for date or location.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating event description with Gemini:", error);
    return `Failed to generate a description for "${theme}". Please try again.`;
  }
};
