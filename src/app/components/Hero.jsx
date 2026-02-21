"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";

export default function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      );
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <div className={styles.heroContent}>
          <h1 ref={titleRef} className={styles.heroTitle}>
            Form <br /> & Function
          </h1>
          <p ref={subtitleRef} className={styles.heroSubtitle}>
            We create spaces that inspire, endure, and elevate the human
            experience through visionary architectural design.
          </p>
          <a ref={ctaRef} href="#work" className={styles.cta}>
            View Projects
          </a>
        </div>
        <img
          src="/img3.png"
          alt="Architectural Detail"
          className={styles.heroImage}
        />
      </div>
    </section>
  );
}
