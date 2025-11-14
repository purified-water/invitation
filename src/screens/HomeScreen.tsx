import React from "react";
import { DontVooc } from "../components/ui/DontVooc";
import { useVocCode } from "../hooks/useVocCode";

export const HomeScreen: React.FC = () => {
  const { handleTextClick, showFullscreen } = useVocCode();

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <img src="/sus.gif" alt="Sus" className="h-64 w-auto" />
        <div
          className="hover:text-red-500 hover:font-bold hover:text-2xl cursor-pointer transition-all duration-200 select-none"
          role="button"
          tabIndex={0}
          onClick={handleTextClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleTextClick();
            }
          }}
        >
          Đừng có đi vọc
        </div>
      </div>

      <DontVooc shouldShow={showFullscreen} />
    </>
  );
};
