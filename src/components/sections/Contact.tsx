"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

export default function Contact() {
    const socials = [
        { icon: <Github className="w-5 h-5" />, link: "https://github.com/LDHANUSHRAJ", label: "GitHub" },
        { icon: <Linkedin className="w-5 h-5" />, link: "https://www.linkedin.com/in/ldhanushraj", label: "LinkedIn" },
        { icon: <Instagram className="w-5 h-5" />, link: "#", label: "Instagram" },
        { icon: <Mail className="w-5 h-5" />, link: "mailto:virtuosodhanush@gmail.com", label: "Email" },
    ];

    return (
        <section id="contact" className="relative py-32 bg-obsidian overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="font-jakarta text-[10px] tracking-[0.6em] uppercase text-neon-green mb-8">Get in touch</h2>
                        <h3 className="font-outfit text-5xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85]">
                            LET&apos;S ARCHITECT <br />
                            <span className="text-neon-green italic">SUCCESS</span>
                        </h3>
                        <p className="font-jakarta text-gray-500 max-w-xl mx-auto text-lg md:text-xl leading-relaxed">
                            Open for high-stakes technical consulting, strategic partnerships, and enterprise-grade automation projects.
                        </p>
                    </motion.div>

                    {/* Contact Button */}
                    <motion.a
                        href="mailto:virtuosodhanush@gmail.com"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative p-[1px] group overflow-hidden rounded-full mb-32"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-green via-electric-blue to-vivid-orange animate-spin-slow group-hover:duration-200" />
                        <div className="relative px-20 py-8 bg-obsidian rounded-full font-outfit font-bold text-sm tracking-[0.4em] uppercase text-white transition-colors group-hover:text-neon-green">
                            INITIALIZE PROJECT
                        </div>
                    </motion.a>

                    {/* Socials */}
                    <div className="flex gap-12 mb-32">
                        {socials.map((social, idx) => (
                            <motion.a
                                key={idx}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -8, color: "#39FF14" }}
                                className="text-gray-600 transition-all duration-300"
                                aria-label={social.label}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>

                    {/* Footer Branding */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-white/5 items-center">
                        <div className="md:text-left order-2 md:order-1">
                            <p className="font-jakarta text-[9px] tracking-[0.4em] text-gray-600 uppercase">
                                © 2026 L DHANUSH RAJ. ALL RIGHTS RESERVED.
                            </p>
                        </div>
                        <div className="flex justify-center order-1 md:order-2">
                            <span className="font-outfit font-black text-2xl tracking-tighter group cursor-pointer">
                                DR<span className="text-neon-green group-hover:text-electric-blue transition-colors duration-700">.</span>
                            </span>
                        </div>
                        <div className="md:text-right order-3">
                            <p className="font-jakarta text-[9px] tracking-[0.4em] text-gray-600 uppercase">
                                DESIGNED FOR THE BOLD
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deep Background Decor */}
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-neon-green/5 rounded-full blur-[180px] -z-10" />
        </section >
    );
}
