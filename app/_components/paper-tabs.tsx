"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface Tab {
  id: string
  label: string
  icon?: ReactNode
}

interface PaperTabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
}

export function PaperTabs({ tabs, activeTab, onChange }: PaperTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-6 py-3 font-handwriting text-lg rounded-t-lg flex items-center gap-2
            ${
              activeTab === tab.id
                ? "bg-white text-amber-900 shadow-md z-10"
                : "bg-amber-100 text-amber-700 hover:bg-amber-200"
            }`}
        >
          {tab.icon}
          {tab.label}

          {/* Paper texture */}
          <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-20 rounded-t-lg pointer-events-none" />

          {/* Active tab indicator */}
          {activeTab === tab.id && (
            <motion.div layoutId="activeTab" className="absolute -bottom-1 left-0 right-0 h-1 bg-white" />
          )}
        </motion.button>
      ))}
    </div>
  )
}
