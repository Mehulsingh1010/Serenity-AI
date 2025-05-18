"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../hooks/use-toast";
import { useSubscription } from "../../../hooks/use-subscription";
import SubscriptionPrompt from "../../../components/subscription-prompt";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
  ThumbsUp,
  ThumbsDown,
  Heart,
  Sparkles,
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
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { motion } from "framer-motion";
import { toast } from "../../../hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "../../../lib/utils";
import JournalChatbot from "../../../components/journal-chatbot";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gradient-to-r from-amber-100 to-amber-50 rounded-t-lg">
      <div className="flex items-center gap-1 mr-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-amber-200 transition-colors",
            editor.isActive("bold")
              ? "bg-amber-300 text-amber-800"
              : "text-amber-700"
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
            "w-8 h-8 rounded-md hover:bg-amber-200 transition-colors",
            editor.isActive("italic")
              ? "bg-amber-300 text-amber-800"
              : "text-amber-700"
          )}
          title="Italic"
        >
          <Italic size={16} />
        </Button>
        <span className="w-px h-6 bg-amber-200 mx-1"></span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={cn(
            "w-8 h-8 rounded-md hover:bg-amber-200 transition-colors",
            editor.isActive("heading", { level: 1 })
              ? "bg-amber-300 text-amber-800"
              : "text-amber-700"
          )}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn(
            "w-8 h-8 rounded-md hover:bg-amber-200 transition-colors",
            editor.isActive("heading", { level: 2 })
              ? "bg-amber-300 text-amber-800"
              : "text-amber-700"
          )}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </Button>
        <span className="w-px h-6 bg-amber-200 mx-1"></span>
      </div>

      <div className="flex items-center gap-1 mr-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-amber-200 transition-colors",
            editor.isActive("bulletList")
              ? "bg-amber-300 text-amber-800"
              : "text-amber-700"
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
            "w-8 h-8 rounded-md hover:bg-amber-200 transition-colors",
            editor.isActive("taskList")
              ? "bg-amber-300 text-amber-800"
              : "text-amber-700"
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
            "w-8 h-8 rounded-md hover:bg-amber-200 transition-colors",
            editor.isActive("blockquote")
              ? "bg-amber-300 text-amber-800"
              : "text-amber-700"
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
            "w-8 h-8 rounded-md hover:bg-amber-200 transition-colors",
            editor.isActive("codeBlock")
              ? "bg-amber-300 text-amber-800"
              : "text-amber-700"
          )}
          title="Code Block"
        >
          <Code size={16} />
        </Button>
        <span className="w-px h-6 bg-amber-200 mx-1"></span>
      </div>

      <div className="flex items-center gap-1 mr-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-amber-200 transition-colors",
            editor.isActive("highlight")
              ? "bg-amber-300 text-amber-800"
              : "text-amber-700"
          )}
          title="Highlight"
        >
          <Highlighter size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const url = window.prompt("Enter the URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-amber-200 transition-colors",
            editor.isActive("link")
              ? "bg-amber-300 text-amber-800"
              : "text-amber-700"
          )}
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </Button>
        <span className="w-px h-6 bg-amber-200 mx-1"></span>
      </div>

      <div className="flex items-center gap-1 mr-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={cn(
            "w-8 h-8 rounded-md hover:bg-amber-200 transition-colors",
            editor.isActive({ textAlign: "left" })
              ? "bg-amber-300 text-amber-800"
              : "text-amber-700"
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
            "w-8 h-8 rounded-md hover:bg-amber-200 transition-colors",
            editor.isActive({ textAlign: "center" })
              ? "bg-amber-300 text-amber-800"
              : "text-amber-700"
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
            "w-8 h-8 rounded-md hover:bg-amber-200 transition-colors",
            editor.isActive({ textAlign: "right" })
              ? "bg-amber-300 text-amber-800"
              : "text-amber-700"
          )}
          title="Align Right"
        >
          <AlignRight size={16} />
        </Button>
        <span className="w-px h-6 bg-amber-200 mx-1"></span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="w-8 h-8 rounded-md hover:bg-amber-200 transition-colors text-amber-700 disabled:opacity-50"
          title="Undo"
        >
          <Undo size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="w-8 h-8 rounded-md hover:bg-amber-200 transition-colors text-amber-700 disabled:opacity-50"
          title="Redo"
        >
          <Redo size={16} />
        </Button>
      </div>
    </div>
  );
};

