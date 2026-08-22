"use client";

import styles from "./contact.module.css";

const ContactForm = () => (
  <form
    className={styles.form}
    data-reveal="split-right"
    data-reveal-delay="1"
    onSubmit={(event) => event.preventDefault()}
  >
    <label>
      <span className={styles.visuallyHidden}>Full name</span>
      <input name="name" type="text" placeholder="Full Name" />
    </label>
    <label>
      <span className={styles.visuallyHidden}>Email address</span>
      <input name="email" type="email" placeholder="Email Address" />
    </label>
    <label>
      <span className={styles.visuallyHidden}>Inquiry type</span>
      <select name="inquiryType" defaultValue="">
        <option value="" disabled>
          Inquiry Type
        </option>
        <option>Employment Opportunity</option>
        <option>Contract Opportunity</option>
        <option>Product Collaboration</option>
        <option>Other</option>
      </select>
    </label>
    <label>
      <span className={styles.visuallyHidden}>Message</span>
      <textarea name="message" placeholder="Message" />
    </label>
    <button type="submit">Send Message</button>
  </form>
);

export default ContactForm;
