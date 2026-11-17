/**
 * Logo Dello Buono: le scritte DELLO / BUONO restano ferme e il logo fa un
 * flip tridimensionale sull'asse X (pausa, giro, pausa).
 */
export default function Logo({ size = 58, animated = true }) {
  return (
    <img
      className={`brand-logo ${animated ? 'is-animated' : ''}`}
      src="./logo-full.png"
      alt="Dello Buono Montella"
      width={size}
      height={size}
      style={{ height: `${size}px` }}
      draggable="false"
    />
  )
}
