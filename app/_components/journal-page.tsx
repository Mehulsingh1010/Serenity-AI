"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface JournalPageProps {
  children: ReactNode
  className?: string
}

export function JournalPage({ children, className = "" }: JournalPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`relative bg-white rounded-sm shadow-md p-8 md:p-10 ${className}`}
    >
      {/* Paper texture */}
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-20 rounded-sm pointer-events-none" />

      {/* Lined paper effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute w-full h-px bg-amber-200/50" style={{ top: `${(i + 1) * 30}px` }} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Torn edge effect */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-white overflow-hidden rounded-b-sm">
        <svg viewBox="0 0 1000 50" preserveAspectRatio="none" className="absolute bottom-0 w-full h-12 fill-amber-50">
          <path d="M0,0 Q50,40 100,20 Q150,0 200,15 Q250,30 300,10 Q350,-10 400,15 Q450,40 500,20 Q550,0 600,30 Q650,60 700,30 Q750,0 800,20 Q850,40 900,10 Q950,-20 1000,20 L1000,50 L0,50 Z" />
        </svg>
      </div>
    </motion.div>
  )
}
