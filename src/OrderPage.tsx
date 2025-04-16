import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const pastries = [
  {
    id: 1,
    name: 'Classic Croissant',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300',
    description: 'Buttery, flaky, and perfectly golden-brown'
  },
  {
    id: 2,
    name: 'Fruit Tart',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300',
    description: 'Fresh seasonal fruits on vanilla custard'
  },
  {
    id: 3,
    name: 'Cinnamon Roll',
    price: 3.75,
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=300',
    description: 'Soft, gooey, with perfect cinnamon swirls'
  },
  {
    id: 4,
    name: 'Chocolate Éclair',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=300',
    description: 'Filled with rich chocolate cream'
  },
  {
    id: 5,
    name: 'Almond Croissant',
    price: 4.25,
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=300',
    description: 'Flaky croissant filled with almond cream'
  },
  {
    id: 6,
    name: 'Berry Danish',
    price: 3.75,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300',
    description: 'Mixed berries in a flaky Danish pastry'
  }
];

function OrderPage({ onBack, onAddToCart, cartItems }) {
  const [quantities, setQuantities] = useState({});
  const [orderType, setOrderType] = useState('pickup');
  const [showCheckout, setShowCheckout] = useState(false);

  const updateQuantity = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const addItemsToCart = () => {
    Object.entries(quantities).forEach(([id, quantity]) => {
      if (quantity > 0) {
        const pastry = pastries.find(p => p.id === parseInt(id));
        for (let i = 0; i < quantity; i++) {
          onAddToCart(pastry);
        }
      }
    });
    setShowCheckout(true);
  };

  const totalItems = Object.values(quantities).reduce((sum, q) => sum + q, 0);
  const subtotal = Object.entries(quantities).reduce((sum, [id, quantity]) => {
    const pastry = pastries.find(p => p.id === parseInt(id));
    return sum + (pastry.price * quantity);
  }, 0);

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

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-2xl mx-auto">
          <motion.button
            onClick={() => setShowCheckout(false)}
            className="flex items-center gap-2 text-[#2B6B96] mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </motion.button>

          <motion.h1 
            className="text-4xl font-serif text-[#2B6B96] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Checkout
          </motion.h1>

          <motion.form 
            className="space-y-6"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-2xl font-serif text-[#2B6B96] mb-4">Contact Information</h2>
              <div className="space-y-4">
                <motion.input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B6B96]"
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B6B96]"
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B6B96]"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h2 className="text-2xl font-serif text-[#2B6B96] mb-4">Order Details</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <motion.button
                    type="button"
                    className={`flex-1 py-2 rounded-lg ${
                      orderType === 'pickup'
                        ? 'bg-[#2B6B96] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setOrderType('pickup')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Pickup
                  </motion.button>
                  <motion.button
                    type="button"
                    className={`flex-1 py-2 rounded-lg ${
                      orderType === 'delivery'
                        ? 'bg-[#2B6B96] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setOrderType('delivery')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Delivery
                  </motion.button>
                </div>

                {orderType === 'delivery' && (
                  <motion.input
                    type="text"
                    placeholder="Delivery Address"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B6B96]"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    whileFocus={{ scale: 1.02 }}
                  />
                )}

                <motion.textarea
                  placeholder="Special Instructions"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B6B96]"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </motion.div>

            <motion.div 
              className="border-t pt-6"
              variants={fadeIn}
            >
              <div className="flex justify-between text-lg mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg mb-4">
                <span>Tax</span>
                <span>${(subtotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-[#2B6B96]">
                <span>Total</span>
                <span>${(subtotal * 1.08).toFixed(2)}</span>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-[#2B6B96] text-white py-3 rounded-full hover:bg-[#1D4B6A] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Place Order
            </motion.button>
          </motion.form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-[#2B6B96]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>
          <motion.div className="relative">
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
          </motion.div>
        </motion.div>

        <motion.h1 
          className="text-4xl font-serif text-[#2B6B96] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Order Online
        </motion.h1>

        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {pastries.map((pastry) => (
            <motion.div
              key={pastry.id}
              className="bg-[#E8F4F9] rounded-2xl p-6 flex gap-6"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
            >
              <motion.img
                src={pastry.image}
                alt={pastry.name}
                className="w-32 h-32 object-cover rounded-xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex-1">
                <h3 className="text-xl font-serif text-[#2B6B96] mb-2">
                  {pastry.name}
                </h3>
                <p className="text-gray-600 mb-2">{pastry.description}</p>
                <p className="text-[#2B6B96] font-semibold mb-4">
                  ${pastry.price.toFixed(2)}
                </p>
                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={() => updateQuantity(pastry.id, -1)}
                    className="text-[#2B6B96]"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  <span className="w-8 text-center">
                    {quantities[pastry.id] || 0}
                  </span>
                  <motion.button
                    onClick={() => updateQuantity(pastry.id, 1)}
                    className="text-[#2B6B96]"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-8 border-t pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-600">Total Items: {totalItems}</p>
              <p className="text-xl font-semibold text-[#2B6B96]">
                Subtotal: ${subtotal.toFixed(2)}
              </p>
            </div>
            <motion.button
              onClick={addItemsToCart}
              disabled={totalItems === 0}
              className={`px-8 py-3 rounded-full ${
                totalItems > 0
                  ? 'bg-[#2B6B96] text-white hover:bg-[#1D4B6A]'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              } transition-colors`}
              whileHover={totalItems > 0 ? { scale: 1.05 } : {}}
              whileTap={totalItems > 0 ? { scale: 0.95 } : {}}
            >
              Proceed to Checkout
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default OrderPage;