"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onFinished }: { onFinished: () => void }) {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [particleData, setParticleData] = useState<{ duration: number; delay: number; left: number }[]>([]);

    useEffect(() => {
        // Hydration Fix: Generate random data only on client
        setParticleData([...Array(12)].map(() => ({
            duration: Math.random() * 4 + 3,
            delay: Math.random() * 2,
            left: Math.random() * 100
        })));

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsExiting(true), 800); // Shorter pause
                    setTimeout(onFinished, 1800); // Faster handover
                    return 100;
                }
                return prev + 1;
            });
        }, 12); // Slightly faster progress
        return () => clearInterval(interval);
    }, [onFinished]);

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center"
                >
                    {/* Data Stream Background - Light Mode */}
                    <div className="absolute inset-0 overflow-hidden opacity-[0.05]">
                        {particleData.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: -1000 }}
                                animate={{ y: 1000 }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: p.delay
                                }}
                                className="absolute w-[1px] h-32 bg-[#5a7d9a]"
                                style={{ left: `${p.left}%` }}
                            />
                        ))}
                    </div>

                    <motion.div
                        initial={{ scale: 0.98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <h1 className="text-3xl md:text-7xl font-black tracking-[0.5em] uppercase mb-12 text-[#333333] overflow-hidden text-center luxury-text">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="inline-block"
                            >
                                DHANUSH_<span className="text-primary italic">RAJ</span>
                            </motion.span>
                        </h1>

                        {/* Technical Progress Bar - Light Mode */}
                        <div className="w-48 md:w-80 h-[2px] bg-[#333333]/5 relative overflow-hidden rounded-full">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: progress / 100 }}
                                transition={{ duration: 0.1 }}
                                className="absolute bottom-0 left-0 h-full bg-primary shadow-[0_0_10px_rgba(90,125,154,0.3)] origin-left w-full"
                            />
                        </div>

                        <motion.div
                            className="mt-8 text-[9px] font-bold tracking-[0.4em] uppercase text-[#333333]/40 flex items-center gap-3"
                        >
                            <span className="animate-pulse">INITIALIZING_SYSTEM</span>
                            <span className="text-[#333333]/20">[{progress}%]</span>
                        </motion.div>
                    </motion.div>

                    {/* Frame Elements - Subtle Light Version */}
                    <div className="absolute top-10 left-10 w-6 h-6 border-t border-l border-[#333333]/10" />
                    <div className="absolute top-10 right-10 w-6 h-6 border-t border-r border-[#333333]/10" />
                    <div className="absolute bottom-10 left-10 w-6 h-6 border-b border-l border-[#333333]/10" />
                    <div className="absolute bottom-10 right-10 w-6 h-6 border-b border-r border-[#333333]/10" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
