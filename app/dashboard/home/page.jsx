"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { ThumbsUp, ThumbsDown, Heart, BookOpen, Lightbulb } from 'lucide-react'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import { motion } from "framer-motion"
import { toast } from "../../../hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const MenuBar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b bg-gradient-to-r from-purple-100 to-pink-100">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-secondary text-white" : ""}
      >
        Bold
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-secondary text-white" : ""}
      >
        Italic
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-secondary text-white" : ""}
      >
        Bullet List
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editor.isActive("taskList") ? "bg-secondary text-white" : ""}
      >
        Task List
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "bg-secondary text-white" : ""}
      >
        Highlight
      </Button>
    </div>
  )
}

// const userId=u
export default function MoodJournal() {
  const [title, setTitle] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState(null)
  const [currentAnalysisTab, setCurrentAnalysisTab] = useState("summary")
  const user=useUser();
  const editor = useEditor({
    extensions: [StarterKit, Highlight, TaskList, TaskItem],
  })

  const handleSubmit = async () => {
    if (!title || !editor?.getHTML()) return

    setSubmitting(true)
    try {
      const response = await fetch("/api/dashboard/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.user.id, title, content: editor.getHTML() }),      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      
      setCurrentAnalysis(data.journal)
      toast({
        title: "Success",
        description: "Journal entry submitted successfully!",
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
    if (!analysis) return null;

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
              <h3 className="text-lg font-semibold">
                {analysis.moodScore > 5 ? "Positive" : "Negative"} Sentiment
              </h3>
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
              <LineChart data={[
                { time: 'Morning', intensity: 5 },
                { time: 'Afternoon', intensity: 3 },
                { time: 'Evening', intensity: 7 }
              ]}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
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
      <motion.h1
        className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Reflective Journey
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entry Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-700">New Entry</CardTitle>
              <CardDescription>Capture your thoughts and feelings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Entry Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg border-2 border-purple-200 focus:border-purple-400 transition-colors"
              />
              <div className="border-2 border-purple-200 rounded-lg overflow-hidden">
                <MenuBar editor={editor} />
                <EditorContent
                  editor={editor}
                  className="min-h-[300px] p-4 prose prose-sm max-w-none focus:outline-none"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSubmit}
                disabled={submitting || !title || !editor?.getHTML()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                {submitting ? "Analyzing..." : "Save Entry"}
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
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">Analysis</CardTitle>
              <CardDescription>Insights from your current entry</CardDescription>
            </CardHeader>
            <CardContent>
              {currentAnalysis ? (
                <Tabs defaultValue="summary" onValueChange={setCurrentAnalysisTab}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="emotions">Emotions</TabsTrigger>
                    <TabsTrigger value="topics">Topics</TabsTrigger>
                    <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="summary">
                    {renderAnalysis(currentAnalysis.analysis)}
                  </TabsContent>
                  <TabsContent value="emotions">
                    {renderAnalysis(currentAnalysis.analysis)}
                  </TabsContent>
                  <TabsContent value="topics">
                    {renderAnalysis(currentAnalysis.analysis)}
                  </TabsContent>
                  <TabsContent value="suggestions">
                    {renderAnalysis(currentAnalysis.analysis)}
                  </TabsContent>
                </Tabs>
              ) : (
                <p className="text-center text-gray-500 italic">
                  Submit a journal entry to see the analysis
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
