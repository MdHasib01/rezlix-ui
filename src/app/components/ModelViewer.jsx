"use client";

import { useEffect, useState } from "react";

export default function ModelViewer({
  src,
  alt,
  poster,
  className,
  cameraOrbit,
  fieldOfView,
  exposure = "1",
  shadowIntensity = "0.9",
  autoRotate = true,
  autoRotateDelay = 0,
  rotationPerSecond = "18deg",
}) {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      import("@google/model-viewer").catch((err) => {
        console.error("[ModelViewer] Failed to load module:", err);
        setError("Failed to load 3D engine");
      });
    }
  }, []);

  if (!isClient) {
    return (
      <div
        className={className}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "320px",
          background: "rgba(255,255,255,0.05)",
        }}
      />
    );
  }

  if (error) {
    return (
      <div
        className={className}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "320px",
          background: "rgba(255,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <model-viewer
      className={className}
      src={src}
      alt={alt}
      poster={poster}
      camera-controls
      disable-pan
      interaction-prompt="auto"
      loading="eager"
      reveal="auto"
      environment-image="neutral"
      exposure={exposure}
      shadow-intensity={shadowIntensity}
      auto-rotate={autoRotate ? "" : undefined}
      auto-rotate-delay={autoRotate ? String(autoRotateDelay) : undefined}
      rotation-per-second={autoRotate ? rotationPerSecond : undefined}
      camera-orbit={cameraOrbit}
      field-of-view={fieldOfView}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "320px",
        display: "block",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "14px",
      }}
    >
      <div
        slot="poster"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          background: "rgba(0,0,0,0.3)",
          color: "rgba(255,255,255,0.7)",
          fontSize: "0.9rem",
          fontWeight: "bold",
        }}
      >
        LOADING: {src.split("/").pop()}
      </div>
    </model-viewer>
  );
}
