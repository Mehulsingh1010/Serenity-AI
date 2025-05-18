/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Book, Heart, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect, RefObject } from "react"
import { Separator } from "./_components/ui/separator"
import { JournalPage } from "./_components/journal-page"
import { PaperNote } from "./_components/paper-note"
import { HandwrittenText } from "./_components/handwritten-text"
import { PolaroidImage } from "./_components/polaroid-image"
import { PaperTabs } from "./_components/paper-tabs"
import { InkBlot } from "./_components/ink-blot"
import { PaperButton } from "./_components/paper-button"
import { WashiTape } from "./_components/washi-tape"
import { Paperclip } from "./_components/paperclip"
import { StickyNote } from "./_components/sticky-note"
import { NotebookSpiral } from "./_components/notebook-spiral"
import { HighlightText } from "./_components/highlight-text"




export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("journal")
  const journalRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>
  const featuresRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>
  const aboutRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Scroll to section
  const scrollToSection = (ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-amber-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                className="relative w-32 h-40 bg-white rounded-sm shadow-md overflow-hidden flex items-center justify-center"
              >
                <Image src="/logo1.png" alt="Serenity AI" width={200} height={200} className="object-contain" />
                <motion.div
                  className="absolute inset-0 border-2 border-amber-200 rounded-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                />
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                className="h-1 bg-amber-400 mt-4 rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-amber-50 overflow-x-hidden font-handwriting">
        {/* Notebook spiral at the top */}
        <NotebookSpiral />

        {/* Hero Section */}
        <section className="relative pt-16 pb-24">
          <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10 z-0" />

          {/* Ink blots */}
          <InkBlot color="purple" size={300} position={{ top: "10%", right: "5%" }} opacity={0.07} rotate={15} />
          <InkBlot color="blue" size={250} position={{ bottom: "15%", left: "8%" }} opacity={0.05} rotate={-20} />

          <div className="container px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center justify-center mb-12">
              <WashiTape color="purple" width={150} rotate={-3} />
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-50 h-50 mb-4"
              >
                <Image src="/logo1.png" alt="Serenity AI" height={200} width={200} className="object-contain" />
              </motion.div>
            </div>

            <JournalPage>
              <div className="text-center mb-8">
                <HandwrittenText
                  text="Serenity AI"
                  className="text-6xl sm:text-7xl font-bold text-purple-800 mb-2"
                  delay={0.5}
                />
                <HighlightText color="yellow">
                  <h2 className="text-2xl text-gray-700 italic">Your personal journal for emotional well-being</h2>
                </HighlightText>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 mt-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="flex-1"
                >
                  <PaperNote className="p-6 rotate-[-1deg]">
                    <h3 className="text-xl font-semibold mb-3 text-purple-800">Dear Friend,</h3>
                    <p className="mb-4 text-gray-700">
                      Welcome to your personal space for reflection and growth. Serenity AI is like having a thoughtful
                      companion who listens, understands, and guides you through your emotional journey.
                    </p>
                    <p className="text-gray-700">
                      Write your thoughts, track your moods, and discover insights that help you understand yourself
                      better. Let's begin this journey together.
                    </p>
                    <div className="mt-4 text-right text-gray-600 italic">— Your Serenity Journal</div>
                  </PaperNote>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex-1"
                >
                  <div className="relative">
                    <PolaroidImage
                      src="/2nd.png"
                      alt="Dashboard Preview"
                      caption="Your personal dashboard"
                      rotate={2}
                    />
                    <Paperclip position={{ top: -10, right: 20 }} rotate={10} />
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
              >
                <PaperButton href="/dashboard/home" primary>
                  <span>Open Your Journal</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </PaperButton>
                <PaperButton href="/dashboard/home">
                  <span>Take a Tour</span>
                </PaperButton>
              </motion.div>
            </JournalPage>

            {/* Scroll indicator */}
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <motion.button
                onClick={() => scrollToSection(featuresRef)}
                className="flex flex-col items-center text-amber-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium mb-2">Explore Your Journal</span>
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 13L12 18L17 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 7L12 12L17 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20 relative">
          <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10 z-0" />

          <div className="container px-4 mx-auto relative z-10">
            <div className="text-center mb-12">
              <WashiTape color="green" width={200} rotate={2} />
              <HandwrittenText text="Journal Features" className="text-4xl font-bold text-amber-800" delay={0.2} />
            </div>

            <PaperTabs
              tabs={[
                { id: "journal", label: "Daily Journal", icon: <Book className="w-4 h-4" /> },
                { id: "insights", label: "AI Insights", icon: <Sparkles className="w-4 h-4" /> },
                { id: "mood", label: "Mood Tracking", icon: <Heart className="w-4 h-4" /> },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            <div className="mt-8">
              {activeTab === "journal" && (
                <JournalPage>
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                      <HandwrittenText
                        text="Express Yourself Freely"
                        className="text-2xl font-bold text-purple-800 mb-4"
                        delay={0.2}
                      />
                      <div className="space-y-4">
                        <p className="text-gray-700">
                          Your digital journal provides a safe space to express your thoughts and feelings without
                          judgment. Write as little or as much as you want.
                        </p>
                        <div className="flex items-start gap-2">
                          <span className="text-amber-800 font-bold">•</span>
                          <p className="text-gray-700">Rich text formatting with emotional color coding</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-amber-800 font-bold">•</span>
                          <p className="text-gray-700">Voice-to-text for when you prefer speaking over typing</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-amber-800 font-bold">•</span>
                          <p className="text-gray-700">Attach photos, audio clips, and other media to your entries</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <PolaroidImage
                          src="/mood.png"
                          alt="Journal Interface"
                          caption="Your digital journal"
                          rotate={-1}
                        />
                        <StickyNote
                          text="I love how easy it is to express myself here!"
                          position={{ bottom: -30, right: -20 }}
                          rotate={5}
                          color="yellow"
                        />
                      </div>
                    </div>
                  </div>
                </JournalPage>
              )}


              {activeTab === "insights" && (
                <JournalPage>
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                      <div className="relative">
                        <PolaroidImage src="/third.png" alt="AI Insights" caption="Personalized insights" rotate={1} />
                        <StickyNote
                          text="The AI really understands my patterns!"
                          position={{ bottom: -30, left: -20 }}
                          rotate={-3}
                          color="blue"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <HandwrittenText
                        text="AI-Powered Insights"
                        className="text-2xl font-bold text-purple-800 mb-4"
                        delay={0.2}
                      />
                      <div className="space-y-4">
                        <p className="text-gray-700">
                          Our AI analyzes your journal entries to identify emotional patterns and provide personalized
                          insights to help you understand yourself better.
                        </p>
                        <div className="flex items-start gap-2">
                          <span className="text-amber-800 font-bold">•</span>
                          <p className="text-gray-700">Emotion recognition and sentiment analysis</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-amber-800 font-bold">•</span>
                          <p className="text-gray-700">Pattern identification across entries</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-amber-800 font-bold">•</span>
                          <p className="text-gray-700">Personalized suggestions for emotional well-being</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </JournalPage>
              )}


              {activeTab === "mood" && (
                <JournalPage>
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                      <HandwrittenText
                        text="Track Your Emotional Journey"
                        className="text-2xl font-bold text-purple-800 mb-4"
                        delay={0.2}
                      />
                      <div className="space-y-4">
                        <p className="text-gray-700">
                          Visualize your emotional journey with our intuitive mood tracking tools. Identify patterns and
                          triggers to better understand your emotional responses.
                        </p>
                        <div className="flex items-start gap-2">
                          <span className="text-amber-800 font-bold">•</span>
                          <p className="text-gray-700">Daily mood check-ins with customizable emotions</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-amber-800 font-bold">•</span>
                          <p className="text-gray-700">Visual charts and graphs to track progress</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-amber-800 font-bold">•</span>
                          <p className="text-gray-700">Identify correlations between activities and mood</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <PolaroidImage src="/mood.png" alt="Mood Tracking" caption="Your mood journey" rotate={-2} />
                        <StickyNote
                          text="I can see my progress over time!"
                          position={{ bottom: -30, right: -20 }}
                          rotate={3}
                          color="green"
                        />
                      </div>
                    </div>
                  </div>
                </JournalPage>
              )}
            </div>
          </div>
        </section>


        {/* Testimonials Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10 z-0" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <WashiTape color="pink" width={180} rotate={-2} />
              <HandwrittenText
                text="Journal Entries from Our Community"
                className="text-4xl font-bold text-amber-800"
                delay={0.2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialNote
                content="Serenity AI has become my daily companion. I've noticed patterns in my emotions I never saw before, and the suggestions have really helped me manage my anxiety."
                author="Sarah J."
                color="yellow"
                rotate={-2}
              />
              <TestimonialNote
                content="As someone who's always struggled with journaling consistently, this app makes it so easy and rewarding. The insights feel personal and thoughtful."
                author="Michael T."
                color="blue"
                rotate={1}
              />
              <TestimonialNote
                content="I love how the mood tracking visualizes my emotional journey. It's helped me identify triggers and make positive changes in my daily routine."
                author="Emily R."
                color="green"
                rotate={-1}
              />
            </div>
          </div>
        </section>


        {/* About Section */}
        <section ref={aboutRef} className="py-20 relative">
          <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10 z-0" />

          <InkBlot color="teal" size={350} position={{ top: "30%", left: "5%" }} opacity={0.06} rotate={25} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <WashiTape color="amber" width={160} rotate={3} />
              <HandwrittenText text="Our Philosophy" className="text-4xl font-bold text-amber-800" delay={0.2} />
            </div>

            <JournalPage>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <PolaroidImage
                      src="/logo1.png"
                      alt="Serenity AI Philosophy"
                      caption="Finding balance"
                      rotate={0}
                      size="medium"
                    />
                    <Paperclip position={{ top: -10, left: 20 }} rotate={-5} />
                  </div>
                </div>
                <div className="flex-1">
                  <HandwrittenText
                    text="A Personal Journey"
                    className="text-2xl font-bold text-purple-800 mb-4"
                    delay={0.2}
                  />
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      At Serenity AI, we believe that emotional well-being is a personal journey. Our approach combines
                      the therapeutic benefits of journaling with the insights of artificial intelligence.
                    </p>
                    <p className="text-gray-700">
                      We've created a space that feels like a personal journal but with the added benefit of AI-powered
                      insights that help you understand yourself better and grow emotionally.
                    </p>
                    <p className="text-gray-700">
                      Your privacy is our priority. All your journal entries are encrypted and only accessible to you.
                      The AI processes your data locally whenever possible to ensure your thoughts remain private.
                    </p>
                  </div>
                </div>
              </div>
            </JournalPage>
          </div>
        </section>

        <section className="py-16 relative">
          <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10 z-0" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <WashiTape color="indigo" width={180} rotate={-1} />
              <HandwrittenText text="Talk With Your AI Journal" className="text-4xl font-bold text-indigo-800" delay={0.2} />
            </div>
            
            <JournalPage>
              <div className="space-y-6 max-w-3xl mx-auto">
                <ChatBubble type="user">
                  I've been feeling really stressed about work lately. I can't seem to stop thinking about deadlines even when I'm trying to relax.
                </ChatBubble>
                
                <ChatBubble type="ai">
                  I notice you've mentioned work stress several times this week. It sounds like your mind is having trouble shifting out of "work mode." This is common with anxiety patterns. Would you like to try a quick grounding exercise, or would you prefer to explore the specific thought patterns keeping you stuck?
                </ChatBubble>
                
                <ChatBubble type="user">
                  I think I need help with the thought patterns. I keep catastrophizing what will happen if I miss a deadline.
                </ChatBubble>
                
                <ChatBubble type="ai">
                  I understand. Catastrophizing is a common cognitive distortion. Based on your journal patterns, here's a cognitive reframing exercise tailored for you:
                  
                  When you notice thoughts like "If I miss this deadline, everything will fall apart," try asking:
                  
                  1. What's the actual evidence this will happen?
                  2. What happened the last time a deadline shifted?
                  3. What's a more balanced view of this situation?
                  
                  Would you like to practice this together with a specific work worry?
                </ChatBubble>
                
                <div className="text-center mt-8">
                  <p className="text-gray-600 italic mb-4">Experience personalized therapeutic conversations with your AI journal companion</p>
                  <PaperButton href="/dashboard" className="border-indigo-400 text-indigo-700 hover:bg-indigo-100">
                    {/* <MessageCircle className="w-4 h-4 mr-2" /> */}
                    <span>Try AI Chat Therapy</span>
                  </PaperButton>
                </div>
              </div>
            </JournalPage>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10 z-0" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <JournalPage>
              <HandwrittenText
                text="Begin Your Journey Today"
                className="text-3xl font-bold text-purple-800 mb-4"
                delay={0.2}
              />
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Take the first step towards better understanding your emotions and improving your well-being.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <PaperButton href="/dashboard/home" primary large>
                  <span>Start Your Journal</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </PaperButton>
                <PaperButton href="#contact" large>
                  <span>Learn More</span>
                </PaperButton>
              </div>
            </JournalPage>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 relative bg-amber-100">
          <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-20 z-0" />

          <div className="container px-4 mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-900">
                  <div className="relative w-8 h-8">
                    <Image src="/logo1.png" alt="Serenity AI" fill className="object-contain" />
                  </div>
                  <span className="text-xl font-semibold">Serenity AI</span>
                </div>
                <p className="text-amber-800">Your personal companion for mental well-being and emotional growth.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-amber-900 font-semibold">Features</h3>
                <ul className="space-y-2 text-amber-800">
                  <li>
                    <Link href="#" className="hover:text-amber-600 transition-colors">
                      Daily Journal
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-amber-600 transition-colors">
                      AI Insights
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-amber-600 transition-colors">
                      Mood Tracking
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-amber-600 transition-colors">
                      Wellness Suggestions
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-amber-900 font-semibold">Company</h3>
                <ul className="space-y-2 text-amber-800">
                  <li>
                    <Link href="#" className="hover:text-amber-600 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-amber-600 transition-colors">
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-amber-600 transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-amber-600 transition-colors">
                      Press
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-amber-900 font-semibold">Legal</h3>
                <ul className="space-y-2 text-amber-800">
                  <li>
                    <Link href="#" className="hover:text-amber-600 transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-amber-600 transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-amber-600 transition-colors">
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" id="contact" className="hover:text-amber-600 transition-colors">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-amber-700">© {new Date().getFullYear()} Serenity AI. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="#" className="text-amber-700 hover:text-amber-900 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-amber-700 hover:text-amber-900 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-amber-700 hover:text-amber-900 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

// ChatBubble Component
type ChatBubbleProps = {
  type: "user" | "ai"
  children: React.ReactNode
}

function ChatBubble({ type, children }: ChatBubbleProps) {
  const isUser = type === "user"
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[80%] px-5 py-3 rounded-lg shadow-sm font-handwriting ${
          isUser
            ? "bg-indigo-100 text-indigo-900 rounded-br-none"
            : "bg-amber-100 text-amber-900 rounded-bl-none"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

// Testimonial Note Component
type TestimonialNoteProps = {
  content: string
  author: string
  color?: "yellow" | "blue" | "green" | "pink"
  rotate?: number
}

function TestimonialNote({ content, author, color = "yellow", rotate = 0 }: TestimonialNoteProps) {
  const colorClasses = {
    yellow: "bg-amber-100 border-amber-200",
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    pink: "bg-pink-50 border-pink-200",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03, rotate: rotate + 1 }}
      className={`p-6 rounded-sm border ${colorClasses[color]} shadow-md transform rotate-${rotate}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <p className="text-gray-700 mb-4 font-handwriting">{content}</p>
      <div className="text-right text-gray-600 italic font-handwriting">— {author}</div>
      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white border border-gray-200 rounded-sm shadow-sm transform rotate-12"></div>
    </motion.div>
  )
}
