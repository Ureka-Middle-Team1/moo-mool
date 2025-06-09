"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function CharacterModel() {
  const { scene } = useGLTF("/character/3d-octopus.glb");
  const ref = useRef<THREE.Group>(null);

  return (
    <group ref={ref} scale={0.4}>
      <primitive object={scene} />
    </group>
  );
}

export default function CharacterScene() {
  return (
    <div>
      <Canvas camera={{ position: [0, 1.5, 4], fov: 35 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 2, 5]} intensity={1.2} />
        <CharacterModel />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
