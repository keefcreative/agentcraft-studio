import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';

export default function PromptFeedbackDashboard({ projectPath, onSelectStep }) {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadLog = async () => {
      try {
        const log = await window.electronAPI.readFile(`${projectPath}/prompt-log.json`);
        const parsed = JSON.parse(log);
        setEntries(parsed?.log || []);
      } catch (err) {
        console.warn('⚠️ No prompt-log found or invalid:', err);
        setEntries([]);
      }
    };
    loadLog();
  }, [projectPath]);

  const filteredEntries =
    filter === 'all' ? entries : entries.filter(e => e.feedback?.status === filter);

  if (!entries.length) {
    return <p className="text-sm text-gray-400">No logged prompts found.</p>;
  }

  return (
    <Card className="mt-4">
      <CardContent className="overflow-x-auto space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">🧾 Prompt Feedback Summary</h2>
          <Select value={filter} onValueChange={setFilter}>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="approved">✅ Approved</SelectItem>
            <SelectItem value="needs changes">❌ Needs Changes</SelectItem>
            <SelectItem value="info">ℹ️ Informational</SelectItem>
          </Select>
        </div>

        <table className="text-sm w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">Step</th>
              <th className="p-2">Title</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{entry.step}</td>
                <td className="p-2">{entry.title}</td>
                <td className="p-2">{entry.feedback?.status || '—'}</td>
                <td className="p-2">
                  <Button variant="outline" size="sm" onClick={() => onSelectStep(entry)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
