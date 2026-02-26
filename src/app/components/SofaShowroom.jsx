"use client";

import styles from "./SofaShowroom.module.css";
import ModelViewer from "./ModelViewer";

const sofaModels = [
  {
    name: "Sofa Chair",
    subtitle: "Compact lounge module",
    src: "/sofa_chair.glb",
  },
  {
    name: "victorian style sofa",
    subtitle: "Variant geometry + materials",
    src: "/victorian_style_sofa.glb",
  },
  {
    name: "Sofa Combination",
    subtitle: "Modular seating system",
    src: "/sofa_combination.glb",
  },
];

export default function SofaShowroom() {
  return (
    <section id="showroom" className={styles.section} data-skip-tilt="true">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <p className={styles.kicker}>3D PRODUCT SHOWCASE</p>
          <h2 className={styles.title}>Sofa Model Showroom</h2>
          <p className={styles.sub}>
            Explore furniture modules in real-time 3D. Drag to orbit, scroll to
            zoom.
          </p>
        </div>

        <div className={styles.grid}>
          {sofaModels.map((m) => (
            <article key={m.src} className={styles.card}>
              <div className={styles.viewerWrap}>
                <ModelViewer
                  className={styles.viewer}
                  src={m.src}
                  alt={m.name}
                  exposure="1.05"
                  shadowIntensity="1"
                  cameraOrbit="35deg 70deg 3.2m"
                  fieldOfView="35deg"
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{m.name}</h3>
                <p className={styles.cardSub}>{m.subtitle}</p>
                <div className={styles.metaRow}>
                  <span className={styles.pill}>GLB</span>
                  <span className={styles.pill}>Orbit Controls</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
