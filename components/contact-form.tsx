"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  sendContactMessage,
  type ContactFormState,
} from "@/app/actions/contact";
import styles from "./contact.module.css";

const initialState: ContactFormState = {
  status: "idle",
  message: "",
};

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className={styles.form}
      data-reveal="split-right"
      data-reveal-delay="1"
    >
      <fieldset className={styles.fields} disabled={pending}>
        <label>
          <span className={styles.visuallyHidden}>Full name</span>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={
              state.errors?.name ? "contact-name-error" : undefined
            }
          />
          {state.errors?.name && (
            <span className={styles.fieldError} id="contact-name-error">
              {state.errors.name}
            </span>
          )}
        </label>

        <label>
          <span className={styles.visuallyHidden}>Email address</span>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            maxLength={254}
            inputMode="email"
            required
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={
              state.errors?.email ? "contact-email-error" : undefined
            }
          />
          {state.errors?.email && (
            <span className={styles.fieldError} id="contact-email-error">
              {state.errors.email}
            </span>
          )}
        </label>

        <label>
          <span className={styles.visuallyHidden}>Inquiry type</span>
          <select
            id="contact-inquiry-type"
            name="inquiryType"
            defaultValue=""
            required
            aria-invalid={Boolean(state.errors?.inquiryType)}
            aria-describedby={
              state.errors?.inquiryType
                ? "contact-inquiry-type-error"
                : undefined
            }
          >
            <option value="" disabled>
              Inquiry Type
            </option>
            <option>Employment Opportunity</option>
            <option>Contract Opportunity</option>
            <option>Product Collaboration</option>
            <option>Other</option>
          </select>
          {state.errors?.inquiryType && (
            <span
              className={styles.fieldError}
              id="contact-inquiry-type-error"
            >
              {state.errors.inquiryType}
            </span>
          )}
        </label>

        <label>
          <span className={styles.visuallyHidden}>Message</span>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Message"
            minLength={20}
            maxLength={2000}
            required
            aria-invalid={Boolean(state.errors?.message)}
            aria-describedby={
              state.errors?.message ? "contact-message-error" : undefined
            }
          />
          {state.errors?.message && (
            <span className={styles.fieldError} id="contact-message-error">
              {state.errors.message}
            </span>
          )}
        </label>

        <label className={styles.honeypot} aria-hidden="true">
          Website
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </fieldset>

      <p
        className={styles.formStatus}
        data-status={state.status}
        role={state.status === "error" ? "alert" : "status"}
        aria-live={state.status === "error" ? "assertive" : "polite"}
      >
        {state.message}
      </p>

      <button type="submit" disabled={pending} aria-disabled={pending}>
        {pending
          ? "Sending Message…"
          : state.status === "success"
            ? "Send Another Message"
            : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
