/**
 * Vietnamese date and time formatting utilities
 */

/**
 * Format date in Vietnamese
 * @param dateString - Date string in ISO format (YYYY-MM-DD)
 * @returns Formatted Vietnamese date string
 */
export const formatVietnameseDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Try Vietnamese locale first, fallback to custom formatting if not supported
  try {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    // Fallback: Custom Vietnamese date formatting
    const days = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];
    const months = [
      "tháng 1",
      "tháng 2",
      "tháng 3",
      "tháng 4",
      "tháng 5",
      "tháng 6",
      "tháng 7",
      "tháng 8",
      "tháng 9",
      "tháng 10",
      "tháng 11",
      "tháng 12",
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ngày ${day} ${month} năm ${year}`;
  }
};

/**
 * Format time in Vietnamese (24-hour format)
 * @param timeString - Time string in HH:MM format
 * @returns Formatted Vietnamese time string
 */
export const formatVietnameseTime = (timeString?: string): string => {
  if (!timeString) return "";

  const [hours, minutes] = timeString.split(":");
  return `${hours}:${minutes}`;
};

/**
 * Format time in English (12-hour format with AM/PM)
 * @param timeString - Time string in HH:MM format
 * @returns Formatted English time string
 */
export const formatEnglishTime = (timeString?: string): string => {
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

/**
 * Format date in English
 * @param dateString - Date string in ISO format (YYYY-MM-DD)
 * @returns Formatted English date string
 */
export const formatEnglishDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
