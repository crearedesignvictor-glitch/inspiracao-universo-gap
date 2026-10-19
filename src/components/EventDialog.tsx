import React, { useEffect, useRef } from 'react';
import { ShowEvent } from '../types';
import { WHATSAPP_PHONE } from '../data/shows';

interface EventDialogProps {
  show: ShowEvent | null;
  onClose: () => void;
}

export const EventDialog: React.FC<EventDialogProps> = ({ show, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (show) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [show]);

  if (!show) return null;

  const ticketUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    `Olá, Dai! Quero adquirir ingressos para o espetáculo de ${show.person}, do Inspiração, no dia ${show.date} às ${show.time}. Pode me informar os valores, a disponibilidade e como realizar a compra?`
  )}`;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        onClose();
      }
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="dialog-title"
      id="event-dialog"
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <button
        type="button"
        aria-label="Fechar detalhes"
        className="close"
        onClick={onClose}
      >
        ×
      </button>
      <span className="eyebrow" id="dialog-person">
        {show.person}
      </span>
      <h2 id="dialog-title">{show.titlePlain}</h2>
      <p id="dialog-desc">{show.dialogDesc}</p>
      <p className="detail-meta" id="dialog-meta">
        {show.date} 2026 · {show.time} · {show.venue}
      </p>
      <a
        className="primary"
        href={ticketUrl}
        id="dialog-ticket"
        rel="noopener noreferrer"
        target="_blank"
        onClick={onClose}
      >
        Adquirir ingresso pelo WhatsApp ↗
      </a>
    </dialog>
  );
};
