"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import {
  ThumbsUp,
  ThumbsDown,
  Heart,
  BookOpen,
  Lightbulb,
  Info,
  Bold,
  Italic,
  List,
  CheckSquare,
  Highlighter,
  Heading1,
  Heading2,
  Quote,
  Code,
  Undo,
  Redo,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip"
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import Placeholder from "@tiptap/extension-placeholder"
import TiptapImage from "@tiptap/extension-image"
import TiptapLink from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import { motion } from "framer-motion"
import { toast } from "../../../hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"
import { cn } from "../../../lib/utils"
import JournalChatbot from "../../../components/journal-chatbot"

const MenuBar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
      <div className="flex items-center gap-1 mr-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-purple-200 transition-colors",
            editor.isActive("bold") ? "bg-purple-300 text-purple-800" : "text-purple-700",
          )}
          title="Bold"
        >
          <Bold size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-purple-200 transition-colors",
            editor.isActive("italic") ? "bg-purple-300 text-purple-800" : "text-purple-700",
          )}
          title="Italic"
        >
          <Italic size={16} />
        </Button>
        <span className="w-px h-6 bg-purple-200 mx-1"></span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-purple-200 transition-colors",
            editor.isActive("heading", { level: 1 }) ? "bg-purple-300 text-purple-800" : "text-purple-700",
          )}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-purple-200 transition-colors",
            editor.isActive("heading", { level: 2 }) ? "bg-purple-300 text-purple-800" : "text-purple-700",
          )}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </Button>
        <span className="w-px h-6 bg-purple-200 mx-1"></span>
      </div>

      <div className="flex items-center gap-1 mr-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-purple-200 transition-colors",
            editor.isActive("bulletList") ? "bg-purple-300 text-purple-800" : "text-purple-700",
          )}
          title="Bullet List"
        >
          <List size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-purple-200 transition-colors",
            editor.isActive("taskList") ? "bg-purple-300 text-purple-800" : "text-purple-700",
          )}
          title="Task List"
        >
          <CheckSquare size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-purple-200 transition-colors",
            editor.isActive("blockquote") ? "bg-purple-300 text-purple-800" : "text-purple-700",
          )}
          title="Quote"
        >
          <Quote size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-purple-200 transition-colors",
            editor.isActive("codeBlock") ? "bg-purple-300 text-purple-800" : "text-purple-700",
          )}
          title="Code Block"
        >
          <Code size={16} />
        </Button>
        <span className="w-px h-6 bg-purple-200 mx-1"></span>
      </div>

      <div className="flex items-center gap-1 mr-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-purple-200 transition-colors",
            editor.isActive("highlight") ? "bg-purple-300 text-purple-800" : "text-purple-700",
          )}
          title="Highlight"
        >
          <Highlighter size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const url = window.prompt("Enter the URL")
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-purple-200 transition-colors",
            editor.isActive("link") ? "bg-purple-300 text-purple-800" : "text-purple-700",
          )}
          title="Insert Link"
        >
          <Link size={16} />
        </Button>
        <span className="w-px h-6 bg-purple-200 mx-1"></span>
      </div>

      <div className="flex items-center gap-1 mr-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-purple-200 transition-colors",
            editor.isActive({ textAlign: "left" }) ? "bg-purple-300 text-purple-800" : "text-purple-700",
          )}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-purple-200 transition-colors",
            editor.isActive({ textAlign: "center" }) ? "bg-purple-300 text-purple-800" : "text-purple-700",
          )}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-purple-200 transition-colors",
            editor.isActive({ textAlign: "right" }) ? "bg-purple-300 text-purple-800" : "text-purple-700",
          )}
          title="Align Right"
        >
          <AlignRight size={16} />
        </Button>
        <span className="w-px h-6 bg-purple-200 mx-1"></span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="w-8 h-8 rounded-md hover:bg-purple-200 transition-colors text-purple-700 disabled:opacity-50"
          title="Undo"
        >
          <Undo size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="w-8 h-8 rounded-md hover:bg-purple-200 transition-colors text-purple-700 disabled:opacity-50"
          title="Redo"
        >
          <Redo size={16} />
        </Button>
      </div>
    </div>
  )
}

