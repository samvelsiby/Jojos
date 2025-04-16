import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Croissant } from 'lucide-react';

interface SplashAnimationProps {
  onAnimationComplete: () => void;
}

const SplashAnimation: React.FC<SplashAnimationProps> = ({ onAnimationComplete }) => {
  const [animationStage, setAnimationStage] = useState<'logo' | 'reveal' | 'complete'>('logo');

  useEffect(() => {
    // First stage: Show logo for 2 seconds
    const logoTimer = setTimeout(() => {
      setAnimationStage('reveal');
    }, 2000);

    // Second stage: Reveal animation for 1 second
    const revealTimer = setTimeout(() => {
      setAnimationStage('complete');
      onAnimationComplete();
    }, 3000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(revealTimer);
    };
  }, [onAnimationComplete]);

  return (
    <AnimatePresence>
      {animationStage !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B6B96]"
          initial={{ opacity: 1 }}
          animate={animationStage === 'reveal' ? { 
            opacity: 0,
            clipPath: 'circle(0% at center)' 
          } : { 
            opacity: 1,
            clipPath: 'circle(100% at center)' 
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: animationStage === 'reveal' ? 1 : 0.5,
            ease: "easeInOut" 
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-4"
              animate={{ 
                scale: animationStage === 'reveal' ? [1, 1.2, 0.8] : 1
              }}
              transition={{ duration: 0.5 }}
            >
              <Croissant className="w-20 h-20 text-[#2B6B96]" />
            </motion.div>
            <motion.span 
              className="text-4xl font-semibold text-white font-serif"
              animate={{ 
                y: animationStage === 'reveal' ? [0, -20] : 0,
                opacity: animationStage === 'reveal' ? [1, 0] : 1
              }}
              transition={{ duration: 0.5 }}
            >
              Jojo's
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashAnimation;
