import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, link, color }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group relative"
    >
      <Link to={link} className="block h-full">
        <div className="glass-dark h-full rounded-2xl p-5 sm:p-6 border border-gold-500/20 hover:border-gold-500/50 transition-all card-responsive">
          {/* Background Glow */}
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${color}`} />

          {/* Content */}
          <div className="relative z-10">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <Icon size={24} className="text-white" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm mb-6">{description}</p>

            <div className="flex items-center text-gold-400 text-sm font-semibold group-hover:gap-2 gap-0 transition-all">
              Explore
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeatureCard;
