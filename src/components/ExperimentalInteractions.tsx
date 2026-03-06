"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
    id: number;
    x: number;
    y: number;
    color: string;
    type: "circle" | "square" | "ring";
}

export default function ExperimentalInteractions() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [mouseVelocity, setMouseVelocity] = useState(0);
    const lastMousePos = useRef({ x: 0, y: 0 });
    const lastTime = useRef(0);

    const colors = ["#5A7D9A", "#7FA7C4", "#333333", "#F2F2F2"];

    useEffect(() => {
        lastTime.current = Date.now();

        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent triggering on common shortcuts
            if (e.metaKey || e.ctrlKey) return;

            const id = Date.now();
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const types: Particle["type"][] = ["circle", "square", "ring"];
            const type = types[Math.floor(Math.random() * types.length)];

            setParticles((prev) => [...prev, { id, x, y, color, type }]);

            // Auto-remove particle after animation
            setTimeout(() => {
                setParticles((prev) => prev.filter((p) => p.id !== id));
            }, 1000);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            const dt = now - lastTime.current;
            if (dt === 0) return;

            const dx = e.clientX - lastMousePos.current.x;
            const dy = e.clientY - lastMousePos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const velocity = dist / dt;

            setMouseVelocity((prev) => prev * 0.9 + velocity * 0.1);

            lastMousePos.current = { x: e.clientX, y: e.clientY };
            lastTime.current = now;
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
            {/* Patatap Inspired Keypress Visuals */}
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.4, scale: 4 }}
                        exit={{ opacity: 0, scale: 8 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute rounded-full"
                        style={{
                            left: p.x,
                            top: p.y,
                            width: 100,
                            height: 100,
                            marginLeft: -50,
                            marginTop: -50,
                            border: p.type === "ring" ? `2px solid ${p.color}` : "none",
                            backgroundColor: p.type !== "ring" ? p.color : "transparent",
                            borderRadius: p.type === "square" ? "0px" : "100%",
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Staggering Beauty Inspired Mouse Reaction (Global Overlay) */}
            <motion.div
                animate={{
                    opacity: Math.min(mouseVelocity * 0.2, 0.15),
                }}
                className="absolute inset-0 bg-primary mix-blend-soft-light transition-opacity duration-300 pointer-events-none"
            />

            {/* Velocity Based Vignette Distortion */}
            <motion.div
                animate={{
                    backdropFilter: `blur(${Math.min(mouseVelocity * 5, 10)}px)`,
                } as { backdropFilter: string }}
                className="absolute inset-0 pointer-events-none"
                style={{
                    maskImage: "radial-gradient(circle at center, transparent 30%, black 100%)",
                    WebkitMaskImage: "radial-gradient(circle at center, transparent 30%, black 100%)",
                }}
            />
        </div>
    );
}
