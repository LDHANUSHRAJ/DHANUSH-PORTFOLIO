"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 35, stiffness: 300, mass: 0.6 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState("");

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest(".magnetic-item") || target.closest("button")) {
                setIsHovering(true);
                const text = target.innerText?.split('\n')[0] || "EXPLORE";
                setHoverText(`>> ${text.toUpperCase()}`);
            } else {
                setIsHovering(false);
                setHoverText("");
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
            {/* Center Dot - Charcoal in Light Mode */}
            <motion.div
                className="absolute w-1.5 h-1.5 bg-[#333333] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 2 : 1,
                    backgroundColor: isHovering ? "#5a7d9a" : "#333333",
                }}
            />

            {/* Technical Outer Frame - Light Mode */}
            <motion.div
                className="absolute w-12 h-12 border border-[#333333]/10 rounded-full"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    borderColor: isHovering ? "rgba(90, 125, 154, 0.3)" : "rgba(51, 51, 51, 0.1)",
                    borderWidth: isHovering ? "2px" : "1px",
                }}
                transition={{ type: "spring", damping: 40, stiffness: 150 }}
            />

            {/* Data Label - Outfit Font */}
            <motion.div
                className="absolute text-[8px] font-black tracking-[0.3em] text-[#333333] whitespace-nowrap pt-2 luxury-text"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "28px",
                    translateY: "12px",
                }}
                animate={{
                    opacity: isHovering ? 1 : 0,
                    x: isHovering ? 36 : 28,
                }}
            >
                {hoverText}
            </motion.div>

            {/* Corner Markers - Premium Detail */}
            {isHovering && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    style={{
                        x: springX,
                        y: springY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    className="absolute w-20 h-20"
                >
                    <div className="absolute top-0 left-0 w-3 h-[1px] bg-primary" />
                    <div className="absolute top-0 left-0 w-[1px] h-3 bg-primary" />
                    <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-primary" />
                    <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-primary" />
                </motion.div>
            )}
        </div>
    );
}
