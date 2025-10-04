"use client";

import LandingHeader from "@/components/LandingHeader";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen w-full flex flex-col">
            <LandingHeader />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-8">
                    {/* Hero Section */}
                    <div className="text-center space-y-4">
                        <div className="space-y-4">
                            <div className="mx-auto w-30 h-30 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
                                <MessageCircle className="h-15 w-15 text-secondary" />
                            </div>
                            <h1 className="bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent text-6xl font-extrabold">
                                Vroom
                            </h1>
                            <p className="text-xl md:text-2xl text-muted max-w-lg mx-auto">Connect instantly. Chat freely. Create your space.</p>
                        </div>
                    </div>

                    {/* Action Cards */}
                    {/* <div className="space-y-4">
                        <Card
                            className="border-border hover:shadow-lg transition-shadow cursor-pointer bg-white/50"
                            onClick={() => router.push("/create-room")}
                        >
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

                        <Card
                            className="border-border hover:shadow-lg transition-shadow cursor-pointer bg-white/50"
                            onClick={() => router.push("/join-room")}
                        >
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
                    </div> */}

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                        <Button
                            variant="ghost"
                            size="lg"
                            className="text-lg h-16 px-10 min-w-[200px] group border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground cursor-pointer hover:scale-[1.03] duration-300 hover:shadow-lg shadow-[#8B5CF6]/50"
                            onClick={() => router.push("/join-room")}
                        >
                            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                            Create Room
                        </Button>

                        <Button
                            variant="ghost"
                            size="lg"
                            className="text-lg h-16 px-10 min-w-[200px] group border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground cursor-pointer hover:scale-[1.03] duration-300 hover:shadow-lg shadow-[#8B5CF6]/50"
                            onClick={() => router.push("/join-room")}
                        >
                            <LogIn className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                            Join Room
                        </Button>
                    </div>
                    {/* Alternative Buttons */}
                    {/* <div className="space-y-3 pt-4">
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
                    </div> */}
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
