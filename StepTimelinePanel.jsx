import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function StepTimelinePanel({ basePath, onSelectStep }) {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const loadSteps = async () => {
      try {
        const yamlRaw = await window.electronAPI.readFile(`${basePath}/project.rules`);
        const yaml = require('js-yaml');
        const parsed = yaml.load(yamlRaw);
        const ruleSteps = parsed?.steps || [];

        let log = [];
        try {
          const jsonRaw = await window.electronAPI.readFile(`${basePath}/prompt-log.json`);
          const json = JSON.parse(jsonRaw);
          log = json.log;
        } catch (_) {}

        const enriched = ruleSteps.map((step, i) => {
          const match = log.find(l => l.step === i);
          const status = match
            ? match.revisions?.slice(-1)[0]?.feedback?.status || 'complete'
            : 'pending';
          return {
            index: i,
            title: step.title,
            description: step.description,
            status
          };
        });

        setSteps(enriched);
      } catch (err) {
        console.warn('Failed to load steps:', err);
        setSteps([]);
      }
    };

    loadSteps();
  }, [basePath]);

  const statusColor = (s) =>
    s === 'approved' ? 'bg-green-100 text-green-800' :
    s === 'needs changes' ? 'bg-yellow-100 text-yellow-800' :
    s === 'complete' ? 'bg-blue-100 text-blue-800' :
    'bg-gray-100 text-gray-700';

  return (
    <Card className="mb-4">
      <CardContent className="space-y-3">
        <h3 className="text-lg font-semibold">📋 Step Planner</h3>
        <ul className="space-y-2">
          {steps.map(step => (
            <li key={step.index} className="flex items-start justify-between p-3 border rounded bg-white">
              <div>
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`${statusColor(step.status)} text-xs`}>{step.status}</Badge>
                <Button size="sm" onClick={() => onSelectStep(step.index)}>Open</Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
