import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, RefreshCw, AlertCircle, CheckCircle2, Moon, Sun } from 'lucide-react';
import {
  getPrayerTimes,
  getUserLocation,
  getDefaultLocation,
  formatTimeArabic,
  getPrayerNameArabic,
  getNextPrayer,
  getTimeUntilNextPrayer,
} from '../utils/prayerTimesApi';

const PRAYER_ICONS = {
  fajr: '🌙',
  sunrise: '🌅',
  dhuhr: '☀️',
  asr: '🌤️',
  maghrib: '🌇',
  isha: '🌙',
};

const PRAYER_DESCRIPTIONS = {
  fajr: 'صلاة الفجر — قبل شروق الشمس',
  sunrise: 'وقت الشروق',
  dhuhr: 'صلاة الظهر — بعد زوال الشمس',
  asr: 'صلاة العصر — بعد مرور ثلث النهار الباقي',
  maghrib: 'صلاة المغرب — بعد غروب الشمس',
  isha: 'صلاة العشاء — بعد غياب الشفق الأحمر',
};

const PRAYER_ORDER = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

export default function PrayerTimesPage() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [nextPrayerInfo, setNextPrayerInfo] = useState(null);
  const [useDefaultLocation, setUseDefaultLocation] = useState(false);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to get user's location
        const userLoc = await getUserLocation();
        setLocation(userLoc);
        setUseDefaultLocation(false);

        const result = await getPrayerTimes(userLoc.latitude, userLoc.longitude);

        if (result.success) {
          setPrayerTimes(result.data);
          const nextInfo = getTimeUntilNextPrayer(result.data);
          setNextPrayerInfo(nextInfo);
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        console.error('Failed to get user location:', err);

        // Fall back to default location
        const defaultLoc = getDefaultLocation();
        setLocation(defaultLoc);
        setUseDefaultLocation(true);
        setError('استخدام موقع افتراضي: مكة المكرمة');

        const result = await getPrayerTimes(defaultLoc.latitude, defaultLoc.longitude);

        if (result.success) {
          setPrayerTimes(result.data);
          const nextInfo = getTimeUntilNextPrayer(result.data);
          setNextPrayerInfo(nextInfo);
        } else {
          setError('تعذر تحميل مواقيت الصلاة. يرجى المحاولة لاحقاً.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();

    // Update next prayer info every minute
    const interval = setInterval(() => {
      if (prayerTimes) {
        const nextInfo = getTimeUntilNextPrayer(prayerTimes);
        setNextPrayerInfo(nextInfo);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!location) {
        const userLoc = await getUserLocation();
        setLocation(userLoc);
      }

      const result = await getPrayerTimes(location.latitude, location.longitude);

      if (result.success) {
        setPrayerTimes(result.data);
        const nextInfo = getTimeUntilNextPrayer(result.data);
        setNextPrayerInfo(nextInfo);
        setError(null);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextPrayer = prayerTimes ? getNextPrayer(prayerTimes) : null;

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
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">مواقيت الصلاة</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            أوقات الصلوات الخمس المحدثة في الوقت الفعلي مع عداد التنبيه للصلاة القادمة
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location and Refresh */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8 glass-dark rounded-2xl border border-gold-500/20 p-4 sm:p-6"
        >
          <div className="flex items-center gap-3 text-right">
            <MapPin size={20} className="text-gold-500" />
            <div>
              <p className="text-sm text-gray-500">الموقع</p>
              <p className="text-lg font-semibold text-gold-300">
                {location?.name || (location ? `${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)}` : 'جاري التحميل...')}
              </p>
              {useDefaultLocation && (
                <p className="text-xs text-gray-500 mt-1">موقع افتراضي (لم يتمكن من الوصول إلى موقعك)</p>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={loading}
            className={`p-3 rounded-lg transition-all ${
              loading
                ? 'bg-gray-600/20 text-gray-500 cursor-not-allowed'
                : 'bg-gold-500/20 text-gold-300 hover:bg-gold-500/30 border border-gold-500/30'
            }`}
          >
            <motion.div
              animate={loading ? { rotate: 360 } : { rotate: 0 }}
              transition={loading ? { duration: 2, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
            >
              <RefreshCw size={20} />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Error Message */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 glass-dark rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4 sm:p-6 flex items-start gap-4"
          >
            <AlertCircle size={24} className="text-orange-500 flex-shrink-0 mt-1" />
            <div className="text-right">
              <p className="text-orange-200 font-semibold">تنبيه</p>
              <p className="text-orange-100 text-sm mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="h-24 glass-dark rounded-2xl border border-gold-500/20 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Prayer Times Grid */}
        {!loading && prayerTimes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {PRAYER_ORDER.map((prayerKey, index) => {
              const isNextPrayer = nextPrayer?.key === prayerKey;
              const time = prayerTimes[prayerKey];

              return (
                <motion.div
                  key={prayerKey}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-2xl border transition-all ${
                    isNextPrayer
                      ? 'glass-dark border-gold-500/50 bg-gradient-to-r from-gold-500/20 to-transparent shadow-lg shadow-gold-500/20'
                      : 'glass-dark border-gold-500/20 hover:border-gold-500/30'
                  }`}
                >
                  <div className="p-6 sm:p-8 flex items-center justify-between">
                    {/* Prayer Info */}
                    <div className="flex items-center gap-4 flex-1 text-right">
                      <div className="text-4xl">{PRAYER_ICONS[prayerKey]}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gold-300 mb-1">
                          {getPrayerNameArabic(prayerKey)}
                        </h3>
                        <p className="text-sm text-gray-400">{PRAYER_DESCRIPTIONS[prayerKey]}</p>

                        {isNextPrayer && nextPrayerInfo && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 inline-flex items-center gap-2 bg-gold-500/20 px-4 py-2 rounded-lg border border-gold-500/30"
                          >
                            <Clock size={16} className="text-gold-400" />
                            <span className="text-sm font-semibold text-gold-300">
                              بعد {nextPrayerInfo.hours}:{nextPrayerInfo.minutes.toString().padStart(2, '0')}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Time Display */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-4xl sm:text-5xl font-black text-gold-400 font-mono">
                        {formatTimeArabic(time)}
                      </div>
                      {isNextPrayer && (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="flex items-center gap-1 text-gold-400 text-sm font-semibold"
                        >
                          <CheckCircle2 size={16} />
                          قادمة
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* No Data State */}
        {!loading && !prayerTimes && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-dark rounded-2xl border border-gold-500/20 p-12 text-center"
          >
            <AlertCircle size={48} className="mx-auto text-gold-500 mb-4 opacity-50" />
            <p className="text-gray-400 text-lg">لم يتمكن من تحميل البيانات</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="mt-6 px-6 py-3 bg-gold-500/20 text-gold-300 rounded-lg border border-gold-500/30 hover:bg-gold-500/30 transition-all"
            >
              حاول مجددًا
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Information Section */}
      {!loading && prayerTimes && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Prayer Tips */}
            <div className="glass-dark rounded-2xl border border-gold-500/20 p-8">
              <h3 className="text-xl font-bold text-gold-300 mb-4 flex items-center gap-2">
                <Moon size={20} />
                نصائح مهمة
              </h3>
              <ul className="space-y-3 text-gray-400 text-sm leading-relaxed">
                <li>✨ حاول أن تصلي في أول وقت الصلاة لتحصل على الأجر الأكمل</li>
                <li>📱 قم بتفعيل التنبيهات للتذكر بأوقات الصلاة</li>
                <li>🌍 قد تختلف الأوقات قليلاً عن وقتك الفعلي بحسب المنطقة</li>
                <li>🕌 تأكد من كنسة المكان وتطهيره قبل الصلاة</li>
              </ul>
            </div>

            {/* Prayer Virtues */}
            <div className="glass-dark rounded-2xl border border-gold-500/20 p-8">
              <h3 className="text-xl font-bold text-gold-300 mb-4 flex items-center gap-2">
                <Sun size={20} />
                فضل الصلاة
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                قال رسول الله ﷺ: "الصلاة هي عماد الدين". الصلاة هي الركن الثاني من أركان الإسلام، وهي علاقة مباشرة بين العبد وربه.
                تخشع النفس وتطمئن القلب وتُمحى الذنوب والخطايا.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
