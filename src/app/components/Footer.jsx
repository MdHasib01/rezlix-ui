"use client";

import Orb from "./Orb";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <section id="footer" className={styles.footer}>
      <div className={styles.orbWrapper}>
        <Orb
          hue={260}
          hoverIntensity={0.5}
          rotateOnHover={true}
          backgroundColor="#000000"
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>REZLIX &copy; 2026</h2>
      </div>
    </section>
  );
}
