"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function InteractiveBackground() {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        handleResize(); // Call it once on mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 50, stiffness: 100 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Transform mouse movement into subtle color/position shifts
    const xPercent = useTransform(smoothX, [0, windowSize.width], [-20, 20]);
    const yPercent = useTransform(smoothY, [0, windowSize.height], [-20, 20]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Base Gradient Layer with tuned opacity for 3D blending */}
            <motion.div
                style={{
                    x: xPercent,
                    y: yPercent,
                    scale: 1.25,
                }}
                className="absolute inset-[-20%] opacity-40 blur-[130px]"
            >
                {/* Animated Light Blobs */}
                <div className="absolute top-[5%] left-[5%] w-[800px] h-[800px] bg-white/5 rounded-full mix-blend-screen animate-float" />
                <div className="absolute bottom-[10%] right-[10%] w-[900px] h-[900px] bg-neon-green/20 rounded-full mix-blend-screen animate-float" style={{ animationDelay: "-2.5s" }} />
                <div className="absolute top-[30%] right-[20%] w-[750px] h-[750px] bg-electric-blue/20 rounded-full mix-blend-screen animate-float" style={{ animationDelay: "-5s" }} />
                <div className="absolute bottom-[40%] left-[20%] w-[700px] h-[700px] bg-vivid-orange/10 rounded-full mix-blend-screen animate-float" style={{ animationDelay: "-7s" }} />
            </motion.div>

            {/* Radial Mask for depth with lighter feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian/5 via-transparent to-obsidian opacity-70" />
            <div className="absolute inset-0 mask-radial bg-obsidian/20" />
        </div>
    );
}
