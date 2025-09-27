"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function JoinRoomPage() {
    const router = useRouter();
    const [roomCode, setRoomCode] = useState("");
    const [userName, setUserName] = useState("");
    const [roomName, setRoomName] = useState("");

    const handleJoinRoom = () => {
        if (roomCode.trim() && userName.trim()) {
            router.push(`/chat/${roomCode.toUpperCase()}?name=${encodeURIComponent(userName)}&room=${encodeURIComponent(roomName)}`);
        }
    };

    const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .slice(0, 6);
        setRoomCode(value);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col animated-background">


            {/* Moving circles */}
            {/* Floating blurred circles */}
            <div className="circle w-40 h-40 bg-white/10 !animate-[float1_18s_linear_infinite] bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-[length:400%_400%] " />
            <div className="circle w-32 h-32 bg-white/15 animate-[float2_25s_linear_infinite] bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-[length:400%_400%] " />
            <div className="circle w-48 h-48 bg-white/10 animate-[float3_10s_linear_infinite] bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-[length:400%_400%] " />
            <div className="circle w-36 h-36 bg-white/20 animate-[float4_40s_linear_infinite] bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-[length:400%_400%] " />



            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-muted hover:text-foreground hover:bg-transparent cursor-pointer">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                        </Button>
                        <h1 className="text-xl font-semibold text-foreground">Join Room</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <Card className="border-border">
                        <CardHeader className="text-center">
                            <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                                <Users className="h-8 w-8 text-secondary" />
                            </div>
                            <CardTitle className="text-2xl text-card-foreground">Join Chat Room</CardTitle>
                            <p className="text-muted">Enter the room code to join the conversation</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="roomCode" className="text-card-foreground">
                                    Room Code
                                </Label>
                                <Input
                                    id="roomCode"
                                    placeholder="Enter 6-digit room code"
                                    value={roomCode}
                                    onChange={handleRoomCodeChange}
                                    className="bg-input border-border text-card-foreground placeholder:text-muted text-center text-lg font-mono tracking-wider"
                                    maxLength={6}
                                />
                                <p className="text-xs text-muted text-center">Room codes are 6 characters long (letters and numbers)</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="roomCode" className="text-card-foreground">
                                    Room Name
                                </Label>
                                <Input
                                    id="roomCode"
                                    placeholder="Enter room name"
                                    value={roomName}
                                    onChange={(e)=> setRoomName(e.target.value)}
                                    className="bg-input border-border text-card-foreground placeholder:text-muted  text-lg font-mono tracking-wider"
                                    maxLength={6}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="userName" className="text-card-foreground">
                                    Your Name
                                </Label>
                                <Input
                                    id="userName"
                                    placeholder="Enter your name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="bg-input border-border text-card-foreground placeholder:text-muted"
                                />
                            </div>

                            <Button
                                onClick={handleJoinRoom}
                                disabled={roomCode.length !== 6 || !userName.trim()}
                                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                size="lg"
                            >
                                <Users className="h-4 w-4 mr-2" />
                                Join Room
                            </Button>

                            <div className="text-center">
                                <p className="text-sm text-muted">
                                    {"Don't have a room code?"}{" "}
                                    <button onClick={() => router.push("/create-room")} className="text-secondary hover:underline font-medium">
                                        Create a room
                                    </button>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
