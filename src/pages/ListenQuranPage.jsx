import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingBackButton from '../components/FloatingBackButton';
import AudioPlayer from '../components/AudioPlayer';
import SoundWaveAnimation from '../components/SoundWaveAnimation';
import { fetchSurahList, findWorkingAudioUrl } from '../utils/quranApi';
import { QARIS } from '../utils/constants';

const ListenQuranPage = () => {
  const [surahList, setSurahList] = useState([]);
  const [currentSurahNumber, setCurrentSurahNumber] = useState(1);
  const [currentReciter, setCurrentReciter] = useState(QARIS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurahList = async () => {
      const list = await fetchSurahList();
      setSurahList(list);
      setLoading(false);
    };
    loadSurahList();
  }, []);

  const selectedSurah = useMemo(
    () => surahList.find((surah) => surah.number === currentSurahNumber) || {},
    [currentSurahNumber, surahList]
  );

  const [audioUrl, setAudioUrl] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setAudioLoading(true);
      const url = await findWorkingAudioUrl(currentSurahNumber, currentReciter.slug);
      if (!mounted) return;
      setAudioUrl(url);
      setAudioLoading(false);
    };
    load();
    return () => {
      mounted = false;
    };
  }, [currentSurahNumber, currentReciter]);

  useEffect(() => {
    setIsPlaying(false);
  }, [currentSurahNumber, currentReciter]);

  const handleSurahChange = (surahNumber) => {
    setCurrentSurahNumber(surahNumber);
  };

  const handlePrev = () => {
    setCurrentSurahNumber((current) => Math.max(1, current - 1));
  };

  const handleNext = () => {
    setCurrentSurahNumber((current) => Math.min(114, current + 1));
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <FloatingBackButton />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden h-80 md:h-96 mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-transparent" />
        <div className="absolute inset-0 bg-islamic-grid opacity-30" />
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,165,116,0.15),transparent_35%)]"
        />

        <div className="relative z-10 flex h-full flex-col justify-center px-4 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            منصة التلاوة العربية الاحترافية
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-gray-300 text-base md:text-lg"
          >
            استمع إلى القرآن الكريم بتلاوات خاشعة وسرعات قابلة للتخصيص مع دعم القارئين المشهورين.
          </motion.p>
        </div>

        {isPlaying && <SoundWaveAnimation className="absolute inset-x-0 bottom-0 h-24" />}
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-dark rounded-[2rem] p-6 sm:p-8 border border-gold-500/20"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] items-start lg:items-center mb-8">
              <div>
                <p className="text-sm text-gold-400 mb-2">السورة المختارة</p>
                <h2 className="text-3xl font-bold text-white">
                  {selectedSurah.name || 'الفاتحة'}
                </h2>
                <p className="text-gray-400 mt-2">
                  عدد الآيات {selectedSurah.numberOfAyahs || selectedSurah.ayahs || 7}
                </p>
              </div>
              <div className="rounded-3xl bg-dark-800/80 p-5 border border-gold-500/10 text-right">
                <p className="text-xs text-gray-400">القارئ</p>
                <p className="text-lg font-semibold text-white">{currentReciter.name}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="grid gap-3 md:grid-cols-2">
                {QARIS.map((reciter) => (
                  <button
                    key={reciter.id}
                    type="button"
                    onClick={() => setCurrentReciter(reciter)}
                    className={`rounded-3xl border px-4 py-3 text-right transition-all ${
                      currentReciter.id === reciter.id
                        ? 'bg-gold-500/15 border-gold-500 text-gold-100'
                        : 'border-gold-500/10 text-gray-300 hover:border-gold-500/20 hover:bg-dark-700/70'
                    }`}
                  >
                    <p className="font-semibold">{reciter.name}</p>
                    <p className="text-xs text-gray-400">{reciter.displayName}</p>
                  </button>
                ))}
              </div>
            </div>

            <AudioPlayer
              audioUrl={audioUrl}
              audioLoading={audioLoading}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              onPrev={handlePrev}
              onNext={handleNext}
              surahName={selectedSurah.name || 'الفاتحة'}
              reciterName={currentReciter.name}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-dark rounded-[2rem] p-6 sm:p-8 border border-gold-500/20"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">قائمة السور</h3>
              <p className="text-sm text-gray-400">اختر سورة للاستماع بشكل فوري.</p>
            </div>

            <div className="grid gap-3 max-h-[420px] md:max-h-[520px] overflow-y-auto pr-1">
              {loading ? (
                <div className="loader mx-auto" />
              ) : (
                surahList.map((surah) => (
                  <button
                    key={surah.number}
                    type="button"
                    onClick={() => handleSurahChange(surah.number)}
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
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ListenQuranPage;
