"use client";

import { useEffect } from "react";

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
  useEffect(() => {
    // `@google/model-viewer` touches `navigator` during module evaluation,
    // so we only import it in the browser.
    import("@google/model-viewer");
  }, []);

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
    />
  );
}

