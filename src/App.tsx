import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Ribbon } from './components/Ribbon';
import { ProgramSection } from './components/ProgramSection';
import { AboutSection } from './components/AboutSection';
import { AgendaSection } from './components/AgendaSection';
import { TicketsSection } from './components/TicketsSection';
import { Footer } from './components/Footer';
import { EventDialog } from './components/EventDialog';
import { SoundControl } from './components/SoundControl';
import { ShowEvent } from './types';

export const App: React.FC = () => {
  const [selectedShow, setSelectedShow] = useState<ShowEvent | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      document.body.classList.add('motion-ready');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05 }
      );

      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ribbon />
        <ProgramSection onSelectShow={(show) => setSelectedShow(show)} />
        <AboutSection />
        <AgendaSection />
        <TicketsSection />
      </main>
      <Footer />
      <EventDialog show={selectedShow} onClose={() => setSelectedShow(null)} />
      <SoundControl />
    </>
  );
};

export default App;
