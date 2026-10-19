export interface ShowEvent {
  id: string;
  order: string;
  date: string; // e.g. "14 NOV"
  dateKey: '14' | '27';
  time: string; // e.g. "17h"
  venue: string; // e.g. "Teatro Usina da Paz"
  person: string; // e.g. "Tatiana Sampaio"
  titleHtml: string; // e.g. "Corajosa<span>MENTE</span>"
  titlePlain: string; // e.g. "Corajosa MENTE"
  headline: string; // e.g. "Curiosidade que transforma."
  shortPitch: string; // e.g. "A coragem de investigar."
  posterAlt: string;
  posterImage: string;
  blurb: string;
  dialogDesc: string;
  ticketMessage: string;
}

export interface HeroSlide {
  titleHtml: string;
  description: string;
}
