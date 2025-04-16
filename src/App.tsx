import { Croissant, Menu, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import OrderPage from './OrderPage';

// Define a type for cart items
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  // Add any other properties your cart items need
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems([...cartItems, item]);
  };

  if (currentPage === 'order') {
    return <OrderPage onBack={() => setCurrentPage('home')} onAddToCart={addToCart} cartItems={cartItems} />;
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Navigation */}
      <motion.nav 
        className="flex items-center justify-between mb-16 max-w-6xl mx-auto"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-16 h-16 bg-[#2B6B96] rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Croissant className="w-10 h-10 text-white" />
          </motion.div>
          <span className="text-2xl font-semibold text-[#2B6B96]">Jojo's</span>
        </div>
        <div className="hidden md:flex gap-8">
          <motion.a 
            href="#" 
            className="text-[#2B6B96] hover:text-[#1D4B6A]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.a>
          <motion.a 
            href="#" 
            className="text-[#2B6B96] hover:text-[#1D4B6A]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.a>
          <motion.a 
            href="#" 
            className="text-[#2B6B96] hover:text-[#1D4B6A]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact
          </motion.a>
        </div>
        <div className="flex items-center gap-4">
          <motion.button 
            className="relative"
            onClick={() => setCurrentPage('order')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="w-6 h-6 text-[#2B6B96]" />
            {cartItems.length > 0 && (
              <motion.span 
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                {cartItems.length}
              </motion.span>
            )}
          </motion.button>
          <motion.button 
            className="md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-6 h-6 text-[#2B6B96]" />
          </motion.button>
        </div>
      </motion.nav>

      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.div variants={fadeIn}>
            <h1 className="text-5xl font-serif text-[#2B6B96] mb-6">
              Delicious handcrafted pastries
            </h1>
            <p className="text-gray-700 mb-8">
              Indulge in our selection of freshly baked goods, made with the finest ingredients.
            </p>
            <motion.button 
              className="bg-[#2B6B96] text-white px-6 py-3 rounded-full hover:bg-[#1D4B6A] transition-colors"
              onClick={() => setCurrentPage('order')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
          </motion.div>
          <motion.div 
            className="bg-[#E8F4F9] rounded-3xl p-4 sm:p-8 flex items-center justify-center"
            variants={fadeIn}
          >
            <motion.img
              src="/images/croissant.jpg"
              alt="Fresh Croissant"
              className="w-full max-w-md rounded-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Featured Pastries */}
        <motion.section 
          className="mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.h2 
            className="text-4xl font-serif text-[#2B6B96] text-center mb-8"
            variants={fadeIn}
          >
            Featured Pastries
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: 'Croissant',
                image: '/images/croissant.jpg'
              },
              {
                name: 'Fruit Tart',
                image: '/images/fruit-tart.jpg'
              },
              {
                name: 'Cinnamon Roll',
                image: '/images/cinnamon-roll.jpg'
              },
              {
                name: 'Éclair',
                image: '/images/eclair.jpg'
              }
            ].map((pastry, index) => (
              <motion.div 
                key={index} 
                className="bg-[#E8F4F9] rounded-2xl p-4 flex flex-col items-center"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                  <motion.img
                    src={pastry.image}
                    alt={pastry.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <h3 className="text-center text-[#2B6B96] font-serif">{pastry.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.div 
            className="bg-[#E8F4F9] rounded-2xl p-5 sm:p-8 order-2 md:order-1"
            variants={fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2B6B96] mb-3 sm:mb-4">
              Sign up for our newsletter
            </h2>
            <p className="text-gray-700 mb-4 sm:mb-6">
              Get the latest updates on new arrivals, special offers, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B6B96]"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button 
                className="bg-[#2B6B96] text-white px-6 py-2 rounded-full hover:bg-[#1D4B6A] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
          <motion.div 
            className="bg-[#E8F4F9] rounded-2xl p-5 sm:p-8 order-1 md:order-2"
            variants={fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2B6B96] mb-3 sm:mb-4">
              Online Orders
            </h2>
            <p className="text-gray-700 mb-4 sm:mb-6">
              Order your favorite pastries online for pickup or delivery.
            </p>
            <motion.button 
              className="w-full bg-[#2B6B96] text-white px-6 py-3 rounded-full hover:bg-[#1D4B6A] transition-colors"
              onClick={() => setCurrentPage('order')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Order Online
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Reviews Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.h2 
            className="text-3xl font-serif text-[#2B6B96] mb-6"
            variants={fadeIn}
          >
            Customer Reviews
          </motion.h2>
          <motion.div 
            className="bg-[#E8F4F9] rounded-2xl p-8"
            variants={fadeIn}
          >
            <p className="text-gray-700 italic mb-4">
              "The best pastries in town! Absolutely delicious and always fresh."
            </p>
            <p className="text-[#2B6B96] font-semibold">Emily R.</p>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

export default App;