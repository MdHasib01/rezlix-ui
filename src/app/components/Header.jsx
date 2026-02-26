"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import { useLenis } from "lenis/react";

export default function Header() {
  const lenis = useLenis();

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(targetId);
    } else {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">REZLIX</Link>
      </div>
      <nav className={styles.nav}>
        <a href="#visions" onClick={(e) => handleScroll(e, "#visions")}>
          Visions
        </a>
        <a href="#work" onClick={(e) => handleScroll(e, "#work")}>
          Work
        </a>
        <a href="#services" onClick={(e) => handleScroll(e, "#services")}>
          Services
        </a>
        <a href="#about" onClick={(e) => handleScroll(e, "#about")}>
          About
        </a>
        <a href="#team" onClick={(e) => handleScroll(e, "#team")}>
          Team
        </a>
        <a href="#showroom" onClick={(e) => handleScroll(e, "#showroom")}>
          Showroom
        </a>
        <a href="#house" onClick={(e) => handleScroll(e, "#house")}>
          House
        </a>
        <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
          Contact
        </a>
      </nav>
    </header>
  );
}
