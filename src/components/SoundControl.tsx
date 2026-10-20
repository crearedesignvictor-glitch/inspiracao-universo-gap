import React, { useState, useRef, useEffect, useCallback } from 'react';

// YouTube Video ID for "ANAVITÓRIA, Rita Lee - Amarelo, azul e branco"
const YOUTUBE_VIDEO_ID = 'GtvS897PiyQ';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT?: any;
  }
}

export const SoundControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [label, setLabel] = useState('Ouvir música');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const userPausedRef = useRef<boolean>(false);
  const isReadyRef = useRef<boolean>(false);
  const audioFallbackRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback(() => {
    userPausedRef.current = false;
    if (playerRef.current && isReadyRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(85);
        playerRef.current.playVideo();
        setIsPlaying(true);
        setLabel('Pausar música');
        return;
      } catch (err) {
        console.warn('YouTube playVideo error, falling back:', err);
      }
    }

    if (audioFallbackRef.current) {
      audioFallbackRef.current.volume = 0.85;
      audioFallbackRef.current.play().then(() => {
        setIsPlaying(true);
        setLabel('Pausar música');
      }).catch(() => {});
    }
  }, []);

  const pauseSound = useCallback(() => {
    userPausedRef.current = true;
    if (playerRef.current && isReadyRef.current && typeof playerRef.current.pauseVideo === 'function') {
      try {
        playerRef.current.pauseVideo();
      } catch (err) {
        console.warn('YouTube pauseVideo error:', err);
      }
    }
    if (audioFallbackRef.current) {
      audioFallbackRef.current.pause();
    }
    setIsPlaying(false);
    setLabel('Ouvir música');
  }, []);

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (isPlaying) {
      pauseSound();
    } else {
      playSound();
    }
  };

  useEffect(() => {
    // 1. Load YouTube IFrame API script
    const loadYouTubeApi = () => {
      if (!window.YT) {
        const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
        if (!existingScript) {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          document.head.appendChild(tag);
        }
      }
    };

    // 2. Initialize player once API is ready
    const createPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      try {
        playerRef.current = new window.YT.Player('youtube-audio-player', {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            enablejsapi: 1,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReady: (event: any) => {
              isReadyRef.current = true;
              event.target.setVolume(85);
              if (!userPausedRef.current) {
                event.target.playVideo();
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onStateChange: (event: any) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (event.data === 1) {
                setIsPlaying(true);
                setLabel('Pausar música');
              } else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false);
                setLabel('Ouvir música');
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (err: any) => {
              console.warn('YouTube Player error, using audio fallback:', err);
              // Fallback to audio element if video playback fails
              if (!userPausedRef.current && audioFallbackRef.current) {
                audioFallbackRef.current.play().catch(() => {});
              }
            },
          },
        });
      } catch (err) {
        console.warn('Failed to construct YT.Player:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
      loadYouTubeApi();
    }

    // 3. User interaction gesture unlocker (ensures autoplay on mobile or strict browser policies)
    const handleGesture = () => {
      if (userPausedRef.current) return;
      playSound();
    };

    const gestureEvents = ['click', 'pointerdown', 'touchstart', 'keydown'];
    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, handleGesture, { passive: true });
    });

    // 4. Tab visibility change handler
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isPlaying) {
          if (playerRef.current && isReadyRef.current && typeof playerRef.current.pauseVideo === 'function') {
            playerRef.current.pauseVideo();
          }
          if (audioFallbackRef.current) {
            audioFallbackRef.current.pause();
          }
          setIsPlaying(false);
          setLabel('Ouvir música');
        }
      } else {
        if (!userPausedRef.current) {
          playSound();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleGesture);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [playSound, isPlaying]);

  return (
    <>
      {/* Hidden YouTube player container */}
      <div
        id="youtube-player-container"
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: 'fixed',
          bottom: '-300px',
          right: '-300px',
          width: '200px',
          height: '200px',
          opacity: 0.001,
          pointerEvents: 'none',
          zIndex: -99,
        }}
      >
        <div id="youtube-audio-player" />
      </div>

      {/* Fallback audio element */}
      <audio
        ref={audioFallbackRef}
        src="/assets/soundtrack.wav"
        preload="none"
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
        title="Amarelo, azul e branco — ANAVITÓRIA e Rita Lee"
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
