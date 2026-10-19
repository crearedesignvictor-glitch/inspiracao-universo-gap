# InspirAÇÃO — Histórias que inspiram futuros | Universo GAP

Mostra teatral da Universo GAP realizada em Marabá, Pará.

Esta aplicação foi reescrita em **React + TypeScript + Vite** a partir do projeto original, preservando fielmente todas as funcionalidades, regras de negócio e estética visual cinematográfica.

## Recursos e Funcionalidades

- **Header Responsivo**: Logotipo oficial com transparência suave, links de navegação com rolagem suave e CTA para aquisição de ingressos via WhatsApp.
- **Hero Cinematográfico**:
  - Pôster fotográfico em alta resolução com adaptação responsiva (desktop e mobile).
  - Rotação automática e interativa de destaques/slides a cada 9 segundos com botões de alternância.
  - Metadados do evento (14 e 27 de novembro de 2026, Marabá/PA, 4 histórias).
- **Faixa Marquee Animada**: Faixa contínua com palavras-chave temáticas (`CRIATIVIDADE ✳ CIÊNCIA ✳ HISTÓRIAS ✳ INFÂNCIA ✳ TEATRO ✳ FUTURO`).
- **Programação Teatral com Filtro por Data**:
  - Alternância entre as sessões de **14 de novembro** e **27 de novembro**.
  - 4 espetáculos em cartaz:
    1. *CorajosaMENTE* (Tatiana Sampaio) — Teatro Usina da Paz, 17h.
    2. *CriativaMENTE* (Steve Jobs) — Teatro Usina da Paz, 19h30.
    3. *BrilhanteMENTE* (Marie Curie) — Teatro Municipal Eduardo Abdelnor, 17h.
    4. *GenerosaMENTE* (Leonildo Borges Rocha) — Teatro Municipal Eduardo Abdelnor, 19h30.
  - Pôsteres interativos com zoom e efeito cinematográfico.
  - Links diretos com mensagens personalizadas de compra pelo WhatsApp para cada espetáculo e horário.
- **Modal de Detalhes dos Espetáculos**:
  - Janela modal acessível (`<dialog>`) com descrição estendida, metadados da sessão e botão de compra rápida.
  - Suporte a fechamento por clique fora (backdrop), botão fechar e tecla Escape.
- **Seção Sobre**: Filosofia, pertencimento e tags conceituais do projeto teatral com tipografia adaptada para desktop e dispositivos móveis.
- **Agenda / Encontros**: Resumo visual em formato de calendário dos dois dias de apresentações com datas destacadas.
- **Seção de Ingressos**: Passo a passo simples de compra (01 Escolha o espetáculo, 02 Fale com a Dai, 03 Combine sua compra) e botão de contato direto.
- **Trilha Instrumental Sonora (Web Audio API)**:
  - Síntese de áudio procedural com celesta, arpeggios e acordes de harmonia suave.
  - Equalizador gráfico animado em CSS.
  - Controle de play/pause, suporte a suspensão automática em abas ocultas e retomada por interação.
- **Animações de Revelação por Rolagem**: Efeitos suaves via `IntersectionObserver` respeitando preferências de acessibilidade (`prefers-reduced-motion`).

## Tecnologias

- **React 19**
- **TypeScript**
- **Vite**
- **Web Audio API**
- **CSS3 / Modern Animations**

## Desenvolvimento

```bash
npm install
npm run dev
```

O servidor de desenvolvimento roda na porta `3000`.
