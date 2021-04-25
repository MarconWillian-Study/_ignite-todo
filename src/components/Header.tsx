import styles from './Head.module.scss';

export function Header() {
  return (
    <header className={styles.header} >
      <div>
        <img src="/logo.svg" alt="to.do"/>
      </div>
    </header>
  )
}