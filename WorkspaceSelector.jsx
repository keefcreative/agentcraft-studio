import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function WorkspaceSelector({ onSelect }) {
  const [projects, setProjects] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    window.electronAPI?.listProjects()?.then((list) => setProjects(list));
  }, []);

  const createNew = async () => {
    if (!newName.trim()) return;
    const folderPath = await window.electronAPI?.createProjectFolder(newName.trim());
    onSelect(folderPath);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Select a Workspace</h1>

      <div className="mb-6">
        <h2 className="font-semibold text-sm mb-2">Existing Workspaces</h2>
        <ul className="space-y-2">
          {projects.map((name) => (
            <li key={name}>
              <Button variant="outline" onClick={() => onSelect(name)}>
                {name}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-4">
        <h2 className="font-semibold text-sm mb-2">Create New</h2>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. my-ai-project"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button onClick={createNew}>Create</Button>
        </div>
      </div>
    </div>
  );
}
