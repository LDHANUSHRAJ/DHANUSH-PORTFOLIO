"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";

const experiments = [
    {
        id: 1,
        title: "Neural Synapse Viz",
        category: "AI Research",
        description: "Visualizing real-time neural activations in deep convolutional layers using custom WebGL shaders.",
        image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Prism UI Protocol",
        category: "Design Systems",
        description: "An experimental design framework focused on hyper-dynamic light surfaces and physical glass simulations.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Lidar Surface Core",
        category: "Hardware Engineering",
        description: "Direct hardware-to-browser mapping of Lidar point clouds for real-time 3D spatial reconstruction.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Hyper-City Engine",
        category: "Graphics Dev",
        description: "Performance-focused city simulation utilizing instanced rendering and automated procedural generation.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Sonic Flow Generative",
        category: "Creative Audio",
        description: "A generative audio architecture where visual fractals are influenced by live spectral analysis data.",
        image: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1000&auto=format&fit=crop"
    },
];

export default function OffTrack() {
    const targetRef = useRef<HTMLDivElement>(null);
    const [selectedExp, setSelectedExp] = useState<null | typeof experiments[0]>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section id="off-track" ref={targetRef} className="relative h-[300vh] bg-obsidian border-t border-white/5">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                <div className="container mx-auto px-6 mb-16 flex justify-between items-end">
                    <div>
                        <h2 className="font-jakarta text-[10px] tracking-[0.5em] uppercase text-vivid-orange mb-4">Experimental</h2>
                        <h3 className="font-outfit text-5xl md:text-8xl font-extrabold tracking-tighter">OFF <span className="text-gray-800">TRACK</span></h3>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="font-jakarta text-gray-500 max-w-xs text-sm ml-auto leading-relaxed">
                            Where technical curiosity meets creative execution.
                        </p>
                    </div>
                </div>

                <motion.div style={{ x }} className="flex gap-10 px-6 md:px-24">
                    {experiments.map((item) => (
                        <motion.div
                            key={item.id}
                            onClick={() => setSelectedExp(item)}
                            className="relative flex-shrink-0 w-[85vw] md:w-[600px] aspect-[16/10] group cursor-pointer"
                        >
                            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-carbon border border-white/5 transition-all duration-700 group-hover:border-vivid-orange/40 group-hover:scale-[0.98]">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover opacity-20 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-10 left-10 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                                    <p className="text-[10px] font-jakarta tracking-[0.4em] text-vivid-orange uppercase mb-3 font-bold">{item.category}</p>
                                    <h4 className="text-3xl md:text-4xl font-outfit font-bold text-white tracking-tight mb-4">{item.title}</h4>
                                    <div className="flex items-center gap-2 text-white/40 text-[10px] tracking-widest font-jakarta uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                        Explore <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <div className="flex-shrink-0 w-24 md:w-96 h-10" />
                </motion.div>

                {/* Scroll Progress Bar */}
                <div className="container mx-auto px-6 mt-20">
                    <div className="h-[2px] w-full bg-white/5 relative rounded-full overflow-hidden">
                        <motion.div
                            style={{ scaleX: scrollYProgress }}
                            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-vivid-orange to-electric-blue origin-left"
                        />
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedExp && (
                    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-6 backdrop-blur-3xl">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedExp(null)}
                            className="fixed inset-0 bg-obsidian/80 cursor-pointer"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-2xl bg-carbon p-12 rounded-3xl border border-white/10 shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedExp(null)}
                                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="relative aspect-video rounded-xl overflow-hidden mb-10">
                                <Image
                                    src={selectedExp.image}
                                    alt={selectedExp.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <span className="font-jakarta text-[10px] tracking-[0.4em] uppercase text-vivid-orange mb-4 block">
                                {selectedExp.category}
                            </span>
                            <h3 className="font-outfit text-4xl font-bold text-white mb-6 tracking-tighter">
                                {selectedExp.title}
                            </h3>
                            <p className="font-jakarta text-gray-400 text-lg leading-relaxed mb-8">
                                {selectedExp.description}
                            </p>

                            <div className="p-4 rounded-xl glass border border-white/5 text-center">
                                <span className="font-jakarta text-[10px] tracking-[0.2em] text-white/40 uppercase">Details coming soon to GitHub</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
