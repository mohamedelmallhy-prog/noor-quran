import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RotateCcw, ChevronDown, ChevronUp, Sun, Moon } from 'lucide-react';

const MORNING_ADHKAR = [
  {
    title: 'النية والاستيقاظ',
    adhkar: [
      {
        text: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
        translation: 'All praise be to Allah who has given us life after causing us to die and unto Him is the resurrection.',
        count: 1,
      },
    ],
  },
  {
    title: 'دخول الحمام',
    adhkar: [
      {
        text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبْثِ وَالْخَبَائِثِ',
        translation: 'O Allah, I seek refuge with You from the foul and the evil things.',
        count: 1,
      },
    ],
  },
  {
    title: 'التشهد عند الدخول',
    adhkar: [
      {
        text: 'التَّشَهُّدُ وَالدُّعَاءُ',
        translation: 'At-Tashahud and Supplication',
        count: 1,
      },
    ],
  },
  {
    title: 'أذكار الصباح الرئيسية',
    adhkar: [
      {
        text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',
        translation: 'Glory be to Allah and praise be to Him. Glory be to Allah the Mighty.',
        count: 100,
      },
      {
        text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        translation: 'There is no god but Allah alone, with no partners for Him. To Him belongs the dominion and to Him belongs all praise, and He is over all things competent.',
        count: 10,
      },
      {
        text: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ',
        translation: 'Glory be to Allah, praise be to Allah, there is no god but Allah, Allah is the Greatest, and there is no power nor strength except with Allah, the Most High, the Mighty.',
        count: 1,
      },
    ],
  },
  {
    title: 'آية الكرسي',
    adhkar: [
      {
        text: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
        translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.',
        count: 1,
      },
    ],
  },
  {
    title: 'آخر آيات سورة الحشر',
    adhkar: [
      {
        text: 'هُوَ اللَّهُ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ ۚ سُبْحَانَ اللَّهِ عَمَّا يُشْرِكُونَ',
        translation: 'He is Allah, other than whom there is no deity, the Sovereign, the Pure, the Perfection, the Bestower of Faith, the Overseer, the Exalted in Might, the Compeller, the Superior. Exalted is Allah above whatever they associate with Him.',
        count: 1,
      },
    ],
  },
  {
    title: 'سورة الإخلاص والمعوذتان',
    adhkar: [
      {
        text: 'سُورَة الإِخْلاَص وَالْمُعَوِّذَتَان (3 مرات)',
        translation: 'Surah Al-Ikhlas and the two Surahs of Seeking Refuge (3 times)',
        count: 3,
        type: 'quran',
      },
    ],
  },
];

const EVENING_ADHKAR = [
  {
    title: 'أذكار المساء الرئيسية',
    adhkar: [
      {
        text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',
        translation: 'Glory be to Allah and praise be to Him. Glory be to Allah the Mighty.',
        count: 100,
      },
      {
        text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        translation: 'There is no god but Allah alone, with no partners for Him. To Him belongs the dominion and to Him belongs all praise, and He is over all things competent.',
        count: 10,
      },
    ],
  },
  {
    title: 'تسبيح المساء',
    adhkar: [
      {
        text: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ',
        translation: 'Glory be to Allah, praise be to Allah, there is no god but Allah, and Allah is the Greatest.',
        count: 33,
      },
    ],
  },
  {
    title: 'الدعاء عند المساء',
    adhkar: [
      {
        text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ، اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا',
        translation: 'We have reached the evening and Allah, the Lord of the worlds has reached the evening. O Allah, I ask You for the good of this night and the good of what comes after it.',
        count: 1,
      },
      {
        text: 'أَمْسَيْنَا عَلَى فِطْرَةِ اللَّهِ وَنِعَمِ اللَّهِ وَوَلَايَةِ اللَّهِ وَرِسُولِهِ',
        translation: 'We have reached the evening upon the nature of Allah, the blessings of Allah, the authority of Allah, and of His Messenger.',
        count: 1,
      },
    ],
  },
  {
    title: 'آية الكرسي',
    adhkar: [
      {
        text: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
        translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.',
        count: 1,
      },
    ],
  },
  {
    title: 'سورة الإخلاص والمعوذتان',
    adhkar: [
      {
        text: 'سُورَة الإِخْلاَص وَالْمُعَوِّذَتَان (3 مرات)',
        translation: 'Surah Al-Ikhlas and the two Surahs of Seeking Refuge (3 times)',
        count: 3,
        type: 'quran',
      },
    ],
  },
  {
    title: 'الدعاء قبل النوم',
    adhkar: [
      {
        text: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
        translation: 'O Allah, in Your name I die and live.',
        count: 1,
      },
    ],
  },
];

