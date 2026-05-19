import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Search, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  return (
    <motion.nav
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-dark-800/90 backdrop-blur-lg border-b border-gold-700/20 sticky top-0 z-20"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 navbar-compact">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-3">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenuClick}
              className="p-2 hover:bg-gold-700/10 rounded-lg transition-colors"
            >
              <Menu size={24} className="text-gold-500" />
            </motion.button>

            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                <span className="text-lg font-black text-dark-900">ق</span>
              </div>
              <span className="text-lg font-bold text-gradient hidden sm:inline">القرآن</span>
            </Link>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <motion.div whileFocus={{ scale: 1.02 }} className="w-full relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-500" size={18} />
              <input
                type="text"
                placeholder="ابحث عن السور أو الآيات"
                className="w-full bg-dark-700/50 border border-gold-700/20 rounded-lg pr-10 pl-4 py-2 text-sm text-gray-100 focus:outline-none focus:border-gold-500 focus:bg-dark-700 transition-all"
              />
            </motion.div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gold-700/10 rounded-lg transition-colors relative"
            >
              <Bell size={20} className="text-gold-500" />
              <span className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-dark-900 font-bold text-sm"
            >
              ن
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
