"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "lenis/react";

import Header from "./components/Header";
import CustomCursor from "./components/CustomCursor";
import ProgressBar from "./components/ProgressBar";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import About from "./components/About";
import Team from "./components/Team";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef();
  const containerRef = useRef(null);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

  useGSAP(
    () => {
      const sections = document.querySelectorAll("section");

      sections.forEach((section, index) => {
        const container = section.querySelector(".container");

        if (!container) return;

        gsap.to(container, {
          rotation: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        });

        // Pin the section, except the last one?
        // Or pin all? Original code pinned all except last.
        // If I pin all except last, the last one just scrolls normally.
        if (index === sections.length - 1) return;

        ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <CustomCursor />
      <ProgressBar />
      <Header />

      <main ref={containerRef}>
        <Hero />
        <Portfolio />
        <Services />
        <About />
        <Team />
        <Contact />

        {/* Footer could be a section too or just a footer */}
        <section className="footer">
          <div
            className="container"
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000",
              color: "#fff",
            }}
          >
            <h2>REZLIX &copy; 2026</h2>
          </div>
        </section>
      </main>
    </>
  );
}
