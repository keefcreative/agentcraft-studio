import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SettingsPanel() {
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const [source, setSource] = useState('');

  useEffect(() => {
    const localKey = localStorage.getItem('OPENAI_API_KEY');
    if (localKey) {
      setApiKey(localKey);
      setSavedKey(localKey);
      setSource('local');
    } else {
      const checkEnv = async () => {
        const envKey = await window.electronAPI?.getEnvApiKey?.();
        if (envKey) {
          setApiKey(envKey);
          setSavedKey(envKey);
          setSource('env');
        }
      };
      checkEnv();
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('OPENAI_API_KEY', apiKey);
    setSavedKey(apiKey);
    setSource('local');
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">⚙️ Settings</h2>

        <label className="text-xs font-medium text-gray-600">OpenAI API Key</label>
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <Button onClick={handleSave} disabled={apiKey === savedKey}>
          Save Key
        </Button>

        {savedKey && (
          <p className="text-xs text-green-600">
            {source === 'local'
              ? '✅ Using saved key from localStorage'
              : 'ℹ️ Using fallback key from environment'}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
