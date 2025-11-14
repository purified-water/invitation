import { useState } from "react";

export const useVocCode = () => {
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handleTextClick = () => {
    setShowFullscreen(true);

    setTimeout(() => {
      // Close the tab after gif finishes
      try {
        window.close();
        setTimeout(() => {
          window.open("", "_self");
          window.close();
          setTimeout(() => {
            window.location.href = "about:blank";
          }, 100);
        }, 100);
      } catch (error) {
        console.log("Could not close window:", error);
        window.location.href = "about:blank";
      }
    }, 1500);
  };

  return {
    handleTextClick,
    showFullscreen,
  };
};
