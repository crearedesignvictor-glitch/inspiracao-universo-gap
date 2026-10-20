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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const userPausedRef = useRef<boolean>(false);
  const isReadyRef = useRef<boolean>(false);
  const isCreatingRef = useRef<boolean>(false);

  const attemptPlay = useCallback(() => {
    if (userPausedRef.current) return;
    if (playerRef.current && isReadyRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
        playerRef.current.playVideo();
      } catch (err) {
        console.warn('Playback attempt error:', err);
      }
    }
  }, []);

  const pauseSound = useCallback(() => {
    userPausedRef.current = true;
    if (playerRef.current && isReadyRef.current && typeof playerRef.current.pauseVideo === 'function') {
      try {
        playerRef.current.pauseVideo();
      } catch (err) {
        console.warn('Pause error:', err);
      }
    }
    setIsPlaying(false);
  }, []);

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (isPlaying) {
      pauseSound();
    } else {
      userPausedRef.current = false;
      attemptPlay();
      // Optimistically show playing state, onStateChange will confirm
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    let cleanUpGestures: (() => void) | null = null;

    const createPlayer = () => {
      if (playerRef.current || isCreatingRef.current) return;
      if (!window.YT || !window.YT.Player) return;

      isCreatingRef.current = true;

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
            origin: window.location.origin,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReady: (event: any) => {
              isReadyRef.current = true;
              isCreatingRef.current = false;

              // Ensure allow="autoplay" on generated iframe
              try {
                const iframe = event.target.getIframe?.();
                if (iframe) {
                  iframe.setAttribute('allow', 'autoplay; encrypted-media');
                }
              } catch {
                // Ignore cross-origin warnings if any
              }

              if (!userPausedRef.current) {
                try {
                  event.target.unMute();
                  event.target.setVolume(100);
                  event.target.playVideo();
                } catch (err) {
                  console.warn('Initial autoplay blocked, awaiting gesture:', err);
                }
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onStateChange: (event: any) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
              if (event.data === 1) {
                setIsPlaying(true);
                // When audio is confirmed playing, remove gesture listeners
                if (cleanUpGestures) {
                  cleanUpGestures();
                  cleanUpGestures = null;
                }
              } else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false);
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (err: any) => {
              console.warn('YouTube Player notification:', err);
              isCreatingRef.current = false;
            },
          },
        });
      } catch (err) {
        console.warn('Failed to construct YT.Player:', err);
        isCreatingRef.current = false;
      }
    };

    // 1. Load YouTube IFrame API script
    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') {
          prevCallback();
        }
        createPlayer();
      };

      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    }

    // 2. Browser interaction gesture unlocker:
    // If the browser blocked unmuted autoplay on initial load,
    // start playback on the very first user interaction (touch, click, key, scroll).
    const handleGesture = () => {
      if (userPausedRef.current) return;
      attemptPlay();
    };

    const gestureEvents = ['click', 'pointerdown', 'touchstart', 'keydown', 'scroll'];
    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, handleGesture, { passive: true });
    });

    cleanUpGestures = () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleGesture);
      });
    };

    // 3. Tab visibility handler (pause when tab hidden to save resources, resume when active)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (playerRef.current && isReadyRef.current && typeof playerRef.current.pauseVideo === 'function') {
          try {
            playerRef.current.pauseVideo();
          } catch {
            // ignore
          }
        }
        setIsPlaying(false);
      } else {
        if (!userPausedRef.current) {
          attemptPlay();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (cleanUpGestures) {
        cleanUpGestures();
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
        playerRef.current = null;
      }
      isReadyRef.current = false;
      isCreatingRef.current = false;
    };
  }, [attemptPlay]);

  return (
    <>
      {/* Hidden single YouTube player element with autoplay permission */}
      <div
        id="youtube-player-container"
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '1px',
          height: '1px',
          opacity: 0.001,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: -99,
        }}
      >
        <div id="youtube-audio-player" />
      </div>

      <button
        aria-label={isPlaying ? 'Pausar música: Amarelo, Azul e Branco' : 'Ouvir música: Amarelo, Azul e Branco'}
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
        <span id="sound-label">{isPlaying ? 'Pausar música' : 'Ouvir música'}</span>
        <span aria-hidden="true" className="sound-bars">
          <i></i>
          <i></i>
          <i></i>
        </span>
      </button>
    </>
  );
};
