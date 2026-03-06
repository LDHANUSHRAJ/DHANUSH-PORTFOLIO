"use client";

import { motion } from "framer-motion";

export default function Story() {
    return (
        <section className="relative py-32 bg-obsidian overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center"
                    >
                        <div className="lg:col-span-12">
                            <h2 className="font-outfit text-xs md:text-sm tracking-[0.5em] uppercase text-electric-blue mb-8">Professional Philosophy</h2>

                            <h3 className="font-outfit text-4xl md:text-6xl font-medium leading-[1.1] mb-12 tracking-tight">
                                “Building <span className="text-neon-green">Next-Generation</span> Solutions where Code meets Creativity.”
                            </h3>
                        </div>

                        <div className="lg:col-span-7">
                            <p className="font-jakarta text-gray-400 text-lg md:text-xl leading-relaxed">
                                As the <span className="text-white italic">Founder & COO of Site2Success</span>, I lead cross-functional teams to deliver enterprise-grade automation and web solutions. My journey is defined by a relentless drive for efficiency, currently bridged by academic excellence at <span className="text-white">Christ University</span> while pursuing my BSc in Computer Science.
                            </p>
                            <p className="mt-8 font-jakarta text-gray-500 text-base md:text-lg">
                                I specialize in creating intelligent systems that solve real-world complexities, from high-performance web applications to advanced AI-driven automation workflows.
                            </p>
                        </div>

                        <div className="lg:col-span-5 grid grid-cols-2 gap-8 py-8 border-l border-white/10 pl-10">
                            <div className="space-y-2">
                                <span className="block font-outfit text-xs tracking-[0.2em] uppercase text-gray-600">Education</span>
                                <span className="block font-jakarta text-sm font-medium text-white">Christ University</span>
                                <span className="block font-jakarta text-xs text-gray-500">BSc Computer Science</span>
                            </div>
                            <div className="space-y-2">
                                <span className="block font-outfit text-xs tracking-[0.2em] uppercase text-gray-600">Leadership</span>
                                <span className="block font-jakarta text-sm font-medium text-white">Founder & COO</span>
                                <span className="block font-jakarta text-xs text-gray-500">Site2Success</span>
                            </div>
                            <div className="space-y-2">
                                <span className="block font-outfit text-xs tracking-[0.2em] uppercase text-gray-600">Focus</span>
                                <span className="block font-jakarta text-sm font-medium text-white">AI Automation</span>
                                <span className="block font-jakarta text-xs text-gray-500">Full Stack Apps</span>
                            </div>
                            <div className="space-y-2">
                                <span className="block font-outfit text-xs tracking-[0.2em] uppercase text-gray-600">Region</span>
                                <span className="block font-jakarta text-sm font-medium text-white">Global Presence</span>
                                <span className="block font-jakarta text-xs text-gray-500">Based in India</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
