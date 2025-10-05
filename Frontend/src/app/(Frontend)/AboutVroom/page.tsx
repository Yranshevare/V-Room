import React from "react";
import { Lock, Clock, Shield, Link2, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import LandingHeader from "@/components/LandingHeader";
import LandingFooter from "@/components/LandingFooter";

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

const Features = [
    {
        name: "Privacy First",
        description: "No login, no signup, no personal details.",
        icon: Lock,
        iconBg: "bg-purple-600/20",
    },
    {
        name: "Temporary Rooms",
        description: "Rooms are deleted once the chat ends.",
        icon: Clock,
        iconBg: "bg-amber-600/20",
    },
    {
        name: "End-to-End Encryption",
        description: "All messages are securely encrypted.",
        icon: Shield,
        iconBg: "bg-cyan-600/20",
    },
    {
        name: "Easy Invite",
        description: "Share a link or room code to invite others.",
        icon: Link2,
        iconBg: "bg-violet-600/20",
    },
    {
        name: "Real-time Chat",
        description: "Messages delivered instantly.",
        icon: Zap,
        iconBg: "bg-rose-600/20",
    }
];

export default function VroomLanding() {
    return (
        <div className="max-h-screen w-full flex flex-col">
            <LandingHeader />
            <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <section className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-[#8b5cf6] bg-clip-text text-transparent">Why Vroom?</h2>
                        <p className="text-lg text-muted leading-relaxed">
                            Vroom is designed for secure and anonymous communication without storing user data. In a world where privacy is
                            increasingly rare, Vroom offers a sanctuary for private conversations. No accounts, no tracking, no data retention—just
                            pure, ephemeral communication that exists only as long as you need it. Perfect for sensitive discussions, temporary
                            collaborations, or anyone who values digital privacy.
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-4 py-16 ">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-[#8b5cf6] bg-clip-text text-transparent">How It Works</h2>
                        <div className="space-y-6">
                            {howItWorks.map((step) => (
                                <Card key={step.step} className="border-border hover:shadow-lg transition-shadow cursor-pointer bg-white/20 mb-6">
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
                </section>

                <section className="container mx-auto px-4 py-20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-[#8b5cf6] bg-clip-text text-transparent">
                            Features
                        </h2>
                        <p className="text-center text-slate-400 mb-16 text-lg">Everything you need for private, secure conversations</p>

                        <div className="grid md:grid-cols-2 gap-6">
                            {Features.map((feature) => (
                                <Card key={feature.name} className="border-border hover:shadow-lg transition-shadow cursor-pointer bg-white/20">
                                    <div className="px-6 flex items-start gap-4">
                                        <div className={`${feature.iconBg} p-3 rounded-lg flex items-center justify-center flex-shrink-0`}>
                                            <feature.icon className="h-6 w-6 text-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                                            <p className="text-muted">{feature.description}</p>
                                        </div>
                                    </div>
                                </Card> 
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <LandingFooter/>
        </div>
    );
}
