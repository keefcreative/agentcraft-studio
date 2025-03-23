import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';

export default function FeedbackPanel({ entry, onSave }) {
  const [status, setStatus] = useState(entry?.feedback?.status || '');
  const [notes, setNotes] = useState(entry?.feedback?.notes || '');

  const handleSubmit = () => {
    onSave({ ...entry, feedback: { status, notes } });
  };

  return (
    <div className="p-4 border rounded space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">💬 Feedback</h3>
      <Select value={status} onValueChange={setStatus}>
        <SelectItem value="approved">✅ Approved</SelectItem>
        <SelectItem value="needs changes">❌ Needs Changes</SelectItem>
        <SelectItem value="info">ℹ️ Informational</SelectItem>
      </Select>
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Leave notes or suggestions..."
      />
      <Button size="sm" onClick={handleSubmit}>
        Save Feedback
      </Button>
    </div>
  );
}
