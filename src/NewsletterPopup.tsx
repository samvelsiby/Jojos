import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface NewsletterPopupProps {
  onClose: () => void;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // In a real app, you would send this to your backend
      console.log('Newsletter signup:', email);
      
      // Close the popup after showing success message for 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-2xl p-6 max-w-md w-full relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#2B6B96] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white font-serif">$5</span>
          </div>
          <h2 className="text-2xl font-serif text-[#2B6B96] mb-2 italic">Special Offer</h2>
          <p className="text-gray-700 italic">Sign up for our newsletter and get $5 off your next order!</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B6B96]"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-[#2B6B96] text-white py-3 rounded-full hover:bg-[#1D4B6A] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get $5 Off
            </motion.button>
          </form>
        ) : (
          <motion.div 
            className="text-center py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-green-600 font-semibold mb-2 italic">Thank you for signing up!</p>
            <p className="text-gray-700 italic">Your $5 discount code will be sent to your email.</p>
          </motion.div>
        )}
        
        <p className="text-xs text-gray-500 mt-4 text-center italic">
          By signing up, you agree to receive promotional emails. You can unsubscribe at any time.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default NewsletterPopup;
