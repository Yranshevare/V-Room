"use client";

import { MessageCircle, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function LandingHeader() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { href: "/", label: "Home" },
        { href: "/AboutVroom", label: "About Vroom" },
        { href: "/TechnicalDoc", label: "Technical Doc" },
    ];

    return (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
            <div className=" mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-2">
                        <MessageCircle className="h-8 w-8 text-secondary" />
                        <h1 className="text-2xl font-bold text-foreground">Vroom</h1>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden min-[545px]:flex justify-center gap-10 items-center">
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

                    {/* Mobile Menu Button */}
                    <button
                        className="min-[545px]:hidden p-2 text-foreground"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu with Animation */}
                <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        menuOpen ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                >
                    <nav className="flex flex-col min-[545px]:hidden space-y-3">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className={`block px-2 py-1 rounded-md text-lg duration-300 hover:text-secondary hover:translate-x-1 ${
                                    pathname === link.href
                                        ? "text-secondary font-semibold bg-muted/30"
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
