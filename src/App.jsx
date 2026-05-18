import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ListenQuranPage from './pages/ListenQuranPage';
import ReadQuranPage from './pages/ReadQuranPage';
import AdhkarPage from './pages/AdhkarPage';
import PrayerTimesPage from './pages/PrayerTimesPage';
import TasbeehPage from './pages/TasbeehPage';
import QuizPage from './pages/QuizPage';
import ScrollToTop from './components/ScrollToTop';
import DuaCard from './components/DuaCard';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((value) => !value);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-dark-900 text-white">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />

          <motion.main
            className="flex-1 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/listen" element={<ListenQuranPage />} />
              <Route path="/read" element={<ReadQuranPage />} />
              <Route path="/adhkar" element={<AdhkarPage />} />
              <Route path="/prayer-times" element={<PrayerTimesPage />} />
              <Route path="/tasbeeh" element={<TasbeehPage />} />
              <Route path="/quiz" element={<QuizPage />} />
            </Routes>
          </motion.main>

          {/* Dua Section before Footer */}
          <DuaCard />

          <footer className="border-t border-gold-500/10 bg-dark-900/90 text-gray-400 text-center py-4 px-4">
            © 2026 Mohamed Elmallahy
          </footer>
        </div>

        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
