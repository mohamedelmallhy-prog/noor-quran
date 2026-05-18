import React from 'react';
import { motion } from 'framer-motion';

const SoundWaveAnimation = () => {
  const bars = Array.from({ length: 40 }, (_, i) => i);

  const barVariants = {
    animate: (custom) => ({
      height: [10, Math.random() * 60 + 20, 10],
      transition: {
        duration: Math.random() * 0.4 + 0.2,
        repeat: Infinity,
        delay: custom * 0.02,
      },
    }),
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-1 pointer-events-none">
      {bars.map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={barVariants}
          animate="animate"
          className="w-1 bg-gradient-to-t from-gold-500 to-gold-300 rounded-full opacity-60"
          style={{ minHeight: '10px' }}
        />
      ))}
    </div>
  );
};

export default SoundWaveAnimation;
