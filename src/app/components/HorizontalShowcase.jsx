"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./HorizontalShowcase.module.css";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    title: "NEON ATRIUM",
    meta: "Adaptive daylight • Parametric shells",
    img: "/img1.jpg",
    tag: "CONCEPT 01",
  },
  {
    title: "SKY BRIDGE",
    meta: "Mixed-use • Carbon-aware structure",
    img: "/img2.jpg",
    tag: "CONCEPT 02",
  },
  {
    title: "DESERT MUSEUM",
    meta: "Thermal mass • Passive cooling",
    img: "/img3.png",
    tag: "CONCEPT 03",
  },
  {
    title: "COASTAL VILLA",
    meta: "Wind-resilient • Low glare facade",
    img: "/img1.jpg",
    tag: "CONCEPT 04",
  },
];

export default function HorizontalShowcase() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const getDistance = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("resize", refresh);

      return () => {
        window.removeEventListener("resize", refresh);
        tween?.scrollTrigger?.kill();
        tween?.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="visions"
      ref={sectionRef}
      className={styles.section}
      data-skip-tilt="true"
    >
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.headerRow}>
          <div>
            <p className={styles.kicker}>HORIZONTAL SCROLL</p>
            <h2 className={styles.title}>Future Visions</h2>
          </div>
          <p className={styles.lede}>
            Scroll to traverse a cinematic strip of speculative architecture —
            modular, sustainable, and engineered for tomorrow.
          </p>
        </div>

        <div className={styles.track} ref={trackRef}>
          {panels.map((p) => (
            <article key={p.title} className={styles.panel}>
              <div className={styles.panelMedia}>
                <img src={p.img} alt={p.title} loading="lazy" />
                <div className={styles.panelOverlay} />
              </div>
              <div className={styles.panelBody}>
                <span className={styles.tag}>{p.tag}</span>
                <h3 className={styles.panelTitle}>{p.title}</h3>
                <p className={styles.panelMeta}>{p.meta}</p>
                <div className={styles.panelCtas}>
                  <a className="interactive" href="#contact">
                    Request a concept
                  </a>
                  <a className="interactive" href="#showroom">
                    View 3D showroom
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.hint}>
          <span className={styles.hintDot} />
          <span>Keep scrolling — the gallery moves horizontally.</span>
        </div>
      </div>
    </section>
  );
}
