# Negozio Dello Buono — sito

Sito vetrina del **Negozio Dello Buono** di Montella (AV).

- **Indirizzo:** Via del Corso 162-164, 83048 Montella (AV)
- **Telefono:** 0827 61162 · 0827 601095
- **Email:** info@dellobuono.it
- **Orari:** lunedì – sabato 8:30–13:00 / 16:30–20:00 · domenica chiuso

## Stack

React 18 + Vite 5, CSS puro (nessuna dipendenza UI). Output: sito statico
(`dist/`) caricabile su qualsiasi hosting, incluso l'hosting Linux Aruba via FTP.

> Nota: `package.json` contiene un `overrides` che sostituisce `rollup` con
> `@rollup/wasm-node`, perché su questo PC la policy di sicurezza di Windows
> blocca il binario nativo di Rollup. Non serve rimuoverlo: il build funziona
> identico.

## Comandi

```bash
npm install      # una volta sola
npm run dev      # sviluppo su http://localhost:5173
npm run build    # genera dist/
npm run preview  # anteprima del build
```

## Dove modificare i contenuti

Tutti i testi, i recapiti, gli orari e i reparti stanno in un unico file:

- `src/data.js` — nome, indirizzo, telefoni, email, orari, reparti, punti di forza, marquee
- `src/lib/orari.js` — orario settimanale usato per calcolare "Aperto / Chiuso"
- `src/App.jsx` — struttura delle sezioni (hero, marquee, reparti, negozio, dove siamo, CTA)
- `src/components/Header.jsx` — barra flottante, menu, drawer mobile
- `src/components/Logo.jsx` — logo animato
- `src/components/Reveal.jsx` — animazione d'ingresso allo scroll (IntersectionObserver)
- `src/components/Icons.jsx` — icone SVG disegnate a mano (niente emoji, niente librerie)
- `src/styles.css` — design system: colori, tipografia, spaziature

## Design system (2026)

Scelte e perché:

- **Tipografia editoriale** — Fraunces variabile per i titoli (con gli assi `SOFT` e
  `WONK` attivi, che danno carattere) e Inter per il testo. Titoli grandi, tracking
  negativo, interlinea stretta: è il tratto più riconoscibile dei siti 2026.
- **Bento grid** per i reparti: una griglia a 6 colonne con celle di dimensione
  diversa, divisori da 2 px e niente ombre — layout "a compartimenti" invece delle
  solite card tutte uguali.
- **Angoli 10-18 px, poche pillole**: dai dati sui siti award-level il raggio
  mediano è ~10 px e solo il 12% usa bottoni a pillola. Qui i bottoni sono 12 px.
- **Animazioni leggere**: solo CSS + IntersectionObserver. Niente scroll-jacking,
  niente parallax pesante. Ogni animazione rispetta `prefers-reduced-motion`.
- **Header flottante** in vetro (blur + saturazione), non la solita barra piena.
- **Dettagli funzionali** invece che decorativi: stato di apertura calcolato
  dall'orario reale, mappa che si carica solo su clic.

### Personalizzare i colori

In cima a `src/styles.css`, nel blocco `:root`. Palette presa dal logo e
dall'insegna del negozio (indaco + giallo):

```css
--indigo-950: #0e0926; /* fondo scuro delle sezioni full-bleed */
--indigo-800: #2c1c68; /* indaco del logo — colore principale */
--indigo-600: #43308f; /* indaco chiaro: link, icone, hover */
--gold: #e0ad3e;       /* giallo dell'insegna: accenti su scuro */
--gold-ink: #8a6512;   /* giallo scurito: testo su fondo chiaro */
--lilac-100: #f5f3fc;  /* sfondi alternati */
--ink: #12092e;        /* testo */
```

Regola: il giallo pieno ha poco contrasto su bianco, quindi per il testo si usa
`--gold-ink`; il giallo puro resta su bordi, icone e superfici scure.

### Verificare la resa senza aprire il browser

```bash
npm run build
node node_modules/vite/bin/vite.js preview --port 4173
node tools/screenshot.mjs http://localhost:4173/ shots
```

Genera `shots/desktop.png`, `shots/intera.png` (pagina intera) e
`shots/mobile.png` usando Edge in headless (`puppeteer-core`, installato solo in
locale con `npm i --no-save puppeteer-core`, non è una dipendenza del progetto).


### Logo

File originale: `src/assets/logo-originale.jpg` (non cancellarlo, serve per
rigenerare gli asset).

Asset generati in `public/` dallo script `tools/prepare-logo.py`:

| file | uso |
| --- | --- |
| `logo-full.png` | logo completo trasparente, usato nell'header |
| `favicon.png` / `favicon.ico` | icona della scheda: monogramma su disco bianco, angoli trasparenti |
| `monogram.png` | solo il monogramma DB, trasparente (per usi futuri) |

Il monogramma viene isolato per **componenti connesse** (non con ritagli a
occhio): lo script analizza i pixel, tiene i due gruppi centrali ed esclude
scritte e archi laterali. Per rigenerare:

```bash
python tools/prepare-logo.py
```

Animazione nell'header (`src/styles.css`, `.brand-logo.is-animated`): flip
tridimensionale sull'asse X con prospettiva — resta fermo ~4 s, fa un giro
completo in ~1,9 s, poi resta fermo (11 s per ciclo). Si disattiva con "Riduci
animazioni" attivo nel sistema. Per un'inclinazione più morbida invece del giro
completo, sostituisci il keyframe `logo-flip` con un'oscillazione
`rotateX(-28deg)` ↔ `rotateX(28deg)`.

La favicon è statica: nessun browser anima favicon PNG/ICO (solo Firefox
anima le SVG), ed è una scelta voluta per non avere un'icona illeggibile a 16 px.

### Foto del negozio

`src/assets/negozio-originale.png` è lo scatto originale; il sito usa le
versioni ottimizzate `negozio.jpg` (154 kB) e `negozio.webp` (83 kB), servite
con `<picture>` così ogni browser prende la più leggera.

### Mappa

Nella sezione Contatti c'è una mappa Google **con caricamento su clic**: nessuna
richiesta a Google finché il visitatore non la apre (niente cookie di terze
parti prima del consenso). Usa l'embed classico
`https://www.google.com/maps?q=…&output=embed`, che non richiede API key né
fatturazione. Per cambiare indirizzo si modifica `MAPS_QUERY` in `src/App.jsx`.


## Pubblicare su Aruba (hosting Linux)

1. `npm run build`
2. Apri il pannello Aruba → **Hosting** → **Gestione file / FTP**
   (o usa FileZilla con i dati FTP del pannello).
3. Carica **il contenuto** della cartella `dist/` dentro la cartella del
   dominio, di solito `www.dominio.it/` o `htdocs/` — non la cartella `dist`
   stessa.
4. Il file `index.html` deve trovarsi nella radice del dominio.
5. Svuota la cache del browser e controlla il sito.

Se il sito deve stare in una sottocartella (es. `dominio.it/sito/`), il
`base: './'` in `vite.config.js` rende già i percorsi relativi: funziona
senza modifiche.

## Prossimi passi possibili

- [ ] Foto dei reparti e degli interni (oggi c'è solo la vetrina)
- [ ] Pagina dedicata alle liste nozze o alle offerte telefonia
- [ ] Collegamento a Instagram/Facebook
- [ ] Modulo contatti (richiede un servizio esterno o PHP su Aruba)
- [ ] Pubblicazione su Aruba via FTP
