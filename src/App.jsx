import Header from './components/Header'
import { negozio, reparti, puntiForza, orari } from './data'

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <p className="eyebrow">Montella · dal cuore dell’Irpinia</p>
        <h1>
          Tutto per la casa,
          <br />
          <span className="accent">a due passi da te.</span>
        </h1>
        <p className="lead">{negozio.claim}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#reparti">
            Scopri i reparti
          </a>
          <a className="btn btn-ghost" href="#contatti">
            Come raggiungerci
          </a>
        </div>
        <ul className="hero-facts">
          <li>
            <strong>Lun – Sab</strong>
            <span>8:30–13:00 · 16:30–20:00</span>
          </li>
          <li>
            <strong>Via del Corso 162-164</strong>
            <span>83048 Montella (AV)</span>
          </li>
          <li>
            <strong>{negozio.telefono}</strong>
            <span>Chiamaci, rispondiamo subito</span>
          </li>
        </ul>
      </div>
    </section>
  )
}

function Reparti() {
  return (
    <section className="section" id="reparti">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">I reparti</p>
          <h2>C’è tutto quello che non trovi altrove</h2>
          <p className="muted">
            Un unico negozio per la casa, la tecnologia e i regali: entra, guarda, tocca e
            chiedi. Ti diamo una mano a scegliere.
          </p>
        </div>

        <div className="cards">
          {reparti.map((r) => (
            <article className="card" key={r.titolo}>
              <span className="card-icon" aria-hidden="true">
                {r.icona}
              </span>
              <h3>{r.titolo}</h3>
              <p>{r.testo}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Negozio() {
  return (
    <section className="section section-alt" id="negozio">
      <div className="wrap split">
        <div>
          <p className="eyebrow">Il negozio</p>
          <h2>Una bottega storica, con lo sguardo al presente</h2>
          <p className="muted">
            Dello Buono è un punto di riferimento a Montella per chi cerca qualcosa di
            concreto: un prodotto che dura, un consiglio sincero, un servizio che funziona.
          </p>
          <p className="muted">
            Qui si entra per una padella e si esce con un regalo per un amico. Perché le
            cose belle per la casa sono anche le cose belle da regalare.
          </p>
        </div>

        <ul className="list">
          {puntiForza.map((p) => (
            <li key={p.titolo}>
              <h3>{p.titolo}</h3>
              <p>{p.testo}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function OrariContatti() {
  const tel = negozio.telefono.replace(/\s/g, '')
  return (
    <section className="section" id="orari">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Orari e contatti</p>
          <h2>Ti aspettiamo in Via del Corso</h2>
        </div>

        <div className="grid-2" id="contatti">
          <div className="panel">
            <h3>Orari di apertura</h3>
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
            <p className="small muted">
              In occasione delle festività gli orari possono variare: chiamaci per conferma.
            </p>
          </div>

          <div className="panel">
            <h3>Dove siamo</h3>
            <address className="address">
              <strong>{negozio.nome}</strong>
              <br />
              {negozio.indirizzo}
              <br />
              {negozio.cap}
            </address>
            <ul className="contact-list">
              <li>
                <span>Telefono</span>
                <a href={`tel:${tel}`}>{negozio.telefono}</a>
              </li>
              {negozio.telefono2 && (
                <li>
                  <span>Secondo numero</span>
                  <a href={`tel:${negozio.telefono2.replace(/\s/g, '')}`}>
                    {negozio.telefono2}
                  </a>
                </li>
              )}
              <li>
                <span>Email</span>
                <a href={`mailto:${negozio.email}`}>{negozio.email}</a>
              </li>
            </ul>
            <a
              className="btn btn-primary full"
              href={negozio.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Apri la mappa
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div>
          <strong>{negozio.nome}</strong>
          <p className="small">
            {negozio.indirizzo} — {negozio.cap}
          </p>
        </div>
        <p className="small muted">© {new Date().getFullYear()} Negozio Dello Buono</p>
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
        <Reparti />
        <Negozio />
        <OrariContatti />
      </main>
      <Footer />
    </>
  )
}
