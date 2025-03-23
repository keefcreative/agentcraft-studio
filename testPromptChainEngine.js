// testPromptChainEngine.js
const path = require('path');
const { getChainedPrompt } = require('./PromptChainEngine');

const projectPath = path.join(__dirname, 'AI-Workspaces', 'Demo-TaskApp');
const stepIndex = 1; // Test chaining from Step 2

try {
  const result = getChainedPrompt(projectPath, stepIndex);
  console.log('\n🔁 Chained Prompt for Step', stepIndex, ':\n');
  console.log(result);
} catch (err) {
  console.error('❌ Test failed:', err.message);
}
