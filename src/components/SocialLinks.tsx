"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

const socialLinks = [
    { name: "GITHUB", icon: <Github className="w-4 h-4" />, url: "https://github.com/LDHANUSHRAJ" },
    { name: "LINKEDIN", icon: <Linkedin className="w-4 h-4" />, url: "https://www.linkedin.com/in/ldhanushraj" },
    { name: "INSTAGRAM", icon: <Instagram className="w-4 h-4" />, url: "#" },
    { name: "EMAIL", icon: <Mail className="w-4 h-4" />, url: "mailto:virtuosodhanush@gmail.com" }
];

export default function SocialLinks() {
    return (
        <div className="fixed left-8 bottom-0 z-50 hidden lg:flex flex-col items-center gap-8">
            <div className="flex flex-col gap-6">
                {socialLinks.map((social) => (
                    <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, x: 5, color: "#5A7D9A" }}
                        className="text-[#333333]/40 hover:text-primary transition-all duration-300 group relative"
                    >
                        {social.icon}
                        <span className="absolute left-10 top-1/2 -translate-y-1/2 text-[8px] font-black tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white px-2 py-1 border border-[#333333]/5 rounded">
                            {social.name}
                        </span>
                    </motion.a>
                ))}
            </div>
            <div className="w-[1px] h-32 bg-[#333333]/10" />
        </div>
    );
}
