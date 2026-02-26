"use client";

import styles from "./HouseModel.module.css";
import ModelViewer from "./ModelViewer";

export default function HouseModel() {
  return (
    <section id="house" className={styles.section} data-skip-tilt="true">
      <div className={`container ${styles.container}`}>
        <div className={styles.copy}>
          <p className={styles.kicker}>FULL SCENE MODEL</p>
          <h2 className={styles.title}>Exterior Architecture</h2>
          <p className={styles.sub}>
            A complete house model presented in real-time 3D — ideal for client
            walkthroughs, façade studies, and early-stage iteration.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>01</span>
              <span className={styles.statLabel}>Master Model</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>360°</span>
              <span className={styles.statLabel}>Orbit View</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>GLB</span>
              <span className={styles.statLabel}>Optimized Asset</span>
            </div>
          </div>

          <div className={styles.ctas}>
            <a className="interactive" href="#contact">
              Start a project
            </a>
            <a className="interactive" href="#work">
              See selected works
            </a>
          </div>
        </div>

        <div className={styles.viewerWrap}>
          <ModelViewer
            className={styles.viewer}
            src={"/exterior_architecture (1).glb"}
            alt="Exterior house model"
            exposure="1.05"
            shadowIntensity="1"
            cameraOrbit="30deg 70deg 10m"
            fieldOfView="30deg"
            rotationPerSecond="10deg"
          />
          <div className={styles.viewerHint}>Drag to rotate • Scroll to zoom</div>
        </div>
      </div>
    </section>
  );
}

