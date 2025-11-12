import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, LoadingScreen } from "../components/ui";
import { InvitationCard } from "../components/InvitationCard";
import { invitationService } from "../services/invitationService";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { Invitation } from "../types";

export const AdminScreen: React.FC = () => {
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvitations, setFilteredInvitations] = useState<Invitation[]>(
    []
  );

  useEffect(() => {
    loadInvitations();
  }, []);

  useEffect(() => {
    // Filter invitations based on search term
    const filtered = invitations.filter(
      (invitation) =>
        invitation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invitation.recipientName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        invitation.template.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInvitations(filtered);
  }, [invitations, searchTerm]);

  const loadInvitations = async () => {
    try {
      setLoading(true);
      const data = await invitationService.getAll();
      setInvitations(data);
    } catch (error) {
      console.error("Error loading invitations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = (invitationId: string) => {
    const link = `${window.location.origin}/invitation/${invitationId}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  const handleDelete = async (invitationId: string) => {
    try {
      await invitationService.delete(invitationId);
      await loadInvitations(); // Reload the list
    } catch (error) {
      console.error("Error deleting invitation:", error);
      alert("Error deleting invitation. Please try again.");
    }
  };

  const handlePreview = (invitationId: string) => {
    const link = `${window.location.origin}/invitation/${invitationId}`;
    window.open(link, "_blank");
  };

  const handleClone = (invitation: Invitation) => {
    // Navigate to create page with clone data
    navigate("/admin/create", {
      state: {
        cloneData: {
          title: invitation.title,
          subtitle: invitation.subtitle,
          template: invitation.template,
          recipientName: invitation.recipientName,
          eventDate: invitation.eventDate,
          eventTime: invitation.eventTime,
          description: invitation.description,
        },
      },
    });
  };

  const handleEdit = (invitationId: string) => {
    navigate(`/admin/edit/${invitationId}`);
  };

  if (loading) {
    return <LoadingScreen text="Đợi xíuuu" />;
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Invitation Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage all your created invitations
            </p>
          </div>

          <Link to="/admin/create">
            <Button className="inline-flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Create New Invitation
            </Button>
          </Link>
        </div>

        {/* Search and Stats */}
        <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search invitations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-900">
                  {invitations.length}
                </span>
                <span className="ml-1">Total</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">
                  {filteredInvitations.length}
                </span>
                <span className="ml-1">Shown</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invitations Grid */}
        {filteredInvitations.length === 0 ? (
          <div className="text-center py-12">
            {invitations.length === 0 ? (
              <div>
                <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No invitations yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Get started by creating your first invitation
                </p>
                <Link to="/admin/create">
                  <Button className="inline-flex items-center gap-2">
                    <PlusIcon className="h-5 w-5" />
                    Create Your First Invitation
                  </Button>
                </Link>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredInvitations.map((invitation) => (
              <InvitationCard
                key={invitation.id}
                invitation={invitation}
                onCopyLink={handleCopyLink}
                onDelete={handleDelete}
                onPreview={handlePreview}
                onClone={handleClone}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
