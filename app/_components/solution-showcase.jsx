import { motion } from "framer-motion"
import Image from "next/image"


export const SolutionShowcase = ({ title, description, imageSrc, reverse = false }) => {
  return (
    <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 py-16`}>
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <h3 className="text-2xl font-bold text-purple-900 mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <Image src={imageSrc || "/placeholder.svg"} alt={title} width={600} height={400} className="w-full h-auto" />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}

