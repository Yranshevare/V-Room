"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function LandingHeader() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Home" },
        { href: "/AboutVroom", label: "About Vroom" },
        { href: "/TechnicalDoc", label: "Technical Doc" },
    ];

    return (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MessageCircle className="h-8 w-8 text-secondary" />
                        <h1 className="text-2xl font-bold text-foreground">Vroom</h1>
                    </div>

                    <nav className="flex justify-center gap-10 items-center">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative duration-300 hover:text-secondary hover:scale-105 ${
                                    pathname === link.href
                                        ? "text-secondary font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-secondary after:rounded-full"
                                        : "text-foreground"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}
