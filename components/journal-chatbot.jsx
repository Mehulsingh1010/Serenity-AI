"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "./ui/button";

import { Card, CardContent, CardFooter, CardHeader }    from "./ui/card";
import { Avatar } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { cn } from "../lib/utils";

export default function JournalChatbot({
    analysis,
    journalId,
    isVisible = false,
    onClose,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [blinking, setBlinking] = useState(true);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (journalId) {
            const savedSession = localStorage.getItem(`chat_session_${journalId}`);
            if (savedSession) {
                const session = JSON.parse(savedSession);
                setMessages(session.messages);
            } else {
                const welcomeMessage = {
                    id: Date.now().toString(),
                    content: `Hi there! I've analyzed your journal entry about "${analysis?.title || "your thoughts"}". Feel free to ask me any questions about the analysis or how you're feeling.`,
                    role: "assistant",
                    timestamp: Date.now(),
                };
                setMessages([welcomeMessage]);
            }
        }
    }, [journalId, analysis]);

    useEffect(() => {
        if (journalId && messages.length > 0) {
            const session = {
                messages,
                journalId,
                analysis,
            };
            localStorage.setItem(`chat_session_${journalId}`, JSON.stringify(session));
        }
    }, [messages, journalId, analysis]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (analysis && !isOpen) {
            const blinkInterval = setInterval(() => {
                setBlinking((prev) => !prev);
            }, 1000);

            return () => clearInterval(blinkInterval);
        } else {
            setBlinking(false);
        }
    }, [analysis, isOpen]);

    useEffect(() => {
        if (analysis && isVisible) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                setBlinking(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [analysis, isVisible]);

    useEffect(() => {
        if (isOpen && !isMinimized) {
            inputRef.current?.focus();
        }
    }, [isOpen, isMinimized]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = {
            id: Date.now().toString(),
            content: message,
            role: "user",
            timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage("");
        setIsTyping(true);

        try {
            setTimeout(() => {
                generateResponse(userMessage.content, analysis);
            }, 1000);
        } catch (error) {
            console.error("Error sending message:", error);

            const errorMessage = {
                id: Date.now().toString(),
                content: "I'm sorry, I couldn't process your message. Please try again.",
                role: "assistant",
                timestamp: Date.now(),
            };

            setMessages((prev) => [...prev, errorMessage]);
            setIsTyping(false);
        }
    };

    const generateResponse = (userMessage, analysis) => {
        let response = "";

        if (userMessage.toLowerCase().includes("mood") || userMessage.toLowerCase().includes("feeling")) {
            response = `Based on your journal, your mood score is ${analysis?.moodScore}/10. ${
                analysis?.moodScore > 5
                    ? "That's on the positive side!"
                    : "That's on the lower side. Remember that it's okay to have difficult emotions."
            }`;
        } else if (userMessage.toLowerCase().includes("emotion") || userMessage.toLowerCase().includes("feel")) {
            response = `Your primary emotion appears to be ${analysis?.emotions?.primary}, with secondary emotions including ${analysis?.emotions?.secondary?.join(", ")}.`;
        } else if (userMessage.toLowerCase().includes("topic") || userMessage.toLowerCase().includes("about")) {
            response = `Your journal entry touched on these topics: ${analysis?.topics?.join(", ")}.`;
        } else if (
            userMessage.toLowerCase().includes("suggest") ||
            userMessage.toLowerCase().includes("help") ||
            userMessage.toLowerCase().includes("advice")
        ) {
            response = `I'd suggest: ${analysis?.suggestions?.immediate}. In the longer term, consider ${analysis?.suggestions?.longTerm}.`;
        } else if (userMessage.toLowerCase().includes("summary") || userMessage.toLowerCase().includes("overview")) {
            response = analysis?.summary || "I don't have a summary of your journal entry yet.";
        } else if (userMessage.toLowerCase().includes("activity") || userMessage.toLowerCase().includes("do")) {
            response = `Some activities that might help: ${analysis?.suggestions?.activities?.join(", ")}.`;
        } else if (userMessage.toLowerCase().includes("resource") || userMessage.toLowerCase().includes("read")) {
            response = `Resources you might find helpful: ${analysis?.suggestions?.resources?.join(", ")}.`;
        } else {
            response =
                "I'm here to help you understand your journal entry and emotions. You can ask me about your mood, emotions, topics discussed, or suggestions for improvement.";
        }

        const assistantMessage = {
            id: Date.now().toString(),
            content: response,
            role: "assistant",
            timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
    };

    const toggleChat = () => {
        setIsOpen((prev) => !prev);
        setBlinking(false);
    };

    const toggleMinimize = () => {
        setIsMinimized((prev) => !prev);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? "auto" : "500px",
                            width: isMinimized ? "auto" : ["100%", "350px"],
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "mb-4 overflow-hidden",
                            isMinimized ? "w-auto" : "w-full sm:w-[350px]"
                        )}
                    >
                        <Card className="border-purple-200 shadow-lg h-full flex flex-col bg-white">
                            {!isMinimized && (
                                <CardHeader className="p-3 border-b bg-gradient-to-r from-purple-500 to-pink-500 flex flex-row items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Avatar className="h-8 w-8 bg-white">
                                            <Sparkles className="h-4 w-4 text-purple-500" />
                                        </Avatar>
                                        <div className="font-medium text-white">Journal Assistant</div>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={toggleMinimize}
                                            className="h-7 w-7 rounded-full text-white hover:bg-white/20"
                                        >
                                            <Minimize2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={toggleChat}
                                            className="h-7 w-7 rounded-full text-white hover:bg-white/20"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                            )}

                            {isMinimized ? (
                                <CardHeader className="p-2 flex flex-row items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500">
                                    <div className="flex items-center space-x-2">
                                        <Avatar className="h-7 w-7 bg-white">
                                            <Sparkles className="h-3 w-3 text-purple-500" />
                                        </Avatar>
                                        <div className="font-medium text-white text-sm">Journal Assistant</div>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={toggleMinimize}
                                            className="h-6 w-6 rounded-full text-white hover:bg-white/20"
                                        >
                                            <Maximize2 className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={toggleChat}
                                            className="h-6 w-6 rounded-full text-white hover:bg-white/20"
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </CardHeader>
                            ) : (
                                <>
                                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={cn(
                                                    "flex",
                                                    msg.role === "user" ? "justify-end" : "justify-start"
                                                )}
                                            >
                                                <div
                                                    className={cn(
                                                        "max-w-[80%] rounded-lg p-3",
                                                        msg.role === "user"
                                                            ? "bg-purple-500 text-white"
                                                            : "bg-gray-100 text-gray-800"
                                                    )}
                                                >
                                                    <p className="text-sm">{msg.content}</p>
                                                    <p className="text-xs opacity-70 mt-1">
                                                        {new Date(msg.timestamp).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {isTyping && (
                                            <div className="flex justify-start">
                                                <div className="bg-gray-100 text-gray-800 rounded-lg p-3 max-w-[80%]">
                                                    <div className="flex space-x-1">
                                                        <div
                                                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                                            style={{ animationDelay: "0ms" }}
                                                        ></div>
                                                        <div
                                                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                                            style={{ animationDelay: "150ms" }}
                                                        ></div>
                                                        <div
                                                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                                            style={{ animationDelay: "300ms" }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </CardContent>
                                    <CardFooter className="p-3 border-t bg-gray-50">
                                        <div className="flex w-full items-center space-x-2">
                                            <Textarea
                                                ref={inputRef}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Ask me about your journal..."
                                                className="min-h-10 flex-1 resize-none border-purple-200 focus:border-purple-400"
                                                rows={1}
                                            />
                                            <Button
                                                onClick={handleSendMessage}
                                                disabled={!message.trim() || isTyping}
                                                size="icon"
                                                className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                            >
                                                <Send className="h-4 w-4 text-white" />
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </>
                            )}
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={toggleChat}
                className={cn(
                    "rounded-full h-14 w-14 shadow-lg transition-all duration-300",
                    blinking ? "animate-pulse" : "",
                    isOpen
                        ? "bg-pink-500 hover:bg-pink-600"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                )}
            >
                {isOpen ? (
                    <X className="h-6 w-6 text-white" />
                ) : (
                    <MessageSquare className="h-6 w-6 text-white" />
                )}
            </Button>
        </div>
    );
}
