import React from 'react';

export const AgendaSection: React.FC = () => {
  return (
    <section className="agenda" id="encontros">
      <span className="eyebrow">Anote na agenda · novembro de 2026</span>
      <h2>
        Nosso próximo encontro
        <br />
        é no teatro.
      </h2>
      <div className="agenda-row reveal">
        <div className="big-date">
          14<span>NOVEMBRO</span>
        </div>
        <div>
          <h3>Teatro Usina da Paz</h3>
          <p>Marabá, Pará</p>
        </div>
        <div>
          <h3>Tatiana Sampaio &amp; Steve Jobs</h3>
          <p>Tatiana Sampaio às 17h · Steve Jobs às 19h30</p>
        </div>
      </div>
      <div className="agenda-row reveal">
        <div className="big-date">
          27<span>NOVEMBRO</span>
        </div>
        <div>
          <h3>Teatro Municipal Eduardo Abdelnor</h3>
          <p>Marabá, Pará</p>
        </div>
        <div>
          <h3>Marie Curie &amp; Leonildo Borges Rocha</h3>
          <p>Marie Curie às 17h · Leonildo Borges Rocha às 19h30</p>
        </div>
      </div>
    </section>
  );
};
