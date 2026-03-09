"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import styles from "./SodaCanExperience.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function SodaCanExperience() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const scannerRef = useRef(null);
  const scanContainerRef = useRef(null);
  const modelRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scanSoundRef = useRef(null);

  const scrollData = useRef({
    currentScroll: 0,
    isFloating: true,
    scannerAbsoluteTop: 0,
  });

  useLenis((lenis) => {
    scrollData.current.currentScroll = lenis.scroll;
  });

  useEffect(() => {
    // 1. Initialize Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.5;
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 10, 7.5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 3);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
    hemiLight.position.set(0, 25, 0);
    scene.add(hemiLight);

    // 3. Load Model
    const loader = new GLTFLoader();
    loader.load(
      "/can3d/josta.glb",
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        model.traverse((node) => {
          if (node.isMesh) {
            if (node.material) {
              node.material.metalness = 0.3;
              node.material.roughness = 0.4;
              node.material.envMapIntensity = 1.5;
            }
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        scene.add(model);

        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.z = maxDim * 1.5;

        model.scale.set(0, 0, 0);

        // Initial animation
        gsap.to(model.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(scanContainerRef.current, {
          scale: 1,
          duration: 1,
          ease: "power2.out",
        });
      },
      undefined,
      (error) => console.error("Error loading model:", error),
    );

    // 4. Animation Loop
    const floatAmplitude = 0.2;
    const floatSpeed = 1.5;
    const rotationSpeed = 0.3;

    const animate = () => {
      const model = modelRef.current;
      if (model) {
        if (scrollData.current.isFloating) {
          const floatOffset =
            Math.sin(Date.now() * 0.001 * floatSpeed) * floatAmplitude;
          model.position.y = floatOffset;
        }

        if (scannerRef.current) {
          scrollData.current.scannerAbsoluteTop =
            scannerRef.current.getBoundingClientRect().top + window.scrollY;
        }

        const scrollProgress = Math.min(
          scrollData.current.currentScroll /
            (scrollData.current.scannerAbsoluteTop || 1),
          1,
        );

        if (scrollProgress < 1) {
          model.rotation.x = scrollProgress * Math.PI * 2;
          model.rotation.y += 0.001 * rotationSpeed;
        }

        // Hide canvas when scrolled past the experience
        if (canvasRef.current) {
          const containerRect = containerRef.current?.getBoundingClientRect();
          if (containerRect) {
            canvasRef.current.style.visibility =
              containerRect.bottom > 0 ? "visible" : "hidden";
          }
        }
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // 5. Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  useGSAP(
    () => {
      if (!scannerRef.current) return;

      const stickyHeight = window.innerHeight;

      // Reset model when scrolling back to top
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "top -10",
        onEnterBack: () => {
          if (modelRef.current) {
            gsap.to(modelRef.current.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 1,
              ease: "power2.out",
            });
            scrollData.current.isFloating = true;
          }
          gsap.to(scanContainerRef.current, {
            scale: 1,
            duration: 1,
            ease: "power2.out",
          });
        },
      });

      // Scanner animation
      ScrollTrigger.create({
        trigger: scannerRef.current,
        start: "top top",
        end: `${stickyHeight}px`,
        pin: true,
        onEnter: () => {
          if (modelRef.current) {
            scrollData.current.isFloating = false;
            modelRef.current.position.y = 0;

            if (scanSoundRef.current) {
              scanSoundRef.current.currentTime = 0;
              scanSoundRef.current
                .play()
                .catch((e) => console.log("Audio play blocked"));
            }

            gsap.to(modelRef.current.rotation, {
              y: modelRef.current.rotation.y + Math.PI * 2,
              duration: 1,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.to(modelRef.current.scale, {
                  x: 0,
                  y: 0,
                  z: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    gsap.to(scanContainerRef.current, {
                      scale: 0,
                      duration: 0.5,
                      ease: "power2.in",
                    });
                  },
                });
              },
            });
          }
        },
        onLeaveBack: () => {
          gsap.set(scanContainerRef.current, { scale: 0 });
          gsap.to(scanContainerRef.current, {
            scale: 1,
            duration: 1,
            ease: "power2.out",
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={styles.experienceContainer}>
      <div ref={canvasRef} className={styles.modelCanvas} />
      <audio ref={scanSoundRef} src="/can3d/scan-sfx.mp3" />

      <section
        className={`${styles.section} ${styles.hero}`}
        data-skip-pin="true"
        data-skip-tilt="true"
      >
        <h1>
          Digital <br />
          Evolution
        </h1>
        <h2>Transform Your Brand Identity</h2>
        <p>
          Experience the next generation of digital product design. We craft
          immersive experiences that blend innovation with functionality,
          helping brands stand out in the digital landscape.
        </p>
      </section>

      <section
        className={`${styles.section} ${styles.info}`}
        data-skip-pin="true"
        data-skip-tilt="true"
      >
        <div className={styles.tags}>
          <p>Brand Strategy</p>
          <p>User Experience</p>
          <p>Digital Products</p>
          <p>Innovation Lab</p>
        </div>
        <h2>
          We believe in creating digital products that not only look exceptional
          but drive real business growth and user engagement through thoughtful
          design and strategic innovation.
        </h2>
        <p>
          Our approach combines cutting-edge technology with human-centered
          design principles. We transform complex challenges into seamless
          digital experiences that resonate with your audience and elevate your
          brand in the digital space.
        </p>
      </section>

      <section
        ref={scannerRef}
        className={`${styles.section} ${styles.scanner}`}
        data-skip-pin="true"
        data-skip-tilt="true"
      >
        <div className={styles.scanInfo}>
          <div className={styles.productId}>
            <h2>#2024</h2>
          </div>
          <div className={styles.productDescription}>
            <p>Transform Your Digital Identity</p>
          </div>
        </div>

        <div
          ref={scanContainerRef}
          className={styles.scanContainer}
          style={{ transform: "scale(0)" }}
        ></div>

        <div className={styles.barcode}>
          <img src="/can3d/barcode.png" alt="barcode" />
        </div>

        <div className={styles.purchased}>
          <p>Innovation Verified</p>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.outro}`}
        data-skip-pin="true"
        data-skip-tilt="true"
      >
        <h2>
          Join the revolution where innovative experience meets strategic
          thinking. Let's create products that don't just exist in digital space
          - they define it.
        </h2>
      </section>
    </div>
  );
}
