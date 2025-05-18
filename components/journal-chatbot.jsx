"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { cn } from "../lib/utils"
import { ScrollArea } from "../components/ui/scroll-area"
import { Textarea } from "../components/ui/textarea"
import { Avatar } from "../components/ui/avatar"
import { CardHeader, CardContent, CardFooter } from "../components/ui/card"
import { AnimatePresence, motion } from "framer-motion"
import { HeartPulse, Send, X } from "lucide-react"

export default function JournalChatbot({
  journalContent,
  analysis = null,
  journalId = Date.now().toString(),
  isVisible = true,
  onClose = () => {},
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(true) // Start open by default
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        id: Date.now().toString(),
        content: `Hi there! I've analyzed your journal entry. Feel free to ask me any questions about the analysis or how you're feeling.`,
        role: "assistant",
        timestamp: Date.now(),
      }
      setMessages([welcomeMessage])
    }
  }, [messages.length])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      generateResponse(input, analysis)
    }, 1000)
  }

  const generateResponse = (userMessage, analysis) => {
    // Default response if analysis is missing
    let response = "I'm here to help you understand your journal entry. What would you like to know?"

    if (analysis) {
      if (userMessage.toLowerCase().includes("mood") || userMessage.toLowerCase().includes("feeling")) {
        response = `Based on your journal, your mood score is ${analysis.moodScore}/10. ${
          analysis.moodScore > 5
            ? "That's on the positive side!"
            : "That's on the lower side. Remember that it's okay to have difficult emotions."
        }`
      } else if (userMessage.toLowerCase().includes("emotion") || userMessage.toLowerCase().includes("feel")) {
        response = `Your primary emotion appears to be ${analysis.emotions?.primary || "unclear"}, with secondary emotions including ${analysis.emotions?.secondary?.join(", ") || "various feelings"}.`
      } else if (userMessage.toLowerCase().includes("topic") || userMessage.toLowerCase().includes("about")) {
        response = `Your journal entry touched on these topics: ${analysis.topics?.join(", ") || "various subjects"}.`
      } else if (
        userMessage.toLowerCase().includes("suggest") ||
        userMessage.toLowerCase().includes("help") ||
        userMessage.toLowerCase().includes("advice")
      ) {
        response = `I'd suggest: ${analysis.suggestions?.immediate || "taking some time for self-reflection"}. In the longer term, consider ${analysis.suggestions?.longTerm || "establishing a regular journaling practice"}.`
      } else if (userMessage.toLowerCase().includes("summary") || userMessage.toLowerCase().includes("overview")) {
        response = analysis.summary || "I don't have a summary of your journal entry yet."
      } else {
        response =
          "I can help you understand your journal entry. You can ask about your mood, emotions, topics discussed, or suggestions for improvement."
      }
    }

    const assistantMessage = {
      id: Date.now().toString(),
      content: response,
      role: "assistant",
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 sm:w-96"
          >
            <Card className="border-purple-200 shadow-lg h-96 flex flex-col bg-white">
              <CardHeader className="p-3 border-b bg-gradient-to-r from-purple-500 to-pink-500 flex flex-row items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 items-center justify-center bg-white">
                    <HeartPulse className="text-purple-500" />
                  </Avatar>
                  <div className="font-medium text-white">Journal Assistant</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-7 w-7 rounded-full text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3",
                        msg.role === "user" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-800",
                      )}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-3 max-w-[80%]">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              <CardFooter className="p-3 border-t bg-gray-50">
                <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                    placeholder="Ask me about your journal..."
                    className="min-h-10 flex-1 resize-none border-purple-200 focus:border-purple-400"
                    rows={1}
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    size="icon"
                    className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Send className="h-4 w-4 text-white" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 animate-bounce"
        >
          <HeartPulse className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  )
}

