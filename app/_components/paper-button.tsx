"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { ReactNode } from "react"

interface PaperButtonProps {
  children: ReactNode
  href: string
  primary?: boolean
  large?: boolean
  className?: string
}

export function PaperButton({ children, href, primary = false, large = false, className = "" }: PaperButtonProps) {
  const baseClasses = "relative flex items-center justify-center font-handwriting rounded-sm shadow-md overflow-hidden"
  const sizeClasses = large ? "px-8 py-3 text-lg" : "px-6 py-2"
  const colorClasses = primary
    ? "bg-amber-500 text-white hover:bg-amber-600"
    : "bg-white text-amber-900 border border-amber-200 hover:bg-amber-50"

  return (
    <Link href={href}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${baseClasses} ${sizeClasses} ${colorClasses} ${className}`}
      >
        {/* Paper texture */}
        <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-20 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex items-center">{children}</div>

        {/* Torn edge effect */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/30 rounded-sm transform rotate-12"></div>
      </motion.button>
    </Link>
  )
}
