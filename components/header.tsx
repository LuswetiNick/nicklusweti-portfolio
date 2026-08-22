import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          className={styles.mark}
          href="/#top"
          aria-label="Nick Lusweti, home"
        >
          <span className={styles.monogram} aria-hidden="true">
            <span className={styles.letter}>N</span>
            <span className={styles.slash} />
            <span className={styles.letter}>L</span>
          </span>
        </Link>

        <div className={styles.availability}>
          <span className={styles.status} aria-hidden="true">
            <span />
          </span>
          <span>Open to software development roles</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
