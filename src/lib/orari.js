const FESTIVI = []

/** Orario settimanale: indice 0 = domenica. */
export const settimana = [
  { giorno: 'Domenica', fasce: [] },
  { giorno: 'Lunedì', fasce: [['08:30', '13:00'], ['16:30', '20:00']] },
  { giorno: 'Martedì', fasce: [['08:30', '13:00'], ['16:30', '20:00']] },
  { giorno: 'Mercoledì', fasce: [['08:30', '13:00'], ['16:30', '20:00']] },
  { giorno: 'Giovedì', fasce: [['08:30', '13:00'], ['16:30', '20:00']] },
  { giorno: 'Venerdì', fasce: [['08:30', '13:00'], ['16:30', '20:00']] },
  { giorno: 'Sabato', fasce: [['08:30', '13:00'], ['16:30', '20:00']] },
]

const minuti = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Stato di apertura in un dato istante. */
export function statoApertura(adesso = new Date()) {
  const oggi = settimana[adesso.getDay()]
  const ora = adesso.getHours() * 60 + adesso.getMinutes()
  const festivo = FESTIVI.includes(adesso.toISOString().slice(0, 10))

  if (!festivo) {
    for (const [apre, chiude] of oggi.fasce) {
      if (ora >= minuti(apre) && ora < minuti(chiude)) {
        return { aperto: true, etichetta: `Aperto · chiude alle ${chiude}` }
      }
    }
    const prossima = oggi.fasce.find(([apre]) => ora < minuti(apre))
    if (prossima) {
      return { aperto: false, etichetta: `Chiuso · apre alle ${prossima[0]}` }
    }
  }

  for (let i = 1; i <= 7; i += 1) {
    const giorno = settimana[(adesso.getDay() + i) % 7]
    if (giorno.fasce.length) {
      const quando = i === 1 ? 'domani' : giorno.giorno.toLowerCase()
      return { aperto: false, etichetta: `Chiuso · apre ${quando} alle ${giorno.fasce[0][0]}` }
    }
  }
  return { aperto: false, etichetta: 'Chiuso' }
}
