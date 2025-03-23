import React from 'react';

export default function PromptTimeline({ prompts }) {
  if (!prompts?.length) return <p className="text-gray-400 text-sm">No prompts yet.</p>;

  return (
    <ol className="space-y-2 text-sm">
      {prompts.map((p, i) => (
        <li key={i} className="border-l-2 border-gray-300 pl-4">
          <div className="text-gray-500">Step {i + 1}</div>
          <pre className="whitespace-pre-wrap text-xs bg-gray-100 p-2 rounded">
            {p}
          </pre>
        </li>
      ))}
    </ol>
  );
}
