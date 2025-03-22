"use client";

import React, { useState, useRef, useEffect } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { Button } from "../../../../components/ui/button";
import { Slider } from "../../../../components/ui/slider";

import { RefreshCw } from "lucide-react";

export function FidgetTools() {
    return (
        <Tabs defaultValue="bubbles" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bubbles">Bubble Wrap</TabsTrigger>
                <TabsTrigger value="zen">Zen Garden</TabsTrigger>
                <TabsTrigger value="mandala">Mandala Creator</TabsTrigger>
            </TabsList>
            <TabsContent value="bubbles" className="mt-6">
                <BubbleWrap />
            </TabsContent>
            <TabsContent value="zen" className="mt-6">
                <ZenGarden />
            </TabsContent>
            <TabsContent value="mandala" className="mt-6">
                <MandalaCreator />
            </TabsContent>
        </Tabs>
    );
}

function BubbleWrap() {
    const [bubbles, setBubbles] = useState(Array(100).fill(false));
    const [poppedCount, setPoppedCount] = useState(0);

    const popBubble = (index) => {
        if (!bubbles[index]) {
            const newBubbles = [...bubbles];
            newBubbles[index] = true;
            setBubbles(newBubbles);
            setPoppedCount((prev) => prev + 1);

            // Play pop sound
            const audio = new Audio("/pop.mp3");
            audio.volume = 0.3;
            audio.play().catch((e) => console.log("Audio play failed:", e));
        }
    };

    const resetBubbles = () => {
        setBubbles(Array(100).fill(false));
        setPoppedCount(0);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Virtual Bubble Wrap</CardTitle>
                        <CardDescription>Pop the bubbles to relieve stress</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-sm">
                            <span className="font-medium">{poppedCount}</span> popped
                        </div>
                        <Button variant="outline" size="sm" onClick={resetBubbles}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reset
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-10 gap-2">
                    {bubbles.map((popped, index) => (
                        <button
                            key={index}
                            className={`aspect-square rounded-full transition-all ${
                                popped ? "bg-primary/20 scale-90" : "bg-primary/40 hover:bg-primary/50 active:scale-90"
                            }`}
                            onClick={() => popBubble(index)}
                            disabled={popped}
                            aria-label={popped ? "Popped bubble" : "Bubble to pop"}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function ZenGarden() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [toolSize, setToolSize] = useState(10);
  const [pattern, setPattern] = useState("rake");
  const [lastPos, setLastPos] = useState(null);

  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Initialize the canvas
      initializeCanvas();
  }, []);

  const initializeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Fill with sand color
      ctx.fillStyle = "#f0e6d2";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add some texture
      for (let i = 0; i < 5000; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.fillStyle = Math.random() > 0.5 ? "#e8dfc9" : "#f5eee0";
          ctx.fillRect(x, y, 1, 1);
      }

      // Add some stones
      for (let i = 0; i < 5; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const radius = 10 + Math.random() * 20;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = "#666";
          ctx.fill();
      }
  };

  const startDrawing = (e) => {
      setIsDrawing(true);
      
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      let x, y;

      if (e.touches) {
          x = e.touches[0].clientX - rect.left;
          y = e.touches[0].clientY - rect.top;
      } else {
          x = e.clientX - rect.left;
          y = e.clientY - rect.top;
      }
      
      setLastPos({ x, y });
      draw(e); // Draw a dot immediately when clicking
  };

  const stopDrawing = () => {
      setIsDrawing(false);
      setLastPos(null);
  };

  const draw = (e) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      let x, y;

      if (e.touches) {
          x = e.touches[0].clientX - rect.left;
          y = e.touches[0].clientY - rect.top;
      } else {
          x = e.clientX - rect.left;
          y = e.clientY - rect.top;
      }

      // For smoother lines
      const prevPos = lastPos || { x, y };
      
      if (pattern === "rake") {
          // Draw rake pattern
          for (let i = -2; i <= 2; i++) {
              ctx.beginPath();
              ctx.moveTo(prevPos.x + i * 5, prevPos.y);
              ctx.lineTo(x + i * 5, y);
              ctx.strokeStyle = "#e8dfc9";
              ctx.lineWidth = 2;
              ctx.stroke();
          }
      } else if (pattern === "circle") {
          // Draw circular pattern
          ctx.beginPath();
          ctx.arc(x, y, toolSize, 0, Math.PI * 2);
          ctx.strokeStyle = "#e8dfc9";
          ctx.lineWidth = 2;
          ctx.stroke();
      } else if (pattern === "smooth") {
          // Draw smooth pattern
          ctx.beginPath();
          ctx.arc(x, y, toolSize / 2, 0, Math.PI * 2);
          ctx.fillStyle = "#f0e6d2";
          ctx.fill();
      }
      
      setLastPos({ x, y });
  };

  const resetCanvas = () => {
      initializeCanvas();
  };

  return (
      <Card className="w-full">
          <CardHeader>
              <div className="flex justify-between items-center">
                  <div>
                      <CardTitle>Zen Sand Garden</CardTitle>
                      <CardDescription>Create patterns in the sand to calm your mind</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={resetCanvas}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                  </Button>
              </div>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4 mb-4">
                  <div className="space-y-2">
                      <p className="text-sm font-medium">Pattern</p>
                      <div className="flex gap-2">
                          <Button variant={pattern === "rake" ? "default" : "outline"} size="sm" onClick={() => setPattern("rake")}>
                              Rake
                          </Button>
                          <Button
                              variant={pattern === "circle" ? "default" : "outline"}
                              size="sm"
                              onClick={() => setPattern("circle")}
                          >
                              Circle
                          </Button>
                          <Button
                              variant={pattern === "smooth" ? "default" : "outline"}
                              size="sm"
                              onClick={() => setPattern("smooth")}
                          >
                              Smooth
                          </Button>
                      </div>
                  </div>

                  <div className="space-y-2">
                      <p className="text-sm font-medium">Tool Size: {toolSize}</p>
                      <Slider
                          value={[toolSize]}
                          min={5}
                          max={30}
                          step={1}
                          className="w-40"
                          onValueChange={(value) => setToolSize(value[0])}
                      />
                  </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                  <canvas
                      ref={canvasRef}
                      className="w-full h-64 touch-none cursor-pointer"
                      onMouseDown={startDrawing}
                      onMouseUp={stopDrawing}
                      onMouseOut={stopDrawing}
                      onMouseMove={draw}
                      onTouchStart={startDrawing}
                      onTouchEnd={stopDrawing}
                      onTouchMove={draw}
                  />
              </div>
          </CardContent>
      </Card>
  );
}

