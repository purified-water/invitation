import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InvitationTemplate } from "../components/templates/InvitationTemplate";
import { LoadingScreen } from "../components/ui";
import { invitationService } from "../services/invitationService";
import type { Invitation } from "../types";

export const InvitationScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "You got invited!";
    const loadInvitation = async () => {
      if (!id) {
        setError("Invalid invitation ID");
        setLoading(false);
        return;
      }

      try {
        const data = await invitationService.getById(id);
        if (data) {
          setInvitation(data);
        } else {
          setError("Invitation not found");
        }
      } catch (err) {
        console.error("Error loading invitation:", err);
        setError("Failed to load invitation");
      } finally {
        setLoading(false);
      }
    };

    loadInvitation();
  }, [id]);

  if (loading) {
    return <LoadingScreen text="Đợi xíuuu" />;
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error || "Invitation not found"}
          </h1>
          <p className="text-gray-600 mb-6">
            The invitation you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return <InvitationTemplate invitation={invitation} />;
};
