import Link from "next/link";
import styles from "./footer.module.css";

const footerLinks = [
  { label: "About", href: "/#about" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.name} data-reveal="footer-wordmark">
          <Link href="/#top" aria-label="Back to the top">
            Nick Lusweti
          </Link>
        </div>

        <nav
          className={styles.links}
          aria-label="Footer navigation"
          data-reveal="heading"
        >
          {footerLinks.map(({ label, href }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </footer>

      <div className={styles.copyright} data-reveal="heading">
        <p>©{new Date().getFullYear()}</p>
      </div>
    </>
  );
};

export default Footer;
