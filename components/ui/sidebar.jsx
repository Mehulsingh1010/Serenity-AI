"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "../../lib/utils"

const Sidebar = React.forwardRef(({ className, ...props }, ref) => (
  <aside ref={ref} className={cn("w-64 bg-background border-r", className)} {...props} />
))
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("sticky top-0 z-10 bg-background", className)} {...props} />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1", className)} {...props} />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("sticky bottom-0 z-10 bg-background", className)} {...props} />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarNav = React.forwardRef(({ className, ...props }, ref) => (
  <nav ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
))
SidebarNav.displayName = "SidebarNav"

const SidebarNavItem = React.forwardRef(({ className, children, href, ...props }, ref) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
})
SidebarNavItem.displayName = "SidebarNavItem"

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarNav, SidebarNavItem }

