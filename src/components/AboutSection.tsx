import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section className="about" id="sobre">
      <div className="reveal">
        <span className="eyebrow">Uma realização Universo GAP</span>
        <h2>
          <span className="desktop-about-title">
            Antes de entrar em cena,
            <br />
            é preciso se inspirar.
          </span>
          <span className="mobile-about-title">
            <span>Antes de entrar em</span>
            <span>cena, é preciso</span>
            <span>se inspirar.</span>
          </span>
        </h2>
      </div>
      <div className="reveal">
        <p className="statement">
          Cada criança carrega um universo. No teatro, esse universo encontra voz, gesto e imaginação.
        </p>
        <p>
          InspirAÇÃO aproxima nossas crianças de histórias de criatividade, ciência e pertencimento.
          Trajetórias que se tornam ponto de partida para aprender, representar e sonhar.
        </p>
        <div className="about-tags">
          <span>Teatro</span>
          <span>Infância</span>
          <span>Descobertas</span>
          <span>Pertencimento</span>
        </div>
      </div>
    </section>
  );
};
