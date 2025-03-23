import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function PromptRefinementDialog({ open, onClose, onSubmit, initialPrompt }) {
  const [refined, setRefined] = useState(initialPrompt);

  const handleSend = () => {
    onSubmit(refined);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <h2 className="text-lg font-semibold">✍️ Refine Prompt</h2>
        <Textarea
          className="w-full h-40"
          value={refined}
          onChange={(e) => setRefined(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
