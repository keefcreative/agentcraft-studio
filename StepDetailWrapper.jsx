import React, { useState } from 'react';
import StepDetail from './StepDetail';
import RevisionHistoryPanel from './RevisionHistoryPanel';
const { saveFeedbackToPromptLog } = require('./saveFeedbackToLog');

export default function StepDetailWrapper({ basePath, selectedStep }) {
  const [stepData, setStepData] = useState(selectedStep);

  const handleFeedbackSave = (updatedEntry) => {
    saveFeedbackToPromptLog(basePath, updatedEntry);
    setStepData({ ...updatedEntry });
  };

  const handleRestoreRevision = (revision) => {
    const restored = {
      ...stepData,
      prompt: revision.prompt,
      response: revision.response,
      feedback: revision.feedback
    };
    setStepData(restored);
  };

  return (
    <div className="space-y-4">
      <StepDetail step={stepData} onFeedbackSave={handleFeedbackSave} />
      <RevisionHistoryPanel stepData={stepData} onRestore={handleRestoreRevision} />
    </div>
  );
}
