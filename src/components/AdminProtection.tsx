import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button, Input, LoadingScreen } from "./ui";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useVocCode } from "../hooks/useVocCode";
import { DontVoc } from "./ui/DontVooc";

interface AdminProtectionProps {
  children: React.ReactNode;
}

export const AdminProtection: React.FC<AdminProtectionProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showDontVoc, setShowDontVoc] = useState(false);
  const { handleTextClick, showFullscreen } = useVocCode();

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
  const AUTH_COOKIE = "admin_authenticated";

  useEffect(() => {
    // Check if user is already authenticated via cookie
    const authCookie = Cookies.get(AUTH_COOKIE);
    if (authCookie === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password === ADMIN_PASSWORD) {
      Cookies.set(AUTH_COOKIE, "true", { expires: 30 });
      setIsAuthenticated(true);
      setFailedAttempts(0); // Reset failed attempts on success
    } else {
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);

      if (newFailedAttempts >= 3) {
        setShowDontVoc(true);
        // Reset after showing DontVoc for a while
        setTimeout(() => {
          setShowDontVoc(false);
          setFailedAttempts(0);
          setError("Too many failed attempts. Try again.");
        }, 3000);
      } else {
        setError(
          `Incorrect password. Please try again. (${newFailedAttempts}/3 attempts)`
        );
      }
      setPassword("");
    }
  };

  const handleLogout = () => {
    Cookies.remove(AUTH_COOKIE);
    setIsAuthenticated(false);
    setPassword("");
  };

  if (loading) {
    return <LoadingScreen text="Đợi tí" />;
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen flex-col flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <img src="/no_go.png" alt="No Access" className="mb-6 w-auto h-32" />
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2
                className="text-3xl font-bold text-gray-900 mb-2 hover:text-red-500 cursor-pointer"
                onClick={handleTextClick}
              >
                Đừng đi vọc
              </h2>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter admin password"
                  required
                  disabled={showDontVoc}
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={showDontVoc}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {error && (
                <div
                  className={`border px-4 py-3 rounded-lg ${
                    failedAttempts >= 3
                      ? "bg-red-100 border-red-400 text-red-800"
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={showDontVoc}
                className="w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {showDontVoc ? "Wait..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>

        <DontVoc shouldShow={showFullscreen || showDontVoc} />
      </>
    );
  }

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-lg transition-colors"
          title="Logout from admin"
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  );
};
