import React, { useState, useEffect } from 'react';
import { HERO_SLIDES, GENERAL_TICKET_LINK } from '../data/shows';

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 9000);

    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="cinema-hero" id="inicio" aria-label="InspirAÇÃO, mostra de teatro">
      <picture className="cast-background">
        <source media="(max-width:700px)" srcSet="/assets/aistudio/MOBILE__849201a6.png" />
        <img
          src="/assets/aistudio/WEB_a10845a4.png"
          alt="As quatro crianças caracterizadas para os espetáculos, juntas no teatro"
          fetchPriority="high"
        />
      </picture>
      <div className="hero-shade"></div>

      <div className="hero-content">
        <span className="eyebrow">MOSTRA DE TEATRO · MARABÁ, PA</span>
        <h1 dangerouslySetInnerHTML={{ __html: slide.titleHtml }} />
        <p>{slide.description}</p>
        <a
          className="primary"
          href={GENERAL_TICKET_LINK}
          rel="noopener noreferrer"
          target="_blank"
        >
          Adquira seu ingresso ↗
        </a>
        <div className="hero-meta">
          <span>
            <b>14 &amp; 27 NOV</b>2026 · Marabá, Pará
          </span>
          <span>
            <b>4 HISTÓRIAS</b>Infinitas possibilidades
          </span>
        </div>
      </div>
    </section>
  );
};
