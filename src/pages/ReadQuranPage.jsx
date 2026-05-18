import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingBackButton from '../components/FloatingBackButton';
import AyahReader from '../components/AyahReader';
import { Settings, BookMarked } from 'lucide-react';
import { fetchSurahList, fetchSurahVerses } from '../utils/quranApi';

const ReadQuranPage = () => {
  const [surahList, setSurahList] = useState([]);
  const [currentSurahNumber, setCurrentSurahNumber] = useState(1);
  const [textSize, setTextSize] = useState('base');
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurahList = async () => {
      const list = await fetchSurahList();
      setSurahList(list);
    };
    loadSurahList();
  }, []);

  useEffect(() => {
    const loadVerses = async () => {
      setLoading(true);
      const surahData = await fetchSurahVerses(currentSurahNumber);
      setVerses(surahData.ayahs || []);
      setLoading(false);
    };
    loadVerses();
  }, [currentSurahNumber]);

  const selectedSurah = useMemo(
    () => surahList.find((surah) => surah.number === currentSurahNumber) || {},
    [currentSurahNumber, surahList]
  );

  const fontSizes = [
    { value: 'sm', label: 'صغير' },
    { value: 'base', label: 'متوسط' },
    { value: 'lg', label: 'كبير' },
    { value: 'xl', label: 'أكبر' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <FloatingBackButton />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-72 md:h-80 flex items-center justify-center overflow-hidden mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-transparent" />
        <div className="absolute inset-0 bg-islamic-grid opacity-25" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            اقرأ القرآن الكريم
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg"
          >
            إستعرض النص العربي مع ترجمة إنجليزية احترافية وواجهة مظلمة مريحة للعين.
          </motion.p>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-dark rounded-[2rem] p-8 border border-gold-500/20"
          >
            <div className="text-right mb-8 border-b border-gold-500/10 pb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedSurah.name || 'الفاتحة'}
              </h2>
              <p className="text-gold-400 text-sm">
                عدد الآيات {selectedSurah.numberOfAyahs || verses.length}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-gold-500/10">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  onClick={() => setTextSize(size.value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    textSize === size.value
                      ? 'bg-gold-500 text-dark-900'
                      : 'bg-dark-700/70 text-gray-300 hover:bg-dark-700/90'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="loader" />
              </div>
            ) : (
              <AyahReader verses={verses} textSize={textSize} />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="space-y-6"
          >
            <div className="glass-dark rounded-[2rem] p-6 border border-gold-500/20">
              <h3 className="text-2xl font-bold text-white mb-3">السور</h3>
              <p className="text-sm text-gray-400 mb-5">اختر السورة لعرض الآيات فوراً.</p>
              <div className="grid gap-3 max-h-[520px] overflow-y-auto pr-1">
                {surahList.map((surah) => (
                  <button
                    key={surah.number}
                    type="button"
                    onClick={() => setCurrentSurahNumber(surah.number)}
                    className={`w-full rounded-3xl border p-4 text-right transition-all ${
                      currentSurahNumber === surah.number
                        ? 'bg-gold-500/10 border-gold-500 text-white'
                        : 'border-gold-500/10 text-gray-300 hover:bg-dark-700/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{surah.name}</p>
                        <p className="text-xs text-gray-400">{surah.englishName}</p>
                      </div>
                      <span className="rounded-full bg-gold-500/15 px-3 py-1 text-xs text-gold-100">
                        {surah.number}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-dark rounded-[2rem] p-6 border border-gold-500/20 space-y-3">
              <button
                type="button"
                className="w-full flex items-center gap-2 px-4 py-3 rounded-3xl bg-gold-500/20 hover:bg-gold-500/30 text-gold-100 font-semibold transition-all border border-gold-500/30"
              >
                <BookMarked size={18} />
                حفظ المفضلة
              </button>
              <button
                type="button"
                className="w-full flex items-center gap-2 px-4 py-3 rounded-3xl bg-dark-700/60 hover:bg-dark-700 text-gray-300 font-semibold transition-all border border-dark-600"
              >
                <Settings size={18} />
                إعدادات القراءة
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReadQuranPage;
