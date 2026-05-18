/**
 * Application Constants
 */

// API Endpoints
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.quran.com';
export const AUDIO_BASE_URL = import.meta.env.VITE_AUDIO_BASE_URL || 'https://audio.quran.com';

// Surahs Data
export const SURAHS = [
  { id: 1, name: 'Al-Fatiha', meaning: 'The Opening', verses: 7 },
  { id: 2, name: 'Al-Baqarah', meaning: 'The Cow', verses: 286 },
  { id: 3, name: 'Ali Imran', meaning: 'The Family of Imran', verses: 200 },
  { id: 4, name: 'An-Nisa', meaning: 'The Women', verses: 176 },
  { id: 5, name: 'Al-Maidah', meaning: 'The Table Spread', verses: 120 },
  { id: 6, name: 'Al-Anam', meaning: 'The Cattle', verses: 165 },
  { id: 7, name: 'Al-Araf', meaning: 'The Heights', verses: 206 },
  { id: 8, name: 'Al-Anfal', meaning: 'The Spoils of War', verses: 75 },
  { id: 9, name: 'At-Taubah', meaning: 'The Repentance', verses: 129 },
  { id: 10, name: 'Yunus', meaning: 'Jonah', verses: 109 },
  { id: 55, name: 'Ar-Rahman', meaning: 'The Merciful', verses: 78 },
  { id: 67, name: 'Al-Mulk', meaning: 'The Kingdom', verses: 30 },
];

// Popular Surahs (for homepage)
export const POPULAR_SURAHS = [
  { id: 1, name: 'Al-Fatiha', meaning: 'The Opening', verses: 7 },
  { id: 2, name: 'Al-Baqarah', meaning: 'The Cow', verses: 286 },
  { id: 3, name: 'Ali Imran', meaning: 'The Family of Imran', verses: 200 },
  { id: 55, name: 'Ar-Rahman', meaning: 'The Merciful', verses: 78 },
  { id: 67, name: 'Al-Mulk', meaning: 'The Kingdom', verses: 30 },
  { id: 78, name: 'An-Naba', meaning: 'The News', verses: 39 },
];

// Qaris (Reciters)
export const QARIS = [
  { id: 'alafasy', name: 'مشاري راشد العفاسي', displayName: 'العفاسي', slug: 'afs' },
  { id: 'basit', name: 'عبد الباسط عبد الصمد', displayName: 'عبد الباسط', slug: 'abdul_basit_murattal' },
  { id: 'ajmy', name: 'أحمد العجمي', displayName: 'العجمي', slug: 'ajm' },
  { id: 'saad', name: 'سعد الغامدي', displayName: 'الغامدي', slug: 's_gmd' },
  { id: 'minshawi', name: 'المنشاوي', displayName: 'المنشاوي', slug: 'minsh' },
  { id: 'maher', name: 'ماهر المعيقلي', displayName: 'ماهر المعيقلي', slug: 'maher' },
  { id: 'yasser', name: 'ياسر الدوسري', displayName: 'ياسر الدوسري', slug: 'yasser' },
  { id: 'fars', name: 'فارس عباد', displayName: 'فارس عباد', slug: 'frs_a' },
  { id: 'qtm', name: 'ناصر القطامي', displayName: 'القطامي', slug: 'qtm' },
  { id: 'shatri', name: 'أبو بكر الشاطري', displayName: 'الشاطري', slug: 'shatri' },
  { id: 'husr', name: 'محمد الحصري', displayName: 'الحصري', slug: 'husr' },
  { id: 'sobhi', name: 'إسلام صبحي', displayName: 'إسلام صبحي', slug: 'sobhi' },
];

// Languages
export const LANGUAGES = [
  { code: 'ar', name: 'Arabic', label: 'العربية' },
  { code: 'en', name: 'English', label: 'English' },
  { code: 'ur', name: 'Urdu', label: 'اردو' },
  { code: 'fr', name: 'French', label: 'Français' },
  { code: 'es', name: 'Spanish', label: 'Español' },
];

// Font Sizes
export const FONT_SIZES = [
  { value: 'sm', label: 'Small', size: 'text-lg' },
  { value: 'base', label: 'Medium', size: 'text-2xl' },
  { value: 'lg', label: 'Large', size: 'text-3xl' },
  { value: 'xl', label: 'Extra Large', size: 'text-4xl' },
];

// Animation Durations (in ms)
export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
};

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Colors
export const COLORS = {
  GOLD_500: '#d4a574',
  GOLD_600: '#c99462',
  DARK_900: '#0f0f0f',
  DARK_800: '#1a1a1a',
  DARK_700: '#282828',
};

// Local Storage Keys
export const LOCAL_STORAGE_KEYS = {
  THEME: 'quran_theme',
  LANGUAGE: 'quran_language',
  FONT_SIZE: 'quran_font_size',
  BOOKMARKS: 'quran_bookmarks',
  HISTORY: 'quran_history',
  FAVORITES: 'quran_favorites',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LISTEN: '/listen',
  READ: '/read',
  FAVORITES: '/favorites',
  SETTINGS: '/settings',
};

// Error Messages
export const ERROR_MESSAGES = {
  LOAD_FAILED: 'Failed to load content. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_SURAH: 'Invalid surah number.',
  INVALID_VERSE: 'Invalid verse number.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  COPIED: 'Copied to clipboard!',
  BOOKMARKED: 'Added to bookmarks!',
  REMOVED: 'Removed successfully!',
};
