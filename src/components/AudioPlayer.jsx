import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const AudioPlayer = ({ audioUrl, audioLoading, isPlaying, setIsPlaying, onNext, onPrev, surahName, reciterName }) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const isAudioAvailable = Boolean(audioUrl);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [audioUrl, isPlaying, setIsPlaying]);

  return (
    <div className="space-y-6">
      {audioLoading ? (
        <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-200">جاري التحقق من مصدر الصوت...</div>
      ) : audioUrl ? (
        <audio ref={audioRef} className="hidden">
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      ) : (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          المصدر الصوتي غير متوفر حالياً لهذا القارئ. اختر قارئاً آخر.
        </div>
      )}

      <div>
        <div className="h-1 bg-dark-700 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
            className="h-full bg-gradient-to-r from-gold-500 to-gold-600"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrev}
          className="p-2 hover:bg-dark-700/50 rounded-lg transition-colors"
        >
          <SkipBack size={24} className="text-gold-400" />
        </motion.button>

        <motion.button
          whileHover={{ scale: isAudioAvailable ? 1.05 : 1 }}
          whileTap={{ scale: isAudioAvailable ? 0.95 : 1 }}
          onClick={() => {
            if (!isAudioAvailable) return;
            setIsPlaying((state) => !state);
          }}
          className={`p-4 rounded-full transition-all ${
            isAudioAvailable
              ? 'bg-gradient-to-r from-gold-500 to-gold-600 hover:shadow-gold'
              : 'bg-gray-700 cursor-not-allowed opacity-70'
          }`}
          disabled={!isAudioAvailable}
        >
          {isPlaying ? (
            <Pause size={28} className="text-dark-900" fill="currentColor" />
          ) : (
            <Play size={28} className="text-dark-900" fill="currentColor" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="p-2 hover:bg-dark-700/50 rounded-lg transition-colors"
        >
          <SkipForward size={24} className="text-gold-400" />
        </motion.button>
      </div>

      <div className="flex items-center gap-3">
        <Volume2 size={18} className="text-gold-400" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1 h-1 bg-dark-700 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #d4a574 0%, #d4a574 ${volume}%, #374151 ${volume}%, #374151 100%)`,
          }}
        />
        <span className="text-xs text-gray-400 w-10">{volume}%</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center pt-4 border-t border-gold-500/10">
        <div>
          <p className="text-xs text-gray-500 mb-1">السورة</p>
          <p className="text-sm font-semibold text-white">{surahName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">القارئ</p>
          <p className="text-sm font-semibold text-white">{reciterName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">الصيغة</p>
          <p className="text-sm font-semibold text-white">MP3</p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
