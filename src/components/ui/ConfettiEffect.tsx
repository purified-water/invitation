import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface ConfettiEffectProps {
  show: boolean;
  isSpecial?: boolean;
  onComplete?: () => void;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  show,
  isSpecial = false,
  onComplete,
}) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      // Set initial dimensions
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Auto-complete after duration
  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <Confetti
      width={windowDimensions.width}
      height={windowDimensions.height}
      numberOfPieces={isSpecial ? 400 : 250}
      colors={
        isSpecial
          ? [
              "#ff7e70", // salmon
              "#ff91a4", // salmon-pink
              "#ff9f94", // salmon-light
              "#ffb3c1", // salmon-pink-light
              "#a855f7", // purple-500
              "#ec4899", // pink-500
              "#f59e0b", // amber-500
              "#10b981", // emerald-500
            ]
          : [
              "#ff7e70", // salmon
              "#ff91a4", // salmon-pink
              "#ff9f94", // salmon-light
              "#ffb3c1", // salmon-pink-light
              "#fbbf24", // yellow-400
              "#f59e0b", // amber-500
              "#fb7185", // rose-400
            ]
      }
      gravity={0.15}
      wind={0.02}
      initialVelocityX={5}
      initialVelocityY={10}
      recycle={false}
      opacity={0.8}
      drawShape={(ctx) => {
        // Custom shapes for special invitations
        if (isSpecial && Math.random() > 0.7) {
          // Draw stars
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5;
            const x = Math.cos(angle) * 5;
            const y = Math.sin(angle) * 5;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          // Default square/rectangle shapes
          ctx.fillRect(-5, -5, 10, 10);
        }
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
};
