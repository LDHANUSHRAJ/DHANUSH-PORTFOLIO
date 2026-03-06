"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const springX = useSpring(mousePosition.x, { damping: 30, stiffness: 200 });
    const springY = useSpring(mousePosition.y, { damping: 30, stiffness: 200 });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen flex items-center justify-center overflow-hidden bg-obsidian"
        >
            {/* Background Layers */}
            <motion.div
                style={{ y, scale, opacity }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/60 to-obsidian" />

                {/* Animated Ambient Light */}
                <motion.div
                    style={{ x: springX, y: springY }}
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neon-green/10 rounded-full blur-[150px]"
                />
                <motion.div
                    style={{ x: -springX, y: -springY }}
                    className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-electric-blue/10 rounded-full blur-[180px]"
                />
            </motion.div>

            {/* Foreground Content */}
            <div className="container relative z-10 px-6 mx-auto">
                <motion.div
                    style={{ y: textY, opacity }}
                    className="flex flex-col items-center text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <div className="inline-flex items-center gap-3 mb-12 px-6 py-2 rounded-full glass border border-white/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-glow-green" />
                            <h2 className="font-jakarta text-[10px] tracking-[0.4em] uppercase text-gray-300">
                                Lando Norris Inspired <span className="text-white/20 mx-2">|</span> 2026 Edition
                            </h2>
                        </div>
                    </motion.div>

                    <div className="relative mb-12">
                        <motion.h1
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                            className="font-outfit text-[12vw] md:text-[10vw] font-black tracking-tighter leading-[0.85] text-white"
                        >
                            LDHANUSH <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/20 via-white to-white/20">RAJ</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col items-center gap-8"
                    >
                        <p className="max-w-xl font-jakarta text-gray-400 text-lg md:text-xl leading-relaxed">
                            Founder & COO of <span className="text-white">Site2Success</span>. <br />
                            Architecting the future of <span className="text-neon-green">AI Automation</span>.
                        </p>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="w-[1px] h-20 bg-gradient-to-b from-neon-green to-transparent" />
                            <ChevronDown className="w-4 h-4 text-neon-green/40" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative Branding */}
            <div className="absolute left-10 md:left-24 bottom-24 hidden lg:block vertical-text">
                <span className="font-outfit text-[9px] tracking-[1em] uppercase text-white/10">
                    CHRIST UNIVERSITY • BSC COMPUTER SCIENCE
                </span>
            </div>

            <div className="absolute right-10 md:right-24 bottom-24 hidden lg:block vertical-text">
                <span className="font-outfit text-[9px] tracking-[1em] uppercase text-white/10">
                    FULL STACK • APP DEV • DATA SCIENCE
                </span>
            </div>
        </section>
    );
}
