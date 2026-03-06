"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField({ count = 4000 }) {
    const points = useRef<THREE.Points>(null!);

    // Generate random positions for particles in a large 3D space
    const [particles] = useState(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 20 + Math.random() * 50;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        return positions;
    });

    useFrame((state) => {
        const { mouse, clock } = state;
        if (points.current) {
            // Gentle rotation based on time
            points.current.rotation.y = clock.getElapsedTime() * 0.05;
            points.current.rotation.z = clock.getElapsedTime() * 0.03;

            // React to mouse position with smooth interpolation
            points.current.position.x = THREE.MathUtils.lerp(points.current.position.x, mouse.x * 5, 0.05);
            points.current.position.y = THREE.MathUtils.lerp(points.current.position.y, mouse.y * 5, 0.05);
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.12}
                color="#39FF14"
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 -z-20 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 30], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
            >
                <fog attach="fog" args={["#020202", 10, 60]} />
                <ParticleField />
            </Canvas>
        </div>
    );
}