export default function MoodJournal() {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [currentAnalysisTab, setCurrentAnalysisTab] = useState("summary");
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const { user } = useUser();
  const { status, loading } = useSubscription(user?.id);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const { toast } = useToast();

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
      const text = editor.getText();
      setCharCount(text.length);
      setWordCount(text.split(/\s+/).filter((word) => word.length > 0).length);
    },
  });

  const handleSubmit = async () => {
    if (!title || !editor?.getHTML()) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/dashboard/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          title,
          content: editor.getHTML(),
        }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setCurrentAnalysis(data.journal);
      setShowChatbot(true); // Show chatbot after analysis is complete
      toast({
        title: "Success",
        description: "Journal entry submitted successfully!",
        className: "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
      });
    } catch (error) {
      console.error("Error submitting journal:", error);
      toast({
        title: "Error",
        description: "Failed to submit journal entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

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
              <h3 className="text-lg font-semibold font-handwriting">
                {analysis.moodScore > 5 ? "Positive" : "Negative"} Sentiment
              </h3>
            </div>
            <p className="text-gray-600 font-handwriting">{analysis.summary}</p>
          </div>
        );

      case "emotions":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" />
              <h3 className="text-lg font-semibold font-handwriting">
                Emotional Analysis
              </h3>
            </div>
            <div className="space-y-2">
              <p className="font-medium font-handwriting">
                Primary Emotion: {analysis.emotions.primary}
              </p>
              <p className="text-sm text-gray-600 font-handwriting">
                Intensity: {analysis.emotions.intensity}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {analysis.emotions.secondary.map((emotion, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-amber-100 rounded-full text-sm font-handwriting"
                  >
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
                <Line type="monotone" dataKey="intensity" stroke="#b45309" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      case "topics":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="text-blue-500" />
              <h3 className="text-lg font-semibold font-handwriting">
                Key Topics
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-handwriting"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        );

      case "suggestions":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="text-yellow-500" />
              <h3 className="text-lg font-semibold font-handwriting">
                Suggestions
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium font-handwriting">
                  Immediate Action:
                </h4>
                <p className="text-gray-600 font-handwriting">
                  {analysis.suggestions.immediate}
                </p>
              </div>
              <div>
                <h4 className="font-medium font-handwriting">
                  Long-term Recommendation:
                </h4>
                <p className="text-gray-600 font-handwriting">
                  {analysis.suggestions.longTerm}
                </p>
              </div>
              <div>
                <h4 className="font-medium font-handwriting">
                  Recommended Activities:
                </h4>
                <ul className="list-disc list-inside text-gray-600 font-handwriting">
                  {analysis.suggestions.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium font-handwriting">
                  Helpful Resources:
                </h4>
                <ul className="list-disc list-inside text-gray-600 font-handwriting">
                  {analysis.suggestions.resources.map((resource, index) => (
                    <li key={index}>{resource}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      {!loading &&
        !status.isSubscribed &&
        status.entriesRemaining <= 2 &&
        status.entriesRemaining > 0 && (
          <SubscriptionPrompt status={status} variant="banner" />
        )}

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionPrompt
          status={status}
          variant="modal"
          onClose={() => setShowSubscriptionModal(false)}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <motion.h1
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800 font-handwriting"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Today's Journal
        </motion.h1>

        <TooltipProvider>
          <Tooltip open={infoOpen} onOpenChange={setInfoOpen}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-amber-700 hover:bg-amber-100"
                onClick={() => setInfoOpen(!infoOpen)}
              >
                <Info className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm p-4 bg-white shadow-lg rounded-lg border border-amber-100">
              <div className="space-y-2">
                <h3 className="font-semibold text-amber-700 font-handwriting">
                  How to Use This Journal
                </h3>
                <ol className="text-sm space-y-1 text-gray-600 font-handwriting">
                  <li>1. Enter a meaningful title for your entry</li>
                  <li>
                    2. Write your thoughts, feelings, and experiences in the
                    journal area
                  </li>
                  <li>3. Use the formatting tools to organize your content</li>
                  <li>
                    4. Click "Save Entry" to submit and receive an AI-powered
                    analysis
                  </li>
                  <li>
                    5. Review your personalized insights in the Analysis section
                  </li>
                  <li>
                    6. Chat with the AI assistant for deeper insights about your
                    entry
                  </li>
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
          {!loading && !status.isSubscribed && status.entriesRemaining <= 1 && (
            <SubscriptionPrompt status={status} variant="inline" />
          )}

          <div className="relative bg-white rounded-sm shadow-md p-6 border border-amber-200">
            {/* Paper texture */}
            <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-20 rounded-sm pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl text-amber-800 font-handwriting">
                New Entry
                {!loading &&
                  !status.isSubscribed &&
                  status.entriesRemaining > 1 && (
                    <span className="ml-2 text-sm font-normal text-amber-500 flex items-center">
                      <Sparkles className="h-4 w-4 mr-1" />
                      {status.entriesRemaining} entries remaining
                    </span>
                  )}
              </h2>

              <p className="text-amber-700 font-handwriting">
                Capture your thoughts and feelings
              </p>

              <div className="relative">
                <Input
                  placeholder="Entry Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg border-2 border-amber-200 focus:border-amber-400 transition-colors pl-4 pr-12 py-3 rounded-lg font-handwriting"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-amber-400 font-handwriting">
                  {title.length}/100
                </span>
              </div>

              <div className="border-2 border-amber-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-amber-300 focus-within:border-amber-400 focus-within:shadow-md">
                <MenuBar editor={editor} />

                {editor && (
                  <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    <div className="flex bg-white rounded-lg shadow-lg border border-amber-100 overflow-hidden">
                      <Button
                        onClick={() =>
                          editor.chain().focus().toggleBold().run()
                        }
                        className={
                          editor.isActive("bold") ? "bg-amber-100" : "bg-white"
                        }
                        variant="ghost"
                        size="sm"
                      >
                        <Bold size={14} />
                      </Button>
                      <Button
                        onClick={() =>
                          editor.chain().focus().toggleItalic().run()
                        }
                        className={
                          editor.isActive("italic")
                            ? "bg-amber-100"
                            : "bg-white"
                        }
                        variant="ghost"
                        size="sm"
                      >
                        <Italic size={14} />
                      </Button>
                      <Button
                        onClick={() =>
                          editor.chain().focus().toggleHighlight().run()
                        }
                        className={
                          editor.isActive("highlight")
                            ? "bg-amber-100"
                            : "bg-white"
                        }
                        variant="ghost"
                        size="sm"
                      >
                        <Highlighter size={14} />
                      </Button>
                    </div>
                  </BubbleMenu>
                )}

                <div className="h-64 overflow-y-auto bg-[url('/paper-texture.png')] bg-opacity-5">
                  <EditorContent
                    editor={editor}
                    className="prose prose-sm p-4 max-w-none focus:outline-none min-h-full font-handwriting"
                  />
                </div>

                <div className="flex justify-between items-center px-3 py-2 text-xs text-amber-600 border-t border-amber-100 bg-amber-50 font-handwriting">
                  <div className="flex space-x-3">
                    <span>{wordCount} words</span>
                    <span>{charCount} characters</span>
                  </div>
                  <span className="text-amber-700">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={
                  submitting ||
                  !title ||
                  !editor?.getHTML() ||
                  editor?.getHTML() === "<p></p>"
                }
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all duration-300 h-12 rounded-lg font-handwriting"
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
            </div>
          </div>
        </motion.div>

        {/* Analysis Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative bg-white rounded-sm shadow-md p-6 border border-amber-200">
            {/* Paper texture */}
            <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-20 rounded-sm pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-2xl text-amber-800 font-handwriting mb-2">
                Analysis
              </h2>
              <p className="text-amber-700 font-handwriting mb-4">
                Insights from your current entry
              </p>

              {currentAnalysis ? (
                <Tabs
                  defaultValue="summary"
                  onValueChange={setCurrentAnalysisTab}
                  className="space-y-4"
                >
                  <TabsList className="grid grid-cols-4 w-full p-1 bg-amber-100 rounded-lg">
                    <TabsTrigger
                      value="summary"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm font-handwriting"
                    >
                      Summary
                    </TabsTrigger>
                    <TabsTrigger
                      value="emotions"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm font-handwriting"
                    >
                      Emotions
                    </TabsTrigger>
                    <TabsTrigger
                      value="topics"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm font-handwriting"
                    >
                      Topics
                    </TabsTrigger>
                    <TabsTrigger
                      value="suggestions"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm font-handwriting"
                    >
                      Suggestions
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="summary"
                    className="mt-6 p-4 bg-white rounded-lg border border-amber-100 shadow-sm"
                  >
                    {renderAnalysis(currentAnalysis.analysis)}
                  </TabsContent>
                  <TabsContent
                    value="emotions"
                    className="mt-6 p-4 bg-white rounded-lg border border-amber-100 shadow-sm"
                  >
                    {renderAnalysis(currentAnalysis.analysis)}
                  </TabsContent>
                  <TabsContent
                    value="topics"
                    className="mt-6 p-4 bg-white rounded-lg border border-amber-100 shadow-sm"
                  >
                    {renderAnalysis(currentAnalysis.analysis)}
                  </TabsContent>
                  <TabsContent
                    value="suggestions"
                    className="mt-6 p-4 bg-white rounded-lg border border-amber-100 shadow-sm"
                  >
                    {renderAnalysis(currentAnalysis.analysis)}
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="py-16 text-center text-amber-600 font-handwriting">
                  <div className="flex justify-center mb-4">
                    <svg
                      className="w-16 h-16 text-amber-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-lg mb-2">No Analysis Yet</p>
                  <p className="text-sm max-w-md mx-auto">
                    Once you submit your journal entry, our AI will analyze your
                    writing and provide personalized insights here.
                  </p>
                </div>
              )}

              {showChatbot && currentAnalysis && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-amber-500" />
                    <h3 className="text-lg font-semibold text-amber-700 font-handwriting">
                      Chat with your Journal
                    </h3>
                  </div>
                  <JournalChatbot
                    journalContent={currentAnalysis.content}
                    className="border border-amber-200 rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Stats and Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-amber-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-amber-700 font-handwriting">
                  Journal Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 font-handwriting">
                  <li className="flex justify-between">
                    <span>Entries this week:</span>
                    <span className="font-medium">
                      {status?.stats?.entriesThisWeek || 0}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Total entries:</span>
                    <span className="font-medium">
                      {status?.stats?.totalEntries || 0}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Average mood:</span>
                    <span className="font-medium">
                      {status?.stats?.averageMood || "-"}/10
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Streak:</span>
                    <span className="font-medium">
                      {status?.stats?.currentStreak || 0} days
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-amber-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-amber-700 font-handwriting">
                  Today's Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 font-handwriting">
                  Try writing about both the challenges and positive moments
                  from your day. Balanced reflection helps build emotional
                  resilience and encourages gratitude.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Pro Plan Promotion */}
      {!loading && !status.isSubscribed && (
        <motion.div
          className="mt-8 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-6 border border-amber-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-amber-800 font-handwriting">
                Upgrade to MindScribe Pro
              </h2>
              <p className="text-amber-700 mt-1 font-handwriting">
                Get unlimited entries, advanced analytics, and personalized
                insights.
              </p>
            </div>
            <Button
              onClick={() => setShowSubscriptionModal(true)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 px-6 font-handwriting"
            >
              Upgrade Now
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
