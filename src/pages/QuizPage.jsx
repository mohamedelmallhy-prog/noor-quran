import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RotateCcw, Trophy, TrendingUp } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'كم عدد سور القرآن الكريم؟',
    options: ['104', '114', '124', '134'],
    correct: 1,
    difficulty: 'easy',
    fact: 'القرآن الكريم يتكون من 114 سورة، تبدأ بسورة الفاتحة وتنتهي بسورة الناس.',
  },
  {
    id: 2,
    question: 'ما هي أول سورة نزلت من القرآن الكريم؟',
    options: ['الفاتحة', 'العلق', 'يس', 'المدثر'],
    correct: 1,
    difficulty: 'easy',
    fact: 'سورة العلق هي أول سورة نزلت على النبي ﷺ وتحتوي على الآيات الخمس الأولى: "اقرأ باسم ربك"',
  },
  {
    id: 3,
    question: 'من هو الصحابي الملقب بسيف الله المسلول؟',
    options: ['علي بن أبي طالب', 'خالد بن الوليد', 'أبو بكر الصديق', 'عمر بن الخطاب'],
    correct: 1,
    difficulty: 'medium',
    fact: 'خالد بن الوليد رضي الله عنه كان من أعظم القادة العسكريين في الإسلام، لقبه النبي ﷺ بسيف الله المسلول.',
  },
  {
    id: 4,
    question: 'ما عدد أركان الإسلام؟',
    options: ['ثلاثة', 'أربعة', 'خمسة', 'ستة'],
    correct: 2,
    difficulty: 'easy',
    fact: 'أركان الإسلام خمسة: الشهادة، الصلاة، الزكاة، الصوم، والحج. وقد قال النبي ﷺ: "بني الإسلام على خمسة"',
  },
  {
    id: 5,
    question: 'ما هي السورة التي تُسمى قلب القرآن؟',
    options: ['يس', 'الرحمن', 'الفاتحة', 'القلم'],
    correct: 0,
    difficulty: 'medium',
    fact: 'سورة يس تُسمى قلب القرآن، وقد قال النبي ﷺ: "لكل شيء قلب وقلب القرآن يس"',
  },
  {
    id: 6,
    question: 'من أول من أسلم من الرجال؟',
    options: ['علي بن أبي طالب', 'زيد بن حارثة', 'أبو بكر الصديق', 'عثمان بن عفان'],
    correct: 2,
    difficulty: 'easy',
    fact: 'أبو بكر الصديق رضي الله عنه كان أول من آمن برسول الله ﷺ من الرجال.',
  },
  {
    id: 7,
    question: 'أين وُلد النبي محمد ﷺ؟',
    options: ['المدينة المنورة', 'مكة المكرمة', 'الطائف', 'يثرب'],
    correct: 1,
    difficulty: 'easy',
    fact: 'وُلد النبي ﷺ في مكة المكرمة في شهر ربيع الأول من عام الفيل.',
  },
  {
    id: 8,
    question: 'كم عدد أطفال النبي محمد ﷺ؟',
    options: ['ثلاثة', 'أربعة', 'ستة', 'سبعة'],
    correct: 2,
    difficulty: 'medium',
    fact: 'للنبي ﷺ ستة أطفال: القاسم، وعبدالله، وزينب، وأم كلثوم، وفاطمة، ورقية.',
  },
  {
    id: 9,
    question: 'ما هي أطول سورة في القرآن الكريم؟',
    options: ['سورة البقرة', 'سورة الشعراء', 'سورة النحل', 'سورة الأعراف'],
    correct: 0,
    difficulty: 'medium',
    fact: 'سورة البقرة هي أطول سورة في القرآن، وتحتوي على 286 آية.',
  },
  {
    id: 10,
    question: 'كم عدد أركان الإيمان؟',
    options: ['أربعة', 'خمسة', 'ستة', 'سبعة'],
    correct: 2,
    difficulty: 'easy',
    fact: 'أركان الإيمان ستة: الإيمان بالله، وملائكته، وكتبه، ورسله، واليوم الآخر، والقدر.',
  },
  {
    id: 11,
    question: 'كم عدد آيات سورة الفاتحة؟',
    options: ['5', '6', '7', '8'],
    correct: 2,
    difficulty: 'easy',
    fact: 'سورة الفاتحة تحتوي على 7 آيات، وهي أم القرآن وتُقرأ في كل ركعة من ركعات الصلاة.',
  },
  {
    id: 12,
    question: 'من هو صاحب لواء المسلمين يوم القيامة؟',
    options: ['أبو بكر', 'عمر', 'عثمان', 'محمد ﷺ'],
    correct: 3,
    difficulty: 'medium',
    fact: 'قال النبي ﷺ: "أنا سيد ولد آدم يوم القيامة وأول من ينشق عنه القبر وأول شافع وأول مشفع"',
  },
  {
    id: 13,
    question: 'كم عدد أشهر الحج الحرم؟',
    options: ['شهر واحد', 'شهران', 'ثلاثة أشهر', 'أربعة أشهر'],
    correct: 2,
    difficulty: 'hard',
    fact: 'أشهر الحج الحرم ثلاثة: شوال وذو القعدة وذو الحجة. قال تعالى: "الحج أشهر معلومات"',
  },
  {
    id: 14,
    question: 'ما هو أقصر سورة في القرآن الكريم؟',
    options: ['الكافرون', 'الإخلاص', 'الكوثر', 'الفاتحة'],
    correct: 2,
    difficulty: 'medium',
    fact: 'سورة الكوثر هي أقصر سورة في القرآن، وتحتوي على 3 آيات فقط.',
  },
  {
    id: 15,
    question: 'كم عدد ركعات صلاة الجمعة؟',
    options: ['ركعة واحدة', 'ركعتان', 'أربع ركعات', 'ثلاث ركعات'],
    correct: 1,
    difficulty: 'easy',
    fact: 'صلاة الجمعة تتكون من ركعتين، وهي تختلف عن صلاة الظهر التي تتكون من أربع ركعات.',
  },
  {
    id: 16,
    question: 'من هو بلال بن رباح؟',
    options: ['قاضي', 'شاعر', 'مؤذن', 'عالم'],
    correct: 2,
    difficulty: 'medium',
    fact: 'بلال بن رباح رضي الله عنه كان مولى أبي بكر الصديق وأول مؤذن في الإسلام.',
  },
  {
    id: 17,
    question: 'كم عدد سور المفصل؟',
    options: ['37', '47', '57', '67'],
    correct: 2,
    difficulty: 'hard',
    fact: 'المفصل هو جزء من القرآن يبدأ من سورة محمد ويضم حوالي 57 سورة.',
  },
  {
    id: 18,
    question: 'متى فُرضت الزكاة؟',
    options: ['السنة الأولى للهجرة', 'السنة الثانية للهجرة', 'السنة الثالثة للهجرة', 'قبل الهجرة'],
    correct: 1,
    difficulty: 'hard',
    fact: 'فُرضت الزكاة في السنة الثانية للهجرة، وهي ركن من أركان الإسلام.',
  },
  {
    id: 19,
    question: 'ما هي فترة نزول الوحي على محمد ﷺ؟',
    options: ['20 سنة', '23 سنة', '25 سنة', '30 سنة'],
    correct: 1,
    difficulty: 'medium',
    fact: 'استمرت فترة نزول الوحي على النبي ﷺ لمدة 23 سنة تقريباً.',
  },
  {
    id: 20,
    question: 'كم سنة عاش النبي محمد ﷺ؟',
    options: ['50 سنة', '60 سنة', '63 سنة', '70 سنة'],
    correct: 2,
    difficulty: 'easy',
    fact: 'عاش النبي ﷺ 63 سنة، ودعا الله أن لا يجاوز عمره عمر أبي إبراهيم وكان عمره 63 سنة.',
  },
  {
    id: 21,
    question: 'من هو معلم الأنبياء؟',
    options: ['موسى', 'إبراهيم', 'نوح', 'محمد ﷺ'],
    correct: 0,
    difficulty: 'hard',
    fact: 'موسى عليه السلام يُلقب بمعلم الأنبياء لأنه أوحي إليه كتاب التوراة الذي فيه تفصيل كل شيء.',
  },
  {
    id: 22,
    question: 'كم عدد مرات ذكر اسم "محمد" في القرآن الكريم؟',
    options: ['2', '3', '4', '5'],
    correct: 2,
    difficulty: 'hard',
    fact: 'اسم محمد ورد في القرآن 4 مرات، وقد قال القرآن: "وما محمد إلا رسول"',
  },
  {
    id: 23,
    question: 'ما هي أعظم آية في القرآن الكريم؟',
    options: ['آية الكرسي', 'الفاتحة', 'يس', 'الإخلاص'],
    correct: 0,
    difficulty: 'medium',
    fact: 'آية الكرسي هي أعظم آية في القرآن الكريم، قال النبي ﷺ: "أعظم آية في كتاب الله آية الكرسي"',
  },
  {
    id: 24,
    question: 'كم عدد أيام شهر رمضان؟',
    options: ['28', '29', '29 أو 30', '30'],
    correct: 2,
    difficulty: 'easy',
    fact: 'شهر رمضان 29 أو 30 يوماً حسب رؤية الهلال، والصوم فريضة على كل مسلم.',
  },
  {
    id: 25,
    question: 'ما هي السورة التي لم تبدأ ببسم الله الرحمن الرحيم؟',
    options: ['سورة التوبة', 'سورة الفاتحة', 'سورة البقرة', 'سورة يس'],
    correct: 0,
    difficulty: 'hard',
    fact: 'سورة التوبة لم تبدأ ببسم الله الرحمن الرحيم، وهي السورة الوحيدة في القرآن بهذه الميزة.',
  },
];

