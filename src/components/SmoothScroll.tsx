"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        // CRITICAL: Sync Lenis scroll with GSAP ScrollTrigger
        // Without this, ScrollTrigger loses track of scroll position and sections go blank
        lenis.on("scroll", ScrollTrigger.update);

        const ticker = gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable GSAP's default lag smoothing when using Lenis
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(ticker);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
