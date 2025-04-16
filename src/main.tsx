import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import App from './App.tsx';
import SplashAnimation from './SplashAnimation.tsx';
import './index.css';

const Root = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleAnimationComplete = () => {
    setShowSplash(false);
  };

  return (
    <StrictMode>
      {showSplash && <SplashAnimation onAnimationComplete={handleAnimationComplete} />}
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<Root />);
