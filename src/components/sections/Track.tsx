"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, X, Code, Zap } from "lucide-react";
import { useState } from "react";

const projects = [
    {
        id: 1,
        title: "Site2Success Platform",
        description: "Enterprise SaaS ecosystem built for high-scale automation and strategic business intelligence.",
        fullDescription: "The Site2Success Platform is a flagship architecture designed for multi-tenant enterprise environments. It features a distributed event-driven core, real-time resource orchestration, and a sophisticated data lake for business intelligence. Built with a focus on 'Zero Trust' security and extreme scalability.",
        category: "Architecture / SaaS",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        color: "neon-green",
        tech: ["Next.js 15", "Node.js", "PostgreSQL", "AWS"],
        results: "Empowering 50+ businesses with automated operational workflows."
    },
    {
        id: 2,
        title: "Eco-Pulse AI",
        description: "Next-gen multi-agent AI framework for predictive environmental analytics and resource management.",
        fullDescription: "Eco-Pulse leverages advanced LLM chains and Retrieval-Augmented Generation (RAG) to process vast amounts of sensor data. It provides localized environmental forecasts and optimizes energy consumption in smart city infrastructures. The system utilizes custom vector embeddings for high-precision retrieval.",
        category: "AI / Automation",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        color: "electric-blue",
        tech: ["Python", "PyTorch", "LangGraph", "ChromaDB"],
        results: "Reduced data processing latency by 70% using optimized RAG pipelines."
    },
    {
        id: 3,
        title: "Neural Vision Core",
        description: "Deep learning computer vision system for real-time edge detection and object classification.",
        fullDescription: "A high-performance computer vision suite designed for industrial safety and autonomous monitoring. Neural Vision Core implements custom-trained CNN architectures optimized for edge hardware, delivering sub-10ms inference times. It features integrated thermal analysis and predictive anomaly detection.",
        category: "Computer Vision",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
        color: "vivid-orange",
        tech: ["C++", "TensorRT", "OpenCV", "MQTT"],
        results: "Achieved 99.8% accuracy in high-velocity industrial defect detection."
    }
];

export default function Track() {
    const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null);

    return (
        <section id="track" className="relative py-32 bg-obsidian">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
                    <div className="max-w-xl">
                        <h2 className="font-jakarta text-[10px] tracking-[0.5em] uppercase text-neon-green mb-4">Portfolio</h2>
                        <h3 className="font-outfit text-5xl md:text-8xl font-extrabold tracking-tighter text-white">
                            SQUAD <span className="text-gray-800 italic">GOALS</span>
                        </h3>
                    </div>
                    <p className="font-jakarta text-gray-500 max-w-xs text-sm leading-relaxed md:text-right">
                        Click to explore the technical architecture and impact of each project.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            layoutId={`project-${project.id}`}
                            onClick={() => setSelectedProject(project)}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-carbon border border-white/5 cursor-pointer"
                        >
                            <motion.div className="absolute inset-0 transition-transform duration-1000 ease-[0.33, 1, 0.68, 1] group-hover:scale-110">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover opacity-40 group-hover:opacity-20 transition-opacity duration-700"
                                />
                            </motion.div>

                            <div className="absolute inset-0 flex flex-col justify-end p-10">
                                <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className={`font-jakarta text-[10px] tracking-[0.3em] uppercase text-${project.color} mb-3 block`}>
                                        {project.category}
                                    </span>
                                    <h4 className="font-outfit text-3xl font-bold text-white mb-4 tracking-tight">
                                        {project.title}
                                    </h4>
                                    <div className="h-0.5 w-0 group-hover:w-16 bg-white/20 transition-all duration-500 mb-6" />
                                    <button className="flex items-center gap-2 font-outfit text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                                        View Specs <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="fixed inset-0 bg-obsidian/95 backdrop-blur-3xl cursor-pointer"
                        />

                        <motion.div
                            layoutId={`project-${selectedProject.id}`}
                            className="relative w-full max-w-6xl bg-carbon rounded-3xl overflow-hidden border border-white/10 z-10"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-8 right-8 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:scale-110 transition-transform"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative aspect-[16/10] lg:aspect-auto">
                                    <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-obsidian/50 to-transparent" />
                                </div>

                                <div className="p-10 md:p-16 flex flex-col justify-center">
                                    <span className={`font-jakarta text-xs tracking-[0.4em] uppercase text-${selectedProject.color} mb-6 block`}>
                                        {selectedProject.category}
                                    </span>
                                    <h3 className="font-outfit text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
                                        {selectedProject.title}
                                    </h3>

                                    <p className="font-jakarta text-gray-400 text-lg leading-relaxed mb-12">
                                        {selectedProject.fullDescription}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-white/40">
                                                <Code className="w-4 h-4" />
                                                <span className="text-[10px] tracking-widest uppercase">Stack</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.tech.map(t => (
                                                    <span key={t} className="px-3 py-1 rounded-full glass text-[10px] text-white/60">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-white/40">
                                                <Zap className="w-4 h-4" />
                                                <span className="text-[10px] tracking-widest uppercase">Impact</span>
                                            </div>
                                            <p className="font-jakarta text-sm text-white/80">{selectedProject.results}</p>
                                        </div>
                                    </div>

                                    <a
                                        href="#"
                                        className={`inline-flex items-center justify-center p-4 rounded-xl border border-white/10 glass font-outfit font-bold text-xs tracking-widest uppercase hover:bg-${selectedProject.color} hover:text-obsidian transition-all duration-500`}
                                    >
                                        Go Live <ArrowUpRight className="ml-2 w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
