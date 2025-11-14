import React, { useState } from "react";
import type { Invitation } from "../../types";
import { Envelope } from "../ui/Envelope";

interface InvitationWrapperProps {
  invitation: Invitation;
  children: React.ReactNode;
}

export const InvitationWrapper: React.FC<InvitationWrapperProps> = ({
  invitation,
  children,
}) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(true);
  };

  if (!isEnvelopeOpen) {
    return (
      <Envelope onOpen={handleEnvelopeOpen} isSpecial={invitation.isSpecial} />
    );
  }

  return <div className="animate-in fade-in duration-1000">{children}</div>;
};
