"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const techStack = [
    { name: "NEXT.JS", level: 95 },
    { name: "TYPESCRIPT", level: 90 },
    { name: "THREE.JS", level: 85 },
    { name: "TAILWIND", level: 95 },
    { name: "FIREBASE", level: 80 },
    { name: "NODE.JS", level: 88 }
];

export default function StorytellingStrip() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Paper roll "unfurl" effect
    const rotateX = useTransform(scrollYProgress, [0, 0.2], [45, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <section ref={containerRef} className="relative py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    style={{
                        rotateX,
                        scale,
                        opacity,
                        perspective: "1000px",
                        transformOrigin: "top"
                    }}
                    className="relative bg-[#f2f2f2] border border-[#333333]/5 rounded-[40px] p-12 md:p-24 shadow-inner"
                >
                    {/* Top Edge Shadow (Paper Roll effect) */}
                    <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#333333]/5 to-transparent rounded-t-[40px]" />

                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div>
                            <span className="technical-label">[ TECH_STACK_CORE ]</span>
                            <h2 className="text-4xl md:text-7xl font-black text-[#333333] luxury-text leading-none mt-4">
                                ENGINE <br />
                                <span className="text-primary italic">CAPABILITIES</span>
                            </h2>
                        </div>
                        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#333333]/40 max-w-xs text-right">
                            LEVERAGING MODERN FRAMEWORKS TO ARCHITECT HIGH-PERFORMANCE DIGITAL ECOSYSTEMS.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {techStack.map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="space-y-4"
                            >
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-black text-[#333333] tracking-widest">{tech.name}</span>
                                    <span className="text-[10px] font-bold text-primary">{tech.level}%</span>
                                </div>
                                <div className="h-1 w-full bg-[#333333]/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${tech.level}%` }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Edge Shadow */}
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#333333]/5 to-transparent rounded-b-[40px]" />
                </motion.div>
            </div>
        </section>
    );
}
