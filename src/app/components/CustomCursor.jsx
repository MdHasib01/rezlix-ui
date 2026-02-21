"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Initial set
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });

      const target = e.target;
      const isLink =
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".interactive");
      const isImage = target.closest("img") || target.closest(".img-container");

      if (isLink) {
        setIsHovering(true);
        setHoverType("link");
      } else if (isImage) {
        setIsHovering(true);
        setHoverType("image");
      } else {
        setIsHovering(false);
        setHoverType("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (isHovering) {
      if (hoverType === "link") {
        gsap.to(cursor, { scale: 0, duration: 0.3 });
        gsap.to(follower, {
          scale: 1.5,
          backgroundColor: "rgba(188, 71, 73, 0.2)",
          borderColor: "transparent",
          duration: 0.3,
        });
      } else if (hoverType === "image") {
        gsap.to(cursor, { scale: 0, duration: 0.3 });
        gsap.to(follower, {
          scale: 2,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderColor: "transparent",
          mixBlendMode: "difference",
          duration: 0.3,
        });
      }
    } else {
      gsap.to(cursor, { scale: 1, backgroundColor: "#bc4749", duration: 0.3 });
      gsap.to(follower, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "#bc4749",
        mixBlendMode: "normal",
        duration: 0.3,
      });
    }
  }, [isHovering, hoverType]);

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={followerRef} className={styles.follower} />
    </>
  );
}
