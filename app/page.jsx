"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Brain, Calendar, LineChart, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
// import {moodDash} from "/public/img/mood-dash.png"
import { AnimatedCard } from "./_components/animated-card"
import { ParticleBackground } from "./_components/particle-background"
import { TechStackCarousel } from "./_components/tech-stack-carousel"
import { Button } from "../components/ui/button"
import { CardContent } from "..//components/ui/card"
import { Separator } from "../components/ui/separator"
import { SolutionShowcase } from "./_components/solution-showcase"
export default function LandingPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 overflow-hidden">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100">
      {/* Background Image with improved positioning */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/dash.png"
          alt="Dashboard Background"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
      </div>

      {/* Logo */}
     
      
      {/* Content Wrapper */}
      <div className="container px-6 mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          {/* Animated Title */}
          <motion.div
  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
  className="flex flex-col items-center justify-center space-y-8 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto]"
>
  <div className="relative w-48 h-48 mb-4">
    <Image 
      src="/logo.png" 
      alt="Serenity AI" 
      fill
      className="object-contain"
      priority
    />
  </div>
  
  <h1 className="text-5xl font-extrabold text-black tracking-tight sm:text-7xl drop-shadow-lg text-center">
    Welcome to Serenity AI
  </h1>
</motion.div>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Your personal companion for mental well-being and emotional growth
          </p>
          
          {/* Buttons */}
          <motion.div
            className="flex items-center justify-center gap-4 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              className="relative overflow-hidden bg-purple-600 hover:bg-purple-700 shadow-xl"
            >
              <Link href="/dashboard/home" className="flex items-center gap-2">
                <span className="relative z-10 text-white">Dive In</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
            <Link href="/dashboard/home">
            <Button
              size="lg"
              variant="outline"
              className="group border-gray-400 hover:border-purple-500 transition-all"
            >
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent group-hover:opacity-100 transition-opacity">
                Go to Dashboard
              </span>
            </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatedCard delay={0.1}>
              <CardContent className="p-8">
                <div className="p-3 mb-4 rounded-full w-fit bg-gradient-to-br from-purple-100 to-pink-100">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-2xl font-semibold">Daily Summaries & Analysis</h3>
                <p className="text-gray-600">
                  Log your thoughts and receive AI-powered insights into your feelings and patterns.
                </p>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <CardContent className="p-8">
                <div className="p-3 mb-4 rounded-full w-fit bg-gradient-to-br from-purple-100 to-pink-100">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-2xl font-semibold">Actionable Suggestions</h3>
                <p className="text-gray-600">Get personalized recommendations to improve your mood and well-being.</p>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <CardContent className="p-8">
                <div className="p-3 mb-4 rounded-full w-fit bg-gradient-to-br from-purple-100 to-pink-100">
                  <LineChart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-2xl font-semibold">Mood Tracking</h3>
                <p className="text-gray-600">
                  Visualize your emotional journey with detailed mood tracking and analysis.
                </p>
              </CardContent>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
   
      {/* Tech Stack Section */}
   


      <section className="py-20">
        <div className="container mx-auto px-4">
          <SolutionShowcase
            title="AI-Powered Emotional Analysis"
            description="Our advanced AI analyzes your journal entries, providing deep insights into your emotional patterns and offering personalized suggestions for improvement."
            imageSrc="/first.png"
          />
          <SolutionShowcase
            title="Comprehensive Mood Tracking"
            description="Visualize your emotional journey with detailed mood tracking, helping you identify triggers and patterns over time."
            imageSrc="/dash.png"
            reverse
          />
          <SolutionShowcase
            title="Actionable Wellness Suggestions"
            description="Receive tailored recommendations for activities, exercises, and practices to enhance your mental well-being based on your unique emotional profile."
            imageSrc="/third.png"
          />
        </div>
      </section>


      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-8">Experience Serenity AI</h2>
          <p className="text-xl text-gray-600 mb-12">Take a guided tour of our features and see how Serenity AI can transform your emotional well-being.</p>
            <Link href="/dashboard/home">
          <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
            Start Interactive Demo
          </Button>
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="relative py-12 bg-gradient-to-r from-purple-900 to-purple-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container px-4 mx-auto relative">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-white"
            >
              <Calendar className="w-6 h-6" />
              <span className="text-xl font-semibold">Serenity AI</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-8 text-purple-200"
            >
              <Link href="#" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
            </motion.div>
          </div>
          <Separator className="my-8 bg-purple-800" />
          <p className="text-sm text-center text-purple-300">
            © {new Date().getFullYear()} Serenity AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

