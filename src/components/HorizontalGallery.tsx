"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Code2, Brain, Rocket, Globe } from "lucide-react";

const expertise = [
    {
        id: "01",
        title: "AI & Machine Learning",
        category: "INTELLIGENCE_SYSTEMS",
        description: "Building intelligent applications powered by AI — from chatbots and recommendation engines to predictive models. I integrate modern AI APIs and custom models to create smart, responsive user experiences.",
        icon: <Brain className="w-8 h-8" />,
        skills: ["AI API Integration", "Chatbot Development", "Prompt Engineering", "Intelligent Automation"],
        color: "#5a7d9a"
    },
    {
        id: "02",
        title: "Full-Stack Development",
        category: "DIGITAL_ENGINEERING",
        description: "End-to-end web and mobile development using modern frameworks. From architecting scalable back-ends to crafting pixel-perfect front-ends, I deliver complete digital products that perform.",
        icon: <Code2 className="w-8 h-8" />,
        skills: ["Next.js / React", "Node.js / Express", "Firebase / Supabase", "TypeScript"],
        color: "#5a7d9a"
    },
    {
        id: "03",
        title: "Entrepreneurship & Products",
        category: "VENTURE_BUILDING",
        description: "Serial builder — from EataCup (edible zero-waste cups) to Vanguard Digital (tech consultancy). I turn ideas into scalable ventures, managing everything from concept and MVP to launch and growth.",
        icon: <Rocket className="w-8 h-8" />,
        skills: ["Product Strategy", "MVP Development", "Market Research", "Digital Ventures"],
        color: "#5a7d9a"
    },
    {
        id: "04",
        title: "Interactive Experiences",
        category: "CREATIVE_TECHNOLOGY",
        description: "Creating immersive, high-impact digital experiences using Three.js, GSAP, and advanced animations. I design motion-rich interfaces that captivate users and elevate brands above the noise.",
        icon: <Globe className="w-8 h-8" />,
        skills: ["Three.js / WebGL", "GSAP Animations", "Motion Design", "Creative UI/UX"],
        color: "#5a7d9a"
    }
];

export default function HorizontalGallery() {
    const [current, setCurrent] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    const goTo = (index: number) => {
        const clamped = Math.max(0, Math.min(index, expertise.length - 1));
        setCurrent(clamped);
        if (trackRef.current) {
            const card = trackRef.current.children[clamped] as HTMLElement;
            card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
    };

    return (
        <section className="py-24 bg-[#f2f2f2] overflow-hidden">
            {/* Header */}
            <div className="px-6 md:px-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-[10px] font-black tracking-[0.5em] uppercase text-[#5a7d9a] block mb-4">
                        [ CORE_EXPERTISE ]
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black luxury-text text-[#333333] leading-none">
                        WHAT I<br />
                        <span className="italic text-[#5a7d9a]">BUILD</span>
                    </h2>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black tracking-widest text-[#333333]/30 uppercase mr-4">
                        {String(current + 1).padStart(2, "0")} / {String(expertise.length).padStart(2, "0")}
                    </span>
                    <button
                        onClick={() => goTo(current - 1)}
                        disabled={current === 0}
                        className="w-12 h-12 rounded-full border border-[#333333]/10 flex items-center justify-center hover:border-[#5a7d9a] hover:text-[#5a7d9a] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => goTo(current + 1)}
                        disabled={current === expertise.length - 1}
                        className="w-12 h-12 rounded-full bg-[#333333] text-white flex items-center justify-center hover:bg-[#5a7d9a] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Cards Track - CSS scroll-snap, no GSAP */}
            <div
                ref={trackRef}
                className="flex gap-6 px-6 md:px-16 overflow-x-auto pb-6"
                style={{
                    scrollSnapType: "x mandatory",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {expertise.map((item, i) => (
                    <motion.div
                        key={item.id}
                        onClick={() => setCurrent(i)}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="flex-shrink-0 cursor-pointer"
                        style={{
                            scrollSnapAlign: "start",
                            width: "clamp(280px, 75vw, 540px)",
                        }}
                    >
                        <div
                            className={`relative h-full min-h-[480px] rounded-[32px] p-8 md:p-10 flex flex-col gap-6 border transition-all duration-500 ${i === current
                                    ? "bg-[#333333] border-[#333333] text-white shadow-2xl"
                                    : "bg-white border-[#333333]/5 text-[#333333] hover:border-[#5a7d9a]/30"
                                }`}
                        >
                            {/* Number */}
                            <span
                                className={`text-[11px] font-black tracking-[0.4em] uppercase ${i === current ? "text-[#5a7d9a]" : "text-[#5a7d9a]"
                                    }`}
                            >
                                {item.id}
                            </span>

                            {/* Icon */}
                            <div
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${i === current ? "bg-white/10" : "bg-[#f2f2f2]"
                                    }`}
                                style={{ color: "#5a7d9a" }}
                            >
                                {item.icon}
                            </div>

                            {/* Category */}
                            <span
                                className={`text-[9px] font-black tracking-[0.4em] uppercase ${i === current ? "text-white/40" : "text-[#333333]/30"
                                    }`}
                            >
                                {item.category}
                            </span>

                            {/* Title */}
                            <h3 className="text-2xl md:text-3xl font-black luxury-text leading-tight">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p
                                className={`text-sm leading-relaxed font-medium flex-grow ${i === current ? "text-white/70" : "text-[#666666]"
                                    }`}
                            >
                                {item.description}
                            </p>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {item.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className={`px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase ${i === current
                                                ? "bg-white/10 text-white/70"
                                                : "bg-[#f2f2f2] text-[#333333]/50"
                                            }`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-8">
                {expertise.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`rounded-full transition-all duration-300 ${i === current
                                ? "w-8 h-2 bg-[#5a7d9a]"
                                : "w-2 h-2 bg-[#333333]/10 hover:bg-[#5a7d9a]/40"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
