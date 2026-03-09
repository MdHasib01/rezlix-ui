import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = "Project image",
  captionTitle,
  captionSubtitle,
  captionText,
  containerHeight = "100%",
  containerWidth = "100%",
  imageHeight = "100%",
  imageWidth = "100%",
  scaleOnHover = 1.08,
  rotateAmplitude = 14,
  showTooltip = true,
  showMobileWarning = false,
  displayOverlayContent = false,
  overlayContent = null,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(0, springValues);
  const rotateY = useSpring(0, springValues);
  const scale = useSpring(1, springValues);
  const tooltipOpacity = useSpring(0, springValues);
  const tooltipYOffset = useSpring(12, springValues);

  const [lastY, setLastY] = useState(0);

  function handleMouseMove(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    tooltipYOffset.set(12 + velocityY * 0.05);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    tooltipOpacity.set(1);
  }

  function handleMouseLeave() {
    tooltipOpacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    tooltipYOffset.set(12);
  }

  return (
    <div
      style={{
        width: containerWidth,
        height: containerHeight,
        perspective: "1200px",
      }}
    >
      {showMobileWarning && (
        <p
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            opacity: 0.6,
            marginBottom: "0.5rem",
          }}
        >
          Best experienced on desktop
        </p>
      )}

      <motion.figure
        ref={ref}
        style={{
          width: imageWidth,
          height: imageHeight,
          x,
          y,
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="relative overflow-hidden rounded-md bg-neutral-900/40 border border-white/8 shadow-[0_18px_45px_rgba(0,0,0,0.55)]"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {displayOverlayContent && overlayContent && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-end",
              padding: "1.25rem",
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.72) 72%, rgba(0,0,0,0.9) 100%)",
              pointerEvents: "none",
            }}
          >
            <div style={{ width: "100%" }}>{overlayContent}</div>
          </div>
        )}

        <motion.figcaption
          style={{
            opacity: tooltipOpacity,
            y: tooltipYOffset,
            transformOrigin: "bottom left",
          }}
          className="pointer-events-none absolute left-4 bottom-4 right-4 text-left text-sm leading-tight text-white/90 drop-shadow-[0_8px_18px_rgba(0,0,0,0.85)]"
        >
          {showTooltip && (
            <div className="space-y-1">
              {(captionTitle || captionText) && (
                <p className="text-base font-medium tracking-wide">
                  {captionTitle || captionText}
                </p>
              )}
              {captionSubtitle && (
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  {captionSubtitle}
                </p>
              )}
            </div>
          )}
        </motion.figcaption>
      </motion.figure>
    </div>
  );
}

