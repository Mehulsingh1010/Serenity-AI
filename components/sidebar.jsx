"use client";
import { useState, useEffect } from "react";
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
];

export default function ModernSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
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

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
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

      {/* Mobile Sidebar (animated) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
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
          />

          {/* Expand/collapse button */}
          {/* <motion.button
            className="absolute top-1/2 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md z-10 text-purple-700 hover:text-purple-900 border border-amber-200 transition-colors"
            onClick={toggleExpanded}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </motion.button> */}
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
      <div className="flex-1 overflow-auto overflow-y-hidden">
        <div className="px-2 py-4">
          {/* Navigation Items First */}
          <nav>
            <ul className="space-y-3">
              {sidebarItems.map((item, index) => (
                <li key={item.href}>
                  <Link href={item.href}>
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
          <div className="mt-6 px-3">
            {/* Subscription Nav Item */}
            <Link href="/dashboard/subscription">
              <motion.div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-4",
                  pathname === "/dashboard/subscription"
                    ? "bg-purple-100 text-purple-800"
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
                    pathname === "/dashboard/subscription" &&
                      "bg-purple-200 rounded-lg"
                  )}
                >
                  <Sparkles className="h-5 w-5" />

                  {/* Animated glow effect for active item */}
                  {pathname === "/dashboard/subscription" && (
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
                    Subscription
                  </motion.span>
                )}

                {!status.isSubscribed && (isExpanded || isMobile) && (
                  <Badge
                    variant="outline"
                    className="ml-auto bg-yellow-100 text-amber-800 border-amber-300"
                  >
                    Upgrade
                  </Badge>
                )}
              </motion.div>
            </Link>

            {/* Subscription Status Card */}
            {!status.isSubscribed && (isExpanded || isMobile) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-4 p-4 bg-amber-100/50 rounded-xl border border-amber-200 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium font-handwriting text-amber-800">
                    Free Plan
                  </span>
                </div>
                <p className="text-xs text-amber-700 mb-3 font-handwriting">
                  {status.entriesRemaining > 0
                    ? `${status.entriesRemaining} entries remaining`
                    : "You've reached your free entry limit"}
                </p>
                <Button
                  size="sm"
                  className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-handwriting border border-purple-200 group relative overflow-hidden"
                  onClick={() => router.push("/dashboard/subscription")}
                >
                  <span className="relative z-10">Upgrade</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-300 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                  <Zap className="w-4 h-4 ml-1 relative z-10" />
                </Button>
              </motion.div>
            )}

            {status.isSubscribed && (isExpanded || isMobile) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-4 p-4 bg-gradient-to-r from-purple-100/50 to-amber-100/50 rounded-xl border border-amber-200 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium font-handwriting text-amber-800">
                    {status.plan === "premium" ? "Premium" : "Annual"} Plan
                  </span>
                </div>
                <p className="text-xs text-amber-700 mt-1 font-handwriting">
                  Unlimited entries & features
                </p>
              </motion.div>
            )}
          </div>
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
      </div>
    </div>
  );
}
