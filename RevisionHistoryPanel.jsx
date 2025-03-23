import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RevisionHistoryPanel({ stepData, onRestore }) {
  if (!stepData?.revisions?.length) return null;

  return (
    <Card className="mt-4">
      <CardContent className="space-y-2">
        <h3 className="text-sm font-bold text-gray-700">🕘 Revision History</h3>
        <ul className="space-y-2">
          {stepData.revisions.map((rev, idx) => (
            <li key={idx} className="border p-2 rounded bg-gray-50">
              <p className="text-xs text-gray-600 mb-1">{new Date(rev.timestamp).toLocaleString()}</p>
              <pre className="text-xs whitespace-pre-wrap bg-white p-2 border rounded">
                {rev.response || '// no response'}
              </pre>
              <Button size="sm" variant="outline" onClick={() => onRestore(rev)}>
                Restore This Revision
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
