import React from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import type { Invitation } from "../../types";

interface AddToCalendarProps {
  invitation: Invitation;
  className?: string;
}

export const AddToCalendar: React.FC<AddToCalendarProps> = ({
  invitation,
  className = "",
}) => {
  const generateGoogleCalendarUrl = () => {
    const startDate = new Date(invitation.eventDate);

    // If time is provided, set it; otherwise use default time
    if (invitation.eventTime) {
      const [hours, minutes] = invitation.eventTime.split(":");
      startDate.setHours(parseInt(hours), parseInt(minutes));
    } else {
      startDate.setHours(10, 0); // Default to 10:00 AM
    }

    // End time is 2 hours later (or 1 hour if no time specified)
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + (invitation.eventTime ? 3 : 1));

    // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ)
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const startDateTime = formatDate(startDate);
    const endDateTime = formatDate(endDate);

    // Build the Google Calendar URL
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: invitation.title,
      dates: `${startDateTime}/${endDateTime}`,
      details:
        invitation.description || `You are invited to ${invitation.title}`,
      location: invitation.location || "",
      sprop: "name:Invitation",
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const handleAddToCalendar = () => {
    const url = generateGoogleCalendarUrl();
    window.open(url, "_blank")?.focus();
  };

  return (
    <button
      onClick={handleAddToCalendar}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 text-white bg-salmon hover:shadow-sm cursor-pointer ${className}`}
    >
      <CalendarDaysIcon className="w-5 h-5" />
      <span className="font-medium">Thêm vào lịch</span>
    </button>
  );
};
