import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  LoadingSpinner,
  Textarea,
  Checkbox,
} from "../components/ui";
import { templates } from "../utils/templates";
import { invitationService } from "../services/invitationService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import type { InvitationFormData } from "../types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const CreateInvitationScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<InvitationFormData>({
    title: "",
    subtitle: "",
    template: "birthday",
    recipientName: "",
    eventDate: "",
    location: "",
    eventTime: "",
    description: "",
    isSpecial: false,
  });
  const [generatedLink, setGeneratedLink] = useState<string>("");

  // Handle clone data from location state
  useEffect(() => {
    if (location.state?.cloneData) {
      const cloneData = location.state.cloneData;
      setFormData({
        title: `${cloneData.title} (Copy)`,
        subtitle: cloneData.subtitle || "",
        template: cloneData.template,
        recipientName: cloneData.recipientName || "",
        eventDate: cloneData.eventDate,
        eventTime: cloneData.eventTime || "",
        description: cloneData.description || "",
        isSpecial: cloneData.isSpecial || false,
      });
    }
  }, [location.state]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.eventDate) {
      alert("Please fill in required fields");
      return;
    }

    setLoading(true);
    try {
      const invitationId = await invitationService.create(formData);
      const link = `${window.location.origin}/invitation/${invitationId}`;
      setGeneratedLink(link);
    } catch (error) {
      console.error("Error creating invitation:", error);
      alert("Error creating invitation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    alert("Link copied to clipboard!");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      template: "birthday",
      recipientName: "",
      eventDate: "",
      eventTime: "",
      description: "",
      isSpecial: false,
    });
    setGeneratedLink("");
  };

  if (generatedLink) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Invitation Created Successfully!
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  Shareable Link:
                </p>
                <p className="text-sm font-mono text-blue-600 break-all bg-blue-50 p-2 rounded">
                  {generatedLink}
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={copyToClipboard} className="flex-1">
                  Copy Link
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(generatedLink, "_blank")}
                  className="flex-1"
                >
                  Preview
                </Button>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="secondary"
                  onClick={resetForm}
                  className="flex-1"
                >
                  Create Another
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin")}
                  className="flex-1"
                >
                  View All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
            Create New Invitation
          </h1>
          <p className="text-gray-600">
            Design and share beautiful invitations
          </p>
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

            <Input
              label="Location (Optional)"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Nha toi"
            />

            <Textarea
              label="Description (Optional)"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Additional details about the event..."
            />

            <Checkbox
              label="Special Invitation"
              name="isSpecial"
              checked={formData.isSpecial || false}
              onChange={handleInputChange}
              description="Mark this as a special invitation for enhanced styling and features"
            />

            <div className="pt-4">
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Creating...
                  </div>
                ) : (
                  "Create Invitation"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
