"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowUpRight, Palette, Cpu, Zap, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const luxuryExpertise = [
    {
        title: "Flexible & Precise Manufacturing",
        description: "I turn ideas into high-quality products by blending advanced technology with craftsmanship — covering web, mobile, 3D, and more. Flexible execution with consistent quality across every project.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
        icon: <Palette className="w-6 h-6" />,
        features: [
            "Rapid prototyping & iteration cycles.",
            "Multi-platform development expertise.",
            "Scalable architecture from day one.",
            "End-to-end product ownership.",
        ]
    },
    {
        title: "Digital Ecosystems & AI",
        description: "I build intelligent digital platforms and AI-driven solutions that enhance user engagement and provide seamless interactive experiences across all touchpoints.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        icon: <Zap className="w-6 h-6" />,
        features: [
            "AI-powered interactive applications.",
            "High-end web & mobile experiences.",
            "Scalable back-end infrastructure.",
            "Data-driven design & analytics.",
        ]
    },
    {
        title: "Communication & Brand Systems",
        description: "I craft communication-first digital experiences — transforming brand identity into cohesive narratives through design, messaging, and interactive events.",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
        icon: <Globe className="w-6 h-6" />,
        features: [
            "Brand identity & visual systems.",
            "Interactive campaign experiences.",
            "Consulting on digital communication.",
            "Design systems & component libraries.",
        ]
    }
];

export default function HorizontalGallery() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const track = trackRef.current;
        if (!wrapper || !track) return;

        const ctx = gsap.context(() => {
            const totalScroll = track.scrollWidth - window.innerWidth;

            gsap.to(track, {
                x: -totalScroll,
                ease: "none",
                scrollTrigger: {
                    trigger: wrapper,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: () => "+=" + totalScroll,
                    invalidateOnRefresh: true,
                },
            });
        }, wrapper);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapperRef} className="overflow-hidden bg-[#f2f2f2]">
            {/* Section Header — in normal flow, no overlap */}
            <div className="px-10 md:px-24 pt-24 pb-10">
                <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#5a7d9a] mb-4">
                    Our Expertise
                </p>
                <h2 className="text-5xl md:text-7xl font-black luxury-text text-[#333333] italic">
                    The Art of{" "}
                    <span className="not-italic text-[#5a7d9a]">Creation</span>
                </h2>
            </div>

            {/* Horizontal scroll track */}
            <div
                ref={trackRef}
                className="flex gap-8 px-10 md:px-24 pb-16"
                style={{ width: "max-content" }}
            >
                {luxuryExpertise.map((item, index) => (
                    <div
                        key={index}
                        className="w-[80vw] md:w-[65vw] flex-shrink-0 bg-white rounded-[40px] border border-[#333333]/5 overflow-hidden flex flex-col md:flex-row shadow-sm"
                        style={{ height: "60vh", minHeight: 380 }}
                    >
                        {/* Image */}
                        <div className="w-full md:w-2/5 h-48 md:h-full relative overflow-hidden flex-shrink-0">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col justify-center p-8 md:p-12 gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-[#5a7d9a]/20 flex items-center justify-center text-[#5a7d9a]">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black luxury-text text-[#333333] leading-tight">
                                    {item.title}
                                </h3>
                            </div>

                            <p className="text-sm text-[#666666] leading-relaxed font-medium">
                                {item.description}
                            </p>

                            <ul className="space-y-3">
                                {item.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-3 text-xs font-bold tracking-wide text-[#333333]/60 uppercase">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#5a7d9a] mt-1 flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <button className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] uppercase text-[#5a7d9a] hover:opacity-60 transition-opacity mt-auto w-fit">
                                Explore <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
