"use client";

import LandingFooter from "@/components/LandingFooter";
import LandingHeader from "@/components/LandingHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Plus, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

const howItWorks = [
    {
        step: 1,
        title: "Create a room",
        description: "Click 'Create Room' to generate a unique, secure chat space instantly.",
    },
    {
        step: 2,
        title: "Share the room link or code",
        description: "Copy the unique link or code and send it to anyone you want to chat with.",
    },
    {
        step: 3,
        title: "Join the room with friends",
        description: "Your friends enter the code or click the link to join the conversation.",
    },
    {
        step: 4,
        title: "Start chatting securely",
        description: "Chat with your friends and enjoy a private and secure environment.",
    },
    {
        step: 5,
        title: "Room auto-terminates when closed",
        description: "Once everyone leaves, the room and all messages are permanently deleted.",
    },
];

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="max-h-screen w-full flex flex-col">
            <LandingHeader />

            {/* Main Content */}
            <div className="flex-1  overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <main className="flex-1 flex items-center justify-center p-4">
                    <div className="max-h-screen  w-full grid min-[900px]:grid-cols-2 grid-cols-1 gap-5 place-items-center space-y-8">
                        <div className="w-full">
                            {/* Hero Section */}
                            <div className="text-center space-y-4">
                                <div className="space-y-4">
                                    <div className="mx-auto w-30 h-30 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
                                        <MessageCircle className="h-15 w-15 text-secondary" />
                                    </div>
                                    <h1 className="bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent text-6xl font-extrabold">
                                        Vroom
                                    </h1>
                                    <p className="text-xl md:text-2xl text-muted max-w-lg mx-auto">
                                        Connect instantly. Chat freely. Create your space.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className="text-lg h-16 px-10 min-w-[200px] group border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground cursor-pointer hover:scale-[1.03] duration-300 hover:shadow-lg shadow-[#8B5CF6]/50"
                                    onClick={() => router.push("/create-room")}
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
                        </div>

                        <div className="">
                            <div className=" mx-auto">
                                <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-[#8b5cf6] bg-clip-text text-transparent">
                                    How It Works
                                </h2>
                                <div className="space-y-6">
                                    {howItWorks.map((step) => (
                                        <Card
                                            key={step.step}
                                            className="border-border hover:shadow-lg py-5 transition-shadow cursor-default bg-white/20 mb-6"
                                        >
                                            <div className="px-6 flex items-center gap-4">
                                                <div className="bg-[#8b5cf6] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                                                    {step.step}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                                    <p className="text-muted">{step.description}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <LandingFooter/>
        </div>
    );
}