export default function MoodJournal() {
  const [title, setTitle] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState(null)
  const [currentAnalysisTab, setCurrentAnalysisTab] = useState("summary")
  const [charCount, setCharCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [infoOpen, setInfoOpen] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const user = useUser()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TiptapLink.configure({
        openOnClick: false,
      }),
      TiptapImage,
      Placeholder.configure({
        placeholder: "Begin your reflection here...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      // Count words and characters
      const text = editor.getText()
      setCharCount(text.length)
      setWordCount(text.split(/\s+/).filter((word) => word.length > 0).length)
    },
  })

  const handleSubmit = async () => {
    if (!title || !editor?.getHTML()) return

    setSubmitting(true)
    try {
      const response = await fetch("/api/dashboard/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.user.id, title, content: editor.getHTML() }),
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setCurrentAnalysis(data.journal)
      setShowChatbot(true) // Show chatbot after analysis is complete
      toast({
        title: "Success",
        description: "Journal entry submitted successfully!",
        className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      })
    } catch (error) {
      console.error("Error submitting journal:", error)
      toast({
        title: "Error",
        description: "Failed to submit journal entry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const renderAnalysis = (analysis) => {
    if (!analysis) return null

    switch (currentAnalysisTab) {
      case "summary":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {analysis.moodScore > 5 ? (
                <ThumbsUp className="text-green-500" />
              ) : (
                <ThumbsDown className="text-red-500" />
              )}
              <h3 className="text-lg font-semibold">{analysis.moodScore > 5 ? "Positive" : "Negative"} Sentiment</h3>
            </div>
            <p className="text-gray-600">{analysis.summary}</p>
          </div>
        )

      case "emotions":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" />
              <h3 className="text-lg font-semibold">Emotional Analysis</h3>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Primary Emotion: {analysis.emotions.primary}</p>
              <p className="text-sm text-gray-600">Intensity: {analysis.emotions.intensity}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {analysis.emotions.secondary.map((emotion, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                    {emotion}
                  </span>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={[
                  { time: "Morning", intensity: 5 },
                  { time: "Afternoon", intensity: 3 },
                  { time: "Evening", intensity: 7 },
                ]}
              >
                <XAxis dataKey="time" />
                <YAxis />
                <RechartsTooltip />
                <Line type="monotone" dataKey="intensity" stroke="#8b5cf6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )

      case "topics":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="text-blue-500" />
              <h3 className="text-lg font-semibold">Key Topics</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.topics.map((topic, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )

      case "suggestions":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="text-yellow-500" />
              <h3 className="text-lg font-semibold">Suggestions</h3>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Immediate Action:</h4>
                <p className="text-gray-600">{analysis.suggestions.immediate}</p>
              </div>
              <div>
                <h4 className="font-medium">Long-term Recommendation:</h4>
                <p className="text-gray-600">{analysis.suggestions.longTerm}</p>
              </div>
              <div>
                <h4 className="font-medium">Recommended Activities:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {analysis.suggestions.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Helpful Resources:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {analysis.suggestions.resources.map((resource, index) => (
                    <li key={index}>{resource}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto p-4 font-sans">
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Reflective Journey
        </motion.h1>

        <TooltipProvider>
          <Tooltip open={infoOpen} onOpenChange={setInfoOpen}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setInfoOpen(!infoOpen)}>
                <Info className="h-5 w-5 text-purple-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm p-4 bg-white shadow-lg rounded-lg border border-purple-100">
              <div className="space-y-2">
                <h3 className="font-semibold text-purple-700">How to Use This Journal</h3>
                <ol className="text-sm space-y-1 text-gray-600">
                  <li>1. Enter a meaningful title for your entry</li>
                  <li>2. Write your thoughts, feelings, and experiences in the journal area</li>
                  <li>3. Use the formatting tools to organize your content</li>
                  <li>4. Click "Save Entry" to submit and receive an AI-powered analysis</li>
                  <li>5. Review your personalized insights in the Analysis section</li>
                  <li>6. Chat with the AI assistant for deeper insights about your entry</li>
                </ol>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entry Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg border-purple-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl text-purple-700">New Entry</CardTitle>
              <CardDescription>Capture your thoughts and feelings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Entry Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg border-2 border-purple-200 focus:border-purple-400 transition-colors pl-4 pr-12 py-3 rounded-lg"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-purple-400">
                  {title.length}/100
                </span>
              </div>

              <div className="border-2 border-purple-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-purple-300 focus-within:border-purple-400 focus-within:shadow-md">
                <MenuBar editor={editor} />

                {editor && (
                  <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    <div className="flex bg-white rounded-lg shadow-lg border border-purple-100 overflow-hidden">
                      <Button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive("bold") ? "bg-purple-100" : "bg-white"}
                        variant="ghost"
                        size="sm"
                      >
                        <Bold size={14} />
                      </Button>
                      <Button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive("italic") ? "bg-purple-100" : "bg-white"}
                        variant="ghost"
                        size="sm"
                      >
                        <Italic size={14} />
                      </Button>
                      <Button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={editor.isActive("highlight") ? "bg-purple-100" : "bg-white"}
                        variant="ghost"
                        size="sm"
                      >
                        <Highlighter size={14} />
                      </Button>
                    </div>
                  </BubbleMenu>
                )}

                <div className="h-64 overflow-y-auto">
                  <EditorContent
                    editor={editor}
                    className="prose prose-sm p-4 max-w-none focus:outline-none min-h-full"
                  />
                </div>

                <div className="flex justify-between items-center px-3 py-2 text-xs text-purple-400 border-t border-purple-100 bg-purple-50">
                  <div className="flex space-x-3">
                    <span>{wordCount} words</span>
                    <span>{charCount} characters</span>
                  </div>
                  <span className="text-purple-500">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSubmit}
                disabled={submitting || !title || !editor?.getHTML() || editor?.getHTML() === "<p></p>"}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 h-12 rounded-lg"
              >
                {submitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  "Save Entry"
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Analysis Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg border-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">Analysis</CardTitle>
              <CardDescription>Insights from your current entry</CardDescription>
            </CardHeader>
            <CardContent>
              {currentAnalysis ? (
                <Tabs defaultValue="summary" onValueChange={setCurrentAnalysisTab} className="space-y-4">
                  <TabsList className="grid grid-cols-4 w-full p-1 bg-blue-100 rounded-lg">
                    <TabsTrigger
                      value="summary"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
                    >
                      Summary
                    </TabsTrigger>
                    <TabsTrigger
                      value="emotions"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
                    >
                      Emotions
                    </TabsTrigger>
                    <TabsTrigger
                      value="topics"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
                    >
                      Topics
                    </TabsTrigger>
                    <TabsTrigger
                      value="suggestions"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
                    >
                      Suggestions
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="summary"
                    className="mt-6 p-4 bg-white rounded-lg border border-blue-100 shadow-sm"
                  >
                    {renderAnalysis(currentAnalysis.analysis)}
                  </TabsContent>
                  <TabsContent
                    value="emotions"
                    className="mt-6 p-4 bg-white rounded-lg border border-blue-100 shadow-sm"
                  >
                    {renderAnalysis(currentAnalysis.analysis)}
                  </TabsContent>
                  <TabsContent value="topics" className="mt-6 p-4 bg-white rounded-lg border border-blue-100 shadow-sm">
                    {renderAnalysis(currentAnalysis.analysis)}
                  </TabsContent>
                  <TabsContent
                    value="suggestions"
                    className="mt-6 p-4 bg-white rounded-lg border border-blue-100 shadow-sm"
                  >
                    {renderAnalysis(currentAnalysis.analysis)}
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="py-16 text-center">
                  <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <p className="text-center text-gray-500">Submit a journal entry to see your personalized analysis</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Your thoughts will be processed with AI to provide meaningful insights
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Chatbot Component */}
      {showChatbot && currentAnalysis && (
        <JournalChatbot
          analysis={currentAnalysis.analysis}
          journalId={currentAnalysis.id}
          isVisible={true}
          onClose={() => setShowChatbot(false)}
        />
      )}
    </div>
  )
}

