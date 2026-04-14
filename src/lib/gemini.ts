import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getAiSuggestion(title: string, description: string, subject: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert tutor in ${subject}. 
      A student has a doubt with the title: "${title}" and description: "${description}".
      Provide a concise, helpful, and encouraging initial suggestion or explanation to help them start solving it.
      Format your response in Markdown.`,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't generate a suggestion at this moment.";
  }
}

export async function solveDoubt(title: string, description: string = "", subject: string = "General Academic") {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `You are an expert tutor in ${subject}. 
      Solve the following student doubt in detail.
      Title/Query: "${title}"
      ${description ? `Description: "${description}"` : ""}
      Provide a step-by-step explanation, clear concepts, and the final answer.
      Use Markdown for formatting.`,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while solving the doubt. Please try again later.";
  }
}
