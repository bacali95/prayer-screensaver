import { useCallback, useEffect, useRef, useState } from "react";

const backgroundImages = [
  "images/madina-1.jpg",
  "images/madina-2.jpg",
  "images/madina-3.jpg",
  "images/makkah-1.jpg",
  "images/makkah-2.jpg",
  "images/makkah-3.jpg",
];

const ROTATE_INTERVAL_MS = 10_000;
const FADE_DURATION_MS = 1_000;

function pickNextBackground(current: string) {
  if (backgroundImages.length <= 1) return current;

  let next = current;
  while (next === current) {
    next =
      backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  }
  return next;
}

export function LeftPanel() {
  const [currentImage, setCurrentImage] = useState(backgroundImages[0]);
  const [incomingImage, setIncomingImage] = useState<string | null>(null);
  const [incomingVisible, setIncomingVisible] = useState(false);

  const currentImageRef = useRef(currentImage);
  const timeoutRef = useRef<number | null>(null);
  const transitioningRef = useRef(false);

  useEffect(() => {
    currentImageRef.current = currentImage;
  }, [currentImage]);

  const startTransition = useCallback((nextImage: string) => {
    if (transitioningRef.current) return;

    transitioningRef.current = true;
    if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current);

    // Render the incoming image on top at opacity 0, then flip it to 1
    // on the next frame to trigger the CSS transition.
    setIncomingVisible(false);
    setIncomingImage(nextImage);
    window.requestAnimationFrame(() => setIncomingVisible(true));

    timeoutRef.current = window.setTimeout(() => {
      setCurrentImage(nextImage);
      setIncomingImage(null);
      setIncomingVisible(false);
      transitioningRef.current = false;
    }, FADE_DURATION_MS);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const current = currentImageRef.current;
      const next = pickNextBackground(current);
      if (next !== current) startTransition(next);
    }, ROTATE_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
      if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current);
    };
  }, [startTransition]);

  return (
    <div className="relative h-full w-1/2 overflow-hidden">
      <img
        className="absolute inset-0 h-full w-full object-cover object-center"
        src={currentImage}
        alt=""
        aria-hidden="true"
      />

      {incomingImage && (
        <img
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity ease-in-out"
          style={{
            opacity: incomingVisible ? 1 : 0,
            transitionDuration: `${FADE_DURATION_MS}ms`,
          }}
          src={incomingImage}
          alt=""
          aria-hidden="true"
        />
      )}
      <div className="absolute font-arabic flex flex-col bottom-10 left-1/2 -translate-x-1/2 text-white">
        <span className="text-[80px] pr-10">الظهر</span>
        <span className="text-[200px] leading-none">0:44:00</span>
      </div>
    </div>
  );
}
