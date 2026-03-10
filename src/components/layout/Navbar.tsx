"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
    const navItems = [
        { name: "HOME", href: "#hero" },
        { name: "STORY", href: "#story" },
        { name: "PROJECTS", href: "#track" },
        { name: "SKILLS", href: "#skills" },
        { name: "EXPERIMENTS", href: "#off-track" },
        { name: "CONTACT", href: "#contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-10 antialiased">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="font-outfit font-black text-2xl tracking-tighter group">
                    DR<span className="text-neon-green group-hover:text-electric-blue transition-colors duration-500">.</span>
                </Link>

                <div className="hidden md:flex gap-16 backdrop-blur-md px-10 py-4 rounded-full border border-white/5 glass">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="font-outfit text-[10px] font-bold tracking-[0.5em] text-gray-400 hover:text-neon-green transition-all duration-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden lg:flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-neon-green shadow-glow-green" />
                    <span className="font-outfit text-[10px] tracking-[0.4em] text-white/40 uppercase">
                        Site2Success Founder
                    </span>
                </div>
            </div>
        </nav>
    );
}
