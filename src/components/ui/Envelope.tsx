import React, { useState } from "react";

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    // Delay the onOpen callback to allow animation to complete
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-linear-to-br from-amber-50 to-pink-50">
      <div>
        <img
          src="/click_me.gif"
          alt="Click to Open"
          className={`cursor-pointer select-none w-48 h-48 md:w-64 md:h-64 object-contain ${
            isOpening ? "animate-open-envelope" : "animate-pulse-slow"
          } hover:scale-105 transition-transform duration-300`}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
