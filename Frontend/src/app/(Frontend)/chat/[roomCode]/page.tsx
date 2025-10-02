"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Users, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
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
const initialMessages: Message[] = [
    {
        id: "1",
        text: "Welcome to the chat room!",
        sender: "System",
        timestamp: new Date(Date.now() - 300000),
        isOwn: false,
    },
];

export default function ChatRoomPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const roomCode = params.roomCode as string;

    const roomName = searchParams.get("room") || `Room ${roomCode}`;
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [numberOfUsers, setNumberOfUsers] = useState(0);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest", 
            inline: "nearest",
        });
    };

    useEffect(() => {
        // Only runs on client side
        const stored = sessionStorage.getItem("messages");
        if (stored) {
            setMessages(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
        sessionStorage.setItem("messages", JSON.stringify(messages));
    }, [messages]);

    const formatTime = (date: Date) => {
        console.log(typeof date);
        return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className="h-screen w-full  flex flex-col">

            {/* Header */}
            <header className="border-b border-border  z-10 bg-card/50 backdrop-blur-sm">
                <div className="min-[920px]:!w-full   min-[920px]:mx-auto  px-4 py-3">
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
                                            className={`relative w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.6)] animate-pulse`}
                                        ></div>

                                        <Users className="h-3 w-3" />
                                        <span>{numberOfUsers} online</span>
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
            <div className="flex-1 overflow-hidden flex 2xl:px-90 min-[920px]:px-50  flex-col">
                <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-4 space-y-4">
                    {[...initialMessages, ...messages].map((message) => (
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
                                            ? "bg-secondary/70 text-secondary-foreground rounded-tr-none"
                                            : message.sender === "System"
                                            ? "bg-muted/20 text-muted "
                                            : "bg-card/20 text-card-foreground rounded-tl-none"
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
                <ChatInput setMessages={setMessages} setNumberOfUsers={setNumberOfUsers} />
            </div>
        </div>
    );
}
