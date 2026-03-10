"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Code2, Brain, Rocket, Globe } from "lucide-react";

const expertise = [
    {
        id: "01",
        title: "AI & Machine Learning",
        category: "INTELLIGENCE_SYSTEMS",
        description: "Building intelligent applications powered by AI — from chatbots and recommendation engines to predictive models. I integrate modern AI APIs and custom models to create smart, responsive user experiences.",
        icon: Brain,
        skills: ["AI API Integration", "Chatbot Development", "Prompt Engineering", "Intelligent Automation"],
    },
    {
        id: "02",
        title: "Full-Stack Development",
        category: "DIGITAL_ENGINEERING",
        description: "End-to-end web and mobile development using modern frameworks. From architecting scalable back-ends to crafting pixel-perfect front-ends, I deliver complete digital products that perform.",
        icon: Code2,
        skills: ["Next.js / React", "Node.js / Express", "Firebase / Supabase", "TypeScript"],
    },
    {
        id: "03",
        title: "Product & Entrepreneurship",
        category: "VENTURE_BUILDING",
        description: "Serial builder — from EataCup (edible zero-waste cups) to Vanguard Digital (tech consultancy). I turn ideas into scalable ventures, managing everything from concept and MVP to launch and growth.",
        icon: Rocket,
        skills: ["Product Strategy", "MVP Development", "Market Research", "Digital Ventures"],
    },
    {
        id: "04",
        title: "Interactive Experiences",
        category: "CREATIVE_TECHNOLOGY",
        description: "Creating immersive, high-impact digital experiences using Three.js, GSAP, and advanced animations. I design motion-rich interfaces that captivate users and elevate brands above the noise.",
        icon: Globe,
        skills: ["Three.js / WebGL", "GSAP Animations", "Motion Design", "Creative UI/UX"],
    },
];

export default function HorizontalGallery() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const goTo = (index: number) => {
        if (index === current) return;
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    };

    const prev = () => { if (current > 0) goTo(current - 1); };
    const next = () => { if (current < expertise.length - 1) goTo(current + 1); };

    const item = expertise[current];
    const Icon = item.icon;

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
    };

    return (
        <section className="py-24 bg-[#f2f2f2]">
            <div className="max-w-7xl mx-auto px-6 md:px-16">

                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase text-[#5a7d9a] block mb-4">
                            [ CORE_EXPERTISE ]
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black luxury-text text-[#333333] leading-none">
                            WHAT I&nbsp;
                            <span className="italic text-[#5a7d9a]">BUILD</span>
                        </h2>
                    </div>

                    {/* counter + arrows */}
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black tracking-widest text-[#333333]/30 uppercase">
                            {String(current + 1).padStart(2, "0")} / {String(expertise.length).padStart(2, "0")}
                        </span>
                        <button
                            onClick={prev}
                            disabled={current === 0}
                            aria-label="Previous"
                            className="w-12 h-12 rounded-full border border-[#333333]/15 flex items-center justify-center hover:border-[#5a7d9a] hover:text-[#5a7d9a] transition-all disabled:opacity-20 disabled:cursor-not-allowed text-[#333333]"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={next}
                            disabled={current === expertise.length - 1}
                            aria-label="Next"
                            className="w-12 h-12 rounded-full bg-[#333333] text-white flex items-center justify-center hover:bg-[#5a7d9a] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Card area — fixed height so page doesn't jump */}
                <div className="relative" style={{ minHeight: 420 }}>
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                        >
                            {/* Large active card */}
                            <div className="bg-[#333333] rounded-[32px] p-8 md:p-12 flex flex-col gap-6 text-white min-h-[400px]">
                                <div className="flex items-start justify-between">
                                    <span className="text-[10px] font-black tracking-[0.5em] uppercase text-[#5a7d9a]">
                                        {item.id} — {item.category}
                                    </span>
                                </div>

                                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-[#5a7d9a]">
                                    <Icon className="w-8 h-8" />
                                </div>

                                <h3 className="text-3xl md:text-4xl font-black luxury-text leading-tight">
                                    {item.title}
                                </h3>

                                <p className="text-white/70 text-sm leading-relaxed font-medium flex-grow">
                                    {item.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/10">
                                    {item.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 rounded-full bg-white/10 text-white/60 text-[9px] font-black tracking-widest uppercase"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar: other cards preview */}
                            <div className="flex flex-col gap-4">
                                {expertise.filter((_, i) => i !== current).map((e, i) => {
                                    const SideIcon = e.icon;
                                    const realIndex = expertise.indexOf(e);
                                    return (
                                        <button
                                            key={e.id}
                                            onClick={() => goTo(realIndex)}
                                            className="bg-white rounded-[24px] p-6 flex items-center gap-5 text-left border border-[#333333]/5 hover:border-[#5a7d9a]/30 hover:shadow-md transition-all group"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-[#f2f2f2] flex items-center justify-center text-[#5a7d9a] flex-shrink-0 group-hover:bg-[#5a7d9a]/10 transition-colors">
                                                <SideIcon className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-[9px] font-black tracking-[0.3em] uppercase text-[#5a7d9a] block mb-1">
                                                    {e.category}
                                                </span>
                                                <span className="text-sm font-black text-[#333333] luxury-text truncate block">
                                                    {e.title}
                                                </span>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-[#333333]/20 group-hover:text-[#5a7d9a] transition-colors ml-auto flex-shrink-0" />
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-3 mt-10">
                    {expertise.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`rounded-full transition-all duration-300 ${i === current
                                    ? "w-8 h-2 bg-[#5a7d9a]"
                                    : "w-2 h-2 bg-[#333333]/15 hover:bg-[#5a7d9a]/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
