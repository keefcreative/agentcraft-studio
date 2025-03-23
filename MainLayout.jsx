import React, { useState } from 'react';
import PromptFeedbackDashboard from './PromptFeedbackDashboard';
import StepDetailWrapper from './StepDetailWrapper';

export default function MainLayout({ basePath }) {
  const [selectedStep, setSelectedStep] = useState(null);

  return (
    <div className="p-6 space-y-6">
      <PromptFeedbackDashboard projectPath={basePath} onSelectStep={setSelectedStep} />
      {selectedStep && (
        <StepDetailWrapper basePath={basePath} selectedStep={selectedStep} />
      )}
    </div>
  );
}
