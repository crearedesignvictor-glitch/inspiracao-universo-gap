import React from 'react';
import { GENERAL_TICKET_LINK } from '../data/shows';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img alt="Universo GAP" className="school-logo" src="/assets/logo-gap.webp" />
          <strong>Universo GAP</strong>
          <p>
            Histórias que inspiram futuros.
            <br />
            Teatro, infância e descobertas em cena.
            <br />
            Marabá, Pará · InspirAÇÃO 2026
          </p>
        </div>
        <div>
          <h3>Viva essa experiência</h3>
          <div className="footer-links">
            <a href="#programacao">Espetáculos e ingressos</a>
            <a href="#encontros">Datas e locais</a>
            <a href="#sobre">Sobre o Inspiração</a>
            <a href="#ingressos">Como adquirir seu ingresso</a>
          </div>
        </div>
        <div className="footer-contact">
          <h3>Atendimento e ingressos</h3>
          <span className="contact-name">Fale com a Dai</span>
          <a className="footer-phone" href="tel:+5594992857513">
            (94) 99285-7513
          </a>
          <p>Consulte valores, sessões disponíveis e orientações para a compra.</p>
          <a
            className="primary"
            href={GENERAL_TICKET_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            Comprar pelo WhatsApp ↗
          </a>
        </div>
        <a
          className="primary mobile-footer-purchase"
          href={GENERAL_TICKET_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          Comprar ingresso
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © 2026 Universo GAP · InspirAÇÃO
          <br />
          Uma realização da Universo GAP.
        </span>
        <a className="footer-top" href="#inicio">
          Voltar ao início ↑
        </a>
      </div>
    </footer>
  );
};
