import React from "react";
import { Lock, Zap, Shield, Database, Users, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import LandingHeader from "@/components/LandingHeader";
import LandingFooter from "@/components/LandingFooter";

export default function VroomDocs() {
    const projectOverview = [
        {
            heading: "Introduction",
            content:
                "Vroom is a lightweight, privacy-focused chat application built for smooth and secure communication without requiring personal information, login, or signup. It focuses on providing users with a quick and private way to chat without leaving behind any digital identity.",
        },
        {
            heading: "Temporary Virtual Rooms",
            content:
                "Vroom operates through temporary virtual rooms, which serve as private spaces for real-time message exchange. Each room is created dynamically and exists only during the communication session. Once the conversation ends or participants close the chat tab, the room and all associated data are permanently deleted, ensuring complete privacy and data anonymity.",
        },
        {
            heading: "Security and Encryption",
            content:
                "All communication within Vroom follows the End-to-End Encryption (E2E) standard. This ensures that messages are encrypted on the sender’s side and decrypted only by the receiver. The server cannot access or view any message content, guaranteeing total confidentiality between participants.",
        },
        {
            heading: "Real-Time Communication",
            content:
                "Vroom uses Socket.IO for establishing real-time bidirectional connections between users. This enables instant message delivery with minimal latency and ensures that all users in a room stay synchronized without page reloads.",
        },
        {
            heading: "Scalability with Redis Pub/Sub",
            content:
                "To handle multiple rooms and servers efficiently, Vroom integrates Redis Pub/Sub architecture. Redis acts as a message broker that distributes messages across multiple WebSocket servers. This allows users connected to different servers to communicate seamlessly while keeping their rooms isolated from others.",
        },
        {
            heading: "Focus on Privacy and Simplicity",
            content:
                "Unlike conventional chat platforms that rely on persistent user accounts or stored chat logs, Vroom prioritizes simplicity and privacy. By automatically deleting all data after communication ends, it ensures there is no digital footprint, providing users with a secure, anonymous, and hassle-free chatting experience.",
        },
    ];

    return (
        <div className="max-h-screen  w-full flex flex-col scroll-mt-20">
            <LandingHeader />
            <div className="flex-1 scroll-smooth overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-transparent text-gray-900 transition-colors">
                <div className=" mx-xl px-4 sm:px-6 lg:px-8 ">
                    <div className="flex gap-8">
                        {/* Main Content */}
                        <main className="flex-1 py-8 xl:px-45 lg:px-25 sm:px-15 px-5 ">
                            {/* Hero Section */}
                            <div className="mb-16">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-[#8b5cf6] bg-clip-text text-transparent">Vroom Technical Documentation</h1>
                                <p className="text-xl text-gray-600">Architecture, Requirements, and Workflow</p>
                            </div>

                            {/* Project Overview */}
                            <section id="overview" className="mb-16 scroll-mt-20">
                                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-[#8b5cf6] bg-clip-text text-transparent">Project Overview</h2>
                                {projectOverview.map((section, idx) => (
                                    <div key={idx} className="mt-6 text-lg">
                                        <p className="text-lg font-semibold">{section.heading}:</p>
                                        <span className="text-muted leading-relaxed">{section.content}</span>
                                    </div>
                                ))}
                            </section>

                            {/* Requirements */}
                            <section id="requirements" className="mb-16 scroll-mt-20">
                                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-[#8b5cf6] bg-clip-text text-transparent">Requirements</h2>
                                <div className="space-y-4">
                                    {[
                                        "Landing page with project intro, create room, join room options.",
                                        "Temporary virtual rooms for communication.",
                                        "No login/signup required.",
                                        "Rooms can be joined via link or code.",
                                        "Auto-termination of rooms after use.",
                                    ].map((req, idx) => (
                                        <Card key={idx} className="flex gap-3 p-4 rounded-lg bg-white/20 border border-gray-200">
                                            <div className="flex items-center  gap-3">
                                                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-semibold">
                                                    {idx + 1}
                                                </span>
                                                <p className="text-gray-700 text-xl">{req}</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </section>

                            {/* Specifications */}
                            <section id="specifications" className="mb-16">
                                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-[#8b5cf6] bg-clip-text text-transparent">Specifications</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {[
                                        { icon: Lock, title: "No Personal Info", desc: "Complete anonymity for all users" },
                                        { icon: Shield, title: "End-to-End Encryption", desc: "Secure E2E encrypted messages" },
                                        { icon: Users, title: "Credential-Based Rooms", desc: "Illusion of duplicate rooms using credentials" },
                                        { icon: Database, title: "Auto Data Deletion", desc: "Automated deletion after room termination" },
                                        { icon: Zap, title: "Session-Based Rooms", desc: "Room expires when tab is closed" },
                                    ].map((spec, idx) => (
                                        <Card
                                            key={idx}
                                            className="p-5 rounded-lg border bg-white/20 border-gray-200 hover:border-blue-600 transition-colors"
                                        >
                                            <spec.icon className="text-blue-600 mb-3" size={24} />
                                            <h3 className="font-semibold mb-2">{spec.title}</h3>
                                            <p className="text-sm text-gray-600">{spec.desc}</p>
                                        </Card>
                                    ))}
                                </div>
                            </section>

                            {/* Tech Stack */}
                            <section id="tech-stack" className="mb-16">
                                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-[#8b5cf6] bg-clip-text text-transparent">Tech Stack</h2>
                                <div className="space-4 grid md:grid-cols-2 gap-5">
                                    {[
                                        { name: "Next.js", desc: "Frontend & backend", color: "bg-black" },
                                        { name: "Socket.IO", desc: "WebSocket connections", color: "bg-gray-800" },
                                        { name: "Express", desc: "Socket handling", color: "bg-gray-700" },
                                        { name: "Redis", desc: "Message broker & temporary data store", color: "bg-red-600" },
                                    ].map((tech, idx) => (
                                        <Card key={idx} className="flex items-start gap-4 p-4 bg-white/20 rounded-lg border border-gray-200">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`w-12 h-12 rounded-lg ${tech.color} flex items-center justify-center text-white font-bold text-sm`}
                                                >
                                                    {tech.name.slice(0, 2)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{tech.name}</h3>
                                                    <p className="text-sm text-gray-600">{tech.desc}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </section>

                            {/* Workflow Diagram */}
                            <section id="workflow" className="mb-16 ">
                                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-[#8b5cf6] bg-clip-text text-transparent">Workflow Diagram</h2>
                                <div className="mb-6 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center flex justify-center items-center bg-white">
                                    <Image src="/workflow.png" alt="Workflow Diagram" width={1000} height={1000} />
                                </div>
                                <p className="text-sm text-gray-600 mb-6 italic">Workflow of room creation, joining, and messaging</p>
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Workflow Steps:</h3>
                                    {[
                                        "User creates or joins a room using a unique Room ID and Passkey",
                                        "WebSocket server validates credentials against Redis",
                                        "Upon validation, user socket joins the virtual room",
                                        "Messages sent by users are broadcasted to all sockets in the room",
                                        "Redis Pub/Sub ensures messages reach users on different servers",
                                        "Room and messages are deleted when all users disconnect",
                                    ].map((step, idx) => (
                                        <Card key={idx} className="flex gap-3 bg-white/20 border border-gray-200 px-4 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="flex-shrink-0 text-blue-600 font-bold text-lg">{idx + 1}.</span>
                                                <p className="text-gray-700 text-lg">{step}</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </section>

                            {/* WebSocket Architecture */}
                            <section id="websocket" className="mb-16 text-lg">
                                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-[#8b5cf6] bg-clip-text text-transparent">WebSocket Architecture</h2>
                                <div className="mb-6 rounded-lg border-2 flex items-center justify-center border-dashed border-gray-300 p-12 text-center bg-white">
                                    <Image src="/socket_connection.jpg" alt="WebSocket Architecture" width={1000} height={1000} />
                                </div>
                                <div className="prose max-w-none">
                                    <p className="text-gray-700 mb-4">
                                        The WebSocket architecture coordinates room creation, joining, and validation through a distributed system of
                                        socket servers and Redis.
                                    </p>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                        <p className="text-sm text-blue-900">
                                            <strong>Key Concept:</strong> Each socket connection can be treated as a virtual room, with multiple
                                            sockets grouped under a shared Room ID for multi-user conversations.
                                        </p>
                                    </div>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-center gap-3">
                                            <Circle size={15} />
                                            Redis stores room credentials and validates incoming connections
                                        </li>
                                        <li className="flex items-center gap-3">
                                            {" "}
                                            <Circle size={15} /> Multiple WebSocket servers can handle different users in the same room
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Circle size={15} /> Socket.IO rooms provide logical grouping of connections
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Circle size={15} /> Redis ensures consistency across distributed WebSocket servers
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* Message Flow Architecture */}
                            <section id="message-flow" className="mb-16">
                                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-[#8b5cf6] bg-clip-text text-transparent">Message Flow Architecture</h2>
                                <div className="mb-6 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center bg-white flex justify-center items-center">
                                    <Image src="/message_flow.jpg" alt="Message Flow Architecture" width={1000} height={1000} />
                                </div>
                                <div className="space-y-6">
                                    <Card className="border border-gray-200 rounded-lg p-5 bg-white/20 text-lg">
                                        <div>
                                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                Same WebSocket Server
                                            </h3>
                                            <p className="text-gray-700 text-sm">
                                                When users are connected to the same WebSocket server, messages are delivered directly through
                                                Socket.IO's room broadcasting mechanism. This provides low-latency, real-time communication without
                                                external dependencies.
                                            </p>
                                        </div>
                                    </Card>
                                    <Card className="border border-gray-200 rounded-lg p-5 bg-white/20 text-lg">
                                        <div>
                                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                Different WebSocket Servers
                                            </h3>
                                            <p className="text-gray-700 text-sm">
                                                When users are on different WebSocket servers, Redis Pub/Sub acts as a message broker. The sending
                                                server publishes messages to Redis, which broadcasts them to all subscribed servers. Each server then
                                                delivers the message to its connected clients in that room.
                                            </p>
                                        </div>
                                    </Card>
                                </div>
                            </section>

                            {/* Key Takeaways */}
                            <section id="takeaways" className="mb-16 scroll-mt-120">
                                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-[#8b5cf6] bg-clip-text text-transparent">Key Takeaways</h2>
                                <div className="grid gap-4">
                                    {[
                                        {
                                            title: "Temporary & Private",
                                            desc: "Encrypted chat system with no data persistence",
                                            color: "bg-[#0000FF]/10",
                                        },
                                        { title: "Scalable Design", desc: "Redis Pub/Sub enables horizontal scaling", color: "bg-[#008000]/15" },
                                        { title: "Zero Data Storage", desc: "Ensures complete privacy and compliance", color: "bg-[#800080]/15" },
                                        {
                                            title: "Virtual Room Architecture",
                                            desc: "Each socket is a virtual room, grouped by IDs",
                                            color: "bg-[#FFA500]/15",
                                        },
                                    ].map((item, idx) => (
                                        <Card key={idx} className={`p-5 rounded-lg ${item.color}`}>
                                            <div>
                                                <h3 className={`font-semibold mb-2 text-${item.color}-900 text-lg`}>{item.title}</h3>
                                                <p className={`text-sm text-${item.color}-800`}>{item.desc}</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
            <LandingFooter/>
        </div>
    );
}
