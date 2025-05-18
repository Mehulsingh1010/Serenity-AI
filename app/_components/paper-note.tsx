"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface PaperNoteProps {
  children: ReactNode
  className?: string
}

export function PaperNote({ children, className = "" }: PaperNoteProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative bg-amber-50 rounded-sm shadow-md p-6 font-handwriting ${className}`}
    >
      {/* Paper texture */}
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-30 rounded-sm pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Torn edge effect */}
      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-amber-100 rounded-sm shadow-sm transform rotate-12"></div>
    </motion.div>
  )
}
