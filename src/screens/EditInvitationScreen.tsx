import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Textarea,
  LoadingScreen,
  LoadingSpinner,
} from "../components/ui";
import { templates } from "../utils/templates";
import { invitationService } from "../services/invitationService";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { InvitationFormData } from "../types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const EditInvitationScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState<InvitationFormData>({
    title: "",
    subtitle: "",
    template: "birthday",
    recipientName: "",
    eventDate: "",
    eventTime: "",
    description: "",
  });

  useEffect(() => {
    const loadInvitationData = async () => {
      if (!id) return;

      try {
        setPageLoading(true);
        const invitation = await invitationService.getById(id);
        if (invitation) {
          setFormData({
            title: invitation.title,
            subtitle: invitation.subtitle || "",
            template: invitation.template,
            recipientName: invitation.recipientName || "",
            eventDate: invitation.eventDate,
            eventTime: invitation.eventTime || "",
            description: invitation.description || "",
          });
        } else {
          alert("Invitation not found");
          navigate("/admin");
        }
      } catch (error) {
        console.error("Error loading invitation:", error);
        alert("Error loading invitation");
        navigate("/admin");
      } finally {
        setPageLoading(false);
      }
    };

    if (id) {
      loadInvitationData();
    }
  }, [id, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.eventDate) {
      alert("Please fill in required fields");
      return;
    }

    if (!id) return;

    setLoading(true);
    try {
      await invitationService.update(id, formData);
      alert("Invitation updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating invitation:", error);
      alert("Error updating invitation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <LoadingScreen text="Loading invitation..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header với nút back */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/admin"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Invitation
          </h1>
          <p className="text-gray-600">Update your invitation details</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Title *"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., John's Birthday Party"
              required
            />

            <Input
              label="Subtitle (Optional)"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              placeholder="e.g., Save the date, You're invited..."
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template *
              </label>
              <select
                name="template"
                value={formData.template}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                {Object.values(templates).map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.preview} {template.name} - {template.description}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Recipient Name (Optional)"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleInputChange}
              placeholder="e.g., Dear Sarah"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Event Date *"
                name="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Event Time (Optional)"
                name="eventTime"
                type="time"
                value={formData.eventTime}
                onChange={handleInputChange}
              />
            </div>

            <Textarea
              label="Description (Optional)"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Additional details about the event..."
            />

            <div className="pt-4 flex gap-4">
              <Link to="/admin" className="flex-1">
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Updating...
                  </div>
                ) : (
                  "Update Invitation"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
