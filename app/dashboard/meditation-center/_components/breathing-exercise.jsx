"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Slider } from "../../../../components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { Play, Pause, RefreshCw } from "lucide-react";

const BREATHING_PATTERNS = [
  { name: "Box Breathing", inhale: 4, hold1: 4, exhale: 4, hold2: 4, description: "Equal parts inhale, hold, exhale, and hold. Great for stress reduction and focus." },
  { name: "4-7-8 Breathing", inhale: 4, hold1: 7, exhale: 8, hold2: 0, description: "Inhale for 4, hold for 7, exhale for 8. Helps with anxiety and sleep." },
  { name: "Relaxing Breath", inhale: 5, hold1: 2, exhale: 7, hold2: 0, description: "Longer exhale than inhale promotes relaxation and calm." },
  { name: "Energizing Breath", inhale: 6, hold1: 0, exhale: 4, hold2: 0, description: "Longer inhale than exhale helps increase energy and alertness." },
];

export default function BreathingExercise() {
  const [selectedPattern, setSelectedPattern] = useState(BREATHING_PATTERNS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState("inhale");
  const [progress, setProgress] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [speed, setSpeed] = useState(1);

  const animationRef = useRef(null);
  const lastTimeRef = useRef(null);

  const getPhaseText = () => ({ inhale: "Breathe In", hold1: "Hold", exhale: "Breathe Out", hold2: "Hold" }[phase]);

  const handlePatternChange = (value) => {
    const newPattern = BREATHING_PATTERNS.find((p) => p.name === value);
    if (newPattern) {
      setSelectedPattern(newPattern);
      setPhase("inhale");
      setProgress(0);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setPhase("inhale");
    setProgress(0);
    setCycles(0);
    
    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const getCircleSize = () => {
    if (phase === "inhale") return 50 + (progress / 100) * 50;
    if (phase === "exhale") return 100 - (progress / 100) * 50;
    return phase === "hold1" ? 100 : 50;
  };

  // This function determines the current phase duration in milliseconds
  const getCurrentPhaseDuration = () => {
    const phaseSeconds = selectedPattern[phase];
    return phaseSeconds * 1000 / speed;
  };

  // Animation loop
  const animate = (timestamp) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }

    const elapsed = timestamp - lastTimeRef.current;
    const phaseDuration = getCurrentPhaseDuration();

    if (phaseDuration > 0) {
      // Update progress based on elapsed time
      const newProgress = progress + (elapsed / phaseDuration) * 100;
      
      if (newProgress >= 100) {
        // Move to next phase when current phase completes
        let nextPhase;
        let newCycles = cycles;
        
        if (phase === "inhale") {
          nextPhase = selectedPattern.hold1 > 0 ? "hold1" : "exhale";
        } else if (phase === "hold1") {
          nextPhase = "exhale";
        } else if (phase === "exhale") {
          nextPhase = selectedPattern.hold2 > 0 ? "hold2" : "inhale";
          if (nextPhase === "inhale") {
            newCycles = cycles + 1;
          }
        } else if (phase === "hold2") {
          nextPhase = "inhale";
          newCycles = cycles + 1;
        }
        
        setPhase(nextPhase);
        setProgress(0);
        setCycles(newCycles);
      } else {
        setProgress(newProgress);
      }
    } else {
      // Skip phases with 0 duration
      let nextPhase;
      
      if (phase === "inhale") {
        nextPhase = "exhale";
      } else if (phase === "hold1") {
        nextPhase = "exhale";
      } else if (phase === "exhale") {
        nextPhase = "inhale";
        setCycles(cycles + 1);
      } else if (phase === "hold2") {
        nextPhase = "inhale";
        setCycles(cycles + 1);
      }
      
      setPhase(nextPhase);
    }

    lastTimeRef.current = timestamp;
    animationRef.current = requestAnimationFrame(animate);
  };

  // Start/stop animation when isPlaying changes
  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = null;
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, phase, progress, selectedPattern, speed]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Breathing Exercise</CardTitle>
        <CardDescription>Follow the animation to regulate your breathing and reduce stress.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-8">
        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8 justify-between">
          <div className="w-full md:w-1/3">
            <p className="text-sm font-medium mb-2">Breathing Pattern</p>
            <Select value={selectedPattern.name} onValueChange={handlePatternChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a pattern" />
              </SelectTrigger>
              <SelectContent>
                {BREATHING_PATTERNS.map((pattern) => (
                  <SelectItem key={pattern.name} value={pattern.name}>
                    {pattern.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-2">{selectedPattern.description}</p>
          </div>
          <div className="w-full md:w-1/3">
            <p className="text-sm font-medium mb-2">Animation Speed</p>
            <Slider
              value={[speed]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={(value) => setSpeed(value[0])}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs">Slower</span>
              <span className="text-xs font-medium">{speed.toFixed(1)}x</span>
              <span className="text-xs">Faster</span>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col">
            <p className="text-sm font-medium mb-2">Completed Cycles</p>
            <p className="text-3xl font-bold">{cycles}</p>
          </div>
        </div>
        <div className="relative flex items-center justify-center h-64 w-64">
          <div
            className="absolute rounded-full bg-primary/20 transition-all duration-300 ease-in-out"
            style={{ width: `${getCircleSize()}%`, height: `${getCircleSize()}%` }}
          />
          <div className="z-10 text-xl font-medium">{getPhaseText()}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button variant="outline" size="icon" onClick={handleReset}>
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button onClick={() => setIsPlaying(!isPlaying)} size="lg">
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isPlaying ? "Pause" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  );
}