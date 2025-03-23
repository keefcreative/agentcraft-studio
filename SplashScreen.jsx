import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onReady }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + Math.random() * 20, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onReady, 400);
        }
        return next;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [onReady]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="text-3xl font-bold tracking-tight mb-6">⚙️ AgentCraft Studio</div>
      <div className="w-64 h-2 bg-white/20 rounded overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-white/70 mt-2">Loading…</p>
    </div>
  );
}
