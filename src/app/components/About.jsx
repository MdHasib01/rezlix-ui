"use client";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className="about">
      <div
        className="container"
        style={{ flexDirection: "column", justifyContent: "center" }}
      >
        <h2 style={{ marginBottom: "2rem" }}>Who We Are</h2>
        <p className={styles.aboutText}>
          We are a collective of architects, designers, and thinkers dedicated
          to shaping the future of built environments. Our philosophy is rooted
          in the belief that good design should be accessible, sustainable, and
          timeless.
        </p>

        <div className={styles.statGrid}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>15+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>120+</span>
            <span className={styles.statLabel}>Projects Completed</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>25</span>
            <span className={styles.statLabel}>Awards Won</span>
          </div>
        </div>
      </div>
    </section>
  );
}
