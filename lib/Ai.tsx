import { GoogleGenAI } from '@google/genai';

export const Gemini = new GoogleGenAI({
	apiKey: process.env.GENAI_API_KEY,
});

export const MAX_AUDIO_LENGTH = 10;
