"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Copy, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateRoomPage() {
    const router = useRouter();
    const [roomName, setRoomName] = useState("");
    const [userName, setUserName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [isCreated, setIsCreated] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateRoomCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const handleCreateRoom = () => {
        if (roomName.trim() && userName.trim()) {
            const code = generateRoomCode();
            setRoomCode(code);
            setIsCreated(true);
        }
    };

    const handleCopyCode = async () => {
        await navigator.clipboard.writeText(roomCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleJoinRoom = () => {
        router.push(`/chat/${roomCode}?name=${encodeURIComponent(userName)}&room=${encodeURIComponent(roomName)}`);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-muted hover:text-foreground">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <h1 className="text-xl font-semibold text-foreground">Create Room</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {!isCreated ? (
                        <Card className="border-border">
                            <CardHeader className="text-center">
                                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <Plus className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="text-2xl text-card-foreground">Create New Room</CardTitle>
                                <p className="text-muted">Set up your chat room and get started</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="roomName" className="text-card-foreground">
                                        Room Name
                                    </Label>
                                    <Input
                                        id="roomName"
                                        placeholder="Enter room name"
                                        value={roomName}
                                        onChange={(e) => setRoomName(e.target.value)}
                                        className="bg-input border-border text-card-foreground placeholder:text-muted"
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
                                    onClick={handleCreateRoom}
                                    disabled={!roomName.trim() || !userName.trim()}
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                    size="lg"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Room
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="border-border">
                            <CardHeader className="text-center">
                                <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                                    <Check className="h-8 w-8 text-secondary" />
                                </div>
                                <CardTitle className="text-2xl text-card-foreground">Room Created!</CardTitle>
                                <p className="text-muted">Share this code with others to join</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="text-center">
                                    <Label className="text-card-foreground">Room Code</Label>
                                    <div className="mt-2 p-4 bg-input rounded-lg border border-border">
                                        <div className="text-3xl font-mono font-bold text-card-foreground tracking-wider">{roomCode}</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        onClick={handleCopyCode}
                                        variant="outline"
                                        className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="h-4 w-4 mr-2" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-4 w-4 mr-2" />
                                                Copy Room Code
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        onClick={handleJoinRoom}
                                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                        size="lg"
                                    >
                                        Enter Chat Room
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}
