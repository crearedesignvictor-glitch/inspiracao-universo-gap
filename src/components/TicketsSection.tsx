import React from 'react';
import { GENERAL_TICKET_LINK } from '../data/shows';

export const TicketsSection: React.FC = () => {
  return (
    <section className="tickets reveal" id="ingressos">
      <div>
        <span className="eyebrow">Seu lugar nessa história</span>
        <h2>
          Toda grande história
          <br />
          merece uma plateia.
        </h2>
        <p>
          Esteja presente em um momento especial para nossas crianças. Escolha seu espetáculo e fale
          com a Dai pelo WhatsApp para consultar valores, disponibilidade e concluir a compra do seu
          ingresso.
        </p>
        <div className="purchase-steps">
          <span>
            <b>01</b> Escolha o espetáculo
          </span>
          <span>
            <b>02</b> Fale com a Dai
          </span>
          <span>
            <b>03</b> Combine sua compra
          </span>
        </div>
      </div>
      <a
        className="ticket-status"
        href={GENERAL_TICKET_LINK}
        rel="noopener noreferrer"
        target="_blank"
      >
        Adquirir meu ingresso ↗
      </a>
    </section>
  );
};
