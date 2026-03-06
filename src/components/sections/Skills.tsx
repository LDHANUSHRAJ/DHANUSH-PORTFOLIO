"use client";

import { motion } from "framer-motion";

const skillCategories = [
    {
        title: "Full Stack Dev",
        skills: ["Next.js 15", "TypeScript", "Node.js", "Prisma/Supabase"],
        color: "from-neon-green/10 to-transparent",
        accent: "bg-neon-green"
    },
    {
        title: "AI & Automation",
        skills: ["LLM Integration", "n8n / LangGraph", "Custom Agents", "RAG Systems"],
        color: "from-electric-blue/10 to-transparent",
        accent: "bg-electric-blue"
    },
    {
        title: "AI Chatbots",
        skills: ["Conversational UX", "Vercel AI SDK", "Voice Integration", "API Orchestration"],
        color: "from-vivid-orange/10 to-transparent",
        accent: "bg-vivid-orange"
    },
    {
        title: "Data Science",
        skills: ["Predictive Models", "Pandas / NumPy", "Visualization", "Statistical Analysis"],
        color: "from-neon-green/10 to-transparent",
        accent: "bg-neon-green"
    }
];

export default function Skills() {
    return (
        <section className="relative py-32 bg-obsidian border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div>
                        <h2 className="font-jakarta text-[10px] tracking-[0.5em] uppercase text-neon-green mb-4">Core Competencies</h2>
                        <h3 className="font-outfit text-4xl md:text-6xl font-bold tracking-tight leading-none text-white">
                            TECHNICAL <span className="text-gray-600">CAPABILITIES</span>
                        </h3>
                    </div>
                    <p className="max-w-md font-jakarta text-gray-500 text-lg leading-relaxed md:text-right">
                        Blending advanced computer science foundations with modern enterprise technologies.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="group relative p-8 glass hover:border-white/20 transition-all duration-500 rounded-lg overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                            <div className="flex justify-between items-start mb-12 relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
                                <h4 className="font-outfit text-xl font-bold text-white pr-4">{category.title}</h4>
                                <div className={`w-2 h-2 rounded-full ${category.accent} opacity-50 group-hover:opacity-100 shadow-glow-blue`} />
                            </div>

                            <ul className="space-y-4 relative z-10">
                                {category.skills.map((skill, sIdx) => (
                                    <li key={sIdx} className="flex items-center gap-3">
                                        <div className={`w-1 h-[1px] ${category.accent} opacity-20`} />
                                        <span className="font-jakarta text-sm text-gray-400 group-hover:text-white transition-colors duration-300">{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
