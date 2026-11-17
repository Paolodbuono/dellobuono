const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function IconElettrodomestici(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...props}>
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
      <path d="M4 9.5h16" />
      <path d="M7.5 5.5v2M7.5 12.5v2" />
    </svg>
  )
}

export function IconRegalo(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...props}>
      <rect x="3" y="8.5" width="18" height="12.5" rx="2" />
      <path d="M3 12.5h18M12 8.5V21" />
      <path d="M12 8.5C9.5 8.5 8 7 8 5.5A2 2 0 0 1 12 5a2 2 0 0 1 4 .5c0 1.5-1.5 3-4 3Z" />
    </svg>
  )
}

export function IconTavola(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
    </svg>
  )
}

export function IconTelefono(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="3" />
      <path d="M10.5 18.5h3" />
    </svg>
  )
}

export function IconPin(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

export function IconArrow(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M5 12h13M13 6.5 18.5 12 13 17.5" />
    </svg>
  )
}

export function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    </svg>
  )
}
