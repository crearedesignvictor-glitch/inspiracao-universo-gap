import React, { useState } from 'react';
import { SHOWS, WHATSAPP_PHONE } from '../data/shows';
import { ShowEvent } from '../types';

interface ProgramSectionProps {
  onSelectShow: (show: ShowEvent) => void;
}

export const ProgramSection: React.FC<ProgramSectionProps> = ({ onSelectShow }) => {
  const [selectedDate, setSelectedDate] = useState<'all' | '14' | '27'>('all');

  return (
    <section className="program" id="programacao">
      <div className="section-head reveal visible">
        <div>
          <span className="eyebrow">Escolha sua inspiração</span>
          <h2>
            Quatro histórias.
            <br />
            Um universo de possibilidades.
          </h2>
        </div>
        <p>
          Escolha a data, descubra as histórias em cena e fale com a Dai para adquirir seu ingresso.
          Venha aplaudir nossas crianças de perto.
        </p>
      </div>

      <div aria-label="Filtrar por data" className="filters" role="group">
        <button
          type="button"
          aria-pressed={selectedDate === 'all'}
          className={`filter ${selectedDate === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedDate('all')}
        >
          Todas as sessões
        </button>
        <button
          type="button"
          aria-pressed={selectedDate === '14'}
          className={`filter ${selectedDate === '14' ? 'active' : ''}`}
          onClick={() => setSelectedDate('14')}
        >
          14 de novembro
        </button>
        <button
          type="button"
          aria-pressed={selectedDate === '27'}
          className={`filter ${selectedDate === '27' ? 'active' : ''}`}
          onClick={() => setSelectedDate('27')}
        >
          27 de novembro
        </button>
      </div>

      <div className="grid">
        {SHOWS.map((show) => {
          const isHidden = selectedDate !== 'all' && show.dateKey !== selectedDate;
          const ticketUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(show.ticketMessage)}`;

          return (
            <article
              key={show.id}
              className="show-card reveal visible"
              data-date={show.dateKey}
              hidden={isHidden}
              style={isHidden ? { display: 'none' } : undefined}
            >
              <button
                type="button"
                aria-label={`Conhecer ${show.person}`}
                className={`poster ${show.id}`}
                onClick={() => onSelectShow(show)}
              >
                <div className="poster-top">
                  <span>
                    UNIVERSO GAP
                    <br />
                    APRESENTA
                  </span>
                  <span>
                    TEATRO
                    <br />
                    2026
                  </span>
                </div>
                <div className="poster-name">{show.person}</div>
                <h3 dangerouslySetInnerHTML={{ __html: show.titleHtml }} />
                <img
                  className="poster-photo"
                  src={show.posterImage}
                  alt={show.posterAlt}
                  loading="eager"
                />
                <div className="poster-foot">
                  <span>InspirAÇÃO</span>
                  <span>{show.date} ↗</span>
                </div>
              </button>

              <div className="show-info">
                <div className="date-line">
                  <span>
                    {show.date} <i>•</i> {show.time}
                  </span>
                  <span>MARABÁ / PA</span>
                </div>
                <h3>{show.headline}</h3>
                <p className="show-venue">{show.venue}</p>
                <p className="show-blurb">{show.blurb}</p>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => onSelectShow(show)}
                >
                  Sobre o espetáculo <span>↗</span>
                </button>
                <a
                  className="buy-ticket"
                  href={ticketUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Adquirir ingresso ↗
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
