"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sound synthesizer using Web Audio API
const playSound = (index: number) => {
    const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const frequencies = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
    osc.frequency.setValueAtTime(frequencies[index % frequencies.length], ctx.currentTime);
    osc.type = index % 4 === 0 ? "square" : index % 4 === 1 ? "sawtooth" : index % 4 === 2 ? "triangle" : "sine";

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
};

export default function InteractiveLab() {
    const [visuals, setVisuals] = useState<{ id: number; type: string; x: number; y: number; color: string }[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const index = e.keyCode;
            playSound(index);

            const newVisual = {
                id: Date.now(),
                type: ["circle", "burst", "wave", "rect"][index % 4],
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                color: index % 2 === 0 ? "#8B5CF6" : "#EC4899"
            };

            setVisuals((prev) => [...prev, newVisual]);
            setTimeout(() => {
                setVisuals((prev) => prev.filter((v) => v.id !== newVisual.id));
            }, 1000);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
            {/* Patatap Visuals */}
            <AnimatePresence>
                {visuals.map((v) => (
                    <motion.div
                        key={v.id}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute rounded-full border-2 border-primary"
                        style={{
                            left: v.x,
                            top: v.y,
                            width: 100,
                            height: 100,
                            marginLeft: -50,
                            marginTop: -50,
                            borderColor: v.color,
                            borderRadius: v.type === "rect" ? "0%" : "50%"
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
