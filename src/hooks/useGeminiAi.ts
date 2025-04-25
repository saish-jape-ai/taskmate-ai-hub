
import { useState } from 'react';
import { generateGeminiResponse } from '@/utils/ai/geminiConfig';

export const useGeminiAi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await generateGeminiResponse(prompt);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generate,
    isLoading,
    error
  };
};
