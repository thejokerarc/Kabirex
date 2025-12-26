import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, OrbitControls, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

const PhoneModel = ({ color }: { color: string }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle floating rotation based on mouse
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.mouse.x * Math.PI) / 8, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (state.mouse.y * Math.PI) / 8, 0.05);
        }
    });

    return (
        <group ref={groupRef}>
            {/* 1. Main Body (Metal Frame) - Titanium/Aluminum finish */}
            <RoundedBox args={[1.45, 3, 0.15]} radius={0.15} smoothness={4}>
                <meshStandardMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.9}
                    envMapIntensity={1.5}
                />
            </RoundedBox>

            {/* 2. Glass Back (Slightly transparent/shiny layer on top of back) */}
            <group position={[0, 0, -0.08]}>
                <RoundedBox args={[1.40, 2.95, 0.01]} radius={0.12} smoothness={4}>
                    <meshPhysicalMaterial
                        color={color}
                        roughness={0.05}
                        metalness={0.1}
                        transmission={0.1} // looks like glass over color
                        thickness={0.1}
                        clearcoat={1}
                        clearcoatRoughness={0}
                    />
                </RoundedBox>
            </group>

            {/* 3. Screen (Front) - Dynamic Deep Black */}
            <group position={[0, 0, 0.08]}>
                <RoundedBox args={[1.38, 2.92, 0.01]} radius={0.12} smoothness={4}>
                    <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.8} />
                </RoundedBox>
            </group>

            {/* 4. Camera Bump (Glass Island) */}
            <group position={[0.4, 1.1, -0.1]} rotation={[0, 0, 0]}>
                <RoundedBox args={[0.55, 0.55, 0.05]} radius={0.1} smoothness={4}>
                    <meshPhysicalMaterial
                        color={new THREE.Color(color).multiplyScalar(0.9)}
                        roughness={0.1}
                        metalness={0.5}
                        clearcoat={1}
                    />
                </RoundedBox>

                {/* Lenses */}
                <group position={[-0.15, 0.15, 0.04]}>
                    <mesh>
                        <cylinderGeometry args={[0.08, 0.08, 0.05, 32]} />
                        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
                    </mesh>
                    <mesh position={[0, 0, 0.03]}>
                        <cylinderGeometry args={[0.05, 0.05, 0.01, 32]} />
                        <meshStandardMaterial color="#333" />
                        {/* Reflection/Lens glint */}
                    </mesh>
                </group>

                <group position={[0.15, -0.15, 0.04]}>
                    <mesh>
                        <cylinderGeometry args={[0.08, 0.08, 0.05, 32]} />
                        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
                    </mesh>
                    <mesh position={[0, 0, 0.03]}>
                        <cylinderGeometry args={[0.05, 0.05, 0.01, 32]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                </group>

                {/* Flash */}
                <mesh position={[0.15, 0.15, 0.03]}>
                    <circleGeometry args={[0.04, 32]} />
                    <meshBasicMaterial color="#ffffee" opacity={0.8} transparent />
                </mesh>
            </group>

            {/* 5. Dynamic Island / Notch */}
            <mesh position={[0, 1.35, 0.09]}>
                <capsuleGeometry args={[0.06, 0.25, 4, 8]} />
                <meshBasicMaterial color="black" />
            </mesh>

        </group>
    );
};

const ThreeDPhone = ({ color = "#16a34a" }: { color: string }) => {
    return (
        <div className="w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing touch-none select-none">
            <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 2]}>
                <color attach="background" args={['#f8fafc']} /> {/* Match bg-slate-50 */}

                {/* Lighting Setup */}
                <ambientLight intensity={0.8} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.25}
                    penumbra={1}
                    intensity={2}
                    castShadow
                />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Float
                    rotationIntensity={0.6}
                    floatIntensity={0.8}
                    speed={2}
                    floatingRange={[-0.1, 0.1]}
                >
                    <PhoneModel color={color} />
                </Float>

                <Environment preset="city" blur={0.6} />
                <ContactShadows
                    position={[0, -2, 0]}
                    opacity={0.4}
                    scale={15}
                    blur={2.5}
                    far={4.5}
                    color="#000"
                />

                <OrbitControls
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={8}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                    enablePan={false}
                />
            </Canvas>
        </div>
    );
};

export default ThreeDPhone;
