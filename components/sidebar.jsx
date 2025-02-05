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
  { title: "Journal-History", icon: Book, href: "/dashboard/journal" },
  { title: "Mood Tracker", icon: Smile, href: "/dashboard/mood-tracker" },
  // { title: "History", icon: History, href: "/dashboard/history" },
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function ModernSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { user } = useUser()

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen)

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <HeartPulse className="w-6 h-6" />
          <h1 className="text-lg font-bold">SerenityAI +</h1>
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
          <Button variant="ghost" size="sm" className="p-1" onClick={toggleMobileSidebar}>
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        className={`fixed left-0 top-0 h-screen transition-transform duration-300 ease-in-out z-40 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 w-72 max-w-[90vw] bg-background/95 backdrop-blur-md border-r flex flex-col`}
      >
        <SidebarHeader className="p-4 flex items-center space-x-3 border-b h-16 flex-shrink-0">
          <HeartPulse className="w-6 h-6" />
          <h1 className="text-lg font-bold">SerenityAI +</h1>
        </SidebarHeader>

        <SidebarContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full">
            <div className="px-2 py-4">
              <SidebarNav>
                {sidebarItems.map((item) => (
                  <SidebarNavItem
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-base font-medium">{item.title}</span>
                  </SidebarNavItem>
                ))}
              </SidebarNav>
            </div>
          </ScrollArea>
        </SidebarContent>

        <SidebarFooter className="border-t p-4 mb-2 flex-shrink-0 mt-auto">
          <div className="flex items-center gap-3">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
            {user && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate">{user.fullName}</span>
                <span className="text-xs text-muted-foreground truncate">
                  {user.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}