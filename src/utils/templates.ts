import type { Template, TemplateType } from "../types";

export const templates: Record<TemplateType, Template> = {
  graduation: {
    id: "graduation",
    name: "Graduation",
    description: "Perfect for graduation ceremonies and celebrations",
    preview: "🎓",
    colors: {
      primary: "#1e40af",
      secondary: "#f59e0b",
      accent: "#10b981",
      background: "#f8fafc",
      text: "#1f2937",
    },
  },
  wedding: {
    id: "wedding",
    name: "Wedding",
    description: "Elegant design for wedding invitations",
    preview: "💒",
    colors: {
      primary: "#be185d",
      secondary: "#f472b6",
      accent: "#fbbf24",
      background: "#fef7f0",
      text: "#374151",
    },
  },
  birthday: {
    id: "birthday",
    name: "Birthday",
    description: "Fun and colorful for birthday parties",
    preview: "🎂",
    colors: {
      primary: "#dc2626",
      secondary: "#f97316",
      accent: "#facc15",
      background: "#fef2f2",
      text: "#1f2937",
    },
  },
  anniversary: {
    id: "anniversary",
    name: "Anniversary",
    description: "Romantic theme for anniversaries",
    preview: "💕",
    colors: {
      primary: "#c2410c",
      secondary: "#fbbf24",
      accent: "#f87171",
      background: "#fffbeb",
      text: "#292524",
    },
  },
  baby_shower: {
    id: "baby_shower",
    name: "Baby Shower",
    description: "Soft and gentle for baby celebrations",
    preview: "👶",
    colors: {
      primary: "#7c3aed",
      secondary: "#a78bfa",
      accent: "#fbbf24",
      background: "#faf5ff",
      text: "#374151",
    },
  },
  conference: {
    id: "conference",
    name: "Conference",
    description: "Professional design for business events",
    preview: "📊",
    colors: {
      primary: "#374151",
      secondary: "#6b7280",
      accent: "#3b82f6",
      background: "#f9fafb",
      text: "#111827",
    },
  },
};

export const getTemplate = (type: TemplateType): Template => {
  return templates[type];
};
