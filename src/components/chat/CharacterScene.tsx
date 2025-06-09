"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function CharacterModel() {
  const { scene } = useGLTF("/character/3d-octopus.glb");
  const ref = useRef<THREE.Group>(null);

  // 둥둥 떠다니는 모션 추가
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.position.y = Math.sin(t * 2.5) * 0.08;
    }
  });

  return (
    <group ref={ref} scale={0.8}>
      {/* 문어 모델 */}
      <primitive object={scene} />
    </group>
  );
}

function ShadowRing() {
  return (
    <div className="absolute bottom-[28%] h-10 w-50 rounded-full bg-pink-400 opacity-90 blur-2xl" />
  );
}

export default function CharacterScene() {
  return (
    <div className="relative flex h-[80%] w-full items-center justify-center">
      <Canvas
        style={{ width: "60%", height: "50%" }}
        camera={{ position: [0, 2, 4], fov: 35 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 2, 5]} intensity={1.2} />
        <CharacterModel />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
      </Canvas>
      <ShadowRing />
    </div>
  );
}
