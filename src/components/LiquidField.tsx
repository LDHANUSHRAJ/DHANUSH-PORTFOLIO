"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uInteractionStrength;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDisplacement;

  // Simplex 3D noise
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.y;
    vec4 y = y_ *ns.x + ns.y;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    
    vec3 pos = position;
    
    // Viscous Wave Motion
    float noise1 = snoise(vec3(pos.xy * 0.4 + uTime * 0.1, uTime * 0.05));
    float noise2 = snoise(vec3(pos.xy * 0.8 - uTime * 0.15, uTime * 0.02));
    float wave = sin(pos.x * 0.3 + uTime) * cos(pos.y * 0.3 + uTime) * 0.2;
            
    // Cursor Interaction
    float dist = distance(pos.xy, uMouse * 15.0); // Scale mouse to plane
    float interaction = uInteractionStrength * exp(-dist * dist / 8.0);
    
    float displacement = (noise1 * 0.4 + noise2 * 0.2 + wave) * 0.6 + interaction * 5.0;
    pos.z += displacement;
    
    vDisplacement = displacement;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
    
    // Pass normal (approximate for the wave)
    vNormal = normalize(normalMatrix * normal);
  }
`;

const fragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uHighlightColor;
  uniform float uTime;
  uniform float uIntensity;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDisplacement;

  void main() {
    // Normal calculation refinement could happen here if we used a more complex method,
    // but for "liquid energy" we can use the displacement and noise.
    
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // Base Fluid Gradient
    float mixFactor = clamp(vDisplacement * 0.2 + 0.5, 0.0, 1.0);
    vec3 baseColor = mix(uColor1, uColor2, mixFactor);
    
    // Specular Highlights (Plastic/Liquid look)
    vec3 lightDir = normalize(vec3(5.0, 5.0, 10.0));
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
    
    // Rim Lighting
    float rim = 1.0 - max(dot(viewDir, normal), 0.0);
    rim = pow(rim, 3.0);
    
    vec3 finalColor = baseColor;
    finalColor += spec * uHighlightColor * 0.5;
    finalColor += rim * uColor2 * 0.3;
    
    // Add glowing "energy" pulses
    float pulse = sin(vUv.y * 10.0 + uTime) * 0.5 + 0.5;
    finalColor += uHighlightColor * pulse * uIntensity;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function LiquidField() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uInteractionStrength: { value: 0 },
    uColor1: { value: new THREE.Color("#02040a") }, // Ultimate Dark Navy
    uColor2: { value: new THREE.Color("#2e1065") }, // Darkest Purple
    uHighlightColor: { value: new THREE.Color("#4c1d95") }, // Dark Violet
    uIntensity: { value: 0.2 },
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();

      // Interaction logic
      const targetX = state.mouse.x * (viewport.width / 2);
      const targetY = state.mouse.y * (viewport.height / 2);

      material.uniforms.uMouse.value.x += (targetX - material.uniforms.uMouse.value.x) * 0.1;
      material.uniforms.uMouse.value.y += (targetY - material.uniforms.uMouse.value.y) * 0.1;

      // Interaction strength based on velocity could be added, but standard distance is often smoother
      material.uniforms.uInteractionStrength.value = 1.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} rotation={[-Math.PI / 6, 0, 0]}>
      <planeGeometry args={[viewport.width * 3, viewport.height * 3, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}
