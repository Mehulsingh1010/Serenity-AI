import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import BreathingExercise from "./_components/breathing-exercise"
import { GuidedMeditation } from "./_components/guided-meditation"
import { FidgetTools } from "./_components/fidget-tools"
import { MindfulnessTimer } from "./_components/mindfulness-timer"
import { SoundScape } from "./_components/sound-scape"

export default function MeditationPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Meditation Center</h1>
        <p className="text-muted-foreground">
          Find peace and calm with our collection of mindfulness tools and exercises.
        </p>
      </div>

      <Tabs defaultValue="breathing" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="breathing">Breathing</TabsTrigger>
          <TabsTrigger value="guided">Guided</TabsTrigger>
          <TabsTrigger value="fidget">Fidget Tools</TabsTrigger>
          <TabsTrigger value="timer">Timer</TabsTrigger>
          <TabsTrigger value="sounds">Sounds</TabsTrigger>
        </TabsList>
        <TabsContent value="breathing" className="mt-6">
          <BreathingExercise />
        </TabsContent>
        <TabsContent value="guided" className="mt-6">
          <GuidedMeditation />
        </TabsContent>
        <TabsContent value="fidget" className="mt-6">
          <FidgetTools />
        </TabsContent>
        <TabsContent value="timer" className="mt-6">
          <MindfulnessTimer />
        </TabsContent>
        <TabsContent value="sounds" className="mt-6">
          <SoundScape />
        </TabsContent>
      </Tabs>

      <h3 className="bg-yellow-100 p-2 rounded" >This page is in testing mode currently, some features may not work as expected.</h3>
    </div>
  )
}

