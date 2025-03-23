import React, { useState, useEffect } from 'react';
import WorkspaceSelector from './components/WorkspaceSelector';
import RulesUploader from './RulesUploader';
import SplashScreen from './components/SplashScreen';

export default function App() {
  const [basePath, setBasePath] = useState(null);
  const [splashComplete, setSplashComplete] = useState(false);

  useEffect(() => {
    const storedPath = localStorage.getItem('LAST_PROJECT_PATH');
    if (storedPath) setBasePath(storedPath);
  }, []);

  const handleSelectProject = (path) => {
    localStorage.setItem('LAST_PROJECT_PATH', path);
    setBasePath(path);
  };

  if (!splashComplete) {
    return <SplashScreen onReady={() => setSplashComplete(true)} />;
  }

  if (!basePath) {
    return <WorkspaceSelector onSelect={handleSelectProject} />;
  }

  return <RulesUploader initialBasePath={basePath} />;
}
