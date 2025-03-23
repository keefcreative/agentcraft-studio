import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function StepDetail({ step }) {
  if (!step) return <p className="text-sm text-gray-500">No step selected.</p>;

  return (
    <Card>
      <CardContent className="space-y-2">
        <h3 className="text-lg font-semibold">🧩 {step.title || 'Unnamed Step'}</h3>
        <pre className="text-xs whitespace-pre-wrap bg-gray-100 p-2 rounded">
          {step.description || 'No description provided.'}
        </pre>
        {step.code && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold">Generated Code</h4>
            <pre className="text-xs bg-gray-800 text-white p-2 rounded overflow-x-auto">
              {step.code}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
