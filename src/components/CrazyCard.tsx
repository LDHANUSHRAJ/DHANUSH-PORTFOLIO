"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { ReactNode } from "react";

interface CrazyCardProps {
    children: ReactNode;
    className?: string;
}

export default function CrazyCard({ children, className = "" }: CrazyCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove} // Keep for glow effect
            onMouseLeave={handleMouseLeave} // Keep for glow effect
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`glass-card group relative p-8 bg-white border border-[#333333]/5 shadow-xl shadow-[#5a7d9a]/5 hover:shadow-2xl hover:shadow-[#5a7d9a]/10 hover:border-primary transition-all duration-500 overflow-hidden ${className}`}
        >
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-8 h-8 opacity-10 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 right-0 w-full h-[1px] bg-primary" />
                <div className="absolute top-0 right-0 w-[1px] h-full bg-primary" />
            </div>

            <div className="relative z-10 h-full">
                {children}
            </div>

            {/* Dynamic Hover Glow - Technical Blue */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: useTransform(
                        [mouseXSpring, mouseYSpring],
                        ([xVal, yVal]) => `radial-gradient(circle at ${((xVal as number) + 0.5) * 100}% ${((yVal as number) + 0.5) * 100}%, rgba(59, 130, 246, 0.08) 0%, transparent 80%)`
                    )
                }}
            />
        </motion.div>
    );
}
