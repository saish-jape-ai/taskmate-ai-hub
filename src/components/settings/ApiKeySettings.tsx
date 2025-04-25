
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Key } from "lucide-react";
import { toast } from "sonner";
import { getGeminiApiKey, setGeminiApiKey } from '@/utils/ai/geminiConfig';

export const ApiKeySettings = () => {
  const [apiKey, setApiKey] = useState('');
  
  useEffect(() => {
    const savedKey = getGeminiApiKey();
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }
    
    setGeminiApiKey(apiKey.trim());
    toast.success('API key saved successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Key className="h-5 w-5" />
          AI Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Gemini API Key</label>
          <div className="flex gap-2">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
            />
            <Button onClick={handleSaveApiKey}>Save Key</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Your API key is stored locally and never sent to our servers.
            For production use, we recommend using Supabase to handle API keys securely.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
