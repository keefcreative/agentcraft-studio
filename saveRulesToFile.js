// saveRulesToFile.js
const fs = require('fs');
const path = require('path');

function saveRulesToFile(projectPath, rulesYaml) {
  const filePath = path.join(projectPath, 'project.rules');
  try {
    fs.writeFileSync(filePath, rulesYaml);
    console.log('✅ Saved project.rules to:', filePath);
    return true;
  } catch (err) {
    console.error('❌ Failed to save project.rules:', err);
    return false;
  }
}

module.exports = { saveRulesToFile };
