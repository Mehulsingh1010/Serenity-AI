"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { Slider } from "../../../../components/ui/slider"
import { Input } from "../../../../components/ui/input"
import { Play, Pause, SkipForward, Volume2, MoonStar, Sun, Wind, Moon, Heart } from "lucide-react"
import { Badge } from "../../../../components/ui/badge"
import { Progress } from "../../../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { useToast} from "../../../../hooks/use-toast"

// Define meditation category icons
const categoryIcons = {
  "Relaxation": <Wind className="h-4 w-4" />,
  "Compassion": <Heart className="h-4 w-4" />,
  "Mindfulness": <MoonStar className="h-4 w-4" />,
  "Sleep": <Moon className="h-4 w-4" />,
  "Energy": <Sun className="h-4 w-4" />
};

// Enhanced meditation templates with better descriptions and more variety
const MEDITATIONS = [
  {
    id: "body-scan",
    title: "Body Scan Relaxation",
    duration: 10,
    category: "Relaxation",
    description: "Melt away tension as you're guided through a systematic release of stress throughout your entire body.",
    imageUrl: "/api/placeholder/400/200",
    backgroundColor: "bg-blue-50",
    accent: "border-blue-300"
  },
  {
    id: "loving-kindness",
    title: "Loving Kindness",
    duration: 15,
    category: "Compassion",
    description: "Cultivate deep compassion for yourself and others through this heart-centered meditation practice.",
    imageUrl: "/api/placeholder/400/200",
    backgroundColor: "bg-rose-50",
    accent: "border-rose-300"
  },
  {
    id: "mindful-breathing",
    title: "Mindful Breathing",
    duration: 5,
    category: "Mindfulness",
    description: "Return to the present moment with this short but powerful breath-focused meditation.",
    imageUrl: "/api/placeholder/400/200",
    backgroundColor: "bg-emerald-50",
    accent: "border-emerald-300"
  },
  {
    id: "stress-relief",
    title: "Stress Relief",
    duration: 8,
    category: "Relaxation",
    description: "Release anxiety and find your center with this calming practice designed for busy minds.",
    imageUrl: "/api/placeholder/400/200",
    backgroundColor: "bg-purple-50",
    accent: "border-purple-300"
  },
  {
    id: "sleep-deep",
    title: "Deep Sleep Journey",
    duration: 20,
    category: "Sleep",
    description: "Drift into restful sleep with this gentle meditation designed to quiet the mind and relax the body.",
    imageUrl: "/api/placeholder/400/200",
    backgroundColor: "bg-indigo-50",
    accent: "border-indigo-300"
  },
  {
    id: "morning-energy",
    title: "Morning Energy Boost",
    duration: 7,
    category: "Energy",
    description: "Start your day with clarity and positive energy through this revitalizing meditation.",
    imageUrl: "/api/placeholder/400/200",
    backgroundColor: "bg-amber-50",
    accent: "border-amber-300"
  },
];

