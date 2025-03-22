"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Slider } from "../../../../components/ui/slider";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Switch } from "../../../../components/ui/switch";
import { Play, Pause, Bell, RefreshCw } from "lucide-react";
import { Progress } from "../../../../components/ui/progress";

export function MindfulnessTimer() {
  const [duration, setDuration] = useState(5); // minutes
  const [remainingTime, setRemainingTime] = useState(duration * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [intervalBells, setIntervalBells] = useState(false);
  const [intervalTime, setIntervalTime] = useState(1); // minutes
  const [ambientSound, setAmbientSound] = useState(false);
  const [customMessage, setCustomMessage] = useState("Take a moment to breathe and be present");

  const timerRef = useRef(null);
  const bellAudioRef = useRef(null);
  const ambientAudioRef = useRef(null);

  useEffect(() => {
    bellAudioRef.current = new Audio("/bell.mp3");
    ambientAudioRef.current = new Audio("/ambient.mp3");

    if (ambientAudioRef.current) {
      ambientAudioRef.current.loop = true;
      ambientAudioRef.current.volume = 0.3;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (ambientAudioRef.current) ambientAudioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    if (!isRunning) {
      setRemainingTime(duration * 60);
    }
  }, [duration, isRunning]);

  useEffect(() => {
    if (isRunning) {
      if (bellAudioRef.current) {
        bellAudioRef.current.play().catch((e) => console.log("Audio play failed:", e));
      }

      if (ambientSound && ambientAudioRef.current) {
        ambientAudioRef.current.play().catch((e) => console.log("Audio play failed:", e));
      }

      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);

            if (bellAudioRef.current) {
              bellAudioRef.current.play().catch((e) => console.log("Audio play failed:", e));
            }

            if (ambientSound && ambientAudioRef.current) {
              ambientAudioRef.current.pause();
              ambientAudioRef.current.currentTime = 0;
            }

            return 0;
          }

          if (intervalBells && prev % (intervalTime * 60) === 0 && prev !== duration * 60) {
            if (bellAudioRef.current) {
              bellAudioRef.current.play().catch((e) => console.log("Audio play failed:", e));
            }
          }

          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (ambientAudioRef.current) ambientAudioRef.current.pause();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, intervalBells, intervalTime, duration, ambientSound]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setRemainingTime(duration * 60);

    if (ambientAudioRef.current) {
      ambientAudioRef.current.pause();
      ambientAudioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((duration * 60 - remainingTime) / (duration * 60)) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mindfulness Timer</CardTitle>
        <CardDescription>Set a timer for your meditation practice</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-6xl font-bold tabular-nums">{formatTime(remainingTime)}</div>
          <Progress value={progress} className="w-full h-2" />
          <p className="text-center text-muted-foreground">
            {isRunning ? customMessage : "Ready to begin your practice"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Duration: {duration} minutes</Label>
              <Slider
                value={[duration]}
                min={1}
                max={60}
                step={1}
                onValueChange={(value) => setDuration(value[0])}
                disabled={isRunning}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="interval-bells"
                checked={intervalBells}
                onCheckedChange={setIntervalBells}
                disabled={isRunning}
              />
              <Label htmlFor="interval-bells">Interval Bells</Label>
            </div>

            {intervalBells && (
              <div className="space-y-2 pl-6">
                <Label>Every {intervalTime} minutes</Label>
                <Slider
                  value={[intervalTime]}
                  min={1}
                  max={Math.max(5, Math.floor(duration / 2))}
                  step={1}
                  onValueChange={(value) => setIntervalTime(value[0])}
                  disabled={isRunning}
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="ambient-sound"
                checked={ambientSound}
                onCheckedChange={setAmbientSound}
                disabled={isRunning}
              />
              <Label htmlFor="ambient-sound">Ambient Sound</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-message">Custom Message</Label>
              <Input
                id="custom-message"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Enter a message to display during meditation"
                disabled={isRunning}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button variant="outline" size="icon" onClick={resetTimer} disabled={!isRunning && remainingTime === duration * 60}>
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button onClick={toggleTimer} size="lg">
          {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isRunning ? "Pause" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  );
}
