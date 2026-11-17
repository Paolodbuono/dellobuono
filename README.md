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

- `src/data.js` — nome, indirizzo, telefoni, email, orari, reparti, punti di forza
- `src/App.jsx` — struttura delle sezioni (hero, reparti, negozio, orari/contatti)
- `src/components/Header.jsx` — menu e link
- `src/components/Logo.jsx` — medaglione con il monogramma che ruota
- `src/styles.css` — colori e tipografia

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
tridimensionale sull'asse X con prospettiva — 30% del tempo fermo, poi un giro
completo, poi di nuovo fermo (9 s per ciclo). Si disattiva con "Riduci
animazioni" attivo nel sistema. Per un'inclinazione più morbida invece del giro
completo, sostituisci il keyframe `logo-flip` con un'oscillazione
`rotateX(-28deg)` ↔ `rotateX(28deg)`.

La favicon è statica: nessun browser anima favicon PNG/ICO (solo Firefox
anima le SVG), ed è una scelta voluta per non avere un'icona illeggibile a 16 px.



### Personalizzare i colori

In cima a `src/styles.css`, nel blocco `:root`:

```css
--navy: #12263f;  /* blu principale */
--gold: #c8a15a;  /* accento oro */
--cream: #f8f5f0; /* sfondo chiaro */
```

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

- [ ] Foto reali del negozio e dei reparti (oggi non ce ne sono)
- [ ] Logo ufficiale al posto del monogramma "DB"
- [ ] Pagina dedicata alle offerte telefonia
- [ ] Collegamento a Instagram/Facebook
- [ ] Modulo contatti (richiede un servizio esterno o PHP su Aruba)
