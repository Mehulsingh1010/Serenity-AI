"use client"

import { motion, useInView } from "framer-motion"
import { type ReactNode, useRef } from "react"

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
}

export function AnimatedCard({ children, delay = 0 }: AnimatedCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
      className="relative"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-lg group-hover:opacity-30 transition-opacity"
      />
      {children}
    </motion.div>
  )
}
