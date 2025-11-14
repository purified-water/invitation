import React, { useState } from "react";
import type { Invitation } from "../../types";
import { Envelope } from "../ui/Envelope";
import { ConfettiEffect } from "../ui/ConfettiEffect";

interface InvitationWrapperProps {
  invitation: Invitation;
  children: React.ReactNode;
}

export const InvitationWrapper: React.FC<InvitationWrapperProps> = ({
  invitation,
  children,
}) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(true);
    setShowConfetti(true);
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  if (!isEnvelopeOpen) {
    return <Envelope onOpen={handleEnvelopeOpen} />;
  }

  return (
    <div className="relative">
      {/* Confetti Effect */}
      <ConfettiEffect
        show={showConfetti}
        isSpecial={invitation.isSpecial}
        onComplete={handleConfettiComplete}
      />

      {/* Invitation Content */}
      <div className="animate-in fade-in duration-1000">{children}</div>
    </div>
  );
};
