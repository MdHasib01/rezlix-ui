"use client";
import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate form submission
  };

  return (
    <section id="contact" className="contact">
      <div
        className="container"
        style={{ flexDirection: "column", justifyContent: "center" }}
      >
        <h2 style={{ marginBottom: "2rem" }}>Get in Touch</h2>

        {!submitted ? (
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input type="text" id="name" required className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                required
                className={styles.textarea}
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        ) : (
          <div className={styles.successMessage}>
            <p>Thank you for your message. We will be in touch shortly.</p>
          </div>
        )}
      </div>
    </section>
  );
}
