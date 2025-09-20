"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Users, MessageCircle, SmilePlus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import EmojiPicker from "emoji-picker-react";
import InviteDialog from "@/components/InviteDialog";
import LeaveDialog from "@/components/LeaveDialog";
import ChatInput from "@/components/ChatInput";

interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: Date;
    isOwn: boolean;
}

export default function ChatRoomPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const roomCode = params.roomCode as string;

    const roomName = searchParams.get("room") || `Room ${roomCode}`;

    const [messages, setMessages] = useState<Message[]>([]);

    const [isConnected, setIsConnected] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Simulate some initial messages
    useEffect(() => {
        const initialMessages: Message[] = [
            {
                id: "1",
                text: "Welcome to the chat room!",
                sender: "System",
                timestamp: new Date(Date.now() - 300000),
                isOwn: false,
            },
            {
                id: "2",
                text: "Hey everyone! 👋",
                sender: "Alice",
                timestamp: new Date(Date.now() - 120000),
                isOwn: false,
            },
            {
                id: "3",
                text: "Hello! Great to be here.",
                sender: "Bob",
                timestamp: new Date(Date.now() - 60000),
                isOwn: false,
            },
        ];
        setMessages(initialMessages);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className="min-h-screen bg-background w-full flex flex-col animate-chat-background">
            {/* Floating blurred circles */}
            <div className="circle w-40 h-40 !absolute bg-white/10 !animate-[float1_30s_linear_infinite] bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-[length:400%_400%] " />
            <div className="circle w-32 h-32 !absolute bg-white/15 animate-[float2_25s_linear_infinite] bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-[length:400%_400%] " />
            <div className="circle w-48 h-48 !absolute bg-white/10 animate-[float3_15s_linear_infinite] bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-[length:400%_400%] " />
            <div className="circle w-36 h-36 !absolute bg-white/20 animate-[float4_20s_linear_infinite] bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-[length:400%_400%] " />
            <div className="circle w-36 h-36 !absolute bg-white/20 animate-[float5_12s_linear_infinite] bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-[length:400%_400%] " />

            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm">
                <div className="min-[920px]:!w-full  min-[920px]:mx-auto  px-4 py-3">
                    <div className="flex  items-center justify-between">
                        <div className="flex  items-center gap-4">
                            {/* <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-muted hover:bg-transparent hover:text-black cursor-pointer ">
                                <ArrowLeft className="h-4 w-4" />
                            </Button> */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                                    <MessageCircle className="h-4 w-4 text-secondary" />
                                </div>
                                <div>
                                    <h1 className="font-semibold text-foreground">{roomName}</h1>
                                    <div className="flex items-center gap-2 text-sm text-muted">
                                        {/* Glowing status dot */}
                                        <div
                                            className={`relative w-2 h-2 rounded-full ${
                                                isConnected
                                                    ? "bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.6)] animate-pulse"
                                                    : "bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.6)] animate-pulse"
                                            }`}
                                        ></div>

                                        <Users className="h-3 w-3" />
                                        <span>4 online</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex min-[500px]:gap-5">
                            <InviteDialog />
                            <LeaveDialog />
                        </div>
                    </div>
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1    overflow-hidden flex 2xl:px-90 min-[920px]:px-50  flex-col">
                <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-4 space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-xs lg:max-w-md ${message.isOwn ? "order-2" : "order-1"}`}>
                                {message.sender !== "System" && (
                                    <div className={`text-xs text-muted mb-1  ${message.isOwn && "text-end"}`}>
                                        {message.isOwn ? "You" : message.sender} ({formatTime(message.timestamp)})
                                    </div>
                                )}
                                <Card
                                    className={`p-3 rounded-3xl px-7 ${
                                        message.isOwn
                                            ? "bg-secondary text-secondary-foreground rounded-tr-none"
                                            : message.sender === "System"
                                            ? "bg-muted/20 text-muted border-muted/30"
                                            : "bg-card text-card-foreground rounded-tl-none"
                                    }`}
                                >
                                    <p className="text-sm leading-relaxed">{message.text}</p>
                                </Card>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <ChatInput setMessages={setMessages} isConnected={isConnected} />
            </div>
        </div>
    );
}
