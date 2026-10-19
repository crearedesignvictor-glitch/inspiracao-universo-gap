import React, { useState, useRef, useEffect, useCallback } from 'react';

export const SoundControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [label, setLabel] = useState('Ouvir trilha');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef<boolean>(false);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || userPausedRef.current) return;

    try {
      audio.volume = 0.85;
      await audio.play();
      setIsPlaying(true);
      setLabel('Pausar trilha');
    } catch {
      // Browser autoplay policy prevented audio before user interaction
      setIsPlaying(false);
      setLabel('Ouvir trilha');
    }
  }, []);

  const pausePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setIsPlaying(false);
    setLabel('Ouvir trilha');
  }, []);

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      userPausedRef.current = true;
      pausePlayback();
    } else {
      userPausedRef.current = false;
      startPlayback();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.85;

    // 1. Try to play immediately as soon as page opens
    startPlayback();

    // 2. Resume immediately upon first user interaction anywhere on the page
    const handleGesture = () => {
      if (userPausedRef.current) return;
      if (audio.paused) {
        startPlayback()
          .then(() => {
            ['click', 'pointerdown', 'touchstart', 'keydown'].forEach((evt) => {
              window.removeEventListener(evt, handleGesture);
            });
          })
          .catch(() => {});
      }
    };

    ['click', 'pointerdown', 'touchstart', 'keydown'].forEach((evt) => {
      window.addEventListener(evt, handleGesture, { passive: true });
    });

    // 3. Tab visibility management
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!audio.paused) {
          audio.pause();
          setIsPlaying(false);
          setLabel('Ouvir trilha');
        }
      } else {
        if (!userPausedRef.current) {
          startPlayback();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      ['click', 'pointerdown', 'touchstart', 'keydown'].forEach((evt) => {
        window.removeEventListener(evt, handleGesture);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [startPlayback]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/soundtrack.wav"
        preload="auto"
        loop
        playsInline
      />
      <button
        aria-label={isPlaying ? 'Pausar trilha instrumental' : 'Ouvir trilha instrumental'}
        aria-pressed={isPlaying}
        className="sound-control"
        id="sound-toggle"
        type="button"
        onClick={toggleSound}
      >
        <svg
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          viewBox="0 0 24 24"
        >
          <path d="M9 18V5l11-2v13M9 8l11-2" />
          <ellipse cx="6" cy="18" rx="3" ry="2.5" />
          <ellipse cx="17" cy="16" rx="3" ry="2.5" />
        </svg>
        <span id="sound-label">{label}</span>
        <span aria-hidden="true" className="sound-bars">
          <i></i>
          <i></i>
          <i></i>
        </span>
      </button>
    </>
  );
};
