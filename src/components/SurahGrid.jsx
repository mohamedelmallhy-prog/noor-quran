import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const SurahGrid = () => {
  const surahs = [
    { id: 1, name: 'Al-Fatiha', meaning: 'The Opening', verses: 7 },
    { id: 2, name: 'Al-Baqarah', meaning: 'The Cow', verses: 286 },
    { id: 3, name: 'Ali Imran', meaning: 'The Family of Imran', verses: 200 },
    { id: 4, name: 'An-Nisa', meaning: 'The Women', verses: 176 },
    { id: 5, name: 'Al-Maidah', meaning: 'The Table Spread', verses: 120 },
    { id: 6, name: 'Al-Anam', meaning: 'The Cattle', verses: 165 },
    { id: 55, name: 'Ar-Rahman', meaning: 'The Merciful', verses: 78 },
    { id: 67, name: 'Al-Mulk', meaning: 'The Kingdom', verses: 30 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {surahs.map((surah) => (
        <motion.div
          key={surah.id}
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="group relative"
        >
          <div className="glass-dark rounded-xl p-6 border border-gold-500/20 hover:border-gold-500/50 transition-all cursor-pointer h-full">
            {/* Number Badge */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 font-bold text-sm border border-gold-500/30">
              {surah.id}
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white mb-1">{surah.name}</h3>
              <p className="text-sm text-gold-400 mb-2">{surah.meaning}</p>
              <p className="text-xs text-gray-500">{surah.verses} Verses</p>
            </div>

            {/* Play Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-semibold text-sm hover:shadow-gold transition-all"
            >
              <Play size={14} fill="currentColor" />
              Listen
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SurahGrid;
