"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";

export default function Hero() {
  const containerRef = useRef(null);
  const primaryLayerRef = useRef(null);

  // Refs for entrance animations
  const titlePrimaryRef = useRef(null);
  const subtitlePrimaryRef = useRef(null);
  const ctaPrimaryRef = useRef(null);
  const titleSecondaryRef = useRef(null);
  const subtitleSecondaryRef = useRef(null);
  const ctaSecondaryRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const primaryLayer = primaryLayerRef.current;

    if (!container || !primaryLayer) return;

    // --- 1. Mouse Tracking & Reveal Effect ---
    gsap.set(primaryLayer, {
      "--mask-x": "50%",
      "--mask-y": "50%",
      "--mask-radius": "0px",
    });

    const setMaskX = gsap.quickSetter(primaryLayer, "--mask-x", "px");
    const setMaskY = gsap.quickSetter(primaryLayer, "--mask-y", "px");
    let revealed = false;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMaskX(x);
      setMaskY(y);

      if (!revealed) {
        revealed = true;
        gsap.to(primaryLayer, {
          "--mask-radius": "220px",
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(primaryLayer, {
        "--mask-radius": "0px",
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          revealed = false;
        },
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // --- 3. Entrance Animations ---
    const tl = gsap.timeline({ delay: 0.2 });

    const elements = [
      [titleSecondaryRef.current, titlePrimaryRef.current],
      [subtitleSecondaryRef.current, subtitlePrimaryRef.current],
      [ctaSecondaryRef.current, ctaPrimaryRef.current],
    ];

    elements.forEach(([sec, prim], index) => {
      tl.fromTo(
        [sec, prim],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        index * 0.1,
      );
    });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.heroSection} ref={containerRef}>
      {/* 
        Layer 1: Secondary (Bottom)
        Visible when the mask "erases" the top layer.
      */}
      <div className={`${styles.layer} ${styles.layerSecondary}`}>
        <img
          src="/img2.jpg"
          alt="Secondary Background"
          className={styles.bgImage}
        />
        <div className={styles.content}>
          <h1 ref={titleSecondaryRef} className={styles.title}>
            Form <br /> & Function
          </h1>
          <p ref={subtitleSecondaryRef} className={styles.subtitle}>
            We create spaces that inspire, endure, and elevate the human
            experience through visionary architectural design.
          </p>
          <a ref={ctaSecondaryRef} href="#work" className={styles.ctaButton}>
            View Projects
          </a>
        </div>
      </div>

      {/* 
        Layer 2: Primary (Top)
        Visible by default. Contains the "mask" that cuts through it.
      */}
      <div
        className={`${styles.layer} ${styles.layerPrimary}`}
        ref={primaryLayerRef}
      >
        <img
          src="/img1.jpg"
          alt="Primary Background"
          className={styles.bgImage}
        />
        <div className={styles.content}>
          <h1 ref={titlePrimaryRef} className={styles.title}>
            Form <br /> & Function
          </h1>
          <p ref={subtitlePrimaryRef} className={styles.subtitle}>
            We create spaces that inspire, endure, and elevate the human
            experience through visionary architectural design.
          </p>
          <a ref={ctaPrimaryRef} href="#work" className={styles.ctaButton}>
            View Projects
          </a>
        </div>
      </div>
    </section>
  );
}
