import { useEffect, useState } from 'react'
import { statoApertura } from '../lib/orari'

/** Pallino + stato di apertura, aggiornato ogni minuto. */
export default function StatoApertura({ className = '' }) {
  const [stato, setStato] = useState(() => statoApertura())

  useEffect(() => {
    const id = window.setInterval(() => setStato(statoApertura()), 60000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className={`stato ${stato.aperto ? 'is-aperto' : 'is-chiuso'} ${className}`.trim()}>
      <i aria-hidden="true" />
      {stato.etichetta}
    </span>
  )
}
