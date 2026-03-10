"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "SITE2SUCCESS",
        category: "BUSINESS_AUTOMATION",
        description: "A digital platform designed to help businesses manage projects, workflows, and digital services efficiently.",
        features: ["User Authentication", "Dashboard System", "Service Management", "Business Automation"],
        tags: ["Next.js", "Firebase", "Node.js"]
    },
    {
        title: "LENZIFY",
        category: "E-COMMERCE",
        description: "An optical store platform built to manage eyewear products and provide a digital presence.",
        features: ["Product Catalogue", "Online Store", "Customer Management", "Modern Design"],
        tags: ["React", "Stripe", "Tailwind"]
    },
    {
        title: "CUSTOM PC BUILDER",
        category: "UTILITY_APP",
        description: "A futuristic app allowing users to build custom PCs with real-time price calculation.",
        features: ["Component Selection", "Dynamic Pricing", "Configuration Summary", "Printable List"],
        tags: ["TypeScript", "Three.js", "GSAP"]
    }
];

export default function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !triggerRef.current) return;

        // Use gsap.context so ONLY this component's triggers are reverted on cleanup
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current!,
                { translateX: 0 },
                {
                    translateX: "-200vw",
                    ease: "none",
                    duration: 1,
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: () => `+=${window.innerWidth * 2}`,
                        scrub: 0.6,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true
                    }
                }
            );
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={triggerRef} className="overflow-hidden bg-white">
            <div ref={sectionRef} className="h-screen w-[300vw] flex items-center relative">

                {/* Horizontal Background Text - Very Subtle */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none opacity-[0.02]">
                    <span className="text-[20vw] font-black text-[#333333] luxury-text">FEATURED_WORKS_FEATURED_WORKS</span>
                </div>

                {projects.map((project, index) => (
                    <div key={index} className="h-screen w-screen flex items-center justify-center p-6 md:p-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            {/* Project Visual Placeholder/Detail */}
                            <div className="relative aspect-video lg:aspect-square bg-[#f2f2f2] rounded-3xl overflow-hidden group border border-[#333333]/5">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-9xl font-black text-[#333333]/5 luxury-text">0{index + 1}</span>
                                </div>
                                <div className="absolute bottom-8 left-8">
                                    <span className="technical-label opacity-40">PROJECT_INFRASTRUCTURE</span>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <span className="technical-label text-primary">{project.category}</span>
                                    <h3 className="text-4xl md:text-6xl font-black text-[#333333] luxury-text">{project.title}</h3>
                                </div>

                                <p className="text-base text-[#666666] leading-relaxed font-medium uppercase tracking-[0.1em]">
                                    {project.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    {project.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-1 h-1 bg-primary rounded-full" />
                                            <span className="text-[9px] font-bold text-[#333333] tracking-widest uppercase">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-3 pt-4">
                                    {project.tags.map((tag, i) => (
                                        <span key={tag + i} className="px-3 py-1 border border-[#333333]/10 text-[8px] font-black tracking-widest text-[#666666] rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="px-8 py-3 bg-[#333333] text-white text-[9px] font-black tracking-[0.4em] uppercase rounded-full mt-6"
                                >
                                    Explore Specs
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
}
