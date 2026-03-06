"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
// @ts-expect-error - no types for jsm examples in some environments
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer";

const PARTICLE_WIDTH = 128; // Increased density
const PARTICLE_COUNT = PARTICLE_WIDTH * PARTICLE_WIDTH;

const simulationVertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShaderPosition = `
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);
    
    pos.xyz += vel.xyz * 0.016; // Simple integration
    
    gl_FragColor = pos;
  }
`;

const fragmentShaderVelocity = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uInfluence;
  
  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ; m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 g = a0 * vec3(x0.x,x12.x,x12.z) + h * vec3(x0.y,x12.y,x12.w);
    float n = 130.0 * dot(m, g);
    return n;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);
    
    vec3 force = vec3(0.0);
    
    // 1. Fluid Flow (Noise)
    float noise = snoise(pos.xy * 0.1 + uTime * 0.2);
    force.x += cos(noise * 6.28) * 0.5;
    force.y += sin(noise * 6.28) * 0.5;
    
    // 2. Cursor Interaction (Liquid Displacement)
    vec2 mouse = uMouse;
    float dist = distance(pos.xy, mouse);
    float radius = 4.0;
    if(dist < radius) {
        vec2 dir = normalize(pos.xy - mouse);
        float power = (1.0 - dist / radius) * 15.0;
        force.xy += dir * power;
    }
    
    // 3. Return to Center/Tether (Liquid Surface Tension)
    vec2 center = vec2(0.0); // Assuming spawn around center
    // force.xy -= (pos.xy - center) * 0.01;
    
    vel.xyz += force * 0.1;
    vel.xyz *= 0.95; // Damping
    
    gl_FragColor = vel;
  }
`;

const particleVertexShader = `
  uniform sampler2D texturePosition;
  uniform float uPixelRatio;
  varying float vLife;

  void main() {
    vec4 pos = texture2D(texturePosition, uv);
    vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
    
    gl_PointSize = (10.0 * uPixelRatio) / -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
    vLife = 1.0; 
  }
`;

const particleFragmentShader = `
  varying float vLife;
  void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    
    float glow = exp(-r * 4.0);
    vec3 color = vec3(0.8, 1.0, 0.0); // Neon Green
    gl_FragColor = vec4(color, glow * vLife * 0.4);
  }
`;

export default function LiquidParticles() {
  const { gl, viewport } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const gpuRef = useRef<any>(null); // Still using any because GPUComputationRenderer is tricky to type without local jsm types
  const positionVariable = useRef<any>(null);
  const velocityVariable = useRef<any>(null);
  const mouseRef = useRef(new THREE.Vector2());

  const { gpu, posVar, velVar } = useMemo(() => {
    const gpu = new GPUComputationRenderer(PARTICLE_WIDTH, PARTICLE_WIDTH, gl);

    const dtPosition = gpu.createTexture();
    const dtVelocity = gpu.createTexture();

    const posData = dtPosition.image.data;
    const velData = dtVelocity.image.data;

    for (let i = 0; i < posData.length; i += 4) {
      // Use a deterministic-looking but pseudo-random approach or just suppress if we must
      // but for purity, let's just move the random generation outside the render loop if possible.
      // However, posData is a typed array.
      posData[i] = (Math.random() - 0.5) * 40;
      posData[i + 1] = (Math.random() - 0.5) * 40;
      posData[i + 2] = 0;
      posData[i + 3] = 1;

      velData[i] = 0;
      velData[i + 1] = 0;
      velData[i + 2] = 0;
      velData[i + 3] = 1;
    }

    const posVar = gpu.addVariable("texturePosition", fragmentShaderPosition, dtPosition);
    const velVar = gpu.addVariable("textureVelocity", fragmentShaderVelocity, dtVelocity);

    gpu.setVariableDependencies(posVar, [posVar, velVar]);
    gpu.setVariableDependencies(velVar, [posVar, velVar]);

    velVar.material.uniforms.uTime = { value: 0 };
    velVar.material.uniforms.uMouse = { value: new THREE.Vector2(0, 0) };

    const error = gpu.init();
    if (error !== null) console.error(error);

    return { gpu, posVar, velVar };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl]);

  useEffect(() => {
    gpuRef.current = gpu;
    positionVariable.current = posVar;
    velocityVariable.current = velVar;
  }, [gpu, posVar, velVar]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const uvs = new Float32Array(PARTICLE_COUNT * 2);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (i % PARTICLE_WIDTH) / PARTICLE_WIDTH;
      const y = Math.floor(i / PARTICLE_WIDTH) / PARTICLE_WIDTH;
      uvs[i * 2] = x;
      uvs[i * 2 + 1] = y;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    return geo;
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        texturePosition: { value: null },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, []);

  useFrame((state) => {
    if (gpuRef.current) {
      velocityVariable.current.material.uniforms.uTime.value = state.clock.getElapsedTime();

      // Map state.mouse to world space
      mouseRef.current.set(
        (state.mouse.x * viewport.width) / 2,
        (state.mouse.y * viewport.height) / 2
      );
      velocityVariable.current.material.uniforms.uMouse.value.copy(mouseRef.current);

      gpuRef.current.compute();

      if (pointsRef.current) {
        (pointsRef.current.material as THREE.ShaderMaterial).uniforms.texturePosition.value =
          gpuRef.current.getCurrentRenderTarget(positionVariable.current).texture;
      }
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}
