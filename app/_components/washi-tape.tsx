"use client"

import { motion } from "framer-motion"

interface WashiTapeProps {
  color: string
  width: number
  rotate?: number
}

export function WashiTape({ color, width, rotate = 0 }: WashiTapeProps) {
  const colors = {
    purple: "bg-purple-200",
    blue: "bg-blue-200",
    green: "bg-green-200",
    pink: "bg-pink-200",
    amber: "bg-amber-200",
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`relative mx-auto mb-4 h-8 ${colors[color] || colors.purple}`}
      style={{
        width,
        transform: `rotate(${rotate}deg)`,
        transformOrigin: "center",
      }}
    >
      {/* Tape texture */}
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-30 pointer-events-none" />

      {/* Stripes */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-white/30"
            style={{
              top: `${(i + 1) * 5}px`,
              left: 0,
              right: 0,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
