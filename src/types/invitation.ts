export type TemplateType =
  | "graduation"
  | "wedding"
  | "birthday"
  | "anniversary"
  | "baby_shower"
  | "conference";

export interface Invitation {
  id: string;
  title: string;
  subtitle?: string;
  template: TemplateType;
  recipientName?: string;
  eventDate: string;
  eventTime?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationFormData {
  title: string;
  subtitle?: string;
  template: TemplateType;
  recipientName?: string;
  eventDate: string;
  eventTime?: string;
  description?: string;
}

export interface Template {
  id: TemplateType;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

export interface ShareableLink {
  invitationId: string;
  url: string;
  createdAt: string;
}
