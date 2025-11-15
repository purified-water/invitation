import React from "react";
import { TypewriterEffect } from "./TypewriterEffect";

interface SpeechBubbleProps {
  text: string;
  isVisible: boolean;
  position?: "top" | "bottom" | "left" | "right";
  onComplete?: () => void;
  className?: string;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  isVisible,
  position = "top",
  onComplete,
  className = "",
}) => {
  if (!isVisible) return null;

  // Get positioning classes based on position prop
  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "-top-16 left-1/2 transform -translate-x-1/2";
      case "bottom":
        return "-bottom-16 left-1/2 transform -translate-x-1/2";
      case "left":
        return "top-1/2 -left-16 transform -translate-y-1/2";
      case "right":
        return "top-1/2 -right-16 transform -translate-y-1/2";
      default:
        return "-top-16 left-1/2 transform -translate-x-1/2";
    }
  };

  // Get tail positioning and direction based on position prop
  const getTailClasses = () => {
    switch (position) {
      case "top":
        return {
          container: "absolute -bottom-2 left-1/2 transform -translate-x-1/2",
          outer:
            "w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-salmon-pink",
          inner:
            "absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-white",
        };
      case "bottom":
        return {
          container: "absolute -top-2 left-1/2 transform -translate-x-1/2",
          outer:
            "w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-salmon-pink",
          inner:
            "absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-b-6 border-b-white",
        };
      case "left":
        return {
          container: "absolute -right-2 top-1/2 transform -translate-y-1/2",
          outer:
            "w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-salmon-pink",
          inner:
            "absolute -left-1.5 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-6 border-l-white",
        };
      case "right":
        return {
          container: "absolute -left-2 top-1/2 transform -translate-y-1/2",
          outer:
            "w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-salmon-pink",
          inner:
            "absolute -right-1.5 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-white",
        };
      default:
        return {
          container: "absolute -bottom-2 left-1/2 transform -translate-x-1/2",
          outer:
            "w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-salmon-pink",
          inner:
            "absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-white",
        };
    }
  };

  const tailClasses = getTailClasses();

  return (
    <div
      className={`absolute ${getPositionClasses()} z-20 animate-in fade-in duration-300 ${className}`}
    >
      {/* Speech Bubble */}
      <div className="relative bg-white border-2 border-salmon-pink rounded-xl px-4 py-2 shadow-lg min-w-max">
        {/* Bubble Content */}
        <div className="text-sm font-medium text-dark-gray whitespace-nowrap">
          <TypewriterEffect text={text} speed={50} onComplete={onComplete} />
        </div>

        {/* Speech Bubble Tail */}
        <div className={tailClasses.container}>
          <div className={tailClasses.outer}></div>
          <div className={tailClasses.inner}></div>
        </div>
      </div>
    </div>
  );
};
