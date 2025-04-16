import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import App from './App.tsx';
import SplashAnimation from './SplashAnimation.tsx';
import NewsletterPopup from './NewsletterPopup.tsx';
import './index.css';

const Root = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showNewsletter, setShowNewsletter] = useState(false);

  const handleAnimationComplete = () => {
    setShowSplash(false);
    // Show newsletter popup after a short delay when splash animation completes
    setTimeout(() => {
      setShowNewsletter(true);
    }, 1000);
  };

  const handleCloseNewsletter = () => {
    setShowNewsletter(false);
    // Save to localStorage to prevent showing again in the same session
    localStorage.setItem('newsletterShown', 'true');
  };

  // Check if we should show the newsletter (not shown before in this session)
  useEffect(() => {
    const hasSeenNewsletter = localStorage.getItem('newsletterShown') === 'true';
    if (hasSeenNewsletter) {
      setShowNewsletter(false);
    }
  }, []);

  return (
    <StrictMode>
      {showSplash && <SplashAnimation onAnimationComplete={handleAnimationComplete} />}
      {showNewsletter && <NewsletterPopup onClose={handleCloseNewsletter} />}
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<Root />);
