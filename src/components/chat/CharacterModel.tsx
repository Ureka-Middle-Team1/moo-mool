"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface CharacterModelProps {
  onClick?: () => void;
}

export default function CharacterModel({ onClick }: CharacterModelProps) {
  const { scene } = useGLTF("/character/3d-octopus.glb");
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.position.y = Math.sin(t * 2.5) * 0.08;
    }
  });

  return (
    <group ref={ref} scale={0.8} onClick={onClick}>
      <primitive object={scene} />
    </group>
  );
}
useGLTF.preload("/character/3d-octopus.glb");
