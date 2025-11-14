import React from "react";
import {
  LinkIcon,
  TrashIcon,
  EyeIcon,
  CalendarIcon,
  UserIcon,
  DocumentDuplicateIcon,
  PencilIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import type { Invitation } from "../types";

interface InvitationCardProps {
  invitation: Invitation;
  onCopyLink: (invitationId: string) => void;
  onDelete: (invitationId: string) => void;
  onPreview: (invitationId: string) => void;
  onClone: (invitation: Invitation) => void;
  onEdit: (invitationId: string) => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  invitation,
  onCopyLink,
  onDelete,
  onPreview,
  onClone,
  onEdit,
}) => {
  const getTemplateEmoji = (template: string) => {
    const emojiMap: Record<string, string> = {
      birthday: "🎂",
      wedding: "💒",
      graduation: "🎓",
      anniversary: "💕",
      baby_shower: "👶",
      conference: "📊",
    };
    return emojiMap[template] || "🎉";
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={() => onPreview(invitation.id)}
    >
      {/* Header với template emoji */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            {getTemplateEmoji(invitation.template)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg truncate">
              {invitation.title}
            </h3>
            {invitation.subtitle && (
              <p className="text-sm text-gray-500 mt-1 truncate">
                {invitation.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Thông tin chi tiết */}
      <div className="space-y-3 mb-5">
        {invitation.recipientName && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <UserIcon className="h-4 w-4 text-gray-400" />
            <span>For: {invitation.recipientName}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CalendarIcon className="h-4 w-4 text-gray-400" />
          <span>
            {formatDate(invitation.eventDate)}
            {invitation.eventTime && ` at ${invitation.eventTime}`}
          </span>
        </div>

        {invitation.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPinIcon className="h-4 w-4 shrink-0 text-gray-400" />
            <span>{invitation.location}</span>
          </div>
        )}

        <div className="text-xs text-gray-400">
          Created {formatDate(invitation.createdAt)}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Top row - Copy, Preview, Delete */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopyLink(invitation.id);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors hover:cursor-pointer"
            title="Copy link"
          >
            <LinkIcon className="h-4 w-4" />
            Copy
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(invitation.id);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors hover:cursor-pointer"
            title="Preview invitation"
          >
            <EyeIcon className="h-4 w-4" />
            Preview
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Are you sure you want to delete this invitation?")) {
                onDelete(invitation.id);
              }
            }}
            className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors hover:cursor-pointer"
            title="Delete invitation"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Bottom row - Clone, Edit */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClone(invitation);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors hover:cursor-pointer"
            title="Clone invitation"
          >
            <DocumentDuplicateIcon className="h-4 w-4" />
            Clone
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(invitation.id);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors hover:cursor-pointer"
            title="Edit invitation"
          >
            <PencilIcon className="h-4 w-4" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