export function GuidedMeditation() {
  const [apiKey, setApiKey] = useState("");
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isGenerating, setIsGenerating] = useState(false);
  const [meditationScript, setMeditationScript] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("library");
  const progressIntervalRef = useRef(null);
  const { toast } = useToast();

  // Extract unique categories for filter tabs
  const categories = ["all", ...new Set(MEDITATIONS.map(m => m.category))];

  // Filter meditations by active category
  const filteredMeditations = activeCategory === "all" 
    ? MEDITATIONS 
    : MEDITATIONS.filter(m => m.category === activeCategory);

  useEffect(() => {
    // Clean up interval when component unmounts
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Reset progress when meditation changes
  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  }, [selectedMeditation]);

  const handleSelectMeditation = async (meditation) => {
    setSelectedMeditation(meditation);
    setProgress(0);
    setIsPlaying(false);
    setActiveTab("player");
    setMeditationScript(""); // Reset script for new meditation

    if (!isApiKeySet) {
      setMeditationScript("Please set your Gemini API key in the settings tab to generate personalized meditation scripts.");
      return;
    }

    try {
      setIsGenerating(true);

      // Generate meditation script using Gemini API
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Create a ${meditation.duration} minute guided meditation script for "${meditation.title}" in the category of "${meditation.category}". 
              The meditation should be calming, use present tense, and guide the listener through a relaxing experience related to the theme.
              Include pauses indicated by [pause] where appropriate.
              Keep the language accessible and soothing.
              Start with a brief introduction, then body of the practice, and end with a gentle conclusion.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch meditation script: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      setMeditationScript(generatedText);
      
      toast({
        title: "Meditation Script Generated",
        description: "Your personalized meditation is ready to begin.",
      });
    } catch (error) {
      console.error("Error generating meditation script:", error);
      setMeditationScript("We encountered an issue generating your meditation script. Please check your API key and try again.");
      
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was a problem connecting to the Gemini API.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayPause = () => {
    if (isGenerating) return;
    
    setIsPlaying(!isPlaying);

    // In a real implementation, this would control audio playback
    if (!isPlaying) {
      // Start a timer to update progress for demo purposes
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressIntervalRef.current);
            setIsPlaying(false);
            return 100;
          }
          return prev + 100 / (selectedMeditation?.duration || 10) / 60;
        });
      }, 1000);
    } else {
      // Pause the timer
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }
  };

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(false);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const saveApiKey = () => {
    if (apiKey.trim()) {
      setIsApiKeySet(true);
      toast({
        title: "API Key Saved",
        description: "Your Gemini API key has been saved for this session.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid API Key",
        description: "Please enter a valid Gemini API key.",
      });
    }
  };

  const formatTime = (minutes) => {
    return `${Math.floor(minutes)}:${String(Math.floor((minutes % 1) * 60)).padStart(2, "0")}`;
  };

  const currentTime = selectedMeditation ? formatTime((progress / 100) * selectedMeditation.duration) : "0:00";
  const totalTime = selectedMeditation ? formatTime(selectedMeditation.duration) : "0:00";

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Mindful Moments</h2>
          <TabsList>
            <TabsTrigger value="library">Library</TabsTrigger>
            {selectedMeditation && <TabsTrigger value="player">Now Playing</TabsTrigger>}
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="library" className="space-y-6">
          <div className="flex overflow-x-auto pb-2 space-x-2">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={activeCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setActiveCategory(category)}
              >
                {category !== "all" && categoryIcons[category]}
                <span className="ml-1 capitalize">{category}</span>
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMeditations.map((meditation) => (
              <Card
                key={meditation.id}
                className={`overflow-hidden cursor-pointer hover:shadow-lg transition-all border-l-4 ${meditation.accent}`}
                onClick={() => handleSelectMeditation(meditation)}
              >
                <div className={`${meditation.backgroundColor} h-40 relative flex items-center justify-center`}>
                  <span className="absolute top-2 right-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {categoryIcons[meditation.category]}
                      {meditation.category}
                    </Badge>
                  </span>
                  <div className="text-4xl opacity-20">{categoryIcons[meditation.category]}</div>
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{meditation.title}</CardTitle>
                    <Badge variant="outline">{meditation.duration} min</Badge>
                  </div>
                  <CardDescription className="mt-2">{meditation.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="player">
          {selectedMeditation && (
            <Card className={`border-l-4 ${selectedMeditation.accent}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {categoryIcons[selectedMeditation.category]}
                      {selectedMeditation.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{selectedMeditation.category}</Badge>
                      <span>{selectedMeditation.duration} minutes</span>
                    </CardDescription>
                  </div>
                  <Button variant="ghost" onClick={() => setActiveTab("library")}>
                    Back to Library
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className={`relative h-[200px] w-full rounded-md overflow-hidden ${selectedMeditation.backgroundColor} flex items-center justify-center`}>
                  <div className="text-8xl opacity-10">{categoryIcons[selectedMeditation.category]}</div>
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      className="rounded-full w-16 h-16 shadow-lg" 
                      onClick={handlePlayPause} 
                      disabled={isGenerating}
                    >
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{currentTime}</span>
                    <span>{totalTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-muted-foreground" />
                  <Slider
                    value={[volume]}
                    min={0}
                    max={100}
                    step={1}
                    className="w-28"
                    onValueChange={(value) => setVolume(value[0])}
                  />
                  <span className="text-xs text-muted-foreground">{volume}%</span>
                </div>

                <div className={`${selectedMeditation.backgroundColor} p-4 rounded-md max-h-72 overflow-y-auto shadow-inner`}>
                  {isGenerating ? (
                    <div className="flex items-center justify-center h-40">
                      <div className="text-center space-y-4">
                        <div className="flex justify-center">
                          <div className="animate-pulse flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                          </div>
                        </div>
                        <p>Creating your personalized meditation experience...</p>
                        <p className="text-sm text-muted-foreground">Connecting to Gemini AI</p>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      <h3 className="flex items-center gap-2">
                        <MoonStar className="h-4 w-4" />
                        Meditation Script
                        {isApiKeySet ? <Badge variant="outline" className="ml-2">AI Generated</Badge> : null}
                      </h3>
                      <div className="bg-white/50 p-3 rounded shadow-sm">
                        <p className="whitespace-pre-line">{meditationScript || selectedMeditation.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReset}
                  disabled={isGenerating || progress === 0}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={handlePlayPause} 
                  size="lg" 
                  disabled={isGenerating}
                  className={`${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-primary'} transition-colors`}
                >
                  {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  {isPlaying ? "Pause" : "Start Meditation"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Configure your Gemini API key to generate personalized meditation scripts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="api-key" className="text-sm font-medium">
                  Gemini API Key
                </label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your Gemini API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <Button onClick={saveApiKey}>Save Key</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your API key is stored locally in your browser session and is never sent to our servers.
                  Get your API key from{" "}
                  <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="underline">
                    Google AI Studio
                  </a>
                </p>
              </div>
              
              {isApiKeySet && (
                <div className="bg-green-50 p-3 rounded border border-green-200 text-green-800">
                  <p className="text-sm flex items-center gap-2">
                    <span className="bg-green-500 rounded-full w-2 h-2"></span>
                    API key is set and ready to use
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your meditation experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="default-duration" className="text-sm font-medium">
                  Default Audio Volume
                </label>
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    id="default-volume"
                    value={[volume]}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                    onValueChange={(value) => setVolume(value[0])}
                  />
                  <span className="text-xs text-muted-foreground w-8">{volume}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}