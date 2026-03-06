"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import ExperimentalInteractions from "@/components/ExperimentalInteractions";
import { Canvas } from "@react-three/fiber";
import LiquidBackground from "@/components/LiquidBackground";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);

    return (
        <SmoothScroll>
            <Header />
            <LoadingScreen onFinished={() => setLoading(false)} />

            <div className="fixed inset-0 z-[-1] pointer-events-none">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <LiquidBackground />
                </Canvas>
            </div>

            <CustomCursor />
            <ExperimentalInteractions />

            <main className={`transition-all duration-[1200ms] cubic-bezier(0.22, 1, 0.36, 1) ${loading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
                {children}
            </main>
        </SmoothScroll >
    );
}