export default function AdhkarPage() {
  const [activeTab, setActiveTab] = useState('morning');
  const [expandedSections, setExpandedSections] = useState({});
  const [counters, setCounters] = useState({});

  const adhkarList = activeTab === 'morning' ? MORNING_ADHKAR : EVENING_ADHKAR;

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const resetCounter = (sectionIdx, adhkarIdx) => {
    const key = `${sectionIdx}-${adhkarIdx}`;
    setCounters((prev) => ({
      ...prev,
      [key]: 0,
    }));
  };

  const incrementCounter = (sectionIdx, adhkarIdx, requiredCount) => {
    const key = `${sectionIdx}-${adhkarIdx}`;
    const currentCount = counters[key] || 0;
    if (currentCount < requiredCount) {
      setCounters((prev) => ({
        ...prev,
        [key]: currentCount + 1,
      }));
    }
  };

  const getCounterStatus = (sectionIdx, adhkarIdx, requiredCount) => {
    const key = `${sectionIdx}-${adhkarIdx}`;
    const currentCount = counters[key] || 0;
    return { current: currentCount, required: requiredCount };
  };

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
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">أذكار الصباح والمساء</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            أذكار يومية أصيلة لتبدأ يومك بالحمد والشكر وتختمه بالذكر والدعاء
          </p>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-10 bg-dark-900/95 backdrop-blur-md border-b border-gold-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('morning')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'morning'
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                  : 'text-gray-400 hover:text-gold-300'
              }`}
            >
              <Sun size={20} />
              أذكار الصباح
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('evening')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'evening'
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                  : 'text-gray-400 hover:text-gold-300'
              }`}
            >
              <Moon size={20} />
              أذكار المساء
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {adhkarList.map((section, sectionIdx) => (
              <motion.div
                key={sectionIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIdx * 0.05 }}
                className="glass-dark rounded-2xl border border-gold-500/20 overflow-hidden"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(sectionIdx)}
                  className="w-full px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-between hover:bg-gold-500/5 transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1 text-right">
                    <motion.div
                      animate={{ rotate: expandedSections[sectionIdx] ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {expandedSections[sectionIdx] ? (
                        <ChevronUp size={20} className="text-gold-500" />
                      ) : (
                        <ChevronDown size={20} className="text-gold-500" />
                      )}
                    </motion.div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gold-300 group-hover:text-gold-200 transition-colors">
                      {section.title}
                    </h2>
                  </div>
                  <span className="text-sm text-gray-500 ml-4">
                    {section.adhkar.length} {section.adhkar.length === 1 ? 'ذكر' : 'أذكار'}
                  </span>
                </button>

                {/* Section Content */}
                <AnimatePresence>
                  {expandedSections[sectionIdx] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-gold-500/10 bg-dark-800/50"
                    >
                      <div className="px-6 sm:px-8 py-6 space-y-4">
                        {section.adhkar.map((adhkar, adhkarIdx) => {
                          const counter = getCounterStatus(sectionIdx, adhkarIdx, adhkar.count);
                          const isCompleted = counter.current >= counter.required;

                          return (
                            <motion.div
                              key={adhkarIdx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: adhkarIdx * 0.05 }}
                              className={`p-5 rounded-xl border transition-all ${
                                isCompleted
                                  ? 'bg-gold-500/10 border-gold-500/30'
                                  : 'bg-dark-700/50 border-gold-500/10 hover:border-gold-500/20'
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                {/* Text Content */}
                                <div className="flex-1 text-right">
                                  <p className="text-lg sm:text-xl leading-relaxed text-gold-100 font-semibold mb-3">
                                    {adhkar.text}
                                  </p>
                                  {adhkar.translation && (
                                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4">
                                      "{adhkar.translation}"
                                    </p>
                                  )}

                                  {/* Counter Section */}
                                  <div className="flex items-center gap-3 justify-end mt-4 pt-4 border-t border-gold-500/10">
                                    <div className="text-sm font-medium">
                                      <span className={isCompleted ? 'text-gold-400' : 'text-gray-400'}>
                                        {counter.current}
                                      </span>
                                      <span className="text-gray-600 mx-1">/</span>
                                      <span className="text-gray-500">{counter.required}</span>
                                    </div>

                                    {counter.required > 1 && (
                                      <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => resetCounter(sectionIdx, adhkarIdx)}
                                        className="p-2 hover:bg-gold-500/10 rounded-lg transition-colors"
                                        title="إعادة تعيين"
                                      >
                                        <RotateCcw size={16} className="text-gray-500 hover:text-gold-400" />
                                      </motion.button>
                                    )}
                                  </div>
                                </div>

                                {/* Counter Button */}
                                {counter.required > 1 && (
                                  <motion.button
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.92 }}
                                    onClick={() => incrementCounter(sectionIdx, adhkarIdx, counter.required)}
                                    disabled={isCompleted}
                                    className={`flex-shrink-0 w-16 h-16 rounded-full font-bold text-lg flex items-center justify-center transition-all ${
                                      isCompleted
                                        ? 'bg-gradient-to-br from-gold-500 to-gold-600 text-dark-900 shadow-lg'
                                        : 'bg-gold-500/20 text-gold-300 hover:bg-gold-500/30 border border-gold-500/30'
                                    }`}
                                  >
                                    {counter.current}
                                  </motion.button>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="glass-dark rounded-2xl border border-gold-500/20 p-8 sm:p-12 text-right">
          <h2 className="text-2xl sm:text-3xl font-bold text-gold-300 mb-6">فضل الأذكار اليومية</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <p className="leading-relaxed">
              📖 قال رسول الله ﷺ: "من قال: لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير. في يوم مئة مرة كانت له عدل عشر رقاب."
            </p>
            <p className="leading-relaxed">
              ✨ الأذكار اليومية تُحقِّق الطمأنينة، والأمان، والحفظ من الشرور، وتزيد الإيمان وتُقرِّب من الله تعالى.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
