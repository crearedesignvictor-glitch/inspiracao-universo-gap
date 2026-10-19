import React from 'react';
import { GENERAL_TICKET_LINK } from '../data/shows';

export const Header: React.FC = () => {
  return (
    <header>
      <a aria-label="InspirAÇÃO, início" className="brand" href="#inicio">
        <img
          src="/assets/brand-logo.png"
          alt="Inspiração — Histórias que inspiram futuros"
          className="header-wordmark"
        />
      </a>
      <nav aria-label="Menu principal">
        <a href="#programacao">Em cartaz</a>
        <a href="#encontros">Datas e locais</a>
        <a
          className="nav-ticket"
          href={GENERAL_TICKET_LINK}
          rel="noopener noreferrer"
          target="_blank"
        >
          Ingressos ↗
        </a>
      </nav>
    </header>
  );
};
