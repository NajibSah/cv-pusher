import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CVData } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Schema for CV Data generation
const cvSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    fullName: { type: Type.STRING, description: "A realistic full name." },
    summary: { type: Type.STRING, description: "Extremely concise (max 2 sentences) professional summary." },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          company: { type: Type.STRING },
          role: { type: Type.STRING },
          startDate: { type: Type.STRING },
          endDate: { type: Type.STRING },
          description: { type: Type.STRING, description: "Max 2-3 short, punchy bullet points." },
        },
        required: ["company", "role", "startDate", "endDate", "description"],
      },
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          institution: { type: Type.STRING },
          degree: { type: Type.STRING },
          startDate: { type: Type.STRING },
          endDate: { type: Type.STRING },
        },
        required: ["institution", "degree", "startDate", "endDate"],
      },
    },
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          level: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Expert"] },
        },
        required: ["name", "level"],
      },
    },
  },
  required: ["fullName", "summary", "experience", "education", "skills"],
};

export const generateCVDraft = async (jobRole: string): Promise<Partial<CVData>> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert professional resume writer. Generate a resume for a "${jobRole}".
      
      RULES FOR CONTENT:
      1. **TONE**: Write as a HUMAN candidate. Do not use AI meta-commentary. Do not say "Here is a summary".
      2. **BREVITY**: The resume MUST fit on one page. 
         - Summary: Max 25 words.
         - Job Descriptions: Max 2-3 bullet points per role. Each bullet max 10 words.
      3. **REALISM**: Use realistic, impressive metrics (e.g., "Increased sales by 20%").
      4. **FORMAT**: Do not use markdown headers in the description fields, just the bullet points.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: cvSchema,
        temperature: 0.4, // Lower temperature for more focused/concise output
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as Partial<CVData>;
    }
    return {};
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const improveTextSection = async (currentText: string, sectionType: string, jobRole: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Rewrite the following "${sectionType}" text for a ${jobRole} resume.
      
      Original Text: "${currentText}"
      
      RULES:
      1. Make it professional, human, and active voice.
      2. **EXTREMELY CONCISE**: Reduce the word count by 30% to ensure it fits on the page. Max 2 sentences total.
      3. NO AI EXPLANATIONS. Return ONLY the rewritten text.
      4. Remove any "AI" placeholders like "[Insert metric]". Use realistic placeholders if needed.
      `,
    });
    
    return response.text?.trim() || currentText;
  } catch (error) {
    console.error("Gemini Improvement Error:", error);
    return currentText;
  }
};