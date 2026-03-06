"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section className="relative py-32 px-6 overflow-hidden bg-[#f2f2f2]">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Interactive Bio */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="technical-label"
                            >
                                [ CORE_MISSION ]
                            </motion.span>
                            <h2 className="text-5xl md:text-7xl font-black text-[#333333] luxury-text leading-none">
                                ABOUT <span className="text-primary italic">ME</span>
                            </h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6 text-lg text-[#666666] leading-relaxed max-w-xl font-medium"
                        >
                            <p>
                                I am <span className="text-[#333333] font-bold">L DHANUSH RAJ</span>, an AI enthusiast, developer, and entrepreneur passionate about building innovative technology solutions.
                            </p>
                            <p>
                                I enjoy creating digital platforms, experimenting with modern web technologies, and developing products that solve real-world problems.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                "BUILDING INTELLIGENT APPLICATIONS",
                                "DESIGNING INTERACTIVE EXPERIENCES",
                                "DEVELOPING SCALABLE PLATFORMS",
                                "EXPLORING FUTURISTIC CONCEPTS"
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 p-5 bg-white border border-[#333333]/5 rounded-2xl shadow-sm hover:border-primary transition-all duration-300 group"
                                >
                                    <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                                    <span className="text-[10px] font-black tracking-widest text-[#333333]">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Portfolio Identity Visual */}
                    <div className="relative aspect-square md:aspect-video lg:aspect-square flex items-center justify-center">
                        <motion.div
                            initial={{ rotate: -5, opacity: 0, scale: 0.9 }}
                            whileInView={{ rotate: 0, opacity: 1, scale: 1 }}
                            whileHover={{ rotate: 2, scale: 1.02 }}
                            className="w-full h-full glass-card technical-decoration overflow-hidden flex flex-col items-center justify-center p-8 text-center"
                        >
                            <div className="relative w-full h-3/4 rounded-[40px] overflow-hidden mb-8 group shadow-xl bg-gradient-to-br from-[#f2f2f2] to-white border border-[#333333]/5">
                                <Image
                                    src="/images/profile.png"
                                    alt="L Dhanush Raj"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/30 via-transparent to-transparent opacity-40" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-[#333333] font-black tracking-[0.4em] uppercase text-[10px]">IDENTITY_NODE: ONLINE</p>
                                <p className="text-[9px] text-[#666666] tracking-[0.2em] uppercase font-bold max-w-xs opacity-60">
                                    "TECHNOLOGY SHOULD BE CREATIVE, IMPACTFUL, AND ACCESSIBLE."
                                </p>
                            </div>
                        </motion.div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 blur-3xl rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-blue/5 blur-3xl rounded-full" />
                    </div>
                </div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
        </section>
    );
}
