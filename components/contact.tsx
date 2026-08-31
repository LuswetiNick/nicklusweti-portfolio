import { Mail } from "lucide-react";
import ContactForm from "./contact-form";
import SectionHeading from "./section-heading";
import styles from "./contact.module.css";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .297A12 12 0 0 0 8.205 23.69c.6.111.82-.26.82-.578 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.755-1.333-1.755-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.835 2.81 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.303-5.466-1.333-5.466-5.932 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57A12.003 12.003 0 0 0 12 .297Z" />
  </svg>
);

const Contact = () => {
  return (
    <section
      id="contact"
      className={styles.contact}
      aria-labelledby="contact-title"
    >
      <div className={styles.inner}>
        <SectionHeading
          label="Contact"
          title="Contact Nick Lusweti"
          id="contact-title"
        />

        <div className={styles.details}>
          <div className={styles.info} data-reveal="split-left">
            <p className={styles.intro}>
              Hiring for a software development role? I’m open to full-time
              opportunities and selected product collaborations.
            </p>

            <div className={styles.contactDetail}>
              <h3>Email</h3>
              <a href="mailto:luswetideveloper@gmail.com">
                luswetideveloper@gmail.com
              </a>
            </div>

            <div className={styles.contactDetail}>
              <h3>Location</h3>
              <p>Nairobi, Kenya</p>
            </div>

            <div className={styles.socials}>
              <a
                href="https://github.com/LuswetiNick"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
              >
                <GitHubIcon />
              </a>
              <a
                href="mailto:luswetideveloper@gmail.com"
                aria-label="Email Nick Lusweti"
              >
                <Mail aria-hidden="true" />
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
