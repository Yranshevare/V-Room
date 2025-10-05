import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import React from "react";

export default function LandingFooter() {
    return (
        <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-4  ">
            <div className="container mx-auto text-center space-y-0.5">
                <p className="text-sm">Anonymous • Encrypted • Ephemeral</p>
                <p className="text-[10px] text-muted">© {new Date().getFullYear()} Vroom. All rights reserved.</p>
                <div className="text-[10px] flex flex-wrap justify-center items-center text-muted">
                    <div className="flex items-center hover:text-[#8b5cf6] cursor-pointer duration-300">
                        <Mail size={12} className="mr-1" />
                        <a href="mailto:yranshevare2005@gmail.com">yranshevare2005@gmail.com</a>
                    </div>
                    <span className="mx-2">|</span>
                    <div className="flex items-center hover:text-[#8b5cf6] cursor-pointer duration-300">
                        <Github size={12} className="mr-1" />
                        <a href="https://github.com/Yranshevare" target="_blank">
                            Github
                        </a>
                    </div>
                    <span className="mx-2">|</span>
                    <div className="flex items-center hover:text-[#8b5cf6] cursor-pointer duration-300">
                        <Instagram size={12} className="mr-1" />
                        <a href="https://www.instagram.com/yadnesh_ranshevare?igsh=MWh2ajhkdDEyMXcwaQ==" target="_blank">
                            Instagram
                        </a>
                    </div>
                    <span className="mx-2">|</span>
                    <div className="flex items-center hover:text-[#8b5cf6] cursor-pointer duration-300">
                        <Linkedin size={12} className="mr-1" />
                        <a
                            href="https://www.linkedin.com/in/yadnesh-ranshevare-2083962b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            target="_blank"
                        >
                            Linkedin
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
