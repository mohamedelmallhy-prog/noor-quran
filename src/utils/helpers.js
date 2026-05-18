/**
 * Format time in MM:SS format
 */
export const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Debounce function for performance optimization
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit function calls
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Check if device is mobile
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Get device type
 */
export const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) return 'mobile';
  if (/tablet/i.test(ua)) return 'tablet';
  return 'desktop';
};

/**
 * Smooth scroll to element
 */
export const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

/**
 * Share content
 */
export const shareContent = async (title, text, url) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
      return true;
    } catch (err) {
      console.error('Error sharing:', err);
      return false;
    }
  }
  return false;
};

/**
 * Get surah by number
 */
export const getSurah = (surahNumber) => {
  const surahs = {
    1: { name: 'Al-Fatiha', meaning: 'The Opening', verses: 7 },
    2: { name: 'Al-Baqarah', meaning: 'The Cow', verses: 286 },
    3: { name: 'Ali Imran', meaning: 'The Family of Imran', verses: 200 },
    // Add more as needed
  };
  return surahs[surahNumber];
};

/**
 * Get all surahs
 */
export const getAllSurahs = () => {
  return [
    { id: 1, name: 'Al-Fatiha', meaning: 'The Opening', verses: 7 },
    { id: 2, name: 'Al-Baqarah', meaning: 'The Cow', verses: 286 },
    { id: 3, name: 'Ali Imran', meaning: 'The Family of Imran', verses: 200 },
    { id: 55, name: 'Ar-Rahman', meaning: 'The Merciful', verses: 78 },
    { id: 67, name: 'Al-Mulk', meaning: 'The Kingdom', verses: 30 },
  ];
};

/**
 * Store data in localStorage
 */
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('LocalStorage save error:', err);
    return false;
  }
};

/**
 * Get data from localStorage
 */
export const getFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('LocalStorage get error:', err);
    return null;
  }
};

/**
 * Remove data from localStorage
 */
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (err) {
    console.error('LocalStorage remove error:', err);
    return false;
  }
};
