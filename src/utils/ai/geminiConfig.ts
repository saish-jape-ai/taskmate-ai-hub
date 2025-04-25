
import { toast } from "sonner";

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

export const getGeminiApiKey = () => {
  return localStorage.getItem('gemini_api_key');
};

export const setGeminiApiKey = (apiKey: string) => {
  localStorage.setItem('gemini_api_key', apiKey);
};

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const generateGeminiResponse = async (prompt: string, model = 'gemini-2.0-flash'): Promise<string> => {
  const apiKey = getGeminiApiKey();
  
  if (!apiKey) {
    toast.error('Please set your Gemini API key in settings');
    throw new Error('Gemini API key not found');
  }

  try {
    const response = await fetch(`${GEMINI_API_ENDPOINT}/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const data: GeminiResponse = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || '';
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    toast.error('Failed to generate AI response');
    throw error;
  }
};
