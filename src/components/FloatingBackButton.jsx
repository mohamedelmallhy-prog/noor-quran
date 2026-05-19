import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingBackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1, x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleBack}
      className="fixed top-20 right-4 md:right-6 z-40 p-3 rounded-full bg-gold-700/20 hover:bg-gold-700/40 border border-gold-500/30 hover:border-gold-500/60 transition-all backdrop-blur-md"
    >
      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowRight size={20} className="text-gold-400" />
      </motion.div>
    </motion.button>
  );
};

export default FloatingBackButton;
