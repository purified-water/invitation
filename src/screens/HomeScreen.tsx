import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui";
import {
  PlusIcon,
  RectangleStackIcon,
  SparklesIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

export const HomeScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
              <SparklesIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Beautiful Invitations
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create stunning, personalized invitations for any occasion. Share
              them instantly and make every event memorable.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/admin/create">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-4"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Your First Invitation
              </Button>
            </Link>

            <Link to="/admin">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-4"
              >
                <RectangleStackIcon className="h-5 w-5 mr-2" />
                View All Invitations
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
              <SparklesIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Beautiful Templates
            </h3>
            <p className="text-gray-600 text-sm">
              Choose from a variety of stunning templates for birthdays,
              weddings, and more.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
              <ShareIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Instant Sharing
            </h3>
            <p className="text-gray-600 text-sm">
              Generate shareable links instantly. Send them via email, text, or
              social media.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
              <RectangleStackIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Easy Management
            </h3>
            <p className="text-gray-600 text-sm">
              Organize and track all your invitations in one place with our
              dashboard.
            </p>
          </div>
        </div>

        {/* Template Preview */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Available Templates
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              { emoji: "🎂", name: "Birthday" },
              { emoji: "💒", name: "Wedding" },
              { emoji: "🎓", name: "Graduation" },
              { emoji: "💕", name: "Anniversary" },
              { emoji: "👶", name: "Baby Shower" },
              { emoji: "📊", name: "Conference" },
            ].map((template) => (
              <div
                key={template.name}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="text-3xl mb-2">{template.emoji}</div>
                <div className="text-sm font-medium text-gray-700">
                  {template.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-600 mb-6">
              Create beautiful invitations in minutes and share them with the
              world.
            </p>
            <Link to="/admin/create">
              <Button size="lg" className="text-base px-8 py-4">
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Invitation Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
