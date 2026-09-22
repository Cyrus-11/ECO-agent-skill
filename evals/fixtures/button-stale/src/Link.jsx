export function Link({ href, children }) {
  return <a href={href} style={{ borderRadius: 'var(--control-radius)' }}>{children}</a>;
}
