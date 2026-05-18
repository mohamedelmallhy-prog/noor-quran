import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function DuaCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
    >
      <div className="relative overflow-hidden rounded-3xl border border-gold-500/20 p-8 sm:p-12">
        {/* Gradient Background with Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-purple-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,165,116,0.15),transparent_40%)]" />
        
        {/* Heart Icon with Animation */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-6 right-6 text-gold-500/30"
        >
          <Heart size={64} fill="currentColor" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-right space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-end gap-3"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gold-300">دعاء خاص</h2>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Heart size={28} className="text-gold-500" fill="currentColor" />
            </motion.div>
          </motion.div>

          {/* Main Text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg sm:text-xl leading-relaxed text-gray-200">
              لا تنسوا الدعاء بالرحمة والمغفرة لـ:
            </p>

            <div className="space-y-3 py-6 px-6 bg-dark-800/50 rounded-2xl border border-gold-500/10">
              <p className="text-xl sm:text-2xl font-semibold text-gold-300">جدي محمد درويش الملاحي</p>
              <p className="text-lg text-gold-300">وجدتي رحمها الله</p>
              <p className="text-lg text-gold-300">وابن عمي أحمد شوقي الملاحي</p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center py-6 px-6 bg-gradient-to-r from-gold-500/10 to-purple-500/10 rounded-2xl border border-gold-500/20"
            >
              <p className="text-lg sm:text-xl leading-relaxed text-gray-100 font-semibold">
                اللهم اغفر لهم وارحمهم واجعل قبورهم روضة من رياض الجنة
              </p>
            </motion.div>

            <p className="text-base text-gray-400 leading-relaxed">
              اللهم إن لهم حقاً على كل مسلم، فادعُ لهم بالرحمة والمغفرة والعفو والعافية.
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <motion.div
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-1 bg-gradient-to-r from-transparent to-gold-500"
            />
            <span className="text-gold-500">🤲</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-1 bg-gradient-to-l from-transparent to-gold-500"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
