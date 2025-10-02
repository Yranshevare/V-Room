"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Users, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen w-full flex flex-col animated-background">
            {/* Floating blurred circles */}
            <div className="circle w-40 h-40 !absolute bg-white/10 !animate-[float1_30s_linear_infinite] bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-[length:400%_400%] " />
            <div className="circle w-32 h-32 !absolute bg-white/15 animate-[float2_25s_linear_infinite] bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-[length:400%_400%] " />
            <div className="circle w-48 h-48 !absolute bg-white/10 animate-[float3_15s_linear_infinite] bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-[length:400%_400%] " />
            <div className="circle w-36 h-36 !absolute bg-white/20 animate-[float4_20s_linear_infinite] bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-[length:400%_400%] " />
            <div className="circle w-36 h-36 !absolute bg-white/20 animate-[float5_12s_linear_infinite] bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-[length:400%_400%] " />

            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="h-8 w-8 text-secondary" />
                            <h1 className="text-2xl font-bold text-foreground">ChatRoom</h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-8">
                    {/* Hero Section */}
                    <div className="text-center space-y-4">
                        <div className="mx-auto w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                            <MessageCircle className="h-10 w-10 text-secondary" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground text-balance">Connect & Chat</h2>
                        <p className="text-muted text-pretty">
                            Create or join chat rooms to connect with others instantly. Simple, fast, and secure messaging.
                        </p>
                    </div>

                    {/* Action Cards */}
                    <div className="space-y-4">
                        <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer bg-white/50" onClick={() => router.push("/create-room")}>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                                        <Plus className="h-6 w-6 text-primary-foreground" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-card-foreground">Create Room</h3>
                                        <p className="text-sm text-muted">Start a new chat room and invite others</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer bg-white/50" onClick={() => router.push("/join-room")}>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                                        <Users className="h-6 w-6 text-secondary-foreground" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-card-foreground">Join Room</h3>
                                        <p className="text-sm text-muted">Enter a room code to join an existing chat</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Alternative Buttons */}
                    <div className="space-y-3 pt-4">
                        <Button
                            onClick={() => router.push("/create-room")}
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                            size="lg"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Room
                        </Button>

                        <Button
                            onClick={() => router.push("/join-room")}
                            variant="outline"
                            className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                            size="lg"
                        >
                            <Users className="h-4 w-4 mr-2" />
                            Join Room
                        </Button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-6">
                    <p className="text-center text-sm text-muted">Secure messaging • End-to-end encrypted • No registration required</p>
                </div>
            </footer>
        </div>
    );
}
