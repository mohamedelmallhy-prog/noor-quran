import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Share2, Volume2 } from 'lucide-react';

const AyahReader = ({ verses = [], textSize = 'base' }) => {
  const [selectedAyah, setSelectedAyah] = useState(null);

  const textSizeMap = {
    sm: 'text-xl',
    base: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {verses.map((ayah, index) => (
        <motion.div
          key={ayah.number || index}
          variants={itemVariants}
          whileHover={{ x: 2 }}
          onClick={() => setSelectedAyah(selectedAyah === ayah.number ? null : ayah.number)}
          className={`p-6 rounded-3xl border transition-all cursor-pointer ${
            selectedAyah === ayah.number
              ? 'border-gold-500 bg-gold-500/10'
              : 'border-gold-500/20 hover:border-gold-500/40 bg-dark-800/60'
          }`}
        >
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="inline-flex items-center justify-center rounded-full border border-gold-500/20 bg-gold-500/10 px-3 py-1 text-sm font-semibold text-gold-200">
              الآية {ayah.number}
            </span>
            <div className="flex items-center gap-2">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-2 hover:bg-dark-700 rounded-lg transition-colors">
                <Volume2 size={16} className="text-gold-400" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-2 hover:bg-dark-700 rounded-lg transition-colors">
                <Copy size={16} className="text-gold-400" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-2 hover:bg-dark-700 rounded-lg transition-colors">
                <Share2 size={16} className="text-gold-400" />
              </motion.button>
            </div>
          </div>

          <motion.p
            className={`${textSizeMap[textSize]} font-extrabold text-white text-right leading-relaxed tracking-wide`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {ayah.arabic}
          </motion.p>

          <div className="border-t border-gold-500/10 my-4" />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="space-y-3">
            <div>
              <p className="text-xs text-gray-400 mb-1">الترجمة الإنجليزية</p>
              <p className="text-base text-gray-300 leading-relaxed">{ayah.translation}</p>
            </div>
            {ayah.sajdah && (
              <div className="rounded-2xl bg-gold-500/10 p-3 text-sm text-gold-200">
                هذه الآية تحتوي على سجدة.
              </div>
            )}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AyahReader;
