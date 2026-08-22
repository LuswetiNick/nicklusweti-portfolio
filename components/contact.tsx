import { Mail } from "lucide-react";
import ContactForm from "./contact-form";
import SectionHeading from "./section-heading";
import styles from "./contact.module.css";

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
          title="Start a Conversation"
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
                <span aria-hidden="true">GH</span>
              </a>
              <a
                href="mailto:luswetideveloper@gmail.com"
                aria-label="Email Nicholas Lusweti"
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
