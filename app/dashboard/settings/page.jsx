"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteUserJournals } from "./journal-actions";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user } = useUser();
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeFontSize: false,
    dyslexiaFriendlyFont: false,
    screenReaderMode: false,
  });

  const handleAccessibilityToggle = (setting) => {
    setAccessibilitySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleDeleteJournals = async () => {
    if (!user) return;

    try {
      await deleteUserJournals(user.id);
      toast.success("All your journal entries have been deleted.");
    } catch (error) {
      toast.error("Failed to delete journal entries");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Settings</h1>
      {/* Accessibility Options Section */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Accessibility Options</h2>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Switch
              id="high-contrast"
              checked={accessibilitySettings.highContrast}
              onCheckedChange={() => handleAccessibilityToggle("highContrast")}
            />
            <Label htmlFor="high-contrast">High Contrast Mode</Label>
          </div>

          <div className="flex items-center space-x-4">
            <Switch
              id="large-font"
              checked={accessibilitySettings.largeFontSize}
              onCheckedChange={() => handleAccessibilityToggle("largeFontSize")}
            />
            <Label htmlFor="large-font">Large Font Size</Label>
          </div>

          <div className="flex items-center space-x-4">
            <Switch
              id="dyslexia-font"
              checked={accessibilitySettings.dyslexiaFriendlyFont}
              onCheckedChange={() =>
                handleAccessibilityToggle("dyslexiaFriendlyFont")
              }
            />
            <Label htmlFor="dyslexia-font">Dyslexia-Friendly Font</Label>
          </div>

          <div className="flex items-center space-x-4">
            <Switch
              id="screen-reader"
              checked={accessibilitySettings.screenReaderMode}
              onCheckedChange={() =>
                handleAccessibilityToggle("screenReaderMode")
              }
            />
            <Label htmlFor="screen-reader">Screen Reader Optimization</Label>
          </div>
        </div>
      </section>
      {/* Data Management Section with Confirmation Dialog */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Data Management</h2>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete All Journal Entries</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all
                your journal entries.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteJournals}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
      {/* Additional Preferences Section */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Additional Preferences</h2>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Switch
              id="dark-mode"
              // Add dark mode toggle logic
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>

          <div className="flex items-center space-x-4">
            <Switch
              id="notifications"
              // Add notification preference logic
            />
            <Label htmlFor="notifications">Enable Notifications</Label>
          </div>
        </div>
      </section>
      <h3 className="text-white bg-red-600 p-3 rounded-md">This page is Under developement</h3>
    </div>
  );
}
