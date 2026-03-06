"use client";

import { motion } from "framer-motion";

const title = "ENGINEERING THE FUTURE";
const subtitle = "EXPERIMENTING WITH TECHNOLOGY & CREATIVITY TO BUILD IMPACTFUL DIGITAL SOLUTIONS";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-[120px] bg-white">
            {/* Subtle Grid Overlay - Light Mode */}
            <div className="absolute inset-0 grid-overlay active opacity-40 pointer-events-none" />

            <div className="z-10 max-w-7xl w-full flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    {/* Professional Branding */}
                    <div className="overflow-hidden mb-8">
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-primary">
                                L DHANUSH RAJ
                            </span>
                            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-[#333333]/40">
                                AI ENTHUSIAST • DEVELOPER • ENTREPRENEUR
                            </span>
                        </motion.div>
                    </div>

                    {/* Character Reveal Heading - Outfit Font */}
                    <h1 className="text-5xl md:text-[90px] font-black leading-[0.9] tracking-tight mb-12 luxury-text text-[#333333]">
                        {title.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.2 + i * 0.02,
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="inline-block"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Reveal Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="text-[11px] md:text-[13px] text-[#666666] mb-16 max-w-2xl mx-auto leading-relaxed font-bold tracking-[0.3em] uppercase"
                    >
                        {subtitle}
                    </motion.p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
                        <motion.button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.8 }}
                            className="magnetic-item px-10 py-5 bg-[#333333] text-white text-[10px] font-black tracking-[0.4em] uppercase hover:bg-primary transition-all duration-500 rounded-full shadow-xl shadow-primary/10"
                        >
                            View My Work
                        </motion.button>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            className="magnetic-item px-10 py-5 border-2 border-[#333333]/10 text-[10px] font-black tracking-[0.4em] uppercase text-[#333333] hover:border-primary hover:text-primary transition-all duration-500 rounded-full"
                        >
                            Explore Projects
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Subtle Blue/Gray Glows - Adjusted for Light Theme */}
            <div className="absolute top-[20%] left-[15%] w-[40vw] h-[40vw] bg-[#5a7d9a]/[0.05] blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[15%] right-[10%] w-[50vw] h-[50vw] bg-[#7fa7c4]/[0.03] blur-[180px] rounded-full pointer-events-none" />
        </section>
    );
}
