"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  #define OCTAVES 6

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 g = a0 * vec3(x0.x,x12.x,x12.z) + h * vec3(x0.y,x12.y,x12.w);
    float n = 130.0 * dot(m, g);
    return n;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < OCTAVES; i++) {
      value += amplitude * snoise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= aspect;

    vec2 mouse = uMouse * 2.0 - 1.0;
    mouse.x *= aspect;

    float dist = distance(p, mouse);
    float pull = 0.8 * exp(-dist * dist / 1.2); // Balanced pull
    
    vec2 q = p + (mouse - p) * pull;

    vec2 o = vec2(0.0);
    o.x = fbm(q + uTime * 0.08); // Slower, more elegant
    o.y = fbm(q + vec2(1.0) + uTime * 0.06);

    vec2 r = vec2(0.0);
    r.x = fbm(q + 1.2 * o + vec2(1.7, 9.2) + 0.1 * uTime);
    r.y = fbm(q + 1.2 * o + vec2(8.3, 2.8) + 0.08 * uTime);

    float f = fbm(q + r);

    // Optimized Color Palette for Light Theme
    vec3 color1 = vec3(1.0, 1.0, 1.0); // Pure White Background
    vec3 color2 = vec3(0.97, 0.98, 1.0); // Extremely subtle blueish gray
    vec3 color3 = vec3(0.35, 0.49, 0.61); // Muted Blue accents (#5A7D9A)

    vec3 color = mix(color1, color2, clamp(f * 1.5, 0.0, 1.0));
    color = mix(color, color3, clamp(length(r) * 0.15, 0.0, 1.0) * 0.08);

    // Subtle technical detail: Scanlines - Light Mode
    float scanline = sin(uv.y * uResolution.y * 1.2) * 0.005;
    color -= scanline;

    // Mouse Glow - Soft Blue
    float mouseGlow = exp(-dist * 8.0);
    color = mix(color, color3, mouseGlow * 0.05);

    // Digital Grain - Very Subtle
    color += 0.02 * snoise(uv * 256.0 + uTime);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function LiquidBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, size } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) }
  }), [size]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();

      const targetX = (state.mouse.x + 1) / 2;
      const targetY = (state.mouse.y + 1) / 2;

      material.uniforms.uMouse.value.x += (targetX - material.uniforms.uMouse.value.x) * 0.03;
      material.uniforms.uMouse.value.y += (targetY - material.uniforms.uMouse.value.y) * 0.03;

      material.uniforms.uResolution.value.set(state.size.width, state.size.height);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  );
}
