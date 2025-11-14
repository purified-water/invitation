import React, { useState } from "react";

interface EnvelopeProps {
  onOpen: () => void;
  isSpecial?: boolean;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  onOpen,
  isSpecial = false,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    // Delay the onOpen callback to allow animation to complete
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-amber-50 to-pink-50">
      <div className="text-center">
        {/* Envelope Container */}
        <div
          className={`relative cursor-pointer transition-all duration-700 transform ${
            isOpening ? "scale-110 rotate-3" : "hover:scale-105 animate-float"
          }`}
          onClick={handleClick}
        >
          {/* Envelope Body */}
          <div
            className={`relative w-80 h-56 mx-auto transition-all duration-700 ${
              isSpecial
                ? "bg-linear-to-br from-salmon-pink to-salmon-light"
                : "bg-linear-to-br from-amber-100 to-orange-100"
            } rounded-lg shadow-xl ${isOpening ? "shadow-2xl" : ""}`}
          >
            {/* Envelope Flap */}
            <div
              className={`absolute -top-2 left-0 right-0 h-32 transition-all duration-700 origin-bottom transform ${
                isOpening ? "-rotate-12 translate-y-2" : ""
              } ${
                isSpecial
                  ? "bg-linear-to-b from-salmon to-salmon-pink"
                  : "bg-linear-to-b from-orange-200 to-amber-200"
              } rounded-t-lg shadow-lg`}
              style={{
                clipPath: "polygon(0 0, 50% 60%, 100% 0, 100% 100%, 0 100%)",
              }}
            />

            {/* Envelope Seal/Sticker */}
            <div
              className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full shadow-md transition-all duration-500 ${
                isOpening ? "scale-110" : ""
              } ${
                isSpecial
                  ? "bg-linear-to-br from-purple-400 to-pink-400"
                  : "bg-linear-to-br from-red-400 to-pink-400"
              } flex items-center justify-center`}
            >
              <div className="w-6 h-6 bg-white rounded-full opacity-80"></div>
            </div>

            {/* Invitation Peek */}
            <div
              className={`absolute bottom-4 left-4 right-4 h-32 bg-white rounded shadow-inner transition-all duration-700 transform ${
                isOpening ? "-translate-y-5 scale-105" : ""
              } opacity-80`}
            >
              <div className="p-4 h-full flex flex-col justify-center">
                <div className="h-2 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Instruction Text */}
        <div className="mt-8">
          <p className="text-lg text-dark-gray font-light">
            {isOpening ? "Opening..." : "Click to open your invitation"}
          </p>
          {isSpecial && !isOpening && (
            <p className="text-sm text-salmon-pink mt-2 italic">
              ✨ Special Invitation ✨
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
