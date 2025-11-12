import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = "md",
  text,
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Modern loading spinner */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-gray-300 border-t-current rounded-full animate-spin`}
        ></div>
      </div>

      {/* Loading text */}
      {text && (
        <p
          className={`mt-4 text-gray-600 font-medium ${textSizeClasses[size]} animate-pulse`}
        >
          {text}
        </p>
      )}
    </div>
  );
};

// Inline loading spinner for buttons, etc.
interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "sm",
  className = "",
}) => {
  const sizeClasses = {
    xs: "h-3 w-3 border-2",
    sm: "h-4 w-4 border-2",
    md: "h-5 w-5 border-2",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-gray-300 border-t-current rounded-full animate-spin ${className}`}
    ></div>
  );
};

// Full screen loading component
interface LoadingScreenProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  text = "Loading...",
  size = "lg",
}) => {
  return (
    <div className="min-h-screen flex-col bg-white space-y-1 flex items-center justify-center">
      <img
        src="/loading.gif"
        alt="Loading..."
        className={
          size === "sm" ? "h-8 w-8" : size === "md" ? "h-16 w-16" : "h-24 w-24"
        }
      />
      <div>{text}</div>
    </div>
  );
};
