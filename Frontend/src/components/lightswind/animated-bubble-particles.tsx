"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/lightswind/utils";

export interface ParticleConfig {
    x: number;
    y: number;
    vx: number;
    vy: number;
    scale: number;
    rotation: number;
    rotationDirection: string;
    siner: number;
    steps: number;
    friction: number;
    element: Element | null;
}

export interface AnimatedBubbleParticlesProps {
    className?: string;
    backgroundColor?: string;
    particleColor?: string | string[];
    particleSize?: number;
    spawnInterval?: number;
    height?: string;
    width?: string;
    enableGooEffect?: boolean;
    blurStrength?: number;
    pauseOnBlur?: boolean;
    zIndex?: number;
    friction?: { min: number; max: number };
    scaleRange?: { min: number; max: number };
    children?: React.ReactNode;
}

const AnimatedBubbleParticles: React.FC<AnimatedBubbleParticlesProps> = ({
    className,
    backgroundColor = "ffffff",
    particleColor = "#c5a3f5",
    particleSize = 100,
    spawnInterval = 1000,
    height = "100vh",
    width = "100vw",
    enableGooEffect = true,
    blurStrength = 50,
    pauseOnBlur = true,
    zIndex = 1,
    friction = { min: 1, max: 2 },
    scaleRange = { min: 0.4, max: 2.4 },
    children,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const intervalRef = useRef<number | null>(null);
    const particlesArrayRef = useRef<ParticleConfig[]>([]);
    const isPausedRef = useRef(false);
    const gooIdRef = useRef("goo-" + Math.random().toString(36).substring(2, 11));

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Responsive settings stored in a ref
    const responsiveSettings = useRef({
        particleSize,
        spawnInterval,
        scaleRange,
    });

    // Function to determine responsive settings
    const getResponsiveSettings = () => {
        const width = window.innerWidth;

        if (width <= 480) {
            return { particleSize: 40, spawnInterval: 2000, scaleRange: { min: 0.2, max: 1.0 } };
        } else if (width <= 768) {
            return { particleSize: 50, spawnInterval: 1500, scaleRange: { min: 0.3, max: 1.2 } };
        } else {
            return { particleSize, spawnInterval, scaleRange };
        }
    };

    // Update responsive settings on resize
    useEffect(() => {
        const updateSettingsForScreen = () => {
            responsiveSettings.current = getResponsiveSettings();
        };

        updateSettingsForScreen();
        window.addEventListener("resize", updateSettingsForScreen);
        return () => window.removeEventListener("resize", updateSettingsForScreen);
    }, [particleSize, spawnInterval, scaleRange]);

    const createParticleElement = useCallback(() => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.style.cssText =
            "display: block;" +
            "width: " + responsiveSettings.current.particleSize + "px;" +
            "height: " + responsiveSettings.current.particleSize + "px;" +
            "position: absolute;" +
            "transform: translateZ(0px);";
        svg.setAttribute("viewBox", "0 0 67.4 67.4");

        let color: string;
        if (Array.isArray(particleColor)) {
            const randomIndex = Math.floor(Math.random() * particleColor.length);
            color = particleColor[randomIndex];
        } else {
            color = particleColor as string;
        }

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "33.7");
        circle.setAttribute("cy", "33.7");
        circle.setAttribute("r", "33.7");
        circle.setAttribute("fill", color);

        svg.appendChild(circle);
        return svg;
    }, [particleColor]);

    const createParticle = useCallback((): ParticleConfig => {
        const element = createParticleElement();
        if (particlesRef.current) {
            particlesRef.current.appendChild(element);
        }

        const x = Math.random() * dimensions.width;
        const y = dimensions.height + 100;
        const steps = dimensions.height / 2;
        const frictionValue = friction.min + Math.random() * (friction.max - friction.min);
        const scale =
            responsiveSettings.current.scaleRange.min +
            Math.random() *
                (responsiveSettings.current.scaleRange.max -
                    responsiveSettings.current.scaleRange.min);
        const siner = (dimensions.width / 2.5) * Math.random();
        const rotationDirection = Math.random() > 0.5 ? "+" : "-";

        element.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";

        return {
            x,
            y,
            vx: 0,
            vy: 0,
            scale,
            rotation: 0,
            rotationDirection,
            siner,
            steps,
            friction: frictionValue,
            element,
        };
    }, [createParticleElement, dimensions, friction]);

    const updateParticle = (particle: ParticleConfig): boolean => {
        particle.y -= particle.friction;

        const left =
            particle.x +
            Math.sin((particle.y * Math.PI) / particle.steps) * particle.siner;
        const top = particle.y;
        const rotation = particle.rotationDirection + (particle.y + responsiveSettings.current.particleSize);

        if (particle.element) {
            const element = particle.element as SVGElement;
            element.style.transform =
                "translateX(" +
                left +
                "px) translateY(" +
                top +
                "px) scale(" +
                particle.scale +
                ") rotate(" +
                rotation +
                "deg)";
        }

        if (particle.y < -responsiveSettings.current.particleSize) {
            if (particle.element && particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
            return false;
        }

        return true;
    };

    const animate = useCallback(() => {
        if (isPausedRef.current) {
            animationRef.current = requestAnimationFrame(animate);
            return;
        }

        particlesArrayRef.current = particlesArrayRef.current.filter(updateParticle);
        animationRef.current = requestAnimationFrame(animate);
    }, []);

    const spawnParticle = useCallback(() => {
        if (!isPausedRef.current && dimensions.width > 0 && dimensions.height > 0) {
            const particle = createParticle();
            particlesArrayRef.current.push(particle);
        }
    }, [dimensions, createParticle]);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDimensions({ width: rect.width, height: rect.height });
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        if (!pauseOnBlur) return;

        const handleBlur = () => (isPausedRef.current = true);
        const handleFocus = () => (isPausedRef.current = false);

        window.addEventListener("blur", handleBlur);
        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("focus", handleFocus);
        };
    }, [pauseOnBlur]);

    useEffect(() => {
        if (dimensions.width > 0 && dimensions.height > 0) {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);

            animationRef.current = requestAnimationFrame(animate);
            intervalRef.current = window.setInterval(
                spawnParticle,
                responsiveSettings.current.spawnInterval
            );
        }

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
            particlesArrayRef.current.forEach((particle) => {
                if (particle.element && particle.element.parentNode) {
                    particle.element.parentNode.removeChild(particle.element);
                }
            });
            particlesArrayRef.current = [];
        };
    }, [dimensions, animate, spawnParticle]);

    const backgroundClass = (() => {
        if (className && className.split(" ").some((cls) => cls.startsWith("bg-"))) return "";
        return `bg-[${backgroundColor}]`;
    })();

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative overflow-hidden",
                "w-screen h-screen",
                backgroundClass,
                className
            )}
            style={{ zIndex, width, height }}
        >
            <div
                ref={particlesRef}
                className="absolute inset-0 w-full !h-full pointer-events-none z-0"
                style={{ filter: enableGooEffect ? "url(#" + gooIdRef.current + ")" : undefined }}
            />

            <div className="absolute inset-0 flex items-center justify-center z-10 w-full min-h-full">
                {children}
            </div>

            {enableGooEffect && (
                <svg className="absolute w-0 h-0 z-0">
                    <defs>
                        <filter id={gooIdRef.current}>
                            <feGaussianBlur
                                in="SourceGraphic"
                                result="blur"
                                stdDeviation={blurStrength}
                            />
                            <feColorMatrix
                                in="blur"
                                result="colormatrix"
                                type="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9"
                            />
                            <feBlend in="SourceGraphic" in2="colormatrix" />
                        </filter>
                    </defs>
                </svg>
            )}
        </div>
    );
};

export { AnimatedBubbleParticles };
export default AnimatedBubbleParticles;
