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

Il file originale del logo è `images.jpg` nella radice del progetto (va bene
così: Vite lo importa e lo ottimizza nel build).

- In alto a sinistra viene mostrato un **medaglione circolare** in cui si vede
  solo il monogramma DB, che **ruota** (16 s per giro). Le scritte DELLO/BUONO
  restano fuori dal ritaglio, quindi non girano mai.
- Il ritaglio si regola in `src/styles.css`, su `.logo-spinner`:
  - `background-size: 172%` → quanto zoom sul monogramma (aumenta = più zoom)
  - `background-position: 50.5% 52%` → centratura del ritaglio
- La rotazione si disattiva da sola con "Riduci animazioni" attivo nel sistema.
- Favicon della scheda: `public/favicon.png`.

Se vuoi tornare al logo intero (scritta inclusa) senza rotazione, basta
sostituire `<Logo size={54} />` in `Header.jsx` con un `<img src="…">`.


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
