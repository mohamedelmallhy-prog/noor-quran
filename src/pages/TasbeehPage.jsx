import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Volume2, Settings } from 'lucide-react';

const ADHKAR_OPTIONS = [
  { id: 'subhan', text: 'سبحان الله', ar: 'Subhan Allah', color: 'from-blue-500 to-blue-600' },
  { id: 'alhamd', text: 'الحمد لله', ar: 'Al-hamdu lillah', color: 'from-green-500 to-green-600' },
  { id: 'akbar', text: 'الله أكبر', ar: 'Allahu Akbar', color: 'from-red-500 to-red-600' },
  { id: 'tawheed', text: 'لا إله إلا الله', ar: 'La ilaha illallah', color: 'from-purple-500 to-purple-600' },
  { id: 'istighfar', text: 'أستغفر الله', ar: 'Astaghfirullahul azim', color: 'from-orange-500 to-orange-600' },
  { id: 'salawat', text: 'اللهم صل وسلم على نبينا محمد', ar: 'Allahumma salli wa sallim', color: 'from-pink-500 to-pink-600' },
];

const DAILY_TARGET = 1000;

export default function TasbeehPage() {
  const [selectedAdhkar, setSelectedAdhkar] = useState(ADHKAR_OPTIONS[0]);
  const [count, setCount] = useState(0);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [targetReached, setTargetReached] = useState(false);
  const buttonRef = useRef(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const today = new Date().toDateString();
    const savedData = JSON.parse(localStorage.getItem('tasbeehData')) || {
      date: today,
      daily: 0,
    };

    // Reset if new day
    if (savedData.date !== today) {
      savedData.date = today;
      savedData.daily = 0;
    }

    setDailyTotal(savedData.daily);
    setTargetReached(savedData.daily >= DAILY_TARGET);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const newDaily = dailyTotal + count;

    localStorage.setItem(
      'tasbeehData',
      JSON.stringify({
        date: today,
        daily: newDaily,
      })
    );
  }, [count, dailyTotal]);

  const handleIncrement = () => {
    const newCount = count + 1;
    const newDaily = dailyTotal + 1;

    setCount(newCount);
    setDailyTotal(newDaily);

    // Vibration feedback
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

    // Play sound (optional)
    playBeep();

    // Check if target reached
    if (newDaily >= DAILY_TARGET && !targetReached) {
      setTargetReached(true);
      celebrateCompletion();
    }

    // Button animation
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'scale(0.95)';
      setTimeout(() => {
        buttonRef.current.style.transform = 'scale(1)';
      }, 100);
    }
  };

  const handleReset = () => {
    if (window.confirm('هل تريد تصفير العداد الحالي؟')) {
      setCount(0);
    }
  };

  const handleResetDaily = () => {
    if (window.confirm('هل تريد تصفير المجموع اليومي؟ سيؤثر هذا على الإحصائيات!')) {
      setDailyTotal(0);
      setTargetReached(false);
      localStorage.setItem(
        'tasbeehData',
        JSON.stringify({
          date: new Date().toDateString(),
          daily: 0,
        })
      );
    }
  };

  const playBeep = () => {
    // Create a simple beep sound
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Audio context not available
    }
  };

  const celebrateCompletion = () => {
    // Vibration pattern for celebration
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
  };

  const progressPercentage = Math.min((dailyTotal / DAILY_TARGET) * 100, 100);
  const remaining = Math.max(DAILY_TARGET - dailyTotal, 0);

  const adhkarColor = selectedAdhkar.color;

  return (
    <div className="min-h-screen bg-dark-900 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-dark-950 py-16 sm:py-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,165,116,0.12),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-right">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">المسبحة الرقمية</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            احسب تسبيحك وأذكارك بسهولة مع عداد يومي وإحصائيات متقدمة
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Counter Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Adhkar Selector */}
            <div className="glass-dark rounded-2xl border border-gold-500/20 p-8">
              <h2 className="text-xl font-bold text-gold-300 mb-6 text-right">اختر الذكر</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ADHKAR_OPTIONS.map((adhkar) => (
                  <motion.button
                    key={adhkar.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedAdhkar(adhkar);
                      setCount(0);
                    }}
                    className={`p-4 rounded-xl font-semibold transition-all ${
                      selectedAdhkar.id === adhkar.id
                        ? `bg-gradient-to-br ${adhkar.color} text-white shadow-lg`
                        : 'bg-dark-700/50 text-gray-300 hover:bg-dark-700 border border-gold-500/10'
                    }`}
                  >
                    <div className="text-sm sm:text-xs">{adhkar.text}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Main Counter Display */}
            <div className="glass-dark rounded-2xl border border-gold-500/20 p-12 sm:p-16">
              <div className="flex flex-col items-center justify-center space-y-8">
                {/* Adhkar Name */}
                <motion.div
                  key={selectedAdhkar.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <p className="text-sm text-gray-400 mb-2">الذكر الحالي</p>
                  <h2 className={`text-4xl sm:text-5xl font-black bg-gradient-to-r ${selectedAdhkar.color} bg-clip-text text-transparent`}>
                    {selectedAdhkar.text}
                  </h2>
                  <p className="text-gold-400 text-lg mt-2">{selectedAdhkar.ar}</p>
                </motion.div>

                {/* Large Counter Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className="relative"
                >
                  <div className="text-9xl sm:text-[150px] font-black text-gold-400 text-center leading-none font-mono">
                    {count.toString().padStart(4, '0')}
                  </div>
                  <motion.div
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 text-9xl sm:text-[150px] font-black text-gold-300 text-center leading-none pointer-events-none"
                  >
                    +1
                  </motion.div>
                </motion.div>

                {/* Main Counter Button */}
                <motion.button
                  ref={buttonRef}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleIncrement}
                  className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br ${selectedAdhkar.color} text-white font-black text-4xl sm:text-5xl shadow-2xl flex items-center justify-center transition-transform cursor-pointer`}
                  style={{ boxShadow: `0 0 50px rgba(212, 165, 116, 0.4)` }}
                >
                  +1
                </motion.button>

                {/* Session Stats */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-dark-800/50 rounded-xl p-4 text-center border border-gold-500/10"
                  >
                    <p className="text-gray-500 text-xs mb-2">في هذه الجلسة</p>
                    <p className="text-2xl sm:text-3xl font-black text-gold-400">{count}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-dark-800/50 rounded-xl p-4 text-center border border-gold-500/10"
                  >
                    <p className="text-gray-500 text-xs mb-2">المتبقي اليوم</p>
                    <p className="text-2xl sm:text-3xl font-black text-gold-400">{remaining.toLocaleString('ar')}</p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="glass-dark rounded-xl border border-gold-500/20 px-6 py-4 text-gold-300 font-semibold hover:bg-gold-500/10 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                إعادة تعيين الجلسة
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResetDaily}
                className="glass-dark rounded-xl border border-red-500/20 px-6 py-4 text-red-400 font-semibold hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                إعادة يومية
              </motion.button>
            </div>
          </motion.div>

          {/* Statistics Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Daily Progress */}
            <div className="glass-dark rounded-2xl border border-gold-500/20 p-8">
              <h3 className="text-lg font-bold text-gold-300 mb-6 text-right">الإحصائيات اليومية</h3>

              {/* Circular Progress */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    {/* Background circle */}
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(212, 165, 116, 0.1)" strokeWidth="8" />
                    {/* Progress circle */}
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 54}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - progressPercentage / 100) }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d4a574" />
                        <stop offset="100%" stopColor="#fef8e9" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <p className="text-sm text-gray-400 mb-1">التقدم</p>
                    <p className="text-3xl font-black text-gold-400">{Math.round(progressPercentage)}%</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="space-y-4">
                <div className="bg-dark-800/50 rounded-lg p-4 border border-gold-500/10">
                  <p className="text-gray-500 text-sm mb-1">المجموع اليومي</p>
                  <p className="text-2xl font-black text-gold-400">{dailyTotal.toLocaleString('ar')}</p>
                </div>

                <div className="bg-dark-800/50 rounded-lg p-4 border border-gold-500/10">
                  <p className="text-gray-500 text-sm mb-1">الهدف اليومي</p>
                  <p className="text-2xl font-black text-gold-400">{DAILY_TARGET.toLocaleString('ar')}</p>
                </div>

                {targetReached && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30"
                  >
                    <p className="text-green-300 font-semibold text-center">🎉 لقد وصلت للهدف!</p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Tips Section */}
            <div className="glass-dark rounded-2xl border border-gold-500/20 p-8">
              <h3 className="text-lg font-bold text-gold-300 mb-4 text-right">نصائح</h3>
              <ul className="space-y-3 text-sm text-gray-400 leading-relaxed">
                <li>✨ حاول أن تصل إلى 1000 تسبيحة يوميًا</li>
                <li>🔔 ستتلقى اهتزازات تنبيهية مع كل تسبيحة</li>
                <li>💾 يتم حفظ الإحصائيات تلقائيًا</li>
                <li>🎯 تُعاد العدادات يوميًا تلقائيًا</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Islamic Wisdom Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="glass-dark rounded-2xl border border-gold-500/20 p-8 sm:p-12 text-right">
          <h2 className="text-2xl sm:text-3xl font-bold text-gold-300 mb-6">فضل الذكر</h2>
          <div className="space-y-4 text-gray-300">
            <p className="leading-relaxed">
              📖 قال رسول الله ﷺ: "مثل الذي يذكر ربه والذي لا يذكره مثل الحي والميت"
            </p>
            <p className="leading-relaxed">
              ✨ الذكر يطهر القلب والنفس، ويزيل الهموم والأحزان، ويقرب العبد من ربه تعالى.
            </p>
            <p className="leading-relaxed">
              🌟 قال تعالى: "الذين آمنوا وتطمئن قلوبهم بذكر الله ألا بذكر الله تطمئن القلوب"
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
