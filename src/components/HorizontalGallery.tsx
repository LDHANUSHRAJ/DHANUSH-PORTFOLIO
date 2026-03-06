"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowUpRight, Palette, Cpu, Zap, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const luxuryExpertise = [
    {
        title: "Flexible & Precise Manufacturing",
        description: "We turn designs into high-quality products by blending advanced technology with craftsmanship. Combining industrial precision and handcrafted detail across wood, metal, crystal, leather, 3D printing, and more. Our flexible manufacturing delivers customized solutions with consistent quality and accuracy.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
        icon: <Palette className="w-6 h-6" />,
        features: [
            "Powered by ten integrated production lines.",
            "Flexible, multi-material manufacturing techniques.",
            "Large-scale gifting and printing operations.",
            "Managing small to large production runs."
        ]
    },
    {
        title: "Communication Solutions & Events",
        description: "We turn gifts and interactive experiences into effective communication tools within campaigns and events. We design and execute integrated experiences that connect design, message, and occasion into one cohesive story.",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
        icon: <Globe className="w-6 h-6" />,
        features: [
            "Designing and managing seasonal events at scale.",
            "Developing interactive event gifts and experiences.",
            "Cultural and national occasion solutions.",
            "Consulting on gifts for communication strategies."
        ]
    },
    {
        title: "Digital Ecosystems & AI",
        description: "We develop intelligent digital platforms for national and cultural occasions. Our AI-driven solutions enhance user engagement and provide seamless interactive experiences across all touchpoints, ensuring your message resonates in the digital age.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        icon: <Zap className="w-6 h-6" />,
        features: [
            "AI-powered interactive storytelling.",
            "High-end web and mobile applications.",
            "Scalable back-end infrastructure for massive events.",
            "Data-driven design and audience analytics."
        ]
    }
];

export default function HorizontalGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !containerRef.current) return;

        const ctx = gsap.context(() => {
            if (!containerRef.current) return;
            const horizontalLength = containerRef.current.scrollWidth - window.innerWidth;

            gsap.to(containerRef.current, {
                x: -horizontalLength,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + horizontalLength,
                    invalidateOnRefresh: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="expertise" ref={sectionRef} className="relative min-h-screen bg-transparent overflow-hidden">
            <div className="absolute top-24 left-10 md:left-24 z-20">
                <h2 className="text-sm tracking-[0.4em] uppercase text-primary mb-4">Our Expertise</h2>
                <h3 className="text-5xl md:text-8xl font-light luxury-text italic">The Art of <span className="font-bold not-italic">Creation</span></h3>
            </div>

            <div
                ref={containerRef}
                className="flex gap-12 px-10 md:px-24 h-screen items-center"
                style={{ width: "fit-content" }}
            >
                {luxuryExpertise.map((project, index) => (
                    <div
                        key={index}
                        className="w-[90vw] md:w-[85vw] h-[80vh] flex-shrink-0 relative group"
                    >
                        <div className="w-full h-full green-3d-gradient backdrop-blur-xl rounded-[60px] overflow-hidden border border-white/10 flex flex-col md:flex-row transition-all duration-700 group-hover:border-primary/30">
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 h-2/5 md:h-full relative overflow-hidden p-8 md:p-12">
                                <div className="w-full h-full rounded-[40px] overflow-hidden relative shadow-2xl">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d09]/60 to-transparent"></div>
                                </div>
                            </div>

                            {/* Text Section */}
                            <div className="w-full md:w-1/2 h-3/5 md:h-full p-10 md:p-20 flex flex-col justify-center">
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-700 shadow-[0_0_20px_rgba(204,255,0,0.1)]">
                                        {project.icon}
                                    </div>
                                    <h4 className="text-3xl md:text-5xl font-bold luxury-text leading-tight">{project.title}</h4>
                                </div>

                                <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-12 font-light">
                                    {project.description}
                                </p>

                                <ul className="space-y-6 mb-12">
                                    {project.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-sm md:text-md font-medium tracking-wide">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0 gold-glow"></div>
                                            <span className="opacity-70">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto">
                                    <button className="flex items-center gap-3 text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 hover:text-primary transition-colors group/btn">
                                        Explore Deeply <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
