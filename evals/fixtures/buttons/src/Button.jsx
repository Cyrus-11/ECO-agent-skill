import styles from './Button.module.css';

export function Button({ destructive = false, disabled = false, children }) {
  return <button disabled={disabled}
    className={`${styles.button} ${destructive ? styles.destructive : styles.primary}`}>
    {children}
  </button>;
}
