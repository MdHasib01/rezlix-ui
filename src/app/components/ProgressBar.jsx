"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProgressBar.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0,
      },
    });
  }, []);

  return (
    <div className={styles.progressBarContainer}>
      <div ref={barRef} className={styles.progressBar} />
    </div>
  );
}
