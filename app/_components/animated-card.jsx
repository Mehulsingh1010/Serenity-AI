"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"


export const AnimatedCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70" />
      <div className="relative bg-white rounded-2xl shadow-xl">{children}</div>
    </motion.div>
  )
}

