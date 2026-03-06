"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [glitch, setGlitch] = useState(false);
    const [sessionId] = useState(() => Math.random().toString(36).substring(7));

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 4500);

        const glitchInterval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 50);
        }, 800);

        return () => {
            clearTimeout(timer);
            clearInterval(glitchInterval);
        };
    }, []);

    const glitchVariants = {
        active: {
            x: [0, -5, 5, -2, 2, 0],
            filter: [
                "none",
                "hue-rotate(90deg) opacity(0.8)",
                "hue-rotate(-90deg) opacity(0.8)",
                "none"
            ],
            transition: { duration: 0.2 }
        },
        inactive: { x: 0, filter: "none" }
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.5,
                        filter: "blur(20px)",
                        transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] }
                    }}
                    className="fixed inset-0 z-[10000] bg-obsidian flex flex-col items-center justify-center p-6 overflow-hidden"
                >
                    {/* Movie-style Background Scanlines */}
                    <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-1 bg-[length:100%_2px,3px_100%]" />

                    <div className="relative">
                        {/* Massive Heading with Glitch */}
                        <motion.div
                            animate={glitch ? "active" : "inactive"}
                            variants={glitchVariants}
                            className="relative z-10"
                        >
                            <motion.h1
                                initial={{ scale: 0.5, opacity: 0, letterSpacing: "1em" }}
                                animate={{ scale: 1, opacity: 1, letterSpacing: "-0.05em" }}
                                transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                                className="font-outfit text-6xl md:text-9xl font-black text-white text-center leading-[0.8]"
                            >
                                DHANUSH <br />
                                <span className="text-neon-green">RAJ</span>
                            </motion.h1>

                            {/* Duplicate for glitch layers */}
                            {glitch && (
                                <>
                                    <h1 className="absolute top-0 left-0 font-outfit text-6xl md:text-9xl font-black text-electric-blue opacity-50 -translate-x-1 -z-1">DHANUSH RAJ</h1>
                                    <h1 className="absolute top-0 left-0 font-outfit text-6xl md:text-9xl font-black text-vivid-orange opacity-50 translate-x-1 -z-1">DHANUSH RAJ</h1>
                                </>
                            )}
                        </motion.div>

                        {/* Cinematic Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                            className="mt-12 flex flex-col items-center gap-4"
                        >
                            <div className="overflow-hidden">
                                <motion.p
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 1.8, duration: 0.8 }}
                                    className="font-jakarta text-[10px] tracking-[0.8em] uppercase text-gray-500 font-bold"
                                >
                                    Founder & COO <span className="text-white/20">•</span> Site2Success
                                </motion.p>
                            </div>

                            {/* Progress Bar with "Movie Loader" style */}
                            <div className="w-64 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-neon-green to-transparent"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Random System Data Glitches */}
                    <div className="absolute bottom-10 left-10 font-jakarta text-[8px] text-white/10 uppercase tracking-widest hidden md:block">
                        <p>Initializing Neural Core...</p>
                        <p>BSc CS Christ University Protocol: ACTIVE</p>
                        <p>Full Stack Module: LOADED</p>
                    </div>

                    <div className="absolute top-10 right-10 font-jakarta text-[8px] text-white/10 uppercase tracking-widest hidden md:block text-right">
                        <p>Session ID: {sessionId}</p>
                        <p>UI Version: 4.0.0-CINEMATIC</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
