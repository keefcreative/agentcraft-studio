import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function IdeaToRulesGenerator({ onRulesReady }) {
  const [ideaText, setIdeaText] = useState('');
  const [rulesYaml, setRulesYaml] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const systemPrompt = `You are a senior software architect. Given a user-submitted app idea, return a YAML formatted breakdown with the following keys:\n\n- name: short app name\n- description: what the app does\n- language: preferred programming language\n- framework: main framework\n- platform: Web, Mobile, Desktop, etc\n- steps: a list of high-level development steps (title + description)`;

    const response = await window.electronAPI.sendPrompt(
      systemPrompt,
      ideaText,
      { temperature: 0.4, format: 'text' }
    );

    setRulesYaml(response);
    setLoading(false);
  };

  const handleAccept = () => {
    onRulesReady(rulesYaml);
  };

  return (
    <Card className="p-4 space-y-4">
      <CardContent>
        <h2 className="text-lg font-bold mb-2">🧠 Describe Your App</h2>
        <Textarea
          value={ideaText}
          onChange={(e) => setIdeaText(e.target.value)}
          placeholder="e.g. I want to build a task manager where users can log in and track their to-dos by project."
        />
        <Button disabled={!ideaText || loading} onClick={handleGenerate}>
          {loading ? 'Generating…' : 'Generate Steps'}
        </Button>

        {rulesYaml && (
          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-semibold">📜 YAML Output</h3>
            <pre className="bg-gray-100 text-xs p-3 rounded whitespace-pre-wrap">
              {rulesYaml}
            </pre>
            <Button variant="default" onClick={handleAccept}>
              Save & Continue
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