export default function QuizPage() {
  const [difficulty, setDifficulty] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFact, setShowFact] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [questionsShuffled, setQuestionsShuffled] = useState([]);
  const [showStats, setShowStats] = useState(false);

  const filteredQuestions = QUIZ_QUESTIONS.filter(
    (q) => difficulty === 'all' || q.difficulty === difficulty
  );

  const startQuiz = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setQuestionsShuffled(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setShowFact(false);
    setQuizFinished(false);
  };

  const handleAnswerClick = (optionIndex) => {
    if (answered) return;

    setSelectedAnswer(optionIndex);
    setAnswered(true);
    setShowFact(true);

    if (optionIndex === questionsShuffled[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questionsShuffled.length) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
      setShowFact(false);
    } else {
      setQuizFinished(true);
      setShowStats(true);
    }
  };

  const resetQuiz = () => {
    setDifficulty(null);
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setShowFact(false);
    setQuizFinished(false);
    setQuestionsShuffled([]);
    setShowStats(false);
  };

  const scorePercentage = questionsShuffled.length > 0 ? (score / questionsShuffled.length) * 100 : 0;

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
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">الاختبار الإسلامي</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            اختبر معلوماتك الإسلامية مع أسئلة متنوعة وتعلم حقائق إسلامية مهمة
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Difficulty Selection */}
        {difficulty === null ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { level: 'easy', label: 'سهل', desc: 'أسئلة أساسية', color: 'from-green-500 to-green-600' },
                { level: 'medium', label: 'متوسط', desc: 'أسئلة متقدمة', color: 'from-yellow-500 to-yellow-600' },
                { level: 'hard', label: 'صعب', desc: 'أسئلة متخصصة', color: 'from-red-500 to-red-600' },
                { level: 'all', label: 'الكل', desc: 'جميع الأسئلة', color: 'from-purple-500 to-purple-600' },
              ].map((opt) => (
                <motion.button
                  key={opt.level}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startQuiz(opt.level)}
                  className={`glass-dark rounded-2xl border border-gold-500/20 p-8 text-right hover:border-gold-500/40 transition-all group`}
                >
                  <div className={`h-16 rounded-xl bg-gradient-to-br ${opt.color} mb-4 flex items-center justify-center shadow-lg`}>
                    <Trophy size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gold-300 mb-2">{opt.label}</h3>
                  <p className="text-gray-400">{opt.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : quizFinished ? (
          /* Results Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-dark rounded-2xl border border-gold-500/20 p-8 sm:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="mb-8"
            >
              <Trophy size={80} className="mx-auto text-gold-500 mb-4" />
            </motion.div>

            <h2 className="text-4xl font-black text-gold-300 mb-4">تم الانتهاء!</h2>

            <div className="grid md:grid-cols-3 gap-6 my-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-dark-800/50 rounded-xl p-6 border border-gold-500/10"
              >
                <p className="text-gray-500 text-sm mb-2">النتيجة</p>
                <p className="text-4xl font-black text-gold-400">
                  {score}/{questionsShuffled.length}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-dark-800/50 rounded-xl p-6 border border-gold-500/10"
              >
                <p className="text-gray-500 text-sm mb-2">النسبة المئوية</p>
                <p className="text-4xl font-black text-gold-400">{Math.round(scorePercentage)}%</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-dark-800/50 rounded-xl p-6 border border-gold-500/10"
              >
                <p className="text-gray-500 text-sm mb-2">الأسئلة</p>
                <p className="text-4xl font-black text-gold-400">{questionsShuffled.length}</p>
              </motion.div>
            </div>

            {/* Feedback */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`rounded-xl p-6 mb-8 ${
                scorePercentage >= 80
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                  : scorePercentage >= 60
                  ? 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300'
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}
            >
              <p className="text-xl font-semibold mb-2">
                {scorePercentage >= 80
                  ? '🎉 ممتاز! أنت على دراية جيدة بالمعلومات الإسلامية!'
                  : scorePercentage >= 60
                  ? '👍 جيد! يمكنك تحسين معلوماتك أكثر'
                  : '💪 حاول مرة أخرى! هناك الكثير لتتعلمه'}
              </p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 rounded-lg font-bold hover:shadow-lg transition-all"
            >
              العودة للاختيار
            </motion.button>
          </motion.div>
        ) : (
          /* Quiz Screen */
          <motion.div
            key={`quiz-${currentQuestion}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Progress Bar */}
            <div className="glass-dark rounded-2xl border border-gold-500/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">
                  السؤال {currentQuestion + 1} من {questionsShuffled.length}
                </span>
                <span className="text-gold-400 font-bold">النقاط: {score}</span>
              </div>

              <motion.div
                className="w-full h-2 bg-dark-700 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 to-gold-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questionsShuffled.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </div>

            {/* Question */}
            <div className="glass-dark rounded-2xl border border-gold-500/20 p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gold-300 mb-8 text-right">
                {questionsShuffled[currentQuestion]?.question}
              </h3>

              {/* Options */}
              <div className="space-y-4">
                {questionsShuffled[currentQuestion]?.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={!answered ? { x: 5 } : {}}
                    whileTap={!answered ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswerClick(index)}
                    disabled={answered}
                    className={`w-full p-4 rounded-xl text-right font-semibold transition-all border-2 ${
                      selectedAnswer === index
                        ? index === questionsShuffled[currentQuestion].correct
                          ? 'bg-green-500/20 border-green-500/50 text-green-300'
                          : 'bg-red-500/20 border-red-500/50 text-red-300'
                        : answered && index === questionsShuffled[currentQuestion].correct
                        ? 'bg-green-500/20 border-green-500/50 text-green-300'
                        : 'bg-dark-800/50 border-gold-500/20 text-gray-300 hover:border-gold-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {answered && index === questionsShuffled[currentQuestion].correct && (
                        <span className="text-xl">✓</span>
                      )}
                      {answered && selectedAnswer === index && index !== questionsShuffled[currentQuestion].correct && (
                        <span className="text-xl">✗</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Fact Section */}
            <AnimatePresence>
              {showFact && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="glass-dark rounded-2xl border border-blue-500/20 bg-blue-500/10 p-8"
                >
                  <p className="text-blue-300 font-semibold mb-3 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    حقيقة إسلامية
                  </p>
                  <p className="text-gray-300 leading-relaxed text-right">
                    {questionsShuffled[currentQuestion]?.fact}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {answered && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextQuestion}
                className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                {currentQuestion + 1 === questionsShuffled.length ? 'انتهاء الاختبار' : 'السؤال التالي'}
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
