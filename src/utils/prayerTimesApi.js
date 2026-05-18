/**
 * Prayer Times API Utility
 * Fetches prayer times using the Aladhan API (https://aladhan.com/api)
 */

export const getPrayerTimes = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.code !== 200) {
      throw new Error(data.status || 'Failed to fetch prayer times');
    }

    return {
      success: true,
      data: {
        fajr: data.data.timings.Fajr,
        sunrise: data.data.timings.Sunrise,
        dhuhr: data.data.timings.Dhuhr,
        asr: data.data.timings.Asr,
        maghrib: data.data.timings.Maghrib,
        isha: data.data.timings.Isha,
        date: data.data.date,
        location: {
          latitude,
          longitude,
        },
        method: data.data.method,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const getDefaultLocation = () => {
  // Default location: Mecca, Saudi Arabia (for Muslim users worldwide)
  return {
    latitude: 21.4225,
    longitude: 39.8262,
    name: 'مكة المكرمة',
  };
};

// Format time string from 24-hour format (HH:MM) to 12-hour format
export const formatTime = (timeString) => {
  if (!timeString) return '--:--';

  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const minute = parseInt(minutes);

  const isAM = hour < 12;
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

  return `${hour12.toString().padStart(2, '0')}:${minutes} ${isAM ? 'ص' : 'م'}`;
};

// Format time for Arabic display
export const formatTimeArabic = (timeString) => {
  if (!timeString) return '--:--';
  return timeString; // Returns in 24-hour format for Arabic display
};

// Get prayer name in Arabic
export const getPrayerNameArabic = (prayer) => {
  const prayers = {
    fajr: 'الفجر',
    sunrise: 'الشروق',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء',
  };
  return prayers[prayer] || prayer;
};

// Get next prayer based on current time
export const getNextPrayer = (prayerTimes) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  const prayers = [
    { key: 'fajr', time: prayerTimes.fajr },
    { key: 'sunrise', time: prayerTimes.sunrise },
    { key: 'dhuhr', time: prayerTimes.dhuhr },
    { key: 'asr', time: prayerTimes.asr },
    { key: 'maghrib', time: prayerTimes.maghrib },
    { key: 'isha', time: prayerTimes.isha },
  ];

  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':');
    const prayerTime = parseInt(hours) * 60 + parseInt(minutes);

    if (prayerTime > currentTime) {
      return prayer;
    }
  }

  // If no prayer found today, return Fajr (tomorrow)
  return prayers[0];
};

// Get time remaining until next prayer
export const getTimeUntilNextPrayer = (prayerTimes) => {
  const now = new Date();
  const nextPrayer = getNextPrayer(prayerTimes);

  if (!nextPrayer) return null;

  const [hours, minutes] = nextPrayer.time.split(':');
  const prayerDateTime = new Date();
  prayerDateTime.setHours(parseInt(hours), parseInt(minutes), 0);

  // If prayer time has passed today, use tomorrow's time
  if (prayerDateTime < now) {
    prayerDateTime.setDate(prayerDateTime.getDate() + 1);
  }

  const diff = prayerDateTime - now;
  const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
  const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return {
    prayer: nextPrayer.key,
    hours: hoursLeft,
    minutes: minutesLeft,
    formatted: `${hoursLeft}:${minutesLeft.toString().padStart(2, '0')}`,
  };
};