function MandalaCreator() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPoint, setLastPoint] = useState(null);
    const [symmetry, setSymmetry] = useState(8);
    const [brushSize, setBrushSize] = useState(3);
    const [color, setColor] = useState("#6366f1");

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Fill with white
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw center guide
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ddd";
        ctx.fill();

        // Draw symmetry guides
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        ctx.strokeStyle = "#eee";
        ctx.lineWidth = 1;

        for (let i = 0; i < symmetry; i++) {
            const angle = (i * 2 * Math.PI) / symmetry;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
            ctx.stroke();
        }
    }, [symmetry]);

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        let x, y;

        if ('touches' in e) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Calculate relative coordinates from center
        const relX = x - centerX;
        const relY = y - centerY;

        // Draw at all symmetry points
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;

        for (let i = 0; i < symmetry; i++) {
            const angle = (i * 2 * Math.PI) / symmetry;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);

            // Apply rotation matrix
            const rotX = relX * cos - relY * sin + centerX;
            const rotY = relX * sin + relY * cos + centerY;

            if (lastPoint) {
                const lastRotX = lastPoint.x * cos - lastPoint.y * sin + centerX;
                const lastRotY = lastPoint.x * sin + lastPoint.y * cos + centerY;

                ctx.beginPath();
                ctx.moveTo(lastRotX, lastRotY);
                ctx.lineTo(rotX, rotY);
                ctx.stroke();
            }
        }

        // Update last point
        setLastPoint({ x: relX, y: relY });
    };

    const resetCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Reset canvas
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw center guide
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ddd";
        ctx.fill();

        // Draw symmetry guides
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        ctx.strokeStyle = "#eee";
        ctx.lineWidth = 1;

        for (let i = 0; i < symmetry; i++) {
            const angle = (i * 2 * Math.PI) / symmetry;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
            ctx.stroke();
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Mandala Creator</CardTitle>
                        <CardDescription>Create beautiful symmetric patterns</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={resetCanvas}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-6 mb-4">
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Symmetry: {symmetry}</p>
                        <Slider
                            value={[symmetry]}
                            min={2}
                            max={16}
                            step={1}
                            className="w-40"
                            onValueChange={(value) => setSymmetry(value[0])}
                        />
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-medium">Brush Size: {brushSize}</p>
                        <Slider
                            value={[brushSize]}
                            min={1}
                            max={10}
                            step={1}
                            className="w-40"
                            onValueChange={(value) => setBrushSize(value[0])}
                        />
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-medium">Color</p>
                        <div className="flex gap-2">
                            {["#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#000000"].map((c) => (
                                <button
                                    key={c}
                                    className={`w-8 h-8 rounded-full ${color === c ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                                    style={{ backgroundColor: c }}
                                    onClick={() => setColor(c)}
                                    aria-label={`Select color ${c}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border rounded-md overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-[400px] touch-none cursor-crosshair"
                        onMouseDown={(e) => {
                            setIsDrawing(true);
                            setLastPoint(null);
                            draw(e);
                        }}
                        onMouseUp={() => {
                            setIsDrawing(false);
                            setLastPoint(null);
                        }}
                        onMouseOut={() => {
                            setIsDrawing(false);
                            setLastPoint(null);
                        }}
                        onMouseMove={draw}
                        onTouchStart={(e) => {
                            setIsDrawing(true);
                            setLastPoint(null);
                            draw(e);
                        }}
                        onTouchEnd={() => {
                            setIsDrawing(false);
                            setLastPoint(null);
                        }}
                        onTouchMove={draw}
                    />
                </div>
            </CardContent>
        </Card>
    );
}