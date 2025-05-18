"use client"

import { motion } from "framer-motion"

interface StickyNoteProps {
  text: string
  position: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
  rotate?: number
  color?: "yellow" | "blue" | "green" | "pink"
}

export function StickyNote({ text, position, rotate = 0, color = "yellow" }: StickyNoteProps) {
  const colorClasses = {
    yellow: "bg-yellow-100 border-yellow-200",
    blue: "bg-blue-100 border-blue-200",
    green: "bg-green-100 border-green-200",
    pink: "bg-pink-100 border-pink-200",
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ scale: 1.05, rotate: rotate + 2 }}
      className={`absolute z-20 p-3 max-w-[150px] font-handwriting text-sm text-gray-700 border ${colorClasses[color]} shadow-sm`}
      style={{
        top: position.top,
        right: position.right,
        bottom: position.bottom,
        left: position.left,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {text}
    </motion.div>
  )
}
