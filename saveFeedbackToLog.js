// Utility function to save updated feedback into prompt-log.json with revision history
const fs = require('fs');
const path = require('path');

function saveFeedbackToPromptLog(projectPath, updatedEntry) {
  const logPath = path.join(projectPath, 'prompt-log.json');
  let logData = { project: path.basename(projectPath), log: [] };

  if (fs.existsSync(logPath)) {
    try {
      logData = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
    } catch (err) {
      console.error('Failed to parse existing prompt log:', err);
    }
  }

  const existingStepIndex = logData.log.findIndex(e => e.step === updatedEntry.step);
  const newRevision = {
    prompt: updatedEntry.prompt,
    response: updatedEntry.response,
    feedback: updatedEntry.feedback,
    timestamp: new Date().toISOString()
  };

  if (existingStepIndex !== -1) {
    logData.log[existingStepIndex].revisions.push(newRevision);
  } else {
    logData.log.push({ step: updatedEntry.step, title: updatedEntry.title, revisions: [newRevision] });
  }

  fs.writeFileSync(logPath, JSON.stringify(logData, null, 2));
  console.log('✅ Feedback revision saved to prompt-log.json');
}

module.exports = { saveFeedbackToPromptLog };
