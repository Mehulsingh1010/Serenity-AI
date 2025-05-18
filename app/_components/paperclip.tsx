"use client"

import { motion } from "framer-motion"

interface PaperclipProps {
  position: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
  rotate?: number
  color?: string
}

export function Paperclip({
  position,
  rotate = 0,
  color = "#94a3b8", // slate-400
}: PaperclipProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="absolute z-20 w-6 h-16 pointer-events-none"
      style={{
        top: position.top,
        right: position.right,
        bottom: position.bottom,
        left: position.left,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <svg viewBox="0 0 24 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 64C9.79086 64 8 62.2091 8 60V20C8 15.5817 11.5817 12 16 12C20.4183 12 24 15.5817 24 20V52C24 54.2091 22.2091 56 20 56C17.7909 56 16 54.2091 16 52V24"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  )
}
