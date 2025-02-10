"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const technologies = [
  { name: "Next.js", color: "from-black to-gray-800" },
  { name: "Tailwind CSS", color: "from-cyan-500 to-blue-500" },
  { name: "Shadcn", color: "from-gray-800 to-gray-900" },
  { name: "Gemini AI", color: "from-emerald-500 to-teal-500" },
  { name: "Drizzle ORM", color: "from-amber-500 to-orange-500" },
  { name: "Neon PostgreSQL", color: "from-green-500 to-emerald-500" },
  { name: "Node.js", color: "from-green-600 to-green-700" },
]

export const TechStackCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % technologies.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-40 w-full max-w-md mx-auto">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: index === activeIndex ? 1 : 0,
            scale: index === activeIndex ? 1 : 0.8,
            zIndex: index === activeIndex ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-r ${tech.color}`}
        >
          <span className="text-2xl font-bold text-white">{tech.name}</span>
        </motion.div>
      ))}
    </div>
  )
}

