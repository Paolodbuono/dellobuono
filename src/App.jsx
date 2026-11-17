import { useState } from 'react'
import Header from './components/Header'
import Reveal from './components/Reveal'
import StatoApertura from './components/StatoApertura'
import {
  IconElettrodomestici,
  IconRegalo,
  IconTavola,
  IconTelefono,
  IconPin,
  IconArrow,
  IconPhone,
} from './components/Icons'
import fotoNegozioJpg from './assets/negozio.jpg'
import fotoNegozioWebp from './assets/negozio.webp'
import { negozio, reparti, puntiForza, orari, marquee } from './data'

const ICONE = {
  elettrodomestici: IconElettrodomestici,
  regalo: IconRegalo,
  tavola: IconTavola,
  telefono: IconTelefono,
}

const MAPS_QUERY = 'Via del Corso 162, 83048 Montella AV'
const tel = negozio.telefono.replace(/\s/g, '')

function FotoNegozio({ className = '' }) {
  return (
    <picture className={className}>
      <source srcSet={fotoNegozioWebp} type="image/webp" />
      <img
        src={fotoNegozioJpg}
        alt="La vetrina del Negozio Dello Buono in Via del Corso a Montella"
        loading="lazy"
        decoding="async"
        width="1209"
        height="833"
      />
    </picture>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            <IconPin />
            Montella (AV) · Via del Corso 162-164
            <span className="kicker-sep" aria-hidden="true" />
            <StatoApertura />
          </p>

          <h1 className="hero-title">
            <span>Elettrodomestici,</span>
            <span>
              <em>regali</em> e casalinghi.
            </span>
          </h1>

          <p className="hero-lead">
            Un negozio di persona, in centro a Montella: consigli veri, assistenza fatta
            qui e una scelta di regali che non trovi al supermercato.
          </p>

          <div className="hero-actions">
            <a className="btn btn-light" href="#negozio">
              Vieni a trovarci
              <IconArrow />
            </a>
            <a className="btn btn-outline-light" href={`tel:${tel}`}>
              <IconPhone />
              {negozio.telefono}
            </a>
          </div>
        </div>

        <div className="hero-media">
          <figure className="hero-photo">
            <FotoNegozio />
          </figure>
        </div>
      </div>

      <div className="wrap hero-foot">
        <div>
          <strong>Lun – Sab</strong>
          <span>8:30–13:00 · 16:30–20:00</span>
        </div>
        <div>
          <strong>Elettrodomestici</strong>
          <span>Grandi e piccoli, per tutta la casa</span>
        </div>
        <div>
          <strong>Regali e idee</strong>
          <span>Per le occasioni che contano</span>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const voci = [...marquee, ...marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {voci.map((v, i) => (
          <span key={`${v}-${i}`}>
            {v}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}

function Reparti() {
  return (
    <section className="section" id="reparti">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="kicker">
            <em>01</em> I reparti
          </p>
          <h2 className="display">
            Tutto quello che serve,
            <br />
            <span className="muted-ink">in un solo indirizzo.</span>
          </h2>
        </Reveal>

        <div className="bento">
          {reparti.map((r, i) => {
            const Icona = ICONE[r.icona]
            return (
              <Reveal
                key={r.titolo}
                as="article"
                delay={i * 70}
                className={`bento-card ${r.grande ? 'bento-wide' : ''}`}
              >
                <div className="bento-top">
                  <span className="bento-num">{r.numero}</span>
                  <span className="bento-icon">
                    <Icona />
                  </span>
                </div>
                <h3>{r.titolo}</h3>
                <p>{r.testo}</p>
              </Reveal>
            )
          })}

          <Reveal as="article" delay={280} className="bento-card bento-quote">
            <p className="bento-quote-text">
              «Si entra per una padella e si esce con un regalo per un amico.»
            </p>
            <span className="bento-quote-by">Il banco, ogni giorno</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Negozio() {
  return (
    <section className="section section-alt" id="negozio">
      <div className="wrap store-grid">
        <Reveal className="store-visual">
          <figure className="store-photo">
            <FotoNegozio />
          </figure>
          <span className="store-caption">La vetrina di Via del Corso 162-164</span>
        </Reveal>

        <div className="store-body">
          <Reveal>
            <p className="kicker">
              <em>02</em> Il negozio
            </p>
            <h2 className="display">
              Una bottega <span className="muted-ink">storica</span>, con lo sguardo al
              presente.
            </h2>
            <p className="lead-soft">
              Dello Buono è un punto di riferimento a Montella per chi cerca qualcosa di
              concreto: un elettrodomestico che dura, un regalo pensato bene, un consiglio
              sincero.
            </p>
          </Reveal>

          <ul className="points">
            {puntiForza.map((p, i) => (
              <Reveal as="li" key={p.titolo} delay={i * 80}>
                <span className="points-num">{p.numero}</span>
                <div>
                  <h3>{p.titolo}</h3>
                  <p>{p.testo}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Mappa() {
  const [attiva, setAttiva] = useState(false)
  const src = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=17&hl=it&output=embed`

  return (
    <div className="map-card" id="mappa">
      <div className="map-frame">
        {attiva ? (
          <iframe
            title="Mappa: Negozio Dello Buono, Via del Corso 162, Montella"
            src={src}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <button type="button" className="map-placeholder" onClick={() => setAttiva(true)}>
            <span className="map-pin" aria-hidden="true">
              <IconPin />
            </span>
            <strong>Carica la mappa</strong>
            <small>Via del Corso 162-164 · Montella</small>
            <em>
              La mappa si collega a Google solo quando la apri: nessun cookie di terze
              parti prima del tuo consenso.
            </em>
          </button>
        )}
      </div>
      <a className="map-link" href={negozio.mapsUrl} target="_blank" rel="noreferrer">
        Apri in Google Maps <IconArrow />
      </a>
    </div>
  )
}

function DoveSiamo() {
  return (
    <section className="section section-dark" id="orari">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="kicker kicker-light">
            <em>03</em> Dove siamo
          </p>
          <h2 className="display">
            In centro a Montella,
            <br />
            <span className="gold-ink">facile da raggiungere.</span>
          </h2>
        </Reveal>

        <div className="dove-grid">
          <Reveal className="dove-info">
            <div className="stato-riga">
              <StatoApertura className="stato-grande" />
            </div>

            <table className="orari">
              <thead>
                <tr>
                  <th scope="col">Giorno</th>
                  <th scope="col">Mattina</th>
                  <th scope="col">Pomeriggio</th>
                </tr>
              </thead>
              <tbody>
                {orari.map((o) => (
                  <tr key={o.giorno}>
                    <th scope="row">{o.giorno}</th>
                    <td>{o.mattina}</td>
                    <td>{o.pomeriggio}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <address className="address">
              {negozio.indirizzo}
              <br />
              {negozio.cap}
            </address>

            <ul className="contact-list">
              <li>
                <a href={`tel:${tel}`}>{negozio.telefono}</a>
              </li>
              {negozio.telefono2 && (
                <li>
                  <a href={`tel:${negozio.telefono2.replace(/\s/g, '')}`}>
                    {negozio.telefono2}
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${negozio.email}`}>{negozio.email}</a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120} className="dove-map">
            <Mappa />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="cta">
      <div className="wrap cta-inner">
        <p className="kicker">
          <em>04</em> Passa a trovarci
        </p>
        <a className="cta-phone" href={`tel:${tel}`}>
          {negozio.telefono}
        </a>
        <p className="cta-text">
          Ti aspettiamo in Via del Corso, dal lunedì al sabato. Per un consiglio veloce,
          un regalo o un preventivo, chiamaci.
        </p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="footer-word" aria-hidden="true">
          Dello Buono
        </p>
        <div className="footer-riga">
          <p>
            {negozio.nome} · {negozio.indirizzo} · {negozio.cap}
          </p>
          <p className="muted">© {new Date().getFullYear()} Negozio Dello Buono</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Reparti />
        <Negozio />
        <DoveSiamo />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
