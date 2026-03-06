"use client";

import { motion } from "framer-motion";
import { Coffee, Zap, Globe, Heart, Rocket } from "lucide-react";

const startups = [
    {
        year: "2023",
        title: "EATACUP",
        description: "Visionary sustainability venture addressing global plastic waste through biodegradable, zero-waste edible cups.",
        icon: <Coffee className="w-5 h-5" />,
        status: "ACTIVE_PIONEERING",
        impact: "50K+ PLASTIC_UNITS_SAVED"
    },
    {
        year: "2024",
        title: "ELITE NUTRITION",
        description: "Personalized health platform for custom biometric-aligned nutrition. Engineered a modular engine for physical nourishment.",
        icon: <Zap className="w-5 h-5" />,
        status: "PROTOTYPE_STABLE",
        impact: "NUTRITION_ENGINE_V1"
    },
    {
        year: "2024",
        title: "VANGUARD DIGITAL",
        description: "Modern tech consultancy facilitating digital transformations for traditional brands. Focused on WebGL and AI systems.",
        icon: <Globe className="w-5 h-5" />,
        status: "SCALED_ACQUIRED",
        impact: "10+_SYSTEM_REBUILDS"
    },
    {
        year: "2025",
        title: "AURA AI",
        description: "Initiative to humanize artificial intelligence via reactive interfaces and emotional logic models.",
        icon: <Heart className="w-5 h-5" />,
        status: "DEVELOPMENT_PHASE",
        impact: "LOGIC_PATENT_PENDING"
    }
];

export default function StartupTimeline() {
    return (
        <section className="relative py-40 bg-[#f2f2f2] overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-left mb-32"
                >
                    <span className="technical-label block mb-6">[ INNOVATION_SEQUENCE ]</span>
                    <h3 className="text-5xl md:text-[100px] font-black leading-[0.8] tracking-tight uppercase text-[#333333] luxury-text">
                        VENTURE <span className="text-primary italic">LOGS</span>
                    </h3>
                </motion.div>

                <div className="relative border-l border-[#333333]/10 ml-4 md:ml-0">
                    {startups.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.15 }}
                            className="mb-32 last:mb-0 relative pl-12 md:pl-24"
                        >
                            {/* Technical Node */}
                            <div className="absolute -left-[4px] top-4 w-[8px] h-[8px] rounded-full bg-white border-2 border-primary shadow-lg shadow-primary/20" />

                            <div className="p-10 md:p-16 max-w-4xl group border border-[#333333]/5 hover:border-primary transition-all duration-500 rounded-3xl bg-white relative overflow-hidden shadow-sm hover:shadow-xl">
                                <span className="text-[10px] font-black text-primary/40 tracking-[0.4em] mb-6 block uppercase">{item.year}</span>

                                <div className="flex items-center gap-8 mb-8">
                                    <div className="w-12 h-12 rounded-xl border border-[#333333]/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-2xl md:text-5xl font-black uppercase tracking-tight text-[#333333] luxury-text group-hover:text-primary transition-colors">{item.title}</h4>
                                </div>

                                <p className="text-base text-[#666666] leading-relaxed mb-10 font-bold uppercase tracking-[0.1em] opacity-60 group-hover:opacity-100 transition-opacity max-w-3xl">
                                    {item.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-10 pt-8 border-t border-[#333333]/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1 h-1 rounded-full bg-primary" />
                                        <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 text-[#333333]">{item.status}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Rocket className="w-3.5 h-3.5 text-primary opacity-30" />
                                        <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 text-[#333333]">{item.impact}</span>
                                    </div>
                                </div>

                                {/* Minimal Data Stream Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.02] blur-[60px] rounded-full pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
        </section>
    );
}
