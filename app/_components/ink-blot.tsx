"use client"

import { motion } from "framer-motion"

interface InkBlotProps {
  color: string
  size: number
  position: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
  opacity?: number
  rotate?: number
}

export function InkBlot({ color, size, position, opacity = 0.1, rotate = 0 }: InkBlotProps) {
  const colors = {
    purple: "#7e22ce",
    blue: "#2563eb",
    teal: "#0d9488",
    pink: "#db2777",
    amber: "#d97706",
    green: "#16a34a",
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity }}
      transition={{ duration: 1.5 }}
      className="absolute z-0 pointer-events-none"
      style={{
        width: size,
        height: size,
        ...position,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill={colors[color] || colors.purple}
          d="M42.8,-65.2C54.9,-56.3,63.8,-43.2,69.5,-28.9C75.2,-14.6,77.7,0.8,74.4,15.3C71.1,29.8,62,43.3,49.8,53.2C37.6,63.1,22.3,69.3,5.9,71.5C-10.5,73.7,-28,71.9,-41.9,63.5C-55.8,55.1,-66.1,40.1,-71.9,23.7C-77.7,7.3,-79,-10.5,-73.1,-25.4C-67.2,-40.3,-54.1,-52.3,-40.1,-60.5C-26.1,-68.7,-11.1,-73.1,2.5,-76.8C16,-80.5,30.7,-74.1,42.8,-65.2Z"
          transform="translate(100 100)"
        />
      </svg>
    </motion.div>
  )
}
