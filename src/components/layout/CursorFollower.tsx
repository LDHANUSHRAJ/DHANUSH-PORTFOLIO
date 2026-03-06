"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorFollower() {
    const [isPointer, setIsPointer] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 6);
            mouseY.set(e.clientY - 6);

            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName.toLowerCase() === "button" ||
                target.tagName.toLowerCase() === "a" ||
                target.closest('button') !== null ||
                target.closest('a') !== null
            );
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-neon-green rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border border-neon-green/30 rounded-full pointer-events-none z-[9998] hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-37.5%",
                    translateY: "-37.5%",
                    scale: isPointer ? 1.5 : 1,
                    borderColor: isPointer ? "rgba(57, 255, 20, 0.8)" : "rgba(57, 255, 20, 0.2)",
                }}
                transition={{ type: "spring", damping: 20 }}
            >
                <div className="absolute inset-0 bg-neon-green/5 rounded-full blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
        </>
    );
}
