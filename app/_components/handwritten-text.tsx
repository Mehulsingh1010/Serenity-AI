"use client"

import { motion } from "framer-motion"

interface HandwrittenTextProps {
  text: string
  className?: string
  delay?: number
}

export function HandwrittenText({ text, className = "", delay = 0 }: HandwrittenTextProps) {
  const words = text.split(" ")

  return (
    <div className={`font-handwriting ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.1,
            ease: "easeOut",
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}
