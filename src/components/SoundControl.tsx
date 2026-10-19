import React, { useState, useRef, useEffect, useCallback } from 'react';

const BEAT = 60 / 76;
const CHORDS = [
  [57, 60, 64, 71], // Am9
  [53, 57, 60, 64], // Fmaj7
  [48, 55, 60, 64], // C
  [52, 56, 59, 64], // E
];

const hz = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

export const SoundControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [label, setLabel] = useState('Ouvir trilha');

  const contextRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const delayRef = useRef<DelayNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const nextRef = useRef<number>(0);
  const stepRef = useRef<number>(0);
  const userPausedRef = useRef<boolean>(false);

  const playTone = useCallback(
    (note: number, time: number, length: number, level: number, kind: OscillatorType = 'sine') => {
      const ctx = contextRef.current;
      const master = masterRef.current;
      const delay = delayRef.current;
      if (!ctx || !master || !delay) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = kind;
      osc.frequency.value = hz(note);

      const startTime = Math.max(time, ctx.currentTime);
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(level, startTime + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + length);

      osc.connect(gain);
      gain.connect(master);
      gain.connect(delay);

      osc.start(startTime);
      osc.stop(startTime + length + 0.05);
    },
    []
  );

  const schedule = useCallback(() => {
    const ctx = contextRef.current;
    if (!ctx || ctx.state !== 'running') return;

    while (nextRef.current < ctx.currentTime + 0.35) {
      const chord = CHORDS[Math.floor(stepRef.current / 16) % 4];
      const index = stepRef.current % 16;

      // Base chord pad
      if (index === 0) {
        chord.slice(0, 3).forEach((n) => playTone(n - 12, nextRef.current, BEAT * 7.8, 0.16));
      }

      // Arpeggio pattern
      const pattern = [0, 2, 1, 3, 2, 1, 3, 2];
      playTone(chord[pattern[stepRef.current % 8]] + 12, nextRef.current, BEAT * 2, 0.26);

      // Bell accent
      if (index === 6 || index === 14) {
        playTone(chord[3] + 24, nextRef.current, BEAT * 3, 0.14);
      }

      nextRef.current += BEAT / 2;
      stepRef.current = (stepRef.current + 1) % 64;
    }
  }, [playTone]);

  const initAudio = useCallback(() => {
    if (!contextRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) {
        throw new Error('Web Audio unsupported');
      }

      const ctx = new AudioContextClass();
      const master = ctx.createGain();
      master.gain.value = 0.85;
      master.connect(ctx.destination);

      const delay = ctx.createDelay(1);
      delay.delayTime.value = BEAT * 0.75;

      const wet = ctx.createGain();
      const feedback = ctx.createGain();
      wet.gain.value = 0.22;
      feedback.gain.value = 0.25;

      delay.connect(wet);
      wet.connect(master);
      delay.connect(feedback);
      feedback.connect(delay);

      contextRef.current = ctx;
      masterRef.current = master;
      delayRef.current = delay;
    }
  }, []);

  const startAudio = useCallback(async () => {
    initAudio();
    const ctx = contextRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    nextRef.current = Math.max(nextRef.current, ctx.currentTime + 0.05);
    schedule();
    timerRef.current = window.setInterval(schedule, 100);

    setIsPlaying(true);
    setLabel('Pausar trilha');
  }, [initAudio, schedule]);

  const pauseAudio = useCallback(async () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (contextRef.current && contextRef.current.state === 'running') {
      await contextRef.current.suspend();
    }
    setIsPlaying(false);
    setLabel('Ouvir trilha');
  }, []);

  const toggleSound = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (isPlaying) {
      userPausedRef.current = true;
      await pauseAudio();
    } else {
      userPausedRef.current = false;
      await startAudio();
    }
  };

  useEffect(() => {
    let interactionHandled = false;

    const startOnInteraction = async () => {
      if (interactionHandled || userPausedRef.current) return;
      interactionHandled = true;
      try {
        await startAudio();
      } catch {
        // Ignored if user hasn't allowed audio yet
      }
    };

    // Attempt autoplay immediately
    startAudio().catch(() => {
      // Browser autoplay policy blocked; will play on first interaction
    });

    const events = ['pointerdown', 'mousedown', 'touchstart', 'keydown', 'scroll', 'click'];
    const handleUserGesture = () => {
      startOnInteraction();
      events.forEach((evt) => {
        window.removeEventListener(evt, handleUserGesture);
      });
    };

    events.forEach((evt) => {
      window.addEventListener(evt, handleUserGesture, { once: true, passive: true });
    });

    const handleVisibilityChange = async () => {
      if (document.hidden && contextRef.current && contextRef.current.state === 'running') {
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        await contextRef.current.suspend();
        setIsPlaying(false);
        setLabel('Ouvir trilha');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleUserGesture);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      if (contextRef.current) {
        contextRef.current.close().catch(() => {});
      }
    };
  }, [startAudio]);

  return (
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
  );
};
