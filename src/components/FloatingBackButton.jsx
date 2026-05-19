import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const FloatingBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (isHome) {
    return null;
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, x: 4 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleBack}
      aria-label="عودة إلى الصفحة السابقة"
      className="fixed top-20 right-4 z-50 p-3 rounded-full bg-gold-700/20 hover:bg-gold-700/40 border border-gold-500/30 hover:border-gold-500/60 transition-all backdrop-blur-md shadow-2xl shadow-black/20 md:right-6 lg:right-8"
    >
      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowRight size={22} className="text-gold-300" />
      </motion.div>
    </motion.button>
  );
};

export default FloatingBackButton;
