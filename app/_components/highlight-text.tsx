"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface HighlightTextProps {
  children: ReactNode
  color?: "yellow" | "blue" | "green" | "pink"
}

export function HighlightText({ children, color = "yellow" }: HighlightTextProps) {
  const colorClasses = {
    yellow: "bg-yellow-200/50",
    blue: "bg-blue-200/50",
    green: "bg-green-200/50",
    pink: "bg-pink-200/50",
  }

  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`relative inline-block ${colorClasses[color]} bg-no-repeat bg-left-bottom`}
      style={{
        backgroundImage: `linear-gradient(120deg, ${getColorValue(color)} 0%, ${getColorValue(color)} 100%)`,
        backgroundSize: "100% 40%",
        backgroundPosition: "0 88%",
        paddingLeft: "0.2em",
        paddingRight: "0.2em",
      }}
    >
      {children}
    </motion.span>
  )
}

function getColorValue(color: string): string {
  const colors = {
    yellow: "rgba(254, 240, 138, 0.7)",
    blue: "rgba(191, 219, 254, 0.7)",
    green: "rgba(187, 247, 208, 0.7)",
    pink: "rgba(251, 207, 232, 0.7)",
  }
  return colors[color] || colors.yellow
}
