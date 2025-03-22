"use client";

import { useState, useRef, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../../components/ui/card";
import { Slider } from "../../../../components/ui/slider";
import { Button } from "../../../../components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../../../components/ui/tabs";
import { Volume2, VolumeX, Play, Pause, RefreshCw } from "lucide-react";

const NATURE_SOUNDS = [
    { id: "rain", name: "Rainfall", icon: "🌧️", audioUrl: "/rain.mp3" },
    { id: "forest", name: "Forest", icon: "🌲", audioUrl: "/forest.mp3" },
    { id: "waves", name: "Ocean Waves", icon: "🌊", audioUrl: "/waves.mp3" },
    { id: "fire", name: "Campfire", icon: "🔥", audioUrl: "/fire.mp3" },
    { id: "birds", name: "Birds", icon: "🐦", audioUrl: "/birds.mp3" },
    { id: "thunder", name: "Thunder", icon: "⚡", audioUrl: "/thunder.mp3" },
];

const AMBIENT_SOUNDS = [
    { id: "whitenoise", name: "White Noise", icon: "📻", audioUrl: "/whitenoise.mp3" },
    { id: "cafe", name: "Café", icon: "☕", audioUrl: "/cafe.mp3" },
    { id: "meditation", name: "Meditation", icon: "🧘", audioUrl: "/meditation.mp3" },
    { id: "wind", name: "Wind Chimes", icon: "🎐", audioUrl: "/windchimes.mp3" },
];

export function SoundScape() {
    const [activeSounds, setActiveSounds] = useState({});
    const [masterVolume, setMasterVolume] = useState(80);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRefs = useRef({});

    useEffect(() => {
        [...NATURE_SOUNDS, ...AMBIENT_SOUNDS].forEach((sound) => {
            if (!audioRefs.current[sound.id]) {
                audioRefs.current[sound.id] = new Audio(sound.audioUrl);
            }
        });
    }, []);

    useEffect(() => {
        if (isPlaying) {
            Object.entries(activeSounds).forEach(([id, volume]) => {
                const audio = audioRefs.current[id];
                if (audio) {
                    audio.volume = (volume / 100) * (masterVolume / 100);
                    audio.play().catch((e) => console.log("Audio play failed:", e));
                }
            });
        } else {
            Object.values(audioRefs.current).forEach((audio) => {
                audio.pause();
            });
        }
    }, [isPlaying, activeSounds, masterVolume]);

    useEffect(() => {
        Object.entries(activeSounds).forEach(([id, volume]) => {
            const audio = audioRefs.current[id];
            if (audio) {
                audio.volume = (volume / 100) * (masterVolume / 100);
            }
        });
    }, [masterVolume, activeSounds]);

    const toggleSound = (sound) => {
        setActiveSounds((prev) => {
            const newSounds = { ...prev };

            if (newSounds[sound.id]) {
                delete newSounds[sound.id];
                const audio = audioRefs.current[sound.id];
                if (audio) {
                    audio.pause();
                }
            } else {
                newSounds[sound.id] = 70;
                if (isPlaying) {
                    const audio = audioRefs.current[sound.id];
                    if (audio) {
                        audio.volume = (70 / 100) * (masterVolume / 100);
                        audio.play().catch((e) => console.log("Audio play failed:", e));
                    }
                }
            }

            return newSounds;
        });
    };

    const updateSoundVolume = (id, volume) => {
        setActiveSounds((prev) => {
            const newSounds = { ...prev, [id]: volume };
            const audio = audioRefs.current[id];
            if (audio) {
                audio.volume = (volume / 100) * (masterVolume / 100);
            }
            return newSounds;
        });
    };

    const resetMixer = () => {
        setIsPlaying(false);
        setActiveSounds({});
        Object.values(audioRefs.current).forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
    };

    const renderSoundButton = (sound) => {
        const isActive = sound.id in activeSounds;

        return (
            <div key={sound.id} className="flex flex-col items-center">
                <button
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                        isActive ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                    }`}
                    onClick={() => toggleSound(sound)}
                    aria-label={`Toggle ${sound.name} sound`}
                >
                    {sound.icon}
                </button>
                <span className="mt-2 text-sm">{sound.name}</span>

                {isActive && (
                    <Slider
                        value={[activeSounds[sound.id]]}
                        min={0}
                        max={100}
                        step={1}
                        className="w-16 mt-2"
                        onValueChange={(value) => updateSoundVolume(sound.id, value[0])}
                    />
                )}
            </div>
        );
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Sound Mixer</CardTitle>
                        <CardDescription>Create your perfect ambient soundscape</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={resetMixer} disabled={Object.keys(activeSounds).length === 0}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reset
                        </Button>
                        <Button
                            onClick={() => setIsPlaying(!isPlaying)}
                            size="sm"
                            disabled={Object.keys(activeSounds).length === 0}
                        >
                            {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                            {isPlaying ? "Pause" : "Play"}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        {isPlaying ? (
                            <Volume2 className="h-5 w-5 text-primary" />
                        ) : (
                            <VolumeX className="h-5 w-5 text-muted-foreground" />
                        )}
                    </div>
                    <div className="flex-1">
                        <Slider
                            value={[masterVolume]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(value) => setMasterVolume(value[0])}
                        />
                    </div>
                    <div className="w-12 text-center font-medium">{masterVolume}%</div>
                </div>

                <Tabs defaultValue="nature" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="nature">Nature</TabsTrigger>
                        <TabsTrigger value="ambient">Ambient</TabsTrigger>
                    </TabsList>
                    <TabsContent value="nature" className="mt-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                            {NATURE_SOUNDS.map(renderSoundButton)}
                        </div>
                    </TabsContent>
                    <TabsContent value="ambient" className="mt-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {AMBIENT_SOUNDS.map(renderSoundButton)}
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Active Sounds</h3>
                    {Object.keys(activeSounds).length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            No sounds active. Click on the sound buttons above to create your mix.
                        </p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {Object.keys(activeSounds).map((id) => {
                                const sound = [...NATURE_SOUNDS, ...AMBIENT_SOUNDS].find((s) => s.id === id);
                                return sound ? (
                                    <div key={id} className="bg-background rounded-full px-3 py-1 text-sm flex items-center gap-1">
                                        <span>{sound.icon}</span>
                                        <span>{sound.name}</span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
