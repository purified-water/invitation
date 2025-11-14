import React from "react";
import type { Invitation } from "../../types";
import { GraduationInvitation } from "./GraduationInvitation";
import { InvitationTemplate } from "./InvitationTemplate";
import { InvitationWrapper } from "./InvitationWrapper";

interface InvitationManagerProps {
  invitation: Invitation;
}

export const InvitationManager: React.FC<InvitationManagerProps> = ({
  invitation,
}) => {
  const renderTemplate = () => {
    switch (invitation.template) {
      case "graduation":
        return <GraduationInvitation invitation={invitation} />;
      case "wedding":
        // TODO: Create WeddingInvitation component
        return <div>Wedding template coming soon...</div>;
      case "birthday":
        // TODO: Create BirthdayInvitation component
        return <div>Birthday template coming soon...</div>;
      case "anniversary":
        // TODO: Create AnniversaryInvitation component
        return <div>Anniversary template coming soon...</div>;
      case "baby_shower":
        // TODO: Create BabyShowerInvitation component
        return <div>Baby Shower template coming soon...</div>;
      case "conference":
        // TODO: Create ConferenceInvitation component
        return <div>Conference template coming soon...</div>;
      default:
        // Fallback to the original InvitationTemplate for old invitations or unknown templates
        return <InvitationTemplate invitation={invitation} />;
    }
  };

  return (
    <InvitationWrapper invitation={invitation}>
      {renderTemplate()}
    </InvitationWrapper>
  );
};
