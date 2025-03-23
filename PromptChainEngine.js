// PromptChainEngine.js
const fs = require('fs');
const path = require('path');

function getChainedPrompt(projectPath, stepIndex) {
  const rulesPath = path.join(projectPath, 'project.rules');
  const logPath = path.join(projectPath, 'prompt-log.json');

  if (!fs.existsSync(rulesPath)) throw new Error('Missing project.rules');

  const rules = fs.readFileSync(rulesPath, 'utf-8');
  const parsed = parseYaml(rules);
  const steps = parsed.steps || [];

  if (!steps[stepIndex]) throw new Error('Step not found');

  const previous = stepIndex > 0 ? steps[stepIndex - 1] : null;
  const current = steps[stepIndex];

  let log = [];
  if (fs.existsSync(logPath)) {
    try {
      log = JSON.parse(fs.readFileSync(logPath, 'utf-8')).log || [];
    } catch (_) {}
  }

  const prevLog = log.find(l => l.step === stepIndex);
  const prevFeedback = prevLog?.feedback?.notes || '';
  const prevResponse = prevLog?.response || '';

  const context = [];
  if (previous) context.push(`The previous step was: ${previous.title}\n${previous.description}`);
  if (prevResponse) context.push(`AI response: ${prevResponse}`);
  if (prevFeedback) context.push(`Feedback: ${prevFeedback}`);

  return [
    ...context,
    `\nNow complete the next step: ${current.title}\n${current.description}`
  ].join('\n\n');
}

function parseYaml(str) {
  try {
    const yaml = require('js-yaml');
    return yaml.load(str);
  } catch (err) {
    console.error('❌ YAML parse error:', err);
    return {};
  }
}

module.exports = { getChainedPrompt };
