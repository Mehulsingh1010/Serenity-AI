"use client"

import { motion } from "framer-motion"

export function NotebookSpiral() {
  return (
    <div className="relative w-full h-8 overflow-hidden">
      <div className="absolute inset-x-0 flex justify-center space-x-8">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            className="w-4 h-8 bg-gray-300 rounded-full"
            style={{
              boxShadow: "inset 1px 1px 3px rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  )
}
