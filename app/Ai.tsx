import { GoogleGenAI } from "@google/genai";

export const Gemini = new GoogleGenAI({
  apiKey: process.env.GENAI_API_KEY || "AIzaSyBRwrN8A4J6kFKnbWlK0cr058AFpzmkO4",
  // || "AIzaSyBRwrN8A4J6kFKnbWlK0cr058AFpzmkON4",
});

export const MAX_AUDIO_LENGTH = 10;
