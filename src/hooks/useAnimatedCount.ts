import { useEffect, useState } from "react";

export function useAnimatedCount(target: number | undefined, duration = 1000) {
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    if (!target) return;

    let frame = 0;
    const frameDuration = 16;
    const totalFrames = Math.round(duration / frameDuration);

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const current = Math.round(target * progress);
      setAnimatedCount(current);

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [target, duration]);

  return animatedCount;
}
