"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

interface HandwrittenAnnotationProps {
  text?: string
  type: "arrow" | "circle" | "underline" | "bracket" | "note" | "star"
  position: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
  width?: number
  height?: number
  rotate?: number
  color?: string
  delay?: number
  fontSize?: string
}

export function HandwrittenAnnotation({
  text,
  type,
  position,
  width = 100,
  height = 50,
  rotate = 0,
  color = "#7c2d12", // amber-900
  delay = 0,
  fontSize = "1rem",
}: HandwrittenAnnotationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // SVG path definitions for different annotation types
  const paths = {
    arrow: "M5,25 Q50,25 80,5 L75,10 M80,5 L75,0",
    circle: "M50,25 m-40,0 a40,25 0 1,0 80,0 a40,25 0 1,0 -80,0",
    underline: "M5,5 Q50,20 95,5",
    bracket: "M10,0 L0,0 L0,50 L10,50",
    star: "M25,0 L30,20 L50,20 L35,32 L42,50 L25,38 L8,50 L15,32 L0,20 L20,20 L25,0",
    note: "",
  }

  // Drawing animation variants
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0, delay },
        opacity: { duration: 0.3, delay },
      },
    },
  }

  // Text animation variants
  const textVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: delay + 0.5,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className="absolute z-30 pointer-events-none"
      style={{
        top: position.top,
        right: position.right,
        bottom: position.bottom,
        left: position.left,
        width,
        height,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {type === "note" ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView
              ? {
                  scale: 1,
                  opacity: 1,
                  rotate: [rotate - 5, rotate + 5, rotate],
                }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 0.8,
            delay,
            type: "spring",
            bounce: 0.4,
          }}
          className="bg-amber-50 p-3 rounded-sm shadow-md border border-amber-200 font-handwriting text-amber-900"
          style={{ fontSize }}
        >
          {text}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="absolute -bottom-2 -right-2 text-amber-100"
            style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))" }}
          >
            <path d="M0,0 L20,0 L20,20 Z" fill="currentColor" />
          </svg>
        </motion.div>
      ) : (
        <svg
          width="100%"
          height="100%"
          viewBox={type === "star" ? "0 0 50 50" : "0 0 100 50"}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          <motion.path
            d={paths[type]}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={type === "star" ? color : "none"}
            fillOpacity={type === "star" ? 0.2 : 0}
            variants={pathVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          {text && (
            <motion.text
              x={type === "star" ? "60" : "50"}
              y="25"
              fill={color}
              fontFamily="Caveat, cursive"
              fontSize={fontSize}
              textAnchor="start"
              alignmentBaseline="middle"
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {text}
            </motion.text>
          )}
        </svg>
      )}
    </motion.div>
  )
}
