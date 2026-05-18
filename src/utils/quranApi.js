const API_BASE = 'https://api.alquran.cloud/v1';
const FALLBACK_SURAH_LIST = [
  { number: 1, name: 'الفاتحة', englishName: 'Al-Fātiḥah', ayahs: 7 },
  { number: 2, name: 'البقرة', englishName: 'Al-Baqarah', ayahs: 286 },
  { number: 3, name: 'آل عمران', englishName: 'Al-ʿImrān', ayahs: 200 },
  { number: 4, name: 'النساء', englishName: 'An-Nisāʼ', ayahs: 176 },
  { number: 5, name: 'المائدة', englishName: 'Al-Māʼidah', ayahs: 120 },
  { number: 55, name: 'الرحمن', englishName: 'Ar-Raḥmān', ayahs: 78 },
  { number: 67, name: 'الملك', englishName: 'Al-Mulk', ayahs: 30 },
  { number: 78, name: 'النبأ', englishName: 'An-Nabāʼ', ayahs: 40 },
];

const buildEditionUrl = (surahNumber, edition) => `${API_BASE}/surah/${surahNumber}/${edition}`;

export const fetchSurahList = async () => {
  try {
    const response = await fetch(`${API_BASE}/surah`);
    if (!response.ok) throw new Error('Failed to load surah list.');
    const data = await response.json();
    return data?.data || FALLBACK_SURAH_LIST;
  } catch (error) {
    console.warn('Quran API list fetch failed:', error);
    return FALLBACK_SURAH_LIST;
  }
};

export const fetchSurahVerses = async (surahNumber) => {
  const editions = ['ar.quran-simple', 'ar.alafasy'];
  const englishEdition = 'en.sahih';

  for (const edition of editions) {
    try {
      const [arabicRes, englishRes] = await Promise.all([
        fetch(buildEditionUrl(surahNumber, edition)),
        fetch(buildEditionUrl(surahNumber, englishEdition)),
      ]);

      if (!arabicRes.ok || !englishRes.ok) {
        throw new Error('Failed to load surah verses.');
      }

      const [arabicData, englishData] = await Promise.all([arabicRes.json(), englishRes.json()]);
      const arabicAyahs = arabicData?.data?.ayahs || [];
      const englishAyahs = englishData?.data?.ayahs || [];

      const verses = arabicAyahs.map((ayah, index) => ({
        number: ayah.numberInSurah,
        arabic: ayah.text,
        translation: englishAyahs[index]?.text || '... لا يوجد ترجمة حالياً',
        sajdah: ayah.sajda || false,
      }));

      return {
        number: arabicData?.data?.number || surahNumber,
        name: arabicData?.data?.englishName || '',
        arabicName: arabicData?.data?.name || '',
        ayahs: verses,
        ayahCount: arabicData?.data?.numberOfAyahs || verses.length,
      };
    } catch (error) {
      console.warn(`Quran API verses fetch failed for edition ${edition}:`, error);
    }
  }

  const fallback = FALLBACK_SURAH_LIST.find((surah) => surah.number === surahNumber);
  return {
    number: fallback?.number || surahNumber,
    name: fallback?.englishName || 'Surah',
    arabicName: fallback?.name || 'سورة',
    ayahs: [
      {
        number: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        sajdah: false,
      },
    ],
    ayahCount: fallback?.ayahs || 0,
  };
};

const AUDIO_BASES = {
  afs: 'https://server8.mp3quran.net/afs',
  s_gmd: 'https://server7.mp3quran.net/s_gmd',
  minsh: 'https://server10.mp3quran.net/minsh',
  ajm: 'https://server10.mp3quran.net/ajm',
  maher: 'https://server12.mp3quran.net/maher',
  yasser: 'https://server11.mp3quran.net/yasser',
  frs_a: 'https://server8.mp3quran.net/frs_a',
  qtm: 'https://server6.mp3quran.net/qtm',
  shatri: 'https://server11.mp3quran.net/shatri',
  husr: 'https://server13.mp3quran.net/husr',
  abdul_basit_murattal: 'https://server7.mp3quran.net/basit',
};

export const buildStaticAudioUrl = (surahNumber, reciterSlug) => {
  const paddedNumber = String(surahNumber).padStart(3, '0');
  const baseUrl = AUDIO_BASES[reciterSlug] || `https://download.quranicaudio.com/quran/${reciterSlug}`;
  return `${baseUrl}/${paddedNumber}.mp3`;
};

export const findWorkingAudioUrl = async (surahNumber, reciterSlug) => {
  const paddedNumber = String(surahNumber).padStart(3, '0');

  // 1) try known server mapped URL
  const mappedBase = AUDIO_BASES[reciterSlug];
  const candidates = [];
  if (mappedBase) candidates.push(`${mappedBase}/${paddedNumber}.mp3`);

  // 2) try quranicaudio fallback
  candidates.push(`https://download.quranicaudio.com/quran/${reciterSlug}/${paddedNumber}.mp3`);

  for (const url of candidates) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      const ct = res.headers.get('content-type') || '';
      if (res.ok && ct.includes('audio')) return url;
    } catch (e) {
      // network/CORS may fail — ignore and try next
    }
  }

  return null;
};
