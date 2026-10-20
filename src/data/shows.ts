import { ShowEvent, HeroSlide } from '../types';
import sampaioPoster from '../assets/images/regenerated_image_1792461930011.png';
import rochaPoster from '../assets/images/regenerated_image_1792461799341.png';
import curiePoster from '../assets/images/regenerated_image_1792461801452.png';

export const WHATSAPP_PHONE = '5594992857513';
export const WHATSAPP_GENERAL_MESSAGE =
  'Olá, Dai! Quero adquirir ingressos para o Inspiração, da Universo GAP. Pode me informar os valores, as sessões disponíveis e como realizar a compra?';

export const GENERAL_TICKET_LINK = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_GENERAL_MESSAGE)}`;

export const HERO_SLIDES: HeroSlide[] = [
  {
    titleHtml: 'Pequenos protagonistas.<br><em>Grandes histórias.</em>',
    description: 'O palco é das nossas crianças. A inspiração vem de quem transformou o mundo ao seu redor.',
  },
  {
    titleHtml: 'Ciência e criatividade.<br><em>Em cena, novos olhares.</em>',
    description: 'Tatiana Sampaio às 17h e Steve Jobs às 19h30. Dia 14 de novembro, no Teatro Usina da Paz.',
  },
  {
    titleHtml: 'Descobertas e raízes: Histórias<br><em>que ficam.</em>',
    description: 'Marie Curie às 17h e Leonildo Borges Rocha às 19h30. Dia 27 de novembro, no Teatro Municipal Eduardo Abdelnor.',
  },
];

export const SHOWS: ShowEvent[] = [
  {
    id: 'sampaio',
    order: '01',
    date: '14 NOV',
    dateKey: '14',
    time: '17h',
    venue: 'Teatro Usina da Paz',
    person: 'Tatiana Sampaio',
    titleHtml: 'Corajosa<span>MENTE</span>',
    titlePlain: 'Corajosa MENTE',
    headline: 'Curiosidade que transforma.',
    shortPitch: 'A coragem de investigar.',
    posterAlt: 'Aluno caracterizado para o espetáculo',
    posterImage: sampaioPoster,
    blurb: 'Perguntar, investigar e imaginar novos caminhos. Uma homenagem à ciência brasileira, contada com a sensibilidade e o olhar das nossas crianças.',
    dialogDesc: 'Uma homenagem à ciência brasileira e às pessoas que fazem da curiosidade um caminho para novas possibilidades.',
    ticketMessage:
      'Olá, Dai! Quero adquirir ingressos para CorajosaMENTE, de Tatiana Sampaio, do Inspiração, no dia 14/11 às 17h. Pode me informar os valores, a disponibilidade e como realizar a compra?',
  },
  {
    id: 'jobs',
    order: '02',
    date: '14 NOV',
    dateKey: '14',
    time: '19h30',
    venue: 'Teatro Usina da Paz',
    person: 'Steve Jobs',
    titleHtml: 'Criativa<span>MENTE</span>',
    titlePlain: 'Criativa MENTE',
    headline: 'Imaginar é só o começo.',
    shortPitch: 'Uma ideia muda tudo.',
    posterAlt: 'Criança caracterizada para o espetáculo inspirado em Steve Jobs',
    posterImage: '/assets/poster-jobs.webp',
    blurb: 'E se uma ideia pudesse abrir um mundo de possibilidades? Criatividade e coragem entram em cena para inspirar quem ainda tem tanto a descobrir.',
    dialogDesc: 'Criatividade, escolhas e recomeços ganham o palco em uma história que convida a pensar diferente.',
    ticketMessage:
      'Olá, Dai! Quero adquirir ingressos para CriativaMENTE, de Steve Jobs, do Inspiração, no dia 14/11 às 19h30. Pode me informar os valores, a disponibilidade e como realizar a compra?',
  },
  {
    id: 'curie',
    order: '03',
    date: '27 NOV',
    dateKey: '27',
    time: '17h',
    venue: 'Teatro Municipal Eduardo Abdelnor',
    person: 'Marie Curie',
    titleHtml: 'Brilhante<span>MENTE</span>',
    titlePlain: 'Brilhante MENTE',
    headline: 'Toda descoberta começa com uma pergunta.',
    shortPitch: 'A curiosidade acende futuros.',
    posterAlt: 'Criança caracterizada para o espetáculo inspirado em Marie Curie',
    posterImage: curiePoster,
    blurb: 'Um convite a olhar o mundo com curiosidade. Entre perguntas e descobertas, nossas crianças celebram a persistência e a vontade de aprender.',
    dialogDesc: 'Uma jornada cênica sobre descobertas, persistência e a vontade de aprender, inspirada em Marie Curie.',
    ticketMessage:
      'Olá, Dai! Quero adquirir ingressos para BrilhanteMENTE, de Marie Curie, do Inspiração, no dia 27/11 às 17h. Pode me informar os valores, a disponibilidade e como realizar a compra?',
  },
  {
    id: 'rocha',
    order: '04',
    date: '27 NOV',
    dateKey: '27',
    time: '19h30',
    venue: 'Teatro Municipal Eduardo Abdelnor',
    person: 'Leonildo Borges Rocha',
    titleHtml: 'Generosa<span>MENTE</span>',
    titlePlain: 'Generosa MENTE',
    headline: 'Uma história com as nossas raízes.',
    shortPitch: 'Raízes que inspiram.',
    posterAlt: 'Aluno caracterizado para o espetáculo',
    posterImage: rochaPoster,
    blurb: 'Marabá, memória e pertencimento ganham voz no palco. Uma homenagem a Leonildo Borges Rocha e às histórias que aproximam gerações.',
    dialogDesc: 'Uma homenagem ligada à história de Marabá, ao trabalho e às raízes que ajudam a imaginar o amanhã.',
    ticketMessage:
      'Olá, Dai! Quero adquirir ingressos para GenerosaMENTE, de Leonildo Borges Rocha, do Inspiração, no dia 27/11 às 19h30. Pode me informar os valores, a disponibilidade e como realizar a compra?',
  },
];
