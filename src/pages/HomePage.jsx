import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Headphones, BookOpen, Sparkles, BookOpenCheck } from 'lucide-react';
import DuaCard from '../components/DuaCard';

const HomePage = () => {
  const [sampleAnswer, setSampleAnswer] = useState(null);
  const [sampleResult, setSampleResult] = useState(null);

  const sampleQuiz = {
    question: 'ما عدد أركان الإسلام؟',
    options: ['ثلاثة', 'أربعة', 'خمسة', 'ستة'],
    correct: 2,
  };

  const handleSampleAnswer = (index) => {
    setSampleAnswer(index);
    setSampleResult(index === sampleQuiz.correct ? 'correct' : 'wrong');
  };

  const resetSampleQuiz = () => {
    setSampleAnswer(null);
    setSampleResult(null);
  };

  const features = [
    {
      icon: Headphones,
      title: 'الاستماع الفوري',
      description: 'تشغيل القرآن الكريم بصوت واضح مع اختيار القارئ المفضل.',
      link: '/listen',
    },
    {
      icon: BookOpen,
      title: 'قراءة عربية',
      description: 'عرض نص القرآن مع ترجمة إنجليزية ونمط قراءة مريح.',
      link: '/read',
    },
    {
      icon: Sparkles,
      title: 'واجهة إسلامية',
      description: 'تصميم داكن أنيق مع لمسات ذهبية وراحة بصرية.',
      link: '/listen',
    },
    {
      icon: BookOpenCheck,
      title: 'مكتبة السور',
      description: 'استعرض السور الأكثر استماعًا واختر ما يناسبك.',
      link: '/read',
    },
  ];

  return (
    <div className="bg-dark-900">
      <section className="relative overflow-hidden bg-dark-950 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,165,116,0.16),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_18%)]" />
        <div className="absolute inset-0 bg-islamic-grid opacity-20" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-right">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="mb-4 inline-flex rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-1 text-sm text-gold-200">
              منصة القرآن العربية
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl xl:text-6xl">
              احفظ واستمع إلى القرآن الكريم بطريقة احترافية.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-gray-300 sm:text-lg">
              منصة عربية حديثة لقراءة وتلاوة القرآن الكريم مع دعم السور، التلاوات، والترجمات الاحترافية.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
              <Link
                to="/listen"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-3 text-sm font-semibold text-dark-950 shadow-gold transition-all hover:shadow-xl"
              >
                استمع الآن
              </Link>
              <Link
                to="/read"
                className="inline-flex items-center justify-center rounded-full border border-gold-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-gold-500/10"
              >
                ابدأ القراءة
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white">ميزات المنصة</h2>
            <p className="mt-3 text-gray-400">كل ما تحتاجه لتجربة قرآن مريحة وحديثة باللغة العربية.</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -6 }}
                className="glass-dark rounded-[2rem] border border-gold-500/15 p-6 transition-all"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-300">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-950">
        <div className="mx-auto max-w-6xl text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-dark rounded-[2rem] border border-gold-500/15 p-10 sm:p-12"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-gold-200 uppercase tracking-[0.3em] mb-4">الاختبار الإسلامي</p>
                <h2 className="text-3xl font-bold text-white">حان وقت التحدي</h2>
                <p className="mt-4 text-gray-400 max-w-2xl leading-relaxed">
                  اختر مستوى السهولة، اختبر معلوماتك، واكتشف حقائق جديدة عن الإسلام. قسم الاختبار مصمم لتثقيفك ويحفزك على التعلم.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/quiz"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-3 text-sm font-semibold text-dark-950 shadow-gold transition-all hover:shadow-xl"
                  >
                    ابدأ الاختبار الآن
                  </Link>
                  <Link
                    to="/quiz"
                    className="inline-flex items-center justify-center rounded-full border border-gold-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-gold-500/10"
                  >
                    عرض الأسئلة
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'سهل', value: 'يمكن للجميع البدء به', color: 'bg-green-500/10 text-green-300' },
                  { label: 'متوسط', value: 'يزيد من تحديك ومعرفتك', color: 'bg-yellow-500/10 text-yellow-300' },
                  { label: 'صعب', value: 'للمهتمين بالتعمق', color: 'bg-red-500/10 text-red-300' },
                  { label: 'جميع المستويات', value: 'اختبر نفسك بكل الأسئلة', color: 'bg-purple-500/10 text-purple-300' },
                ].map((info) => (
                  <div key={info.label} className={`rounded-3xl border border-gold-500/10 p-6 ${info.color}`}>
                    <h3 className="text-xl font-semibold mb-2">{info.label}</h3>
                    <p className="text-gray-300 leading-relaxed">{info.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-950">
        <div className="mx-auto max-w-6xl text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-dark rounded-[2rem] border border-gold-500/15 p-10 sm:p-12"
          >
            <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm text-gold-200 uppercase tracking-[0.3em] mb-4">نظرة سريعة</p>
                <h2 className="text-3xl font-bold text-white">تجربة الاختبار الإسلامي داخل الصفحة</h2>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  جرّب سؤالاً واحداً مباشرةً هنا قبل الانتقال إلى صفحة الاختبار الكامل. النظام يعمل بخيارات متعددة، مستويات سهلة ومتوسطة وصعبة، وتقييم نتيجة واضح.
                </p>
              </div>

              <div className="rounded-[2rem] border border-gold-500/10 bg-dark-900/80 p-6 shadow-2xl shadow-black/20">
                <div className="mb-4 text-right">
                  <p className="text-sm text-gray-400 uppercase tracking-[0.2em]">سؤال تجريبي</p>
                  <h3 className="text-2xl font-bold text-white">{sampleQuiz.question}</h3>
                </div>

                <div className="space-y-4">
                  {sampleQuiz.options.map((option, index) => {
                    const isSelected = sampleAnswer === index;
                    const isCorrect = sampleResult === 'correct' && isSelected;
                    const isWrong = sampleResult === 'wrong' && isSelected;

                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSampleAnswer(index)}
                        className={`w-full text-right rounded-2xl border px-5 py-4 font-semibold transition-all ${
                          isCorrect
                            ? 'bg-green-500/15 border-green-500 text-green-200'
                            : isWrong
                            ? 'bg-red-500/15 border-red-500 text-red-200'
                            : 'bg-dark-950 border-gold-500/10 text-gray-300 hover:border-gold-500/40'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span>{option}</span>
                          {isCorrect && <span className="text-lg">✓</span>}
                          {isWrong && <span className="text-lg">✗</span>}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {sampleResult && (
                  <div className={`mt-5 rounded-2xl p-4 text-right font-semibold ${
                    sampleResult === 'correct'
                      ? 'bg-green-500/15 border border-green-500/30 text-green-100'
                      : 'bg-red-500/15 border border-red-500/30 text-red-100'
                  }`}>
                    {sampleResult === 'correct'
                      ? 'إجابة صحيحة! هذه هي طريقة عمل النظام مع معلومات وعرض مرن.'
                      : 'إجابة غير صحيحة. يمكنك تجربة سؤال جديد والانتقال إلى الاختبار الكامل.'}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/quiz"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3 text-sm font-semibold text-dark-950 transition-all hover:shadow-xl"
                  >
                    ابدأ الاختبار الكامل
                  </Link>
                  <button
                    type="button"
                    onClick={resetSampleQuiz}
                    className="rounded-full border border-gold-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-gold-500/10"
                  >
                    إعادة التجربة
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-right">
          <div className="glass-dark rounded-[2rem] border border-gold-500/15 p-10 sm:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">ابدأ رحلتك القرآنية الآن</h2>
                <p className="mt-3 text-gray-400 max-w-2xl">
                  منصة جاهزة للاستخدام مع واجهة مظلمة فاخرة، دعم RTL، وتكامل بيانات الآيات من خدمة القرآن السحابية.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-start lg:justify-end">
                <Link
                  to="/listen"
                  className="rounded-full bg-gold-500 px-8 py-3 text-sm font-semibold text-dark-950 transition-all hover:bg-gold-400"
                >
                  استمع الآن
                </Link>
                <Link
                  to="/read"
                  className="rounded-full border border-gold-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-gold-500/10"
                >
                  اقرأ الآن
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DuaCard />
    </div>
  );
};

export default HomePage;
