import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CVData } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Schema for CV Data generation
const cvSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    fullName: { type: Type.STRING, description: "A realistic full name." },
    summary: { type: Type.STRING, description: "A punchy, professional summary (approx 3-4 sentences) that fits perfectly at the top of a page." },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          company: { type: Type.STRING },
          role: { type: Type.STRING },
          startDate: { type: Type.STRING },
          endDate: { type: Type.STRING },
          description: { type: Type.STRING, description: "3-4 concise but impactful bullet points. Focus on results to keep it dense but readable." },
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
      1. **GOAL**: The content must fit PERFECTLY on a single A4 page. 
         - Not too short (no blank space at bottom).
         - Not too long (do not spill to page 2).
      2. **TONE**: Write as a HUMAN candidate. Professional, confident, and articulate.
      3. **DETAILS**:
         - Summary: 3-4 sentences.
         - Experience: Provide exactly 3 roles. Each role should have 3-4 bullet points.
         - Education: 1-2 items.
         - Skills: 6-8 relevant skills.
      4. **REALISM**: Use realistic numbers (e.g., "Managed budget of $50k", "Improved efficiency by 15%").
      5. **FORMAT**: Return clean JSON.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: cvSchema,
        temperature: 0.4, 
      },
    });

    if (response.text) {
      let text = response.text.trim();
      // Remove Markdown code block formatting if present
      if (text.startsWith("```")) {
        text = text.replace(/^```(json)?/, "").replace(/```$/, "");
      }
      return JSON.parse(text) as Partial<CVData>;
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
      1. Make it professional, impressive, and flow naturally.
      2. **LENGTH**: Keep it concise (approx 30 words) to ensure it stays on one page.
      3. NO AI EXPLANATIONS. Return ONLY the rewritten text.
      4. Focus on strong action verbs and professional vocabulary.
      `,
    });
    
    return response.text?.trim() || currentText;
  } catch (error) {
    console.error("Gemini Improvement Error:", error);
    return currentText;
  }
};