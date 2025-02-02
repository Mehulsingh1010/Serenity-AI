"use client"

import { useState } from "react"
import { UserButton, useUser } from "@clerk/nextjs"
import { Home, Book, Smile, History, Settings, Menu, X, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarNav,
  SidebarNavItem,
} from "@/components/ui/sidebar"

const sidebarItems = [
  { title: "Home", icon: Home, href: "/dashboard/home" },
  { title: "Journal", icon: Book, href: "/dashboard/journal" },
  { title: "Mood Tracker", icon: Smile, href: "/dashboard/mood-tracker" },
  { title: "History", icon: History, href: "/dashboard/history" },
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function ModernSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { user } = useUser()

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen)

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <HeartPulse className="w-8 h-8" /> {/* Replace the logo image with the HeartPulse icon */}
          <h1 className="text-xl font-bold ">
            SerenityAI +
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
          <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      <Sidebar
        className={`fixed left-0 top-0 h-screen transition-all duration-300 ease-in-out z-40 md:translate-x-0 md:w-80 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-background/95 backdrop-blur-md border-r shadow-xl`}
      >
        <SidebarHeader className="p-6 flex items-center justify-between relative border-b">
          <div className="flex items-center space-x-3">
            <HeartPulse className="w-10 h-10" /> {/* Use the HeartPulse icon in the sidebar header */}
            <h1 className="text-2xl font-bold ">
              SerenityAI +
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="px-3 py-2 pt-6">
              <SidebarNav>
                {sidebarItems.map((item) => (
                  <SidebarNavItem
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl  transition-all duration-200 ease-in-out"
                  >
                    <item.icon className="h-6 w-6" />
                    <span className="text-lg font-medium">{item.title}</span>
                  </SidebarNavItem>
                ))}
              </SidebarNav>
            </div>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter className="border-t p-6">
          <div className="flex items-center gap-4">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-12 w-12",
                },
              }}
            />
            {user && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate">{user.fullName}</span>
                <span className="text-xs text-muted-foreground truncate">{user.primaryEmailAddress?.emailAddress}</span>
              </div>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
