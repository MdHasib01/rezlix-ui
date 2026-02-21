"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";

export default function Hero() {
  const containerRef = useRef(null);
  const maskRef = useRef(null);

  // Refs for entrance animations
  const titlePrimaryRef = useRef(null);
  const subtitlePrimaryRef = useRef(null);
  const ctaPrimaryRef = useRef(null);
  const titleSecondaryRef = useRef(null);
  const subtitleSecondaryRef = useRef(null);
  const ctaSecondaryRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const mask = maskRef.current;

    if (!container || !mask) return;

    // --- 1. Mouse Tracking & Reveal Effect ---
    // Initial state
    gsap.set(mask, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
    });

    const xTo = gsap.quickTo(mask, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(mask, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      xTo(x);
      yTo(y);

      // Reveal on first move
      gsap.to(mask, { scale: 1, duration: 0.5, ease: "back.out(1.7)" });
    };

    const handleMouseLeave = () => {
      gsap.to(mask, { scale: 0, duration: 0.5, ease: "power3.in" });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // --- 2. Organic Shape Animation ---
    // Continuous morphing of the mask shape using border-radius
    let organicTimeline;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion) {
      organicTimeline = gsap.timeline({ repeat: -1, yoyo: true });

      organicTimeline
        .to(mask, {
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          duration: 4,
          ease: "sine.inOut",
        })
        .to(mask, {
          borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
          duration: 4,
          ease: "sine.inOut",
        })
        .to(mask, {
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", // Back to startish
          duration: 4,
          ease: "sine.inOut",
        });
    } else {
      // Static comfortable shape for reduced motion
      gsap.set(mask, { borderRadius: "50%" });
    }

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
      if (organicTimeline) organicTimeline.kill();
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
      <div className={`${styles.layer} ${styles.layerPrimary}`}>
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

        {/* The "Eraser" Mask */}
        <div ref={maskRef} className={styles.revealMask}></div>
      </div>
    </section>
  );
}
