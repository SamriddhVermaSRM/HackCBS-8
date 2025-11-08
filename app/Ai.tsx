import { GoogleGenAI } from "@google/genai";

export const Gemini = new GoogleGenAI({
  apiKey:
    process.env.GENAI_API_KEY || "AIzaSyBRwrN8A4J6kFKnbWlK0cr058AFpzmkON4",
});
