import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Headphones, BookOpen, Heart, Settings, Share2, Sunrise, Clock, Repeat, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: Home, label: 'الرئيسية', href: '/', id: 'home' },
    { icon: Headphones, label: 'استمع', href: '/listen', id: 'listen' },
    { icon: BookOpen, label: 'اقرأ', href: '/read', id: 'read' },
    { icon: Sunrise, label: 'الأذكار', href: '/adhkar', id: 'adhkar' },
    { icon: Clock, label: 'مواقيت الصلاة', href: '/prayer-times', id: 'prayer-times' },
    { icon: Repeat, label: 'المسبحة الرقمية', href: '/tasbeeh', id: 'tasbeeh' },
    { icon: Brain, label: 'الاختبار الإسلامي', href: '/quiz', id: 'quiz' },
    { icon: Heart, label: 'المفضلة', href: '#', id: 'favorites' },
    { icon: Settings, label: 'الإعدادات', href: '#', id: 'settings' },
  ];

  const sidebarVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          />

          {/* Sidebar */}
          <motion.nav
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 h-screen w-64 bg-dark-800 border-l border-gold-700/20 z-40 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gold-700/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                  <span className="text-xl font-bold text-gold-900">ق</span>
                </div>
                <span className="text-lg font-bold text-gradient">Quran</span>
              </div>
              <button
                onClick={onClose}
                aria-label="إغلاق القائمة"
                className="absolute top-4 right-4 p-2 hover:bg-gold-700/20 rounded-full transition-all border border-gold-500/20 hover:border-gold-500/50 shadow-lg shadow-black/20 z-50"
              >
                <X size={22} className="text-gold-300" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gold-700/10 text-gray-300 hover:text-gold-400 transition-all group"
                  >
                    <item.icon size={20} className="group-hover:text-gold-500 transition-colors" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer Section */}
            <div className="border-t border-gold-700/20 p-4 space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-gold text-dark-900 font-semibold hover:bg-gold-400 transition-all"
              >
                <Share2 size={16} />
                Share
              </motion.button>
              <p className="text-xs text-gray-500 text-center">
                  © 2026 Mohamed Elmallahy
              </p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
