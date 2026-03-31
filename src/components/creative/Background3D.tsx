'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Background3D - Fondo inmersivo con elementos 3D flotantes optimizados
 *
 * Características:
 * - Partículas flotantes reducidas para mejor rendimiento
 * - Esferas con distorsión dinámica simplificadas
 * - Efecto de profundidad con parallax
 * - Optimizado para rendimiento en dispositivos de gama baja
 */
export default function Background3D() {
  // Detectar si es dispositivo de gama baja
  const isLowEnd = typeof navigator !== 'undefined' &&
    (navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false);

  if (isLowEnd) {
    // En dispositivos de gama baja, mostrar solo un gradiente CSS
    return (
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.3} />
        <ParticleField />
        <FloatingSpheres />
      </Canvas>
    </div>
  );
}

/**
 * Campo de partículas flotantes optimizado
 */
function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  // Reducir número de partículas para mejor rendimiento
  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 8;
      positions[i3 + 1] = (Math.random() - 0.5) * 8;
      positions[i3 + 2] = (Math.random() - 0.5) * 6;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Rotación lenta
    ref.current.rotation.x = time * 0.01;
    ref.current.rotation.y = time * 0.02;
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

/**
 * Esferas flotantes simplificadas
 */
function FloatingSpheres() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Rotación orbital
    group.current.rotation.y = time * 0.05;
  });

  return (
    <group ref={group}>
      {/* Esfera principal - simplificada */}
      <Float
        speed={1.5}
        rotationIntensity={0.3}
        floatIntensity={0.8}
        floatingRange={[-0.15, 0.15]}
      >
        <mesh position={[2, 0.3, -2]} scale={0.6}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.2}
            speed={1}
            roughness={0.3}
            metalness={0.6}
            transparent
            opacity={0.2}
          />
        </mesh>
      </Float>

      {/* Esfera secundaria - simplificada */}
      <Float
        speed={1.2}
        rotationIntensity={0.5}
        floatIntensity={1}
        floatingRange={[-0.2, 0.2]}
      >
        <mesh position={[-1.8, -0.3, -1.5]} scale={0.4}>
          <sphereGeometry args={[1, 16, 16]} />
          <MeshDistortMaterial
            color="#22d3ee"
            attach="material"
            distort={0.25}
            speed={1.5}
            roughness={0.2}
            metalness={0.7}
            transparent
            opacity={0.15}
          />
        </mesh>
      </Float>
    </group>
  );
}
