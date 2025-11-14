import React from "react";
import type { Invitation } from "../../types";
import { getTemplate } from "../../utils/templates";

interface InvitationTemplateProps {
  invitation: Invitation;
}

export const InvitationTemplate: React.FC<InvitationTemplateProps> = ({
  invitation,
}) => {
  const template = getTemplate(invitation.template);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: template.colors.background }}
    >
      <div
        className="max-w-2xl w-full rounded-lg shadow-2xl p-8 md:p-12"
        style={{
          backgroundColor: "white",
          borderTop: `8px solid ${template.colors.primary}`,
        }}
      >
        <div className="text-center">
          {/* Template Emoji */}
          <div className="text-6xl mb-6">{template.preview}</div>

          {/* Recipient Name */}
          {invitation.recipientName && (
            <p
              className="text-lg mb-4 italic"
              style={{ color: template.colors.secondary }}
            >
              {invitation.recipientName}
            </p>
          )}

          {/* Subtitle */}
          {invitation.subtitle && (
            <p
              className="text-lg mb-6 font-light"
              style={{ color: template.colors.text }}
            >
              {invitation.subtitle}
            </p>
          )}

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl font-bold mb-8"
            style={{ color: template.colors.primary }}
          >
            {invitation.title}
          </h1>

          {/* Date and Time */}
          <div className="mb-8">
            <div
              className="text-2xl font-semibold mb-2"
              style={{ color: template.colors.accent }}
            >
              {formatDate(invitation.eventDate)}
            </div>
            {invitation.eventTime && (
              <div
                className="text-xl"
                style={{ color: template.colors.secondary }}
              >
                at {formatTime(invitation.eventTime)}
              </div>
            )}
          </div>

          {/* Location */}
          {invitation.location && (
            <div
              className="text-xl mb-8"
              style={{ color: template.colors.secondary }}
            >
              Location: {invitation.location}
            </div>
          )}

          {/* Description */}
          {invitation.description && (
            <div
              className="text-lg leading-relaxed mb-8 max-w-lg mx-auto"
              style={{ color: template.colors.text }}
            >
              {invitation.description.split("\n").map((line, index) => (
                <p key={index} className={index > 0 ? "mt-2" : ""}>
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Decorative Elements */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <div
              className="h-1 w-16 rounded"
              style={{ backgroundColor: template.colors.primary }}
            />
            <div className="text-2xl" style={{ color: template.colors.accent }}>
              ✨
            </div>
            <div
              className="h-1 w-16 rounded"
              style={{ backgroundColor: template.colors.primary }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
