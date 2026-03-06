"use client";

import { useRef, useMemo, Suspense, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    PerspectiveCamera,
    OrbitControls
} from "@react-three/drei";
import LiquidField from "./LiquidField";

function Particles({ count = 2000 }) {
    const [points] = useState(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 60;
            p[i * 3 + 1] = (Math.random() - 0.5) * 60;
            p[i * 3 + 2] = (Math.random() - 0.5) * 60;
        }
        return p;
    });

    const meshRef = useRef<THREE.Points>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                    args={[points, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#ccff00"
                transparent
                opacity={0.1}
                sizeAttenuation
            />
        </points>
    );
}


export default function Scene() {
    return (
        <div className="fixed inset-0 pointer-events-auto z-0">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={50} />
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#8B5CF6" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#EC4899" />

                <LiquidField />
                <Particles count={1000} />

                <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            </Canvas>
        </div>
    );
}
