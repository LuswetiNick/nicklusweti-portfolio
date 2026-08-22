import Link from "next/link";
import styles from "./floating-nav.module.css";

const navigation = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#projects" },
  { label: "Capabilities", href: "/#capabilities", optional: true },
];

const FloatingNav = () => (
  <nav className={styles.nav} aria-label="Primary navigation">
    {navigation.map(({ label, href, optional }) => (
      <Link
        key={href}
        className={optional ? styles.optional : styles.link}
        href={href}
      >
        {label}
      </Link>
    ))}
    <a className={styles.cta} href="mailto:luswetideveloper@gmail.com">
      Email Nick
    </a>
  </nav>
);

export default FloatingNav;
