"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import BreathingExercise from "./_components/breathing-exercise"
import { GuidedMeditation } from "./_components/guided-meditation"
import { FidgetTools } from "./_components/fidget-tools"
import { MindfulnessTimer } from "./_components/mindfulness-timer"
import { SoundScape } from "./_components/sound-scape"
import { Wind, Headphones, Sparkles, Timer, Music } from "lucide-react"
import { Card, CardContent } from "../../../components/ui/card"





export default function MeditationPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <motion.h1
          className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Meditation Center
        </motion.h1>
        <p className="text-muted-foreground">
          Find peace and calm with our collection of mindfulness tools and exercises.
        </p>
      </div>

      <Tabs defaultValue="breathing" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="breathing" className="flex items-center gap-2">
            <Wind className="h-4 w-4" />
            <span className="hidden sm:inline">Breathing</span>
          </TabsTrigger>
          <TabsTrigger value="guided" className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            <span className="hidden sm:inline">Guided</span>
          </TabsTrigger>
          <TabsTrigger value="fidget" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Fidget Tools</span>
          </TabsTrigger>
          <TabsTrigger value="timer" className="flex items-center gap-2">
            <Timer className="h-4 w-4" />
            <span className="hidden sm:inline">Timer</span>
          </TabsTrigger>
          <TabsTrigger value="sounds" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            <span className="hidden sm:inline">Sounds</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="breathing" className="mt-6">
          <Card className="border-purple-100 shadow-md overflow-hidden">
            <CardContent className="p-0">
              <BreathingExercise />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guided" className="mt-6">
          <Card className="border-purple-100 shadow-md overflow-hidden">
            <CardContent className="p-0">
              <GuidedMeditation />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fidget" className="mt-6">
          <Card className="border-purple-100 shadow-md overflow-hidden">
            <CardContent className="p-0">
              <FidgetTools />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timer" className="mt-6">
          <Card className="border-purple-100 shadow-md overflow-hidden">
            <CardContent className="p-0">
              <MindfulnessTimer />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sounds" className="mt-6">
          <Card className="border-purple-100 shadow-md overflow-hidden">
            <CardContent className="p-0">
              <SoundScape />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-purple-100 p-3 rounded-md text-purple-800 text-sm">
        This page is in testing mode currently, some features may not work as expected.
      </div>
    </div>
  )
}
