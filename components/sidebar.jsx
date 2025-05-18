"use client";
import { useState, useEffect, useRef } from "react";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import {
  Home,
  Book,
  Smile,
  Settings,
  HeartHandshake,
  Menu,
  X,
  HeartPulse,
  Sparkles,
  Crown,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

const sidebarItems = [
  { title: "Home", icon: Home, href: "/dashboard/home" },
  { title: "Journal History", icon: Book, href: "/dashboard/journal" },
  { title: "Mood Tracker", icon: Smile, href: "/dashboard/mood-tracker" },
  {
    title: "Meditation Center",
    icon: HeartHandshake,
    href: "/dashboard/meditation-center",
  },
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
  { title: "Subscription", icon: Sparkles, href: "/dashboard/subscription" }
];

export default function ModernSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  const { status } = {
    status: {
      isSubscribed: false,
      entriesRemaining: 5,
      plan: "free",
    },
  }; // Mock for demo

  // Find active item index
  useEffect(() => {
    const index = sidebarItems.findIndex((item) => item.href === pathname);
    if (index !== -1) {
      setActiveItemIndex(index);
    }
  }, [pathname]);

  // Effect to close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isMobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsMobileOpen(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileOpen]);

  // Close sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const handleNavItemClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-amber-50 shadow-md p-4 flex justify-between items-center border-b-2 border-amber-200">
        <Link href="/">
          <div className="flex items-center space-x-3">
            <HeartPulse className="w-6 h-6 text-purple-700" />
            <h1 className="text-lg font-bold font-handwriting text-purple-700">
              Serenity AI
            </h1>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
            signOutCallback={handleSignOut}
          />
          <Button
            variant="ghost"
            size="sm"
            className="p-1 text-purple-700 hover:bg-purple-100"
            onClick={toggleMobileSidebar}
          >
            {isMobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar (animated) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }}
            className="md:hidden fixed left-0 top-0 h-screen z-40 w-72 max-w-[90vw]"
          >
            <div className="absolute inset-0 bg-amber-50 border-r border-amber-200 rounded-r-3xl shadow-lg overflow-hidden">
              <SidebarContent
                user={user}
                status={status}
                router={router}
                handleSignOut={handleSignOut}
                pathname={pathname}
                isExpanded={true}
                isMobile={true}
                onNavItemClick={handleNavItemClick}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-6 top-6 bottom-6 z-40 border-2 rounded-lg border-amber-200">
        <motion.div
          initial={{ x: 0 }}
          animate={{
            x: isExpanded ? 0 : -180,
            width: isExpanded ? 280 : 100,
          }}
          transition={{ duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }}
          className="relative h-full rounded-3xl overflow-hidden"
          style={{
            boxShadow: "0 5px 15px rgba(128, 55, 155, 0.15)",
          }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-amber-50 border border-amber-200 overflow-hidden">
            {/* Subtle notebook line pattern */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="w-full h-px bg-amber-700 my-6" />
              ))}
            </div>
          </div>

          {/* Content */}
          <SidebarContent
            user={user}
            status={status}
            router={router}
            handleSignOut={handleSignOut}
            pathname={pathname}
            isExpanded={isExpanded}
            isMobile={false}
            onNavItemClick={() => {}}
          />

          {/* Expand/collapse button */}
          <motion.button
            onClick={toggleExpanded}
            className="absolute bottom-4 -right-3 h-8 w-8 flex items-center justify-center bg-amber-100 rounded-full shadow-md border border-amber-200 text-amber-800 hover:bg-amber-200 transition-colors"
            animate={{ rotate: isExpanded ? 0 : 180 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}

// Extracted sidebar content to avoid duplication
function SidebarContent({
  user,
  status,
  router,
  handleSignOut,
  pathname,
  isExpanded,
  isMobile,
  onNavItemClick,
}) {
  return (
    <div className="flex flex-col h-full text-amber-900 relative z-10">
      {/* Header */}
      <Link href="/">
        <div className="p-4 flex items-center space-x-3 h-16 flex-shrink-0">
          <div className="bg-purple-100 p-2 rounded-xl">
            <HeartPulse className="w-6 h-6 text-purple-700" />
          </div>
          {(isExpanded || isMobile) && (
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-lg font-bold font-handwriting text-purple-700"
            >
              Serenity AI
            </motion.h1>
          )}
        </div>
      </Link>

      {/* Main content area - navigation and subscription */}
      <div className="flex-1 overflow-auto overflow-y-auto">
        <div className="px-2 py-4">
          {/* Navigation Items First */}
          <nav>
            <ul className="space-y-3">
              {sidebarItems.map((item, index) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={onNavItemClick}>
                    <motion.div
                      className={cn(
                        "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                        pathname === item.href
                          ? "bg-amber-100 text-purple-800"
                          : "text-amber-800 hover:bg-amber-100"
                      )}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={cn(
                          "relative z-10 flex items-center justify-center w-8 h-8",
                          pathname === item.href 
                        )}
                      >
                        <item.icon className="h-5 w-5" />

                        {/* Animated glow effect for active item */}
                        {pathname === item.href && (
                          <motion.div
                            layoutId="activeGlow"
                            className="absolute inset-0 bg-gradient-to-r from-purple-200 to-amber-200 rounded-lg blur-sm"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                      </div>

                      {(isExpanded || isMobile) && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="text-base font-medium font-handwriting relative z-10"
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Subscription Section Below Navigation */}
          
        </div>
      </div>

      {/* User details section - fixed at bottom with paper texture effect */}
      <div className="mt-auto border-t border-amber-200">
        <motion.div
          className="p-4 flex items-center gap-3"
          whileHover={{ backgroundColor: "rgba(254, 243, 199, 0.5)" }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10 border-2 border-amber-200",
                },
              }}
              signOutCallback={handleSignOut}
            />
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-200/30 to-amber-200/30 blur-sm z-0"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }}
            />
          </div>

          {(isExpanded || isMobile) && user && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col min-w-0"
            >
              <span className="text-sm font-medium truncate font-handwriting text-amber-900">
                {user?.fullName || "Guest User"}
              </span>
              <span className="text-xs text-amber-700 truncate">
                {user?.primaryEmailAddress?.emailAddress || "guest@example.com"}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Explicit sign out button */}
        <motion.button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 text-amber-800 hover:bg-amber-100 rounded-b-xl transition-all"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="h-5 w-5" />
          {(isExpanded || isMobile) && (
            <span className="text-base font-medium font-handwriting">
              Sign Out
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
}





