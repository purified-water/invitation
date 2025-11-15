import React, { useState } from "react";
import type { Invitation } from "../../types";
import { Divider } from "../ui/Divider";
import { AddToCalendar } from "../ui/AddToCalendar";
import { SpeechBubble } from "../ui/SpeechBubble";
import { formatVietnameseDate, formatEnglishTime } from "../../utils";
import { MapPinIcon } from "@heroicons/react/24/outline";

interface GraduationInvitationProps {
  invitation: Invitation;
}

export const GraduationInvitation: React.FC<GraduationInvitationProps> = ({
  invitation,
}) => {
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [showSuki2SpeechBubble, setShowSuki2SpeechBubble] = useState(false);

  const handleSuki1Click = () => {
    setShowSpeechBubble(true);
    // Hide the speech bubble after 5 seconds
    setTimeout(() => {
      setShowSpeechBubble(false);
    }, 5000);
  };

  const handleSuki2Click = () => {
    setShowSuki2SpeechBubble(true);
    // Hide the speech bubble after 5 seconds
    setTimeout(() => {
      setShowSuki2SpeechBubble(false);
    }, 5000);
  };

  return (
    // Page Background
    <div
      className={`min-h-screen flex items-center justify-center p-4 py-8 ${
        invitation.isSpecial
          ? "bg-linear-to-br from-orange-100 via-pink-50 to-purple-50"
          : "bg-linear-to-br from-orange-50 to-purple-50"
      }`}
    >
      {/* The Invitation "Paper" */}
      <div
        className={`relative max-w-lg md:max-w-3xl w-full bg-white rounded-3xl shadow-md lg:shadow-2xl p-6 md:p-16 font-serif ${
          invitation.isSpecial ? "ring-1 ring-amber-100" : ""
        }`}
      >
        {/* Silly Stickers Layer
          Refined sizes: smaller on mobile, larger on desktop
        */}
        <div className="absolute -top-6 -left-4 md:-top-8 md:-left-6">
          <img
            src={invitation.isSpecial ? "/suki2.png" : "/enjoy.gif"}
            alt="Sticker"
            className="size-16 md:size-20 lg:size-24 object-contain -rotate-15 drop-shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer"
            onClick={invitation.isSpecial ? handleSuki2Click : undefined}
          />
          {invitation.isSpecial && (
            <SpeechBubble
              text="You are my special guest"
              isVisible={showSuki2SpeechBubble}
              position="bottom"
              onComplete={() => {}}
            />
          )}
        </div>
        <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-6">
          <img
            src={invitation.isSpecial ? "/suki1.png" : "/enjoy.gif"}
            alt="Sticker"
            className="size-16 md:size-20 lg:size-24 object-contain rotate-15 drop-shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer"
            onClick={invitation.isSpecial ? handleSuki1Click : undefined}
          />
          {invitation.isSpecial && (
            <SpeechBubble
              text="You are my surprise"
              isVisible={showSpeechBubble}
              position="top"
              onComplete={() => {}}
            />
          )}
        </div>

        {/* --- Main Content Flow --- */}
        <div className="relative z-10">
          {/* Header Section */}
          <div className="text-center mb-8">
            {invitation.recipientName && (
              <div className="mb-4">
                <p className="text-base font-light tracking-widest uppercase text-dark-gray opacity-80 letterspacing-wide">
                  {invitation.isSpecial ? "Haiiii" : "Thân gửi"}
                </p>
                {/* Scaled text: text-3xl on mobile, md:text-5xl on desktop */}
                <h2
                  className={`text-3xl md:text-5xl font-light italic ${
                    invitation.isSpecial ? "text-salmon-pink" : "text-salmon"
                  } leading-tight`}
                >
                  {invitation.recipientName}
                </h2>
              </div>
            )}
            {invitation.subtitle && (
              <p className="text-lg md:text-xl italic font-light text-dark-gray opacity-80 leading-relaxed">
                {invitation.subtitle}
              </p>
            )}
          </div>

          {/* Title Section */}
          <div className="text-center mb-10 md:mb-12">
            <p className="text-lg md:text-xl font-light text-dark-gray">
              {invitation.isSpecial
                ? "Siu thân mời bạn đến tham dự"
                : "Thân mời bạn đến tham dự"}
            </p>
            {/* Scaled text: text-4xl on mobile, md:text-6xl on desktop */}
            <h1
              className={`text-4xl md:text-6xl font-light my-4 leading-tight tracking-tight ${
                invitation.isSpecial ? "text-salmon" : "text-dark-gray"
              }`}
            >
              {invitation.title}
            </h1>
          </div>

          {/* Decorative Divider */}
          <Divider isSpecial={invitation.isSpecial || false} />

          {/* Event Details Section */}
          <div className="text-center">
            <div className="space-y-3">
              {invitation.eventTime && (
                // Scaled text: text-xl on mobile, md:text-3xl on desktop
                <p className="text-xl md:text-3xl font-light text-dark-gray tracking-wide">
                  {formatEnglishTime(invitation.eventTime)}
                </p>
              )}
              {/* Scaled text: text-lg on mobile, md:text-2xl on desktop */}
              <p className="text-lg md:text-2xl font-light text-dark-gray tracking-wide">
                {formatVietnameseDate(invitation.eventDate)}
              </p>
              {invitation.location && (
                <div className="text-lg md:text-2xl font-light text-salmon tracking-wide mt-4">
                  <MapPinIcon className="inline-block w-5 h-5 mr-2 text-salmon" />
                  {invitation.location}
                </div>
              )}
            </div>
          </div>

          {/* Description Section (if provided) */}
          {invitation.description && (
            <>
              <Divider isSpecial={invitation.isSpecial || false} size="sm" />

              {/* Description Text */}
              <div className="text-center text-base md:text-lg text-dark-gray opacity-90 leading-relaxed space-y-4 max-w-2xl mx-auto">
                {invitation.description.split("\n").map((line, index) => (
                  <p key={index} className="font-light italic">
                    {line}
                  </p>
                ))}
              </div>
            </>
          )}

          {/* Footer Message */}
          {/* Cleaned up redundant margin class */}
          <div className="text-center mt-4 md:mt-8">
            <>
              <p
                className={`text-lg md:text-xl font-light italic tracking-wide leading-relaxed mb-4 ${
                  invitation.isSpecial
                    ? "text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-orange-200"
                    : "text-salmon"
                }`}
              >
                {invitation.isSpecial
                  ? "T mong m tới đó :)))"
                  : "Rất mong được gặp bạn tại buổi lễ!"}
              </p>

              {/* Add to Calendar Button */}
              <AddToCalendar invitation={invitation} className="mx-auto" />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
