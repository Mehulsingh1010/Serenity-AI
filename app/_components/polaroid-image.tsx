"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface PolaroidImageProps {
  src: string
  alt: string
  caption?: string
  rotate?: number
  size?: "small" | "medium" | "large"
}

export function PolaroidImage({ src, alt, caption, rotate = 0, size = "large" }: PolaroidImageProps) {
  const sizeClasses = {
    small: "w-48",
    medium: "w-64",
    large: "w-full max-w-md",
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: rotate + 1 }}
      className={`relative bg-white p-3 pb-12 shadow-lg ${sizeClasses[size]}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
      </div>
      {caption && (
        <p className="absolute bottom-3 left-0 right-0 text-center text-gray-700 font-handwriting">{caption}</p>
      )}
    </motion.div>
  )
}
