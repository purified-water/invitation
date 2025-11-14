import React from "react";

interface DividerProps {
  isSpecial: boolean;
  size?: "sm" | "md" | "lg"; // Made size optional to match default
}

export const Divider: React.FC<DividerProps> = ({
  isSpecial,
  size = "md", // Default size is 'md'
}: DividerProps) => {
  let sizeStyles: {
    containerMargin: string;
    dotSize: string;
    dotMargin: string;
    containerOpacity: string;
  };

  // Select styles based on the size prop
  switch (size) {
    case "sm":
      sizeStyles = {
        containerMargin: "my-6",
        dotSize: "w-2 h-2",
        dotMargin: "mx-4",
        containerOpacity: "opacity-70",
      };
      break;
    case "lg":
      sizeStyles = {
        containerMargin: "my-14",
        dotSize: "w-4 h-4",
        dotMargin: "mx-8",
        containerOpacity: "opacity-100",
      };
      break;
    case "md":
    default:
      sizeStyles = {
        containerMargin: "my-10",
        dotSize: "w-3 h-3",
        dotMargin: "mx-6",
        containerOpacity: "opacity-100",
      };
      break;
  }

  // Common classes for the gradient lines
  const lineClasses = `h-px grow ${
    isSpecial
      ? "bg-linear-to-r from-transparent via-orange-200 to-transparent"
      : "bg-linear-to-r from-transparent via-pink-200 to-transparent"
  }`;

  // Common classes for the center dot
  const dotBaseClasses = `rounded-full shadow-sm ${
    isSpecial ? "bg-salmon" : "bg-linear-to-r from-orange-100 to-pink-50"
  }`;

  return (
    <div
      className={`flex justify-center items-center ${sizeStyles.containerMargin} ${sizeStyles.containerOpacity}`}
    >
      <div className={lineClasses} />
      <div
        className={`${dotBaseClasses} ${sizeStyles.dotSize} ${sizeStyles.dotMargin}`}
      ></div>
      <div className={lineClasses} />
    </div>
  );
};
