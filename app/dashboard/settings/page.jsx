"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "../../../components/ui/button"
import { Switch } from "../../../components/ui/switch"
import { Label } from "../../../components/ui/label"
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
} from "../../../components/ui/alert-dialog"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Accessibility, Database, Bell, Moon, Eye, Type, FileText, Trash2, Settings2, Shield } from "lucide-react"
import { motion } from "framer-motion"

export default function SettingsPage() {
  const { user } = useUser()
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeFontSize: false,
    dyslexiaFriendlyFont: false,
    screenReaderMode: false,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    journalReminders: true,
    weeklyReports: false,
    moodInsights: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    shareAnonymousData: false,
    allowAIAnalysis: true,
    storeJournalHistory: true,
  })

  const handleAccessibilityToggle = (setting) => {
    setAccessibilitySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleNotificationToggle = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handlePrivacyToggle = (setting) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleDeleteJournals = async () => {
    if (!user) return

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("All your journal entries have been deleted.")
    } catch (error) {
      toast.error("Failed to delete journal entries")
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <motion.h1
          className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Settings
        </motion.h1>
        <p className="text-muted-foreground">Customize your Serenity AI experience</p>
      </div>

      <Tabs defaultValue="accessibility" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accessibility" className="flex items-center gap-2">
            <Accessibility className="h-4 w-4" />
            <span>Accessibility</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Data Management</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            <span>Preferences</span>
          </TabsTrigger>
        </TabsList>

        {/* Accessibility Tab */}
        <TabsContent value="accessibility" className="mt-6 space-y-4">
          <Card className="border-purple-100 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-4">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-500" />
                <CardTitle>Visual Settings</CardTitle>
              </div>
              <CardDescription>Adjust how Serenity AI looks</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="high-contrast" className="text-base">
                      High Contrast Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                  </div>
                  <Switch
                    id="high-contrast"
                    checked={accessibilitySettings.highContrast}
                    onCheckedChange={() => handleAccessibilityToggle("highContrast")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="large-font" className="text-base">
                      Large Font Size
                    </Label>
                    <p className="text-sm text-muted-foreground">Increase text size throughout the app</p>
                  </div>
                  <Switch
                    id="large-font"
                    checked={accessibilitySettings.largeFontSize}
                    onCheckedChange={() => handleAccessibilityToggle("largeFontSize")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-4">
              <div className="flex items-center gap-2">
                <Type className="h-5 w-5 text-purple-500" />
                <CardTitle>Reading & Writing</CardTitle>
              </div>
              <CardDescription>Customize text and reading experience</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dyslexia-font" className="text-base">
                      Dyslexia-Friendly Font
                    </Label>
                    <p className="text-sm text-muted-foreground">Use a font designed for easier reading</p>
                  </div>
                  <Switch
                    id="dyslexia-font"
                    checked={accessibilitySettings.dyslexiaFriendlyFont}
                    onCheckedChange={() => handleAccessibilityToggle("dyslexiaFriendlyFont")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="screen-reader" className="text-base">
                      Screen Reader Optimization
                    </Label>
                    <p className="text-sm text-muted-foreground">Improve compatibility with screen readers</p>
                  </div>
                  <Switch
                    id="screen-reader"
                    checked={accessibilitySettings.screenReaderMode}
                    onCheckedChange={() => handleAccessibilityToggle("screenReaderMode")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management Tab */}
        <TabsContent value="data" className="mt-6 space-y-4">
          <Card className="border-purple-100 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                <CardTitle>Journal Data</CardTitle>
              </div>
              <CardDescription>Manage your journal entries and data</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">Export All Journal Data</h3>
                    <p className="text-sm text-muted-foreground">Download all your journal entries as a ZIP file</p>
                  </div>
                  <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    Export Data
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium text-red-600">Delete All Journal Entries</h3>
                    <p className="text-sm text-muted-foreground">This action cannot be undone</p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete All
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete all your journal entries and
                          associated mood data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteJournals}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-500" />
                <CardTitle>Privacy Settings</CardTitle>
              </div>
              <CardDescription>Control how your data is used</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="share-data" className="text-base">
                      Share Anonymous Data
                    </Label>
                    <p className="text-sm text-muted-foreground">Help improve Serenity AI with anonymous usage data</p>
                  </div>
                  <Switch
                    id="share-data"
                    checked={privacySettings.shareAnonymousData}
                    onCheckedChange={() => handlePrivacyToggle("shareAnonymousData")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ai-analysis" className="text-base">
                      Allow AI Analysis
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Enable AI to analyze your journal entries for insights
                    </p>
                  </div>
                  <Switch
                    id="ai-analysis"
                    checked={privacySettings.allowAIAnalysis}
                    onCheckedChange={() => handlePrivacyToggle("allowAIAnalysis")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="store-history" className="text-base">
                      Store Journal History
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Keep history of all journal entries (required for trends)
                    </p>
                  </div>
                  <Switch
                    id="store-history"
                    checked={privacySettings.storeJournalHistory}
                    onCheckedChange={() => handlePrivacyToggle("storeJournalHistory")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="mt-6 space-y-4">
          <Card className="border-purple-100 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-4">
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-purple-500" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode" className="text-base">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <Switch
                  id="dark-mode"
                  // Add dark mode toggle logic
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-purple-500" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="text-base">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive updates and insights via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="journal-reminders" className="text-base">
                      Journal Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">Get reminded to write journal entries</p>
                  </div>
                  <Switch
                    id="journal-reminders"
                    checked={notificationSettings.journalReminders}
                    onCheckedChange={() => handleNotificationToggle("journalReminders")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-reports" className="text-base">
                      Weekly Reports
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive weekly mood and journal summaries</p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={() => handleNotificationToggle("weeklyReports")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mood-insights" className="text-base">
                      Mood Insights
                    </Label>
                    <p className="text-sm text-muted-foreground">Get notified about mood pattern insights</p>
                  </div>
                  <Switch
                    id="mood-insights"
                    checked={notificationSettings.moodInsights}
                    onCheckedChange={() => handleNotificationToggle("moodInsights")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-purple-100 p-3 rounded-md text-purple-800 text-sm">
        Some settings are only available with a premium subscription.{" "}
        <a href="/dashboard/subscription" className="underline font-medium">
          Upgrade now
        </a>{" "}
        to unlock all features.
      </div>
    </div>
  )
}
